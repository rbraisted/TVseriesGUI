!function(TVRO) {
  "use strict";

  var AdvancedSettingsView = function(jQ) {
    var self;

    var techModeBtn = TVRO.ToggleBtn(jQ.find('.\\#tech-mode-btn'))
    .onClick(function(techMode) {
      TVRO.setTechMode(techMode);
      $('.\\#tech-mode', jQ).toggle(TVRO.getTechMode());
      if (TVRO.getShellMode()) TVRO.sendShellCommand('set-tech-mode/' + techMode); //window.location = 'tvro://set-tech-mode/' + techMode;
    });

    var saveBtn = $('.\\#save-btn', jQ).click(function() {
      sessionStorage['kvhupdate'] = $('.\\#update-url', jQ).val();
    });

    var sleepModeBtn = TVRO.ToggleBtn(jQ.find('.\\#sleep-mode-btn'))
      .onClick(TVRO.setSleepMode);

    var sidelobeModeBtn = TVRO.ToggleBtn(jQ.find('.\\#sidelobe-mode-btn'))
      .onClick(TVRO.setSidelobeMode);

    var multiswitchModeBtn = TVRO.ToggleBtn(jQ.find('.\\#multiswitch-mode-btn'))
      .onClick(TVRO.setMultiswitchMode);

    var reload = function() {
      techModeBtn.setOn(TVRO.getTechMode());
      $('.\\#tech-mode', jQ).toggle(TVRO.getTechMode());
      $('.\\#update-url', jQ).val(sessionStorage['kvhupdate']);

        // Only show the sidelobe block when a TV6 or TV8.
      TVRO.getAntModel().then(function(model) {
        jQ.toggleClass('$hide-view', model !== 'TV6' && model !== 'TV8');
      });

        // Only show the multiswitch block when a linear LNB.
      //TVRO.getLnbType().then(function(type) {
      //  jQ.toggleClass('$not-linear', type !== 'linear');
      //});

      TVRO.getSleepMode().then(sleepModeBtn.setOn);
      TVRO.getSidelobeMode().then(sidelobeModeBtn.setOn);
      TVRO.getMultiswitchMode().then(multiswitchModeBtn.setOn);
    };

    return self = {
        reload: reload
    };
  };

  TVRO.AdvancedSettingsView = AdvancedSettingsView;

}(window.TVRO);