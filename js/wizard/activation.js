$(function() {

  $('.\\#next-btn').click(function() {
    window.location.hash = '/complete-activation';
  });

  $('.\\#dtv-prev-btn').click(function() {
	    window.location = '/wizard/service.php#/directv';
  });

  $('.\\#exit-btn').click(function() {
    window.location = '/home.php';
  });

  TVRO.onHashChange(function(hash) {
    if (!hash) TVRO.getService().then(function(service) {
      if (service === 'DIRECTV') window.location.hash = '/directv-activation';
      else if (service === 'DISH') window.location.hash = '/dish-activation';
      else if (service === 'BELL') window.location.hash = '/bell-activation';
      else window.location.hash = '/generic-activation';
    });

    document.body.className = hash;
  });

  TVRO.reload();
});