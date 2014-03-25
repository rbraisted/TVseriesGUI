"use strict";

(function(tvro) {

	var groupTable = function(jQ) {
		var
		groupTable,
		table = tvro.table(jQ)
		.build(function(row, group) {
			$('.\\#group-name', row).text(group.name);

			tvro.data.getInstalledGroup().then(function(insGroup) {
        var isInsGroup = insGroup.name === group.name
				row.toggleClass('$ins', isInsGroup);

        if (!isInsGroup) {
          $('.\\#install-btn', row).click(function(e) {
            e.stopPropagation();
            if (confirm('Are you sure you want to install '+group.name+'?')) {
              tvro.data.setInstalledGroup(group).then(function() {
                tvro.hash();
              });
            }
          });
        }
			});
		}),

		//	build the table
		built = tvro.data.getGroups().then(function(groups) {
			table.vals(groups).build();
			return tvro.data.getInstalledGroup();
		}).then(function(group) {
			table.val({name:group.name});
		});

		return groupTable = _.merge(table, {
			groups: table.vals,
			group: table.val,
			built: function() {
				return built;
			}
		});
	}

	tvro.groupTable = groupTable;

}(window.tvro = window.tvro || {}));