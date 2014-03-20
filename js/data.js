"use strict";

(function(tvro) {

var
//	autoswitch receiver
//	directv services will use ip, ip autoswitches will use sn
receiver = function(xml) {
	return {
		sn: $('sn', xml).text(),
		name: $('name', xml).text(),
		ip: $('ip_address', xml).text(),
		id: $('sn', xml).text() || $('ip_address', xml).text(),
		active: false
	}
},

//	satellite groups
group = function(xml) {
	if (!$('group_name', xml).text()) {
		return undefined;
	}

	var group;

	return group = {
		name: $('group_name', xml).text(),
		predefined: $('predefined', xml).text() === 'Y',
		a: sat($('A', xml)),
		b: sat($('B', xml)),
		c: sat($('C', xml)),
		d: sat($('D', xml)),
		sats: function() {
			return _.compact([group.a, group.b, group.c, group.d]);
		}
	}
},

sat = function(xml) {
	//	if there's not listID or antSatID (which are both unique)
	//	return undefined - this is mostly to make dealing with groups
	//	easier by having empty satellite slots return undefined
	if (!$('listID', xml).text() && !$('antSatID', xml).text()) {
		return undefined;
	}

	return {
		//	these values can be retrieved from both
		//	get_satellite_list and get_satellite_params
		listID: $('listID', xml).text(),
		antSatID: $('antSatID', xml).text(),
		predefined: $('antSatID', xml).text().indexOf('USER') < 0,
		name: $('name', xml).text(),
		region: $('region', xml).text(),
		lon: Number($('lon', xml).text()),
		suffix: $('suffix', xml).text(),
		favorite: $('favorite', xml).text() === 'TRUE',

		//	these values can only be retrieved with get_satellite_params
		skew: $('skew', xml).text(),
		lo1: $('lo1', xml).text(),
		lo2: $('lo2', xml).text(),
		kumode: $('kumode', xml).text(),
		preferredPolarity: $('preferredPolarity', xml).text(),
		xponders: _.map($('xponder', xml), xponder)
	}
},

//	satellite transponder (xponder)
//	sometimes refered to as "satellite params"
xponder = function(xml) {
	return {
		id: $('id', xml).text(),
		display: $('display', xml).text(),
		pol: $('pol', xml).text(),
		band: $('band', xml).text(),
		freq: $('freq', xml).text(),
		symRate: $('symRate', xml).text(),
		fec: $('fec', xml).text(),
		netID: $('netID', xml).text(),
		modType: $('modType', xml).text()
	}
};

tvro.data = {
	getGroups: function() {
		return tvro.ws.getSatelliteGroups().then(function(r) {
			return _.map($('group', r), group);
		});
	},

	getInstalledGroup: function() {
		return Promise.all(
			tvro.ws.getAutoswitchStatus(),
			tvro.ws.getSatelliteGroups()
		).then(function(r) {
			return _.find(_.map($('group', r[1]), group), { name: $('satellite_group', r[0]).text() });
		});
	},

	setInstalledGroup: function(group) {
		return tvro.ws.getAutoswitchStatus()
		.then(function(r) {
			return tvro.ws.setAutoswitchService({
				enable: $('enabled', r).first().text(),
				service: $('service', r).first().text(),
				satellite_group: group.name
			});
		});
	},

	removeGroup: function(group) {
		return tvro.ws.setSatelliteGroup({
			command: 'DELETE',
			group_name: group.name
		});
	},

	addGroup: function(group) {
		return tvro.ws.setSatelliteGroup({
			command: 'ADD',
			group_name: group.name,
			A: group.a ? group.a.antSatID : '',
			B: group.b ? group.b.antSatID : '',
			C: group.c ? group.c.antSatID : '',
			D: group.d ? group.d.antSatID : ''
		});
	},

	getSats: function() {
		return tvro.ws.getSatelliteList().then(function(r) {
			return _.map($('satellite', r), sat);
		});
	},

	getInstalledSat: function() {
		return tvro.ws.getAntennaStatus().then(function(r) {
			return sat($('satellite', r));
		});
	},

	setInstalledSat: function(sat) {
		return tvro.ws.selectSatellite({
			antSatID: sat.antSatID
		});
	},

	getSatParams: function(s) {
		//	return the sat we get from getSatelliteParams in a promise
		return tvro.ws.getSatelliteParams({antSatID:s.antSatID}, true).then(sat);
	},

	getReceivers: function() {
		return Promise.all(
			tvro.ws.getAutoswitchStatus(),
			tvro.ws.getAutoswitchConfiguredNames()
		).then(function(r) {
			//	get the active receivers
			//	get all receivers
			//	go through all receivers and set receive.active
			var activeReceivers = _.map($('autoswitch', r[0]), receiver);
			return _.forEach(_.map($('autoswitch', r[1]), receiver), function(receiver) {
				receiver.active = !!_.find(activeReceivers, { id: receiver.id });
			});
		});
	},

	removeReceiver: function(receiver) {
		return tvro.ws.setAutoswitchConfiguredNames({
			command: 'DELETE',
			name: receiver.name,
			sn: receiver.sn,
			ip_address: receiver.ip
		});
	},

	addReceiver: function(receiver) {
		return tvro.ws.setAutoswitchConfiguredNames({
			command: 'ADD',
			name: receiver.name,
			sn: receiver.sn,
			ip_address: receiver.ip
		});
	},

	getMaster: function() {
		return tvro.ws.getAutoswitchStatus().then(function(r) {
			return receiver($('master', r));
		});
	},

	setMaster: function(hub) {
		return tvro.ws.getAutoswitchStatus().then(function(xml) {
			var service = $('service', xml).text();
			var receiverIdType = 'sn';
			var newMaster = {};
			if (service === 'DIRECTV') receiverIdType = 'ip_address';
			newMaster[receiverIdType] = hub.id;
			return tvro.ws.setAutoswitchMaster(newMaster);
		});
	},

	getHub: function() {
		return tvro.ws.getAutoswitchStatus().then(function(r) {
			return _.find(_.map($('autoswitch', r), receiver), { name: 'TV-Hub' });
		});
	}
}

}(window.tvro || (window.tvro = {})));