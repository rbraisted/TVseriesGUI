!function(TVRO){
  "use strict";

	var SatInfoView = function(jQ) {
		var self;

		var sat;

    var favBtn = TVRO.ToggleBtn($('.\\#fav-btn', jQ))
      .onClick(function(isFav) {
        TVRO.setSatelliteIdentity({
          antSatID: sat.antSatID,
          favorite: isFav ? 'TRUE' : 'FALSE'
        });
      });

		return self = {
      setSat: function(arg) {
        TVRO.getSatParams(arg).then(function(arg) {
          sat = arg;

          $('.\\#sat-name', jQ).text(sat.name || 'N/A');
          $('.\\#sat-region', jQ).text(sat.region || 'N/A');
          $('.\\#sat-antSatID', jQ).text(sat.antSatID || 'N/A');
          $('.\\#sat-hemisphere', jQ).text(sat.lon > 0 ? 'East' : 'West');
          $('.\\#sat-suffix', jQ).text(sat.suffix || 'N/A');
          $('.\\#sat-skew', jQ).text(sat.skew || 'N/A');
          $('.\\#sat-lnb', jQ).text('Linear');  //  TODO: get lnb and display once on this page
          $('.\\#sat-lo1', jQ).text(sat.lo1 || 'N/A');
          $('.\\#sat-lo2', jQ).text(sat.lo2 || 'N/A');

          favBtn.val(sat.favorite);

          _.forEach(sat.xponders, function(xponder) {
            var xponderJq = $({
              'Vertical High': '.\\#xponder-vh-view',
              'Vertical Low': '.\\#xponder-vl-view',
              'Horizontal High': '.\\#xponder-hl-view',
              'Horizontal Low': '.\\#xponder-hh-view'
            }[xponder.display], jQ);

            $('.\\#xponder-freq', xponderJq).text(xponder.freq || 'N/A');
            $('.\\#xponder-symRate', xponderJq).text(xponder.symRate || 'N/A');
            $('.\\#xponder-fec', xponderJq).text(xponder.fec || 'N/A');
            $('.\\#xponder-netID', xponderJq).text(xponder.netID || 'N/A');
            $('.\\#xponder-modType', xponderJq).text(xponder.modType || 'N/A');
          });
          
          tvro.data.getInstalledSat().then(function(insSat) {
            $(jQ).toggleClass('$ins', sat.antSatID === insSat.antSatID);
          });
        });
      },

      getSat: function() {
        return sat;
      }
		};
	};

	TVRO.SatInfoView = SatInfoView;

}(window.TVRO);