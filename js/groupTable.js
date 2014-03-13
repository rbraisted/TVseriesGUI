"use strict";

(function(tvro) {

	var groupTable = function(jQ) {
		var
		groupTable,
		table = tvro.table(jQ)
		.build(function(row, group) {
			$('.\\#group-name', row).text(group.name);

			$('.\\#install-btn', row).click(function() {
				tvro.data.setInstalledGroup(group).then(function() {
					tvro.hash();
				});
			});

			tvro.data.getInstalledGroup().then(function(insGroup) {
				row.toggleClass('$ins', insGroup.name === group.name);
			});
		});

		tvro.data.getGroups().then(function(groups) {
			table.vals(groups).build();
			tvro.data.getInstalledGroup().then(function(group) {
				table.val({name:group.name});
			});
		});

		return groupTable = _.merge(table, {
			groups: table.vals,
			group: table.val
		});
	}

	tvro.groupTable = groupTable;

}(window.tvro = window.tvro || {}));