$(function() {
  TVRO.debug = 2;

  var headerView = TVRO.HeaderView($('.\\#header-view'));

  var groupMode;

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
        .click(function() {
          var index = $('.\\#receiver-table-view .\\#edit-btn').index(this);
          var receiver = encode(receiverTableView.getValues()[index].id);
          window.location.hash = '/' + receiver;
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
          var receiver = encode(receiverEditView.getReceiver() ? '/' + receiverEditView.getReceiver().id : '');
          window.location.hash = receiver;
        })
        .end()
  );


  var reload = function() {
    headerView.reload();
    installedSatView.reload();

    if (groupMode) {
      TVRO.getAutoswitchEnabled().then(function(enabled) {
        $('.\\#manual-installed-group-view').toggle(!enabled);
        satSwitchingBtn.setOn(!enabled);
      });

      manualInstalledGroupView.reload();
      automaticInstalledGroupView.reload();
    }
  };

  // initialization

  receiverTableView.reload();

  TVRO.getReceiverType().then(function(receiverType) {
    $('.\\#receiver-type').text(receiverType);
  });

  TVRO.getInstalledGroup().then(function(group) {
    //  if group mode, show sat switching, autoswitch master, installed group
    groupMode = group && group.getSats().length > 1;
    $('.\\#sat-switching-view').toggle(groupMode);
    $('.\\#manual-installed-group-view').toggle(groupMode);
    $('.\\#automatic-installed-group-view').toggle(groupMode);
    setInterval(reload, 3000);
    reload();
  });


  //  routing

  TVRO.onHashChange(function(hash) {

    //  ''
    //  /TVHUB
    //  /new
    //  /TVHUB/edit

    var split = _.rest(hash.split('/'));

    if (!hash) {
      document.body.className = '';

    } else if (hash.match(/\/.*\/edit/)) {
      receiverEditView.setReceiver({ id: split[0] });
      document.body.className = '/receiver/edit';

    } else if (hash.match(/\/new/)) {
      receiverEditView.createNew();
      document.body.className = '/receiver/edit';

    } else if (hash.match(/\/.*/)) {
      receiverInfoView.setReceiver({ id: split[0] });
      document.body.className = '/receiver';
    }
  });

  TVRO.reload();
});