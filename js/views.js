"use strict";

(function(tvro) {

var

toggleCtrl = function(jQ) {
	var clickCallbacks = [];

	$(jQ).click(function() {
		$(jQ).toggleClass('is-on');
		_.invoke(clickCallbacks, 'call', null, $(jQ).hasClass('is-on'));
	});

	return {
		click: function(arg) {
			if (_.isFunction(arg)) {
				clickCallbacks.push(arg);
			} else {
				$(jQ).toggleClass('is-on', !arg).click();
			}
		},
		
		//	set isOn without triggering clicks
		value: function(arg) {
			//	get isOn
			if (_.isUndefined(arg)) {
				return $(jQ).hasClass('is-on');
			} else {
				$(jQ).toggleClass('is-on', arg);
				return this;
			}
		}
	}
},



tableCtrl = function(jQ, rowContainerSelector, rowTemplateSelector) {
	var
	rowSelector = rowTemplateSelector,
	//	tableCtrl is to build tables
	//	rowContainer will get emptied on tableCtrl.build(numberOfRowsToBuild)
	rowContainer = $(rowContainerSelector, jQ),
	//	and then rowTemplate is cloned n times
	rowTemplate = $(rowTemplateSelector, jQ).detach(),
	//	and then that clone (row) is passed to buildCallback
	//	which should be like: function(row, data) {}
	//	there you can make your modifications to the row
	//	before it gets appended to rowContainer
	buildCallbacks = [function(row, data) {
		row.click(function() {
			$(rowSelector, jQ).removeClass('is-selected');
			row.addClass('is-selected');
			_.invoke(clickCallbacks, 'call', null, row, data);
		});
	}],

	clickCallbacks = [],
	dataArray = [];

	return {
		data: function(arg) {
			if (_.isUndefined(arg)) {
				return dataArray;
			} else if (_.isArray(arg)) {
				dataArray = arg;
				return this;
			}
		},

		build: function(arg) {
			if (_.isFunction(arg)) {
				buildCallbacks.push(arg);
			} else if (_.isUndefined(arg)) {
				arg = dataArray.length;
			}

			if (_.isNumber(arg)) {
				rowContainer.empty().append(
					_.times(arg, function(i) {
						//	this is ugly, i don't like it
						var row = rowTemplate.clone();
						_.invoke(buildCallbacks, 'call', null, row, dataArray[i]);
						return row;
					})
				);
			}
			return this;
		},

		click: function(arg) {
			if (_.isFunction(arg)) {
				clickCallbacks.push(arg);
			} else if (!_.isUndefined(arg)) {
				var i = _.indexOf(dataArray, arg);
				if (i > -1) $(rowSelector, jQ).eq(i).click();
			}
			return this;
		},

		value: function(arg) {
			if (_.isUndefined(arg)) {
				return dataArray[$(rowSelector, jQ).index('is-selected')];
			} else {
				// if (valueBtn.length) {
				// 	$(radioBtnSelector, jQ)
				// 	.not(valueBtn)
				// 	.removeClass('is-selected');
				// }
				return this;
			}
		}
	}
}

tvro.ctrl = {
	toggleCtrl: toggleCtrl,
	tableCtrl: tableCtrl
}

}(window.tvro = window.tvro || {}));

// (function(tvro) {
// 	console.log(tvro);
// 	var
// 	tableView = function(jQ, rowContainerSelector, rowTemplateSelector) {
// 		var
// 		//	rowContainer will get emptied on table.build(n)
// 		rowContainer = $(rowContainerSelector, jQ),
// 		//	and then rowTemplate is cloned n times
// 		rowTemplate = $(rowTemplateSelector, jQ).detach(),
// 		//	and then rowTemplate is passed as the this value to buildCallback
// 		//	and whatever is returned back is appended to rowContainer
// 		//	so basically you'll use buildCallback to set text and such
// 		//	buildCallback has one argument, i, the row index
// 		buildCallback = function(i){ return this; };

// 		return {
// 			//	if you pass a function, you'll set buildCallback
// 			//	if you pass a number, it will build that many rows
// 			build: function(arg) {
// 				if (typeof arg !== 'function') {
// 					rowContainer.empty();
// 					times(arg, function(i) {
// 						rowContainer.append(buildCallback.call(rowTemplate.clone(), i));
// 					});
// 				} else {
// 					buildCallback = arg;
// 				}
// 				return this;
// 			}
// 		}
// 	},

// 	radioView = function(jQ, radioBtnSelector) {
// 		var
// 		clickCallbacks = [],
// 		//	call to rehook all the click callbacks
// 		//	to the $(radioBtnSelector, jQ)'s
// 		clickCallback = function() {
// 			var value = this.getAttribute('value');
// 			forEach(clickCallbacks, function(callback) {
// 				callback.call(this, value);
// 			});
// 			$(radioBtnSelector, jQ).removeClass('is-selected')
// 			$(this).addClass('is-selected');
// 		},
// 		rehook = function() {
// 			$(radioBtnSelector, jQ).unbind('click', clickCallback).click(clickCallback);
// 		};

// 		rehook();

