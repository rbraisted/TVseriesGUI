!function(TVRO) {
  "use strict";

  var HeaderView = function(jQ) {
    var self;

    var statusJq = $('.\\#status-view');
    var navJq = $('.\\#nav-view');

    var statusBtn = $('.\\#status-btn', jQ).click(function() {
      TVRO.getAntennaStatus().then(function(xml) {

      });

      navJq.removeClass('$expanded');
      statusJq.toggleClass('$expanded');
    });

    var navBtn = $('.\\#nav-btn', jQ).click(function() {
      statusJq.removeClass('$expanded');
      navJq.toggleClass('$expanded');
    });

    //  goes to wizard if wizard has not been completed
    //  goes to home if wizard has been completed
    var homeBtn = $('.\\#home-btn', jQ).click(function() {

    });

    return self = {};
  };

  TVRO.HeaderView = HeaderView;

}(window.TVRO);