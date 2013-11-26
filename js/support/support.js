TVRO.SupportPage = function() {
	var self = {};

	self.init = function() {
		$('#support-btn').toggleClass('selected', true);
		$('#help-accordion-btn, #advanced-accordion-btn, #contact-accordion-btn').click(function() {			
			$('#'+this.id.slice(0, -4)).toggleClass('exp');
		});
	};

	return self;
};

$(document).ready(function() {
	window.tvro.supportPage = new TVRO.SupportPage();
	window.tvro.supportPage.init();
});