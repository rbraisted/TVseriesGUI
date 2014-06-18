//requires WebService
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
      active: false,
      type: ''
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
      computedSkew: $('computedSkew', xml).text(),
      lo1: $('lo1', xml).text(),
      lo2: $('lo2', xml).text(),
      kumode: $('kumode', xml).text(),
      preferredPolarity: preferredPolarity,
      lnbType: lnbType,
      xponders: _.sortBy(_.map($('xponder', xml), Xponder), 'id')
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
      TVRO.getAutoswitchStatus(1, 1), // don't cache, force new call
      TVRO.getSatelliteGroups(1, 1)
    ).then(function(xmls) {
      //  but if it is enabled, return the correct group
      var installedGroupName = $('satellite_group', xmls[0]).text();
      var groups = _.map($('group', xmls[1]), Group);
      return _.find(groups, { name: installedGroupName });
    });
  };

  TVRO.setInstalledGroup = function(group) {
    return TVRO.setAutoswitchService({
      satellite_group: group.name
    }).then(function(){
      document.body.className = '/spinner';

      var interval;
      var timeout;

      $('.\\#exit-btn').click(function() {
        clearInterval(interval);
        clearTimeout(timeout);
        TVRO.reload();
      });

      timeout = setTimeout(function() {
        interval = setInterval(function() {
          TVRO.getAntennaStatus(1,1).then(function(xml) {
            var state =  $('antenna state', xml).text();
            $('.\\#ant_status').text("The TV-Hub is Installing the group. Status: " + state);
            if ((state === 'SEARCHING') || (state === 'TRACKING')) {
              clearInterval(interval);
              TVRO.reload();
            } else if (state === 'ERROR') {
              clearInterval(interval);
              alert("An error occured installing " + group.name + ".");
              TVRO.reload();
            }//End if (state === 'ERROR')
          });
        }, 1000);
      }, 10000);
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
      A: group.satA ? group.satA.antSatID : '',
      B: group.satB ? group.satB.antSatID : '',
      C: group.satC ? group.satC.antSatID : '',
      D: group.satD ? group.satD.antSatID : ''
    });
  };

  TVRO.getSats = function() {
    return TVRO.getSatelliteList().then(function(xml) {
      return _.map($('satellite', xml), Sat);
    });
  };

  TVRO.getSelectedSat = function() {
    //  antenna_status doesn't always seem to have full sat
    //  info on the installed sat - but it usually has the antSatID
    //  let's just pull the data by matching antSatID with the sat
    //  from get_satellite_list
    return Promise.all(
      TVRO.getAntennaStatus()
    ).then(function(xmls) {
      return $('satellite selected', xmls[0]).text();

    });
  };

  
  
  TVRO.getInstalledSat = function() {
    //  antenna_status doesn't always seem to have full sat
    //  info on the installed sat - but it usually has the antSatID
    //  let's just pull the data by matching antSatID with the sat
    //  from get_satellite_list
    return Promise.all(
      TVRO.getAntennaStatus(),
      TVRO.getSatelliteList()
    ).then(function(xmls) {
      var antSatID = $('satellite antSatID', xmls[0]).text();
      return Sat($('satellite', xmls[1]).filter(function() {
        return $('antSatID', this).text() === antSatID;
      }));
    });
  };

  TVRO.setInstalledSat = function(sat) {
    return TVRO.selectSatellite({
      antSatID: sat.antSatID 
    }).then(function(){  
      document.body.className = '/spinner';

      var interval;
      var timeout;

      $('.\\#exit-btn').click(function() {
        clearInterval(interval);
        clearTimeout(timeout);
        TVRO.reload();
      });

      timeout = setTimeout(function() {
        interval = setInterval(function() {
          TVRO.getAntennaStatus(1,1).then(function(xml) {
            var state =  $('antenna state', xml).text();
            $('.\\#ant_status').text("The TV-Hub is Installing the satellite . Status: " + state);
            if ((state === 'SEARCHING') || (state === 'TRACKING')) {
              clearInterval(interval);
              TVRO.reload();
            }else if (state === 'ERROR') {
              clearInterval(interval);
              alert("An error occured installing " + sat.antSatID + ".");
              TVRO.reload();
            }//End if (state === 'ERROR')
          });
        },1000);
      },10000);
    });    
  };

  TVRO.getSatParams = function(sat) {
    //  return the sat we get from getSatelliteParams in a promise
    return TVRO.getSatelliteParams({antSatID:sat.antSatID}, true).then(Sat);
  };


  TVRO.setSatParams = function(sat) {
    //  remove empty xponders
    if (sat['xponder']) sat.xponder = _.compact(sat.xponder);

    var noXponders = _.omit(sat, 'xponder');
    var onlyXponders = _.pick(sat, 'antSatID', 'xponder');

    return TVRO.setSatelliteIdentity(noXponders, 1).then(function() {
      return TVRO.setSatelliteParams(onlyXponders, 1);
    });
  };

  TVRO.getReceivers = function() {
    return Promise.all(
        TVRO.getAutoswitchStatus(1, 1), //  don't cache so that we can get active status
        TVRO.getAutoswitchConfiguredNames(1, 1), //  same here
        TVRO.getSatelliteService(1,1),
        TVRO.getReceiverType()
    ).then(function(xmls) {
      var service = $('service', xmls[2]).text();
      //  get the active receivers
      //  get all receivers
      //  go through all receivers and set receive.active
      if(service === 'DIRECTV'){
        var receivers = _.map($('receiver', xmls[1]), Receiver);
        var activeReceivers = _.map($('receiver', xmls[0]), Receiver);
      }else{
        var receivers = _.map($('autoswitch', xmls[1]), Receiver);
        var activeReceivers = _.map($('autoswitch', xmls[0]), Receiver);        
      }
      return _.forEach(receivers, function(receiver) {
        receiver.active = !!_.find(activeReceivers, { id: receiver.id });
        receiver.type = xmls[3];
      });
    });
  };
  
  TVRO.removeReceiver = function(receiver) {
    if(receiver.type === 'Receiver'){
      return TVRO.setAutoswitchConfiguredNames({
        command: 'DELETE',
        receiver:[{
          name: receiver.name || '',
          ip_address: receiver.ip || ''
        }]
      });
    }else{
      return TVRO.setAutoswitchConfiguredNames({
        command: 'DELETE',
        autoswitch:[{
          name: receiver.name || '',
          sn: receiver.sn || ''
        }]
      });
    }
 
  };

  TVRO.addReceiver = function(receiver) {
    if(receiver.type === 'Receiver'){
      return TVRO.setAutoswitchConfiguredNames({
        command: 'ADD',
        receiver:[{
          name: receiver.name || '',
          ip_address: receiver.ip || ''
        }]
      });
    }else{
      return TVRO.setAutoswitchConfiguredNames({
        command: 'ADD',
        autoswitch:[{
          name: receiver.name || '',
          sn: receiver.sn || ''
        }]
      });
    }
  };

  TVRO.getMasterReceiver = function() {
    return TVRO.getAutoswitchStatus(1, 1).then(function(xml) {
      var master = Receiver($('master', xml));
      master.active = true;
      return master;
    });
  };

  TVRO.setMasterReceiver = function(hub) {
    return TVRO.getSatelliteService().then(function(xml) {
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
    return Promise.all(
        TVRO.getSatelliteService()
    ).then(function (xmls){
      var service = $('service', xmls[0]).text();
      return TVRO.setAutoswitchService({
        enable: enabled ? 'Y' : 'N',
        service: service 
      });
    });
  };

  TVRO.getReceiverType = function() {
    return TVRO.getSatelliteService().then(function(xml) {
      var service = $('service', xml).text();
      if (service === 'DIRECTV') return 'Receiver';
      else return 'IP AutoSwitch';
    });    
  };

  TVRO.getSystemInfo = function() {
    return Promise.all(
      TVRO.getAntennaVersions(),
      TVRO.getAutoswitchStatus(),
      TVRO.getAntennaStatus(),
      TVRO.getWebUIVersion(),
      TVRO.getSatelliteService()
    ).then(function(xmls) {
      var systemInfo = {};
      systemInfo.hubSn = $('acu sn', xmls[0]).text();
      systemInfo.hubVer = $('acu ver', xmls[0]).text();
      systemInfo.dateTime = $('acu date', xmls[0]).text();
      systemInfo.satVer = $('sat_list ver', xmls[0]).text();
      systemInfo.gprsIp = $('gprs ip', xmls[0]).text();
      systemInfo.diseqcVer = $('diseqc ver', xmls[0]).text();
      systemInfo.ipautoswVer = $('ipautosw ver', xmls[0]).text();
      systemInfo.antModel = $('au model', xmls[0]).text();
      systemInfo.systemIDModel = $('au systemIDModel', xmls[0]).text();
      systemInfo.antSn = $('au sn', xmls[0]).text();
      systemInfo.antVer = $('au ver', xmls[0]).text();
      systemInfo.rfVer = $('rf ver', xmls[0]).text();
      systemInfo.fpgaVer = $('fpga:first ver', xmls[0]).text(); //  fpga was coming back twice so i just added :first
      systemInfo.azVer = $('az_el ver', xmls[0]).text();
      systemInfo.skewVer = $('skew_xaz ver', xmls[0]).text();
      systemInfo.lnbName = $('lnb name', xmls[0]).text();
      systemInfo.lnbVer = $('lnb ver', xmls[0]).text();
      systemInfo.service = $('service', xmls[4]).text();
      systemInfo.webUIVer = xmls[3];
      return systemInfo;
    });
  };

  TVRO.getPowerInfo = function() {
    return TVRO.getPower().then(function(xml) {
      var powerInfo = {};
      //  hub
      powerInfo.hubInputSupplyV = $('acu inputsupplyv', xml).text();
      powerInfo.hubInput42V = $('acu input42v', xml).text();
      powerInfo.hubEight = $('acu eight', xml).text();
      powerInfo.hubFive = $('acu five', xml).text();
      powerInfo.hubThreeThree = $('acu three_three', xml).text();
      powerInfo.hubOutput42V = $('acu output42v', xml).text();
      powerInfo.hubOutput24V = $('acu output24v', xml).text();
      powerInfo.hubTempCelsius = $('acu temp_celsius', xml).text();
      //  antenna
      powerInfo.antDc = $('au dc', xml).text();
      powerInfo.antMotor = $('au motor', xml).text();
      powerInfo.antEight = $('au eight', xml).text();
      powerInfo.antFive = $('au five', xml).text();
      powerInfo.antLnb = $('au lnb', xml).text();
      powerInfo.antTemp = $('au temp_celsius', xml).text();
      return powerInfo;
    });
  };

  TVRO.getOphoursInfo = function() {
    return TVRO.getOphours().then(function(xml) {
      var ophoursInfo = {};
      ophoursInfo.hours = $('hours', xml).text();
      return ophoursInfo;
    });
  };

  TVRO.getGroupMode = function() {
    return TVRO.getInstalledGroup().then(function(group) {
      return !!(group && group.getSats().length > 1);
    });
  };

  TVRO.getSleepMode = function() {
    return TVRO.getAntennaConfig().then(function(xml) {
      return $('sleep', xml).text() === 'ON';
    });
  };

  TVRO.setSleepMode = function(arg) {
    return TVRO.setAntennaConfig({
      sleep: arg ? 'ON' : 'OFF'
    });
  };

  TVRO.getSidelobeMode = function() {
    return TVRO.getAntennaConfig().then(function(xml) {
      return $('sidelobe', xml).text() === 'ON';
    });
  };

  TVRO.setSidelobeMode = function(arg) {
    return TVRO.setAntennaConfig({
      sidelobe: arg ? 'ON' : 'OFF'
    });
  };

  //  for now, save these
  //  basically remap these from WebService.js
  var getMultiswitchMode = TVRO.getMultiswitchMode;
  var setMultiswitchMode = TVRO.setMultiswitchMode;

  TVRO.getMultiswitchMode = function() {
    return getMultiswitchMode().then(function(xml) {
      return $('enable', xml).text() === 'Y';
    });
  };

  TVRO.setMultiswitchMode = function(arg) {
    return setMultiswitchMode({
      enable: arg ? 'Y' : 'N'
    });
  };

  TVRO.getLnbType = function() {
    return TVRO.getAntennaVersions().then(function(xml) {
      return $('lnb polarization', xml).text();
    });
  };

  TVRO.getAntModel = function() {
    return TVRO.getAntennaVersions().then(function(xml) {
      return $('au model', xml).text();
    });
  };

}(window.TVRO);