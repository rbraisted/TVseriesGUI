!function(TVRO){
  "use strict";

  var SatView = function(jQ) {
    var self;
    var sat;

    var installBtn = $('.\\#install-btn', jQ).click(function() {
      var installed = jQ.hasClass('$installed');
      var confirmed = installed ? false : confirm('Are you sure you want to install ' + sat.name + ' - ' + TVRO.formatLongitude(sat.lon, 0) + '?');
      if (confirmed) 
        TVRO.setInstalledSat(sat);
    });

    return self = {
      setSat: function(arg) {
        sat = arg;
        jQ.toggleClass('$n/a', _.isUndefined(sat));
        $('.\\#sat-name', jQ).text(sat ?  sat.name + ' - ' + TVRO.formatLongitude(sat.lon, 0)  : 'N/A');

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

    //  install sat
    var satAView = SatView($('.\\#sat-a-view', jQ));
    var satBView = SatView($('.\\#sat-b-view', jQ));
    var satCView = SatView($('.\\#sat-c-view', jQ));
    var satDView = SatView($('.\\#sat-d-view', jQ));

    //  install group
    var installBtn = $(':not(.\\#sat-view) .\\#install-btn', jQ).click(function() {
      var installed = jQ.hasClass('$installed');
      //  if !installed, ask for confirmation
      var confirmed = installed ? false : confirm('Are you sure you want to install ' + group.name + '?');
      if (confirmed) TVRO.setInstalledGroup(group);
    });

    var deleteBtn = $('.\\#delete-btn', jQ).click(function() {
      //  if !predefined, ask for confirmation
      var confirmed = group.predefined ? false : confirm('Are you sure you want to delete ' + group.name + '?');
      if (confirmed) TVRO.removeGroup(group).then(TVRO.reload);
    });

    return self = {
      setGroup: function(arg) {
        TVRO.getGroups().then(function(groups) {
          group = _.find(groups, { name: arg.name });
          $('.\\#group-name', jQ).text(group.name);
          jQ.toggleClass('$predefined', group.predefined);
          satAView.setSat(group.satA);
          satBView.setSat(group.satB);
          satCView.setSat(group.satC);
          satDView.setSat(group.satD);
        }).then(TVRO.getInstalledGroup).then(function(installedGroup) {
          if (installedGroup) jQ.toggleClass('$installed', installedGroup.name === group.name);
          else jQ.removeClass('$installed');
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