// 		return {
// 			rehook: function() {
// 				rehook();
// 				return this;
// 			},
// 			//	pass a function to set it as the click callback
// 			//	radioView.click(function(value) { });
// 			//	pass a value to trigger click on the btn for that value
// 			//	radioView.click('North America')
// 			click: function(arg) {
// 				if (typeof arg !== 'function') {
// 					$(radioBtnSelector, jQ).filter('[value='+arg+']').click();
// 				} else {
// 					clickCallbacks.push(arg);
// 				}
// 				return this;
// 			},
// 			//	radioView.value() to get the selected value
// 			//	radioView.value('value') to set the selected value
// 			value: function(value) {
// 				if (value === undefined) {
// 					return $(radioBtnSelector, jQ).filter('.is-selected').attr('value');	
// 				} else {
// 					var valueBtn = $(radioBtnSelector, jQ).filter('[value='+value+']').addClass('is-selected');
// 					if (valueBtn.length) $(radioBtnSelector, jQ).not(valueBtn).removeClass('is-selected');
// 					return this;
// 				}
// 			}
// 		}
// 	},

// 	toggleBtn = function(jQ) {
// 		var clickCallbacks = [];

// 		jQ.click(function() {
// 			jQ.toggleClass('is-on');
// 			forEach(clickCallbacks, function(callback) {
// 				callback.call(jQ, jQ.hasClass('is-on'));
// 			});
// 		});

// 		return {
// 			click: function(arg) {
// 				if (typeof arg !== 'function') {
// 					jQ.toggleClass('is-on', arg);
// 					forEach(clickCallbacks, function(callback) {
// 						callback.call(jQ, jQ.hasClass('is-on'));
// 					});
// 				} else {
// 					clickCallbacks.push(arg);
// 				}
// 				return this;
// 			}
// 		}
// 	},

// 	satellitesTableView = function(jQ, s) {
// 		var
// 		satellites = s,
// 		satelliteViews = [],
// 		satellitesTableView = tableView(jQ, '.\\#satellites-table-row-container', '.\\#satellites-table-row')
// 			.build(function(i) {
// 				satelliteViews.push(satelliteView(this).setSatellite(satellites[i]));
// 				// $(this).attr('value', groups[i].name);
// 				return this;
// 			});

// 		return {
// 			setSatellites: function(s) {
// 				satellites = s;
// 				satellitesTableView.build(satellites.length);
// 				return this;
// 			},
// 			setInstalledSatellite: function(satellite) {
// 				return this;
// 			}
// 		}
// 	},

// 	groupsTableView = function(jQ, g) {
// 		var
// 		groups = g,
// 		groupViews = [],
// 		groupsRadioView = radioView(jQ, '.\\#groups-radio-btn'),
// 		groupsTableView = tableView(jQ, '.\\#groups-table-row-container', '.\\#groups-table-row')
// 			.build(function(i) {
// 				groupViews.push(groupView(this).setGroup(groups[i]));
// 				$(this).attr('value', groups[i].name);
// 				return this;
// 			});

// 		return {
// 			setGroups: function(g) {
// 				groups = g;
// 				groupViews = [];
// 				groupsTableView.build(groups.length);
// 				groupsRadioView.rehook();
// 				return this;
// 			},
// 			setInstalledGroup: function(group) {
// 				for (var i = 0; i < groups.length; i++) {
// 					groupViews[i].setInstalled(groups[i].name === group.name);
// 				}
// 				return this;
// 			},
// 			click: function(arg) {
// 				if (typeof arg !== 'function') {
// 					//	make it so that groupsTableView.click accepts a group
// 					groupsRadioView.click(arg.name);
// 				} else {
// 					//	make it so that the click callbacks
// 					//	return a group instead of just a group name
// 					groupsRadioView.click(function(groupName) {
// 						arg.call(this, find(groups, { name: groupName }));
// 					});
// 				}
// 				return this;
// 			},
// 			value: function(value) {
// 				if (value === undefined) {
// 					return find(groups, { name: groupsRadioView.value() });
// 				} else {
// 					//	allow this call to take a group
// 					groupsRadioView.value(value.name);
// 					return this;
// 				}
// 			}
// 		}
// 	},

// 	satelliteView = function(jQ, s) {
// 		var
// 		satellite = s;

// 		return {
// 			setSatellite: function(s) {
// 				if (s !== undefined) {
// 					satellite = s;
// 					$('.\\#satellite-name', jQ).text(satellite.name);
// 					$('.\\#satellite-region', jQ).text(satellite.region);
// 					$('.\\#satellite-antSatID', jQ).text(satellite.antSatID);
// 					jQ.toggleClass('is-user-defined', satellite.antSatID.indexOf('USER') > -1);
// 				} else {
// 					$('.\\#satellite-name', jQ).text('N/A');
// 					$('.\\#satellite-region', jQ).text('');
// 					$('.\\#satellite-antSatID', jQ).text('');
// 					jQ.removeClass('is-user-defined');
// 				}
// 				$('.\\#satellite-install-btn', jQ).toggle(s !== undefined);
// 				$('.\\#satellite-info-btn', jQ).toggle(s !== undefined);
// 				jQ.removeClass('is-installed');
// 				return this;
// 			},
// 			setInstalled: function(isInstalled) {
// 				jQ.toggleClass('is-installed', isInstalled);
// 				return this;
// 			}
// 		}
// 	},

