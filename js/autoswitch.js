"use strict";

TVRO.Autoswitch = function(xml) {
	var self = {},
		xml = $(xml);

	self.name = $('name', xml).text();
	self.ip = $('ip', xml).text();
	self.sn = $('sn', xml).text();

	return self;
};

// TVRO.AutoswitchView = function(view, autoswitch) {
// 	var self = {},
// 		view = $(view),
// 		autoswitch = new TVRO.Autoswitch(autoswitch);
// 	return self;
// };

TVRO.AutoswitchView = function(view, autoswitch) {
	var self = {},
		autoswitch = new TVRO.Autoswitch(autoswitch);

	$('[id ~= save-btn]', view).click(function() {
		self.showView();
	});

	$('[id ~= cancel-btn]', view).click(function() {
		self.showView();
	});

	$('[id ~= edit-btn]', view).click(function() {
		self.showEdit();
	});

	$('[id ~= remove-btn]', view).click(function() {
		self.showEdit();
	});

	$('[id ~= name]', view).text(autoswitch.name).val(autoswitch.name);
	$('[id ~= ip]', view).text(autoswitch.ip).val(autoswitch.ip);
	$('[id ~= sn]', view).text(autoswitch.sn).val(autoswitch.sn);

	$('#mc').append(view);

	self.showEdit = function() {
		$('[id ~= edit]', view).show();
		$('[id ~= view]', view).hide();
	};

	self.showView = function() {
		$('[id ~= view]', view).show();
		$('[id ~= edit]', view).hide();
	};

	return self;
};

TVRO.AutoswitchPage = function() {
	var self = {},
		webService = new TVRO.WebService();

	self.init = function() {
		$('#autoswitch-btn').toggleClass('selected', true);

		//	so
		//	first off
		//	check if autoswitch is like avail or not

		webService.request('get_autoswitch_status', function(response) {
			console.log(response);

			var available = $('available', response).text() === 'Y',
				enabled = $('ipacu_response > enable', response).text() === 'Y',
				autoswitches = $('active_list > autoswitch', response),
				master = $('master', response);

			if (!available) {
				//	show something else, redirect maybe?
			} else if (!enabled) {
				//	no screen set up yet, not sure what to do
				//	in this case (available && !enabled)
			} else {
				var template = $('[id ~= autoswitch]').detach();
				$('[id ~= edit]', template).hide();
				autoswitches.each(function(index, autoswitch) {
					var g = new TVRO.AutoswitchView(template.clone(true), autoswitch);
				});
			}
		});		
	};

	return self;
};

TVRO.page = new TVRO.AutoswitchPage();