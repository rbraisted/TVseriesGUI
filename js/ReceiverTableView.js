!function(TVRO) {
	"use strict";

	var ReceiverTableView = function(jQ) {
		var self;

		var tableView = TVRO.TableView($('.\\#table-view', jQ))
			.onBuild(function(row, receiver) {
				$('.\\#receiver-name', row).text(receiver.name);
				$('.\\#receiver-id', row).text(receiver.id);
				row.toggleClass('$active', receiver.active);

				$('.\\#select-btn', row).click(function() {
					if (confirm('Are you sure you want to make '+receiver.name+' master?')) {
						TVRO.setMaster(receiver).then(function() {
							return built = TVRO.getReceivers();
						}).then(function(receivers) {
							tableView.setValues(receivers).build();
						});
					}
				});

				TVRO.getAutoswitchStatus().then(function(xml) {
					var service = $('service', xml).text();
					var receiverType = 'IP Autoswitch';
					var receiverIdType = 'Serial #';
					if (service === 'DIRECTV') {
						receiverType = 'Receiver';
						receiverIdType = 'IP Address';
					}
					$('.\\#receiver-name-label', row).text(receiverType);
					$('.\\#receiver-id-label', row).text(receiverIdType);
					return TVRO.getHubReceiver();
				}).then(function(hub) {
					if (receiver.id === hub.id) $('.\\#receiver-name-label', row).text('TV-Hub');
					row.toggleClass('$hub', receiver.id === hub.id);
					return TVRO.getMasterReceiver();
				}).then(function(master) {
					row.toggleClass('$master', receiver.id === master.id);
				});
			});

    var reload = function() {
      TVRO.getReceivers().then(function(receivers) {
        tableView.setValues(receivers).build();
      });
    };

    return self = _.merge(tableView, {
      reload: reload
    });
	};

	TVRO.ReceiverTableView = ReceiverTableView;

}(window.TVRO);