"use strict";

(function(tvro) {

	var toggleBtn = function(jQ) {
		var toggleBtn;
		var val = $(jQ).hasClass('$on');
		var clickCb;

		$(jQ).click(function() {
			val = $(jQ).toggleClass('$on').hasClass('$on');
			if (clickCb) clickCb.call(toggleBtn, val);
		});

		return toggleBtn = {
			//	set call $ click(true||false)
			click: function(arg) {
				if (_.isFunction(arg)) {
					clickCb = arg;
				} else {
					$(jQ).toggleClass('$on', !arg).click();
				}
				return toggleBtn;
			},

			//	get set .$on
			val: function(arg) {
				if (!arguments.length) {
					return val;
				} else {
					val = $(jQ).toggleClass('$on', Boolean(arg)).hasClass('$on');
					return toggleBtn;
				}
			}
		}
	}

	tvro.toggleBtn = toggleBtn;

}(window.tvro = window.tvro || {}));