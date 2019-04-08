!function(TVRO) {
  "use strict";

  var ConfigView = function(jQ) {
    var nextBtn = $('.\\#next-btn', jQ).click(function() {
      TVRO.setCheckswitchMode(false);
    });
    
    var prevBtn = $('.\\#prev-btn', jQ).click(function() {
      /*Changes Start - UHD7 - STWA-309*/
      TVRO.getAntModel().then(function(model) {
        if(model === 'UHD7') {
          window.location = '/wizard/service.php';
        } else {
          window.location = '/wizard/system.php#/other-system-config';
        }
      });
      /*Changes End - UHD7 - STWA-309*/
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
    	if(window.location.hash.match('\complete-3')) {
    		window.location = '/wizard/autoswitch.php';
    	} else {
            window.location = '/wizard/activation.php';
        }
    });

    var prevBtn = $('.\\#prev-btn', jQ).click(function() {
      TVRO.setCheckswitchMode(true);
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