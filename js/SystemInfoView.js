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
      
      TVRO.getPowerInfo().then(function(powerInfo) {
        $('.\\#hub-inputsupplyv', jQ).text(powerInfo.hubInputSupplyV || 'N/A');
        $('.\\#hub-input42v', jQ).text(powerInfo.hubInput42V || 'N/A');
        $('.\\#hub-eight', jQ).text(powerInfo.hubEight || 'N/A');
        $('.\\#hub-five', jQ).text(powerInfo.hubFive || 'N/A');
        $('.\\#hub-three-three', jQ).text(powerInfo.hubThreeThree || 'N/A');
        $('.\\#hub-output42v', jQ).text(powerInfo.hubOutput42V || 'N/A');
        $('.\\#hub-output24v', jQ).text(powerInfo.hubOutput24V || 'N/A');
        $('.\\#hub-temp-celsius', jQ).text(powerInfo.hubTempCelsius || 'N/A');
        $('.\\#ant-dc', jQ).text(powerInfo.antDc || 'N/A');
        $('.\\#ant-motor', jQ).text(powerInfo.antMotor || 'N/A');
        $('.\\#ant-eight', jQ).text(powerInfo.antEight || 'N/A');
        $('.\\#ant-five', jQ).text(powerInfo.antFive || 'N/A');
        $('.\\#ant-lnb', jQ).text(powerInfo.antLnb || 'N/A');
      });
    };

		return self = {
      reload: reload
    };
	};

	TVRO.SystemInfoView = SystemInfoView;

}(window.TVRO);