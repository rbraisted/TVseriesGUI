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
    };

		return self = {
      reload: reload
    };
	};

	TVRO.SystemInfoView = SystemInfoView;

}(window.TVRO);