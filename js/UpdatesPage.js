$(function() {
  var headerView = TVRO.HeaderView($('.\\#header-view'));

  setInterval(function() {
    headerView.reload();
  }, 3000);

  var menuTableView = TVRO.TableView($('.\\#menu-table-view'))
    .setValues([
      'SatLibrary',
      'TV1',
      'TV3',
      'TV5',
      'TV6',
      'RV1'
    ])
    .onBuild(function(row, update) {
      var techMode = TVRO.getTechMode();
      var antUpdate = update !== 'SatLibrary';
      var updateName = antUpdate ? update : 'Satellite Library';
      $('.\\#update-name', row).text(updateName);

      //  get the system version (the currently installed version)
      TVRO.getAntennaVersions().then(function(xml) {
        var connectedAnt = $('au model', xml).text();
        var connected = update === connectedAnt;
        var systemVersion = $('au ver', xml).text();

        if (antUpdate) {
          row.addClass('$antenna');
          row.toggle(techMode || connected);
          row.toggleClass('$connected', connected);
          $('.\\#system-ver', row).text(systemVersion);
        } else {
          row.addClass('$sat-library');
          systemVersion = $('sat_list ver', xml).text();
          $('.\\#system-ver', row).text(systemVersion);
        }
      });

      //  get the portal version (latest/avail to download)
      TVRO.getLatestSoftware(update).then(function(xml) {
        var portalVersion = $('software_version', xml).text() || $('version', xml).text();
        $('.\\#portal-ver', row).text(portalVersion);
      });
    })
    .onClick(function(update) {
      window.location.hash = '/' + update;
    })
    .build();

  var updateView = TVRO.UpdateView(
    $('.\\#update-view')
      .find('.\\#back-btn')
        .click(function() {
          window.location.hash = '';
        })
        .end()
  );

  //  initializations

  TVRO.onHashChange(function(hash) {
    headerView.reload();
    
    if (hash) {
      var update = hash.substr(1);
      menuTableView.setValue(update);
      updateView.setUpdate(update);
      document.body.className = '/update';
    } else {
      menuTableView.setValue('SatLibrary');
      updateView.setUpdate('SatLibrary');
      // TVRO.getAntennaVersions().then(function(xml) {
      //   var update = $('au model', xml).text();
      //   if (!update) update = 'SatLibrary';
      //   menuTableView.setValue(update);
      //   updateView.setUpdate(update);
      // });
      document.body.className = '';
    }
  });

  TVRO.reload();
});


