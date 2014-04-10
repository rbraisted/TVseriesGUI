!function(TVRO) {
  "use strict";

	var SystemInfoView = function(jQ) {
		var self;

    var reload = function() {
      TVRO.getSystemInfo().then(function(systemInfo) {
        $('.\\#hub-sn', jQ).text(systemInfo.hubSn);
        $('.\\#hub-ver', jQ).text(systemInfo.hubVer);
        $('.\\#sat-ver', jQ).text(systemInfo.satVer);
        $('.\\#gprs-ip', jQ).text(systemInfo.gprsIp);
        $('.\\#diseqc-ver', jQ).text(systemInfo.diseqcVer);
        $('.\\#ipautosw-ver', jQ).text(systemInfo.ipautoswVer);
        $('.\\#ant-model', jQ).text(systemInfo.antModel);
        $('.\\#ant-sn', jQ).text(systemInfo.antSn);
        $('.\\#ant-ver', jQ).text(systemInfo.antVer);
        $('.\\#rf-ver', jQ).text(systemInfo.rfVer);
        $('.\\#fpga-ver', jQ).text(systemInfo.fpgaVer);
        $('.\\#az-ver', jQ).text(systemInfo.azVer);
        $('.\\#skew-ver', jQ).text(systemInfo.skewVer);
        $('.\\#lnb-name', jQ).text(systemInfo.lnbName);
        $('.\\#lnb-ver', jQ).text(systemInfo.lnbVer);
        $('.\\#sat-service', jQ).text(systemInfo.service);
        $('.\\#date-time', jQ).text(systemInfo.dateTime);
        $('.\\#webui-ver', jQ).text(systemInfo.webUIVer);
      });

      TVRO.getPower().then(function(xml) {
        var hubInputSupplyV = $('acu inputsupplyv', xml).text();
        var hubInput42V = $('acu input42v', xml).text();
        var hubInput24V = $('acu input24v', xml).text();
        var hubEight = $('acu eight', xml).text();
        var hubFive = $('acu five', xml).text();
        var hubThreeThree = $('acu three_three', xml).text();
        var hubOutput42V = $('acu output42v', xml).text();
        var hubOutput24V = $('acu output24v', xml).text();
        var hubTempCelsius = $('acu temp_celsius', xml).text();

        var antDc = $('au dc', xml).text();
        var antMotor = $('au motor', xml).text();
        var antEight = $('au eight', xml).text();
        var antFive = $('au five', xml).text();
        var antLnb = $('au lnb', xml).text();

        $('.\\#hub-inputsupplyv', jQ).text(hubInputSupplyV);
        $('.\\#hub-input42v', jQ).text(hubInput42V);
        $('.\\#hub-input24v', jQ).text(hubInput24V);
        $('.\\#hub-eight', jQ).text(hubEight);
        $('.\\#hub-five', jQ).text(hubFive);
        $('.\\#hub-three-three', jQ).text(hubThreeThree);
        $('.\\#hub-output42v', jQ).text(hubOutput42V);
        $('.\\#hub-output24v', jQ).text(hubOutput24V);
        $('.\\#hub-temp-celsius', jQ).text(hubTempCelsius);

        $('.\\#ant-dc', jQ).text(antDc);
        $('.\\#ant-motor', jQ).text(antMotor);
        $('.\\#ant-eight', jQ).text(antEight);
        $('.\\#ant-five', jQ).text(antFive);
        $('.\\#ant-lnb', jQ).text(antLnb);
      });
    };

		return self = {
      reload: reload
    };
	};

	TVRO.SystemInfoView = SystemInfoView;

}(window.TVRO);