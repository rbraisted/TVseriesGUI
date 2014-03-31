!function(TVRO) {
  "use strict";

	var SystemInfoView = function(jQ) {
		var self;

    var reload = function() {
      TVRO.getAntennaVersions().then(function(xml) {
        //  some of these were coming back twice from the webservice ???
        //  so i just added :first in front of all the parent selectors
        var hubSn = $('acu:first sn', xml).text();
        var hubVer = $('acu:first ver', xml).text();
        var satVer = $('sat_list:first ver', xml).text();
        var gprsIp = $('gprs:first ip', xml).text();
        var antModel = $('au:first model', xml).text();
        var antSn = $('au:first sn', xml).text();
        var antVer = $('au:first ver', xml).text();
        var rfVer = $('rf:first ver', xml).text();
        var fpgaVer = $('fpga:first ver', xml).text();
        var azVer = $('az_el:first ver', xml).text();
        var skewVer = $('skew_xaz:first ver', xml).text();
        var lnbName = $('lnb:first name', xml).text();
        var lnbVer = $('lnb:first ver', xml).text();

        $('.\\#hub-sn', jQ).text(hubSn);
        $('.\\#hub-ver', jQ).text(hubVer);
        $('.\\#sat-ver', jQ).text(satVer);
        $('.\\#gprs-ip', jQ).text(gprsIp);
        $('.\\#ant-model', jQ).text(antModel);
        $('.\\#ant-sn', jQ).text(antSn);
        $('.\\#ant-ver', jQ).text(antVer);
        $('.\\#rf-ver', jQ).text(rfVer);
        $('.\\#fpga-ver', jQ).text(fpgaVer);
        $('.\\#az-ver', jQ).text(azVer);
        $('.\\#skew-ver', jQ).text(skewVer);
        $('.\\#lnb-name', jQ).text(lnbName);
        $('.\\#lnb-ver', jQ).text(lnbVer);
      }).then(TVRO.getAutoswitchStatus).then(function(xml) {
        var service = $('service', xml).text();
        var subType = $('service_subtype', xml).text();
        $('.\\#sat-service', jQ).text(service + ' ' + subType);
      });
    };

		return self = {
      reload: reload
    };
	};

	TVRO.SystemInfoView = SystemInfoView;

}(window.TVRO);