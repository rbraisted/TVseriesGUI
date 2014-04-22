!function(TVRO) {
  "use strict";

	var SystemInfoView = function(jQ) {
		var self;

    var reload = function() {
      TVRO.getSystemInfo().then(function(systemInfo) {
        $('.\\#hub-sn', jQ).text(systemInfo.hubSn || 'N/A');
        $('.\\#hub-ver', jQ).text(systemInfo.hubVer || 'N/A');
        $('.\\#sat-ver', jQ).text(systemInfo.satVer || 'N/A');
        $('.\\#gprs-ip', jQ).text(systemInfo.gprsIp || 'N/A');
        $('.\\#diseqc-ver', jQ).text(systemInfo.diseqcVer || 'N/A');
        $('.\\#ipautosw-ver', jQ).text(systemInfo.ipautoswVer || 'N/A');
        $('.\\#ant-model', jQ).text(systemInfo.antModel || 'N/A');
        $('.\\#ant-sn', jQ).text(systemInfo.antSn || 'N/A');
        $('.\\#ant-ver', jQ).text(systemInfo.antVer || 'N/A');
        $('.\\#rf-ver', jQ).text(systemInfo.rfVer || 'N/A');
        $('.\\#fpga-ver', jQ).text(systemInfo.fpgaVer || 'N/A');
        $('.\\#az-ver', jQ).text(systemInfo.azVer || 'N/A');
        $('.\\#skew-ver', jQ).text(systemInfo.skewVer || 'N/A');
        $('.\\#lnb-name', jQ).text(systemInfo.lnbName || 'N/A');
        $('.\\#lnb-ver', jQ).text(systemInfo.lnbVer || 'N/A');
        $('.\\#sat-service', jQ).text(systemInfo.service || 'N/A');
        $('.\\#date-time', jQ).text(systemInfo.dateTime || 'N/A');
        $('.\\#webui-ver', jQ).text(systemInfo.webUIVer || 'N/A');
      });

      TVRO.getPower().then(function(xml) {
        var hubInputSupplyV = $('acu inputsupplyv', xml).text();
        var hubInput42V = $('acu input42v', xml).text();
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

        $('.\\#hub-inputsupplyv', jQ).text(hubInputSupplyV || 'N/A');
        $('.\\#hub-input42v', jQ).text(hubInput42V || 'N/A');
        $('.\\#hub-eight', jQ).text(hubEight || 'N/A');
        $('.\\#hub-five', jQ).text(hubFive || 'N/A');
        $('.\\#hub-three-three', jQ).text(hubThreeThree || 'N/A');
        $('.\\#hub-output42v', jQ).text(hubOutput42V || 'N/A');
        $('.\\#hub-output24v', jQ).text(hubOutput24V || 'N/A');
        $('.\\#hub-temp-celsius', jQ).text(hubTempCelsius || 'N/A');

        $('.\\#ant-dc', jQ).text(antDc || 'N/A');
        $('.\\#ant-motor', jQ).text(antMotor || 'N/A');
        $('.\\#ant-eight', jQ).text(antEight || 'N/A');
        $('.\\#ant-five', jQ).text(antFive || 'N/A');
        $('.\\#ant-lnb', jQ).text(antLnb || 'N/A');
      });
    };

		return self = {
      reload: reload
    };
	};

	TVRO.SystemInfoView = SystemInfoView;

}(window.TVRO);