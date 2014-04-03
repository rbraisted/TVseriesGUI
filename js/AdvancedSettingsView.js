!function(TVRO) {
  "use strict";

	var AdvancedSettingsView = function(jQ) {
		var self;

		var reload = function() {
			TVRO.getAntennaConfig().then(function(xml) {
				var sleepModeOn = $('sleep', xml).text() === 'ON';
				var sidelobeModeOn = $('sidelobe', xml).text() === 'ON';
				sleepTogBtn.setOn(sleepModeEnabled);
				sidelobeTogBtn.setOn(sidelobeModeEnabled);
			});

      TVRO.getAntennaVersions().then(function(xml) {
        var antModel = $('au model', xml).text();
        //  if match RV, it's a vehicle
        var vesselType = /RV/.exec(antModel) ? 'vehicle' : 'vessel';  
        $('.\\#vessel-type', jQ).text(vesselType);
      });
		};

    var setMode = function(mode) {
      return function(isEnabled) {
        var params = {};
        params[mode] = isEnabled ? 'ON' : 'OFF';
        TVRO.setAntennaConfig(params).then(reload);
      };
    };

		var sleepModeBtn = TVRO.ToggleBtn(jQ.find('.\\#sleep-mode-btn'))
			.onClick(setMode('sleep'));

		var sidelobeModeBtn = TVRO.ToggleBtn(jQ.find('.\\#sidelobe-mode-btn'))
			.onClick(setMode('sidelobe'));

		return self = {
      reload: reload
    };
	};

	TVRO.AdvancedSettingsView = AdvancedSettingsView;

}(window.TVRO);