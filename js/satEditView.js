"use strict";

(function(tvro){

	var satEditView = function(jQ) {
		var
		satEditView,
		favBtn = tvro.toggleBtn($('.\\#fav-btn', jQ))
		.click(function(isFav) {
			tvro.ws.setSatelliteIdentity({
				antSatID: sat.antSatID,
				favorite: (isFav ? 'TRUE' : 'FALSE')
			});
		}),
		sat;

		return satEditView = {
			sat: function(arg) {
				if (!arguments.length) {
					return sat;
				} else {
					tvro.data.getSatParams(arg).then(function(s) {
						sat = s;
						console.log(s);
						$('.\\#sat-name', jQ).val(sat.name);
						$('.\\#sat-region', jQ).val(sat.region);
						$('.\\#sat-antSatID', jQ).val(sat.antSatID);
						$('.\\#sat-hemisphere', jQ).val(sat.lon > 0 ? 'East' : 'West');
						$('.\\#sat-suffix', jQ).val(sat.suffix);
						$('.\\#sat-skew', jQ).val(sat.skew);
						$('.\\#sat-lnb', jQ).val('Linear');	//	TODO
						$('.\\#sat-lo1', jQ).val(sat.lo1);
						$('.\\#sat-lo2', jQ).val(sat.lo2);
						favBtn.on(sat.favorite);

						_.forEach(sat.xponders, function(xponder) {
							var xponderJq = $({
								'Vertical High': '.\\#xponder-vh-view',
								'Vertical Low': '.\\#xponder-vl-view',
								'Horizontal High': '.\\#xponder-hl-view',
								'Horizontal Low': '.\\#xponder-hh-view'
							}[xponder.display], jQ);

							$('.\\#xponder-freq', xponderJq).val(xponder.freq);
							$('.\\#xponder-symRate', xponderJq).val(xponder.symRate);
							$('.\\#xponder-fec', xponderJq).val(xponder.fec);
							$('.\\#xponder-netID', xponderJq).val(xponder.netID);
							$('.\\#xponder-modType', xponderJq).val(xponder.modType);
						});
						
						tvro.data.getInstalledSat().then(function(insSat) {
							$(jQ).toggleClass('$ins', sat.antSatID === insSat.antSatID);
						});
					});					
					return satEditView;
				}
			}
		}
	}

	tvro.satEditView = satEditView;

}(window.tvro));
//	??? invalid left hand assign ???
// }(window.tvro || window.tvro = {}));