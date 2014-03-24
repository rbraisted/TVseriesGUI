!function(exports) {
	var AdvancedSettingsView = function(jQ) {
		var self;

		var modeToggle = function(mode) {
			return function(isEnabled) {
				var params = {};
				params[mode] = (isEnabled ? 'ON' : 'OFF');
				tvro.ws.setAntennaConfig(params).then(updateTogBtns);
			}
		}

		var refresh = function() {
			tvro.ws.getAntennaConfig().then(function(xml) {
				var sleepModeEnabled = $('sleep', xml).text() === 'ON';
				var sidelobeModeEnabled = $('sidelobe', xml).text() === 'ON';
				sleepTogBtn.val(sleepModeEnabled);
				sidelobeTogBtn.val(sidelobeModeEnabled);
			});
		}

		var sleepTogBtn = tvro.toggleBtn(jQ.find('.\\#sleep-tog-btn'))
			.click(modeToggle('sleep'));

		var sidelobeTogBtn = tvro.toggleBtn(jQ.find('.\\#sidelobe-tog-btn'))
			.click(modeToggle('sidelobe'));

		return self = {
      refresh: refresh
    }
	}

	exports.AdvancedSettingsView = AdvancedSettingsView;
}(window);