$(function() {

  var prevBtn = $('.\\#prev-btn').click(function() {
    window.history.go(-1);
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
          var receiver = encode(receiverEditView.getReceiver() ? receiverEditView.getReceiver().id : '');
          window.location.hash = (receiver ? '/' + receiver : '');
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