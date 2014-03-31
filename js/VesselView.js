//  requires TableView
!function(TVRO){
  "use strict";

  var VesselView = function(jQ) {
    var self;

    var reload = function() {
      $('.\\#demo-mode-indicator', jQ).toggle(TVRO.getDemoMode());

      TVRO.getAntennaStatus().then(function(xml) {
        var heading = Number($('antenna brst hdg', xml).text()).toFixed(1);
        var state = $('antenna state', xml).text();
        var azBow = Math.round(parseFloat($('az_bow', xml).text(), 10));

        $('.\\#vessel-heading', jQ).text(heading+'˚');

        //  changes the animation imagery
        //  based on antenna state
        var animation = $('.\\#vessel-animation', jQ)
          .removeClass('$warning $error')
          .addClass({
            'TRACKING': '',
            'INITIALIZING': '$warning',
            'SEARCHING': '$warning',
            'IDLE': '$warning',
            'CABLE UNWRAP': '$warning',
            'ERROR': '$error'
          }[state]);

        if (!isNaN(azBow) && azBow !== 999) {
          animation.css({
            'transform': 'rotate(' + azBow + 'deg)',
            '-moz-transform': 'rotate(' + azBow + 'deg)',
            '-ms-transform': 'rotate(' + azBow + 'deg)',
            '-webkit-transform': 'rotate(' + azBow + 'deg)'
          });
        }
      });

      TVRO.getProductRegistration().then(function(xml) {
        var vesselName = $('vessel_name', xml).text();
        $('.\\#vessel-name', jQ).text(vesselName);
      });
    };

    return self = {
      reload: reload
    };
  };

  TVRO.VesselView = VesselView;

}(window.TVRO);