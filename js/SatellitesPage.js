$(function() {

  var headerView = TVRO.HeaderView($('.\\#header-view'));

  setInterval(function() {
    headerView.reload();
  }, 3000);

  var installedSatView = TVRO.InstalledSatView($('.\\#installed-sat-view')).reload();

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
          var region = encode(regionTableView.getValue());
          var group = encode(groupTableView.getValue() ? groupTableView.getValue().name : '');
          var sat = encode(satEditView.getSat() ? satEditView.getSat().antSatID : '');
          var paths = {};
          paths['/regions/region/sat/edit'] = '/regions/' + region + '/' + sat;
          paths['/groups/group/sat/edit'] = '/groups/' + group + '/' + sat;
          paths['/groups/group/edit/sats/sat/edit'] = '/groups/' + group + '/edit/sats/' + sat;
          window.location.hash = paths[document.body.className];
        })
        .end()
  );

  var satInfoView = TVRO.SatInfoView(
    $('.\\#sat-info-view')
      .find('.\\#back-btn')
        .click(function() {
          var region = encode(regionTableView.getValue());
          var group = encode(groupTableView.getValue() ? groupTableView.getValue().name : '');
          var paths = {};
          paths['/regions/region/sat'] = '/regions/' + region;
          paths['/groups/group/sat'] = '/groups/' + group;
          paths['/groups/group/edit/sats/sat'] = '/groups/' + group + '/edit/sats';
          window.location.hash = paths[document.body.className];
        })
        .end()
      .find('.\\#edit-btn')
        .click(function() {
          var region = encode(regionTableView.getValue());
          var group = encode(groupTableView.getValue() ? groupTableView.getValue().name : '');
          var sat = encode(satInfoView.getSat() ? satInfoView.getSat().antSatID : '');
          var paths = {};
          paths['/regions/region/sat'] = '/regions/' + region + '/' + sat + '/edit';
          paths['/groups/group/sat'] = '/groups/' + group + '/' + sat + '/edit';
          paths['/groups/group/edit/sats/sat'] = '/groups/' + group + '/edit/sats/' + sat + '/edit';
          window.location.hash = paths[document.body.className];
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
          var group = encode(groupTableView.getValue() ? groupTableView.getValue().name : '');
          window.location.hash = '/groups/' + group + '/edit';
        })
        .end()
      .find('.\\#info-btn')
        .click(function(event) {
          event.stopPropagation();
          var index = $('.\\#group-sat-table-view .\\#info-btn').index(this);
          var sat = encode(groupSatTableView.getValues()[index].antSatID);
          var group  = encode(groupTableView.getValue().name);
          window.location.hash = '/groups/' + group + '/edit/sats/'+sat;
        })
        .end()
      .find('.\\#table-row')
        .click(function() {
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
          window.location.hash = '/groups/'+encode(group.name)+'/'+sat;
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
            // var slot = split[3];
            // groupSatTableView.setValue();
            groupSatTableView.reload();
            className += '/sats';
          }

          if (split.length > 4) {
            //  /groups/GroupName/edit/Slot/AntSatId
          }

          if (split.length > 5) {
            //  /groups/GroupName/edit/Slot/AntSatId/edit
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
    } else {
      TVRO.getInstalledGroup().then(function(group) {
        //  redirect to single (regions) or group view
        if (!group || group.getSats().length === 1) 
          window.location.hash = '/regions';
        else window.location.hash = '/groups';
      });
    }

    document.body.className = className;

    var routes = [{
        r: /\/groups\/.*\/edit\/sats\/.*\/edit/,
        c: '/groups/group/edit/sats/sat/edit',
        f: function() {
          satModeBtn.setOn(false);
          groupTableView.reload();
          groupTableView.setValue({ name: decode(split[1]) });
          groupEditView.setGroup(groupTableView.getValue());
          satEditView.sat({ antSatID: decode(split[4]) });
        }
      }, {
        r: /\/groups\/.*\/edit\/sats\/.*/,
        c: '/groups/group/edit/sats/sat',
        f: function() {
          satModeBtn.setOn(false);
          groupTableView.reload();
          groupTableView.setValue({ name: decode(split[1]) });
          groupEditView.setGroup(groupTableView.getValue());
          satInfoView.setSat({ antSatID: decode(split[4]) });
        }
      }, {
        r: /\/groups\/.*\/edit\/sats/,
        c: '/groups/group/edit/sats',
        f: function() {
          satModeBtn.setOn(false);
          groupTableView.reload();
          groupTableView.setValue({ name: decode(split[1]) });
          groupEditView.setGroup(groupTableView.getValue());
          groupSatTableView.reload();
          //  sat table??
        }
      }, {
        r: /\/groups\/.*\/.*\/edit/,
        c: '/groups/group/sat/edit',
        f: function() {
          satModeBtn.setOn(false);
          groupTableView.reload();
          groupTableView.setValue({ name: decode(split[1]) });
          groupInfoView.setGroup(groupTableView.getValue());
          satEditView.setSat({antSatID: decode(split[2])});
        }
      }, {
        r: /\/groups\/.*\/edit/,
        c: '/groups/group/edit',
        f: function() {
          satModeBtn.setOn(false);
          groupTableView.reload();
          groupTableView.setValue({ name: decode(split[1]) });
          groupEditView.setGroup(groupTableView.getValue());
        }
      }, {
        r: /\/groups\/.*\/.*/,
        c: '/groups/group/sat',
        f: function() {
          satModeBtn.setOn(false);
          groupTableView.reload();
          groupTableView.setValue({ name: decode(split[1]) });
          groupInfoView.setGroup(groupTableView.getValue());
          satInfoView.setSat({antSatID: decode(split[2])});
        }
      }, {
        r: /\/groups\/new/,
        c: '/groups/group/edit',
        f: function() {
          satModeBtn.setOn(false);
          groupTableView.reload();
          groupEditView.createNew();
          if (groupTableView.getValue()) {
            groupInfoView.setGroup(groupTableView.getValue());
          } else {
            TVRO.getInstalledGroup().then(function(installedGroup) {
              groupInfoView.setGroup(installedGroup);
            });
          }
        }
      }
    ];

    // _.forEach(routes, function(route) {
    //   if (route.r.exec(hash)) {
    //     route.f();
    //     document.body.className = route.c;
    //     return false;
    //   }
    // });
  });

  TVRO.reload();
});