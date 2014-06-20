$(function() {

  $('.\\#next-btn').click(function() {
    TVRO.setWizardComplete(false)
      .then(function() { window.location.hash = '/complete-activation'; });
  });

  $('.\\#prev-btn').click(function() {
    Promise.all(
      TVRO.getLnbType(),
      TVRO.getLnbName(),
      TVRO.getService()
    ).then(function(res) {
      var lnbType = res[0];
      var isTriAmericas = res[1] === 'Tri-Americas Circular';
      var service = res[2];

      if ((lnbType === 'circular') && (service === 'DIRECTV')) {
        if (isTriAmericas) {
          window.location = '/wizard/service.php#/tri-am-group';
        } else {
          window.location = '/wizard/service.php#/directv'; //directv
        }
      } else if ((lnbType === 'circular') && (service === 'OTHER')) {
      	window.location = '/wizard/satellites.php'; //other circular select sat
      } else {
      	// This handles Linear TV1,TV3,TV5 Manual (Skew);
      	// Linear TV5 & TV6
      	// Tri Americas
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