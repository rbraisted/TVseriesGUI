!function(TVRO){
  "use strict";

  var XponderView = function(jQ) {
    var self;
    var xponder;

    return self = {
      setXponder: function(arg) {
        xponder = arg;
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

    var xponderVHView = XponderView($('.\\#xponder-vh-view', jQ));
    var xponderVLView = XponderView($('.\\#xponder-vl-view', jQ));
    var xponderHHView = XponderView($('.\\#xponder-hh-view', jQ));
    var xponderHLView = XponderView($('.\\#xponder-hl-view', jQ));

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
          $('.\\#sat-antSatID', jQ).text(sat.antSatID || 'N/A');
          $('.\\#sat-hemisphere', jQ).text(sat.lon > 0 ? 'East' : 'West');
          $('.\\#sat-suffix', jQ).text(sat.suffix || 'N/A');
          $('.\\#sat-skew', jQ).text(sat.skew || 'N/A');
          $('.\\#sat-lnb', jQ).text(sat.lnbType || 'N/A');
          $('.\\#sat-lo1', jQ).text(sat.lo1 || 'N/A');
          $('.\\#sat-lo2', jQ).text(sat.lo2 || 'N/A');

          xponderVHView.setXponder(sat.xponderVH);
          xponderVLView.setXponder(sat.xponderVL);
          xponderHHView.setXponder(sat.xponderHH);
          xponderHLView.setXponder(sat.xponderHL);
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