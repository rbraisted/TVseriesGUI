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


/*

"use strict";

TVRO.AutoswitchPage = function() {
	var 
	webService = TVRO.WebService(),

	isDirecTV = false,

	receivers = [],
	masterReceiver = {},
	activeReceivers = [],



	autoswitchesTableView,
	AutoswitchesTableView = function() {
		var 
		self = $.apply($, arguments),
		table = TVRO.Table.apply(this, arguments),
		switchingModeBtn = TVRO.Toggle('[id ~= mode-btn ]', self),
		populateTable = function() {
			table.setData(receivers);

			$('[id ~= table-row ]', table).each(function(i) {
				var property = isDirecTV ? 'ip' : 'sn',
					receiver = receivers[i];
				$(this).toggleClass('is-master', receiver[property] === masterReceiver[property])
					.toggleClass('is-active', Boolean($(activeReceivers).filter(function() { return receiver[property] === this[property]; }).length));

				$('[id ~= name ]', this).eq(i).text(receiver.name);
				$('[id ~= serial-number ]', this).eq(i).text(receiver.sn);
				$('[id ~= ip ]', this).eq(i).text(receiver.ip);

				$('[id ~= view-btn ]', this).eq(i).click(function() {
					autoswitchView.loadReceiver(receiver);
					$(document.body).setClass('at-autoswitch-view');
				});

				$('[id ~= edit-btn ]', this).eq(i).click(function() {
					editView.loadReceiver(receiver);
					$(document.body).setClass('at-autoswitch-edit-view');
				});

				$('[id ~= select-btn ]', this).eq(i).click(function() {
					if (confirm('Make "'+receiver.name+'" Master?')) {
						$('[id ~= table-row ]', table)
							.removeClass('is-master')
							.has(this)
							.addClass('is-master');

						var params = (isDirecTV ? { ip_address: receiver.ip } : { sn: receiver.sn });
						webService.request('set_autoswitch_master', params, refresh);
					}
				});
			});
		},
		refresh = function() {
			//	using get_directv_service/get_autoswitch_configured_names,
			//	get the full list of devices
			webService.request(isDirecTV ? 'get_directv_service' : 'get_autoswitch_configured_names', function(response) {
				receivers = $(isDirecTV ? 'receiver' : 'autoswitch', response).map(function() { return TVRO.Autoswitch(this); }).toArray();

				//	using get_autoswitch_status, get the active subset
				webService.request('get_autoswitch_status', function(response) {
					masterReceiver = TVRO.Autoswitch($('master', response));
					activeReceivers = $(isDirecTV ? 'receiver' : 'autoswitch', response).map(function() { return TVRO.Autoswitch(this); }).toArray();
					populateTable();

					switchingModeBtn.toggleClass('is-on', $('enable:eq(0)', response).text() === 'Y');
				});
			});
		}

		switchingModeBtn.click(function(isManual) {
			webService.request('set_autoswitch_service', {
				enabled: (isManual ? 'N' : 'Y')
			}, refresh);
		});

		return $.extend({}, self, {
			refresh: refresh
		});
	},


	autoswitchView,
	AutoswitchView = function() {
		var 
		self = $.apply($, arguments),
		receiver = {},
		refresh = function() {
			var property = isDirecTV ? 'ip' : 'sn';
			self.toggleClass('is-master', receiver[property] === masterReceiver[property])
				.toggleClass('is-active', Boolean($(activeReceivers).filter(function() { return receiver[property] === this[property]; }).length));

			$('[id ~= serial-number ]', self).text(receiver.sn);
			$('[id ~= name ]', self).text(receiver.name);
			$('[id ~= ip ]', self).text(receiver.ip);
		}

		$('[id ~= back-btn ]', self).click(function() {
			autoswitchesTableView.refresh();
			$(document.body).setClass('at-autoswitches-view');
		});

		$('[id ~= edit-btn ]', self).click(function() {
			editView.loadReceiver(receiver);
			$(document.body).setClass('at-autoswitch-edit-view');
		});

		$('[id ~= select-btn ]', self).click(function() {
			if (confirm('Make "'+receiver.name+'" Master?')) {
				self.addClass('is-master');

				var params = (isDirecTV ? { ip_address: receiver.ip } : { sn: receiver.sn });
				webService.request('set_autoswitch_master', params);
			}
		});

		return $.extend({}, self, {
			loadReceiver: function() {
				receiver = arguments[0];
				refresh();
			}
		});
	},


	editView,
	EditView = function() {
		var 
		self = $.apply($, arguments),
		receiver = {},
		isNew = false,
		refresh = function() {
			$('[id ~= new ]', self).toggle(isNew);
			$('[id ~= old ]', self).toggle(!isNew);
			$('[id ~= serial-number ]', self).val(receiver.sn);
			$('[id ~= name ]', self).val(receiver.name);
			$('[id ~= ip ]', self).val(receiver.ip);
		}

		$('[id ~= delete-btn ]', self).click(function() {
			if (confirm('Remove '+(isDirecTV ? 'Receiver' : 'IP Autoswitch')+'?')) {
				var params = isDirecTV ? { ip_address: receiver.ip } : { sn: receiver.sn };
				webService.request(isDirecTV ? 'set_directv_service' : 'set_autoswitch_configured_names', $.extend(params, {
					command: 'DELETE',
					name: receiver.name
				}), function() {
					autoswitchesTableView.refresh();
					$(document.body).setClass('at-autoswitches-view');
				});
			}
		});

		$('[id ~= cancel-btn ]', self).click(function() {
			if (isNew) $(document.body).setClass('at-autoswitches-view');
			else $(document.body).setClass('at-autoswitch-view');
		});

		$('[id ~= save-btn ]', self).click(function() {
			if (confirm((isNew ? 'Add' : 'Edit')+' '+(isDirecTV ? 'Receiver' : 'IP Autoswitch')+'?')) {
				var add = function() {
					var params = isDirecTV ? { ip_address: $('[id ~= ip ]', self).val() } : { sn: $('[id ~= serial-number ]', self).val() };
					webService.request(isDirecTV ? 'set_directv_service' : 'set_autoswitch_configured_names', $.extend(params, {
						command: 'ADD',
						name: $('[id ~= name ]', self).val()
					}), function() {
						autoswitchView.loadReceiver({
							name: $('[id ~= name ]', self).val(),
							ip: $('[id ~= ip ]', self).val(),
							sn: $('[id ~= serial-number ]', self).val()
						});
						autoswitchesTableView.refresh();
						if (isNew) $(document.body).setClass('at-autoswitch-view');
						else $('[id ~= cancel-btn ]', self).click();
					});
				}

				if (isNew) {
					add();
				} else {
					//	delete the old entry (???)
					var params = isDirecTV ? { ip_address: receiver.ip } : { sn: receiver.sn };
					webService.request(isDirecTV ? 'set_directv_service' : 'set_autoswitch_configured_names', $.extend(params, {
						command: 'DELETE',
						name: receiver.name
					}), add);
				}
			}
		});

		return $.extend({}, self, {
			loadReceiver: function() {
				isNew = false;
				receiver = arguments[0];
				refresh();
			},
			loadNew: function() {
				isNew = true;
				receiver = {};
				refresh();
			}
		});
	}

	return {
		init: function() {
			$('[id ~= new-btn ]').click(function() {
				//	show the popup
				editView.loadNew();
				$(document.body).setClass('at-autoswitch-edit-view');
			});

			webService.request('get_autoswitch_status', function(response) {
				isDirecTV = $('service', response).text() === 'DIRECTV';
				if (isDirecTV) $('[id ~= not-directv ]').remove();
				else $('[id ~= directv ]').remove();

				autoswitchesTableView = AutoswitchesTableView('[id ~= autoswitches-view ]');
				autoswitchView = AutoswitchView('[id ~= autoswitch-view ]');
				editView = EditView('[id ~= autoswitch-edit-view ]');

				autoswitchesTableView.refresh();
			});
		}
	}
};

TVRO.page = TVRO.AutoswitchPage();
*/