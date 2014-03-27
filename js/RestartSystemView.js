!function(TVRO) {
  "use strict";

  var RestartSystemView = function(jQ) {
    var self;

    //  this may come back one day
    
    // var systemBtn = $('.\\#system-btn', jQ).click(function() {
    //   var confirmed = confirm('Are you sure you want to restart the system?');
    //   if (confirmed) TVRO.reboot({ sys: 'SBC' });
    // });

    var antennaBtn = $('.\\#antenna-btn', jQ).click(function() {
      var confirmed = confirm('Are you sure you want to restart the antenna?');
      if (confirmed) TVRO.reboot({ sys: 'ANT' });
    });

    var allBtn = $('.\\#all-btn', jQ).click(function() {
      var confirmed = confirm('Are you sure you want to restart the system and the antenna?');
      if (confirmed) TVRO.reboot({ sys: 'ALL' });
    });

    return self = {};
  };

  TVRO.RestartSystemView = RestartSystemView;

}(window.TVRO);