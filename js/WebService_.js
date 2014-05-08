//  requires Cookies.js
!function(TVRO) {
  "use strict";

  var jsonAsXml = function(json) {
  //  user: {
  //    firstname : 'John',
  //    lastname : 'Smith',
  //    city : 'Middletown',
  //    state : 'Rhode Island'
  //  },
  //  sat: [{
  //    name: 'Sat A',
  //    antSatID: '11W'
  //  }, {
  //    name: 'Sat B',
  //    antSatID: '22W'
  //  }]
  //
  //  will be sent as:
  //
  //  <user>
  //    <firstname>John</firstname>
  //    <lastname>Smitch</lastname>
  //    <city>Middletown</city>
  //    <state>Rhode Island</state>
  //  </user>
  //  <sat>
  //    <name>Sat A</name>
  //    <antSatID>11W</antSatID>
  //  </sat>
  //  <sat>
  //    <name>Sat B</name>
  //    <antSatID>22W</antSatID>
  //  </sat>

    var xml = '';
    for (var key in json) {
      var value = json[key];
      //  check this first becasue Array is also Object
      if (value instanceof Array) {
        for (var i = 0; i < value.length; i++) {
          xml += '<'+key+'>'+jsonAsXml(value[i])+'</'+key+'>';
        }
      //  then check for Object
      } else if (typeof value === 'object') {
        xml += '<'+key+'>'+jsonAsXml(value)+'</'+key+'>';
      } else {
        xml += '<'+key+'>'+value+'</'+key+'>';
      }
    }
    return xml;
  };

  var request = _.curry(function() {
    var contentType;
    var requestUrl;
    var requestName;
    var requestJson;
    var requestXml;
    var successCallback;
    var errorCallback;

    var liveUrl = '/webservice.php';
    var demoUrl = '/demo/webservice.php';

    for (var index in arguments) {
      var argument = arguments[index];
      if (typeof argument === 'object') requestJson = argument;
      else if (typeof argument === 'string' && !requestName) requestName = argument;
      else if (typeof argument === 'string' && !requestUrl) requestUrl = argument;
      else if (typeof argument === 'function' && !successCallback) successCallback = argument;
      else if (typeof argument === 'function' && !errorCallback) errorCallback = argument;
    }

    if (!requestUrl) {
      contentType = 'text/xml';
      if (TVRO.getDemoMode()) requestUrl = demoUrl;
      else requestUrl = liveUrl;

    } else {
      contentType = 'application/x-www-form-urlencoded; charset=UTF-8';
    }

    requestXml = '<ipacu_request><message name="'+requestName+'" />'+jsonAsXml(requestJson)+'</ipacu_request>';

    $.ajax({
      type: 'post',
      contentType: contentType,
      processData: false,
      dataType: 'xml',
      url: requestUrl,
      data: requestXml,
      success: function(response) {
        if (TVRO.debug) {
          console.log('~ '+requestName.toUpperCase());
          if ((TVRO.debug > 1 && requestName !== 'antenna_status') || (TVRO.debug > 2)) {
            console.log($(requestXml).get(0));
            console.log($('ipacu_response', response).get(0));
          }
        }

        var error = $(response).find('ipacu_response > message').attr('error');

        if (error === '0' && successCallback) successCallback($(response));
        else if (error !== '0' && errorCallback) errorCallback(error);

        // The error numbers are defined as
        // NOT_WRITTEN_YET          -1  TODO: remove this once everything does get written.
        // ERROR                    1   Doesn't fall into another category.  Shouldn't really be used...
        // INVALID_XML_MESSAGE      2   Not only don't I understand you, you're not even sending XML.
        // UNKNOWN_MESSAGE          3   Sorry boss, I don't know what you're asking me.
        // MISSING_ELEMENT_ERROR    4   Required tag is missing from XML data
        // INVALID_ELEMENT_VALUE    5   I found the correct tag, but the value inside it makes no sense
        // MISSING_DATA             6   Couldn't find the information you requested.
        // UNKNOWN_FILE_NAME_ERROR  7   File name is not in the known list
        // FILE_NOT_FOUND_ERROR     8   Couldn't find the file (does not exist on system)
        // FILE_UNREADABLE_ERROR    9   Couldn't read from file
        // FILE_LOCKED_ERROR        10  Couldn't open file for writing
        // FILE_UNWRITABLE_ERROR    11  Couldn't write to file
        // EVENT_NOT_FOUND          12  The starting value is greater than the number we have in our list, so no events will be returned.
        // TOO_MANY_EVENTS          13  We have at least the starting value number of events, but not so many that we are able to return the desired number.
        // DATASTORE_UNAVAILABLE    14  Umm...I don't know what to do here, nor do I know when this could happen.
        // TIMEOUT                  15  Ttl was not specified or 0, or requested button was not pressed
        // INVALID_UPDATE_FILE      16  The name you provided doesn't start with "HD11-" and end with ".kvh".
        // DUPLICATE_DATA           17  data value already in use
        // -Paul
        
        // I have added a new error code for TV-HUB messages.
        // 18 means configuration error, specifically for
        // TV-HUB this means the LNB is not configured. This
        // should never be a problem after we start production
        // because the factory will always install and configure the LNB.
        // -Paul
      },
      error: function(jqXHR, textStatus, errorThrown) {
        if (TVRO.debug) {
          console.log('\n~ ! ~');
          console.log(jqXHR);
          console.log(textStatus);
          console.log(errorThrown);
          console.log('\n');
        }

        if (requestUrl !== liveUrl || requestUrl !== demoUrl) {
          errorCallback(errorThrown);
        }
      }
    });
  }, 3);

  var cache = {};

  var get = function(msg) {
  	return function(params, recache) {
  		if (cache[msg] && !recache) return cache[msg];
  		else return cache[msg] = Promise(request(msg, params));	
  	}
  };

  var set = function(msg, resaves) {
  	return function(params) {
  		return Promise(request(msg, params)).then(function(r) {
  			return Promise.all(_.invoke(resaves, 'call', null, undefined, true));
  		});
  	}
  };

  //  'getting'
  //  caches the result so you don't make too many calls
  //  TVRO.messageName = get('message_name')
  //  TVRO.messageName is now a function with this signature:
  //  TVRO.messageName(paramsJsonThatWillBeConvertedToXMLToSend,
  //                   shouldForceAjaxCallInsteadOfReturningCachedResult)

  //  'setting'
  //  TVRO.messageName = set('message_name', [
  //                       get('some_xml_that_needs_to_be_updated_as_a_result'),
  //                       get('some_xml_that_needs_to_be_updated_as_a_result')
  //                     ])
  //  for example, if you set_antenna_config,
  //  you probably expect that the results of get_antenna_config will have
  //  changed on the box. since get_antenna_config is cached, you'll want
  //  the call to set_antenna_config to remove get_antenna_config from the cache
  //  so that calls to it will bring you fresh data

  //  NOTE ABOUT CUSTOM CALLS:
  //  at the bottom here we have some custom calls that will also get cached
  //  but if you intend to add a webservice call on the back end
  //  because we use the message name as a key to items in the cache
  //  just make sure you don't accidentally write over something in the cache
  //  by giving a backend call the same message name as a custom call here

  TVRO.getSatelliteService = get('get_satellite_service');
	  
	TVRO.setSatelliteService = set('set_satellite_service', [
	                          		get('get_satellite_service')
	                                ]);

	TVRO.getAntennaStatus = get('antenna_status');

	TVRO.getAntennaVersions = get('antenna_versions');

	TVRO.getAntennaConfig = get('get_antenna_config');

	TVRO.setAntennaConfig = set('set_antenna_config', [
		get('get_antenna_config')
	]);

	TVRO.getSatelliteList = get('get_satellite_list'),

	TVRO.selectSatellite = set('select_satellite', [
		get('antenna_status'),
		get('get_autoswitch_status')
	]);

	TVRO.setSatelliteIdentity = set('set_satellite_identity', [
		get('antenna_status'),
		get('get_autoswitch_status'),
		get('get_satellite_list')
	]);

	TVRO.getSatelliteParams = get('get_satellite_params');

	TVRO.setSatelliteParams = set('set_satellite_params');

	TVRO.resetSatelliteParams = set('reset_satellite_params');

	TVRO.startSerialLog = set('start_serial_log');

	TVRO.serialLogStatus = get('serial_log_status');

	TVRO.setGps = set('set_gps');

	TVRO.getGps = get('get_gps');

	TVRO.getGpsCities = get('get_gps_cities');

	TVRO.setNmeaGprmc = set('set_nmea_gprmc');

	TVRO.getNmeaHeading = get('get_nmea_heading');

	TVRO.setNmeaHeading = set('set_nmea_heading');

	TVRO.setGpsConfig = set('set_gps_config');

	TVRO.getGpsConfig = get('get_gps_config');

	TVRO.setHeadingConfig = set('set_heading_config');

	TVRO.getHeadingConfig = get('get_heading_config');

  TVRO.reboot = set('reboot');

  TVRO.resetSoftware = set('reset_software');

  TVRO.getPower = get('power');

	TVRO.getLnbList = get('get_lnb_list');

	TVRO.getVesselConfig = get('get_vessel_config');

	TVRO.setVesselConfig = set('set_vessel_config', [
		get('get_vessel_config')
	]);

	TVRO.getEth = get('get_eth');

	TVRO.setEth = set('set_eth', [
		get('get_eth')
	]);

	TVRO.setEthFactory = set('set_eth_factory', [
		get('get_eth')
	]);

	TVRO.getWlan = get('get_wlan');

	TVRO.setWlan = set('set_wlan', [
		get('get_wlan')
	]);

	TVRO.setWlanFactory = set('set_wlan_factory', [
		get('get_wlan')
	]);

	TVRO.getSerialLog = get('get_serial_log');

	TVRO.getEventHistoryLog = get('get_event_history_log');

	TVRO.getRecentEventHistory = get('get_recent_event_history');

	TVRO.getEventHistoryCount = get('get_event_history_count');

	TVRO.installSoftware = set('install_software');

	TVRO.getSatelliteGroups = get('get_satellite_groups');

	TVRO.setSatelliteGroup = set('set_satellite_group', [
		get('antenna_status'),
		get('get_satellite_groups'),
		get('get_autoswitch_status')
	]);

	TVRO.getAutoswitchStatus = get('get_autoswitch_status'),

	TVRO.setAutoswitchService = set('set_autoswitch_service', [
		get('antenna_status'),
		get('get_autoswitch_status')
	]);

	TVRO.getAutoswitchConfiguredNames = get('get_autoswitch_configured_names'),

	TVRO.setAutoswitchConfiguredNames = set('set_autoswitch_configured_names', [
		get('antenna_status'),
		get('get_autoswitch_status'),
		get('get_autoswitch_configured_names')
	]);

	TVRO.setAutoswitchMaster = set('set_autoswitch_master', [
		get('antenna_status'),
		get('get_autoswitch_status')
	]);

	TVRO.getCheckswitchMode = get('get_checkswitch_mode');

	TVRO.setCheckswitchMode = set('set_checkswitch_mode');

	TVRO.setProductRegistration = set('set_product_registration', [
		get('get_product_registration')
	]);

	TVRO.getProductRegistration = get('get_product_registration');

  TVRO.getWizardStatus = get('get_wizard_status');

  TVRO.setWizardStatus = set('set_wizard_status', [
    get('get_wizard_status')
  ]);

	TVRO.getCallhome = get('get_callhome');

	TVRO.setCallhome = set('set_callhome', [
		get('get_callhome')
	]);

  //  custom call to get web ui version from version.txt
  TVRO.getWebUIVersion = function() {
    return Promise(function(resolve, reject) {
      $.ajax({
        url: '/version.txt',
        success: function(txt) {
          resolve(txt.replace('tvserieswebapp=', ''));
        },
        error: reject
      });
    });
  };

  //  custom calls for updates page
  TVRO.getLatestSoftware = function(update) {
    var msg = update === 'SatLibrary' ? 'latest_sat_library' : 'latest_software';
    var url = 'http://www.kvhupdate.com/TVRO/'+update+'/portalMain.php/'+msg;
    var cacheName = 'update_' + update;
    if (cache[cacheName]) return cache[cacheName];
    else return cache[cacheName] = get(msg)(url, 1);
  };

  //  device versions
  //  basically we return a promise
  //  which is fulfilled when somebody calls setDeviceVersions
  //  so on the desktop nothing actually happens right now
  //  but later we could give the desktop version some reason to call
  //  setDeviceVersions and it should work out ok
  //  in shell mode though, we send out a tvro:// call and the app (iOS/Android)
  //  should respond by calling setDeviceVersions

  var deviceVersions;
  var getDeviceVersionsCallbacks = [];
  var getDeviceVersions = function(callback) {
    if (!_.isUndefined(deviceVersions)) callback(null, deviceVersions);
    getDeviceVersionsCallbacks.push(callback);
  };

  var setDeviceVersions = function(arg) {
    deviceVersions = arg;
    _.invoke(getDeviceVersionsCallbacks, 'call', null, null, deviceVersions);
  };

  TVRO.setDeviceVersions = setDeviceVersions;
  TVRO.getDeviceVersions = function(recache) {
    if (cache['get_device_versions'] && !recache) {
      return cache['get_device_versions'];
    } else {
      if (TVRO.getShellMode()) window.location = 'tvro://get-device-versions';
      return cache['get_device_versions'] = Promise.denodeify(getDeviceVersions)();
    }
  };

    //  pull from the box first,
    //  then if any of these fields are unavailable try getting them from
    //  cookies and in shell mode by making a tvro:// call
  var installerInfo;
  var getInstallerInfoCallbacks = [];
  var getInstallerInfo = function(callback) {
    if (!_.isUndefined(deviceVersions)) callback(null, deviceVersions);
    getInstallerInfoCallbacks.push(callback);    
  };

  var setInstallerInfo = function(arg) {
    installerInfo = arg;
    _.invoke(getInstallerInfoCallbacks, 'call', null, null, installerInfo);
  };

  TVRO.setInstallerInfo = setInstallerInfo;
  TVRO.getInstallerInfo = function() {
    if (cache['get_installer_info'] && !recache) {
      return cache['get_installer_info'];
    } else {
      //  pull from the box first,
      //  then if any of these fields are unavailable try getting them from
      //  cookies and in shell mode by making a tvro:// call
      TVRO.getProductRegistration().then(function(xml) {
        var company = $('dealer company', xml).text();
        var contact = $('dealer installer_name', xml).text();
        var phone = $('dealer installer_phone', xml).text();
        var email = $('dealer installer_email', xml).text();

        //  since the ui forces you to enter all four of these fields,
        //  let's just assume that if company is available then the other
        //  fields will be too
        if (company) {
          //  we found the box's stored installer info
          //  this should fulfill the getInstallerInfo promise
          TVRO.setInstallerInfo({
            company: company,
            contact: contact,
            phone: phone,
            email: email
          });
        } else if (TVRO.getShellMode()) {
          //  in shell mode, we'll ask the shell device (iOS/Android)
          //  to call setInstallerInfo for us
          window.location = 'tvro://get-installer-info';
        } else if (TVRO.getInstallerCompany()) {
          //  otherwise, check cookies
          TVRO.setInstallerInfo({
            company: TVRO.getInstallerCompany(),
            contact: TVRO.getInstallerContact(),
            phone: TVRO.getInstallerPhone(),
            email: TVRO.getInstallerEmail()
          });
        }
      });

      return cache['get_installer_info'] = Promise.denodeify(getInstallerInfo)();
    }
  };


  //  it's easier to just keep getting antenna_status here
  //  we need it to be updated on all the main gui pages
  setInterval(function() {
    //  it's call(params, forceRecache)
    TVRO.getAntennaStatus({}, 1);
  }, 3000);

}(window.TVRO);