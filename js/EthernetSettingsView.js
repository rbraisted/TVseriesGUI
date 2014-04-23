!function(TVRO) {
  "use strict";

	var EthernetSettingsView = function(jQ) {
		var self;

    var resetBtn = $('.\\#reset-btn', jQ).click(function() {
      var confirmed = confirm('Are you sure you want to reset the ethernet settings?');
      if (confirmed) TVRO.setEthFactory().then(reload);
    });

    var saveBtn = $('.\\#save-btn', jQ).click(function() {
      var mode = $('.\\#eth-mode', jQ).text();
      var ip = $('.\\#eth-ip', jQ).val();
      var netmask = $('.\\#eth-netmask', jQ).val();
      var gateway = $('.\\#eth-gateway', jQ).val();
      var broadcast = $('.\\#eth-broadcast', jQ).val();

      var confirmed = confirm('Are you sure you want to save these changes?');

      if (confirmed) 
        TVRO.setEth({
          mode: mode,
          ip: ip,
          netmask: netmask,
          gateway: gateway,
          broadcast: broadcast
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
        $('.\\#eth-ip', jQ).val(ip).text(ip);
        $('.\\#eth-netmask', jQ).val(netmask).text(netmask);
        $('.\\#eth-gateway', jQ).val(gateway).text(gateway);
        $('.\\#eth-broadcast', jQ).val(broadcast).text(broadcast);
      });
    };

		return self = {
      reload: reload
    };
	};

	TVRO.EthernetSettingsView = EthernetSettingsView;

}(window.TVRO);