/*
"use strict";

TVRO.UpdatesPage = function() {
	var
	webService = TVRO.WebService(),
	technicianMode = false,

	antTypes = [],
	AntType = function(antType) {
		return {
			toString: function() { return antType; },
			valueOf: function() { return antType; },
			connected: false,
			portalUrl: '',
			portalVersion: '',
			systemVersion: '',
			deviceVersion: ''
		}
	},

	menuView,
	MenuView = function() {	
		var
		self = $.apply($, arguments),
		radio = TVRO.Radio(self);

		radio.click(function(i) {
			updateView.loadAntType(antTypes[i]);
			$(document.body).setClass('at-update').toggleClass('is-technician-mode', technicianMode);
		});

		return $.extend({}, self, {
			refresh: function() {
				$(antTypes).each(function() {
					var btn = $('[id ~= '+this+'-btn ]', self),
						system = $('[id ~= system ]', btn).toggle(!!this.systemVersion),
						portal = $('[id ~= portal ]', btn).toggle(!!this.portalVersion),
						device = $('[id ~= device ]', btn).toggle(!!this.deviceVersion);

					$('[id ~= connected ]', btn).toggle(this.connected);
					$('[id ~= version ]', system).text(this.systemVersion);
					$('[id ~= version ]', portal).text(this.portalVersion);
					$('[id ~= version ]', device).text(this.deviceVersion);
				});
			}
		});
	},

	updateView,
	UpdateView = function() {
		var
		self = $.apply($, arguments),
		antType = {};

		$('[id ~= back-btn ]', self).click(function() {
			$(document.body).setClass('at-splash').toggleClass('is-technician-mode', technicianMode);
		});

		$('[id ~= download-btn ]', self).click(function() {
			console.log('tvro://updates/download/'+antType+'/'+antType.portalVersion+'/'+antType.portalUrl);
			if (TVRO.MOBILE_APP) {
				window.location = 'tvro://updates/download/'+antType+'/'+antType.portalVersion+'/'+antType.portalUrl;
			} else {
				window.location = antType.portalUrl;
			}
		});

		$('[id ~= upload-btn ]', self).click(function() {
			console.log('tvro://updates/upload/'+antType);
			//	the uploading and installing process for native apps
			//	is handled entirely by native code
			if (TVRO.MOBILE_APP) {
				window.location = 'tvro://updates/upload/'+antType;
			} else {
				$.ajaxFileUpload({
					url : '/xmlservices.php/upload_software',
					secureuri : false,
					fileElementId : 'upload',
					dataType : 'xml',
					success : function(response) {
						if (confirm('Do you wish to install this update?')) {
							webService.request('install_software', {
								install: 'Y',
								filename: $('file_name', response).text()
							});
						}
					}
				});
			}
		});

		return $.extend({}, self, {
			loadAntType: function() {
				antType = arguments[0];

				$('[id ~= ant-type ]', self).text(String(antType).toUpperCase());
				$('[id ~= mobile ]', self).toggle(!!antType.deviceVersion);
				$('[id ~= desktop ]', self).toggle(!antType.deviceVersion);

				var system = $('[id ~= system ]', self),
					portal = $('[id ~= portal ]', self),
					device = $('[id ~= device ]', self);

				$('[id ~= version ]', system).text(antType.systemVersion);
				$('[id ~= version ]', portal).text(antType.portalVersion);
				$('[id ~= version ]', device).text(antType.deviceVersion);
			},
			refresh: function() {
				this.loadAntType(antType);
			}
		});
	}

	return {
		init: function() {
			var cookieManager = TVRO.CookieManager();
			technicianMode = cookieManager.hasCookie(TVRO.TECH_MODE);
			$(document.body).toggleClass('is-technician-mode', technicianMode);

			menuView = MenuView('[id ~= menu-view ]');
			updateView = UpdateView('[id ~= update-view ]');

			//	build out the antenna types
			//	get the latest available versions (portalUrl)
			//	and location of the update on the server
			//	for each antenna type
			antTypes = [AntType('tv1'), AntType('tv3'), AntType('tv5'), AntType('tv6')];
			$(antTypes).each(function() {
				var antType = this;
				webService.request('latest_software', 'http://www.kvhupdate.com/TVRO/'+String(this).toUpperCase()+'/portalMain.php/latest_software', function(response) {
					antType.portalUrl = response.find('url').text();
					antType.portalVersion = response.find('software_version').text();
					menuView.refresh();
					updateView.refresh();
				});
			});

			//	get the connected antenna
			webService.request('antenna_versions', function(response) {
				var systemVersion = $('au ver', response).text(),
					antType = $(antTypes).filter(function() { return this == $('au model', response).text().toLowerCase(); }).get(0);
				if (antType) {
					antType.connected = true;
					antType.systemVersion = systemVersion;
					updateView.loadAntType(antType);
				}
				menuView.refresh();
				updateView.refresh();
			});

			//	if mobile app, use this url to call
			//	native app code (ios objective-c/android java) that should
			//	respond by calling TVRO.page.setDeviceVersions
			if (TVRO.MOBILE_APP) {
				window.location = 'tvro://updates/device-versions';
			}
		},

		//	deviceVersions should look like this:
		//	{
		//		tv1: '101',
		//		tv3: '102',
		//		tv5: '101'
		//	}
		//
		//	if you don't have a device version
		//	for a particular antenna type
		//	just leave it out
		setDeviceVersions: function(deviceVersions) {
			$(antTypes).each(function() {
				this.deviceVersion = deviceVersions[this];
			});

			menuView.refresh();
			updateView.refresh();
		}
	}
}

TVRO.page = new TVRO.UpdatesPage();
*/