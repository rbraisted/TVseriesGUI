"use strict";

(function(tvro) {

	var satTable = function(jQ) {
		var
		satTable,
		region,
		sort,//	sort property or function _.sortBy(sats, sort)
		reverse,// ascending or descending sort $asc $dsc
		table = tvro.table(
			$('.\\#sat-table-view', jQ)
			.find('.\\#table-head .\\#sort-btn')
			.click(function() {
				var btn = $(this);
				sort = undefined;
				if (btn.is('.\\#name-btn')) sort = 'name';
				else if (btn.is('.\\#lon-btn')) sort = 'lon';
				else if (btn.is('.\\#region-btn')) sort = 'region';
				else if (btn.is('.\\#fav-btn')) sort = function(sat) { return !sat.favorite; };

				if (sort) {
					if (btn.hasClass('$asc')) reverse = true;
					else reverse = false;

					$('.\\#table-head .\\#sort-btn', jQ).removeClass('$asc $dsc');
					btn.toggleClass('$dsc', reverse).toggleClass('$asc', !reverse);
				} else {
					$('.\\#table-head .\\#sort-btn', jQ).removeClass('$asc $dsc');
				}

				satTable.region(region);
			})
			.end()
		)
		.build(function(row, sat) {
			$('.\\#sat-name', row).text(sat.name || 'N/A');
			$('.\\#sat-region', row).text(sat.region || 'N/A');
			$('.\\#sat-antSatID', row).text(sat.antSatID || 'N/A');
			row.toggleClass('$fav', sat.favorite);
			tvro.data.getInstalledSat().then(function(insSat) {
				row.toggleClass('$ins', insSat.antSatID === sat.antSatID);
			});

			$('.\\#install-btn', row).click(function() {
				if (confirm('Are you sure you want to install '+sat.name+'?')) {
					tvro.data.setInstalledSat(sat).then(function() {
						$('.\\#sat-table-view .\\#table-row', jQ).removeClass('$ins');
						row.addClass('$ins');
					});
				}
			});

			$('.\\#fav-btn', row).click(function() {
				row.toggleClass('$fav');
				tvro.ws.setSatelliteIdentity({
					antSatID:sat.antSatID,
					favorite: row.hasClass('$fav')
				});
			});
		}),

		built = tvro.data.getSats().then(function(sats) {
			table.vals(sats).build();
		});

		return satTable = _.merge(table, {
			sats: table.vals,
			sat: table.val,
			built: function() {
				return built;
			},
			region: function(arg) {
				if (!arguments.length) {
					return region;
				} else {
					region = arg;
					built = tvro.data.getSats().then(function(sats) {
						if (region !== 'All') sats = _.filter(sats, {region:region});
						if (sort) sats = _.sortBy(sats, sort);
						if (sort && reverse) sats.reverse();
						table.vals(sats).build();
					});
					return satTable;
				}
			}
		});
	}

	tvro.satTable = satTable;

}(window.tvro = window.tvro || {}));