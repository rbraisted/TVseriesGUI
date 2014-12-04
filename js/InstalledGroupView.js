//  requires TableView
!function(TVRO){
  "use strict";

  var InstalledGroupView = function(jQ) {
    var self;

    var tableView = TVRO.TableView($('.\\#sat-table-view', jQ))
      .onBuild(function(row, sat) {
        $('.\\#sat-name', row).text(sat.name + ' - ' + TVRO.formatOrbitalSlot(sat.antSatID, sat.lon));

        $('.\\#install-btn', row).click(function() {
          var installed = row.hasClass('$installed');
          var confirmed = installed ? false : confirm('Are you sure you want to select ' + sat.name + ' - ' + TVRO.formatOrbitalSlot(sat.antSatID, sat.lon) + '?');
          if (confirmed) 
            TVRO.setInstalledSat(sat, false);
        });

        TVRO.getSelectedSat().then(function(selectedSat) {
          row.toggleClass('$installed', sat.antSatID === selectedSat);
        });
      });

    var reload = function() {
      return TVRO.getInstalledGroup().then(function(installedGroup) {
        var sats = installedGroup.getSats();
        tableView
          .setValues(sats)
          .build();
      });
    }

    return self = {
      reload: reload
    };
  }

  TVRO.InstalledGroupView = InstalledGroupView;

}(window.TVRO);