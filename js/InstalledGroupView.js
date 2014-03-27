//  requires TableView
!function(TVRO){
  "use strict";

  var InstalledGroupView = function(jQ) {
    var self;

    var tableView = TVRO.TableView($('.\\#sat-table-view', jQ))
      .onBuild(function(row, sat) {
        $('.\\#sat-name', row).text(sat.name);

        $('.\\#install-btn', row).click(function() {
          if (!row.is('$installed')) {
            TVRO.setInstalledSat(sat)
              .then(TVRO.reload);
          }
        });

        TVRO.getInstalledSat().then(function(installedSat) {
          row.toggleClass('$installed', sat.antSatID === installedSat.antSatID);
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