//  requires WebService
!function(TVRO) {
  "use strict";

  //  autoswitch receiver
  //  directv services will use ip, ip autoswitches will use sn
  //  they're both unique identifiers so i threw in id for ease
  var Receiver = function(xml) {
    return {
      sn: $('sn', xml).text(),
      name: $('name', xml).text(),
      ip: $('ip_address', xml).text(),
      id: $('sn', xml).text() || $('ip_address', xml).text(),
      active: false
    };
  };

  //  satellite groups
  var Group = function(xml) {
    //  sometimes the webservices returns <group> with nothing
    //  inside of it - i'd rather just return undefined
    if (!$('group_name', xml).text()) {
      return undefined;
    }

    var self;

    return self = {
      name: $('group_name', xml).text(),
      predefined: $('predefined', xml).text() === 'Y',
      satA: Sat($('A', xml)),
      satB: Sat($('B', xml)),
      satC: Sat($('C', xml)),
      satD: Sat($('D', xml)),
      getSats: function() {
        return _.compact([self.satA, self.satB, self.satC, self.satD]);
      }
    };
  };

  //  satellite
  var Sat = function(xml) {
    //  sometimes the webservices returns <satellite> with nothing
    //  inside of it - i'd rather just return undefined
    if (!$('listID', xml).text() && !$('antSatID', xml).text()) {
      return undefined;
    }

    var self;
    var preferredPolarity = $('preferredPolarity', xml).text();
    var lnbType = '';
    if (preferredPolarity === 'L' || preferredPolarity === 'R') lnbType = 'Circular';
    else if (preferredPolarity === 'H' || preferredPolarity === 'V') lnbType = 'Linear';

    return self = {
      //  these values can be retrieved from both
      //  get_satellite_list and get_satellite_params
      listID: $('listID', xml).text(),
      antSatID: $('antSatID', xml).text(),
      predefined: $('antSatID', xml).text().indexOf('USER') < 0,
      name: $('name', xml).text(),
      region: $('region', xml).text(),
      lon: Number($('lon', xml).text()),
      suffix: $('suffix', xml).text(),
      favorite: $('favorite', xml).text() === 'TRUE',

      //  these values can only be retrieved with get_satellite_params
      skew: $('skew', xml).text(),
      lo1: $('lo1', xml).text(),
      lo2: $('lo2', xml).text(),
      kumode: $('kumode', xml).text(),
      preferredPolarity: preferredPolarity,
      lnbType: lnbType,
      xponderVH: Xponder($('xponder:contains("Vertical High")', xml)),
      xponderVL: Xponder($('xponder:contains("Vertical Low")', xml)),
      xponderHH: Xponder($('xponder:contains("Horizontal High")', xml)),
      xponderHL: Xponder($('xponder:contains("Horizontal Low")', xml)),
      getXponders: function() {
        return _.compact([self.xponderVH, self.xponderVL, self.xponderHH, self.xponderHL]);
      }
    };
  };

  //  satellite transponder (xponder, satellite params)
  var Xponder = function(xml) {
    if (!$('id', xml).text()) {
      return undefined;
    }

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
    };
  };





  TVRO.Receiver = Receiver;
  TVRO.Group = Group;
  TVRO.Sat = Sat;
  TVRO.Xponder = Xponder;

  //  abstractions of the web service into our model classes

  TVRO.getGroups = function() {
    return TVRO.getSatelliteGroups().then(function(xml) {
      return _.map($('group', xml), Group);
    });
  };

  TVRO.getInstalledGroup = function() {
    return Promise.all(
      TVRO.getAutoswitchStatus(),
      TVRO.getSatelliteGroups()
    ).then(function(xmls) {
      var groups = _.map($('group', xmls[1]), Group);
      var installedGroupName = $('satellite_group', xmls[0]).text();
      return _.find(groups, { name: installedGroupName });
    });
  };

  TVRO.setInstalledGroup = function(group) {
    return TVRO.getAutoswitchStatus()
      .then(function(xml) {
        return TVRO.setAutoswitchService({
          enable: $('enable', xml).first().text(),
          service: $('service', xml).first().text(),
          satellite_group: group.name
        });
      });
  };

  TVRO.removeGroup = function(group) {
    return TVRO.setSatelliteGroup({
      command: 'DELETE',
      group_name: group.name
    });
  };

  TVRO.addGroup = function(group) {
    return TVRO.setSatelliteGroup({
      command: 'ADD',
      group_name: group.name,
      A: group.a ? group.a.antSatID : '',
      B: group.b ? group.b.antSatID : '',
      C: group.c ? group.c.antSatID : '',
      D: group.d ? group.d.antSatID : ''
    });
  };

  TVRO.getSats = function() {
    return TVRO.getSatelliteList().then(function(xml) {
      return _.map($('satellite', xml), Sat);
    });
  };

  TVRO.getInstalledSat = function() {
    return TVRO.getAntennaStatus().then(function(xml) {
      return Sat($('satellite', xml));
    });
  };

  TVRO.setInstalledSat = function(sat) {
    return TVRO.selectSatellite({
      antSatID: sat.antSatID
    });
  };

  TVRO.getSatParams = function(sat) {
    //  return the sat we get from getSatelliteParams in a promise
    return TVRO.getSatelliteParams({antSatID:sat.antSatID}, true).then(Sat);
  };

  TVRO.getReceivers = function() {
    return Promise.all(
      TVRO.getAutoswitchStatus(),
      TVRO.getAutoswitchConfiguredNames()
    ).then(function(xmls) {
      //  get the active receivers
      //  get all receivers
      //  go through all receivers and set receive.active
      var receivers = _.map($('autoswitch', xmls[1]), Receiver);
      var activeReceivers = _.map($('autoswitch', xmls[0]), Receiver);
      return _.forEach(receivers, function(receiver) {
        receiver.active = !!_.find(activeReceivers, { id: receiver.id });
      });
    });
  };

  TVRO.removeReceiver = function(receiver) {
    return TVRO.setAutoswitchConfiguredNames({
      command: 'DELETE',
      name: receiver.name,
      sn: receiver.sn,
      ip_address: receiver.ip
    });
  };

  TVRO.addReceiver = function(receiver) {
    return TVRO.setAutoswitchConfiguredNames({
      command: 'ADD',
      name: receiver.name,
      sn: receiver.sn,
      ip_address: receiver.ip
    });
  };

  TVRO.getMasterReceiver = function() {
    return TVRO.getAutoswitchStatus().then(function(xml) {
      var master = Receiver($('master', xml));
      master.active = true;
      return master;
    });
  };

  TVRO.setMasterReceiver = function(hub) {
    return TVRO.getAutoswitchStatus().then(function(xml) {
      var service = $('service', xml).text();
      var receiverIdType = 'sn';
      var master = {};
      if (service === 'DIRECTV') receiverIdType = 'ip_address';
      master[receiverIdType] = hub.id;
      return TVRO.setAutoswitchMaster(master);
    });
  };

  TVRO.getHubReceiver = function() {
    return TVRO.getAutoswitchStatus().then(function(xml) {
      var receivers = _.map($('autoswitch', xml), Receiver);
      var hub = _.find(receivers, { name: 'TV-Hub' });
      hub.active = true;
      return hub;
    });
  };

  TVRO.getAutoswitchAvailable = function() {
    return TVRO.getAutoswitchStatus().then(function(xml) {
      var available = $('available:first', xml).text() === 'Y';
      return available;
    });
  };

  TVRO.getAutoswitchEnabled = function() {
    return TVRO.getAutoswitchStatus().then(function(xml) {
      var available = $('available:first', xml).text() === 'Y';
      var enabled = available ? $('enable:first', xml).text() === 'Y' : false;
      return enabled;
    });
  };

  TVRO.setAutoswitchEnabled = function(enabled) {
    return TVRO.getAutoswitchStatus()
      .then(function(xml) {
        return TVRO.setAutoswitchService({
          enable: enabled ? 'Y' : 'N',
          service: $('service:first', xml).text(),
          satellite_group: $('satellite_group', xml).text()
        });
      });
  };

  TVRO.getService = function() {
    return TVRO.getAutoswitchStatus().then(function(xml) {
      var service = $('service:first', xml).text();
      return service;
    });
  };

  TVRO.getReceiverType = function() {
    return TVRO.getAutoswitchStatus().then(function(xml) {
      var service = $('service:first', xml).text();
      if (service === 'DIRECTV') return 'Receiver';
      else return 'IP Autoswitch';
    });    
  };

}(window.TVRO);