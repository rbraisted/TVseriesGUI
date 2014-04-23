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

    TVRO.getGroupMode().then(function(groupMode) {
      $('.\\#single', jQ).toggle(!groupMode);
      $('.\\#group', jQ).toggle(groupMode);

      if (groupMode) TVRO.getInstalledGroup().then(function(installedGroup) {
        satAView.setSat(installedGroup.satA);
        satBView.setSat(installedGroup.satB);
        satCView.setSat(installedGroup.satC);
        satDView.setSat(installedGroup.satD);
      });

      else TVRO.getInstalledSat().then(function(installedSat) {
        $('.\\#single', jQ).text(installedSat.skew + '˚ Skew Angle');
      });
    });
  };



  var SystemConfigView = function(jQ) {
    return {

    };
  };

  TVRO.SkewAngleView = SkewAngleView;
  TVRO.SystemConfigView = SystemConfigView;

}(window.TVRO);

$(function() {
  var skewAngleView = TVRO.SkewAngleView($('.\\#skew-angle-view'));

  TVRO.onHashChange(function(hash) {
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