// 	groupView = function(jQ, g) {
// 		var
// 		group = g,

// 		aView = satelliteView($('.\\#satellite-a-view', jQ)),
// 		bView = satelliteView($('.\\#satellite-b-view', jQ)),
// 		cView = satelliteView($('.\\#satellite-c-view', jQ)),
// 		dView = satelliteView($('.\\#satellite-d-view', jQ)),

// 		installBtn = $('.\\#group-install-btn', jQ)
// 			.click(function() {
// 				if (confirm('Are you sure you want to install '+group.name+'?')) {
// 					models.setInstalledGroup(group);
// 				}
// 			}),

// 		removeBtn = $('.\\#group-remove-btn', jQ)
// 			.click(function() {
// 				if (confirm('Are you sure you want to remove '+group.name+'?')) {
// 					models.removeGroup(group);
// 				}
// 			}),

// 		editBtn = $('.\\#group-edit-btn', jQ)
// 			.click(function() {
// 				//	well not sure what to do here
// 			}),

// 		saveBtn = $('.\\#group-save-btn', jQ)
// 			.click(function() {

// 			}),

// 		cancelBtn = $('.\\#group-cancel-btn', jQ)
// 			.click(function() {
				
// 			});

// 		return {
// 			setGroup: function(g) {
// 				group = g;
// 				$('.\\#group-name', jQ).text(group.name);
// 				aView.setSatellite(group.a).setInstalled(false);
// 				bView.setSatellite(group.b).setInstalled(false);
// 				cView.setSatellite(group.c).setInstalled(false);
// 				dView.setSatellite(group.d).setInstalled(false);
// 				jQ.removeClass('is-installed').toggleClass('is-predefined', group.predefined);
// 				return this;
// 			},
// 			setInstalled: function(isInstalled) {
// 				jQ.toggleClass('is-installed', isInstalled);
// 				return this;
// 			},
// 			setInstalledSatellite: function(satellite) {
// 				if (group.a) aView.setInstalled(group.a.antSatID === satellite.antSatID);
// 				if (group.b) bView.setInstalled(group.b.antSatID === satellite.antSatID);
// 				if (group.c) cView.setInstalled(group.c.antSatID === satellite.antSatID);
// 				if (group.d) dView.setInstalled(group.d.antSatID === satellite.antSatID);
// 				return this;
// 			},
// 			editBtnClick: function(cb) {
// 				editBtn.click(cb);
// 				return this;
// 			},
// 			saveBtnClick: function(cb) {
// 				saveBtn.click(cb);
// 				return this;
// 			},
// 			cancelBtnClick: function(cb) {
// 				cancelBtn.click(cb);
// 				return this;
// 			}
// 		}
// 	},

// 	antennaView = function(jQ) {
// 		return {
// 			setAntenna: function(antenna) {
// 				$('.\\#antenna-model', jQ).text(antenna.model);
// 				$('.\\#antenna-state', jQ).text(antenna.state);
// 				$('.\\#antenna-bars', jQ).text(antenna.bars);
// 				return this;
// 			}
// 		}
// 	}

// 	//	this might not be the best name for this view
// 	//	but it's the view that appears in the home and autoswitch page sidebar
// 	//	and you can pretty much get all the info you need to populate it from
// 	//	webservice.getAntennaStatus
// 	// statusView = function(jQ) {
// 	// 	var
// 	// 	autoswitchToggleBtn = toggleBtn('.\\#autoswitch-toggle-btn')
// 	// 		.click(function(isDisabled) {
// 	// 			webservice.getAutoswitchStatus().then(function(r) {
// 	// 				webservice.setAutoswitchService({
// 	// 					enable: isDisabled ? 'N' : 'Y',
// 	// 					service: $('service', r).text(),
// 	// 					satellite_group: $('satellite_group', r).text()
// 	// 				});
// 	// 			});
// 	// 		}),

// 	// 	//	this groupsTableView should have install btn hook ups
// 	// 	groupsTableViewA = groupsTableView('.\\#manual-groups-table-view'),

// 	// 	//	this groupsTableView should have like nothing basically except names
// 	// 	groupsTableViewB = groupsTableView('.\\#groups-table-view');

// 	// 	return {
// 	// 		setAntenna: function(antenna) {

// 	// 		},
// 	// 		setGroups: function(groups) {

// 	// 		},
// 	// 		setInstalledGroup: function(group) {

// 	// 		},
// 	// 		setInstalledSatellite: function(satellite) {

// 	// 		}
// 	// 	}
// 	// }

// 	tvro.v = {
// 		tableView: tableView,
// 		radioView: radioView,
// 		toggleBtn: toggleBtn,
// 		satellitesTableView: satellitesTableView,
// 		satelliteView: satelliteView,
// 		groupsTableView: groupsTableView,
// 		groupView: groupView
// 	}

// }(window.tvro || (window.tvro = {})));