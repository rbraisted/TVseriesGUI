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

      else TVRO.setSatelliteService({
        service: value
      }).then(function() {
        if (value === 'DIRECTV'){ 
        	window.location.hash = '/local-channels';
        }else if (value === 'DISH'){
        	window.location.hash = '/dish-network';
        }else if (value === 'BELL'){
            TVRO.setAutoswitchService({
            	service: 'BELL',
                satellite_group: 'BELL'
            }).then(function() {
                document.body.className = '/spinner';
                setTimeout(function() {
                	window.location = '/wizard/system.php#/other-system-config';
                }, 500);
              });
        }else{
        	window.location = '/wizard/satellites.php';
        }
      });
    });

    var prevBtn = $('.\\#prev-btn', jQ).click(function() {
      window.location = '/wizard/gps.php#/heading-source';
    });
    
    TVRO.getSatelliteService()
    .then(function(xml) {
       var service = $('service', xml).text();
   	   console.log(service);
    }).then(self.setValue);
    
  //   TVRO.getService()
  //    .then(self.setValue);

    return self;
  };



  var ServiceSubtypeView = function(jQ) {
    var self = TVRO.TableView($('.\\#table-view', jQ))
      .setValues([
        'NORTH_AMERICA',
        'LATIN_AMERICA'
      ])
      .onBuild(function(row, value) {
        if (value === 'NORTH_AMERICA') $('.\\#value', row).text('DIRECTV North America');
        else $('.\\#value', row).text('DIRECTV Latin America');
      })
      .build();

    var nextBtn = $('.\\#next-btn', jQ).click(function() {
      var value = self.getValue();
      if (!value) alert('You must select an option to continue.');
      else TVRO.setAutoswitchService({
        service: 'DIRECTV',
        service_subtype: value
      }).then(function() {
        window.location = '/wizard/system.php#/linear-system-config'
      });
    });

    var prevBtn = $('.\\#prev-btn', jQ).click(function() {
      window.location.hash = '/local-channels';
    });

    return self;
  };



  var LocalChannelsView = function(jQ) {
    var self;

    var installBtn = $('.\\#install-btn', jQ).click(function() {
      TVRO.setInstalledSat({
        antSatID: '119WD'
      }).then(function() {
        document.body.className = '/spinner';
        setTimeout(function() {
          TVRO.getAntennaVersions().then(function(xml) {
            var isTriAmericas = $('lnb name', xml).text() === 'Tri-Americas';
            if (isTriAmericas) window.location.hash = '/service-subtype';
            else window.location.hash = '/directv';
          });
        }, 500);
      });
    });

    var nextBtn = $('.\\#next-btn', jQ).click(function() {
      window.location.hash = '/directv';
    });
    
    var prevBtn = $('.\\#prev-btn', jQ).click(function() {
      window.location.hash = '/service-provider';
    });

    return self;
  };



  var DirectvView = function(jQ) {
    var singleOption = {
      title: 'Single Satellite',
      copy: 'For programming on the 101 satellite, you are ready to activate ' +
            'your system!'
    };

    var manualOption = {
      title: 'Manual Switching',
      copy: 'For programming on the 101 & 119 satellites with manual ' +
            'switching between them, you are ready to activate your system!'
    };

    var automaticOption = {
      title: 'Automatic Switching',
      copy: 'For programming on the 101 & 119 satellites with automatic ' +
            'switching between them, you need to set up the system for ' +
            'automatic switching.'
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
          window.location = '/wizard/activation.php';
        });

      else if (option === manualOption)
        TVRO.setAutoswitchService({
          enable: 'N',
          service: 'DIRECTV',
          satellite_group: 'DIRECTV-USA'
        }).then(function() {
          window.location = '/wizard/activation.php';
        });

      else if (option === automaticOption)
        TVRO.setInstalledGroup({
          name: 'DIRECTV-USA'
        }).then(function() {
          window.location = '/wizard/autoswitch.php';
        });
    });

    var prevBtn = $('.\\#prev-btn', jQ).click(function() {
      window.location.hash = '/local-channels';
    });

    return self;
  };



var DishNetworkView = function(jQ) {
    var self;

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
      .onClick(onClick)
      .onBuild(function(row, group) {
        if (group === 'Other') {
          $('.\\#value', row).text('Other');

        } else {
          //  we're trying to print this:
          //  Group Name (SatLon, SatLon)
          var value = group.name + ' (';

          value += _.map(group.getSats(), function(sat) {
            return TVRO.formatLongitude(sat.lon, 0);
          }).join(', ');

          value += ')';

          $('.\\#value', row).text(value);
        }
      });

    var satsView = $('.\\#sats-view', jQ).hide();
    var satsTableView = TVRO.TableView($('.\\#table-view', satsView))
      .onClick(onClick)
      .onBuild(function(row, sat) {
        if (sat === 'Other') $('.\\#value', row).text('Other');
        else $('.\\#value', row).text(sat.name + ' - ' + TVRO.formatLongitude(sat.lon, 0));
      });

    //  load up the tables
    TVRO.getGroups().then(function(groups) {
      groups = groups.concat(['Other']);
      groupsTableView
        .setValues(groups)
        .build();
    });

    TVRO.getSats()
      .then(function(sats) {
        sats = sats.concat(['Other']);
        satsTableView.setValues(sats);
      })
      .then(satsTableView.build);

    var nextBtn = $('.\\#next-btn', jQ).click(function() {
      var isGroup = groupsView.is(':visible');
      var value = isGroup ? groupsTableView.getValue() : satsTableView.getValue();

      if (!value) alert('You must select an option to continue.');

      else if (isGroup)
        TVRO.setInstalledSat({
          antSatID: value
        }).then(function() {
          document.body.className = '/spinner';
          setTimeout(function() {
            window.location = '/wizard/system.php';
          }, 500);
        });

      else
        TVRO.setInstalledGroup({
          name: value
        }).then(function() {
          document.body.className = '/spinner';
          setTimeout(function() {
            window.location = '/wizard/system.php';
          }, 500);
        });
    });
    
    var prevBtn = $('.\\#prev-btn', jQ).click(function() {
      if (groupsView.is(':visible')) {
        window.location.hash = '/service-provider';
      } else {
        groupsView.show();
        satsView.hide();
      }
    });

    return self;
  };



  TVRO.ServiceProviderView = ServiceProviderView;
  TVRO.ServiceSubtypeView = ServiceSubtypeView;
  TVRO.LocalChannelsView = LocalChannelsView;
  TVRO.DirectvView = DirectvView;
  TVRO.DishNetworkView = DishNetworkView;

}(window.TVRO);


$(function() {
  var serviceProviderView = TVRO.ServiceProviderView($('.\\#service-provider-view'));
  var serviceSubtypeView = TVRO.ServiceSubtypeView($('.\\#service-subtype-view'));
  var localChannelsView = TVRO.LocalChannelsView($('.\\#local-channels-view'));
  var directvView = TVRO.DirectvView($('.\\#directv-view'));
  var dishNetworkView = TVRO.DishNetworkView($('.\\#dish-network-view'));

  TVRO.onHashChange(function(hash) {
    document.body.className = hash;
  });

  TVRO.reload();
});