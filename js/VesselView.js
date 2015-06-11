//  requires TableView
!function(TVRO){
  "use strict";

  var VesselView = function(jQ) {
    var self;

    var reload = function() {
      $('.\\#demo-mode-indicator', jQ).toggle(TVRO.getDemoMode());

      TVRO.getAntModel().then(function(model) {
        //  set the vessel/rv image depending on whether you're a vessel/rv
        jQ.toggleClass('$rv', model === 'RV1' || model === 'A9');
        jQ.toggleClass('$vessel', model !== 'RV1' && model !== 'A9');
      });

      TVRO.getVesselInfo().then(function(vesselInfo) {
        $('.\\#vessel-name', jQ).text(vesselInfo.name);
      });

      TVRO.getHeading().then(function(heading) {
        $('.\\#vessel-heading', jQ).text(heading);
      });

      //  changes the animation imagery (color of beam)
      //  based on antenna state
      TVRO.getAntState().then(function(state) {
        $('.\\#vessel-animation', jQ)
          .removeClass('$warning $error')
          .addClass({
            'TRACKING': '',
            'INITIALIZING': '$warning',
            'SEARCHING': '$warning',
            'IDLE': '$warning',
            'CABLE UNWRAP': '$warning',
            'DISCONNECTED': '$error',
            'ERROR': '$error'
          }[state]);
      });

      TVRO.getAzBow().then(function(azBow) {
        //  antenna animation
        //  this is where we handle the actual rotation
        if (!isNaN(azBow) && azBow !== 999)
          $('.\\#vessel-animation', jQ).css({
            'transform': 'rotate(' + azBow + 'deg)',
            '-moz-transform': 'rotate(' + azBow + 'deg)',
            '-ms-transform': 'rotate(' + azBow + 'deg)',
            '-webkit-transform': 'rotate(' + azBow + 'deg)'
          });
      });
    };

    return self = {
      reload: reload
    };
  };

  TVRO.VesselView = VesselView;

}(window.TVRO);