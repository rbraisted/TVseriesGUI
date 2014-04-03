$(function() {

  var headerView = TVRO.HeaderView($('.\\#header-view'));

  setInterval(function() {
    headerView.reload();
  }, 3000);

  var installedSatView = TVRO.InstalledSatView($('.\\#installed-sat-view')).reload();

  // setInterval(function() {
  //   //  force the webservice to recache antenna_status
  //   TVRO.getAntennaStatus({}, 1)
  //     .then(installedSatView.reload);
  // }, 3000);

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
      console.log('groupTableView.getValue()');
      console.log(groupTableView.getValue());
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
          var group  = encode(groupTableView.getValue().name);
          window.location.hash = '/groups/' + group + '/edit';
        })
        .end()
  ).setRegion('All');

  var groupEditView = TVRO.GroupEditView(
    $('.\\#group-edit-view')
      .find('.\\#back-btn')
        .click(function() {
          var group = encode(groupEditView.getGroup() ? '/' + groupEditView.getGroup().name : '');
          window.location.hash = '/groups' + group;
        })
        .end()
      .find('.\\#sat-view')
        .click(function() {
          var group = encode(groupEditView.getGroup() ? groupEditView.getGroup().name : 'new');
          window.location.hash = '/groups/' + group + '/edit/sats';
        })
        .end()
  )
  .satTableView(groupSatTableView);

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
      window.location.hash = '/groups/new';
    });

//  routing
////////////////////////////////////////////////////////////////////////////////

  TVRO.onHashChange(function(hash) {
    headerView.reload();

    //  regex - to check
    //  class - to set document.body
    //  function - to call
    //  order them deepest first

    var split = _.rest(hash.split('/'));

    var routes = [{
        r: /\/regions\/.*\/.*\/edit/,
        c: '/regions/region/sat/edit',
        f: function() {
          satModeBtn.setOn(true);
          regionTableView.setValue(decode(split[1]));
          singleSatTableView.setRegion(regionTableView.getValue());
          singleSatTableView.reload();
          satEditView.setSat({ antSatID: decode(split[2]) });
        }
      }, {
        r: /\/regions\/.*\/.*/,
        c: '/regions/region/sat',
        f: function() {
          satModeBtn.setOn(true);
          regionTableView.setValue(decode(split[1]));
          singleSatTableView.setRegion(regionTableView.getValue());
          singleSatTableView.reload();
          satInfoView.setSat({ antSatID: decode(split[2]) });
        }
      }, {
        r: /\/regions\/.*/,
        c: '/regions/region',
        f: function() {
          satModeBtn.setOn(true);
          regionTableView.setValue(decode(split[1]));
          singleSatTableView.setRegion(regionTableView.getValue());
          singleSatTableView.reload();
        }
      }, {
        r: /\/regions/,
        c: '/regions',
        f: function() {
          satModeBtn.setOn(true);
          if (!regionTableView.getValue()) regionTableView.setValue('All');
          singleSatTableView.setRegion(regionTableView.getValue());
          singleSatTableView.reload();
        }
      }, {
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
          satInfoView.sat({ antSatID: decode(split[4]) });
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
          groupEditView.setGroup({name:''});
          if (groupTableView.getValue()) {
            groupInfoView.setGroup(groupTableView.getValue());
          } else {
            TVRO.getInstalledGroup().then(function(installedGroup) {
              groupInfoView.setGroup(installedGroup);
            });
          }
        }
      }, {
        r: /\/groups\/.*/,
        c: '/groups/group',
        f: function() {
          satModeBtn.setOn(false);
          groupTableView.reload();
          groupTableView.setValue({ name: decode(split[1]) });
          groupInfoView.setGroup(groupTableView.getValue());
        }
      }, {
        r: /\/groups/,
        c: '/groups',
        f: function() {
          satModeBtn.setOn(false);
          groupTableView.reload();
          console.log(groupTableView.getValue());
          if (groupTableView.getValue()) {
            groupInfoView.setGroup(groupTableView.getValue());
          } else {
            TVRO.getInstalledGroup().then(function(installedGroup) {
              groupInfoView.setGroup(installedGroup);
            });
          }
        }
      }, {
        r: /^$/,
        c: '',
        f: function() {
          TVRO.getInstalledGroup().then(function(group) {
            //  figure out if we're single mode or not
            //  and then set the mode switch to the right state
            if (!group || group.getSats().length === 1) window.location.hash = '/regions';
            else window.location.hash = '/groups';
          });
        }
      }
    ];

    _.forEach(routes, function(route) {
      if (route.r.exec(hash)) {
        route.f();
        document.body.className = route.c;
        return false;
      }
    });
  });

  TVRO.reload();
});