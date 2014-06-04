!function(TVRO) {
  "use strict";

  var GeneralSettingsView = function(jQ) {
    var self;

    var checkSwitchModeBtn = TVRO.ToggleBtn(jQ.find('.\\#checkswitch-mode-btn'))
    .onClick(function(isEnabled){
      return TVRO.setCheckswitchMode({
        enable : isEnabled ? 'Y' : 'N'
      })
    });

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

      Promise.all(
          TVRO.getCheckswitchMode(1, 1),
          TVRO.getSatelliteService(1, 1)
      ).then(function(xml) {
        var checkSwitchModeOn = $('enable', xml[0]).text() === 'Y';
        var service = $('service', xml[1]).text();

        jQ.toggleClass('$dtv-service', (service !== "DISH" && service !== "BELL"));

        checkSwitchModeBtn.setOn(checkSwitchModeOn);
      });
    };

    return self = {
        reload: reload
    };
  };

  TVRO.GeneralSettingsView = GeneralSettingsView;

}(window.TVRO);