!function(TVRO) {
  "use strict";

  var SatTableView = function(jQ) {
    var self;

    var region;
    var previousRegion; // store this so that if you reload a region

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
          sortReverse = sortBtn.hasClass('$ascending');
          sortBtns.removeClass('$ascending $descending');
          sortBtn.toggleClass('$descending', sortReverse).toggleClass('$ascending', !sortReverse);
        } else {
          sortBtns.removeClass('$ascending $descending');
        }

        reload();
      });

    var tableView = TVRO.TableView($('.\\#table-view', jQ))
      .onBuild(function(row, sat) {

        $('.\\#sat-name', row).text(sat.name || 'N/A');
        $('.\\#sat-region', row).text(sat.region || 'N/A');
        $('.\\#sat-longitude', row).text(TVRO.formatOrbitalSlot(sat.antSatID, sat.lon) || 'N/A');
        row.toggleClass('$favorite', sat.favorite);

        TVRO.getInstalledSat().then(function(installedSat) {
          row.toggleClass('$installed', installedSat.antSatID === sat.antSatID);
        });

        $('.\\#install-btn', row).click(function() {
          var installed = row.hasClass('$installed');
          //  if not installed, ask for confirmation
          var confirmed = installed ? false : confirm('Are you sure you want to install ' + sat.name + '?');
          if (confirmed)
            TVRO.setInstalledSat(sat);
        });

        $('.\\#fav-btn', row).click(function() {
          row.toggleClass('$favorite');
          TVRO.setSatelliteIdentity({
            listID: sat.listID,
            antSatID:sat.antSatID,
            favorite: row.hasClass('$favorite') ? 'TRUE' : 'FALSE'
          });
        });
      });

    var reload = function() {
      TVRO.getSats().then(function(sats) {
        if (region !== 'All') sats = _.filter(sats, { region: region });
        if (sortFilter) sats = _.sortBy(sats, sortFilter);
        if (sortFilter && sortReverse) sats.reverse();

        var scrollTop;
        if (region === previousRegion) scrollTop = $('.\\#table-view', jQ).scrollTop();

        tableView.setValues(sats).build();

        if (scrollTop !== null) $('.\\#table-view', jQ).scrollTop(scrollTop);

      });
    };

    return self = _.merge(tableView, {
      setRegion: function(arg) {
        previousRegion = region;
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