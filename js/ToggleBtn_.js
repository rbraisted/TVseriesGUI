!function(TVRO) {
  "use strict";

	var ToggleBtn = function(jQ) {
		var self;
		var isOn = $(jQ).hasClass('$on');
		var clickCallback = function(isOn) {};

		jQ.click(function() {
			isOn = jQ.toggleClass('$on').hasClass('$on');
			if (clickCallback) clickCallback.call(self, isOn);
		});

		return self = {
			//	set call $ click(true||false)
			onClick: function(arg) {
				clickCallback = arg;
				return self;
			},

      setOn: function(arg) {
        isOn = Boolean(arg);
        jQ.toggleClass('$on', isOn);
        return self;
      },

			getOn: function(arg) {
				return isOn;
			}
		};
	};

	TVRO.ToggleBtn = ToggleBtn;

}(window.TVRO);