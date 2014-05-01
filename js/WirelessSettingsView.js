!function(TVRO) {
  "use strict";

	var WirelessSettingsView = function(jQ) {
		var self;

    //  button tray

    var resetBtn = $('.\\#reset-btn', jQ).click(function() {
      var confirmed = confirm('Are you sure you want to reset the wireless settings?');
      if (confirmed) TVRO.setWlanFactory().then(TVRO.reload);
    });

    var saveBtn = $('.\\#save-btn', jQ).click(function() {
      //  we make this call just to get <security><algorithm>
      //  the call to set <security><wpa2> does not work without it
      TVRO.getWlan().then(function(xml) {
        var mode = $('.\\#wlan-mode', jQ).text();
        var essid = $('.\\#wlan-essid', jQ).val();
        var ip = $('.\\#wlan-ip', jQ).val();
        var netmask = $('.\\#wlan-netmask', jQ).val();
        var gateway = $('.\\#wlan-gateway', jQ).val();

        //  if mode is AP, ap_mode mode .text() else if_mode mode .text()
        var networkMode = $('.\\#wlan-network-mode', jQ).text();
        var securityMode = $('.\\#wlan-security-mode', jQ).text();
        var securityKey = $('.\\#wlan-security-key', jQ).text();

        //  reassign xml here otherwise
        //  you'll pull the <security><algorithm> from both modes (IF and AP)
        if (mode === 'AP (Access Point)') xml = $('ap_mode', xml);
        else xml = $('if_mode', xml);

        var securityAlgorithm = $('security algorithm', xml).text();

        //  after a bunch of tests
        //  here is what i've figured out:
        //  1. you should not send "broadcast"
        //     it results in an error 4 (required tag missing)
        //     at least when setting AP mode
        //  2. you should send algorithm
        //     at least when setting IF mode
        //  3. <wpa2> works when setting AP,
        //     <key> works when setting IF
        //     sending both in both cases doesn't hurt
        //     so just send both
        var params = {
          mode: mode,
          if_mode: {
            mode: networkMode,
            essid: essid,
            ip: ip,
            netmask: netmask,
            gateway: gateway,
            security: {
              mode: securityMode,
              algorithm: securityAlgorithm,
              wpa2: securityKey,
              key: securityKey
            }
          }
        };

        if (mode === 'AP (Access Point)') {
          params.ap_mode = params.if_mode;
          delete params.if_mode;
        }

        var confirmed = confirm('Are you sure you want to save these changes?');
        if (confirmed) TVRO.setWlan(params).then(TVRO.reload);
      });
    });


    //  mode

    var setMode = function(mode) {
      TVRO.getWlan().then(function(xml) {
        if (mode === 'AP (Access Point)') xml = xml.find('ap_mode');
        else if (mode === 'IF (Infrastructure)') xml = xml.find('if_mode');
        else return;

        var essid = $('essid', xml).text();
        var ip = $('ip', xml).text();
        var netmask = $('netmask', xml).text();
        var gateway = $('gateway', xml).text();
        var broadcast = $('broadcast', xml).text();

        //  if mode is AP, ap_mode mode .text() else if_mode mode .text()
        var networkMode = $('mode:first', xml).text();
        var securityMode = $('security mode', xml).text();
        var securityKey = $('security wpa2', xml).text();

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
      if (mode === 'IF (Infrastructure)') networkModeDropdownValues = ifDropdownVals;
      else if (mode === 'AP (Access Point)') networkModeDropdownValues = apDropdownVals;
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
        'IF (Infrastructure)',
        'AP (Access Point)'
      ])
      .onClick(setMode)
      .build();




    //  network mode

    var setNetworkMode = function(networkMode) {
      $('.\\#wlan-network-mode', jQ).text(networkMode);
      networkModeDropdownView.setValue(networkMode);
      jQ.toggleClass('$wlan-bridged', networkMode === 'BRIDGED');
      jQ.toggleClass('$wlan-end-point', networkMode === 'ENDPOINT');
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
    var apDropdownVals = ['BRIDGED', 'ENDPOINT'];



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

/*

<ipacu_response>
  <message name="get_wlan" error="0"></message>
  <mode>AP (Access Point)</mode>
  <if_mode>
    <mode>DYNAMIC</mode>
    <essid>linksys</essid>
    <security>
      <mode>OFF</mode>
      <algorithm>TKIP</algorithm>
      <key>tracvision</key>
    </security>
    <ip>169.254.1.1</ip>
    <netmask>255.255.0.0</netmask>
    <gateway>169.254.1.1</gateway>
    <broadcast>169.254.1.255</broadcast>
  </if_mode>
</ipacu_response>

{
  mode: "IF (Infrastructure)",
  if_mode: {
    mode: "DYNAMIC",
    essid: "linksys",
    security: {
      mode: "OFF",
      algorithm: "TKIP",
      key: "tracvision"
    },
    ip: "169.254.1.1",
    netmask: "255.255.0.0",
    gateway: "169.254.1.1",
    broadcast: "169.254.1.255"
  }
}

<ipacu_request>
  <message name="set_wlan"></message>
  <mode>AP (Access Point)</mode>
  <ap_mode>
    <mode>ENDPOINT</mode>
    <essid>TVHub-140311659</essid>
    <ip>172.16.0.1</ip>
    <netmask>255.255.255.0</netmask>
    <gateway>172.16.0.1</gateway>
    <broadcast>172.16.0.1</broadcast>
    <security>
      <mode>OFF</mode>
      <wpa2>tracvision</wpa2>
      <key>tracvision</key>
    </security>
</ap_mode>
</ipacu_request>

{
  mode: "AP (Access Point)",
  ap_mode: {
    mode: "ENDPOINT",
    essid: "TVHub-140311659",
    ip: "172.16.0.1",
    netmask: "255.255.255.0",
    gateway: "172.16.0.1",
    security: {
      mode: "WPA_PSK",
      algorithm: "TKIP",
      wpa2: "securitykey",
      key: "securitykey"
    }
  }
}

*/