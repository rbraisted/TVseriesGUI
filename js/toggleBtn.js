"use strict";

(function(tvro) {
	//	<jQ>
	//		<table-head>
	//		<table-row>
	var toggleBtn = function(jQ) {
		var
		toggleBtn,
		on = $(jQ).hasClass('$on'),
		clickCb;

		$(jQ).click(function() {
			on = $(jQ).toggleClass('$on').hasClass('$on');
			clickCb(on);
		});

		return toggleBtn = {
			click: function(arg) {
				if (_.isFunction(arg)) {
					clickCb = arg;
				} else {
					$(jQ).toggleClass('$on', !arg).click();
				}
				return toggleBtn;
			},
			on: function(arg) {
				//	get isOn
				if (!arguments.length) {
					return on;
				} else {
					on = $(jQ).toggleClass('$on', arg).hasClass('$on');
					return toggleBtn;
				}
			}
		}
	}

	tvro.toggleBtn = toggleBtn;

}(window.tvro = window.tvro || {}));