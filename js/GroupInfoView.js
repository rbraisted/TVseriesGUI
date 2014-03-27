!function(TVRO){
  "use strict";
  
  var GroupInfoView = function(jQ) {
    var self;

    var group;
    var satAjQ = $('.\\#sat-a-view');
    var satBjQ = $('.\\#sat-b-view');
    var satCjQ = $('.\\#sat-c-view');
    var satDjQ = $('.\\#sat-d-view');


    //  install sat
    _.forEach(['a', 'b', 'c', 'd'], function(slot) {
      $('.\\#sat-'+slot+'-view', jQ)
      .find('.\\#install-btn')
      .click(function() {
        if (confirm('Are you sure you want to install '+group[slot].name+'?')) {
          TVRO.data.setInstalledSat(group[slot]).then(function() {
            TVRO.hash();
          });
        }
      })
      .end()
    });

    //  install group
    $(':not(.\\#sat-view) .\\#install-btn', jQ).click(function() {
      if (confirm('Are you sure you want to install '+group.name+'?')) {
        TVRO.data.setInstalledGroup(group).then(function() {
          TVRO.hash();
        });
      }
    });

    //  delete group
    $('.\\#delete-btn', jQ).click(function() {
      if (confirm('Are you sure you want to delete '+group.name+'?')) {
        TVRO.data.removeGroup(group).then(function() {
          TVRO.hash();
        });       
      }
    });

    var reload = function() {
      $('.\\#group-name', jQ).text(group.name);
      jQ.toggleClass('$pre', group.predefined);

      satAjQ.toggleClass('$n/a', _.isUndefined(group.satA))
        .find('.\\#sat-name').text(group.satA ? group.satA.name : 'N/A');

      satBjQ.toggleClass('$n/a', _.isUndefined(group.satB))
        .find('.\\#sat-name').text(group.satB ? group.satB.name : 'N/A');

      satCjQ.toggleClass('$n/a', _.isUndefined(group.satC))
        .find('.\\#sat-name').text(group.satC ? group.satC.name : 'N/A');

      satDjQ.toggleClass('$n/a', _.isUndefined(group.satD))
        .find('.\\#sat-name').text(group.satD ? group.satD.name : 'N/A');
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

      // group: function(arg) {
      //   if (!arguments.length) {
      //     return group;
      //   } else {
      //     //  here
      //     //  we set .$ins, .$pre on jQ
      //     //  we set .$ins, .$n/a on #sat-view
      //     group = arg;
      //     $('.\\#group-name', jQ).text(group.name);
      //     $(jQ).toggleClass('$pre', group.predefined);

      //     //  get installed group + sat
      //     //  rework this so that i don't depend on getInstalled*
      //     //  to populate sat views
      //     _.forEach(['a', 'b', 'c', 'd'], function(slot) { // go thru all the slots, sat $ins or $n/a
      //       var sat = group[slot];
      //       $('.\\#sat-'+slot+'-view', jQ)
      //         .toggleClass('$n/a', _.isUndefined(sat)) // set .$n/a is no sat
      //           .find('.\\#sat-name')
      //           .text(sat ? sat.name : 'N/A')
      //     });

      //     TVRO.data.getInstalledGroup().then(function(insGroup) {
      //       $(jQ).toggleClass('$ins', group.name === insGroup.name);
      //       return TVRO.data.getInstalledSat();
      //     }).then(function(insSat) {
      //       _.forEach(['a', 'b', 'c', 'd'], function(slot) {
      //         var sat = group[slot];
      //         if (!_.isUndefined(sat)) {
      //           $('.\\#sat-'+slot+'-view', jQ).toggleClass('$ins', sat.antSatID === insSat.antSatID);
      //         }
      //       });
      //     });

      //     // Promise.all(
      //     //  TVRO.data.getInstalledSat(),
      //     //  TVRO.data.getInstalledGroup()
      //     // ).then(function(r) {
      //     //  var insSat = r[0], insGroup = r[1];
      //     //  $(jQ).toggleClass('$ins', group.name === insGroup.name); // set jQ .$ins


      //     return GroupInfoView;
      //   }
      // }
    }
  }

  TVRO.GroupInfoView = GroupInfoView;

}(window.TVRO);
