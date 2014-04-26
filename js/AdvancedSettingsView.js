!function(TVRO) {
  "use strict";

	var AdvancedSettingsView = function(jQ) {
		var self;

    var techModeBtn = TVRO.ToggleBtn(jQ.find('.\\#tech-mode-btn'))
      .onClick(function(techMode) {
        TVRO.setTechMode(techMode);
        if (TVRO.getShellMode()) window.location = 'tvro://set-tech-mode/' + techMode;
      });

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

    var reload = function() {
      techModeBtn.setOn(TVRO.getTechMode());
      
      TVRO.getAntennaConfig().then(function(xml) {
        var sleepModeOn = $('sleep', xml).text() === 'ON';
        var sidelobeModeOn = $('sidelobe', xml).text() === 'ON';
        sleepModeBtn.setOn(sleepModeOn);
        sidelobeModeBtn.setOn(sidelobeModeOn);
      });
    };

		return self = {
      reload: reload
    };
	};

	TVRO.AdvancedSettingsView = AdvancedSettingsView;

}(window.TVRO);