"use strict";

(function(tvro){

	var groupInfoView = function(jQ) {
		var group, groupInfoView;

		//	install sat
		_.forEach(['a', 'b', 'c', 'd'], function(slot) {
			$('.\\#sat-'+slot+'-view', jQ)
			.find('.\\#install-btn')
			.click(function() {
				if (confirm('Are you sure you want to install '+group[slot].name+'?')) {
					tvro.data.setInstalledSat(group[slot]).then(function() {
						tvro.hash();
					});
				}
			})
			.end()
		});

		//	install group
		$(':not(.\\#sat-view) .\\#install-btn', jQ).click(function() {
			if (confirm('Are you sure you want to install '+group.name+'?')) {
				tvro.data.setInstalledGroup(group).then(function() {
					tvro.hash();
				});
			}
		});

		//	delete group
		$('.\\#delete-btn', jQ).click(function() {
			if (confirm('Are you sure you want to delete '+group.name+'?')) {
				tvro.data.removeGroup(group).then(function() {
					tvro.hash();
				});				
			}
		});

		return groupInfoView = {
			group: function(arg) {
				if (!arguments.length) {
					return group;
				} else {
					//	here
					//	we set .$ins, .$pre on jQ
					//	we set .$ins, .$n/a on #sat-view
					group = arg;
					$('.\\#group-name', jQ).text(group.name);
					$(jQ).toggleClass('$pre', group.predefined);

					//	get installed group + sat
					Promise.all(
						tvro.data.getInstalledSat(),
						tvro.data.getInstalledGroup()
					).then(function(r) {
						var insSat = r[0], insGroup = r[1];
						$(jQ).toggleClass('$ins', group.name === insGroup.name); //	set jQ .$ins

						_.forEach(['a', 'b', 'c', 'd'], function(slot) { //	go thru all the slots, sat $ins or $n/a
							var sat = group[slot], ins = false;
							if (sat) ins = (sat.antSatID === insSat.antSatID) && (group.name === insGroup.name);

							$('.\\#sat-'+slot+'-view', jQ)
							.toggleClass('$ins', ins) // set .$ins if installed & group is also installed
							.toggleClass('$n/a', _.isUndefined(sat)) // set .$n/a is no sat
							.find('.\\#sat-name')
							.text(sat ? sat.name : 'N/A')
							.end()
						});
					});

					return groupInfoView;
				}
			}
		}
	}

	tvro.groupInfoView = groupInfoView;

}(window.tvro));
//	??? invalid left hand assign ???
// }(window.tvro || window.tvro = {}));