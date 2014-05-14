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
        if (value === 'DIRECTV') {
          window.location.hash = '/directv';

        } else if (value === 'DISH') {
          window.location.hash = '/dish-network';

        } else if (value === 'BELL') {
          TVRO.setAutoswitchService({
            enable : 'Y',
            service: 'BELL',
            satellite_group: 'BELL TV DUAL'
          }).then(function() {
            document.body.className = '/checkswitch-spinner';
            startCheckswitchMode();
          });

        } else {
          window.location = '/wizard/satellites.php';
        }
      });
    });

    var prevBtn = $('.\\#prev-btn', jQ).click(function() {
      window.location = '/wizard/gps.php#/heading-source';
    });

    TVRO.getSatelliteService()
    .then(function(xml) {
      return $('service', xml).text();
    }).then(self.setValue);    

    return self;
  };

  var TriAmGroupView = function(jQ) {
    var self = TVRO.TableView($('.\\#table-view', jQ))
    .setValues(['TRI-AM DUAL',
                'TRI-AM TRISAT'])
                .onBuild(function(row, value) {
                  if (value === 'TRI-AM DUAL') $('.\\#value', row).text('TRI-AM DUAL');
                  else if (value === 'TRI-AM TRISAT') $('.\\#value', row).text('TRI-AM TRISAT');
                })
                .build();

    var nextBtn = $('.\\#next-btn', jQ).click(function() {
      var value = self.getValue();
      if (!value) alert('You must select an option to continue.');
      else{ 
        TVRO.setAutoswitchService({
          enable: 'N',
          service: 'DIRECTV',
          satellite_group: value
        }).then(function() {
          document.body.className = '/spinner';
          setTimeout(function() {
            if(value === 'TRI-AM DUAL'){
              window.location = '/wizard/activation.php';
            }else{
              window.location.hash = '/directv';
            }  
          }, 500);
        });
      }
    });

    var prevBtn = $('.\\#prev-btn', jQ).click(function() {
      window.location = '/wizard/gps.php#/heading-source';
    });

    TVRO.getInstalledGroup().then(function(installedGroup){self.setValue(installedGroup.name)});    

    return self;
  };

  var DirectvView = function(jQ) {

    var group = '';

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
    
    var self = TVRO.TableView($('.\\#table-view', jQ));

    // We grap the lnb to handle when a TRI AM LNB is set.
    // We grap the installed group since we installed the group for TRI AM
    // LNB in the previous step.
    Promise.all(
        TVRO.getInstalledGroup(),
        TVRO.getAntennaVersions()
    ).then(function(xmls) {
      var isTriAmericas = $('lnb name', xmls[1]).text() === 'Tri-Americas Circular';

      if (isTriAmericas == true){
        group = xmls[0].name;
        self.setValues([manualOption, automaticOption]);
        self.onBuild(function(row, option) {
          $('.\\#title', row).text(option.title);
          $('.\\#copy', row).text(option.copy);
        }).build();
      }else{
        group = 'DIRECTV DUAL';
        self.setValues([singleOption, manualOption, automaticOption]);
        self.onBuild(function(row, option) {
          $('.\\#title', row).text(option.title);
          $('.\\#copy', row).text(option.copy);
        }).build();
      }
    });

    $('.\\#directv-view')
    .find('.\\#cityDropdown')
    .click(function() {
      window.location.hash = '/cities-119';
    })
    .end()

    $('.\\#cities-119-view .\\#back-btn').click(function() { window.location.hash = '/directv'; });

    var nextBtn = $('.\\#next-btn', jQ).click(function() {
      var option = self.getValue();
      if (!option) alert('You must select an option to continue.');

      else if (option === singleOption)
        TVRO.setInstalledSat({
          antSatID: '101W'
        }).then(function() {
          document.body.className = '/spinner';
          setTimeout(function() {
            window.location = '/wizard/activation.php';
          }, 500);
        });

      else if (option === manualOption){          
        TVRO.setAutoswitchService({
          enable: 'N',
          service: 'DIRECTV',
          satellite_group: group
        }).then(function() {
          document.body.className = '/spinner';
          setTimeout(function() {
            window.location = '/wizard/activation.php';
          }, 500);
        });

      }else if (option === automaticOption)
        TVRO.setAutoswitchService({
          enable: 'Y',
          service: 'DIRECTV',
          satellite_group: group
        }).then(function() {
          document.body.className = '/spinner';
          setTimeout(function() {
            window.location = '/wizard/autoswitch.php#/directv';
          }, 500);
        });
    });

    var prevBtn = $('.\\#prev-btn', jQ).click(function() {
      TVRO.getAntennaVersions().then(function(xmls) {
        var isTriAmericas = $('lnb name', xmls[0]).text() === 'Tri-Americas Circular';

        if (isTriAmericas == true) window.location.hash = '/tri-am-group';
        else window.location = '/wizard/service.php';
      });
    });

    return self;
  };

  var DishNetworkView = function(jQ) {
    var self;
    var onClick = function(value) {
      if (value === 'OTHER') {
        satsView.toggle();
        groupsView.toggle();        
      }
    };

    var groupsView = $('.\\#groups-view', jQ).show();
    var groupsTableView= TVRO.TableView($('.\\#table-view', groupsView))
    .onClick(onClick)
    .setValues([
                'WESTERN ARC',
                'EASTERN ARC',
                'LEGACY EASTERN ARC',
                '72W',
                'DISH 500',
                'OTHER'
                ])
                .onBuild(function(row, value) {
                  if (value === 'WESTERN ARC') $('.\\#value', row).text('Western Arc (110\u00B0W, 119\u00B0W, 129\u00B0W)');
                  if (value === 'EASTERN ARC') $('.\\#value', row).text('Eastern Arc (61\u00B0W, 72\u00B0W, 77\u00B0W)');
                  if (value === 'LEGACY EASTERN ARC') $('.\\#value', row).text('Legacy Eastern Arc (61\u00B0W, 110\u00B0W, 119\u00B0W)');
                  if (value === '72W') $('.\\#value', row).text('72W (72\u00B0W)');
                  if (value === 'DISH 500') $('.\\#value', row).text('Dish 500 (110\u00B0W, 119\u00B0W)');
                  if (value === 'OTHER') $('.\\#value', row).text('Other');
                })
                .build();

    var satsView = $('.\\#sats-view', jQ).hide();
    var satsTableView = TVRO.TableView($('.\\#table-view', satsView))
    .onClick(onClick)
    .setValues([
                '61W',
                '72W',
                '77WM',
                '110W',
                '119W',
                '129W'
                ])
                .onBuild(function(row, value) {
                  if (value === '61W') $('.\\#value', row).text('61\u00B0W');
                  if (value === '72W') $('.\\#value', row).text('72\u00B0W');
                  if (value === '77WM') $('.\\#value', row).text('77\u00B0W');
                  if (value === '110W') $('.\\#value', row).text('110\u00B0W');
                  if (value === '119W') $('.\\#value', row).text('119\u00B0W');
                  if (value === '129W') $('.\\#value', row).text('129\u00B0W');
                })
                .build();

    var nextBtn = $('.\\#next-btn', jQ).click(function() {
      var isGroup = groupsView.is(':visible');
      var value = isGroup ? groupsTableView.getValue() : satsTableView.getValue();

      if (!value) {
        alert('You must select an option to continue.');
        return; // RETURN
      }

      //  a promise that we've installed a satellite or a group
      var installPromise;

      if (isGroup) {
        installPromise = TVRO.setAutoswitchService({
          satellite_group: value,
          service: 'DISH',
          enable: 'Y'
        });
      } else {
        installPromise = TVRO.selectSatellite({
          antSatID: value
        });
      }

      //  whether we installed a group or a single sat
      //  we want to follow up with the same thing
      installPromise.then(function() {
        document.body.className = '/checkswitch-spinner';
        startCheckswitchMode();
      }); //end installPromise
    });

    var prevBtn = $('.\\#prev-btn', jQ).click(function() {
      if (groupsView.is(':visible')) {
        window.location = '/wizard/service.php';
      }else{
        groupsView.show();
        satsView.hide(); 	
      }
    });

    // Retrieve the installed satellite to update the screen
    TVRO.getAntennaStatus()
    .then(function(xml) {   
      return $('satellite antSatID', xml).text();
    }).then(satsTableView.setValue);    

    // Retrieve the installed group to update the screen
    TVRO.getAutoswitchStatus()
    .then(function(xml) {   
      return $('satellite_group', xml).text();
    }).then(groupsTableView.setValue);    

    return self;
  };

  function startCheckswitchMode(){
    //  wait 10 seconds to allow antenna to switch
    //  service/groups and avoid false tracking.
    //  every second after, check if state is TRACKING
    //  once state is tracking ... ???
    setTimeout(function() {
      var interval = setInterval(function() {
        TVRO.getAntennaStatus(1,1).then(function(xml) {
          var state =  $('antenna state', xml).text();
          $('.\\#checkswitch-status').text("The TV-hub is Installing the group. Status: " + state);
          if (state === 'TRACKING') {
            clearInterval(interval);

            TVRO.setCheckswitchMode({
              enable : 'Y',
            }).then(function() {
              var isEnabled;
              var status = 0;
              var intervalID = window.setInterval(function() {
                //  use TVRO.webserviceCall(1, 1) to force recache
                TVRO.getCheckswitchMode(1, 1).then(function(xml) {
                  isEnabled = $('enable', xml).text();
                  status =  $('status', xml).text();
                  $('.\\#checkswitch-status').text("The TV-hub is preparing for checkswitch mode. Status: " + status);

                  switch (status){
                  case "IN_PROGRESS":
                    window.clearInterval(intervalID);
                    window.location = '/wizard/system.php#/other-system-config';
                    break;
                  case "FAILED":
                    window.clearInterval(intervalID);
                    alert("Checkswitch mode has failed.");
                    break;
                  }
                });
              }, 1000);
            }); //End .then for  setCheckswitchMode   
          } //End if (state === 'TRACKING')
        });          
      }, 1000);
    }, 10000);
  }

  TVRO.ServiceProviderView = ServiceProviderView;
  TVRO.TriAmGroupView = TriAmGroupView;
  //TVRO.LocalChannelsView = LocalChannelsView;
  TVRO.DirectvView = DirectvView;
  TVRO.DishNetworkView = DishNetworkView;

}(window.TVRO);

$(function() {
  var serviceProviderView = TVRO.ServiceProviderView($('.\\#service-provider-view'));
  var TriAmGroupView = TVRO.TriAmGroupView($('.\\#tri-am-group-view'));
  //var localChannelsView = TVRO.LocalChannelsView($('.\\#local-channels-view'));
  var directvView = TVRO.DirectvView($('.\\#directv-view'));
  var dishNetworkView = TVRO.DishNetworkView($('.\\#dish-network-view'));

  TVRO.onHashChange(function(hash) {
    document.body.className = hash;
  });

  TVRO.reload();
});

