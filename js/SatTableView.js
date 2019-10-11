!function(TVRO) {
  "use strict";

  var SatTableView = function(jQ) {
    var self;

    var region;
    var previousRegion; // store this so that if you reload a region

    var sortFilter;
    var sortReverse;

    //  all these sort btns are in the #table-view #table-head
    //  so set them up before you set up the #table-view because
    //  TVRO.TableView will remove #table-head from the DOM on creation

    var sortBtns = $('.\\#sort-btn', jQ)
    .click(function() {
      var sortBtn = $(this);
      sortFilter = undefined;

      if (sortBtn.is('.\\#name-btn')) {
        sortFilter = 'name';
      } else if (sortBtn.is('.\\#lon-btn')) {
        sortFilter = 'lon';
      } else if (sortBtn.is('.\\#region-btn')) {
        sortFilter = 'region';
      } else if (sortBtn.is('.\\#fav-btn')) {
        sortFilter = function(sat) { return !sat.favorite; };
      }

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

      TVRO.getSelectedSat().then(function(selectedSat) {
        row.toggleClass('$installed', selectedSat === sat.antSatID);
        // When we are at the row with the installed Sat, set the scroll.
        if (selectedSat === sat.antSatID) {
          //Get the row top (relation to the page then subtract off the top of
          //the table and table header(stationary in the table).
          $('.\\#table-view', jQ).scrollTop(row.offset().top - ($('.\\#table-view', jQ).offset().top + $('.\\#table-view .\\table-head', jQ).height()));
        }
      });

      /*In Satellites view, if any satellite in the list has <select> set to false, do not have a radio button that allows the user to select this satellite for installation - Start - UHD7 - STWA-314*/
      if(sat.select === 'false' || sat.select === 'FALSE') {
        $('.\\#install-btn', row).remove();
      }
      /*In Satellites view, if any satellite in the list has <select> set to false, do not have a radio button that allows the user to select this satellite for installation - End - UHD7 - STWA-314*/
      /* On the Satellites view, if any satellite in the list has the <triSatID> set to not false, then (removing) the 'i' icon on the right side of the record  - Start - UHD7 - STWA-315*/
      if(sat.triSatID !== 'false' && sat.triSatID !== 'FALSE') {
        $('.\\#info-btn', row).remove();
      }
      /* On the Satellites view, if any satellite in the list has the <triSatID> set to not false, then (removing) the 'i' icon on the right side of the record  - End - UHD7 - STWA-315*/
      
      var hash = window.location.hash;
      var split = _.rest(hash.split('/'));
      if(split.length > 0 && split[0] === 'groups' )
      {
        if((sat.triSatID !== 'false' && sat.triSatID !== 'FALSE') || (sat.antSatID === '99W' || sat.antSatID === '103W'))
        {
          $(row).addClass('removeElement');  
        }
      }

      $('.\\#install-btn', row).click(function() {
        var confirmed = confirm('Are you sure you want to install ' + sat.name + '?');
        if (confirmed) {
          TVRO.setInstalledSat(sat, true);
        }
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
        if (region !== 'All') {
          sats = _.filter(sats, { region: region });
        }

        if (sortFilter) {
          sats = _.sortBy(sats, sortFilter);
        }

        if (sortFilter && sortReverse) {
          sats.reverse();
        }

        tableView.setValues(sats).build();
        //$(window).load(function () {
            $('.removeElement').remove();
        //});
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