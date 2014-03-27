//  requires TableView
!function(TVRO) {
  "use strict";

  var DropdownView = function(jQ) {
    var self;

    var tableView = TVRO.TableView(
      $('.\\#table-view', jQ)
        .find('.\\#table-row')
          .click(function() {
            jQ.hide();
          })  
          .end()
    ).onBuild(function(row, value) {
      $('.\\#dropdown-value', row).text(value);
    });

    $('.\\#close-btn', jQ).click(function() {
      jQ.hide();
    });

    //  merge with TableView
    return self = _.merge(tableView, {
      setTitle: function(arg) {
        $('.\\#dropdown-title', jQ).text(arg);
        return self;
      },

      show: function(offset) {
        jQ.show();
        if (offset) $('.\\#dropdown-content', jQ).offset(offset);
        return self;
      },

      hide: function() {
        jQ.hide();
        return self;
      }
    });
  };

  TVRO.DropdownView = DropdownView;

}(window.TVRO);