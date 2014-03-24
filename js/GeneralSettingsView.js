!function(exports) {
	var GeneralSettingsView = function(jQ) {
		var self;

		var cookieToggle = function(cookie) {
			return function(isEnabled) {
				if (isEnabled) TVRO.CookieManager().setCookie(cookie);
				else TVRO.CookieManager().removeCookie(cookie);				
			}
		}

		var techTogBtn = tvro.toggleBtn(jQ.find('.\\#tech-tog-btn'))
			.click(cookieToggle(TVRO.TECH_MODE));

		var demoTogBtn = tvro.toggleBtn(jQ.find('.\\#demo-tog-btn'))
			.click(cookieToggle(TVRO.DEMO_MODE));

    var refresh = function() {
      techTogBtn.val(TVRO.CookieManager().hasCookie(TVRO.TECH_MODE));
      demoTogBtn.val(TVRO.CookieManager().hasCookie(TVRO.DEMO_MODE));
    }

		return self = {
      refresh: refresh
    }
	}

	exports.GeneralSettingsView = GeneralSettingsView;
}(window);