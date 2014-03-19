"use strict";

(function(tvro){

	var insSatView = function(jQ) {
		var
		insSatView,
		update = function() {
			tvro.data.getInstalledSat().then(function(sat) {
				$('.\\#sat-name', jQ).text(sat.name);
				$('.\\#sat-region', jQ).text(sat.region);
			});

			//	it's getAntennaStatus(params:Obj, recache:Bool)
			tvro.ws.getAntennaStatus(undefined, true).then(function(r) {
				$('.\\#ant-state', jQ).text($('antenna state', r).text());
				$('.\\#ant-bars', jQ).removeClass([
					'$0', '$1', '$2', '$3', '$4', '$5'
				]).addClass('$'+$('antenna bars', r).text());
			});
			
		},
		interval;

		return insSatView = {
			update: function(arg) {
				if (arg) {
					update();
					interval = setInterval(update, arg);
				} else {
					interval = false;
				}
				return insSatView;
			}
		}
	}

	tvro.insSatView = insSatView;

}(window.tvro));
//	??? invalid left hand assign ???
// }(window.tvro || window.tvro = {}));