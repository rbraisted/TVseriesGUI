!function(TVRO) {
  var singleOption = {
    
  };

  
  var OptionsView = function() {
    // var self = $.apply($, arguments),
    //   radio = TVRO.Radio(self);

    // $('[id ~= next-btn ]', self).click(function() {
    //   var selectedValue = radio.selectedValue();
    //   if (!selectedValue) alert('You must select an option to continue.');
    //   else if (selectedValue === 'SINGLE') $(document.body).setClass('at-single-menu-view');
    //   else if (selectedValue === 'PRESET') $(document.body).setClass('at-group-menu-view');
    //   else if (selectedValue === 'NEW') $(document.body).setClass('at-group-edit-view');
    // });

    // $('[id ~= prev-btn ]', self).click(function() {
    //   if (self.is(optionsView)) window.location = '';
    //   else if (self.is(circularOptionsView)) window.location = '';
    //   else if (self.is(tv5ManualOptionsView)) window.location = '';
    // });

    // return $.extend({}, self, {});
  };

}(window.TVRO);

$(function() {

  var satEditView = TVRO.SatEditView(
    $('.\\#sat-edit-view')
      .find('.\\#back-btn')
        .click(function() {
          window.location.hash = window.location.hash.substr(0, window.location.hash.lastIndexOf('/'));
        })
        .end()
  );

  var satInfoView = TVRO.SatInfoView(
    $('.\\#sat-info-view')
      .find('.\\#back-btn')
        .click(function() {
          window.location.hash = window.location.hash.substr(0, window.location.hash.lastIndexOf('/'));
        })
        .end()
      .find('.\\#edit-btn')
        .click(function() {
          window.location.hash = window.location.hash + '/edit';
        })
        .end()
  );

//  single views 
////////////////////////////////////////////////////////////////////////////////

  var regionTableView = TVRO.TableView($('.\\#region-table-view'))
    .setValues([
      'Africa',
      'Asia',
      'Australia',
      'Central/South America',
      'Europe',
      'North America',
      'All'
    ])
    .setValue('All')
    .onClick(function(region) {
      window.location.hash = '/regions/'+encode(region);
    })
    .onBuild(function(row, region) {
      $('.\\#region-name', row).text(region);
    })
    .build();

  var singleSatTableView = TVRO.SatTableView(
    $('.\\#single-sat-table-view')
      .find('.\\#back-btn')
        .click(function() {
          window.location.hash = '/regions';
        })
        .end()
      .find('.\\#info-btn')
        .click(function() {
          var region = encode(singleSatTableView.getRegion());
          var index = $('.\\#single-sat-table-view .\\#info-btn').index(this);
          var sat = encode(singleSatTableView.getValues()[index].antSatID);
          window.location.hash = '/regions/' + region + '/' + sat;
        })
        .end()
  );

//  group views
////////////////////////////////////////////////////////////////////////////////

  var groupTableView = TVRO.GroupTableView($('.\\#group-table-view'))
    .onClick(function(group) {
      window.location.hash = '/groups/' + encode(group.name);
    });

  var groupSatTableView = TVRO.SatTableView(
    $('.\\#group-sat-table-view')
      .find('.\\#back-btn')
        .click(function() {
          var group = window.location.hash.split('/')[2];
          window.location.hash = '/groups/' + group + '/edit';
        })
        .end()
      .find('.\\#info-btn')
        .click(function(event) {
          event.stopPropagation();
          var index = $('.\\#group-sat-table-view .\\#info-btn').index(this);
          var sat = encode(groupSatTableView.getValues()[index].antSatID);
          var group = window.location.hash.split('/')[2];
          var slot = window.location.hash.slice(-1);
          window.location.hash = '/groups/' + group + '/edit/' + slot + '/' + sat;
        })
        .end()
  ).onClick(function(sat) {
    var slot = window.location.hash.slice(-1);
    var group = window.location.hash.split('/')[2];
    groupEditView.setSat(slot, sat);
    window.location.hash = '/groups/' + group + '/edit';
  }).setRegion('All');

  var groupEditView = TVRO.GroupEditView(
    $('.\\#group-edit-view')
      .find('.\\#back-btn')
        .click(function() {
          var group = encode(groupEditView.getGroup() ? groupEditView.getGroup().name : '');
          window.location.hash = '/groups' + (group ? '/' + group : '');
        })
        .end()
      .find('.\\#sat-view')
        .click(function() {
          var group = window.location.hash.split('/')[2];
          var satView = $(this);
          var slot;
          if (satView.is('.\\#sat-a-view')) slot = 'A';
          if (satView.is('.\\#sat-b-view')) slot = 'B';
          if (satView.is('.\\#sat-c-view')) slot = 'C';
          if (satView.is('.\\#sat-d-view')) slot = 'D';
          window.location.hash = '/groups/' + group + '/edit/' + slot;
        })
        .end()
  );

  var groupInfoView = TVRO.GroupInfoView(
    $('.\\#group-info-view')
      .find('.\\#back-btn')
        .click(function() {
          window.location.hash = '/groups';
        })
        .end()
      .find('.\\#edit-btn')
        .click(function() {
          var group = encode(groupInfoView.getGroup().name);
          window.location.hash = '/groups/' + group + '/edit';
        })
        .end()
      .find('.\\#info-btn')
        .click(function() {
          var btn = $(this);
          var group = groupInfoView.getGroup();
          var sat;
          //  if a sat isn't available, we shouldn't see the #info-btn anyway
          if (btn.is('.\\#sat-a-view .\\#info-btn')) sat = encode(group.satA.antSatID);
          else if (btn.is('.\\#sat-b-view .\\#info-btn')) sat = encode(group.satB.antSatID);
          else if (btn.is('.\\#sat-c-view .\\#info-btn')) sat = encode(group.satC.antSatID);
          else if (btn.is('.\\#sat-d-view .\\#info-btn')) sat = encode(group.satD.antSatID);
          window.location.hash = '/groups/' + encode(group.name) + '/' + sat;
        })
        .end()
  );

  var createGroupBtn = $('.\\#new-btn', '.sidebar')
    .click(function() {
      window.location.hash = '/groups/new/edit';
    });

//  routing
////////////////////////////////////////////////////////////////////////////////

  TVRO.onHashChange(function(hash) {

    var split = _.rest(hash.split('/'));
    var className = '';

    //  single mode - regions
    if (hash.match(/\/regions/)) {
      className = '/regions';

      //  /regions/RegionName
      if (split.length > 1) {
        regionTableView.setValue(decode(split[1]));
        className += '/region';
      }

      singleSatTableView.setRegion(regionTableView.getValue());
      singleSatTableView.reload();

      //  /regions/RegionName/AntSatId
      if (split.length > 2) {
        satInfoView.setSat({ antSatID: decode(split[2]) });
        className += '/sat';
      }

      //  /regions/RegionName/AntSatId/edit
      if (split.length > 3) {
        satEditView.setSat({ antSatID: decode(split[2]) });
        className += '/edit';
      }


    //  group mode
    } else if (hash.match(/\/groups/)) {
      className = '/groups';

      var group, sat;

      //  /groups/GROUP_NAME
      if (split.length > 1) {
        group = { name: decode(split[1]) };
        if (group.name !== 'new') groupTableView.setValue(group);
        className += '/group';
      }

      groupTableView.reload();
      if (groupTableView.getValue()) groupInfoView.setGroup(groupTableView.getValue());
      else TVRO.getInstalledGroup().then(groupInfoView.setGroup);

      if (split.length > 2) {
        //  /groups/new/edit
        //  /groups/GroupName/edit
        if (split[2] === 'edit') {
          if (group.name === 'new') groupEditView.createNew();
          else groupEditView.setGroup(group);
          className += '/edit';
   
          //  /groups/GroupName/edit/Slot (A, B, C, D)
          if (split.length > 3) {
            groupSatTableView.reload();
            className += '/sats';
          }

          //  /groups/GroupName/edit/Slot/AntSatId
          if (split.length > 4) {
            sat = { antSatID: decode(split[4]) };
            satInfoView.setSat(sat);
            className += '/sat';
          }

          //  /groups/GroupName/edit/Slot/AntSatId/edit
          if (split.length > 5) {
            satEditView.setSat(sat);
            className += '/edit';
          }

        //  /groups/GroupName/AntSatId
        } else {
          sat = { antSatID: decode(split[2]) };
          className += '/sat';

          //  /groups/GroupName/AntSatId/edit
          if (split.length > 3) {
            satEditView.setSat(sat);
            className += '/edit';
          } else {
            satInfoView.setSat(sat);
          }
        }       
      }

    //  when we first come to the page and the user
    //  hasn't chosen a route that is in group or single mode
    //  find out if they have a group or a single sat installed
    //  and redirect
    } else {
      //  send them to either
      //  optionsView, circularOptionsView, or tv5ManualOptionsView
      className = '/options';
    }

    document.body.className = className;
  });

  TVRO.reload();
});

