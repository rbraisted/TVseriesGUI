!function(TVRO) {
  "use strict";

	var EthernetSettingsView = function(jQ) {
		var self;

    var resetBtn = $('.\\#reset-btn', jQ).click(function() {
      var confirmed = confirm('Are you sure you want to reset the ethernet settings?');
      if (confirmed) TVRO.setEthFactory().then(reload);
    });

    var saveBtn = $('.\\#save-btn', jQ).click(function() {
      TVRO.setEth({
        mode: $('.\\#eth-mode', jQ).text(),
        ip: $('.\\#eth-ip', jQ).val(),
        netmask: $('.\\#eth-netmask', jQ).val(),
        gateway: $('.\\#eth-gateway', jQ).val(),
        broadcast: $('.\\#eth-broadcast', jQ).val()
      }).then(reload);
    });

    var setMode = function(mode) {
      $('.\\#eth-mode', jQ).text(mode);
      modeDropdownView.setValue(mode);
      jQ.toggleClass('$eth-off', mode === 'OFF');
      jQ.toggleClass('$eth-static', mode === 'STATIC');
      jQ.toggleClass('$eth-dynamic', mode === 'DYNAMIC');
    };

    var modeBtn = $('.\\#eth-mode-btn').click(function() {
      modeDropdownView.show(modeBtn.offset());
    });

    var modeDropdownView = TVRO.DropdownView($('.\\#eth-mode-dropdown-view'))
      .setValues([
        'OFF',
        'STATIC',
        'DYNAMIC'
      ])
      .onClick(setMode)
      .build();

    var reload = function() {
      TVRO.getEth().then(function(xml) {
        var mode = $('mode', xml).text();
        var ip = $('ip', xml).text();
        var netmask = $('netmask', xml).text();
        var gateway = $('gateway', xml).text();
        var broadcast = $('broadcast', xml).text();

        setMode(mode);
        $('.\\#eth-ip', jQ).val(ip);
        $('.\\#eth-netmask', jQ).val(netmask);
        $('.\\#eth-gateway', jQ).val(gateway);
        $('.\\#eth-broadcast', jQ).val(broadcast);
      });
    };

		return self = {
      reload: reload
    };
	};

	TVRO.EthernetSettingsView = EthernetSettingsView;

}(window.TVRO);