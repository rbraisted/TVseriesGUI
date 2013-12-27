"use strict";

TVRO.UpdatesPage = function() {
	var self = {},
		updateInterval,
		cookieManager = new TVRO.CookieManager(),
		webService = new TVRO.WebService(),
		connectedAntType = '',
		selectedAntType = '',
		antTypesData = {};

	//	i don't like how this class is right now
	//	i think it would be better if technician mode
	//	was it's own page
	//	ie
	//	updates/
	//		index.php (non tech mode)
	//		technician-mode.php
	//		base.php (mc - shared by both)

	self.init = function() {
		$('#updates-btn').toggleClass('selected', true);

		$('#computer').toggle(!TVRO.MOBILE_APP);
		$('#device').toggle(TVRO.MOBILE_APP);

		var technicianMode = cookieManager.hasCookie(TVRO.TECH_MODE);
		$('#page').toggleClass('technician-mode', technicianMode);

		$.map(TVRO.ANT_TYPES, function(antType) {
			$('#'+antType+'-device-version').toggle(TVRO.MOBILE_APP);
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
			self.upload(function(response) {
				self.install(response.find('file_name').text());
			});
		});

		webService.request('antenna_versions', function(response) {
			var antType = response.find('au model').text().toLowerCase(),
				systemVersion = response.find('current').text();

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
				var requestUrl = 'http://www.kvhupdate.com/TVRO/'+antType.toUpperCase()+'/portalMain.php/latest_software';
				webService.request('latest_software', requestUrl, function(response) {
					antTypesData[antType].portalUrl = response.find('url').text();
					antTypesData[antType].portalVersion = response.find('software_version').text();
					$('#'+antType+'-portal-version').text(antTypesData[antType].portalVersion);
					if (selectedAntType == antType) $('#portal-version').text(antTypesData[antType].portalVersion);
				});
			}(antType));
		}

		if (TVRO.MOBILE_APP) {
			window.location = 'tvro://updates/device-versions';
		}
	};

	self.download = function() {
		if (TVRO.MOBILE_APP) {
			window.location = 'tvro://updates/download/'+selectedAntType+'/'+self[selectedAntType].portalVersion+'/'+self[selectedAntType].portalUrl;
		} else {
			window.location = antTypesData[selectedAntType].portalUrl;
		}
	};

	self.upload = function(successCallback, errorCallback) {
		if (TVRO.MOBILE_APP) {
			window.location = 'tvro://updates/upload/'+selectedAntType;
		} else {
			$.ajaxFileUpload({
				url : '/xmlservices.php/upload_software',
				secureuri : false,
				fileElementId : 'upload',
				dataType : 'xml',
				success : successCallback,
				error : errorCallback
			});			
		}
	};

	self.install = function(fileName) {
		webService.request('install_software', {
			'install' : 'Y',
			'filename' : fileName
		}, function() {
			//	install success!
		});
	};

	self.setDeviceVersions = function(deviceVersions) {
		//	expects:
		//	{ 'antType' : 'version', 'antType' : 'version' }
		for (var antType in antTypesData) {
			if (deviceVersions[antType]) {
				antTypesData[antType].deviceVersion = deviceVersions[antType];
				$('#'+antType+'-device-version').text(antTypesData[antType].deviceVersion);
			}
		};
	};

	return self;
};

TVRO.page = new TVRO.UpdatesPage();