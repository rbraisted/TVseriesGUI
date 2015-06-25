!function(TVRO) {
  "use strict";

  var GeneralSettingsView = function(jQ) {
    var self;

    var checkSwitchModeBtn = TVRO.ToggleBtn(jQ.find('.\\#checkswitch-mode-btn'))
      .onClick(TVRO.setCheckswitchMode);

    var demoModeBtn = TVRO.ToggleBtn(jQ.find('.\\#demo-mode-btn'))
    .onClick(function(demoMode) {
      TVRO.setDemoMode(demoMode);
      if (TVRO.getShellMode()) TVRO.sendShellCommand('set-demo-mode/' + demoMode);
    });

    var wizardBtn = jQ.find('.\\#wizard-btn').click(function() {
      TVRO.setWizardComplete(false)
        .then(function() { window.location = '/wizard'; });
    });

    var gpsLocationBtn = jQ.find('.\\#gps-location-btn').click(function() {
      window.location.hash = '/vessel-location';
    });

    var reload = function() {
      demoModeBtn.setOn(TVRO.getDemoMode());

      TVRO.getService().then(function(service) {
        jQ.toggleClass('$dtv-service', (service !== "DISH" && service !== "BELL"));
        TVRO.resizeSidebar("general");
      });

      TVRO.getCheckswitchMode().then(checkSwitchModeBtn.setOn);
    };

    return self = {
        reload: reload
    };
  };

  TVRO.GeneralSettingsView = GeneralSettingsView;

}(window.TVRO);