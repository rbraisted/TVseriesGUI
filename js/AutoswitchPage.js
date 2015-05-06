$(function() {

  var headerView = TVRO.HeaderView($('.\\#header-view'));

  //  $on === isManual
  var satSwitchingBtn = TVRO.ToggleBtn($('.\\#sat-switching-btn'))
    .onClick(function(isManual) {
      TVRO.setAutoswitchEnabled(!isManual).then(reload);
    });

  var installedSatView = TVRO.InstalledSatView($('.\\#installed-sat-view'));
  var manualInstalledGroupView = TVRO.InstalledGroupView($('.\\#manual-installed-group-view'));
  var automaticInstalledGroupView = TVRO.InstalledGroupView($('.\\#automatic-installed-group-view'));

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
	var windowHeight = $(window).height();
	var variableHeight = ((windowHeight*31)/100);
	
	var popupHeight = windowHeight - variableHeight;
	$('.popup').height(popupHeight);
    window.location.hash = '/new/edit';
  });


  var reload = function() {
    headerView.reload();
    installedSatView.reload();

    TVRO.getGroupMode().then(function(groupMode) {
      if (!groupMode) return;

      TVRO.getAutoswitchEnabled().then(function(enabled) {
        $('.\\#manual-installed-group-view').toggle(!enabled);
        satSwitchingBtn.setOn(!enabled);
      });

      manualInstalledGroupView.reload();
      automaticInstalledGroupView.reload();
    });
  };

  // initialization

  receiverTableView.reload();

  TVRO.getReceiverType().then(function(receiverType) {
    $('.\\#receiver-type').text(receiverType);
  });

  TVRO.getGroupMode().then(function(groupMode) {
    //  if group mode, show sat switching, autoswitch master, installed group
    $('.\\#sat-switching-view').toggle(groupMode);
    $('.\\#manual-installed-group-view').toggle(groupMode);
    $('.\\#automatic-installed-group-view').toggle(groupMode);
    setInterval(reload, 3000);
    reload();
  });


  //  routing

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
