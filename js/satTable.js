"use strict";

(function(tvro) {

	var satTable = function(jQ) {
		var
		satTable,
		satInfoView,
		region,
		table = tvro.table($('.\\#sat-table-view', jQ))
		.build(function(row, sat) {
			$('.\\#sat-name', row).text(sat.name || 'N/A');
			$('.\\#sat-region', row).text(sat.region || 'N/A');
			$('.\\#sat-antSatID', row).text(sat.antSatID || 'N/A');
			row.toggleClass('$fav', sat.favorite);
			tvro.data.getInstalledSat().then(function(insSat) {
				row.toggleClass('$ins', insSat.antSatID === sat.antSatID);
			});

			$('.\\#install-btn', row).click(function() {
				tvro.data.setInstalledSat({antSatID:sat.antSatID});
				$('.\\#sat-table-view', jQ).removeClass('$ins');
				row.addClass('$ins');
			});

			$('.\\#fav-btn', row).click(function() {
				row.toggleClass('$fav');
				tvro.ws.setSatelliteIdentity({
					antSatID:sat.antSatID,
					favorite: row.hasClass('$fav')
				});
			});

			$('.\\#info-btn', row).click(function() {
				if (satInfoView) satInfoView.sat(sat);
			});			
		});

		return satTable = _.merge(table, {
			sats: table.vals,
			sat: table.val,
			region: function(arg) {
				if (!arguments.length) {
					return region;
				} else {
					region = arg;
					tvro.data.getSats().then(function(sats) {
						if (region !== 'All') sats = _.filter(sats, {region:region});
						table.vals(sats).build();
					});
					return satTable;
				}
			},
			satInfoView: function(arg) {
				if (!arguments.length) {
					return satInfoView;
				} else {
					satInfoView = arg;
					return satTable;
				}
			}
		});
	}

	tvro.satTable = satTable;

}(window.tvro = window.tvro || {}));