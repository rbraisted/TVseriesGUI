"use strict";

(function(tvro) {

var

request = _.curry(function() {
	return TVRO.WebService().request.apply(null, arguments);
}, 3),

cache = {},

get = function(msg) {
	return function(params, recache) {
		if (cache[msg] && !recache) return cache[msg];
		else return cache[msg] = Promise(request(msg, params));	
	}
},

set = function(msg, resaves) {
	return function(params) {
		return Promise(request(msg, params)).then(function(r) {
			return Promise.all(_.invoke(resaves, 'call', null, undefined, true));
		});
	}
};

tvro.ws = {
	getAntennaStatus: get('antenna_status'),
	getAntennaVersions: get('antenna_versions'),
	getAntennaConfig: get('get_antenna_config'),
	setAntennaConfig: set('set_antenna_config', [
		get('get_antenna_config')
	]),
	getSatelliteList: get('get_satellite_list'),
	selectSatellite: set('select_satellite', [
		get('antenna_status'),
		get('get_autoswitch_status')
	]),
	setSatelliteIdentity: set('set_satellite_identity', [
		get('antenna_status'),
		get('get_autoswitch_status'),
		get('get_satellite_list')
	]),
	getSatelliteParams: get('get_satellite_params'),
	setSatelliteParams: set('set_satellite_params'),
	resetSatelliteParams: set('reset_satellite_params'),
	startSerialLog: set('start_serial_log'),
	serialLogStatus: get('serial_log_status'),
	setGps: set('set_gps'),
	getGps: get('get_gps'),
	getGpsCities: get('get_gps_cities'),
	setNmeaGprmc: set('set_nmea_gprmc'),
	getNmeaHeading: get('get_nmea_heading'),
	setNmeaHeading: set('set_nmea_heading'),
	setGpsConfig: set('set_gps_config'),
	getGpsConfig: get('get_gps_config'),
	setHeadingConfig: set('set_heading_config'),
	getHeadingConfig: get('get_heading_config'),
	reboot: set('reboot'),
	getLnbList: get('get_lnb_list'),
	getVesselConfig: get('get_vessel_config'),
	setVesselConfig: set('set_vessel_config', [
		get('get_vessel_config')
	]),
	getEth: get('get_eth'),
	setEth: set('set_eth', [
		get('get_eth')
	]),
	setEthFactory: set('set_eth_factory', [
		get('get_eth')
	]),
	getWlan: get('get_wlan'),
	setWlan: set('set_wlan', [
		get('get_wlan')
	]),
	setWlanFactory: set('set_wlan_factory', [
		get('get_wlan')
	]),
	getSerialLog: get('get_serial_log'),
	getEventHistoryLog: get('get_event_history_log'),
	getRecentEventHistory: get('get_recent_event_history'),
	getEventHistoryCount: get('get_event_history_count'),

	//	upload_software
	//	upload_software
	//	upload_software

	installSoftware: set('install_software'),
	getSatelliteGroups: get('get_satellite_groups'),
	setSatelliteGroup: set('set_satellite_group', [
		get('antenna_status'),
		get('get_satellite_groups'),
		get('get_autoswitch_status')
	]),
	getAutoswitchStatus: get('get_autoswitch_status'),
	setAutoswitchService: set('set_autoswitch_service', [
		get('antenna_status'),
		get('get_autoswitch_status')
	]),
	getAutoswitchConfiguredNames: get('get_autoswitch_configured_names'),
	setAutoswitchConfiguredNames: set('set_autoswitch_configured_names', [
		get('antenna_status'),
		get('get_autoswitch_status'),
		get('get_autoswitch_configured_names')
	]),
	setAutoswitchMaster: set('set_autoswitch_master', [
		get('antenna_status'),
		get('get_autoswitch_status')
	]),
	getCheckswitchMode: get('get_checkswitch_mode'),
	setCheckswitchMode: set('set_checkswitch_mode'),
	setProductRegistration: set('set_product_registration', [
		get('get_product_registration')
	]),
	getProductRegistration: get('get_product_registration'),
	getWizardStatus: get('get_wizard_status'),
	setWizardStatus: set('set_wizard_status', [
		get('get_wizard_status')
	])
}

}(window.tvro || (window.tvro = {})));