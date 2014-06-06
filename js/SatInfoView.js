!function(TVRO){
  "use strict";

  var XponderView = function(jQ) {
    var self;
    var xponder;

    return self = {
      setXponder: function(arg) {
        xponder = arg;
        $('.\\#xponder-display', jQ).text(xponder.display || 'N/A');
        $('.\\#xponder-freq', jQ).text(xponder.freq || 'N/A');
        $('.\\#xponder-symRate', jQ).text(xponder.symRate || 'N/A');
        $('.\\#xponder-fec', jQ).text(xponder.fec || 'N/A');
        $('.\\#xponder-netID', jQ).text(xponder.netID || 'N/A');
        $('.\\#xponder-modType', jQ).text(xponder.modType || 'N/A');
        return self;
      },

      getXponder: function() {
        return xponder;
      }
    };
  };




  var SatInfoView = function(jQ) {
    var self;
    var sat;

    var xponderViews = _.times(4, function (i) {
      return XponderView($('.\\#xponder-' + (i + 1) + '-view', jQ));
    });

    var favBtn = TVRO.ToggleBtn($('.\\#fav-btn', jQ))
      .onClick(function(isFav) {
        TVRO.setSatelliteIdentity({
          listID: sat.listID,
          antSatID: sat.antSatID,
          favorite: isFav ? 'TRUE' : 'FALSE'
        });
      });

    return self = {
      setSat: function(arg) {
        $('.\\#spinner', jQ).show();
        TVRO.getSatParams(arg).then(function(arg) {
          sat = arg;

          favBtn.setOn(sat.favorite);
          $('.\\#sat-name', jQ).text(sat.name || 'N/A');
          $('.\\#sat-region', jQ).text(sat.region || 'N/A');
          $('.\\#sat-longitude', jQ).text(TVRO.formatOrbitalSlot(sat.antSatID) || 'N/A');
          $('.\\#sat-skew', jQ).text(sat.skew || 'N/A');

          for (var i = 0; i < sat.xponders.length; i++) {
            xponderViews[i].setXponder(sat.xponders[i]);
          }

          $('.\\#spinner', jQ).hide();
        });
        
        TVRO.getAntennaVersions().then(function(xml) {
        	var polarization = $('lnb polarization', xml).text() || 'N/A';
        	
        	switch(polarization)
        	{
        	case "circular":
        		polarization = "Circular";
        		break;
        	case "linear":
        		polarization = "Linear";
        		break;
        	}
        		
            $('.\\#sat-lnb').text(polarization);
            $('.\\#sat-lo1').text($('lnb LO1_freq', xml).text() || "N/A");
            $('.\\#sat-lo2').text($('lnb LO2_freq', xml).text() || "N/A");
          });
        
        return self;
      },

      getSat: function() {
        return sat;
      }
    };
  };

  TVRO.SatInfoView = SatInfoView;

}(window.TVRO);