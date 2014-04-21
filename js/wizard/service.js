!function(TVRO) {
  "use strict";

  var ServiceProviderView = function(jQ) {
    var self = TVRO.TableView($('.\\#table-view', jQ))
      .setValues([
        'DIRECTV',
        'DISH',
        'BELL',
        'OTHER'
      ])
      .onBuild(function(row, value) {
        if (value === 'DIRECTV') $('.\\#value', row).text('DIRECTV');
        if (value === 'DISH') $('.\\#value', row).text('DISH Network');
        if (value === 'BELL') $('.\\#value', row).text('Bell TV');
        if (value === 'OTHER') $('.\\#value', row).text('Other');
      })
      .build();

    var nextBtn = $('.\\#next-btn', jQ).click(function() {
      var value = self.getValue();
      if (!value) alert('You must select an option to continue.');

      //  directv shows the local-channels view
      else if (value === 'DIRECTV')
        TVRO.setAutoswitchService({
          service: 'DIRECTV'
        }).then(function() {
          window.location.hash = '/local-channels';
        });

      else // set the service and move to satellite selection
        TVRO.setAutoswitchService({
          service: value
        }).then(function() {
          window.location = '/wizard/satellites.php';
        });
    });

    var prevBtn = $('.\\#prev-btn', jQ).click(function() {
      window.location = '/wizard/gps.php#/heading-source';
    });

    TVRO.getService().then(function(service) {
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
    var singleOption = {
      title: 'Single Satellite',
      copy: 'For programming on the 101 satellite, you are ready to activate your system!'
    };

    var manualOption = {
      title: 'Manual Switching',
      copy: 'For programming on the 101 satellite, you are ready to activate your system!'
    };

    var automaticOption = {
      title: 'Automatic Switching',
      copy: 'For programming on the 101 & 119 satellites with automatic switching between them, you need to set up the system for automatic switching.'
    };

    var self = TVRO.TableView($('.\\#table-view', jQ))
      .setValues([singleOption, manualOption, automaticOption])
      .onBuild(function(row, option) {
        $('.\\#title', row).text(option.title);
        $('.\\#copy', row).text(option.copy);
      })
      .build();

    var nextBtn = $('.\\#next-btn', jQ).click(function() {
      var option = self.getValue();
      if (!option) alert('You must select an option to continue.');

      else if (option === singleOption)
        TVRO.setInstalledSat({
          antSatID: '101W'
        }).then(function() {

        });

      else if (option === manualOption)
        TVRO.setInstalledGroup({
          name: 'DIRECTV-USA'
        }).then(function() {

        });

      else if (option === automaticOption)
        window.location = '/wizard/autoswitch.php';
    });

    var prevBtn = $('.\\#prev-btn', jQ).click(function() {
      window.location.hash = '/local-channels';
    });

    return self;
  };


  TVRO.ServiceProviderView = ServiceProviderView;
  TVRO.LocalChannelsView = LocalChannelsView;
  TVRO.DirectvView = DirectvView;

}(window.TVRO);


$(function() {
  var serviceProviderView = TVRO.ServiceProviderView($('.\\#service-provider-view'));
  var localChannelsView = TVRO.LocalChannelsView($('.\\#local-channels-view'));
  var directvView = TVRO.DirectvView($('.\\#directv-view'));

  TVRO.onHashChange(function(hash) {
    document.body.className = hash;
  });

  TVRO.reload();
});