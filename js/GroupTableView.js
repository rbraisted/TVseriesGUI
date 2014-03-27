!function(TVRO) {
  "use strict";

	var GroupTableView = function(jQ) {
		var self;

    var tableView = TVRO.TableView($('.\\#table-view', jQ))
  		.onBuild(function(row, group) {
  			$('.\\#group-name', row).text(group.name);

        TVRO.getInstalledGroup().then(function(installedGroup) {
          row.toggleClass('$installed', group.name === installedGroup.name);
        });

        $('.\\#install-btn', row).click(function(event) {
          var installed = row.hasClass('$installed');

          //  if !installed, ask for confirmation
          var confirmed = installed ? false : confirm('Are you sure you want to install ' + group.name + '?');
          if (confirmed) TVRO.setInstalledGroup(group).then(TVRO.reload);
          else event.stopPropagation(); // prevent rows from being selected
        });
  		});

    var reload = function() {
      TVRO.getGroups().then(function(groups) {
        tableView.setValues(groups).build();
      });
    };

		return self = _.merge(tableView, {
      reload: reload
		});
	};

	TVRO.GroupTableView = GroupTableView;

}(window.TVRO);