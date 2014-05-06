!function(TVRO) {
  "use strict";

	var InstalledSatView = function(jQ) {
		var self;

    var reload = function() {
      TVRO.getAntennaStatus().then(function(xml) {
        var acuState = $('acu state:first', xml).text();
        var antState = acuState === 'OK' ? $('antenna state', xml).text() : acuState;
        var antBars = '$' + $('antenna bars', xml).text();

        $('.\\#ant-state', jQ).text(antState);

        $('.\\#ant-bars', jQ)
          .removeClass('$0 $1 $2 $3 $4 $5')
          .addClass(antBars);

      }).then(TVRO.getInstalledSat).then(function(installedSat) {
        $('.\\#sat-name', jQ).text(installedSat.name);
        $('.\\#sat-region', jQ).text(installedSat.region);
        $('.\\#sat-longitude', jQ).text(TVRO.formatLongitude(installedSat.lon,0));
      });

      return self;
    };

		return self = {
      reload: reload
		}
	}

	TVRO.InstalledSatView = InstalledSatView;

}(window.TVRO);