/*
"use strict";

TVRO.SatellitesPage = function() {
	var
	webService = TVRO.WebService(),

	service = '',
	enable = '',
	satellites = [],
	selectedSatellite = {},
	groups = [],
	selectedGroup = {},

	TableView = function() {
		var
		self = $.apply($, arguments),
		radio = TVRO.Radio('[id ~= satellites-table ]', self),
		table = TVRO.Table('[id ~= satellites-table ]', self),
		filter,
		filtered = [],
		sort,
		sorted = [],
		refresh = function() {
			filtered = $(satellites).filter(filter).toArray();
			sorted = filtered.slice().sort(sort);

			table.build(sorted.length);
			radio.refresh();
		};

		radio.click(function(i) {
			groupEditView.setSatellite(sorted[i]);
			$(document.body).setClass('at-group-edit-view');
		});

		table.build(function(i, row) {
			var satellite = sorted[i],
				favoriteBtn = TVRO.Toggle('[id ~= favorite-btn ]', row);

			row.attr('value', i);
			$('[id ~= name ]', row).text(satellite.name);
			$('[id ~= region ]', row).text(satellite.region);
			$('[id ~= orbital-slot ]', row).text(satellite.antSatID);

			$('[id ~= select-btn ]', row).click(function() {
				event.stopPropagation();
				if (confirm('Select '+satellite.name+'?')) {
					$('[id ~= table-row ]', table).removeClass('is-selected');
					$(row).addClass('is-selected');
					selectedSatellite = satellite;
					webService.request('select_satellite', {
						antSatID: satellite.antSatID
					});	
				}
			});

			$('[id ~= info-btn ]', row).click(function() {
				event.stopPropagation();
				infoView.loadSatellite(satellite);
			});

			favoriteBtn.setOn(satellite.favorite === 'TRUE');
			favoriteBtn.click(function(isFavorite) {
				event.stopPropagation();
				webService.request('set_satellite_identity', {
					listID: satellite.listID,
					antSatID: satellite.antSatID,
					favorite: (isFavorite ? 'TRUE' : 'FALSE')
				});
			});

			if (satellite.antSatID === selectedSatellite.antSatID) row.addClass('is-selected');
		});

		$('[id ~= back-btn ]', self).click(function() {
			$(document.body).setClass('at-single-menu-view');
		});

		$('[id ~= cancel-btn ]', self).click(function() {
			$(document.body).setClass('at-group-edit-view');
		});

		$('[id ~= sort-btn ]', self).click(function() {
			var sortBtn = $(this),
				sortOrder = 0,
				sortProperty = '';

			if (sortBtn.hasClass('is-descending')) sortOrder = 1;
			else sortOrder = -1;

			$('[id ~= sort-btn ]', self).removeClass('is-ascending is-descending');
			if (sortOrder === 1) sortBtn.addClass('is-ascending');
			else sortBtn.addClass('is-descending');

			if (sortBtn.hasId('name-btn')) sortProperty = 'name';
			else if (sortBtn.hasId('orbital-slot-btn')) sortProperty = 'lon';
			else if (sortBtn.hasId('region-btn')) sortProperty = 'region';
			else if (sortBtn.hasId('favorites-btn')) sortProperty = 'favorite';

			sort = function(a, b) {
				if (a[sortProperty] > b[sortProperty]) return -1 * sortOrder;
				else if (a[sortProperty] < b[sortProperty]) return 1 * sortOrder;
				return 0;
			}

			refresh();
		});

		return $.extend({}, self, {
			refresh: refresh,
			loadRegion: function(region) {
				if (region === 'All') filter = function() { return true; }
				else filter = function() { return this.region === region; }
				refresh();
			}
		});
	},

	optionsView,
	circularOptionsView,
	tv5ManualOptionsView,
	OptionsView = function() {
		var self = $.apply($, arguments),
			radio = TVRO.Radio(self);

		$('[id ~= next-btn ]', self).click(function() {
			var selectedValue = radio.selectedValue();
			if (!selectedValue) alert('You must select an option to continue.');
			else if (selectedValue === 'SINGLE') $(document.body).setClass('at-single-menu-view');
			else if (selectedValue === 'PRESET') $(document.body).setClass('at-group-menu-view');
			else if (selectedValue === 'NEW') $(document.body).setClass('at-group-edit-view');
		});

		$('[id ~= prev-btn ]', self).click(function() {
			if (self.is(optionsView)) window.location = '';
			else if (self.is(circularOptionsView)) window.location = '';
			else if (self.is(tv5ManualOptionsView)) window.location = '';
		});

		return $.extend({}, self, {});
	},

	singleView,
	SingleView = function() {
		var self = $.apply($, arguments),
			radio = TVRO.Radio('#radio', self),
			table = TableView(self);

		radio.click(function(region) {
			table.loadRegion(region);
			$(document.body).setClass('at-single-main-view');
		});

		$('[id ~= next-btn ]', self).click(function() {
			
		});

		$('[id ~= prev-btn ]', self).click(function() {
			$(document.body).setClass('at-options-view');
		});

		return $.extend({}, self, {
			refresh: function() {
				if (!radio.selectedValue()) {
					table.loadRegion('All');
					radio.setSelectedValue('All');
				}
				table.refresh();
			}
		});
	},

	groupView,
	GroupView = function() {
		var
		self = $.apply($, arguments),
		radio = TVRO.Radio('#radio', self),
		table = TVRO.Table(radio),
		group,
		loadGroup = function() {
			var slots = ['a', 'b', 'c', 'd'];
			group = arguments[0];

			$('[id ~= install-btn ]', self).toggle(group.name !== selectedGroup.name);

			$('[id ~= slot-view ]', self).removeClass('is-selected');
			$(slots).each(function() {
				var satellite = group['satellite'+this.toUpperCase()],
					slotView = $('[id ~= slot-'+this+'-view ]', self);

				$('[id ~= name ]', slotView).text(satellite.name || 'N/A');
				$('[id ~= region ]', slotView).text(satellite.region);
			});

			if (group.name === selectedGroup.name) {
				$(slots).each(function() {
					if (group['satellite'+this.toUpperCase()].antSatID === selectedSatellite.antSatID) {
						$('[id ~= slot-'+this+'-view').addClass('is-selected');
					}
				});
			}
		};

		radio.click(function(i) {
			loadGroup(groups[i]);
			$(document.body).setClass('at-group-main-view');
		});

		table.build(function(i, row) {
			row.attr('value', i);
			row.toggleClass('is-installed', groups[i].name === selectedGroup.name);

			$('[id ~= name ]', row).text(groups[i].name);

			$('[id ~= select-btn ]', row).click(function() {
				event.stopPropagation();
				if (confirm('Install '+groups[i].name+'?')) {
					webService.request('set_autoswitch_service', {
						enable: enable,
						service: service,
						satellite_group: groups[i].name
					}, function() {
						$('[id ~= table-row ]', table).removeClass('is-installed');
						row.addClass('is-installed');
						selectedGroup = groups[i];
						if (group !== groups[i]) {
							$('[id ~= slot-view ]', self).removeClass('is-selected');
						}
					});
				}
			});
		});

		$('[id ~= install-btn ]', self).click(function() {
			if (confirm('Install '+group.name+'?')) {
				webService.request('set_autoswitch_service', {
					enable: enable,
					service: service,
					satellite_group: group.name
				}, function() {
					$('[id ~= table-row ]', table)
						.removeClass('is-installed')
						.eq(groups.indexOf(group))
						.addClass('is-installed');
					selectedGroup = group;
					loadGroup(group);
				});
			}
		});

		$('[id ~= new-btn ]', self).click(function() {
			var group = TVRO.Group();
			group.predefined = 'N';
			groupEditView.loadGroup(group);
			$(document.body).setClass('at-group-edit-view');
		});

		$('[id ~= back-btn ]', self).click(function() {
			$(document.body).setClass('at-group-menu-view');
		});

		$('[id ~= next-btn ]', self).click(function() {

		});

		$('[id ~= prev-btn ]', self).click(function() {
			$(document.body).setClass('at-options-view');
		});

		return $.extend({}, self, {
			refresh: function() {
				table.build(groups.length);
				radio.refresh();
				if (!group) {
					radio.setSelectedValue(groups.indexOf(selectedGroup));
					this.loadGroup(selectedGroup);
				}
			},
			loadGroup: loadGroup
		});
	},

	groupEditView,
	GroupEditView = function() {
		var
		self = $.apply($, arguments),
		group = {},
		slotABtn = $('[id ~= slot-a-btn ]', self).click(function() { slot = 'A'; }),
		slotBBtn = $('[id ~= slot-b-btn ]', self).click(function() { slot = 'B'; }),
		slotCBtn = $('[id ~= slot-c-btn ]', self).click(function() { slot = 'C'; }),
		slotDBtn = $('[id ~= slot-d-btn ]', self).click(function() { slot = 'D'; }),
		slot,
		table = TableView('#group-sats-view');

		$('[id ~= slot-btn ]', self).click(function() {
			table.loadRegion('All');
			$(document.body).setClass('at-group-sats-view');
		});

		$('[id ~= cancel-btn ]', self).click(function() {
			$(document.body).setClass('at-group-menu-view');
		});

		$('[id ~= save-btn ]', self).click(function() {
			var groupName = $('[id ~= name ]', self).val(),
				addGroup = function() {
					webService.request('set_satellite_group', {
						command: 'ADD',
						group_name: groupName,
						A: group.satelliteA.antSatID,
						B: group.satelliteB.antSatID,
						C: group.satelliteC.antSatID,
						D: group.satelliteD.antSatID
					}, function() {
						groups.push(group);
						group.name = groupName;
						groupView.loadGroup(group);
						groupView.refresh();
					});
				};

			if (confirm('Save '+groupName+'?')) {
				//	check if this is a new group
				if (groups.indexOf(group) === -1) {
					addGroup();
				} else {
					webService.request('set_satellite_group', {
						command: 'DELETE',
						group_name: group.name
					}, function() {
						groups.splice(groups.indexOf(group), 1);
						addGroup();
					});
				}

				$(document.body).setClass('at-group-main-view');
			}
		});

		return $.extend({}, self, {
			loadGroup: function() {
				group = arguments[0];
				$('[id ~= name ]', self).val(group.name);
				$('[id ~= name ]', slotABtn).text(group.satelliteA ? group.satelliteA.name : '');
				$('[id ~= name ]', slotBBtn).text(group.satelliteB ? group.satelliteB.name : '');
				$('[id ~= name ]', slotCBtn).text(group.satelliteC ? group.satelliteC.name : '');
				$('[id ~= name ]', slotDBtn).text(group.satelliteD ? group.satelliteD.name : '');
			},
			setSatellite: function() {
				group['satellite'+slot] = arguments[0];
				this.loadGroup(group);
			}
		});
	};

	return {
		init: function() {
			optionsView = OptionsView('#options-view');
			circularOptionsView = OptionsView('#circular-options-view');
			tv5ManualOptionsView = OptionsView('#tv5-manual-options-view');
			singleView = SingleView('#single-view');
			groupView = GroupView('#group-view');
			groupEditView = GroupEditView('#group-edit-view');

			webService.request('get_satellite_groups', function(response) {
				$('group', response).each(function() {
					groups.push(TVRO.Group(this));
				});

				webService.request('get_autoswitch_status', function(response) {
					var name = $('satellite_group', response).text(),
						slot = $('master sat', response).text();

					service = $('service', response).text();
					enable = $('enable:eq(0)', response).text();

					$(groups).each(function() {
						if (this.name === name) {
							selectedGroup = this;
							selectedSatellite = selectedGroup['satellite'+slot]
						}
					});

					singleView.refresh();
					groupView.refresh();
				});
			});

			webService.request('get_satellite_list', function(response) {
				$('satellite', response).each(function(i, satellite) {
					satellites.push(TVRO.Satellite(satellite));
				});
			});
		}
	}
};

TVRO.page = TVRO.SatellitesPage();
*/