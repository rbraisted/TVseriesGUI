TVRO.UpdatesPage = function() {
	var self = {},
		updateInterval,
		cookieManager = new TVRO.CookieManager(),
		webService = new TVRO.WebService(),
		connectedAntType = '',
		selectedAntType = '',
		antTypes = ['tv1', 'tv3', 'tv5', 'tv6'],
		ants = (function() {
			var ants = {};
			for (var i = 0; i < antTypes.length; i++) {
				var antType = antTypes[i];
				ants[antType] = {
					antType : antType,
					portalUrl : '',
					portalVersion : '',
					systemVersion : '',
					deviceVersion : ''
				};
			};
			return ants;
		}());

	self.init = function() {
		$('#tv1, #tv3, #tv5, #tv6').click(function() {			
			selectedAntType = this.id;
			$('#selected-ant-type').text(selectedAntType.toUpperCase());
			$('#selected-portal-version').text(ants[selectedAntType].portalVersion);
			$('#selected-system-version').text(ants[selectedAntType].systemVersion);
			$('#selected-device-version').text(ants[selectedAntType].deviceVersion);

			$('#tv1, #tv3, #tv5, #tv6, #updates-menu').removeClass('selected');
			$('#'+this.id+', #updates-main').toggleClass('selected', true);
		});

		$('#back-btn').click(function() {
			$('#mc').removeClass('selected');
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

		self.startUpdating();
	};

	self.startUpdating = function() {
		self.update();
		updateInterval = setInterval(self.update, 2000);
	};

	self.stopUpdating = function() {
		clearInterval(updateInterval);
	};

	self.update = function() {
		var technicianMode = cookieManager.hasCookie('technician-mode');
		console.log("technicianMode: "+technicianMode);
		$('#page').toggleClass('technician-mode', technicianMode);

		webService.getAntennaVersions(function(responseXml) {
			var xml = $(responseXml),
				error = xml.find('message').attr('error'),
				antType = xml.find('au model').text().toLowerCase(),
				systemVersion = xml.find('current').text();

			connectedAntType = antType;
			$('#tv1, #tv3, #tv5, #tv6').removeClass('connected');
			$('#'+connectedAntType).toggleClass('connected', true);

			if (!technicianMode) {
				selectedAntType = connectedAntType;
				$('#tv1, #tv3, #tv5, #tv6').removeClass('selected');
				$('#'+connectedAntType).toggleClass('selected', true);
			}

			ants[antType].systemVersion = systemVersion;
			$('#'+antType+'-system-version').text(ants[antType].systemVersion);
			if (selectedAntType == antType) $('#selected-system-version').text(ants[antType].portalVersion);
		});

		for (var antType in ants) {
			(function(antType) {
				webService.getPortalVersion(antType, function(responseXml) {
					var xml = $(responseXml),
						error = xml.find('latest_software').attr('error');

					ants[antType].portalUrl = xml.find('url').text();
					ants[antType].portalVersion = xml.find('software_version').text();
					$('#'+antType+'-portal-version').text(ants[antType].portalVersion);
					if (selectedAntType == antType) $('#selected-portal-version').text(ants[antType].portalVersion);
				});	
			}(antType));
		}
	};

	self.download = function() {
		window.location = ants[selectedAntType].portalUrl;
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

	self.ios = function() {
		//	we're currently using vsat to updates
		//	you can find the switch in base.js WebService
		//	however we're getting xss security errors
		//	eventually kvh will have to update latest_software on their servers to resolve
		//	but for now, to allow us to debug in ios:
		ants.tv1.portalUrl = "http://www.kvh.com/VSAT/V3/V3-105.kvh";
		ants.tv1.portalVersion = "105";
		$('#tv1-portal-version').text(ants.tv1.portalVersion);

		ants.tv3.portalUrl = "http://www.kvh.com/VSAT/V7/V7-.kvh";
		ants.tv3.portalVersion = "105";	//	for whatever reason v7 updates are getting a version number right now, so just make it up
		$('#tv3-portal-version').text(ants.tv3.portalVersion);

		ants.tv5.portalUrl = "http://www.kvh.com/VSAT/V7IP/V7IP-105.kvh";
		ants.tv5.portalVersion = "105";
		$('#tv5-portal-version').text(ants.tv5.portalVersion);

		ants.tv6.portalUrl = "http://www.kvh.com/VSAT/V11/V11-105.kvh";
		ants.tv6.portalVersion = "105";	
		$('#tv6-portal-version').text(ants.tv6.portalVersion);

		self.setDeviceVersions = function(deviceVersions) {
			//	expects:
			//	{ 'antType' : 'version', 'antType' : 'version' }
			alert(antTypes.length);
			for (var antType in ants) {
				if (deviceVersions[antType]) {
					ants[antType].deviceVersion = deviceVersions[antType];
					$('#'+antType+'-device-version').text(ants[antType].deviceVersion);
				}
			};
		};

		self.upload = function() {
			window.location = 'tvro://updates/upload/'+selectedAntType;
		};

		self.download = function() {
			window.location = 'tvro://updates/download/'+selectedAntType+'/'+self[selectedAntType].portalVersion+'/'+self[selectedAntType].portalUrl;
		};

		window.location = 'tvro://updates/device-versions';
	};

	return self;
};

$(document).ready(function() {
	window.tvro.updatesPage = new TVRO.UpdatesPage();
	window.tvro.updatesPage.init();
});