!function(TVRO) {
  "use strict";

	var SystemInfoView = function(jQ) {
		var self;

    var reload = function() {
      TVRO.getAntennaVersions().then(function(xml) {
        var hubSn = $('acu sn', xml).text();
        var hubVer = $('acu ver', xml).text();
        var satVer = $('sat_list ver', xml).text();
        var gprsIp = $('gprs ip', xml).text();
        var diseqcVer = $('diseqc ver', xml).text();
        var ipautoswVer = $('ipautosw ver', xml).text();

        var antModel = $('au model', xml).text();
        var antSn = $('au sn', xml).text();
        var antVer = $('au ver', xml).text();
        var rfVer = $('rf ver', xml).text();
        var fpgaVer = $('fpga:first ver', xml).text(); //  fpga was coming back twice so i just added :first
        var azVer = $('az_el ver', xml).text();
        var skewVer = $('skew_xaz ver', xml).text();
        var lnbName = $('lnb name', xml).text();
        var lnbVer = $('lnb ver', xml).text();

        $('.\\#hub-sn', jQ).text(hubSn);
        $('.\\#hub-ver', jQ).text(hubVer);
        $('.\\#sat-ver', jQ).text(satVer);
        $('.\\#gprs-ip', jQ).text(gprsIp);
        $('.\\#diseqc-ver', jQ).text(diseqcVer);
        $('.\\#ipautosw-ver', jQ).text(ipautoswVer);

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
      }).then(TVRO.getAntennaStatus).then(function(xml) {
        var dateTime = $('gps dt', xml).text();
        $('.\\#date-time', jQ).text(dateTime);
      }).then(TVRO.getWebUIVersion).then(function(txt) {
        $('.\\#webui-ver', jQ).text(txt);
      });
    };

		return self = {
      reload: reload
    };
	};

	TVRO.SystemInfoView = SystemInfoView;

}(window.TVRO);