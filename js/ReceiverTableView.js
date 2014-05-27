!function(TVRO) {
	"use strict";

	var ReceiverTableView = function(jQ) {
		var self;

		var tableView = TVRO.TableView($('.\\#table-view', jQ))
			.onBuild(function(row, receiver) {
				$('.\\#receiver-name', row).text(receiver.name);
				$('.\\#receiver-id', row).text(receiver.id);
				row.toggleClass('$active', receiver.active);

				$('.\\#select-btn', row).click(function(event) {
          if (!receiver.active || row.hasClass('$master')) return;
          event.stopPropagation();
          var confirmed = confirm('Are you sure you want to make ' + receiver.name + ' master?');
					if (confirmed) TVRO.setMasterReceiver(receiver).then(reload);
				});

        TVRO.getReceiverType().then(function(receiverType) {
          var receiverIdType = receiverType === 'Receiver' ? 'IP Address' : 'Serial #';
          $('.\\#receiver-name-label', row).text(receiverType);
          $('.\\#receiver-id-label', row).text(receiverIdType);
        }).then(TVRO.getHubReceiver).then(function(hub) {
					if (receiver.id === hub.id) $('.\\#receiver-name-label', row).text('TV-Hub');
					row.toggleClass('$hub', receiver.id === hub.id);
				});

        TVRO.getMasterReceiver().then(function(master) {
					row.toggleClass('$master', receiver.id === master.id);
				});
			});

		var reload = function() {

		  TVRO.getSatelliteService().then(function(xml) {
		    var service = $('service', xml).text();
		    $('.\\#directv', jQ).toggle(service === 'DIRECTV');
		    $('.\\#ip-autoswitch', jQ).toggle(service !== 'DIRECTV');
		    return service;
		  }).then(function(service){
		    TVRO.getReceivers(service).then(function(receivers){
		      tableView.setValues(receivers).build();
		    });
		  });
		};

    return self = _.merge(tableView, {
      reload: reload
    });
	};

	TVRO.ReceiverTableView = ReceiverTableView;

}(window.TVRO);