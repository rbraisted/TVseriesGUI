//  requires TableView
!function(TVRO){
  "use strict";

  /* Home Page graphics change - Start - UHD7 - STWA-301 */
  var antModel = '';
  var satlitename = '';
  TVRO.getAntModel().then(function(model) {
    antModel = model;
  });
  TVRO.getInstalledSat().then(function(installedSat) {
    satlitename = TVRO.formatOrbitalSlot(installedSat.antSatID, installedSat.lon);
  });
  /* Home Page graphics change - Start - UHD7 - STWA-301 */
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
      /* Home Page graphics change - Start - UHD7 - STWA-301 */
      if(antModel == 'UHD7' && satlitename == '101WT')
      {
        TVRO.getAntState().then(function(state) {
          $('.\\#vessel-animation', jQ)
            .removeClass('$warning $error')
            .addClass({
              'TRACKING': '$trackuhd7101WT',
              'INITIALIZING': '$warninguhd7101WT',
              'SEARCHING': '$warninguhd7101WT',
              'IDLE': '$warninguhd7101WT',
              'CABLE UNWRAP': '$warninguhd7101WT',
              'DISCONNECTED': '$erroruhd7101WT',
              'ERROR': '$erroruhd7101WT'
            }[state]);
        });
      } else {
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
        $( "body" ).find( ".vessel-animation" ).removeClass( "uhd7101WT" );
      });
      }
      /* Home Page graphics change - End - UHD7 - STWA-301 */

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