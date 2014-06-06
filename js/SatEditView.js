!function(TVRO){
  "use strict";

  var closePopup = function() {
    var hash = window.location.hash.substr(0, window.location.hash.lastIndexOf('/'));
    hash = hash.substr(0, hash.lastIndexOf('/'));
    window.location.hash = hash;
  };

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

          if (xponder) {
            xponder.freq = $('.\\#xponder-freq', jQ).val();
            xponder.symRate = $('.\\#xponder-symRate', jQ).val();
            xponder.fec = fec;
            xponder.netID = $('.\\#xponder-netID', jQ).val();
            xponder.modType = modType;
          }

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
      var params = {
          listID: sat.listID,
          antSatID: sat.antSatID,
          name: $('.\\#sat-name', jQ).val(),
          region: regionDropdownView.getValue(),
          skew: $('.\\#sat-skew', jQ).val(),
          xponder: _.invoke(xponderViews, 'getXponder')
      };

      var i, prefix, id;
      // range checking on transponder parameters
      for (i = 0; i < 4; i++) {
    	  if ( ((parseInt(params.xponder[i].freq) != 0) && 
                 ((parseInt(params.xponder[i].freq) < 10700) || (parseInt(params.xponder[i].freq) > 12750) ) ) ||
               (params.xponder[i].freq.length != 5))
    		  return alert('Only values of 00000 or 10700-12750 are valid for Frequency');

    	  if ( ((parseInt(params.xponder[i].symRate) < 1000) || (parseInt(params.xponder[i].symRate) > 45000)) ||
    		   (params.xponder[i].symRate.length != 5))
    		  return alert('Only values of 01000-45000 are valid for Symbol Rate');

    	  prefix = params.xponder[i].netID.substring(0,2);
    	  id = parseInt(params.xponder[i].netID.substring(2), 16);
    	  if ((prefix !== '0X') || (id < 0) || (id > 65535) || (params.xponder[i].netID.length != 6) )
    		  return alert('Only values of 0X0000-0XFFFF are valid for Satellite ID');
      }
      
      if (!sat.predefined) {

        var longitude = $('.\\#sat-longitude', jQ).val();
        // Assuming a xxx.xxxN entry
        // Extract the hemisphere
        var lonHemisphere = _.find(longitude,function(num){return (num==="E") || (num==='W');})

        // If lonHemisphere is undefined user did not enter E or W
        if(lonHemisphere){
          //Extract the number
          var lon = Number(longitude.substring(0,(longitude.indexOf(lonHemisphere))));
          // Negate for South latitude or West longitude
          if (lonHemisphere === 'W'){
            lon = -lon;
          }
        }else{
          var lon = longitude;
        }
        params.lon = lon;
      }

      $('.\\#spinner', jQ).show();
      TVRO.setSatParams(params).then(closePopup);
    });

    var resetBtn = $('.\\#reset-btn', jQ).click(function() {
      var confirmed = confirm('Are you sure you want to reset this satellite\'s details to factory settings?');
      if (confirmed) {
        $('.\\#spinner', jQ).show();
        TVRO.resetSatelliteParams({ antSatID: sat.antSatID }).then(closePopup);
      }
    });

    var regionDropdownView = TVRO.DropdownView($('.\\#sat-edit-region-dropdown-view'))
    .setValues([
                'Africa',
                'Asia',
                'Australia',
                'Central/South America',
                'Europe',
                'North America'
                ])
                .onClick(function(region) {
                  $('.\\#sat-region', jQ).text(region);
                })
                .build();

    var regionBtn = $('.\\#region-btn', jQ).click(function() {
      regionDropdownView.show($(this).offset());
    });

    var xponderViews = _.times(4, function (i) {
      return XponderView($('.\\#xponder-' + (i + 1) + '-view', jQ));
    });

    return self = {
        setSat: function(arg) {
          $('.\\#spinner', jQ).show();
          TVRO.getSatParams(arg).then(function(arg) {
            sat = arg;
            favBtn.setOn(sat.favorite);
            jQ.toggleClass('$predefined', sat.predefined);

            //  inputs
            $('.\\#sat-name', jQ).val(sat.name);
            $('.\\#sat-region', jQ).val(sat.region);
            $('.\\#sat-longitude', jQ).val(TVRO.formatLongitude(sat.lon, 0));
            $('.\\#sat-skew', jQ).val(sat.skew);

            //  plain ol text, dropdown btns
            $('.\\#sat-name', jQ).text(sat.name || 'N/A');
            $('.\\#sat-region', jQ).text(sat.region || 'N/A');
            regionDropdownView.setValue(sat.region || null);
            $('.\\#sat-longitude', jQ).text(TVRO.formatLongitude(sat.lon, 0) || 'N/A');
            $('.\\#sat-skew', jQ).text(sat.skew || 'N/A');

            for (var i = 0; i < sat.xponders.length; i++) {
              xponderViews[i].setXponder(sat.xponders[i]);
            }

            $('.\\#spinner', jQ).hide();
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