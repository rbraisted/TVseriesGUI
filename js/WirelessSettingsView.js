!function(TVRO) {
  "use strict";

	var WirelessSettingsView = function(jQ) {
		var self;

    //  button tray

    var resetBtn = $('.\\#reset-btn', jQ).click(function() {
      var confirmed = confirm('Are you sure you want to reset the ethernet settings?');
      if (confirmed) TVRO.setWlanFactory().then(TVRO.reload);
    });

    var saveBtn = $('.\\#save-btn', jQ).click(function() {
      var mode = $('.\\#wlan-mode', jQ).text();
      var essid = $('.\\#wlan-essid', jQ).val();
      var ip = $('.\\#wlan-ip', jQ).val();
      var netmask = $('.\\#wlan-netmask', jQ).val();
      var gateway = $('.\\#wlan-gateway', jQ).val();
      var broadcast = $('.\\#wlan-broadcast', jQ).val();

      //  if mode is AP, ap_mode mode .text() else if_mode mode .text()
      var networkMode = $('.\\#wlan-network-mode', jQ).text();
      var securityMode = $('.\\#wlan-security-mode', jQ).text();
      var securityKey = $('.\\#wlan-security-key', jQ).text();

      var params = {
        mode: mode,

        if_mode: {
          mode: networkMode,
          essid: essid,
          ip: ip,
          netmask: netmask,
          gateway: gateway,
          broadcast: broadcast,

          security: {
            mode: securityMode,
            key: securityKey,
          }          
        }
      };

      if (mode === 'AP') {
        params.ap_mode = params.if_mode;
        delete params.if_mode;
      }

      TVRO.setWlan(params).then(TVRO.reload);
    });


    //  mode

    var setMode = function(mode) {
      TVRO.getWlan().then(function(xml) {
        if (mode === 'AP') xml = xml.find('ap_mode');
        else if (mode === 'IF') xml = xml.find('if_mode');
        else return;

        var essid = $('essid', xml).text();
        var ip = $('ip', xml).text();
        var netmask = $('netmask', xml).text();
        var gateway = $('gateway', xml).text();
        var broadcast = $('broadcast', xml).text();

        //  if mode is AP, ap_mode mode .text() else if_mode mode .text()
        var networkMode = $('mode:first', xml).text();
        var securityMode = $('security mode', xml).text();
        var securityKey = $('security key', xml).text();

        setNetworkMode(networkMode);
        setSecurityMode(securityMode);

        $('.\\#wlan-essid', jQ).val(essid).text(essid);
        $('.\\#wlan-ip', jQ).val(ip).text(ip);
        $('.\\#wlan-netmask', jQ).val(netmask).text(netmask);
        $('.\\#wlan-gateway', jQ).val(gateway).text(gateway);
        $('.\\#wlan-broadcast', jQ).val(broadcast).text(broadcast);
        $('.\\#wlan-security-key', jQ).val(securityKey).text(securityKey);
      });

      $('.\\#wlan-mode', jQ).text(mode);
      modeDropdownView.setValue(mode);
      jQ.toggleClass('$wlan-off', mode === 'OFF');

      var networkModeDropdownValues;
      if (mode === 'IF') networkModeDropdownValues = ifDropdownVals;
      else if (mode === 'AP') networkModeDropdownValues = apDropdownVals;
      else return setNetworkMode('OFF');

      networkModeDropdownView
        .setValues(networkModeDropdownValues)
        .setValue(networkModeDropdownValues[0])
        .build();

      // setNetworkMode(networkModeDropdownValues[0]);
    };

    var modeBtn = $('.\\#wlan-mode-btn').click(function() {
      modeDropdownView.show(modeBtn.offset());
    });

    var modeDropdownView = TVRO.DropdownView($('.\\#wlan-mode-dropdown-view'))
      .setValues([
        'OFF',
        'IF',
        'AP'
      ])
      .onClick(setMode)
      .build();



    //  network mode

    var setNetworkMode = function(networkMode) {
      $('.\\#wlan-network-mode', jQ).text(networkMode);
      networkModeDropdownView.setValue(networkMode);
      jQ.toggleClass('$wlan-bridged', networkMode === 'BRIDGED');
      jQ.toggleClass('$wlan-end-point', networkMode === 'END_POINT');
      jQ.toggleClass('$wlan-static', networkMode === 'STATIC'); 
      jQ.toggleClass('$wlan-dynamic', networkMode === 'DYNAMIC');
    };

    var networkModeBtn = $('.\\#wlan-network-mode-btn').click(function() {
      networkModeDropdownView.show(networkModeBtn.offset());
    });

    var networkModeDropdownView = TVRO.DropdownView($('.\\#wlan-network-mode-dropdown-view'))
      .onClick(setNetworkMode)
      .build();

    var ifDropdownVals = ['STATIC', 'DYNAMIC'];
    var apDropdownVals = ['BRIDGED', 'END_POINT'];



    //  security mode

    var setSecurityMode = function(securityMode) {
      $('.\\#wlan-security-mode', jQ).text(securityMode);
      securityModeDropdownView.setValue(securityMode);
      jQ.toggleClass('$wlan-sec-off', securityMode === 'OFF');
    };

    var securityModeBtn = $('.\\#wlan-security-mode-btn').click(function() {
      securityModeDropdownView.show(securityModeBtn.offset());
    });

    var securityModeDropdownView = TVRO.DropdownView($('.\\#wlan-security-mode-dropdown-view'))
      .setValues([
        'OFF',
        'WPA_PSK'
      ])
      .onClick(setSecurityMode)
      .build();



    var reload = function() {
      TVRO.getWlan().then(function(xml) {
        var mode = $('mode:first', xml).text();
        setMode(mode);
      });
    };

		return self = {
      reload: reload
    };
	};

	TVRO.WirelessSettingsView = WirelessSettingsView;

}(window.TVRO);