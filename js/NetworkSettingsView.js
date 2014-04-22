!function(TVRO) {
  "use strict";

  var NetworkSettingsView = function(jQ) {
    var self;

    var reload = function() {
      TVRO.getEth().then(function(xml) {
        var mode = $('mode', xml).text();
        var ip = $('ip', xml).text();
        var netmask = $('netmask', xml).text();
        var gateway = $('gateway', xml).text();
        var broadcast = $('broadcast', xml).text();

        jQ.toggleClass('$eth-off', mode === 'OFF');
        jQ.toggleClass('$eth-static', mode === 'STATIC');
        jQ.toggleClass('$eth-dynamic', mode === 'DYNAMIC');

        $('.\\#eth-mode', jQ).text(mode);
        $('.\\#eth-ip', jQ).text(ip);
        $('.\\#eth-netmask', jQ).text(netmask);
        $('.\\#eth-gateway', jQ).text(gateway);
        $('.\\#eth-broadcast', jQ).text(broadcast);
      });

      TVRO.getWlan().then(function(xml) {
        var mode = $('mode:first', xml).text();

        if (mode === 'AP') xml = xml.find('ap_mode');
        if (mode === 'IF') xml = xml.find('if_mode');

        var essid = $('essid', xml).text();
        var ip = $('ip', xml).text();
        var netmask = $('netmask', xml).text();
        var gateway = $('gateway', xml).text();
        var broadcast = $('broadcast', xml).text();

        //  if mode is AP, ap_mode mode .text() else if_mode mode .text()
        var networkMode = $('mode:first', xml).text();
        var securityMode = $('security mode', xml).text();
        var securityKey = $('security wpa2', xml).text();

        jQ.toggleClass('$wlan-off', mode === 'OFF');
        jQ.toggleClass('$wlan-bridged', networkMode === 'BRIDGED');
        jQ.toggleClass('$wlan-end-point', networkMode === 'END_POINT');
        jQ.toggleClass('$wlan-static', networkMode === 'STATIC'); 
        jQ.toggleClass('$wlan-dynamic', networkMode === 'DYNAMIC');
        jQ.toggleClass('$wlan-sec-off', securityMode === 'OFF');

        $('.\\#wlan-mode', jQ).text(mode);
        $('.\\#wlan-essid', jQ).text(essid);
        $('.\\#wlan-ip', jQ).text(ip);
        $('.\\#wlan-netmask', jQ).text(netmask);
        $('.\\#wlan-gateway', jQ).text(gateway);
        $('.\\#wlan-broadcast', jQ).text(broadcast);
        $('.\\#wlan-network-mode', jQ).text(networkMode);
        $('.\\#wlan-security-mode', jQ).text(securityMode);
        $('.\\#wlan-security-key', jQ).text(securityKey);
      });
    };

    return self = {
      reload: reload
    };
  };

  TVRO.NetworkSettingsView = NetworkSettingsView;
  
}(window.TVRO);