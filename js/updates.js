TVRO.Updates = function() {
	var self = {},
		webService = new TVRO.WebService(),
		antTypes = ['tv1', 'tv3', 'tv5', 'tv6'],
		connectedAntType = '',
		selectedAntType = '';

	(function() {
		for (var i = 0; i < antTypes.length; i++) {
			var antType = antTypes[i];
			self[antType] = {
				antType : antType,
				portalUrl : '',
				portalVersion : '---',
				systemVersion : '---',
				deviceVersion : '---'
			};
		};
	}());

	self.update = function() {
		for (var i = 0; i < antTypes.length; i++) {
			var antType = antTypes[i];
			$('#'+antType+'-device-version').text(self[antType].deviceVersion);

			(function(antType) {
				webService.getPortalVersion(antType, function(responseXml) {
					var xml = $(responseXml),
						error = xml.find('latest_software').attr('error');

					self[antType].portalUrl = xml.find('url').text();
					self[antType].portalVersion = xml.find('software_version').text();
					$('#'+antType+'-portal-version').text(self[antType].portalVersion);
					if (selectedAntType == antType) $('#selected-portal-version').text(self[antType].portalVersion);
				});	
			}(antType));
		}

		webService.getAntennaVersions(function(responseXml) {
			var xml = $(responseXml),
				error = xml.find('message').attr('error'),
				antType = xml.find('au model').text().toLowerCase(),
				systemVersion = xml.find('current').text();

			connectedAntType = antType;
			$('#tv1, #tv3, #tv5, #tv6').removeClass('connected');
			$('#'+connectedAntType).toggleClass('connected', true);

			self[antType].systemVersion = systemVersion;
			$('#'+antType+'-system-version').text(self[antType].systemVersion);
			if (selectedAntType == antType) $('#selected-system-version').text(self[antType].portalVersion);
		});
	};

	$('#tv1, #tv3, #tv5, #tv6').click(function() {
		$('#tv1, #tv3, #tv5, #tv6').removeClass('selected');
		$(this).toggleClass('selected', true);
		selectedAntType = this.id;
		$('#selected-ant-type').text(selectedAntType.toUpperCase());
		$('#selected-portal-version').text(self[selectedAntType].portalVersion);
		$('#selected-system-version').text(self[selectedAntType].systemVersion);
		$('#selected-device-version').text(self[selectedAntType].deviceVersion);
	})

	$('#download-button').click(function() {
		window.location = self[selectedAntType].portalUrl;
	});

	$('#install-input').change(function() {
		$.ajaxFileUpload({
			url : '/xmlservices.php/upload_software',
			secureuri : false,
			fileElementId : 'install-input',
			dataType : 'xml',
			success : function(responseXml) {
				var xml = $(xml),
					error = xml.find('message').attr('error'),
					fileName = xml.find('file_name').text();

				console.log('success!');
				console.log('responseXml:' + responseXml);
				console.log('fileName:' + fileName);

				webService.installSoftware({
					'install' : 'Y',
					'filename' : fileName
				}, function() {
					//	install success!
				});
			},
			error : function(responseXml) {
				console.log('error!');
				console.log('responseXml:' + responseXml);
			}
		});
	});

	tvro.ios(function() {
		//	we're currently using vsat to updates
		//	you can find the switch in base.js WebService
		//	however we're getting xss security errors
		//	eventually kvh will have to update latest_software on their servers to resolve
		//	but for now, to allow us to debug in ios:
		self.tv1.portalUrl = "http://www.kvh.com/VSAT/V3/V3-105.kvh";
		self.tv1.portalVersion = "105";
		$('#tv1-portal-version').text(self.tv1.portalVersion);

		self.tv3.portalUrl = "http://www.kvh.com/VSAT/V7/V7-.kvh";
		self.tv3.portalVersion = "105";	//	for whatever reason v7 updates are getting a version number right now, so just make it up
		$('#tv3-portal-version').text(self.tv3.portalVersion);

		self.tv5.portalUrl = "http://www.kvh.com/VSAT/V7IP/V7IP-105.kvh";
		self.tv5.portalVersion = "105";
		$('#tv5-portal-version').text(self.tv5.portalVersion);

		self.tv6.portalUrl = "http://www.kvh.com/VSAT/V11/V11-105.kvh";
		self.tv6.portalVersion = "105";	
		$('#tv6-portal-version').text(self.tv6.portalVersion);


		window.location = 'tvro://updates/device-versions';

		$('#install-input').click(function() {
			window.location = 'tvro://updates/install/'+selectedAntType;
			return false;
		});

		$('#download-button').unbind('click').click(function() {
			window.location = 'tvro://updates/download/'+selectedAntType+'/'+self[selectedAntType].portalVersion+'/'+self[selectedAntType].portalUrl;
		});
	});

	return self;
};

$(document).ready(function() {
	window.tvro.updates = new TVRO.Updates();
	window.tvro.updates.update();
	window.setInterval(window.tvro.updates.update, 2000);
});