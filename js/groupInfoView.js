"use strict";

(function(tvro){

	var groupInfoView = function(jQ) {
		var
		groupInfoView,
		groupEditView,
		satInfoView,
		group;

		_.forEach(['a', 'b', 'c', 'd'], function(slot) {
			$('.\\#sat-'+slot+'-view', jQ)
			.find('.\\#install-btn')
			.click(function() {
				tvro.data.setInstalledSat(group[slot]).then(function() {
					tvro.hash();
				});
			})
			.end()
			.find('.\\#info-btn')
			.click(function() {
				if (satInfoView) satInfoView.sat(group[slot]);
			});
		});

		$(':not(.\\#sat-view) .\\#install-btn', jQ).click(function() {
			tvro.data.setInstalledGroup(group).then(function() {
				tvro.hash();
			});
		});

		$('.\\#edit-btn', jQ).click(function() {
			if (groupEditView) groupEditView.group(group);
		});

		$('.\\#delete-btn', jQ).click(function() {
			tvro.data.removeGroup(group).then(function() {
				tvro.hash();
			});
		});

		return groupInfoView = {
			group: function(arg) {
				if (!arguments.length) {
					return group;
				} else {
					group = arg;
					$('.\\#group-name', jQ).text(group.name || 'N/A');

					_.forEach(['a', 'b', 'c', 'd'], function(slot) {
						$('.\\#sat-'+slot+'-view', jQ)
						.find('.\\#sat-name')
						.text(group[slot] ? group[slot].name : 'N/A')
						.end()
						.find('.\\#info-btn')
						.toggle(!_.isUndefined(group[slot]));
					});

					// xponderVHInfoCtrl.xponder(_.find(sat.xponders, {display:'Vertical High'}));
					// xponderVLInfoCtrl.xponder(_.find(sat.xponders, {display:'Vertical Low'}));
					// xponderHHInfoCtrl.xponder(_.find(sat.xponders, {display:'Horizontal High'}));
					// xponderHLInfoCtrl.xponder(_.find(sat.xponders, {display:'Horizontal Low'}));
					
					tvro.data.getInstalledGroup().then(function(insGroup) {
						$(jQ).toggleClass('$ins', group.name === insGroup.name);
					});
					return groupInfoView;
				}
			},
			groupEditView: function(arg) {
				if (!arguments.length) {
					return groupEditView;
				} else {
					groupEditView = arg;
					return groupInfoView;
				}
			},
			satInfoView: function(arg) {
				if (!arguments.length) {
					return satInfoView;
				} else {
					satInfoView = arg;
					return groupInfoView;
				}
			}
		}
	}

	tvro.groupInfoView = groupInfoView;

}(window.tvro));
//	??? invalid left hand assign ???
// }(window.tvro || window.tvro = {}));