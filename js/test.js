"use strict";

TVRO.TestPage = function() {
	var self = {},
		webService = new TVRO.WebService(),
		cookieManager = new TVRO.CookieManager();

	self.init = function() {
		console.log("TestPage init");
	};

	return self;
};

TVRO.page = new TVRO.TestPage();