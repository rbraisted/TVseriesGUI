!function(TVRO) {
  "use strict";

  var SatTableView = function(jQ) {
    var self;

    var region;
    var sortFilter;
    var sortReverse;

    //  all these sort btns are in the #table-view #table-head
    //  so set them up before you set up the #table-view because you'll
    //  TVRO.TableView will remove #table-head from the DOM on creation

    var sortBtns = $('.\\#sort-btn', jQ)
      .click(function() {
        var sortBtn = $(this);
        sortFilter = undefined;

        if (sortBtn.is('.\\#name-btn')) sortFilter = 'name';
        else if (sortBtn.is('.\\#lon-btn')) sortFilter = 'lon';
        else if (sortBtn.is('.\\#region-btn')) sortFilter = 'region';
        else if (sortBtn.is('.\\#fav-btn')) sortFilter = function(sat) { return !sat.favorite; };

        if (sortFilter) {
          sortReverse = sortBtn.hasClass('$asc');
          sortBtns.removeClass('$asc $dsc');
          sortBtn.toggleClass('$dsc', sortReverse).toggleClass('$asc', !sortReverse);
        } else {
          sortBtns.removeClass('$asc $dsc');
        }

        reload();
      });

    var tableView = TVRO.TableView($('.\\#table-view', jQ))
      .onBuild(function(row, sat) {
        $('.\\#sat-name', row).text(sat.name || 'N/A');
        $('.\\#sat-region', row).text(sat.region || 'N/A');
        
        // $('.\\#sat-antSatID', row).text(TVRO.formatLongitude(sat.lon, 2));
        $('.\\#sat-antSatID', row).text(sat.antSatID || 'N/A');
        row.toggleClass('$fav', sat.favorite);

        TVRO.getInstalledSat().then(function(installedSat) {
          row.toggleClass('$ins', installedSat.antSatID === sat.antSatID);
        });

        $('.\\#install-btn', row).click(function() {
          var installed = row.hasClass('$ins');
          //  if installed, ask for confirmation
          var confirmed = installed ? false : confirm('Are you sure you want to install ' + sat.name + '?');
          if (confirmed) TVRO.setInstalledSat(sat).then(TVRO.reload);
        });

        $('.\\#fav-btn', row).click(function() {
          row.toggleClass('$fav');
          TVRO.setSatelliteIdentity({
            antSatID:sat.antSatID,
            favorite: row.hasClass('$fav') ? 'TRUE' : 'FALSE'
          });
        });
      });

    var reload = function() {
      TVRO.getSats().then(function(sats) {
        if (region !== 'All') sats = _.filter(sats, { region: region });
        if (sortFilter) sats = _.sortBy(sats, sortFilter);
        if (sortFilter && sortReverse) sats.reverse();
        tableView.setValues(sats).build();
      });
    };

    return self = _.merge(tableView, {
      setRegion: function(arg) {
        region = arg;
        return self;
      },

      getRegion: function() {
        return region;
      },

      reload: reload
    });
  }

  TVRO.SatTableView = SatTableView;

}(window.TVRO);