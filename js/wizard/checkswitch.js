!function(TVRO) {
  "use strict";

  var ConfigView = function(jQ) {
    var nextBtn = $('.\\#next-btn', jQ).click(function() {
      TVRO.setCheckswitchMode({
        enable: 'N'
      });
    });
    
    var prevBtn = $('.\\#prev-btn', jQ).click(function() {
        window.location = '/wizard/system.php#/other-system-config';
    });

    return {
      startVideo: function() {
        $('iframe', jQ).attr('src', '/media/CheckSwitchTest.mp4');
      },

      stopVideo: function() {
        $('iframe', jQ).attr('src', '');
      }
    };
  };



  var CompleteView = function(jQ) {
    var nextBtn = $('.\\#next-btn', jQ).click(function() {
      window.location = '/wizard/activation.php';
    });

    var prevBtn = $('.\\#prev-btn', jQ).click(function() {
      TVRO.setCheckswitchMode({
        enable: 'Y'
      });
    });
  };

  TVRO.ConfigView = ConfigView;
  TVRO.CompleteView = CompleteView;

}(window.TVRO);

$(function() {
  var config1View = TVRO.ConfigView(
    $('.\\#config-1-view')
      .find('.\\#next-btn')
        .click(function() {
          window.location.hash = '/complete-1';
        })
        .end()
  );

  var config2View = TVRO.ConfigView(
    $('.\\#config-2-view')
      .find('.\\#next-btn')
        .click(function() {
          window.location.hash = '/complete-2';
        })
        .end()
  );

  var config3View = TVRO.ConfigView(
    $('.\\#config-3-view')
      .find('.\\#next-btn')
        .click(function() {
          window.location.hash = '/complete-3';
        })
        .end()
  );

  var complete1View = TVRO.CompleteView(
    $('.\\#complete-1-view')
      .find('.\\#prev-btn')
        .click(function() {
          window.location.hash = '/config-1';
        })
        .end()
      .find('.\\#diagram-btn')
        .click(function() {
          window.location.hash = '/diagram-1';
        })
        .end()
  );

  var complete2View = TVRO.CompleteView(
    $('.\\#complete-2-view')
      .find('.\\#prev-btn')
        .click(function() {
          window.location.hash = '/config-2';
        })
        .end()
      .find('.\\#diagram-btn')
        .click(function() {
          window.location.hash = '/diagram-2';
        })
        .end()
  );

  var complete3View = TVRO.CompleteView(
    $('.\\#complete-3-view')
      .find('.\\#prev-btn')
        .click(function() {
          window.location.hash = '/config-3';
        })
        .end()
      .find('.\\#diagram-btn')
        .click(function() {
          window.location.hash = '/diagram-3';
        })
        .end()
  );

  //  popup close btns
  $('.\\#diagram-1-view .\\#back-btn').click(function() { window.location.hash = '/complete-1'; });
  $('.\\#diagram-2-view .\\#back-btn').click(function() { window.location.hash = '/complete-2'; });
  $('.\\#diagram-3-view .\\#back-btn').click(function() { window.location.hash = '/complete-3'; });

  TVRO.onHashChange(function(hash) {
    if (!hash) window.location.hash = '/config-1';

    if (hash === '/config-1') config1View.startVideo();
    else config1View.stopVideo();

    if (hash === '/config-2') config2View.startVideo();
    else config2View.stopVideo();

    if (hash === '/config-3') config3View.startVideo();
    else config3View.stopVideo();

    document.body.className = hash;
  });

  TVRO.reload();
});