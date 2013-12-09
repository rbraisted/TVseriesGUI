"use strict";

TVRO.SupportPage = function() {
	var self = {};

	self.init = function() {
		$('#support-btn').toggleClass('selected', true);
		$('#help-accordion-btn, #advanced-accordion-btn, #contact-accordion-btn').click(function() {			
			$('#'+this.id.slice(0, -4)).toggleClass('exp');
		});

		if (self.mc && self.mc.init) {
			self.mc.init();
		}
	};

	return self;
};

TVRO.page = new TVRO.SupportPage();