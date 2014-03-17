"use strict";

(function(tvro){

	var groupEditView = function(jQ) {
		var
		groupEditView,
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
					tvro.data.removeGroup({name:group.name}).then(function() {
						return tvro.data.addGroup(nu);
					}).then(function() {
						tvro.hash();
					});

				// new group
				} else {
					tvro.data.addGroup(nu).then(function() {
						groupEditView.group(nu);
					});
				}
			}
		});

		return groupEditView = {
			group: function(arg) {
				if (!arguments.length) {
					return group;
				} else {
					group = arg;
					$('.\\#group-name', jQ).val(group.name);

					_.forEach(['a', 'b', 'c', 'd'], function(slot) {
						$('.\\#sat-'+slot+'-view', jQ)
						.find('.\\#sat-name')
						.text(group[slot] ? group[slot].name : 'N/A')
						.end()
						.click(function() {
							slotToEdit = slot;
						})
					});

					return groupEditView;
				}
			},
			satTableView: function(arg) {
				if (!arguments.length) {
					return satTableView;
				} else {
					satTableView = arg;
					satTableView.click(function(row, sat) {
						group[slotToEdit] = sat;
						$('.\\#sat-'+slotToEdit+'-view .\\#sat-name', jQ).text(group[slotToEdit] ? group[slotToEdit].name : 'N/A');
					});
					return groupEditView;
				}
			}
		}
	}

	tvro.groupEditView = groupEditView;

}(window.tvro));
//	??? invalid left hand assign ???
// }(window.tvro || window.tvro = {}));