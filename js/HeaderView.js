!function(TVRO) {
  "use strict";

  var HeaderView = function(jQ) {
    var self;

    var homeBtn = $('.\\#home-btn', jQ).click(function() {
      //  index.php
      //  goes to wizard if wizard has not been completed
      //  goes to home if wizard has been completed
      window.location = '/';
    });

    //  contains the nav-btns
    var navJq = $('.\\#nav-view');

    //  navBtn here is not one of the nav-btns (ie home, sats, etc)
    //  but rather the button that toggles the nav on and off
    //  in css we hide this button at desktop sizes
    var navBtn = $('.\\#nav-btn', jQ).click(function() {
      statusJq.removeClass('$expanded');
      navJq.toggleClass('$expanded');
    });

    //  status dropdown view
    var statusJq = $('.\\#status-view');

    //  button to toggle status dropdown view
    var statusBtn = $('.\\#status-btn', jQ).click(function() {
      reload();
      navJq.removeClass('$expanded');
      statusJq.toggleClass('$expanded');
    });

    var walkAnimationInverval;
    var startWalkAnimation = function() {
      if (walkAnimationInverval) return;

      var currentLightIndex = -1;

      $('.\\#power-status, .\\#acu-status, .\\#antenna-status')
        .removeClass('$green $orange $red')
        .removeClass('$on $off $flash');

      $('.\\#power-status, .\\#acu-status, .\\#antenna-status', statusJq)
        .text('...');

      var lights = $('.\\#power-status, .\\#acu-status, .\\#antenna-status', '.\\#status-btn')
        .addClass('$orange $off');

      walkAnimationInverval = setInterval(function() {
        currentLightIndex = (currentLightIndex + 1) % lights.length;
        lights.addClass('$off');
        lights.eq(currentLightIndex).removeClass('$off');
      }, 500);
    };

    var stopWalkAnimation = function() {
      clearInterval(walkAnimationInverval);
      walkAnimationInverval = undefined;
    };

    var reload = function() {
      TVRO.getAntennaStatus().then(function(xml) {
        //  if <acu><state> is FLASHING
        //  show #flashing-view and display <line1> and <line2> text
        //  and animate an orange "walk" over the 3 status lights
        var isFlashing = $('acu state:first', xml).text() === 'FLASHING';
        var line1 = $('acu line1', xml).text();
        var line2 = $('acu line2', xml).text();

        $('.\\#flashing-view')
          .toggle(isFlashing)
          .find('.\\#line-1')
            .text(line1)
            .end()
          .find('.\\#line-2')
            .text(line2)
            .end();

        if (isFlashing) {
          startWalkAnimation();
        } else {
          stopWalkAnimation();

          //  each of the lights
          var types = ['power', 'acu', 'antenna'];

          //  for each of the lights,
          //  get the color, state, and message to display
          _.forEach(types, function(type) {
            var color = $('led_' + type + ' color', xml).text().toLowerCase();
            var state = $('led_' + type + ' state', xml).text().toLowerCase();
            var message = $('led_' + type + ' message', xml).text();

            //  update the light color and state
            //  happens in both the status dropdown and the little
            //  indicator in the top left corner
            var statusLight = $('.\\#' + type + '-status')
              .removeClass('$green $orange $red')
              .removeClass('$on $off $flash')

            if (!isFlashing) {
              statusLight
                .addClass('$' + color)
                .addClass('$' + state);
            }

            //  update the message
            //  happens only in the status dropdown otherwise our
            //  indicator is going to filled with jumbled text
            $('.\\#' + type + '-status', statusJq)
              .text(message);
          });
        }

      });
    };

    //  i would have liked to have done this purely in css but some of the
    //  css animation/transition tricks don't work so well or are not supported
    //  well enough across all the browsers for a pure css solution
    //  instead we check each light if it is $flash and if so we toggle $off
    var flashInterval = setInterval(function() {
      var types = ['power', 'acu', 'antenna'];
      _.forEach(types, function(type) {
        var light = $('.\\#' + type + '-status', jQ);
        if (light.hasClass('$flash')) light.toggleClass('$off');
      });
    }, 500);

    //  this is pretty ugly but it works -
    //  get the pathname and highlight the button in the nav that represents
    //  the page we are viewing
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