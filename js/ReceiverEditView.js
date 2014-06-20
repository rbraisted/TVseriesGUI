!function(TVRO){
  "use strict";

  var ReceiverEditView = function(jQ) {
    var self;
    var receiver;
    var isNew = false;

    var wizardBtn = $('.\\#wizard-btn', jQ).click(function() {
      TVRO.setWizardComplete(false)
        .then(function() { window.location = '/wizard'; });
    });

    //  install receiver
    var saveBtn = $('.\\#save-btn', jQ).click(function() {
      var name = $('.\\#receiver-name', jQ).val();
      var id = $('.\\#receiver-id', jQ).val();

      if (!name || !id) return alert('You must fill out all fields.');

      TVRO.getReceiverType().then(function(receiverType) {
        var newReceiver = { name: name };
        if (receiverType === 'Receiver'){
          newReceiver.ip = id;
          newReceiver.type = receiverType;
        } else {
          newReceiver.sn = id;
          newReceiver.type = receiverType;
        }

        if (isNew) {
          TVRO.addReceiver(newReceiver).then(function() {
            window.location.hash = '/' + newReceiver.id;
          });
        } else {
          TVRO.removeReceiver(receiver).then(function() {
            TVRO.addReceiver(newReceiver).then(function() {
              window.location.hash = '/' + newReceiver.id;
            });
          });
        }
      });
    });

    var deleteBtn = $('.\\#delete-btn', jQ).click(function() {
      //  if !predefined, ask for confirmation
      var confirmed = receiver.predefined ? false : confirm('Are you sure you want to delete ' + receiver.name + '?');
      if (confirmed) TVRO.removeReceiver(receiver).then(function() {
        window.location.hash = '';
      });
    });

    TVRO.getReceiverType().then(function(receiverType) {
      var receiverIdType = receiverType === 'Receiver' ? 'IP Address' : 'Serial #';
      $('.\\#receiver-name-label', jQ).text(receiverType);
      $('.\\#receiver-id-label', jQ).text(receiverIdType);
    });

    TVRO.getService().then(function(service) {
      $('.\\#directv', jQ).toggle(service === 'DIRECTV');
      $('.\\#ip-autoswitch', jQ).toggle(service !== 'DIRECTV');      
    });

    return self = {
      createNew: function() {
        isNew = true;
        jQ.removeClass('$active $hub $master');
        $('.\\#receiver-name', jQ).val('');
        $('.\\#receiver-id', jQ).val('');
      },

      setReceiver: function(arg) {
        isNew = false;
        TVRO.getReceivers().then(function(receivers) {
          receiver = _.find(receivers, { id: arg.id });
          $('.\\#receiver-name', jQ).val(receiver.name);
          $('.\\#receiver-id', jQ).val(receiver.id);
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

  TVRO.ReceiverEditView = ReceiverEditView;

}(window.TVRO);
