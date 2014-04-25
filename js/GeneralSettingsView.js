!function(TVRO) {
  "use strict";

	var GeneralSettingsView = function(jQ) {
		var self;

		var techModeBtn = TVRO.ToggleBtn(jQ.find('.\\#tech-mode-btn'))
			.onClick(function(techMode) {
        TVRO.setTechMode(techMode);
        if (TVRO.getShellMode()) window.location = 'tvro://set-tech-mode/' + techMode;
      });

    var demoModeBtn = TVRO.ToggleBtn(jQ.find('.\\#demo-mode-btn'))
      .onClick(function(demoMode) {
        TVRO.setDemoMode(demoMode);
        if (TVRO.getShellMode()) window.location = 'tvro://set-demo-mode/' + demoMode;
      });

    var wizardBtn = jQ.find('.\\#wizard-btn').click(function() {
      window.location = '/wizard';
    });

    var reload = function() {
      $('.\\#shell', jQ).toggle(TVRO.getShellMode());
      techModeBtn.setOn(TVRO.getTechMode());
      demoModeBtn.setOn(TVRO.getDemoMode());
    };

		return self = {
      reload: reload
    };
	};

	TVRO.GeneralSettingsView = GeneralSettingsView;

}(window.TVRO);