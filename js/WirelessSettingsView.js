!function(exports) {
  "use strict";

	var WirelessSettingsView = function(jQ) {
		var self;

    /*** button tray ***/

    var resetBtn = $('.\\#reset-btn', jQ).click(function() {
      if (confirm('Are you sure you want to reset the ethernet settings?')) {
        tvro.ws.setWlanFactory().then(refresh);
      }
    });

    var saveBtn = $('.\\#save-btn', jQ).click(function() {

      var params = {
        mode: $('.\\#wlan-mode', jQ).text()
      };

      var networkModeParams = {
        mode: $('.\\#wlan-network-mode', jQ).text(),
        essid: $('.\\#wlan-essid', jQ).val(),
        security: {
          mode: $('.\\#wlan-security-mode', jQ).text()
        }
      }

      if (networkModeParams.security.mode !== 'OFF') {
        networkModeParams.security.key = $('.\\#wlan-security-key', jQ).val();
      }

      if (params.mode === 'IF') {
        if (networkModeParams.mode === 'DYNAMIC') {
          params = _.merge(params, {
            if_mode: networkModeParams
          });
        } else {
          params = _.merge(params, {
            if_mode: _.merge(networkModeParams, {
              ip: $('.\\#wlan-ip', jQ).val(),
              netmask: $('.\\#wlan-netmask', jQ).val(),
              gateway: $('.\\#wlan-gateway', jQ).val(),
              broadcast: $('.\\#wlan-broadcast', jQ).val()            
            })
          });
        }    
      } else if (params.mode === 'AP') {
        params = _.merge(params, {
          ap_mode: networkModeParams
        })
      }

      tvro.ws.setWlan(params).then(refresh);

//  <message name="set_wlan" />
//      <channel>11</channel>
//      <band>b|g</band>
//       <mode>OFF | ADHOC | IF | AP</mode>   NOTE: no ADHOC or IF on VSAT IPACU
//      <adhoc_mode>     NOTE: used on HD11 only
//       <security>
//        <mode>OFF | WEP</mode>
//        <key></key>
// </security>
//       <ip>169.254.100.1</ip>
//      </adhoc_mode>
//      <if_mode>     NOTE: used on HD11 only
//       <mode> STATIC | DYNAMIC</mode>
//       <essid>ipacu</essid>
//       <security>
//        <mode>
//         OFF | WPA_PSK | WPA2_PSK | WEP_1
//        </mode>
//        <algorithm>
//         TKIP | AES | WEP_64 | WEP_128
//        </algorithm>
//        <key></key>
//       </security>
//       <ip>192.168.1.3</ip>
//       <netmask>255.255.255.0</netmask>
//       <gateway>192.168.1.1</gateway>
//       <broadcast>192.168.1.255</broadcast>
//      </if_mode>
//      <ap_mode>     NOTE: used on VSAT only
//       <essid>ipacu</essid>
//       <security>
//        <mode>
//         OFF | WPA_PSK | WPA2_PSK | WEP
//        </mode>
//        <algorithm>
//         TKIP | AES | WEP_64 | WEP_128
//        </algorithm>
//        <key>asbn235bsdjhw4fedfe</key>
//       </security>
//      </ap_mode>


    });


    /*** mode ***/

    var modeDropdown = tvro.dropdown('.\\#wlan-mode-dropdown')
      .vals([
        'OFF',
        'IF',
        'AP'
      ])
      .click(function(row, mode) {
        setMode(mode);
      })
      .build(function(row, mode) {
        $('.\\#dropdown-val', row).text(mode);
      })
      .build();

    var modeBtn = $('.\\#wlan-mode-btn').click(function() {
      modeDropdown.show().offset($(this).offset());
    });

    var setMode = function(mode) {
      $('.\\#wlan-mode', jQ).text(mode);
      modeDropdown.val(mode);
      $(jQ).toggleClass('$wlan-off', mode === 'OFF');

      if (mode === 'IF') {
        networkModeDropdown.vals(ipDropdownVals).build().click(ipDropdownVals[0]);

      } else if (mode === 'AP') {
        networkModeDropdown.vals(apDropdownVals).build().click(apDropdownVals[0]);
      }
    };


    /*** network mode ***/

    var ipDropdownVals = [
        'STATIC',
        'DYNAMIC'
      ];

    var apDropdownVals = [
        'BRIDGED'
      ];

    var networkModeDropdown = tvro.dropdown('.\\#wlan-network-mode-dropdown')
      .click(function(row, networkMode) {
        setNetworkMode(networkMode);
      })
      .build(function(row, networkMode) {
        $('.\\#dropdown-val', row).text(networkMode);
      })
      .build();

    var networkModeBtn = $('.\\#wlan-network-mode-btn').click(function() {
      networkModeDropdown.show().offset($(this).offset());
    });

    var setNetworkMode = function(networkMode) {
      $('.\\#wlan-network-mode', jQ).text(networkMode);
      networkModeDropdown.val(networkMode);
      $(jQ).toggleClass('$wlan-bridged', networkMode === 'BRIDGED');
      $(jQ).toggleClass('$wlan-static', networkMode === 'STATIC'); 
      $(jQ).toggleClass('$wlan-dynamic', networkMode === 'DYNAMIC');
    };


    /*** security mode ***/

    var securityModeDropdown = tvro.dropdown('.\\#wlan-security-mode-dropdown')
      .vals([
        'OFF',
        'WPA_PSK'
      ])
      .click(function(row, securityMode) {
        setSecurityMode(securityMode);
      })
      .build(function(row, securityMode) {
        $('.\\#dropdown-val', row).text(securityMode);
      })
      .build();

    var securityModeBtn = $('.\\#wlan-security-mode-btn').click(function() {
      securityModeDropdown.show().offset($(this).offset());
    });

    var setSecurityMode = function(securityMode) {
      $('.\\#wlan-security-mode', jQ).text(securityMode);
      securityModeDropdown.val(securityMode);
      $(jQ).toggleClass('$wlan-sec-off', securityMode === 'OFF');
    };

    var refresh = function() {
      tvro.ws.getWlan().then(function(xml) {
        //  note: .eq(0)
        var mode = $('mode', xml).eq(0).text();
        var essid = $('essid', xml).text();
        var ip = $('ip', xml).text();
        var netmask = $('netmask', xml).text();
        var gateway = $('gateway', xml).text();
        var broadcast = $('broadcast', xml).text();

        //  if mode is AP, ap_mode mode .text() else if_mode mode .text()
        var networkMode = $((mode === 'AP' ? 'ap_mode' : 'if_mode') + ' mode', xml).eq(0).text();
        var securityMode = $('security mode', xml).text();
        var securityKey = $('security key', xml).text();

        setMode(mode);
        setNetworkMode(networkMode);
        setSecurityMode(securityMode);

        $('.\\#wlan-essid', jQ).val(essid);
        $('.\\#wlan-ip', jQ).val(ip);
        $('.\\#wlan-netmask', jQ).val(netmask);
        $('.\\#wlan-gateway', jQ).val(gateway);
        $('.\\#wlan-broadcast', jQ).val(broadcast);
        $('.\\#wlan-security-key', jQ).val(securityKey);
      }); 
    }

		return self = {
      refresh: refresh
    }
	}

	exports.WirelessSettingsView = WirelessSettingsView;
}(window);