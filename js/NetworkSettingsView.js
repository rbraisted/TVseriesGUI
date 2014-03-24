!function(exports) {
  "use strict";

  var NetworkSettingsView = function(jQ) {
    var self;

    var refresh = function() {
      tvro.ws.getEth().then(function(xml) {
        var mode = $('mode', xml).text();
        var ip = $('ip', xml).text();
        var netmask = $('netmask', xml).text();
        var gateway = $('gateway', xml).text();
        var broadcast = $('broadcast', xml).text();

        $(jQ).toggleClass('$eth-off', mode === 'OFF');
        $(jQ).toggleClass('$eth-static', mode === 'STATIC');
        $(jQ).toggleClass('$eth-dynamic', mode === 'DYNAMIC');

        $('.\\#eth-mode', jQ).text(mode);
        $('.\\#eth-ip', jQ).text(ip);
        $('.\\#eth-netmask', jQ).text(netmask);
        $('.\\#eth-gateway', jQ).text(gateway);
        $('.\\#eth-broadcast', jQ).text(broadcast);
      });

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
        var securityAlgorithm = $('security algorithm', xml).text();

        $(jQ).toggleClass('$wlan-off', mode === 'OFF');
        //  AP has 1 network mode - BRIDGED
        $(jQ).toggleClass('$wlan-bridged', networkMode === 'BRIDGED');
        //  IF has 2 network modes
        $(jQ).toggleClass('$wlan-static', networkMode === 'STATIC'); 
        $(jQ).toggleClass('$wlan-dynamic', networkMode === 'DYNAMIC');
        $(jQ).toggleClass('$wlan-sec-off', securityMode === 'OFF');

        $('.\\#wlan-mode', jQ).text(mode);
        $('.\\#wlan-essid', jQ).text(essid);
        $('.\\#wlan-ip', jQ).text(ip);
        $('.\\#wlan-netmask', jQ).text(netmask);
        $('.\\#wlan-gateway', jQ).text(gateway);
        $('.\\#wlan-broadcast', jQ).text(broadcast);
        $('.\\#wlan-network-mode', jQ).text(networkMode);
        $('.\\#wlan-security-mode', jQ).text(securityMode);
        $('.\\#wlan-security-key', jQ).text(securityKey);
        // $('.\\#wlan-security-algorithm', jQ).text(securityAlgorithm);
      });
    }

    return self = {
      refresh: refresh
    }
  }

  exports.NetworkSettingsView = NetworkSettingsView;
}(window);