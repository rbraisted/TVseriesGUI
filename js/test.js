"use strict";

$(function() {

	//	installed sat view
	var insSatView = tvro.insSatView($('.\\#ins-sat-view')).update(3000);

	var modeToggleBtn = tvro.toggleBtn('.\\#mode-toggle-btn')
		.click(function(isSingle) {
			if (isSingle) window.location.hash = '/regions'
			else window.location.hash = '/groups'
		});

	var satEditDropdown = tvro.dropdown($('.\\#sat-edit-dropdown'));

	var satEditView = tvro.satEditView(
		$('.\\#sat-edit-view')
			.find('.\\#back-btn')
				.click(function() {
					var region, group, sat;
					region = encode(regionTableView.val());
					group = encode(groupTable.val().name);
					sat = encode(satEditView.sat().antSatID);
					window.location.hash = {
						'/regions/region/sat/edit': '/regions/'+region+'/'+sat,
						'/groups/group/sat/edit': '/groups/'+group+'/'+sat,
						'/groups/group/edit/sats/sat/edit': '/groups/'+group+'/edit/sats/'+sat
					}[$(document.body).attr('class')];
				})
				.end()
	)
	.dropdown(satEditDropdown);

	var satInfoView = tvro.satInfoView(
		$('.\\#sat-info-view')
			.find('.\\#back-btn')
				.click(function() {
					var region, group;
					region = encode(regionTableView.val());
					group = encode(groupTable.val().name);
					window.location.hash = {
						'/regions/region/sat': '/regions/'+region,
						'/groups/group/sat': '/groups/'+group,
						'/groups/group/edit/sats/sat': '/groups/'+group+'/edit/sats'
					}[$(document.body).attr('class')];
				})
				.end()
			.find('.\\#edit-btn')
				.click(function() {
					var region, group, sat;
					region = encode(regionTableView.val());
					group = encode(groupTable.val().name);
					sat = encode(satInfoView.sat().antSatID);
					window.location.hash = {
						'/regions/region/sat': '/regions/'+region+'/'+sat+'/edit',
						'/groups/group/sat': '/groups/'+group+'/'+sat+'/edit',
						'/groups/group/edit/sats/sat': '/groups/'+group+'/edit/sats/'+sat+'/edit'
					}[$(document.body).attr('class')];
				})
				.end()
	);

//	single views
////////////////////////////////////////////////////////////////////////////////

	var regionTableView = tvro.table($('.\\#region-table-view'))
		.vals([
			'Africa',
			'Asia',
			'Australia',
			'Central/South America',
			'Europe',
			'North America',
			'All'
		])
		.click(function(row, val) {
			window.location.hash = '/regions/'+encode(val);
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
					window.location.hash = '/regions';
				})
				.end()
			.find('.\\#info-btn')
				.click(function() {
					var sat = encode(singleSatTable.sats()[$('.\\#single-sat-table-view .\\#info-btn').index(this)].antSatID);
					window.location.hash = '/regions/'+encode(singleSatTable.region())+'/'+sat;
				})
				.end()
	);

//	group views
////////////////////////////////////////////////////////////////////////////////

	var groupTable = tvro.groupTable($('.\\#group-table-view'))
	.click(function(row, group) {
		window.location.hash = '/groups/'+encode(group.name);
	});

	var groupSatTableView = tvro.satTable(
		$('.\\#group-sat-table-view')
			.find('.\\#back-btn')
				.click(function() {
					window.location.hash = '/groups/'+encode(groupTable.group().name)+'/edit'
				})
				.end()
			.find('.\\#table-row .\\#info-btn')
				.click(function(e) {
					e.stopPropagation();
					var sat = encode(groupSatTableView.sats()[$('.\\#group-sat-table-view .\\#info-btn').index(this)].antSatID);
					window.location.hash = '/groups/'+encode(groupTable.group().name)+'/edit/sats/'+sat;
				})
				.end()
			.find('.\\#table-row')
				.click(function() {
					window.location.hash = '/groups/'+encode(groupTable.group().name)+'/edit';
				})
				.end()
	);

	var groupEditView = tvro.groupEditView(
		$('.\\#group-edit-view')
			.find('.\\#back-btn')
				.click(function() {
					window.location.hash = '/groups/'+encode(groupEditView.group().name);
				})
				.end()
			.find('.\\#sat-view')
				.click(function() {
					window.location.hash = '/groups/'+encode(groupEditView.group().name)+'/edit/sats';
				})
				.end()
	)
	.satTableView(groupSatTableView);

	var groupInfoView = tvro.groupInfoView(
		$('.\\#group-info-view')
			.find('.\\#back-btn')
				.click(function() {
					$(document.body).setClass('/groups');
					window.location.hash = '/groups';
				})
				.end()
			.find('.\\#edit-btn')
				.click(function() {
					window.location.hash = '/groups/'+encode(groupInfoView.group().name)+'/edit';
				})
				.end()
			.find('.\\#info-btn')
				.click(function() {
					var sat, btn = $(this);
					if (btn.is('.\\#sat-a-view .\\#info-btn')) sat = encode(groupInfoView.group().a.antSatID);
					else if (btn.is('.\\#sat-b-view .\\#info-btn')) sat = encode(groupInfoView.group().b.antSatID);
					else if (btn.is('.\\#sat-c-view .\\#info-btn')) sat = encode(groupInfoView.group().c.antSatID);
					else if (btn.is('.\\#sat-d-view .\\#info-btn')) sat = encode(groupInfoView.group().d.antSatID);
					window.location.hash = '/groups/'+encode(groupInfoView.group().name)+'/'+sat;
				})
				.end()
	);

	$('.\\#new-btn', '.sidebar')
		.click(function() {
			window.location.hash = '/groups/new';
		});


//	routing
////////////////////////////////////////////////////////////////////////////////

	tvro.hash(function(hash) {
		//	regex - to check
		//	class - to set document.body
		//	function - to call
		//	order them deepest first

		var split = _.rest(hash.split('/'));

		var routes = [{
				r: /\/regions\/.*\/.*\/edit/,
				c: '/regions/region/sat/edit',
				f: function() {
					modeToggleBtn.val(true);
					singleSatTable.built().then(function() {
						regionTableView.val(decode(split[1]));
						singleSatTable.region(regionTableView.val());
					});
					satEditView.sat({antSatID:decode(split[2])});
				}
			}, {
				r: /\/regions\/.*\/.*/,
				c: '/regions/region/sat',
				f: function() {
					modeToggleBtn.val(true);
					singleSatTable.built().then(function() {
						regionTableView.val(decode(split[1]));
						singleSatTable.region(regionTableView.val());
					});
					satInfoView.sat({antSatID:decode(split[2])});
				}
			}, {
				r: /\/regions\/.*/,
				c: '/regions/region',
				f: function() {
					modeToggleBtn.val(true);
					singleSatTable.built().then(function() {
						regionTableView.val(decode(split[1]));
						singleSatTable.region(regionTableView.val());
					});
				}
			}, {
				r: /\/regions/,
				c: '/regions',
				f: function() {
					modeToggleBtn.val(true);
					singleSatTable.built().then(function() {
						regionTableView.val(decode(split[1]));
						singleSatTable.region(regionTableView.val());
					});
				}
			}, {
				r: /\/groups\/.*\/edit\/sats\/.*\/edit/,
				c: '/groups/group/edit/sats/sat/edit',
				f: function() {
					modeToggleBtn.val(false);
					groupTable.built().then(function() {
						groupTable.group({name:decode(split[1])});
						groupInfoView.group(groupTable.group());
					});
					satEditView.sat({antSatID: decode(split[4])});
				}
			}, {
				r: /\/groups\/.*\/edit\/sats\/.*/,
				c: '/groups/group/edit/sats/sat',
				f: function() {
					modeToggleBtn.val(false);
					groupTable.built().then(function() {
						groupTable.group({name:decode(split[1])});
						groupInfoView.group(groupTable.group());
					});
					satInfoView.sat({antSatID: decode(split[4])});
				}
			}, {
				r: /\/groups\/.*\/edit\/sats/,
				c: '/groups/group/edit/sats',
				f: function() {
					modeToggleBtn.val(false);
					groupTable.built().then(function() {
						groupTable.group({name:decode(split[1])});
						groupInfoView.group(groupTable.group());
					});
				}
			}, {
				r: /\/groups\/.*\/.*\/edit/,
				c: '/groups/group/sat/edit',
				f: function() {
					modeToggleBtn.val(false);
					groupTable.built().then(function() {
						groupTable.group({name:decode(split[1])});
						groupInfoView.group(groupTable.group());
					});
					satEditView.sat({antSatID: decode(split[2])});
				}
			}, {
				r: /\/groups\/.*\/edit/,
				c: '/groups/group/edit',
				f: function() {
					modeToggleBtn.val(false);
					groupTable.built().then(function() {
						groupTable.group({name:decode(split[1])});
						groupEditView.group(groupTable.group());
					});
				}
			}, {
				r: /\/groups\/.*\/.*/,
				c: '/groups/group/sat',
				f: function() {
					modeToggleBtn.val(false);
					groupTable.built().then(function() {
						groupTable.group({name:decode(split[1])});
						groupInfoView.group(groupTable.group());
					});
					satInfoView.sat({antSatID: decode(split[2])});
				}
			}, {
				r: /\/groups\/new/,
				c: '/groups/group/edit',
				f: function() {
					modeToggleBtn.val(false);
					groupTable.built().then(function() {
						groupEditView.group({name:''});
					});
				}
			}, {
				r: /\/groups\/.*/,
				c: '/groups/group',
				f: function() {
					modeToggleBtn.val(false);
					groupTable.built().then(function() {
						groupTable.group({name:decode(split[1])});
						groupInfoView.group(groupTable.group());
					});
				}
			}, {
				r: /\/groups/,
				c: '/groups',
				f: function() {
					modeToggleBtn.val(false);
					groupTable.built().then(function() {
						groupInfoView.group(groupTable.group());
					});
				}
			}, {
				r: /^$/,
				c: '',
				f: function() {
					tvro.data.getInstalledGroup().then(function(group) {
						//	figure out if we're single mode or not
						//	and then set the mode switch to the right state
						if (group.sats().length === 1) window.location.hash = '/regions';
						else window.location.hash = '/groups';
					});	
				}
			}
		];

		_.forEach(routes, function(route) {
			if (route.r.exec(hash)) {
				route.f();
				$(document.body).setClass(route.c);
				return false;
			}
		});
	});

	tvro.hash();
});