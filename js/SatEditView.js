!function(TVRO){
  "use strict";

  var XponderView = function(jQ) {
    var self;
    var xponder;
    var fecDropdownView;
    var modTypeDropdownView;

    $('.\\#fec-btn', jQ).click(function() {
      var fec = $('.\\#xponder-fec', jQ).text();
      if (fecDropdownView) {
        fecDropdownView.onClick(function(fec) {
          $('.\\#xponder-fec', jQ).text(fec);
        }).setValue(fec)
          .show($(this).offset());
      }
    });

    $('.\\#modType-btn', jQ).click(function() {
      var modType = $('.\\#xponder-modType', jQ).text();
      if (modTypeDropdownView) {
        modTypeDropdownView.setValue(modType).show($(this).offset());
        modTypeDropdownView.onClick(function(fec) {
          $('.\\#xponder-fec', jQ).text(fec);
        }).setValue(fec)
          .show($(this).offset());
      }
    });

    return self = {
      setXponder: function(arg) {
        xponder = arg;
        $('.\\#xponder-freq', jQ).val(xponder.freq);
        $('.\\#xponder-symRate', jQ).val(xponder.symRate);
        $('.\\#xponder-fec', jQ).text(xponder.fec || 'N/A');
        $('.\\#xponder-netID', jQ).val(xponder.netID);
        $('.\\#xponder-modType', jQ).text(xponder.modType || 'N/A');
        return self;
      },

      getXponder: function() {
        xponder.freq = $('.\\#xponder-freq', jQ).val();
        xponder.symRate = $('.\\#xponder-symRate', jQ).val();
        xponder.fec = $('.\\#xponder-fec', jQ).text();
        xponder.netID = $('.\\#xponder-netID', jQ).val();
        xponder.modType = $('.\\#xponder-modType', jQ).text();
        return xponder;
      },

      setFecDropdownView: function(arg) {
        fecDropdownView = arg;
        return self;
      },

      setModTypeDropdownView: function(arg) {
        modTypeDropdownView = arg;
        return self;
      }
    };
  };

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

    var regionDropdownView = TVRO.DropdownView($('.\\#sat-edit-region-dropdown-view'))
      .setValues([
        'Africa',
        'Asia',
        'Australia',
        'Central/South America',
        'Europe',
        'North America'
      ]).build();

    var hemisphereDropdownView = TVRO.DropdownView($('.\\#sat-edit-hemisphere-dropdown-view'))
      .setValues([
        'East',
        'West'
      ]).build();

    var fecDropdownView = TVRO.DropdownView($('.\\#sat-edit-fec-dropdown-view'))
      .setValues([
  			'1/2',
  			'2/3',
  			'3/4',
  			'3/5',
  			'4/5',
  			'5/6',
  			'5/11',
  			'6/7',
  			'7/8',
  			'8/9',
  			'9/9',
  			'9/10'
  		]).build();

    var modTypeDropdownView = TVRO.DropdownView($('.\\#sat-edit-modType-dropdown-view'))
      .setValues([
        'QDSS',
        'QDC2',
        'QDVB',
        'LQPSK',
        'L8PSK',
        'TQPSK',
        'T8PSK'
  		]).build();

    var xponderVHView = XponderView($('.\\#xponder-vh-view', jQ))
      .setFecDropdownView(fecDropdownView)
      .setModTypeDropdownView(modTypeDropdownView);

    var xponderVLView = XponderView($('.\\#xponder-vl-view', jQ))
      .setFecDropdownView(fecDropdownView)
      .setModTypeDropdownView(modTypeDropdownView);

    var xponderHHView = XponderView($('.\\#xponder-hh-view', jQ))
      .setFecDropdownView(fecDropdownView)
      .setModTypeDropdownView(modTypeDropdownView);

    var xponderHLView = XponderView($('.\\#xponder-hl-view', jQ))
      .setFecDropdownView(fecDropdownView)
      .setModTypeDropdownView(modTypeDropdownView);      

    return self = {
      setSat: function(arg) {
        TVRO.getSatParams(arg).then(function(arg) {
          sat = arg;
          favBtn.setOn(sat.favorite);
          jQ.toggleClass('$predefined', sat.predefined);

          //  inputs
          $('.\\#sat-name', jQ).val(sat.name);
          $('.\\#sat-region', jQ).val(sat.region);
          $('.\\#sat-longitude', jQ).val(TVRO.formatLongitude(sat.lon, 0));
          $('.\\#sat-hemisphere', jQ).val(sat.lon > 0 ? 'East' : 'West');
          $('.\\#sat-suffix', jQ).val(sat.suffix);
          $('.\\#sat-skew', jQ).val(sat.skew);
          $('.\\#sat-lnb', jQ).val(sat.lnbType);
          $('.\\#sat-lo1', jQ).val(sat.lo1);
          $('.\\#sat-lo2', jQ).val(sat.lo2);

          //  plain ol text, dropdown btns
          $('.\\#sat-name', jQ).text(sat.name || 'N/A');
          $('.\\#sat-region', jQ).text(sat.region || 'N/A');
          $('.\\#sat-longitude', jQ).text(TVRO.formatLongitude(sat.lon, 0) || 'N/A');
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