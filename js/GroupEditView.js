!function(TVRO){
  "use strict";

  var SatView = function(jQ) {
    var self;
    var sat;

    return self = {
      setSat: function(arg) {
        sat = arg;
        jQ.toggleClass('$n/a', _.isUndefined(sat));
        $('.\\#sat-name', jQ).text(sat ? sat.name : 'N/A');
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
        console.log("~ 1 ~");
        if (isNew) return;
        console.log("~ 2 ~");
        isNew = true;
        console.log("~ 3 ~");
        group = undefined;
        console.log("~ 4 ~");
        $('.\\#group-name', jQ).val('');
        console.log("~ 5 ~");
        satAView.setSat(undefined);
        console.log("~ 6 ~");
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

  /*
  var GroupEditView = function(jQ) {
    var
    GroupEditView,
    satTableView,
    slotToEdit,
    group;

    $('.\\#save-btn', jQ).click(function() {
      var nu = {name: $('.\\#group-name', jQ).val()};

      _.forEach(['satA', 'satB', 'satC', 'satD'], function(slot) {
        if (group[slot]) nu[slot] = group[slot].antSatID;
      });

      if (!nu.name) {
        return alert('You must give this group a name!');
      }

      if (confirm('Are you sure you want to save '+nu.name+'?')) {
        // editing group
        if (group.name) {
          TVRO.data.removeGroup({name:group.name}).then(function() {
            return TVRO.data.addGroup(nu);
          }).then(function() {
            TVRO.hash();
          });

        // new group
        } else {
          TVRO.data.addGroup(nu).then(function() {
            GroupEditView.group(nu);
          });
        }
      }
    });

    var reload = function() {
      $('.\\#group-name', jQ).val(group.name);

      _.forEach(['a', 'b', 'c', 'd'], function(slot) {
        $('.\\#sat-'+slot+'-view', jQ)
        .find('.\\#sat-name')
        .text(group['sat'+slot.toUpperCase()] ? group['sat'+slot.toUpperCase()].name : 'N/A')
        .end()
        .click(function() {
          slotToEdit = slot;
        })
      });
    };

    return GroupEditView = {
      setGroup: function(arg) {
        TVRO.getGroups().then(function(groups) {
          group = _.find(groups, arg);
          reload();
        });

        return self;
      },

      getGroup: function() {
        return group;
      },

      satTableView: function(arg) {
        if (!arguments.length) {
          return satTableView;
        } else {
          satTableView = arg;
          satTableView.onClick(function(sat) {
            group['sat'+slotToEdit.toUpperCase()] = sat;
            $('.\\#sat-'+slotToEdit+'-view .\\#sat-name', jQ).text(group['sat'+slotToEdit.toUpperCase()] ? group['sat'+slotToEdit.toUpperCase()].name : 'N/A');
          });
          return GroupEditView;
        }
      }
    };
  };
  */
  TVRO.GroupEditView = GroupEditView;

}(window.TVRO);