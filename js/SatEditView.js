!function(TVRO){
  "use strict";

  var fecDropdownView;
  var modTypeDropdownView;

  var XponderView = function(jQ) {
    var self;
    var xponder;

    if (!fecDropdownView)
      fecDropdownView = TVRO.DropdownView($('.\\#sat-edit-fec-dropdown-view'))
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
        ])
        .build();

    if (!modTypeDropdownView)
      modTypeDropdownView = TVRO.DropdownView($('.\\#sat-edit-modType-dropdown-view'))
        .setValues([
          'QDSS',
          'QDC2',
          'QDVB',
          'LQPSK',
          'L8PSK',
          'TQPSK',
          'T8PSK'
        ])
        .build();

    $('.\\#fec-btn', jQ).click(function() {
      var fec = $('.\\#xponder-fec', jQ).text();
      var offset = $(this).offset();

      fecDropdownView
        .onClick(function(fec) {
          $('.\\#xponder-fec', jQ).text(fec);
        })
        .setValue(fec)
        .show(offset);
    });

    $('.\\#modType-btn', jQ).click(function() {
      var modType = $('.\\#xponder-modType', jQ).text();
      var offset = $(this).offset();

      modTypeDropdownView
        .onClick(function(modType) {
          $('.\\#xponder-modType', jQ).text(modType);
        })
        .setValue(modType)
        .show(offset);
    });

    return self = {
      setXponder: function(arg) {
        xponder = arg;
        $('.\\#xponder-display', jQ).text(xponder.display);
        $('.\\#xponder-freq', jQ).val(xponder.freq);
        $('.\\#xponder-symRate', jQ).val(xponder.symRate);
        $('.\\#xponder-fec', jQ).text(xponder.fec || 'N/A');
        $('.\\#xponder-netID', jQ).val(xponder.netID);
        $('.\\#xponder-modType', jQ).text(xponder.modType || 'N/A');
        return self;
      },

      getXponder: function() {
        var fec = $('.\\#xponder-fec', jQ).text();
        if (fec === 'N/A') fec = '';

        var modType = $('.\\#xponder-modType', jQ).text();
        if (modType === 'N/A') modType = '';

        xponder.freq = $('.\\#xponder-freq', jQ).val();
        xponder.symRate = $('.\\#xponder-symRate', jQ).val();
        xponder.fec = fec;
        xponder.netID = $('.\\#xponder-netID', jQ).val();
        xponder.modType = modType;

        return xponder;
      }
    };
  };




  var SatEditView = function(jQ) {
    var self;
    var sat;

    var favBtn = TVRO.ToggleBtn($('.\\#fav-btn', jQ))
      .onClick(function(isFav) {
        TVRO.setSatelliteIdentity({
          listID: sat.listID,
          antSatID: sat.antSatID,
          favorite: isFav ? 'TRUE' : 'FALSE'
        });
      });

    var saveBtn = $('.\\#save-btn', jQ).click(function() {
      TVRO.setSatParams({
        listID: sat.listID,
        name: $('.\\#sat-name', jQ).val(),
        region: $('.\\#sat-region', jQ).val(),
        antSatID: $('.\\#sat-antSatID', jQ).val(),
        lon: $('.\\#sat-hemisphere', jQ).val(),
        suffix: $('.\\#sat-suffix', jQ).val(),
        skew: $('.\\#sat-skew', jQ).val(),
        xponders: _.invoke(xponderViews, 'getXponder')
      }).then(TVRO.reload);
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

    var xponderViews = _.times(4, function (i) {
      return XponderView($('.\\#xponder-' + (i + 1) + '-view', jQ));
    });

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

          //  plain ol text, dropdown btns
          $('.\\#sat-name', jQ).text(sat.name || 'N/A');
          $('.\\#sat-region', jQ).text(sat.region || 'N/A');
          $('.\\#sat-longitude', jQ).text(TVRO.formatLongitude(sat.lon, 0) || 'N/A');
          $('.\\#sat-hemisphere', jQ).text(sat.lon > 0 ? 'East' : 'West');
          $('.\\#sat-suffix', jQ).text(sat.suffix || 'N/A');
          $('.\\#sat-skew', jQ).text(sat.skew || 'N/A');

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

  TVRO.SatEditView = SatEditView;

}(window.TVRO);