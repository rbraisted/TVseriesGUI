!function(TVRO) {
  "use strict";

	var WirelessSettingsView = function(jQ) {
		var self;

    //  entering IP Address in AP (Access Point) mode
    //  when in AP mode, when the user changes the IP Address
    //  we should make sure that broadcast updates
    //  itself to be the same value except that broadcast's
    //  last octet is always .255 (in the gui)

    var ipInputValue; //  store this so we can revert on inproper values entered
    var ipInput = $('input.\\#wlan-ip', jQ).change(function(event) {
      var octets = ipInput.val().split('.');

      //  check for validity
      var valid =
        octets.length === 4 && // make sure we've got a every octet
        octets[3] == 1 && // make sure the last octet is .1
        octets[0] < 256 && // make sure they don't go higher than 255
        octets[1] < 256 &&
        octets[2] < 256 &&
        octets[0] > -1 && // and make sure they don't get lower than 0
        octets[1] > -1 &&
        octets[2] > -1;

      if (!valid) {
        ipInput.val(ipInputValue);
      } else {
        ipInputValue = ipInput.val();

        octets.pop();
        octets.push(255);
        var broadcast = octets.join('.');
        $('.\\#wlan-broadcast', jQ).text(broadcast).val(broadcast);
      }
    });

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
        var broadcast = $('.\\#wlan-broadcast', jQ).val();

        //  if mode is AP, ap_mode mode .text() else if_mode mode .text()
        var networkMode = $('.\\#wlan-network-mode', jQ).text();
        var securityMode = $('.\\#wlan-security-mode', jQ).text();
        var securityKey = $('.\\#wlan-security-key', jQ).val();

        //  reassign xml here otherwise
        //  you'll pull the <security><algorithm> from both modes (IF and AP)
        if (mode === 'AP (Access Point)') xml = $('ap_mode', xml);
        else xml = $('if_mode', xml);

        var securityAlgorithm = $('security algorithm', xml).text();

        //  <wpa2> works when setting AP,
        //  <key> works when setting IF
        //  sending both in both cases doesn't hurt
        //  so just send both
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
        var securityKey = $('security wpa2', xml).text() || $('security key', xml).text();

        setNetworkMode(networkMode);
        setSecurityMode(securityMode);

        $('.\\#wlan-essid', jQ).val(essid).text(essid);
        $('.\\#wlan-ip', jQ).val(ip).text(ip);
        $('.\\#wlan-netmask', jQ).val(netmask).text(netmask);
        $('.\\#wlan-gateway', jQ).val(gateway).text(gateway);
        $('.\\#wlan-broadcast', jQ).val(broadcast).text(broadcast);
        $('.\\#wlan-security-key', jQ).val(securityKey).text(securityKey);

        ipInputValue = ip;
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

      //  trigger change on ipInput to auto correct broadcast if it's correct
      // if (mode === 'AP (Access Point)') ipInput.change();
      //  actually not sure if i should do that since it will mean the user
      //  is being given the wrong information until they actually hit save
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