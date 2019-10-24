!function(TVRO) {
  var OptionsView = function(jQ) {

    var singleSat = {
        title: 'Choose a Single Satellite',
        bgimage: 'single-sat.svg'
    };

    var presetGroup = {
        title: 'Choose a Preset Group of Satellites',
        bgimage: 'preset-group.svg'
    };

    var newGroup = {
        title: 'Create a New Group of Satellites',
        bgimage: 'new-group.svg'
    };

    TVRO.getLnbType().then(function(lnbType) {
      if (lnbType === 'linear') {
        presetGroup.title = presetGroup.title + '*';
      }        
      self.build();
    });

    var self = TVRO.TableView($('.\\#table-view', jQ))
    .setValues([singleSat, presetGroup, newGroup])
    .onBuild(function(row, option) {
      $('.\\#title', row).text(option.title);
      $('.\\#image', row).css('background-image', 'url(/images/' + option.bgimage + ')');
    });

    var nextBtn = $('.\\#next-btn', jQ).click(function() {
      var option = self.getValue();
      if (!option) alert('You must select an option to continue.');
      else if (option === singleSat) window.location.hash = '/regions';
      else if (option === presetGroup) window.location.hash = '/groups';
      else if (option === newGroup) window.location.hash = '/groups/new/edit';
    });

    var prevBtn = $('.\\#prev-btn', jQ).click(function() {
      Promise.all(
          TVRO.getService(),
          TVRO.getLnbType(),
          TVRO.getAntModel()
      ).then(function(res) {
        var service = res[0];
        var lnbType = res[1]
        var antModel = res[2]
        if (service === 'OTHER' && lnbType === 'circular') {
          window.location = '/wizard/service.php';
        } else if (antModel === 'RV1') {
          window.location = '/wizard/gps.php#/vessel-location';
        } else {
          window.location = '/wizard/gps.php#/heading-source';
        }
      });      
    });

    return self;
  };

  TVRO.OptionsView = OptionsView;

}(window.TVRO);




