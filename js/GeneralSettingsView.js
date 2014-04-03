!function(TVRO) {
  "use strict";

	var GeneralSettingsView = function(jQ) {
		var self;

		var techModeBtn = TVRO.ToggleBtn(jQ.find('.\\#tech-mode-btn'))
			.onClick(TVRO.setTechMode);

    var demoModeBtn = TVRO.ToggleBtn(jQ.find('.\\#demo-mode-btn'))
      .onClick(TVRO.setDemoMode);

		var wizardBtn = jQ.find('.\\#wizard-btn').click(function() {
      window.location = '/wizard';
    });

    var reload = function() {
      techModeBtn.setOn(TVRO.getTechMode());
      demoModeBtn.setOn(TVRO.getDemoMode());
    };

		return self = {
      reload: reload
    };
	};

	TVRO.GeneralSettingsView = GeneralSettingsView;

}(window.TVRO);