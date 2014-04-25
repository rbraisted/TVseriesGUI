$(function() {

  TVRO.debug = 2;

  
  var menuTableView = TVRO.TableView($('.\\#menu-table-view'))
    .setValues([
      'SatLibrary',
      'TV1',
      'TV3',
      'TV5',
      'TV6',
      'RV1'
    ])
    .onBuild(function(row, update) {
      var techMode = TVRO.getTechMode();
      var antUpdate = update !== 'SatLibrary';
      var updateName = antUpdate ? update : 'Satellite Library';
      $('.\\#update-name', row).text(updateName);

      row.toggleClass('$antenna', antUpdate)
         .toggleClass('$sat-library', !antUpdate);

      //  get the portal version (latest/avail to download)
      TVRO.getLatestSoftware(update).then(function(xml) {
        var portalVersion = $('software_version', xml).text() || $('version', xml).text();
        $('.\\#portal-ver', row).text(portalVersion);
      });

      TVRO.getDeviceVersions().then(function(deviceVersions) {
        $('.\\#device-ver-label', row).show();
        $('.\\#device-ver', row).text(deviceVersions[update] || 'N/A');
      });
    })
    .onClick(function(update) {
      window.location.hash = '/' + update;
    })
    .build();

  var updateView = TVRO.UpdateView(
    $('.\\#update-view')
      .find('.\\#back-btn')
        .click(function() {
          window.location.hash = '';
        })
        .end()
  );

  //  initializations

  TVRO.onHashChange(function(hash) {
    // headerView.reload();
    
    //  so that device versions can be updated
    //  after the file has been downloaded in to the shell
    if (TVRO.getShellMode())
      menuTableView.build();

    if (hash) {
      var update = hash.substr(1);
      menuTableView.setValue(update);
      updateView.setUpdate(update);
      document.body.className = '/update';
    } else {
      //  set sat lib as default view
      menuTableView.setValue('SatLibrary');
      updateView.setUpdate('SatLibrary');

      //  set connected ant as view
      // TVRO.getAntennaVersions().then(function(xml) {
      //   var update = $('au model', xml).text();
      //   if (!update) update = 'SatLibrary';
      //   menuTableView.setValue(update);
      //   updateView.setUpdate(update);
      // });

      document.body.className = '';
    }
  });

  TVRO.reload();
});


