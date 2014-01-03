"use strict";

TVRO.TestPage = function() {
	var self = {},
		webService = new TVRO.WebService(),
		cookieManager = new TVRO.CookieManager();

	self.init = function() {
		$('#satellites-btn', '#nav-bar').toggleClass('is-selected', true);

		$('#header > #nav-btn').click(function() {
			$('#nav-bar', '#header').toggleClass('is-expanded');
		});

		$('[id ~= on-off-switch ]').click(function() {
			var btn = $(this);
			btn.toggleClass('is-on');
		});

		$('[id ~= menu-btn ]', '#menu').click(function() {
			$('[id ~= menu-btn ]', '#menu').removeClass('is-selected');
			$(this).toggleClass('is-selected', true);
			$('[id ~= menu ], [id ~= view-a ], [id ~= view-b ]', '#page').removeClass('is-active');
			$('[id ~= view-a ]', '#page').toggleClass('is-active', true);
		});

		$('[id ~= menu-btn ]', '[id ~= view-a ]').click(function() {
			$('[id ~= menu ], [id ~= view-a ], [id ~= view-b ]', '#page').removeClass('is-active');
			$('[id ~= menu ]', '#page').toggleClass('is-active', true);	
		});

		$('[id ~= view-a-btn ]', '#page').click(function() {
			$('[id ~= menu ], [id ~= view-a ], [id ~= view-b ]', '#page').removeClass('is-active');
			$('[id ~= view-a ]', '#page').toggleClass('is-active', true);	
		});

		$('[id ~= view-b-btn ]', '#page').click(function() {
			$('[id ~= menu ], [id ~= view-a ], [id ~= view-b ]', '#page').removeClass('is-active');
			$('[id ~= view-b ]', '#page').toggleClass('is-active', true);
		});
	};

	return self;
};

TVRO.page = new TVRO.TestPage();