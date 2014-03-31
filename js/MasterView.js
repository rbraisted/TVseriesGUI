//  for the HomePage and AutoswitchPage sidebars
!function(TVRO) {
  "use strict";

	var MasterView = function(jQ) {
		var self;

    var masterDropdownBtn = $('.\\#master-btn', jQ).click(function() {
      masterDropdownView.show(masterDropdownBtn.offset());
    });

    var masterDropdownView = TVRO.DropdownView($('.\\#master-dropdown-view'))
      .onBuild(function(row, receiver) {
        $('.\\#dropdown-value', row).text(receiver.name);
      })
      .onClick(function(receiver) {
        TVRO.setMasterReceiver(receiver).then(reload);
      });

    var reload = function() {
      TVRO.getAutoswitchEnabled().then(function(enabled) {
        jQ.toggle(enabled);
      });

      TVRO.getReceiverType().then(function(receiverType) {
        $('.\\#receiver-type', jQ).text(receiverType);
      });

      TVRO.getMasterReceiver().then(function(master) {
        $('.\\#master-name', jQ).text(master.name);
        masterDropdownView.setValue(master)
      });

      TVRO.getReceivers().then(function(receivers) {
        masterDropdownView.setValues(receivers).build();
      });
    };

		return self = {
      reload: reload
		}
	}

	TVRO.MasterView = MasterView;

}(window.TVRO);