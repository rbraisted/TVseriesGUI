$(function() {

	var menu = tvro.table($('.\\#menu-table-view'))
		.vals([
			'General',
			'Network',
			'Advanced'
		])
		.click(function(row, val) {
			window.location.hash = '/' + val.toLowerCase();
		})
		.build(function(row, val) {
			$('.\\#menu-item', row).text(val + ' Settings');
		})
		.build();

	var generalSettingsView = GeneralSettingsView(
		$('.\\#general-settings-view')
			.find('.\\#back-btn')
				.click(function() {
					window.location.hash = '';
				})
				.end()
	);

	var advancedSettingsView = AdvancedSettingsView(
		$('.\\#advanced-settings-view')
			.find('.\\#back-btn')
				.click(function() {
					window.location.hash = '';
				})
				.end()
	);

  var networkSettingsView = NetworkSettingsView(
    $('.\\#network-settings-view')
      .find('.\\#back-btn')
        .click(function() {
          window.location.hash = '';
        })
        .end()
      .find('.\\#ethernet-btn')
        .click(function() {
          window.location.hash = '/network/ethernet';
        })
        .end()
      .find('.\\#wireless-btn')
        .click(function() {
          window.location.hash = '/network/wireless';
        })
        .end()
  );

  var ethernetSettingsView = EthernetSettingsView(
    $('.\\#ethernet-settings-view')
      .find('.\\#back-btn')
        .click(function() {
          window.location.hash = '/network';
        })
        .end()
  );

  var wirelessSettingsView = WirelessSettingsView(
    $('.\\#wireless-settings-view')
      .find('.\\#back-btn')
        .click(function() {
          window.location.hash = '/network';
        })
        .end()
  );

	tvro.hash(function(hash) {
    if (hash.match(/\/general/)) {
      menu.val('General');
      generalSettingsView.refresh();

    } else if (hash.match(/\/advanced/)) {
      menu.val('Advanced');
      advancedSettingsView.refresh();

    } else if (hash.match(/\/network/)) {
      menu.val('Network');
      networkSettingsView.refresh();

      if (hash.match(/\/ethernet/)) ethernetSettingsView.refresh();
      else if (hash.match(/\/wireless/)) wirelessSettingsView.refresh();
    }

		$(document.body).setClass(hash);
	});

	tvro.hash();
});