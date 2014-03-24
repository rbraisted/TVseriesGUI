!function(exports) {
	var EthernetSettingsView = function(jQ) {
		var self;

    /*** button tray ***/

    var resetBtn = $('.\\#reset-btn', jQ).click(function() {
      if (confirm('Are you sure you want to reset the ethernet settings?')) {
        tvro.ws.setEthFactory().then(refresh);
      }
    });

    var saveBtn = $('.\\#save-btn', jQ).click(function() {
      tvro.ws.setEth({
        mode: $('.\\#eth-mode', jQ).text(),
        ip: $('.\\#eth-ip', jQ).val(),
        netmask: $('.\\#eth-netmask', jQ).val(),
        gateway: $('.\\#eth-gateway', jQ).val(),
        broadcast: $('.\\#eth-broadcast', jQ).val()
      }).then(refresh);
    });


    /*** mode ***/

    var modeDropdown = tvro.dropdown('.\\#eth-mode-dropdown')
      .vals([
        'OFF',
        'STATIC',
        'DYNAMIC'
      ])
      .click(function(row, mode) {
        setMode(mode);
      })
      .build(function(row, mode) {
        $('.\\#dropdown-val', row).text(mode);
      })
      .build();

    var modeBtn = $('.\\#eth-mode-btn').click(function() {
      modeDropdown.show().offset($(this).offset());
    });

    var setMode = function(mode) {
      $('.\\#eth-mode', jQ).text(mode);
      modeDropdown.val(mode);
      $(jQ).toggleClass('$eth-off', mode === 'OFF');
      $(jQ).toggleClass('$eth-static', mode === 'STATIC');
      $(jQ).toggleClass('$eth-dynamic', mode === 'DYNAMIC');
    };

    var refresh = function() {
      tvro.ws.getEth().then(function(xml) {
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
      refresh: refresh
    };
	};

	exports.EthernetSettingsView = EthernetSettingsView;
}(window);