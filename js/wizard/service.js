!function(TVRO) {
  "use strict";

  var ServiceProviderView = function(jQ) {
    var self = TVRO.TableView($('.\\#table-view', jQ))
    .setValues(['DIRECTV',
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
            document.body.className = '/spinner';
            startCheckswitchMode(value);
          });

        } else {
          window.location = '/wizard/satellites.php';
        }
      });
    });

    var prevBtn = $('.\\#prev-btn', jQ).click(function() {
      window.location = '/wizard/gps.php#/heading-source';
    });

    TVRO.getService().then(self.setValue);

    return self;
  };

  var TriAmGroupView = function(jQ) {
    var self = TVRO.TableView($('.\\#table-view', jQ))
    .setValues(['TRI-AM DUAL',
                'TRI-AM TRISAT'])
                .onBuild(function(row, value) {
                  if (value === 'TRI-AM DUAL') $('.\\#value', row).text('TRI-AM DUAL (101\u00B0W, 95\u00B0W)');
                  else if (value === 'TRI-AM TRISAT') $('.\\#value', row).text('TRI-AM TRISAT (101\u00B0W, 119\u00B0W, 95\u00B0W)');
                })
                .build();

    var nextBtn = $('.\\#next-btn', jQ).click(function() {
      var interval;

      var value = self.getValue();
      if (!value) alert('You must select an option to continue.');
      else {

        TVRO.setAutoswitchService({
          enable: 'N',
          service: 'DIRECTV',
          satellite_group: value
        }).then(function() {
          document.body.className = '/spinner';
          setTimeout(function() {
            interval = setInterval(function() {
              TVRO.getAntState().then(function(state) {
                $('.\\#ant_status').text("The TV-Hub is Installing the group. Status: " + state);
                if ((state === 'SEARCHING') || (state === 'TRACKING')) {
                  clearInterval(interval);
                  if (value === 'TRI-AM DUAL') window.location = '/wizard/activation.php';
                  else window.location.hash = '/directv';
                } else if (state === 'ERROR') {
                  clearInterval(interval);
                  alert("An error occured installing " + value + ".");
                  window.location.hash = '/tri-am-group';
                }//End if (state === 'ERROR')
              });
            }, 1000);
          }, 10000);
        });
      }

      $('.\\#exit-btn').click(function(){
        clearInterval(interval);
        TVRO.reload();
      });  

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

    $('.\\#directv-view')
    .find('.\\#cityDropdown')
    .click(function() {
      window.location.hash = '/cities-119';
    })
    .end()

    $('.\\#cities-119-view .\\#back-btn').click(function() { window.location.hash = '/directv'; });

    var nextBtn = $('.\\#next-btn', jQ).click(function() {
      var interval;

      var option = self.getValue();
      if (!option) alert('You must select an option to continue.');

      else if (option === singleOption)
        TVRO.setAutoswitchService({
          enable: 'N',
          service: 'DIRECTV',
          satellite_group: '101W'
        }).then(function() {
          document.body.className = '/spinner';

          setTimeout(function() {
            interval = setInterval(function() {
              TVRO.getAntState().then(function(state) {
                $('.\\#ant_status').text("The TV-Hub is Installing the satellite. Status: " + state);
                if ((state === 'SEARCHING') || (state === 'TRACKING')) {
                  clearInterval(interval);
                  window.location = '/wizard/activation.php';
                }else if (state === 'ERROR') {
                  clearInterval(interval);
                  alert("An error occured installing 101W.");
                  window.location.hash = '/directv';
                }//End if (state === 'ERROR')
              });          
            }, 1000);
          }, 10000);
        });

      else if (option === manualOption){          
        TVRO.setAutoswitchService({
          enable: 'N',
          service: 'DIRECTV',
          satellite_group: group
        }).then(function() {
          document.body.className = '/spinner';
          setTimeout(function() {
            interval = setInterval(function() {
              TVRO.getAntState().then(function(state) {
                $('.\\#ant_status').text("The TV-Hub is Installing the group. Status: " + state);
                if ((state === 'SEARCHING') || (state === 'TRACKING')) {
                  clearInterval(interval);
                  window.location = '/wizard/activation.php';
                }else if (state === 'ERROR') {
                  clearInterval(interval);
                  alert("An error occured installing " + group + ".");
                  window.location.hash = '/directv';
                }//End if (state === 'ERROR')
              });          
            }, 1000);
          }, 10000);
        });

      }else if (option === automaticOption)
        TVRO.setAutoswitchService({
          enable: 'Y',
          service: 'DIRECTV',
          satellite_group: group
        }).then(function() {
          document.body.className = '/spinner';

          setTimeout(function() {
            interval = setInterval(function() {
              TVRO.getAntState().then(function(state) {
                $('.\\#ant_status').text("The TV-Hub is Installing the group. Status: " + state);
                if ((state === 'SEARCHING') || (state === 'TRACKING')) {
                  clearInterval(interval);
                  window.location = '/wizard/autoswitch.php#/directv';
                } else if (state === 'ERROR') {
                  clearInterval(interval);
                  alert("An error occured installing " + group + ".");
                  window.location.hash = '/directv';
                }//End if (state === 'ERROR')
              });          
            }, 1000);
          }, 10000);
        });

      $('.\\#exit-btn').click(function(){
        clearInterval(interval);
        TVRO.reload();
      });  
    });

    var prevBtn = $('.\\#prev-btn', jQ).click(function() {
      TVRO.getLnbName().then(function(name) {
        var isTriAmericas = name === 'Tri-Americas Circular';
        if (isTriAmericas) window.location.hash = '/tri-am-group';
        else window.location = '/wizard/service.php';
      });
    });

    return _.merge(self, {
      reload: function() {
        // We grap the lnb to handle when a TRI AM LNB is set.
        // We grap the installed group since we installed the group for TRI AM
        // LNB in the previous step.
        Promise.all(
          TVRO.getInstalledGroup(),
          TVRO.getLnbName()
        ).then(function(res) {
          var isTriAmericas = res[1] === 'Tri-Americas Circular';

          if (isTriAmericas) {
            group = res[0].name;
            self.setValues([manualOption, automaticOption]);

          } else {
            group = 'DIRECTV DUAL';
            self.setValues([singleOption, manualOption, automaticOption]);
          }

          self.onBuild(function(row, option) {
            $('.\\#title', row).text(option.title);
            $('.\\#copy', row).text(option.copy);
          }).build();
        });
      }
    });    
  };

  var DishNetworkView = function(jQ) {
    var self = $('.\\#dish-network-view', jQ);

    var onClick = function(value) {
      if (value === 'OTHER') {
        satsView.toggle();
        groupsView.toggle();        
      }
    };

    var groupsView = $('.\\#groups-view', jQ).show();
    var groupsTableView= TVRO.TableView($('.\\#table-view', groupsView))
    .onClick(onClick)
    .onBuild(function(row, value) {
      if (value === 'WESTERN ARC') $('.\\#value', row).text('Western Arc (110\u00B0W, 119\u00B0W, 129\u00B0W)');
      if (value === 'EASTERN ARC') $('.\\#value', row).text('Eastern Arc (61\u00B0W, 72\u00B0W, 77\u00B0W)');
      if (value === 'LEGACY EAST ARC') $('.\\#value', row).text('Legacy East Arc (61\u00B0W, 110\u00B0W, 119\u00B0W)');
      if (value === '72W') $('.\\#value', row).text('72W (72\u00B0W)');
      if (value === 'DISH 500') $('.\\#value', row).text('Dish 500 (110\u00B0W, 119\u00B0W)');
      if (value === 'OTHER') $('.\\#value', row).text('Other');
    });

    var satsView = $('.\\#sats-view', jQ).hide();
    var satsTableView = TVRO.TableView($('.\\#table-view', satsView))
    .onClick(onClick)
    .onBuild(function(row, value) {
      if (value === '61W') $('.\\#value', row).text('61\u00B0W');
      if (value === '72W') $('.\\#value', row).text('72\u00B0W');
      if (value === '77WM') $('.\\#value', row).text('77\u00B0W');
      if (value === '110W') $('.\\#value', row).text('110\u00B0W');
      if (value === '119W') $('.\\#value', row).text('119\u00B0W');
      if (value === '129W') $('.\\#value', row).text('129\u00B0W');
    });

    var nextBtn = $('.\\#next-btn', jQ).click(function() {
      var isGroup = groupsView.is(':visible');
      var value = isGroup ? groupsTableView.getValue() : satsTableView.getValue();

      // Handles the case where other was selected and next is clicked.
      if (value === 'OTHER') {
        satsView.show();
        groupsView.hide();        
      }
      
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
          antSatID: value,
          install: 'Y'
        });
      }

      //  whether we installed a group or a single sat
      //  we want to follow up with the same thing
      installPromise.then(function() {
        document.body.className = '/spinner';
        startCheckswitchMode("DISH", isGroup);
      }); //end installPromise
    });

    var prevBtn = $('.\\#prev-btn', jQ).click(function() {
      if (groupsView.is(':visible')) {
        window.location = '/wizard/service.php';
      } else {
        groupsView.show();
        satsView.hide(); 	
      }
    });    
    
    // selects the group and satellite installed on the page.
    // The Sat is done first since if Sat promise is rejected that means there
    // is no Sat or Group installed for DISH, thus not selecting anything. If
    // Sat returns but Group is rejected that means a single DISH Sat is
    // installed so select Other as a group.
    TVRO.getInstalledSat().then(function(sat) {
      satsTableView.setValue(sat.antSatID);
      TVRO.getInstalledGroup().then(function(group) {
          groupsTableView.setValue(group.name);
      }, groupsTableView.setValue('OTHER'));
    });

    return _.merge(self,{
      reload: function() {
        //Need to exclude Groups and Satellites if TV1 or RV1 is installed
        TVRO.getAntModel().then(function(model) {
          if ((model === 'TV1') || (model === 'RV1')) {
            groupsTableView.setValues(['WESTERN ARC',
                                       'LEGACY EAST ARC',
                                       'DISH 500',
                                       'OTHER'
                                       ]).build();

            satsTableView.setValues(['61W',
                                     '110W',
                                     '119W',
                                     '129W'
                                     ]).build();

          } else {
            groupsTableView.setValues(['WESTERN ARC',
                                       'EASTERN ARC',
                                       'LEGACY EAST ARC',
                                       '72W',
                                       'DISH 500',
                                       'OTHER'
                                       ]).build();

            satsTableView.setValues(['61W',
                                     '72W',
                                     '77WM',
                                     '110W',
                                     '119W',
                                     '129W'
                                     ]).build();
          }
        });
      }
    }); 
  };

  function startCheckswitchMode(service, isGroup){
    var intervalID;
    var interval;
    
    var installTypeText = isGroup ? 'group' : 'satellite';
    //  wait 10 seconds to allow antenna to switch
    //  service/groups and avoid false tracking.
    //  every second after, check if state is TRACKING
    //  once state is tracking start checkswitch mode
    setTimeout(function() {
      interval = setInterval(function() {
        TVRO.getAntState().then(function(state) {
          $('.\\#ant_status').text("The TV-Hub is installing the " + installTypeText + ". Status: " + state);
          if (state === 'TRACKING') {
            clearInterval(interval);
            TVRO.setCheckswitchMode(true).then(function() {
              intervalID = window.setInterval(function() {
                TVRO.getCheckswitchStatus().then(function(status) {
                  $('.\\#ant_status').text("The TV-Hub is preparing for Check Switch mode. Status: " + status);
                  if (status === 'IN_PROGRESS') {
                    clearInterval(intervalID);
                    window.location = '/wizard/system.php#/other-system-config';
                  } else if (status === 'FAILED') {
                    clearInterval(intervalID);
                    alert("Check Switch mode has failed.");
                  }
                });
              }, 1000);
            }); //End .then for  setCheckswitchMode   
          } else if (state === 'ERROR') {
            clearInterval(interval);
            alert("An error occured installing " + group + ".");
            window.location.hash = '/dish-network';
          }//End if (state === 'ERROR')
        });          
      }, 1000);
    }, 10000);

    $('.\\#exit-btn').click(function(){
      // If you want to exit out of the install/checkswitch for DISH or BELL
      // Clear the intervals and disable checkswitch mode.
      // If you are DISH you want to reload to dispose of the spinner class
      // and bring you back to the DISH groups else go to the service
      // provider page (BELL).
      clearInterval(intervalID);
      clearInterval(interval);
      TVRO.setCheckswitchMode(false).then(function() {
        if (service === "DISH") TVRO.reload();
        else window.location = '/wizard/service.php';
      });
    });  

  };

  TVRO.ServiceProviderView = ServiceProviderView;
  TVRO.TriAmGroupView = TriAmGroupView;
  TVRO.DirectvView = DirectvView;
  TVRO.DishNetworkView = DishNetworkView;

}(window.TVRO);

$(function() {
  var serviceProviderView = TVRO.ServiceProviderView($('.\\#service-provider-view'));
  var TriAmGroupView = TVRO.TriAmGroupView($('.\\#tri-am-group-view'));
  var directvView = TVRO.DirectvView($('.\\#directv-view'));
  var dishNetworkView = TVRO.DishNetworkView($('.\\#dish-network-view'));

  TVRO.onHashChange(function(hash) {
    document.body.className = hash;
    if (hash === '/directv') directvView.reload();
    else if (hash === '/dish-network') dishNetworkView.reload();
  });

  TVRO.reload();
});

