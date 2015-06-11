$(function() {

  var prevBtn = $('.\\#prev-btn').click(function() {
	  Promise.all(
			  TVRO.getLnbType(),
			  TVRO.getService()
	  ).then(function(res) {
		  var lnbType    = res[0];
		  var satService = res[1];
		  if (satService === 'DISH' || satService === 'BELL') {
			  window.location = '/wizard/checkswitch.php#/complete-3';
		  } else if (satService === 'DIRECTV') {
			  window.location = '/wizard/service.php/directv#/directv';
		  } else if (lnbType === 'linear'){
			  window.location = '/wizard/system.php#/linear-system-config';
		  }
	  });
  });

  var nextBtn = $('.\\#next-btn').click(function() {
    window.location = '/wizard/activation.php';
  });

  var receiverTableView = TVRO.ReceiverTableView(
    $('.\\#receiver-table-view')
      .find('.\\#edit-btn')
        .click(function(event) {
          event.stopPropagation();
          var index = $('.\\#receiver-table-view .\\#edit-btn').index(this);
          var receiver = encode(receiverTableView.getValues()[index].id);
          window.location.hash = '/' + receiver + '/edit';
        })
        .end()
  ).onClick(function(receiver) {
    window.location.hash = '/' + encode(receiver.id);
  });

  var receiverInfoView = TVRO.ReceiverInfoView(
    $('.\\#receiver-info-view')
      .find('.\\#back-btn')
        .click(function() {
          window.location.hash = '';
        })
        .end()
      .find('.\\#edit-btn')
        .click(function() {
          var receiver = encode(receiverInfoView.getReceiver().id);
          window.location.hash = '/' + receiver + '/edit';
        })
        .end()
  );

  var receiverEditView = TVRO.ReceiverEditView(
    $('.\\#receiver-edit-view')
      .find('.\\#back-btn')
        .click(function() {
        	// Since both edit and new screens are an edit screen look for new
        	// hash to navigate back to the correct location.
        	if(location.hash.match(/\/new/)){
        		window.location.hash = '';
        	}else{
                var receiver = encode(receiverEditView.getReceiver() ? receiverEditView.getReceiver().id : '');
                window.location.hash = (receiver ? '/' + receiver : '');
        	}
        })
        .end()
  );

  var createReceiverBtn = $('.\\#new-btn').click(function(argument) {
    window.location.hash = '/new/edit';
  });



  //  init

  receiverTableView.reload();

  TVRO.getReceiverType().then(function(receiverType) {
    $('.\\#receiver-type').text(receiverType);
  });

  TVRO.onHashChange(function(hash) {
    var split = _.rest(hash.split('/'));
    
    receiverTableView.reload();

    if (!hash) {
      document.body.className = '';

    } else if (hash.match(/\/new/)) {
      receiverEditView.createNew();
      document.body.className = '/receiver/edit';

    } else if (hash.match(/\/edit/)) {
      receiverEditView.setReceiver({ id: split[0] });
      document.body.className = '/receiver/edit';

    } else if (hash.match(/\/.*/)) {
      receiverInfoView.setReceiver({ id: split[0] });
      document.body.className = '/receiver';
    }
  });

  TVRO.reload();
});