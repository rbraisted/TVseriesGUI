$(function() {

  $('.\\#next-btn').click(function() {
    TVRO.setWizardStatus({
        status: 'SUCCESS'
      }).then(function(){ window.location.hash = '/complete-activation';});
  });

  $('.\\#prev-btn').click(function() {
      Promise.all(
    	        TVRO.getAntennaVersions(),
    	        TVRO.getSatelliteService()
    	      ).then(function(xmls) {
    	        var lnbType = $('lnb polarization', xmls[0]).text();
                var isTriAmericas = $('lnb name', xmls[0]).text() === 'Tri-Americas Circular';
    	        var service = $('service', xmls[1]).text();

                if((lnbType === 'circular') && (service === 'DIRECTV')){
                  if(isTriAmericas){
                    window.location = '/wizard/service.php#/tri-am-group';
                  }else{
                    window.location = '/wizard/service.php#/directv'; //directv
                  }
     	        }else if ((lnbType === 'circular') && (service === 'OTHER')){
    	        	window.location = '/wizard/satellites.php'; //other circular select sat
    	        }else{
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
    if (!hash)
    {	
      TVRO.getSatelliteService()
        .then(function(xml) {
          service =  $('service', xml).text();
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