!function(TVRO) {
  "use strict";

  var SkewAngleView = function(jQ) {
    var SatView = function(jQ) {
      return {
        setSat: function(sat) {
          if (!sat) return $('.\\#sat-name, .\\#sat-skew', jQ).text('N/A');
          //  grab the skews
          TVRO.getSatParams(sat).then(function(sat) {
            $('.\\#sat-name', jQ).text(sat.name + ' - ' + TVRO.formatLongitude(sat.lon, 0));
            $('.\\#sat-skew', jQ).text(sat.skew + '˚');            
          });
        }
      };
    };

    var satAView = SatView($('.\\#sat-a-view', jQ));
    var satBView = SatView($('.\\#sat-b-view', jQ));
    var satCView = SatView($('.\\#sat-c-view', jQ));
    var satDView = SatView($('.\\#sat-d-view', jQ));

    var nextBtn = $('.\\#next-btn', jQ).click(function() {
      //  go to activation page
    });

    var prevBtn = $('.\\#prev-btn', jQ).click(function() {
      window.history.back();
    });

    TVRO.getGroupMode().then(function(groupMode) {
      $('.\\#single', jQ).toggle(!groupMode);
      $('.\\#group', jQ).toggle(groupMode);

      if (groupMode) TVRO.getInstalledGroup().then(function(installedGroup) {
        satAView.setSat(installedGroup.satA);
        satBView.setSat(installedGroup.satB);
        satCView.setSat(installedGroup.satC);
        satDView.setSat(installedGroup.satD);
      });

      else TVRO.getInstalledSat().then(TVRO.getSatParams).then(function(installedSat) {
        $('.\\#single', jQ).text(installedSat.skew + '˚ Skew Angle');
      });
    });
  };



  var LinearSystemConfigView = function(jQ) {
    var self;
    return self;
  };



  var OtherSystemConfigView = function(jQ) {
    var config1 = {
      title: 'Configuration #1',
      subtitle: 'One Receiver',
      bgimage: 'wizard-config-1.svg'
    };

    var config2 = {
      title: 'Configuration #2',
      subtitle: 'One Master Receiver + Multiswitch',
      bgimage: 'wizard-config-2.svg'
    };

    var config3 = {
      title: 'Configuration #3',
      subtitle: 'Multiple Receivers w/ AutoSwitch(es)',
      bgimage: 'wizard-config-3.svg'
    };

    var self = TVRO.TableView($('.\\#table-view', jQ))
      .setValues([config1, config2, config3])
      .onBuild(function(row, config) {
        $('.\\#title', row).text(config.title);
        $('.\\#subtitle', row).text(config.subtitle);
        $('.\\#image', row).css('background-image', 'url(/images/' + config.bgimage + ')');
      })
      .build();

    var nextBtn = $('.\\#next-btn', jQ).click(function() {
      var config = self.getValue();
      if (!config) alert('You must select an option to continue.');
      else if (config === config1) window.location.hash = '/regions';
      else if (config === config2) window.location.hash = '/groups';
      else if (config === config3) window.location.hash = '/groups/new/edit';
    });

    var prevBtn = $('.\\#prev-btn', jQ).click(function() {
      window.history.back();
    });

    return self;
  };

  TVRO.SkewAngleView = SkewAngleView;
  TVRO.LinearSystemConfigView = LinearSystemConfigView;
  TVRO.OtherSystemConfigView = OtherSystemConfigView;

}(window.TVRO);

$(function() {
  var skewAngleView = TVRO.SkewAngleView($('.\\#skew-angle-view'));
  var linearSystemConfigView = TVRO.LinearSystemConfigView($('.\\#linear-system-config-view'));
  var otherSystemConfigView = TVRO.OtherSystemConfigView($('.\\#other-system-config-view'));

  TVRO.onHashChange(function(hash) {

    //  tv1, tv3, tv5 manual

    if (!hash) TVRO.getService().then(function(service) {
      //  bell, dish services
      if (service === 'BELL' || service === 'DISH') window.location.hash = '/other-system-config';
      else return TVRO.getAntennaVersions();
    }).then(function(xml) {
      //  linear tv5, linear tv6
      var lnbType = $('lnb polarization', xmls[0]).text();  
      if (lnbType === 'linear') window.location.hash = '/linear-system-config';
      // else do nothing, continue to /skew-angle
    });

    document.body.className = hash;
  });

  TVRO.reload();
});

/*

"use strict";

TVRO.SystemPage = function() {
	var
	webService = TVRO.WebService(),


	skewAngleView,
	SkewAngleView = function() {
		var self = $.apply($, arguments);

		webService.request('get_satellite_groups', function(response) {
			var group,
				groups = $('group', response).map(function() { return TVRO.Group(this); }).get(),
				satellite,
				isSingle,
				singleView = $('#single', self),
				groupView = $('#group', self);

			webService.request('get_autoswitch_status', function(response) {
				var name = $('satellite_group', response).text(),
					slot = $('master sat', response).text();

				$(groups).each(function() {
					if (this.name === name) {
						group = this;
						satellite = group['satellite'+slot];
						return false;
					}
				});

				isSingle = !!group.satelliteA.antSatID + !!group.satelliteB.antSatID + !!group.satelliteC.antSatID + !!group.satelliteD.antSatID === 1;
				$('#single', self).toggle(isSingle);
				$('#group', self).toggle(!isSingle);

				if (isSingle) {
					$('#skew', singleView).text(satellite.skew);
				} else {
					$(['a', 'b', 'c', 'd']).map(function() {
						var satellite = group['satellite'+this.toUpperCase()],
							view = $('#slot-'+this, groupView);
						view.toggle(!!satellite.antSatID);
						$('#name', view).text(satellite.name);
						webService.request('get_satellite_params', {
							antSatID: satellite.antSatID
						}, function(response) {
							$('#skew', view).text($('skew', response).text());
						});
					});
				}
			});
		});

		$('[id ~= next-btn ]', self).click(function() {
			$(document.body).setClass('at-linear-system-config-view');
		});

		$('[id ~= prev-btn ]', self).click(function() {
			webService.request('get_autoswitch_status', function(response) {

			});
		});

		return $.extend({}, self, {});
	},


	otherSystemConfigView,
	linearSystemConfigView,
	SystemConfigView = function() {
		var self = $.apply($, arguments),
			radio = TVRO.Radio(self);

		$('[id ~= next-btn ]', self).click(function() {
			var selectedValue = radio.selectedValue();
			if (!selectedValue) alert('You must select an option to continue.');
		});

		$('[id ~= prev-btn ]', self).click(function() {
			
		});

		$.each([1, 2, 3, 4], function(undefined, i) {
			$('[id ~= diagram-'+i+'-btn ]', self).click(function() {
				$(document.body).setClass('at-diagram-'+i+'-view');
				return false;
			});

			$('[id ~= close-btn ]', '[id ~= diagram-'+i+'-view ]').click(function() {
				$(document.body).setClass('at-linear-system-config-view');
			});
		});

		return $.extend({}, self, {});
	};


	return {
		init: function() {
			skewAngleView = SkewAngleView('#skew-angle-view');
			otherSystemConfigView = SystemConfigView('#other-system-config-view');
			linearSystemConfigView = SystemConfigView('#linear-system-config-view');
		}
	}
};

TVRO.page = TVRO.SystemPage();

*/