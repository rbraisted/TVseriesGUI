!function(TVRO){
  "use strict";

	var SatEditView = function(jQ) {
		var self;

    var sat;

		var favBtn = TVRO.ToggleBtn($('.\\#fav-btn', jQ))
  		.onClick(function(isFav) {
  			TVRO.setSatelliteIdentity({
  				antSatID: sat.antSatID,
  				favorite: isFav ? 'TRUE' : 'FALSE'
  			});
  		});

    var saveBtn = $('.\\#save-btn', jQ).click(function() {

    });

    var resetBtn = $('.\\#reset-btn', jQ).click(function() {
      var confirmed = confirm('Are you sure you want to reset this satellite\'s details to factory settings?');
      if (confirmed) TVRO.resetSatelliteParams({ antSatID: sat.antSatID }).then(TVRO.reload);
    });


		// dropdown,
		// regions = [
		// 	'Africa',
		// 	'Asia',
		// 	'Australia',
		// 	'Central/South America',
		// 	'Europe',
		// 	'North America'
		// ],
		// hemispheres = [
		// 	'East',
		// 	'west'
		// ],
		// fecs = [
		// 	'1/2',
		// 	'2/3',
		// 	'3/4',
		// 	'3/5',
		// 	'4/5',
		// 	'5/6',
		// 	'5/11',
		// 	'6/7',
		// 	'7/8',
		// 	'8/9',
		// 	'9/9',
		// 	'9/10'
		// ],
		// modTypes = [
		// 	{'QDSS': 'DSS DTV'},
		// 	{'QDC2': 'DCII QPSK DigiCipher 2'},
		// 	{'QDVB': 'DVB QPSK'},
		// 	{'LQPSK': 'LDPC QPSK STD DVB-S2'},
		// 	{'L8PSK': 'LDPC 8PSK STD DVB-S2'},
		// 	{'TQPSK': 'Turbo QPSK Dish'},
		// 	{'T8PSK': 'Turbo 8PSK Dish'}
		// ];

		//	hook up the xponder dropdown btns
		// _.forEach($('.\\#xponder-view', jQ), function(xponderJq) {
		// 	$('.\\#fec-btn', xponderJq).click(function() {
		// 		if (dropdown) {
		// 			dropdown
		// 			.title('FEC Code')
		// 			.build(function(row, data) {
		// 				$('.\\#dropdown-val', row).text(data);
		// 			})
		// 			.click(function(row, data) {
		// 				$('.\\#xponder-fec', xponderJq).text(data);
		// 			})
		// 			.vals(fecs)
		// 			.build()
		// 			.val($('.\\#xponder-fec', xponderJq).text())
		// 			.show()
		// 			.offset($(this).offset());
		// 		}
		// 	})

		// 	$('.\\#modType-btn', xponderJq).click(function() {
		// 		if (dropdown) {
		// 			dropdown
		// 			.title('Decoder Type')
		// 			.build(function(row, data) {
		// 				$('.\\#dropdown-val', row).text(data[$('.\\#xponder-modType', xponderJq).text()]);
		// 			})
		// 			.click(function(row, data) {
		// 				for (prop in data) break;
		// 				$('.\\#xponder-modType', xponderJq).text(prop);
		// 			})
		// 			.vals(modTypes)
		// 			.build()
		// 			.val($('.\\#xponder-modType', xponderJq).text())
		// 			.show()
		// 			.offset($(this).offset())
		// 		}
		// 	});
		// });
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

          jQ.toggleClass('$pre', sat.predefined);

          //  inputs
          $('.\\#sat-name', jQ).val(sat.name);
          $('.\\#sat-region', jQ).val(sat.region);
          $('.\\#sat-antSatID', jQ).val(sat.antSatID);
          $('.\\#sat-hemisphere', jQ).val(sat.lon > 0 ? 'East' : 'West');
          $('.\\#sat-suffix', jQ).val(sat.suffix);
          $('.\\#sat-skew', jQ).val(sat.skew);
          $('.\\#sat-lnb', jQ).val('Linear'); //  TODO
          $('.\\#sat-lo1', jQ).val(sat.lo1);
          $('.\\#sat-lo2', jQ).val(sat.lo2);

          //  plain ol text, dropdown btns
          $('.\\#sat-name', jQ).text(sat.name);
          $('.\\#sat-region', jQ).text(sat.region);
          $('.\\#sat-antSatID', jQ).text(sat.antSatID);
          $('.\\#sat-hemisphere', jQ).text(sat.lon > 0 ? 'East' : 'West');
          $('.\\#sat-suffix', jQ).text(sat.suffix);
          $('.\\#sat-skew', jQ).text(sat.skew);
          $('.\\#sat-lnb', jQ).text('Linear');  //  TODO
          $('.\\#sat-lo1', jQ).text(sat.lo1);
          $('.\\#sat-lo2', jQ).text(sat.lo2);

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
/*
		return self = {
			sat: function(arg) {
				if (!arguments.length) {
					return sat;
				} else {
					sat = arg;
					TVRO.data.getSatParams(arg).then(function(s) {
						sat = s;

						$(jQ).toggleClass('$pre', sat.predefined);

						//	inputs
						$('.\\#sat-name', jQ).val(sat.name);
						$('.\\#sat-region', jQ).val(sat.region);
						$('.\\#sat-antSatID', jQ).val(sat.antSatID);
						$('.\\#sat-hemisphere', jQ).val(sat.lon > 0 ? 'East' : 'West');
						$('.\\#sat-suffix', jQ).val(sat.suffix);
						$('.\\#sat-skew', jQ).val(sat.skew);
						$('.\\#sat-lnb', jQ).val('Linear');	//	TODO
						$('.\\#sat-lo1', jQ).val(sat.lo1);
						$('.\\#sat-lo2', jQ).val(sat.lo2);

						//	plain ol text, dropdown btns
						$('.\\#sat-name', jQ).text(sat.name);
						$('.\\#sat-region', jQ).text(sat.region);
						$('.\\#sat-antSatID', jQ).text(sat.antSatID);
						$('.\\#sat-hemisphere', jQ).text(sat.lon > 0 ? 'East' : 'West');
						$('.\\#sat-suffix', jQ).text(sat.suffix);
						$('.\\#sat-skew', jQ).text(sat.skew);
						$('.\\#sat-lnb', jQ).text('Linear');	//	TODO
						$('.\\#sat-lo1', jQ).text(sat.lo1);
						$('.\\#sat-lo2', jQ).text(sat.lo2);

						favBtn.val(sat.favorite);

						_.forEach(sat.xponders, function(xponder) {
							var xponderJq = $({
								'Vertical High': '.\\#xponder-vh-view',
								'Vertical Low': '.\\#xponder-vl-view',
								'Horizontal High': '.\\#xponder-hl-view',
								'Horizontal Low': '.\\#xponder-hh-view'
							}[xponder.display], jQ);

							$('.\\#xponder-freq', xponderJq).val(xponder.freq);
							$('.\\#xponder-symRate', xponderJq).val(xponder.symRate);
							$('.\\#xponder-fec', xponderJq).text(xponder.fec);
							$('.\\#xponder-netID', xponderJq).val(xponder.netID);
							$('.\\#xponder-modType', xponderJq).text(xponder.modType);
						});
						
						TVRO.data.getInstalledSat().then(function(insSat) {
							$(jQ).toggleClass('$ins', sat.antSatID === insSat.antSatID);
						});
					});					
					return satEditView;
				}
			},
			dropdown: function(arg) {
				if (!arguments.length) {
					return dropdown;
				} else {
					dropdown = arg;
					return satEditView;
				}
			}
		}
	}
*/
	TVRO.SatEditView = SatEditView;

}(window.TVRO);