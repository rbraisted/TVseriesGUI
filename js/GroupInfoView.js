!function(TVRO){
  "use strict";

  var SatView = function(jQ) {
    var self;
    var sat;

    var installBtn = $('.\\#install-btn', jQ).click(function() {
      var confirmed = confirm('Are you sure you want to install ' + group.name + '?');
      if (confirmed) TVRO.setInstalledGroup(group).then(TVRO.reload);
    });

    return self = {
      setSat: function(arg) {
        sat = arg;
        jQ.toggleClass('$n/a', _.isUndefined(sat));
        $('.\\#sat-name', jQ).text(sat ? sat.name : 'N/A');

        TVRO.getInstalledSat().then(function(installedSat) {
          jQ.toggleClass('$installed', installedSat.antSatID === sat.antSatID);
        });

        return self;
      },

      getSat: function() {
        return sat;
      }
    };
  };



  var GroupInfoView = function(jQ) {
    var self;
    var group;

    var installSat = function(sat) {
      var confirmed = confirm('Are you sure you want to install ' + sat.name + '?');
      if (confirmed) TVRO.setInstalledSat(sat).then(TVRO.reload);
    };

    //  install sat
    var satAView = SatView($('.\\#sat-a-view'));
    var satBView = SatView($('.\\#sat-b-view'));
    var satCView = SatView($('.\\#sat-c-view'));
    var satDView = SatView($('.\\#sat-d-view'));

    //  install group
    var installBtn = $(':not(.\\#sat-view) .\\#install-btn', jQ).click(function() {
      var confirmed = confirm('Are you sure you want to install ' + group.name + '?');
      if (confirmed) TVRO.setInstalledGroup(group).then(TVRO.reload);
    });

    var deleteBtn = $('.\\#delete-btn', jQ).click(function() {
      var confirmed = confirm('Are you sure you want to delete ' + group.name + '?');
      if (confirmed) TVRO.removeGroup(group).then(TVRO.reload);
    });

    var reload = function() {
      $('.\\#group-name', jQ).text(group.name);
      jQ.toggleClass('$predefined', group.predefined);

      satAView.setSat(group.satA);
      satBView.setSat(group.satB);
      satCView.setSat(group.satC);
      satDView.setSat(group.satD);

      TVRO.getInstalledGroup().then(function(installedGroup) {
        var groupInstalled = installedGroup.name === group.name;
        jQ.toggleClass('$installed', groupInstalled);
      });
    };

    return self = {
      setGroup: function(arg) {
        TVRO.getGroups().then(function(groups) {
          group = _.find(groups, arg);
          reload();
        });
        return self;
      },

      getGroup: function() {
        return group;
      }
    };
  };

  TVRO.GroupInfoView = GroupInfoView;

}(window.TVRO);
