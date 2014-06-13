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

    var multiswitchModeBtn = TVRO.ToggleBtn(jQ.find('.\\#multiswitch-mode-btn'))
    .onClick(function(isEnabled){
      return TVRO.setMultiswitchMode({
        enable : isEnabled ? 'Y' : 'N'
      })
    });

    var reload = function() {
      techModeBtn.setOn(TVRO.getTechMode());
      $('.\\#tech-mode', jQ).toggle(TVRO.getTechMode());
      $('.\\#update-url', jQ).val(sessionStorage['kvhupdate']);

      Promise.all(
          TVRO.getAntennaConfig(),
          TVRO.getMultiswitchMode(),
          TVRO.getAntennaVersions()
      ).then(function(xmls) {
        var sleepModeOn = $('sleep', xmls[0]).text() === 'ON';
        var sidelobeModeOn = $('sidelobe', xmls[0]).text() === 'ON';
        var multiswitchModeOn = $('enable', xmls[1]).text() === 'Y';
        var polarization = $('polarization', xmls[2]).text();
        var model = $('model', xmls[2]).text();

        // Only show the multiswitch block when a linear LNB.
        jQ.toggleClass('$not-linear', polarization !== 'linear');
        
        // Only show the sidelobe block when a TV6.
        jQ.toggleClass('$not-tv6', model !== 'TV6');

        sleepModeBtn.setOn(sleepModeOn);
        sidelobeModeBtn.setOn(sidelobeModeOn);
        multiswitchModeBtn.setOn(multiswitchModeOn);
      });
    };

    return self = {
        reload: reload
    };
  };

  TVRO.AdvancedSettingsView = AdvancedSettingsView;

}(window.TVRO);