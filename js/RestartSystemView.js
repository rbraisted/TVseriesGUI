!function(TVRO) {
  "use strict";

  var RestartSystemView = function(jQ) {
    var self;

    var antennaBtn = $('.\\#antenna-btn', jQ).click(function() {
      var confirmed = confirm('Are you sure you want to restart the antenna?');
      if (confirmed) TVRO.rebootAntenna();
    });

    var allBtn = $('.\\#all-btn', jQ).click(function() {
      var confirmed = confirm('Are you sure you want to restart the system and the antenna?');
      if (confirmed) TVRO.rebootAll();
    });

    return self = {};
  };

  TVRO.RestartSystemView = RestartSystemView;

}(window.TVRO);