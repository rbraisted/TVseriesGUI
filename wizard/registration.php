<?
$wiz = true;
include $_SERVER['DOCUMENT_ROOT'] . '/base.php';
?>

<script type="text/javascript" src="/js/wizard/registration.js"></script>

<div class="view installer-id #installer-id-view">
  <div class="view-head">Installer Identification</div>
  <div class="headline">Who installed the TracVision System?</div>

  <div class="clear-table #table-view">
    <div class="table-row #table-row">
      <span class="table-col install-btn"></span><!--
    --><span class="table-col #value"></span>
    </div>
  </div>

  <div class="bottom-bar">
    <div class="prev-btn #prev-btn">Previous</div>
    <div class="next-btn #next-btn">Next</div>
  </div>
</div>

<div class="view diy-vessel-info #diy-vessel-info-view ">
  <div class="view-head">Vessel Information</div>
  <div class="form">
    <div class="label">Vessel Name *</div>
    <input required type="text" class="input #vessel">

    <div class="label">Vessel Owner *</div>
    <input required type="text" class="input #owner">

    <div class="label">Main Vessel Contact *</div>
    <input required type="text" class="input #contact">

    <div class="label">Vessel Contact Phone Number *</div>
    <input required type="text" class="input #phone">

    <div class="label">Vessel Contact Email *</div>
    <input required type="text" class="input #email">

    <div class="note">* All fields are required</div>
  </div>

  <div class="bottom-bar">
    <div class="prev-btn #prev-btn">Previous</div>
    <div class="next-btn #next-btn">Next</div>
  </div>
</div>

<div class="view cdt-vessel-info #cdt-vessel-info-view registrationpage">
  <div class="view-head">Vessel Information</div>
  <div class="form">
    <div class="label">Vessel Name *</div>
    <input required type="text" class="input #vessel">

    <div class="label">Vessel Owner *</div>
    <input required type="text" class="input #owner">

    <div class="label">Main Vessel Contact</div>
    <input type="text" class="input #contact">

    <div class="label">Vessel Contact Phone Number</div>
    <input type="text" class="input #phone">

    <div class="label">Vessel Contact Email</div>
    <input type="text" class="input #email">

    <div class="note">* Indicates required field</div>
  </div>

  <div class="bottom-bar">
    <div class="prev-btn #prev-btn">Previous</div>
    <div class="next-btn #next-btn">Next</div>
  </div>
</div>

<div class="view installer-info #installer-info-view registrationpage">
  <div class="view-head">Installer Information</div>
  <div class="form">
    <div class="label">Installer Company *</div>
    <input required type="text" class="input #company">

    <div class="label">Main Installer Contact *</div>
    <input required type="text" class="input #contact">

    <div class="label">Installer Contact Phone Number *</div>
    <input required type="text" class="input #phone">

    <div class="label">Installer Contact Email *</div>
    <input required type="text" class="input #email">

    <div class="save-info">
      <div class="save-btn #save-btn $on"></div>
      Save this info for use with future installation.
    </div>

    <div class="note">* Indicates required field</div>
  </div>

  <div class="bottom-bar">
    <div class="prev-btn #prev-btn">Previous</div>
    <div class="next-btn #next-btn">Next</div>
  </div> 
</div>

<script type="text/javascript">
if($(window).width() <= 880){
$('input').focus(function(){
		$('.\\#header-view').css("position","absolute");
		$('.cdt-vessel-info .bottom-bar').css("position","absolute");  		
		$('.cdt-vessel-info .view-head:first-child').css("position","absolute");
		$('.cdt-vessel-info .view-head:first-child').css("top","-66px"); 	
		
		$('.installer-info .bottom-bar').css("position","absolute");  				
		$('.installer-info .view-head:first-child').css("position","absolute");
		$('.installer-info .view-head:first-child').css("top","-66px"); 			
	});

	$('input').blur(function(){  

		$('.\\#header-view').css("position","fixed");
		$('.cdt-vessel-info .bottom-bar').css("position","fixed"); 		
		$('.cdt-vessel-info .view-head:first-child').css("position","fixed"); 
		$('.cdt-vessel-info .view-head:first-child').css("top","50px"); 
		
		$('.installer-info .bottom-bar').css("position","fixed"); 				
		$('.installer-info .view-head:first-child').css("position","fixed"); 
		$('.installer-info .view-head:first-child').css("top","50px"); 		
	
	});
}

// window Resize
$(window).resize(function(){
	if ($(window).width() <= 880){	
$('input').focus(function(){
		$('.\\#header-view').css("position","absolute");
		$('.cdt-vessel-info .bottom-bar').css("position","absolute");  		
		$('.cdt-vessel-info .view-head:first-child').css("position","absolute");
		$('.cdt-vessel-info .view-head:first-child').css("top","-66px"); 	
		
		$('.installer-info .bottom-bar').css("position","absolute");  				
		$('.installer-info .view-head:first-child').css("position","absolute");
		$('.installer-info .view-head:first-child').css("top","-66px"); 			
	});

	$('input').blur(function(){  

		$('.\\#header-view').css("position","fixed");
		$('.cdt-vessel-info .bottom-bar').css("position","fixed"); 		
		$('.cdt-vessel-info .view-head:first-child').css("position","fixed"); 
		$('.cdt-vessel-info .view-head:first-child').css("top","50px"); 
		
		$('.installer-info .bottom-bar').css("position","fixed"); 				
		$('.installer-info .view-head:first-child').css("position","fixed"); 
		$('.installer-info .view-head:first-child').css("top","50px"); 		
	
	});
}
	});
</script>