!function(exports) {
	"use strict";

	var ReceiverTableView = function(jQ) {
		var self;

		var table = tvro.table($('.\\#receiver-table', jQ))
			.build(function(row, receiver) {
				$('.\\#receiver-name', row).text(receiver.name);
				$('.\\#receiver-id', row).text(receiver.id);
				row.toggleClass('$active', receiver.active);

				$('.\\#select-btn', row).click(function() {
					if (confirm('Are you sure you want to make '+receiver.name+' master?')) {
						tvro.data.setMaster(receiver).then(function() {
							return built = tvro.data.getReceivers();
						}).then(function(receivers) {
							table.vals(receivers).build();
						});
					}
				});

				tvro.ws.getAutoswitchStatus().then(function(xml) {
					var service = $('service', xml).text();
					var receiverType = 'IP Autoswitch';
					var receiverIdType = 'Serial #';
					if (service === 'DIRECTV') {
						receiverType = 'Receiver';
						receiverIdType = 'IP Address';
					}
					$('.\\#receiver-name-label', row).text(receiverType);
					$('.\\#receiver-id-label', row).text(receiverIdType);
					return tvro.data.getHub();
				}).then(function(hub) {
					if (receiver.id === hub.id) $('.\\#receiver-name-label', row).text('TV-Hub');
					row.toggleClass('$hub', receiver.id === hub.id);
					return tvro.data.getMaster();
				}).then(function(master) {
					row.toggleClass('$master', receiver.id === master.id);
				});
			});

		var built = tvro.data.getReceivers().then(function(receivers) {
			table.vals(receivers).build();
		});

		return self = _.merge(table, {
			receivers: table.vals,
			receiver: table.val,
			built: function() {
				return built;
			}
		});
	}

	exports.ReceiverTableView = ReceiverTableView;

}(window);