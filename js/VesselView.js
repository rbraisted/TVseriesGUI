//  requires TableView
!function(TVRO){
  "use strict";

  var VesselView = function(jQ) {
    var self;

    var reload = function() {
      $('.\\#demo-mode-indicator', jQ).toggle(TVRO.getDemoMode());

      Promise.all(
        TVRO.getAntennaVersions(),
        TVRO.getAntennaStatus()
      ).then(function(xmls) {
        var heading = $('antenna brst hdg', xmls[1]).text();
        heading = heading === '' ? '---' : Number(heading).toFixed(1) + '˚';
        $('.\\#vessel-heading', jQ).text(heading);

        //  changes the animation imagery (color of beam)
        //  based on antenna state
        var state = $('antenna state', xmls[1]).text();
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

        //  antenna animation
        //  this is where we handle the actual rotation
        //  TV1 and RV1 always point to 0˚ even if the heading displays otherwise
        var antModel = $('au model', xmls[0]).text();
        var azBow = Math.round(parseFloat($('az_bow', xmls[1]).text(), 10));
        if (antModel === 'TV1' || antModel === 'RV1') azBow = 0;

        if (!isNaN(azBow) && azBow !== 999) {
          animation.css({
            'transform': 'rotate(' + azBow + 'deg)',
            '-moz-transform': 'rotate(' + azBow + 'deg)',
            '-ms-transform': 'rotate(' + azBow + 'deg)',
            '-webkit-transform': 'rotate(' + azBow + 'deg)'
          });
        }

        //  now set the vessel/rv image depending on whether you're a vessel/rv
        jQ.toggleClass('$rv', antModel === 'RV1');
        jQ.toggleClass('$vessel', antModel !== 'RV1');
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