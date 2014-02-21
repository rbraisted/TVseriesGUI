"use strict";

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

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
			editView.setSatellite(sorted[i]);
			$(document.body).setClass('is-group at-edit-satellite-group');
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
			$(document.body).setClass('is-single at-splash');
		});

		$('[id ~= cancel-btn ]', self).click(function() {
			$(document.body).setClass('is-group at-edit-satellite-group');
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
			else if (selectedValue === 'SINGLE') $(document.body).setClass('at-single-view');
			else if (selectedValue === 'PRESET') $(document.body).setClass('at-group-view');
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
		});

		$('[id ~= next-btn ]', self).click(function() {

		});

		$('[id ~= prev-btn ]', self).click(function() {

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
		var self = $.apply($, arguments),
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

		$('[id ~= next-btn ]', self).click(function() {

		});

		$('[id ~= prev-btn ]', self).click(function() {

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
		var self = $.apply($, arguments);
		$('[id ~= next-btn ]', self).click(function() {
		});
		$('[id ~= prev-btn ]', self).click(function() {
		});
		return $.extend({}, self, {});
	},
	
	groupSatellitesView,
	GroupSatellitesView = function() {
		var self = $.apply($, arguments);
		$('[id ~= next-btn ]', self).click(function() {
		});
		$('[id ~= prev-btn ]', self).click(function() {
		});
		return $.extend({}, self, {});
	};


	return {
		init: function() {
			optionsView = OptionsView('#options-view');
			circularOptionsView = OptionsView('#circular-options-view');
			tv5ManualOptionsView = OptionsView('#tv5-manual-options-view');
			singleView = SingleView('#single-view');
			groupView = GroupView('#group-view');
			groupEditView = GroupEditView('#group-edit-view');
			groupSatellitesView = GroupSatellitesView('#group-satellites-view');

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

/**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**//**/

TVRO.page = TVRO.SatellitesPage();