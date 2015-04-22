!function(TVRO) {
  "use strict";

  var HeaderView = function(jQ) {
    var self;

    //  goes to wizard if wizard has not been completed
    //  goes to home if wizard has been completed
    var homeBtn = $('.\\#home-btn', jQ).click(function() {
//      window.location = '/';
		if (TVRO.getShellMode()) TVRO.sendShellCommand('restart');
    });

    var navJq = $('.\\#nav-view');
    var navBtn = $('.\\#nav-btn', jQ).click(function() {
      statusJq.removeClass('$expanded');
      navJq.toggleClass('$expanded');
    });

    var statusJq = $('.\\#status-view');
    var statusBtn = $('.\\#status-btn', jQ).click(function() {
      reload();
      navJq.removeClass('$expanded');
      statusJq.toggleClass('$expanded');
    });

    var reload = function() {
      TVRO.getAntennaStatus().then(function(xml) {
        var types = ['power', 'acu', 'antenna'];
        _.forEach(types, function(type) {
          var color = $('led_' + type + ' color', xml).text();
          var state = $('led_' + type + ' state', xml).text();
          var message = $('led_' + type + ' message', xml).text();
          // var title = {
          //   'power': 'Power: ',
          //   'acu' : 'TV-Hub: ',
          //   'antenna' : 'Antenna: '
          // }[type] + message;

          $('.\\#' + type + '-status')
            .removeClass('$green $orange $red')
            .addClass('$' + color.toLowerCase())
            .removeClass('$on $off $flash')
            .addClass('$' + state.toLowerCase());
            // .attr('title', title);

          $('.\\#' + type + '-status', statusJq)
            .text(message);
        });
      });
    };

    var flashInterval = setInterval(function() {
      var types = ['power', 'acu', 'antenna'];
      _.forEach(types, function(type) {
        var light = $('.\\#' + type + '-status', jQ);
        if (light.hasClass('$flash')) light.toggleClass('$off');
      });
    }, 500);

    //  do once

    var pathname = window.location.pathname.replace('/', '').replace('.php', '');
    if (pathname.indexOf('wizard') === -1) {
      $('.\\#' + pathname + '-btn', navJq).addClass('$selected');
    }

    return self = {
      reload: reload
    };
  };

  TVRO.HeaderView = HeaderView;

}(window.TVRO);