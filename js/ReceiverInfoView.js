!function(TVRO){
  "use strict";

  var ReceiverInfoView = function(jQ) {
    var self;
    var receiver;

    var selectBtn = $('.\\#select-btn', jQ).click(function() {
      var confirmed = receiver.active ? confirm('Are you sure you want to make ' + receiver.name + ' master?') : false;
      if (confirmed) TVRO.setMasterReceiver(receiver).then(TVRO.reload);
    });

    TVRO.getReceiverType().then(function(receiverType) {
      var receiverIdType = receiverType === 'Receiver' ? 'IP Address' : 'Serial #';
      $('.\\#receiver-name-label', jQ).text(receiverType);
      $('.\\#receiver-id-label', jQ).text(receiverIdType);
    });

    TVRO.getSatelliteService().then(function(xml) {
      var service = $('service', xml).text();
      $('.\\#directv', jQ).toggle(service === 'DIRECTV');
      $('.\\#ip-autoswitch', jQ).toggle(service !== 'DIRECTV');
    });

    return self = {
      setReceiver: function(arg) {
        TVRO.getReceivers().then(function(receivers) {
          receiver = _.find(receivers, { id: arg.id });
          $('.\\#receiver-name', jQ).text(receiver.name);
          $('.\\#receiver-id', jQ).text(receiver.id);
          jQ.toggleClass('$active', receiver.active);
        }).then(TVRO.getHubReceiver).then(function(hub) {
          if (receiver.id === hub.id) $('.\\#receiver-name-label', jQ).text('TV-Hub');
          jQ.toggleClass('$hub', receiver.id === hub.id);
        }).then(TVRO.getMasterReceiver).then(function(master) {
          jQ.toggleClass('$master', receiver.id === master.id);
        });
      
        return self;
      },

      getReceiver: function() {
        return receiver;
      }
    };
  };

  TVRO.ReceiverInfoView = ReceiverInfoView;

}(window.TVRO);