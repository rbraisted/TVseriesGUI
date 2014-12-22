$(function() {
  
  var headerView = TVRO.HeaderView($('.\\#header-view'));

  setInterval(function() {
    headerView.reload();
  }, 3000);

    var menuTableView = TVRO.TableView($('.\\#menu-table-view'))
        .setValues([
            'General',
            'Network',
            'Advanced'
        ])
        .onClick(function(value) {
            window.location.hash = '/' + value.toLowerCase();
        })
        .onBuild(function(row, value) {
            $('.\\#menu-item', row).text(value);
        })
        .build();

    var generalSettingsView = TVRO.GeneralSettingsView(
        $('.\\#general-settings-view')
            .find('.\\#back-btn')
                .click(function() {
                    window.location.hash = '';
                })
                .end()
    );

    var advancedSettingsView = TVRO.AdvancedSettingsView(
        $('.\\#advanced-settings-view')
            .find('.\\#back-btn')
                .click(function() {
                    window.location.hash = '';
                })
                .end()
    );

  var networkSettingsView = TVRO.NetworkSettingsView(
    $('.\\#network-settings-view')
      .find('.\\#back-btn')
        .click(function() {
          window.location.hash = '';
        })
        .end()
      .find('.\\#ethernet-btn')
        .click(function() {
          window.location.hash = '/network/ethernet';
        })
        .end()
      .find('.\\#wireless-btn')
        .click(function() {
          window.location.hash = '/network/wireless';
        })
        .end()
  );

  var ethernetSettingsView = TVRO.EthernetSettingsView(
    $('.\\#ethernet-settings-view')
      .find('.\\#back-btn')
        .click(function() {
          window.location.hash = '/network';
        })
        .end()
  );

  var wirelessSettingsView = TVRO.WirelessSettingsView(
    $('.\\#wireless-settings-view')
      .find('.\\#back-btn')
        .click(function() {
          window.location.hash = '/network';
        })
        .end()
  );

  //  pretty simple routing
  //  /general
  //  /advanced
  //  /network
  //  /network/ethernet
  //  /network/wireless

    TVRO.onHashChange(function(hash) {
    headerView.reload();
    
    if (!hash) {
      menuTableView.setValue('General');
      generalSettingsView.reload();

    } else if (hash.match(/\/general/)) {
      menuTableView.setValue('General');
      generalSettingsView.reload();

    } else if (hash.match(/\/vessel-location/)) {
      menuTableView.setValue('General');
      generalSettingsView.reload();

    } else if (hash.match(/\/advanced/)) {
      menuTableView.setValue('Advanced');
      advancedSettingsView.reload();

    } else if (hash.match(/\/network/)) {
      menuTableView.setValue('Network');
      networkSettingsView.reload();

      if (hash.match(/\/ethernet/)) ethernetSettingsView.reload();
      else if (hash.match(/\/wireless/)) wirelessSettingsView.reload();
    }

        document.body.className = hash; 
    });

    TVRO.reload();
});