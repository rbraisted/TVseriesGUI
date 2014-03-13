"use strict";

$(function() {
	var insSatView = tvro.insSatView($('.\\#ins-sat-view')).update(3000);

	var modeToggleBtn = tvro.toggleBtn('.\\#mode-toggle-btn')
	.click(function(isSingle) {
		if (isSingle) tvro.hash('/regions');
		else tvro.hash('/groups');
		tvro.hash();
	});

	var satEditView = tvro.satEditView(
		$('.\\#sat-edit-view')
		.find('.\\#back-btn')
		.click(function() {
			$(document.body).setClass({
				'/regions/region/sat/edit': '/regions/region/sat',
				'/groups/group/sat/edit': '/groups/group/sat',
				'/groups/group/edit/sats/sat/edit': '/groups/group/edit/sats/sat'
			}[$(document.body).attr('class')]);
			tvro.hash({
				'/regions/region/sat': '/regions/'+encodeURIComponent(regionTable.val())+'/'+encodeURIComponent(satEditView.sat().name),
				'/groups/group/sat': '/groups/'+encodeURIComponent(groupTable.group().name)+'/'+encodeURIComponent(satEditView.sat().name),
				'/groups/group/edit/sats/sat': '/groups/'+encodeURIComponent(groupTable.group().name)+'/edit/sats'+'/'+encodeURIComponent(satEditView.sat().name)
			}[$(document.body).attr('class')]);
		})
		.end()
	);

	var satInfoView = tvro.satInfoView(
		$('.\\#sat-info-view')
		.find('.\\#back-btn')
		.click(function() {
			$(document.body).setClass({
				'/regions/region/sat': '/regions/region',
				'/groups/group/sat': '/groups/group',
				'/groups/group/edit/sats/sat': '/groups/group/edit/sats'
			}[$(document.body).attr('class')]);
			tvro.hash({
				'/regions/region': '/regions/'+encodeURIComponent(regionTable.val()),
				'/groups/group': '/groups/'+encodeURIComponent(groupTable.group().name),
				'/groups/group/edit/sats': '/groups/'+encodeURIComponent(groupTable.group().name)+'/edit/sats'
			}[$(document.body).attr('class')]);
		})
		.end()
		.find('.\\#edit-btn')
		.click(function() {
			$(document.body).setClass({
				'/regions/region/sat': '/regions/region/sat/edit',
				'/groups/group/sat': '/groups/group/sat/edit',
				'/groups/group/edit/sats/sat': '/groups/group/edit/sats/sat/edit'
			}[$(document.body).attr('class')]);
			tvro.hash({
				'/regions/region/sat/edit': '/regions/'+encodeURIComponent(regionTable.val())+'/'+encodeURIComponent(satInfoView.sat().name)+'/edit',
				'/groups/group/sat/edit': '/groups/'+encodeURIComponent(groupTable.group().name)+'/'+encodeURIComponent(satInfoView.sat().name)+'/edit',
				'/groups/group/edit/sats/sat/edit': '/groups/'+encodeURIComponent(groupTable.group().name)+'/edit/sats/'+encodeURIComponent(satInfoView.sat().name)+'/edit'
			}[$(document.body).attr('class')]);
		})
		.end()
	)
	.satEditView(satEditView);

//	single views
////////////////////////////////////////////////////////////////////////////////

	var regions = [
		'Africa',
		'Asia',
		'Australia',
		'Central/South America',
		'Europe',
		'North America',
		'All'
	];

	var regionTable = tvro.table($('.\\#region-table-view'))
	.vals(regions)
	.click(function(row, val) {
		singleSatTable.region(val);
		$(document.body).setClass('/regions/region');
		tvro.hash('/regions/'+encodeURIComponent(val));
	})
	.build(function(row, val) {
		$('.\\#region-name', row).text(val);
	})
	.build()
	.val('All');

	var singleSatTable = tvro.satTable(
		$('.\\#single-sat-table-view')
		.find('.\\#back-btn')
		.click(function() {
			$(document.body).setClass('/regions');
			tvro.hash('/regions');
		})
		.end()
		.find('.\\#info-btn')
		.click(function() {
			$(document.body).setClass('/regions/region/sat');
			//	hacky
			setTimeout(function() {
				tvro.hash('/regions/'+encodeURIComponent(regionTable.val())+'/'+satInfoView.sat().antSatID);
			}, 100);
		})
		.end()
	)
	.satInfoView(satInfoView)
	.region('All');


//	group views
////////////////////////////////////////////////////////////////////////////////

	var groupTable = tvro.groupTable($('.\\#group-table-view'))
	.click(function(row, group) {
		groupInfoView.group(group);
		$(document.body).setClass('/groups/group');
		tvro.hash('/groups/'+encodeURIComponent(group.name));
	});

	var groupSatTableView = tvro.satTable(
		$('.\\#group-sat-table-view')
		.find('.\\#back-btn')
		.click(function() {
			$(document.body).setClass('/groups/group/edit');
			tvro.hash('/groups/'+encodeURIComponent(groupEditView.group().name)+'/edit');
		})
		.end()
		.find('.\\#table-row')
		.click(function() {
			$(document.body).setClass('/groups/group/edit');
			tvro.hash('/groups/'+encodeURIComponent(groupEditView.group().name)+'/edit');
		})
		.end()
		.find('.\\#info-btn')
		.click(function() {
			$(document.body).setClass('/groups/group/edit/sats/sat');
			tvro.hash('/groups/'+encodeURIComponent(groupEditView.group().name)+'/edit/sats');
		})
		.end()
	)
	.satInfoView(satInfoView)
	.region('All');

	var groupEditView = tvro.groupEditView(
		$('.\\#group-edit-view')
		.find('.\\#back-btn')
		.click(function() {
			$(document.body).setClass('/groups/group');
			tvro.hash('/groups/'+encodeURIComponent(groupEditView.group().name));
		})
		.end()
		.find('.\\#sat-view')
		.click(function() {
			$(document.body).setClass('/groups/group/edit/sats');
			tvro.hash('/groups/'+encodeURIComponent(groupEditView.group().name)+'/edit/sats');
		})
		.end()
	)
	.satTableView(groupSatTableView);

	var groupInfoView = tvro.groupInfoView(
		$('.\\#group-info-view')
		.find('.\\#back-btn')
		.click(function() {
			$(document.body).setClass('/groups');
			tvro.hash('/groups/');
		})
		.end()
		.find('.\\#edit-btn')
		.click(function() {
			$(document.body).setClass('/groups/group/edit');
			tvro.hash('/groups/'+encodeURIComponent(groupInfoView.group().name)+'/edit');
		})
		.end()
		.find('.\\#info-btn')
		.click(function() {
			$(document.body).setClass('/groups/group/sat');
			//	hacky
			setTimeout(function() {
				tvro.hash('/groups/'+encodeURIComponent(groupInfoView.group().name)+'/'+satInfoView.sat().antSatID);
			}, 100);
		})
		.end()
	)
	.groupEditView(groupEditView)
	.satInfoView(satInfoView);


//	routing
////////////////////////////////////////////////////////////////////////////////

	tvro.hash(function(hash) {
		var route = _.rest(hash.split('/'));
		//	single mode
		if (route.length && route[0] === 'regions') {
			modeToggleBtn.on(true);

			//	/regions
			if (route.length === 1) {
				regionTable.val(decodeURIComponent(route[1]));
				singleSatTable.region(regionTable.val());
				$(document.body).setClass('/regions');

			//	/regions/North%20America
			} else if (route.length === 2) {
				regionTable.click(decodeURIComponent(route[1]));

			//	/regions/North%20America/99W
			} else if (route.length === 3) {
				regionTable.val(decodeURIComponent(route[1]));
				singleSatTable.region(regionTable.val());
				tvro.data.getSats().then(function(sats) {
					satInfoView.sat(_.find(sats, {antSatID:route[2]}));
					$(document.body).setClass('/regions/region/sat');
				});

			//	/regions/North%20America/99W/edit
			} else if (route.length === 4) {
				regionTable.val(decodeURIComponent(route[1]));
				singleSatTable.region(regionTable.val());
				tvro.data.getSats().then(function(sats) {
					satInfoView.sat(_.find(sats, {antSatID:route[2]}));
					satEditView.sat(satInfoView.sat());
					$(document.body).setClass('/regions/region/sat/edit');
				});
			}

		//	group mode
		} else if (route.length && route[0] === 'groups') {
			modeToggleBtn.on(false);

			//	/groups
			if (route.length === 1) {
				if (!groupTable.group()) {
					tvro.data.getGroups().then(function() {
						tvro.data.getInstalledGroup().then(function(group) {
							groupInfoView.group(group);
							$(document.body).setClass('/groups');
						});
					});					
				} else {
					groupInfoView.group(groupTable.group());
					$(document.body).setClass('/groups');					
				}

			//	/groups/EASTERN%20ARC
			} else if (route.length === 2) {
				tvro.data.getGroups().then(function(groups) {
					groupTable.click({name:decodeURIComponent(route[1])});
				});
			} else if (route.length === 3) {
				//	/groups/EASTERN%20ARC/edit
				if (route[2] === 'edit') {
					tvro.data.getGroups().then(function(groups) {
						var group = _.find(groups, {name:decodeURIComponent(route[1])});
						console.log(group);
						groupTable.val({name:group.name});
						groupInfoView.group(group);
						groupEditView.group(group);
						$(document.body).setClass('/groups/group/edit');
					});

				//	/groups/EASTERN%20ARC/99W
				} else {
					tvro.data.getGroups().then(function(groups) {
						groupTable.val({name:decodeURIComponent(route[1])});
						groupInfoView.group(groupTable.val());
					});
					tvro.data.getSats().then(function(sats) {
						satInfoView.sat({antSatID:decodeURIComponent(route[2])});
						$(document.body).setClass('/groups/group/sat');
					});
				}
			} else if (route.length === 4) {
				//	/groups/EASTERN%20ARC/edit/sats
				if (route[3] === 'sats') {
					tvro.data.getGroups().then(function(groups) {
						groupTable.val({name:decodeURIComponent(route[1])});
						groupInfoView.group(groupTable.val());
						groupEditView.group(groupInfoView.group());
						$(document.body).setClass('/groups/group/edit/sats');
					});

				//	/groups/EASTERN%20ARC/99W/edit
				} else {
					$(document.body).setClass('/groups/group/sat/edit');
				}

			//	/groups/EASTERN%20ARC/edit/sats/99W
			} else if (route.length === 5) {
				$(document.body).setClass('/groups/group/edit/sats/sat');

			//	/groups/EASTERN%20ARC/edit/sats/99W/edit
			} else if (route.length === 6) {
				$(document.body).setClass('/groups/group/edit/sats/sat/edit');
			}
		//	no route
		} else {
			tvro.data.getInstalledGroup()
			.then(function(group) {
				//	figure out if we're single mode or not
				//	and then set the mode switch to the right state
				modeToggleBtn.click(group.sats().length === 1);
			});
		}
	});

	tvro.hash();
});