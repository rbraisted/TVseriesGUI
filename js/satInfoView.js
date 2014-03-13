"use strict";

(function(tvro){

	var satInfoView = function(jQ) {
		var
		satInfoView,
		satEditView,
		favBtn = tvro.toggleBtn($('.\\#fav-btn', jQ))
		.click(function(isFav) {
			tvro.ws.setSatelliteIdentity({
				antSatID: sat.antSatID,
				favorite: (isFav ? 'TRUE' : 'FALSE')
			});
		}),
		sat;

		$('.\\#edit-btn', jQ).click(function() {
			if (satEditView) satEditView.sat(sat);
		});

		return satInfoView = {
			sat: function(arg) {
				if (!arguments.length) {
					return sat;
				} else {
					tvro.data.getSatParams(arg).then(function(s) {
						sat = s;
						console.log(s);
						$('.\\#sat-name', jQ).text(sat.name || 'N/A');
						$('.\\#sat-region', jQ).text(sat.region || 'N/A');
						$('.\\#sat-antSatID', jQ).text(sat.antSatID || 'N/A');
						$('.\\#sat-hemisphere', jQ).text(sat.lon > 0 ? 'East' : 'West');
						$('.\\#sat-suffix', jQ).text(sat.suffix || 'N/A');
						$('.\\#sat-skew', jQ).text(sat.skew || 'N/A');
						$('.\\#sat-lnb', jQ).text('Linear');	//	TODO
						$('.\\#sat-lo1', jQ).text(sat.lo1 || 'N/A');
						$('.\\#sat-lo2', jQ).text(sat.lo2 || 'N/A');
						favBtn.on(sat.favorite);

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
					return satInfoView;
				}
			},
			satEditView: function(arg) {
				if (!arguments.length) {
					return satEditView;
				} else {
					satEditView = arg;
					return satInfoView;
				}
			}
		}
	}

	tvro.satInfoView = satInfoView;

}(window.tvro));
//	??? invalid left hand assign ???
// }(window.tvro || window.tvro = {}));