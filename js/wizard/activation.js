$(function() {

  $('.\\#next-btn').click(function() {
    TVRO.setWizardComplete(true)
      .then(function() { window.location.hash = '/complete-activation'; });
  });

  $('.\\#prev-btn').click(function() {
    Promise.all(
      TVRO.getLnbType(),
      TVRO.getLnbPart(),
      TVRO.getService()
    ).then(function(res) {
      var lnbType = res[0];
      var isTriAmericas = res[1] === '19-0577';
      var service = res[2];
      
      if ((lnbType === 'circular') && (service === 'DIRECTV')) {
        if (isTriAmericas) {
          window.location = '/wizard/service.php#/tri-am-group';
        } else {
          TVRO.getAntModel().then(function(model) {
            if(model === 'UHD7') {
             // window.location = '/wizard/service.php';
             window.history.go(-2);
            } else {
              window.location = '/wizard/service.php#/directv'; //directv
            }
          });
          /*Changes End - UHD7 - STWA-305 and STWA-306*/
        }
      } else if ((lnbType === 'circular') && (service === 'OTHER')) {
        TVRO.getAntModel().then(function(model) {
          if(model === 'UHD7') {
            window.history.go(-2);
          } else {
            window.location = '/wizard/satellites.php'; //other circular select sat
          }
        });
      } else if (service === 'DISH' || service === 'BELL') {
        TVRO.getAntModel().then(function(model) {
            if(model === 'UHD7') {
             window.history.go(-2);
            } else {
              window.location = '/wizard/satellites.php'; //other circular select sat
            }
          });        
      } else {
      	// This handles Linear TV1,TV3,TV5 Manual (Skew);
      	// Linear TV5 & TV6
      	// Circular DISH/Bell
      	window.location = '/wizard/system.php';
      }
    });
  });

  $('.\\#exit-btn').click(function() {
    window.location = '/home.php';
  });

  TVRO.onHashChange(function(hash) {
    if (!hash) {
      TVRO.getService().then(function(service) {
        if (service === 'DIRECTV') window.location.hash = '/directv-activation';
        else if (service === 'DISH') window.location.hash = '/dish-activation';
        else if (service === 'BELL') window.location.hash = '/bell-activation';
        else window.location.hash = '/generic-activation';
      });
    }
    document.body.className = hash;
  });

  TVRO.reload();
});
