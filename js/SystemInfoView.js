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
        var antModel = $('au model', xml).text();
        var antSn = $('au sn', xml).text();
        var antVer = $('au ver', xml).text();
        var rfVer = $('rf ver', xml).text();
        var fpgaVer = $('fpga ver', xml).text();
        var azVer = $('az_el ver', xml).text();
        var skewVer = $('skew_xaz ver', xml).text();
        var lnbName = $('lnb name', xml).text();
        var lnbVer = $('lnb ver', xml).text();
        var sensorSn = $('sensor sn', xml).text();
        var sensorVer = $('sensor ver', xml).text();

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
        $('.\\#sensor-sn', jQ).text(sensorSn);
        $('.\\#sensor-ver', jQ).text(sensorVer);
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