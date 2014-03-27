!function(TVRO){
  "use strict";

  var GroupEditView = function(jQ) {
    var
    GroupEditView,
    satTableView,
    slotToEdit,
    group;

    $('.\\#save-btn', jQ).click(function() {
      var nu = {name: $('.\\#group-name', jQ).val()};

      _.forEach(['a', 'b', 'c', 'd'], function(slot) {
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

  TVRO.GroupEditView = GroupEditView;

}(window.TVRO);