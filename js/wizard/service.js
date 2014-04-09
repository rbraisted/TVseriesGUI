!function(TVRO) {
  "use strict";

  var ServiceProviderView = function(jQ) {
    var self = TVRO.TableView($('.\\#table-view', jQ))
      .setValues([
        'DIRECTV',
        'DISH',
        'OTHER'
      ])
      .onBuild(function(row, value) {
        if (value === 'DIRECTV') $('.\\#value', row).text('DIRECTV');
        if (value === 'DISH') $('.\\#value', row).text('DISH Network');
        if (value === 'OTHER') $('.\\#value', row).text('Other');
      })
      .build();

    var nextBtn = $('.\\#next-btn', jQ).click(function() {
      var value = self.getValue();
      if (!value) alert('You must select an option to continue.');

      else if (value === 'DISH') 
        window.location.hash = '/dish-network';

      else if (value === 'DIRECTV')
        TVRO.setAutoswitchService({
          service: 'DIRECTV'
        }).then(function() {
          window.location.hash = '/local-channels';
        });

      else if (value === 'OTHER')
        TVRO.setAutoswitchService({
          service: 'OTHER'
        }).then(function() {
          window.location = '/wizard/system.php';
        });
    });

    var prevBtn = $('.\\#prev-btn', jQ).click(function() {
      window.location = '/wizard/gps.php#/heading-source';
    });

    TVRO.getService().then(function(service) {
      console.log(service);
      self.setValue(service);
    });

    return self;
  };



  var LocalChannelsView = function(jQ) {
    var self;

    var installBtn = $('.\\#install-btn', jQ).click(function() {
      TVRO.setInstalledSat({
        antSatID: '119WD'
      }).then(function() {
        window.location.hash = '/directv';
      });
    });

    var nextBtn = $('.\\#next-btn', jQ).click(function() {
      window.location.hash = '/directv';
    });
    
    var prevBtn = $('.\\#prev-btn', jQ).click(function() {
      window.location.hash = '';
    });

    return self;
  };



  var DirectvView = function(jQ) {
    var self;
    return self;
  };



  var DishNetworkView = function(jQ) {
    var self;

    var onBuild = function(row, value) {
      $('.\\#value', row).text(value);
    };

    var onClick = function(value) {
      if (value === 'Other') {
        satsTableView.setValue('');
        groupsTableView.setValue('');
        satsView.toggle();
        groupsView.toggle();        
      }
    };

    var groupsView = $('.\\#groups-view', jQ).show();
    var groupsTableView = TVRO.TableView($('.\\#table-view', groupsView))
      .setValues([
        'WESTERN ARC',
        'LEGACY ARC',
        'DUAL ARC',
        '72-GROUP',
        'Other'
      ])
      .onClick(onClick)
      .onBuild(onBuild)
      .build();

    var satsView = $('.\\#sats-view', jQ).hide();
    var satsTableView = TVRO.TableView($('.\\#table-view', satsView))
      .onClick(onClick)
      .onBuild(onBuild)
      .build();

    var nextBtn = $('.\\#next-btn', jQ).click(function() {
      if (groupsView.is(':visible')) {

      } else {

      }
    });
    
    var prevBtn = $('.\\#prev-btn', jQ).click(function() {
      if (groupsView.is(':visible')) {
        window.location.hash = '';
      } else {
        groupsView.show();
        satsView.hide();
      }
    });

    return self;
  };



  var SpinnerView = function(jQ) {
    var self;
    return self;
  };


  TVRO.ServiceProviderView = ServiceProviderView;
  TVRO.LocalChannelsView = LocalChannelsView;
  TVRO.DirectvView = DirectvView;
  TVRO.DishNetworkView = DishNetworkView;
  TVRO.SpinnerView = SpinnerView;

}(window.TVRO);


$(function() {
  var serviceProviderView = TVRO.ServiceProviderView($('.\\#service-provider-view'));
  var localChannelsView = TVRO.LocalChannelsView($('.\\#local-channels-view'));
  var dishNetworkView = TVRO.DishNetworkView($('.\\#dish-network-view'));
  // var cdtVesselInfoView = TVRO.CdtVesselInfoView($('.\\#cdt-vessel-info-view'));
  // var diyVesselInfoView = TVRO.DiyVesselInfoView($('.\\#diy-vessel-info-view'));
  // var installerInfoView = TVRO.InstallerInfoView($('.\\#installer-info-view'));

  TVRO.onHashChange(function(hash) {
    // if (hash === '/local-channels') installerIdView.setValue('CDT');
    // else if (hash === '/diy-vessel-info') installerIdView.setValue('DIY');
    // else if (hash === '/installer-info') installerIdView.setValue('CDT');
    document.body.className = hash;
  });

  TVRO.reload();
});