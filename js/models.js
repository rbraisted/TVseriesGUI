"use strict";

var
//	i use these a lot,
//	i prefer to just have them out in the open
compose = _.compose,
contains = _.contains,
curry = _.curry,
filter = _.filter,
find = _.find,
forEach = _.forEach,
map = _.map,
memoize = _.memoize,
promise = Promise,
times = _.times,
where = _.where;

(function(tvro) {
console.log(tvro);
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
	return {
		name: $('group_name', xml).text(),
		predefined: $('predefined', xml).text() === 'Y',
		a: satellite($('A', xml)),
		b: satellite($('B', xml)),
		c: satellite($('C', xml)),
		d: satellite($('D', xml))
	}
},

satellite = function(xml) {
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
		name: $('name', xml).text(),
		region: $('region', xml).text(),
		lon: Number($('lon', xml).text()),
		suffix: $('suffix', xml).text(),
		favorite: $('favorite', xml).text(),

		//	these values can only be retrieved with get_satellite_params
		skew: $('skew', xml).text(),
		lo1: $('lo1', xml).text(),
		lo2: $('lo2', xml).text(),
		kumode: $('kumode', xml).text(),
		preferredPolarity: $('preferredPolarity', xml).text(),
		xponders: map($('xponder', xml), xponder)
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

tvro.m = {
	onAcu: function(cb) {

	},
	getAcu: function() {
		return promise.all(
			tvro.ws.getAntennaStatus(),
			tvro.ws.getAntennaVersions()
		).then(function(r) {
			return {
				state: $('acu state', r[0]).text(),
				line1: $('acu line1', r[0]).text(),
				line2: $('acu line2', r[0]).text(),
				current: $('current', r[1]).text(),
				model: $('acu model', r[1]).text(),
				part: $('acu part', r[1]).text(),
				rev: $('acu rev', r[1]).text(),
				ver: $('acu ver', r[1]).text(),
				sn: $('acu sn', r[1]).text()
			}
		});
	},
	getAntenna: function() {
		return promise.all(
			tvro.ws.getAntennaStatus(),
			tvro.ws.getAntennaVersions()
		).then(function(r) {
			return {
				state: $('state', r).text(), 
				snr: $('rf snr', r).text(),
				bars: $('rf bars', r).text(), 
				hdg: $('brst hdg', r).text(),
				az_bow: $('brst az_bow', r).text(),
				az: $('brst az', r).text(),
				el: $('brst el', r).text(),
				tilt: $('brst tilt', r).text(),
				azoff: $('brst azoff', r).text(),
				model : $('au model', r).text(),
				part : $('au part', r).text(),
				rev : $('au rev', r).text(),
				ver : $('au ver', r).text(),
				sn : $('au sn', r).text()
			}
		});
	},

	getGroups: function() {
		return tvro.ws.getSatelliteGroups().then(function(r) {
			return map($('group', r), group);
		});
	},

	getInstalledGroup: function() {
		return promise.all(
			tvro.ws.getAutoswitchStatus(),
			tvro.ws.getSatelliteGroups()
		).then(function(r) {
			return find(map($('group', r[1]), group), { name: $('satellite_group', r[0]).text() });
		});
	},
	getSatellites: function() {
		return tvro.ws.getSatelliteList().then(function(r) {
			return map($('satellite', r), satellite);
		});
	},
	getInstalledSatellite: function() {
		return tvro.ws.getAntennaStatus().then(function(r) {
			return satellite($('satellite', r));
		});
	},
	getReceivers: function() {
		return promise.all(
			tvro.ws.getAutoswitchStatus(),
			tvro.ws.getAutoswitchConfiguredNames()
		).then(function(r) {
			//	find the active receivers
			//	get all receivers
			//	go through all receivers and set receive.active
			var activeReceivers = map($('autoswitch', r[0]), receiver);
			return forEach(map($('autoswitch', r[1]), receiver), function(receiver) {
				receiver.active = !!find(activeReceivers, { id: receiver.id });
			});
		});
	},
	getMaster: function() {
		return tvro.ws.getAutoswitchStatus().then(function(r) {
			return receiver($('master', r));
		});
	},
	getHub: function() {
		return tvro.ws.getAutoswitchStatus().then(function(r) {
			return find(map($('autoswitch', r), receiver), { name: 'TV-Hub' });
		});
	}
}

}(window.tvro || (window.tvro = {})));