$(function() {

  TVRO.getService().then(function(res) {
    TVRO.getAntModel().then(function(model) {
    var service = res; 
        if((model === 'UHD7')  &&  (service === 'DIRECTV' ) ){
           $('.\\#DIRECTVUHDTEXT').text("Select DIRECTV TRI-SAT for DIRECTV HD in North America, or select a single satellite (not common).");        
        }
    });
  });

  var optionsView = TVRO.OptionsView($('.\\#options-view'));
  var circularOptionsView = TVRO.OptionsView($('.\\#circular-options-view'));
  var tv5ManualOptionsView = TVRO.OptionsView($('.\\#tv5-manual-options-view'));

  //  previous btn on single and group view
  var prevBtnClick = function() {
    TVRO.getAntModel().then(function(model) {
    if (window.location.hash === '/regions' || window.location.hash === '/groups') window.location.hash = '';
    else if(window.location.hash.indexOf('#/regions') === 0 && model === 'UHD7') window.location = '/wizard/service.php';
    else window.location.hash = window.location.hash.substr(0, window.location.hash.lastIndexOf('/'));
  });
  };

  var singleViewPrevBtn = $('.\\#single-view .\\#prev-btn').click(prevBtnClick);
  var groupViewPrevBtn =  $('.\\#group-view .\\#prev-btn').click(prevBtnClick);

  var singleViewNextBtn = $('.\\#single-view .\\#next-btn').click(function() {
    TVRO.getInstalledSat().then(function(installedSat) {
      if (!installedSat) {
        alert('You must install a satellite to continue!');
      } else {
        Promise.all(
            TVRO.getService(),
            TVRO.getLnbType()

        ).then(function(res) {
          var service = res[0];
          var lnbType = res[1];
          TVRO.getAntModel().then(function(model) {
         if(model === 'UHD7'){
          if (service === 'OTHER' && lnbType === 'circular') window.location = '/wizard/activation.php';
          else if (service === 'DISH' || service === 'BELL') window.location = '/wizard/checkswitch.php#/config-1';
          else window.location = '/wizard/activation.php';
          }else{
             if (service === 'OTHER' && lnbType === 'circular') window.location = '/wizard/activation.php';
             else window.location = '/wizard/system.php';
          }
                    
         });
        });
      }
    });
  });

  var groupViewNextBtn = $('.\\#group-view .\\#next-btn').click(function() {
    TVRO.getInstalledGroup().then(function(installedGroup) {
      if (!installedGroup) {
        alert('You must install a group to continue!');
      } else {
        Promise.all(
            TVRO.getService(),
            TVRO.getLnbType()
        ).then(function(res) {
          var service = res[0];
          var lnbType = res[1]
          if (service === 'OTHER' && lnbType === 'circular') window.location = '/wizard/activation.php';
          else window.location = '/wizard/system.php';
        });
      }
    });
  });

//single views 


  var regionTableView = TVRO.TableView($('.\\#region-table-view'))
  .setValues([
              'Africa',
              'Asia',
              'Australia',
              'Central/South America',
              'Europe',
              'North America',
              'All'
              ])
              .setValue('All')
              .onClick(function(region) {
                window.location.hash = '/regions/'+encode(region);
              })
              .onBuild(function(row, region) {
                $('.\\#region-name', row).text(region);
              })
              .build();

  var singleSatTableView = TVRO.SatTableView(
      $('.\\#single-sat-table-view')
      .find('.\\#back-btn')
      .click(function() {
        window.location.hash = '/regions';
      })
      .end()
  );

//group views


  var groupTableView = TVRO.GroupTableView($('.\\#group-table-view'))
  .onClick(function(group) {
    window.location.hash = '/groups/' + encode(group.name);
  });

  var groupSatTableView = TVRO.SatTableView(
      $('.\\#group-sat-table-view')
      .find('.\\#back-btn')
      .click(function() {
        var group = window.location.hash.split('/')[2];
        window.location.hash = '/groups/' + group + '/edit';
      })
      .end()
  ).onClick(function(sat) {
    var slot = window.location.hash.slice(-1);
    var group = window.location.hash.split('/')[2];
    groupEditView.setSat(slot, sat);
    window.location.hash = '/groups/' + group + '/edit';
  }).setRegion('All');

  var groupEditView = TVRO.GroupEditView(
      $('.\\#group-edit-view')
      .find('.\\#back-btn')
      .click(function() {
        var group = encode(groupEditView.getGroup() ? groupEditView.getGroup().name : '');
        window.location.hash = '/groups' + (group ? '/' + group : '');
      })
      .end()
      .find('.\\#sat-view')
      .click(function() {
        var group = window.location.hash.split('/')[2];
        var satView = $(this);
        var slot;
        if (satView.is('.\\#sat-a-view')) slot = 'A';
        if (satView.is('.\\#sat-b-view')) slot = 'B';
        if (satView.is('.\\#sat-c-view')) slot = 'C';
        if (satView.is('.\\#sat-d-view')) slot = 'D';
        window.location.hash = '/groups/' + group + '/edit/' + slot;
      })
      .end()
  );

  var groupInfoView = TVRO.GroupInfoView(
      $('.\\#group-info-view')
      .find('.\\#back-btn')
      .click(function() {
        window.location.hash = '/groups';
      })
      .end()
      .find('.\\#edit-btn')
      .click(function() {
        var group = encode(groupInfoView.getGroup().name);
        window.location.hash = '/groups/' + group + '/edit';
      })
      .end()
  );

  var createGroupBtn = $('.\\#group-view .\\#new-btn')
  .click(function() {
    window.location.hash = '/groups/new/edit';
  });

//routing


  TVRO.onHashChange(function(hash) {

    var split = _.rest(hash.split('/'));
    var className = '';

    //  single mode - regions
    if (hash.match(/\/regions/)) {
      className = '/regions';

      //  /regions/RegionName
      if (split.length > 1) {
        regionTableView.setValue(decode(split[1]));
        className += '/region';
      }

      singleSatTableView.setRegion(regionTableView.getValue());
      singleSatTableView.reload();


      //  group mode
    } else if (hash.match(/\/groups/)) {
      className = '/groups';

      var group, sat;

      //  /groups/GROUP_NAME
      if (split.length > 1) {
        group = { name: decode(split[1]) };
        if (group.name !== 'new') groupTableView.setValue(group);
        className += '/group';
      }

      groupTableView.reload();
      if (groupTableView.getValue()) groupInfoView.setGroup(groupTableView.getValue());
      else TVRO.getInstalledGroup().then(groupInfoView.setGroup);

      if (split.length > 2) {
        //  /groups/new/edit
        //  /groups/GroupName/edit
        if (group.name === 'new') groupEditView.createNew();
        else groupEditView.setGroup(group);
        className += '/edit';

        //  /groups/GroupName/edit/Slot (A, B, C, D)
        if (split.length > 3) {
          groupSatTableView.reload();
          className += '/sats';
        }
      }


    } else if (hash.match(/options/)) {
      className = hash;


    } else {
      //  send them to either
      //  optionsView, circularOptionsView, or tv5ManualOptionsView
      Promise.all(
          TVRO.getAntSysIdModel(),
          TVRO.getLnbType()
      ).then(function(res) {
        var sysIdModel = res[0];
        var lnbType = res[1];

        if (lnbType === 'circular') {
          window.location.hash = '/circular-options';
        }else if (sysIdModel === 'TV5SK' || sysIdModel === 'TV6SK' || sysIdModel === 'TV8SK') {
          window.location.hash = '/options';
        }else {
          window.location.hash = '/tv5-manual-options';
        }
      });
    }

    document.body.className = className;
  });

  TVRO.reload();
});