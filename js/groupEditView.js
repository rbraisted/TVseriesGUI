"use strict";

(function(tvro){

	var groupEditView = function(jQ) {
		var
		groupEditView,
		satTableView,
		slotToEdit,
		group;

		_.forEach(['a', 'b', 'c', 'd'], function(slot) {
			$('.\\#sat-'+slot+'-view', jQ)
			.click(function() {
				if (satTableView && group[slot]) satTableView.val(group[slot]);
			})
			.find('.\\#install-btn')
			.click(function() {
				tvro.data.setInstalledSat(group[slot]).then(function() {
					tvro.hash();
				});
			});
		});

		$(':not(.\\#sat-view) .\\#install-btn', jQ).click(function() {
			tvro.data.setInstalledGroup(group).then(function() {
				tvro.hash();
			});
		});

		return groupEditView = {
			group: function(arg) {
				if (!arguments.length) {
					return group;
				} else {
					group = arg;
					$('.\\#group-name', jQ).val(group.name || 'N/A');

					_.forEach(['a', 'b', 'c', 'd'], function(slot) {
						$('.\\#sat-'+slot+'-view', jQ)
						.find('.\\#sat-name')
						.text(group[slot] ? group[slot].name : 'N/A')
						.end()
						.click(function() {
							slotToEdit = slot;
							//	satTableView sat?
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