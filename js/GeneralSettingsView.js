!function(TVRO) {
  "use strict";

	var GeneralSettingsView = function(jQ) {
		var self;

    var demoModeBtn = TVRO.ToggleBtn(jQ.find('.\\#demo-mode-btn'))
      .onClick(function(demoMode) {
        TVRO.setDemoMode(demoMode);
        if (TVRO.getShellMode()) TVRO.sendShellCommand('set-demo-mode/' + demoMode);
      });

    var wizardBtn = jQ.find('.\\#wizard-btn').click(function() {
      TVRO.setWizardStatus({
          status: 'NONE'
      }).then( function(){window.location = '/wizard';});
    });

    var reload = function() {
      demoModeBtn.setOn(TVRO.getDemoMode());
    };

		return self = {
      reload: reload
    };
	};

	TVRO.GeneralSettingsView = GeneralSettingsView;

}(window.TVRO);