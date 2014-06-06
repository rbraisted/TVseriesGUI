!function(TVRO){
  "use strict";

  var SatView = function(jQ) {
    var self;
    var sat;

    return self = {
      setSat: function(arg) {
        sat = arg;
        jQ.toggleClass('$n/a', _.isUndefined(sat));
        $('.\\#sat-name', jQ).text(sat ? sat.name + ' - ' + TVRO.formatOrbitalSlot(sat.antSatID) : 'N/A');
        return self;
      },

      getSat: function() {
        return sat;
      }
    };
  };


  var GroupEditView = function(jQ) {
    var self;
    var group;
    var isNew = true;

    var satAView = SatView($('.\\#sat-a-view', jQ));
    var satBView = SatView($('.\\#sat-b-view', jQ));
    var satCView = SatView($('.\\#sat-c-view', jQ));
    var satDView = SatView($('.\\#sat-d-view', jQ));

    var saveBtn = $('.\\#save-btn', jQ).click(function() {
      var groupName = $('.\\#group-name', jQ).val();
      if (!groupName) return alert('You must enter a group name to continue!');

      var confirmed = confirm('Are you sure you want to save ' + groupName + '?');
      if (confirmed) {
        var groupToAdd = {
          name: groupName,
          satA: satAView.getSat(),
          satB: satBView.getSat(),
          satC: satCView.getSat(),
          satD: satDView.getSat()
        };

        if (isNew) TVRO.addGroup(groupToAdd)
          .then(function() {
            window.location.hash = '/groups/' + encode(groupName) + '/edit';
          });

        else TVRO.removeGroup(group)
          .then(TVRO.addGroup(groupToAdd))
          .then(TVRO.reload);
      }
    });

    var closeBtn = $('.\\#back-btn', jQ).click(function() {
      self.createNew();
    });

    return self = {
      createNew: function() {
        if (isNew) return;
        isNew = true;
        group = undefined;
        $('.\\#group-name', jQ).val('');
        satAView.setSat(undefined);
        satBView.setSat(undefined);
        satCView.setSat(undefined);
        satDView.setSat(undefined);
      },

      setGroup: function(arg) {
        if (!isNew) return;
        isNew = false;

        if (group) return;
        TVRO.getGroups().then(function(groups) {
          group = _.find(groups, { name: arg.name });
          $('.\\#group-name', jQ).val(group.name);
          satAView.setSat(group.satA);
          satBView.setSat(group.satB);
          satCView.setSat(group.satC);
          satDView.setSat(group.satD);
        });

        return self;
      },

      getGroup: function() {
        return group;
      },

      setSat: function(slot, sat) {
        if (slot === 'A') satAView.setSat(sat);
        if (slot === 'B') satBView.setSat(sat);
        if (slot === 'C') satCView.setSat(sat);
        if (slot === 'D') satDView.setSat(sat);
      }
    };
  };
  
  TVRO.GroupEditView = GroupEditView;

}(window.TVRO);