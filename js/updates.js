"use strict";

TVRO.UpdatesPage = function() {
	var self = {},
		updateInterval,
		cookieManager = new TVRO.CookieManager(),
		webService = new TVRO.WebService(),
		connectedAntType = '',
		selectedAntType = '',
		antTypesData = {};

	self.init = function() {
		$('#updates-btn').toggleClass('selected', true);

		var technicianMode = cookieManager.hasCookie(TVRO.TECH_MODE);
		$('#page').toggleClass('technician-mode', technicianMode);

		$.map(TVRO.ANT_TYPES, function(antType) {
			antTypesData[antType] = {
				portalUrl : '',
				portalVersion : '',
				systemVersion : '',
				deviceVersion : ''
			}
		});

		$('#tv1-btn, #tv3-btn, #tv5-btn, #tv6-btn').click(function() {
			selectedAntType = {
				'tv1-btn' : TVRO.ANT_TYPES.TV1,
				'tv3-btn' : TVRO.ANT_TYPES.TV3,
				'tv5-btn' : TVRO.ANT_TYPES.TV5,
				'tv6-btn' : TVRO.ANT_TYPES.TV6
			}[this.id];

			$('#ant-type').text(selectedAntType.toUpperCase());
			$('#portal-version').text(antTypesData[selectedAntType].portalVersion);
			$('#system-version').text(antTypesData[selectedAntType].systemVersion);
			$('#device-version').text(antTypesData[selectedAntType].deviceVersion);

			$('#tv1-btn, #tv3-btn, #tv5-btn, #tv6-btn, #sb').removeClass('selected');
			$('#'+this.id+', #mc').toggleClass('selected', true);
		});

		$('#back-btn').click(function() {
			$('#tv1-btn, #tv3-btn, #tv5-btn, #tv6-btn, #mc').removeClass('selected');
			$('#sb').toggleClass('selected', true);
		});

		$('#download-btn').click(function() {
			self.download();
		});

		$('#install-btn').click(function() {
			self.upload(function(responseXml) {
				var xml = $(xml),
					error = xml.find('message').attr('error'),
					fileName = xml.find('file_name').text();
				self.install(fileName);
			});
		});

		webService.getAntennaVersions(function(responseXml) {
			var xml = $(responseXml),
				error = xml.find('message').attr('error'),
				antType = xml.find('au model').text().toLowerCase(),
				systemVersion = xml.find('current').text();

			connectedAntType = antType;
			$('#tv1-btn, #tv3-btn, #tv5-btn, #tv6-btn').removeClass('connected');
			$('#'+connectedAntType+'-btn').toggleClass('connected', true);

			if (!technicianMode) {
				selectedAntType = connectedAntType;
				$('#tv1, #tv3, #tv5, #tv6').removeClass('selected');
				$('#'+connectedAntType).toggleClass('selected', true);
			}

			antTypesData[antType].systemVersion = systemVersion;
			$('#'+antType+'-system-version').text(antTypesData[antType].systemVersion);
			if (selectedAntType == antType) $('#system-version').text(antTypesData[antType].portalVersion);
		});

		for (var antType in antTypesData) {
			(function(antType) {
				webService.getPortalVersion(antType, function(responseXml) {
					var xml = $(responseXml),
						error = xml.find('latest_software').attr('error');

					antTypesData[antType].portalUrl = xml.find('url').text();
					antTypesData[antType].portalVersion = xml.find('software_version').text();
					$('#'+antType+'-portal-version').text(antTypesData[antType].portalVersion);
					if (selectedAntType == antType) $('#portal-version').text(antTypesData[antType].portalVersion);
				});	
			}(antType));
		}
	};

	self.download = function() {
		window.location = antTypesData[selectedAntType].portalUrl;
	};

	self.upload = function(successCallback, errorCallback) {
		$.ajaxFileUpload({
			url : '/xmlservices.php/upload_software',
			secureuri : false,
			fileElementId : 'upload',
			dataType : 'xml',
			success : successCallback,
			error : errorCallback
		});
	};

	self.install = function(fileName) {
		webService.installSoftware({
			'install' : 'Y',
			'filename' : fileName
		}, function() {
			//	install success!
		});
	};

	// self.ios = function() {
	// 	//	we're currently using vsat to updates
	// 	//	you can find the switch in base.js WebService
	// 	//	however we're getting xss security errors
	// 	//	eventually kvh will have to update latest_software on their servers to resolve
	// 	//	but for now, to allow us to debug in ios:
	// 	antTypesData.tv1.portalUrl = "http://www.kvh.com/VSAT/V3/V3-105.kvh";
	// 	antTypesData.tv1.portalVersion = "105";
	// 	$('#tv1-portal-version').text(antTypesData.tv1.portalVersion);

	// 	antTypesData.tv3.portalUrl = "http://www.kvh.com/VSAT/V7/V7-.kvh";
	// 	antTypesData.tv3.portalVersion = "105";	//	for whatever reason v7 updates are getting a version number right now, so just make it up
	// 	$('#tv3-portal-version').text(antTypesData.tv3.portalVersion);

	// 	antTypesData.tv5.portalUrl = "http://www.kvh.com/VSAT/V7IP/V7IP-105.kvh";
	// 	antTypesData.tv5.portalVersion = "105";
	// 	$('#tv5-portal-version').text(antTypesData.tv5.portalVersion);

	// 	antTypesData.tv6.portalUrl = "http://www.kvh.com/VSAT/V11/V11-105.kvh";
	// 	antTypesData.tv6.portalVersion = "105";	
	// 	$('#tv6-portal-version').text(antTypesData.tv6.portalVersion);

	// 	self.setDeviceVersions = function(deviceVersions) {
	// 		//	expects:
	// 		//	{ 'antType' : 'version', 'antType' : 'version' }
	// 		alert(antTypes.length);
	// 		for (var antType in antTypesData) {
	// 			if (deviceVersions[antType]) {
	// 				antTypesData[antType].deviceVersion = deviceVersions[antType];
	// 				$('#'+antType+'-device-version').text(antTypesData[antType].deviceVersion);
	// 			}
	// 		};
	// 	};

	// 	self.upload = function() {
	// 		window.location = 'tvro://updates/upload/'+selectedAntType;
	// 	};

	// 	self.download = function() {
	// 		window.location = 'tvro://updates/download/'+selectedAntType+'/'+self[selectedAntType].portalVersion+'/'+self[selectedAntType].portalUrl;
	// 	};

	// 	window.location = 'tvro://updates/device-versions';
	// };

	return self;
};

TVRO.page = new TVRO.UpdatesPage();