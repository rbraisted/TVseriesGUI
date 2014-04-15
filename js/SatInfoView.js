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
        TVRO.getSatParams(arg).then(function(arg) {
          sat = arg;

          favBtn.setOn(sat.favorite);
          $('.\\#sat-name', jQ).text(sat.name || 'N/A');
          $('.\\#sat-region', jQ).text(sat.region || 'N/A');
          $('.\\#sat-longitude', jQ).text(TVRO.formatLongitude(sat.lon, 0) || 'N/A');
          $('.\\#sat-hemisphere', jQ).text(sat.lon > 0 ? 'East' : 'West');
          $('.\\#sat-suffix', jQ).text(sat.suffix || 'N/A');
          $('.\\#sat-skew', jQ).text(sat.skew || 'N/A');
          $('.\\#sat-lnb', jQ).text(sat.lnbType || 'N/A');
          $('.\\#sat-lo1', jQ).text(sat.lo1 || 'N/A');
          $('.\\#sat-lo2', jQ).text(sat.lo2 || 'N/A');

          for (var i = 0; i < sat.xponders.length; i++) {
            xponderViews[i].setXponder(sat.xponders[i]);
          }
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