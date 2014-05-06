$(function() {

  var headerView = TVRO.HeaderView($('.\\#header-view'));

  var installedSatView = TVRO.InstalledSatView($('.\\#installed-sat-view')).reload();

  setInterval(function() {
    headerView.reload();
    installedSatView.reload();
  }, 3000);


  //  views shared between single/group mode

  var satModeBtn = TVRO.ToggleBtn($('.\\#sat-mode-btn'))
    .onClick(function(isSingle) {
      if (isSingle) window.location.hash = '/regions';
      else window.location.hash = '/groups';
    });

  var satEditView = TVRO.SatEditView(
    $('.\\#sat-edit-view')
      .find('.\\#back-btn')
        .click(function() {
          window.location.hash = window.location.hash.substr(0, window.location.hash.lastIndexOf('/'));
        })
        .end()
  );

  var satInfoView = TVRO.SatInfoView(
    $('.\\#sat-info-view')
      .find('.\\#back-btn')
        .click(function() {
          window.location.hash = window.location.hash.substr(0, window.location.hash.lastIndexOf('/'));
        })
        .end()
      .find('.\\#edit-btn')
        .click(function() {
          window.location.hash = window.location.hash + '/edit';
        })
        .end()
  );

//  single views 
////////////////////////////////////////////////////////////////////////////////

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
      .find('.\\#info-btn')
        .click(function() {
          var region = encode(singleSatTableView.getRegion());
          var index = $('.\\#single-sat-table-view .\\#info-btn').index(this);
          var sat = encode(singleSatTableView.getValues()[index].antSatID);
          window.location.hash = '/regions/' + region + '/' + sat;
        })
        .end()
  );

//  group views
////////////////////////////////////////////////////////////////////////////////

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
      .find('.\\#info-btn')
        .click(function(event) {
          event.stopPropagation();
          var index = $('.\\#group-sat-table-view .\\#info-btn').index(this);
          var sat = encode(groupSatTableView.getValues()[index].antSatID);
          var group = window.location.hash.split('/')[2];
          var slot = window.location.hash.slice(-1);
          window.location.hash = '/groups/' + group + '/edit/' + slot + '/' + sat;
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
      .find('.\\#info-btn')
        .click(function() {
          var btn = $(this);
          var group = groupInfoView.getGroup();
          var sat;
          //  if a sat isn't available, we shouldn't see the #info-btn anyway
          if (btn.is('.\\#sat-a-view .\\#info-btn')) sat = encode(group.satA.antSatID);
          else if (btn.is('.\\#sat-b-view .\\#info-btn')) sat = encode(group.satB.antSatID);
          else if (btn.is('.\\#sat-c-view .\\#info-btn')) sat = encode(group.satC.antSatID);
          else if (btn.is('.\\#sat-d-view .\\#info-btn')) sat = encode(group.satD.antSatID);
          window.location.hash = '/groups/' + encode(group.name) + '/' + sat;
        })
        .end()
  );

  var createGroupBtn = $('.\\#new-btn', '.sidebar')
    .click(function() {
      window.location.hash = '/groups/new/edit';
    });

//  routing
////////////////////////////////////////////////////////////////////////////////

  TVRO.onHashChange(function(hash) {
    headerView.reload();

    var split = _.rest(hash.split('/'));
    var className = '';

    //  single mode - regions
    if (hash.match(/\/regions/)) {
      satModeBtn.setOn(true);
      className = '/regions';

      //  /regions/RegionName
      if (split.length > 1) {
        regionTableView.setValue(decode(split[1]));
        className += '/region';
      }

      singleSatTableView.setRegion(regionTableView.getValue());
      singleSatTableView.reload();

      //  /regions/RegionName/AntSatId
      if (split.length > 2) {
        satInfoView.setSat({ antSatID: decode(split[2]) });
        className += '/sat';
      }

      //  /regions/RegionName/AntSatId/edit
      if (split.length > 3) {
        satEditView.setSat({ antSatID: decode(split[2]) });
        className += '/edit';
      }


    //  group mode
    } else if (hash.match(/\/groups/)) {
      satModeBtn.setOn(false);
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
        if (split[2] === 'edit') {
          if (group.name === 'new') groupEditView.createNew();
          else groupEditView.setGroup(group);
          className += '/edit';
   
          //  /groups/GroupName/edit/Slot (A, B, C, D)
          if (split.length > 3) {
            groupSatTableView.reload();
            className += '/sats';
          }

          //  /groups/GroupName/edit/Slot/AntSatId
          if (split.length > 4) {
            sat = { antSatID: decode(split[4]) };
            satInfoView.setSat(sat);
            className += '/sat';
          }

          //  /groups/GroupName/edit/Slot/AntSatId/edit
          if (split.length > 5) {
            satEditView.setSat(sat);
            className += '/edit';
          }

        //  /groups/GroupName/AntSatId
        } else {
          sat = { antSatID: decode(split[2]) };
          className += '/sat';

          //  /groups/GroupName/AntSatId/edit
          if (split.length > 3) {
            satEditView.setSat(sat);
            className += '/edit';
          } else {
            satInfoView.setSat(sat);
          }
        }       
      }


    //  when we first come to the page and the user
    //  hasn't chosen a route that is in group or single mode
    //  find out if they have a group or a single sat installed
    //  and redirect
    } else {
      TVRO.getGroupMode().then(function(groupMode) {
        if (groupMode) window.location.hash = '/groups';
        else window.location.hash = '/regions';
      });
    }

    document.body.className = className;
  });

  TVRO.reload();
});