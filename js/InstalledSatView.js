!function(TVRO) {
  "use strict";

	var InstalledSatView = function(jQ) {
		var self;

    var reload = function() {
      TVRO.getAntennaStatus().then(function(xml) {
        var acuState = $('acu state:first', xml).text();
        var antState = acuState === 'OK' ? $('antenna state', xml).text() : acuState;
        var antBars = '$' + $('antenna bars', xml).text();
        /*Changes - Start - UHD7 - STWA-313*/
        var satselected = $('satellite selected', xml).text();
        $('.\\#sat-longitude', jQ).text(satselected);
        /*Changes - Start - UHD7 - STWA-313*/
        
        $('.\\#ant-state', jQ).text(antState);

        $('.\\#ant-bars', jQ)
          .removeClass('$0 $1 $2 $3 $4 $5')
          .addClass(antBars);

      }).then(TVRO.getInstalledSat).then(function(installedSat) {
        $('.\\#sat-name', jQ).text(installedSat.name);
        $('.\\#sat-region', jQ).text(installedSat.region);
        
      });

      return self;
    };

		return self = {
      reload: reload
		}
	}

	TVRO.InstalledSatView = InstalledSatView;

}(window.TVRO);