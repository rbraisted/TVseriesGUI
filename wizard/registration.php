<?
$wiz = true;
include $_SERVER['DOCUMENT_ROOT'] . '/base_.php';
?>

<script type="text/javascript" src="/js/wizard/registration.js"></script>



<div class="view installer-id #installer-id-view">
  <div class="view-head">Installer Identification</div>
  <div class="headline">Who Installed the TracVision System?</div>

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

<div class="view diy-vessel-info #diy-vessel-info-view">
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

    <div class="note">* All fields required</div>
  </div>

  <div class="bottom-bar">
    <div class="prev-btn #prev-btn">Previous</div>
    <div class="next-btn #next-btn">Next</div>
  </div>
</div>

<div class="view cdt-vessel-info #cdt-vessel-info-view">
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

<div class="view installer-info #installer-info-view">
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

<!--     <div class="cp mb2 #toggle">
      <div class="radio-icon fl"></div>
      <span class="dfs13 mfs11 dlh1.6 ml1.6 ml1 highlight">Save this info for use with future installations</span>
    </div>
 -->
    <div class="note">* Indicates required field</div>
  </div>

  <div class="bottom-bar">
    <div class="prev-btn #prev-btn">Previous</div>
    <div class="next-btn #next-btn">Next</div>
  </div>
</div>


<!--

<div id="installer-identification-view" class="view main-view wiz-view installer-identification-view">
	<div class="view-content main-content wiz-content">
		<div class="wiz-title-view tac bb dfs26 mfs21">Installer Identification</div>
		<div class="tac dfs21 mfs16 mt3 mb1">Who Installed the TracVision System?</div>
		<div class="wiz-radio">
			<div id="radio-option" value="CDT" class="btn radio-btn radio-icon bb dfs16 mfs13">Certified Dealer Technician</div>
			<div id="radio-option" value="DIY" class="btn radio-btn radio-icon bb dfs16 mfs13">System Owner (do-it-yourself install)</div>
		</div>
	</div>

	<div class="bottom-bar">
		<a href="/wizard/" class="btn prev-btn prev-icon fl">Previous</a>
		<a id="next-btn" class="btn next-btn next-icon fr">Next</a>
	</div>
</div>

<div id="diy-vessel-info-view" class="view main-view wiz-view diy-vessel-info-view">
	<div class="view-content main-content wiz-content">
		<div class="wiz-title-view tac bb dfs26 mfs21">Vessel Information</div>
		<div class="wiz-form mt2">
			<div class="dfs13 mfs11 ml1 wiz-form-label">Vessel Name *</div>
			<input id="vessel" required type="text" class="dfs16 mfs16 mb1 wiz-form-input">

			<div class="dfs13 mfs11 ml1 wiz-form-label">Vessel Owner *</div>
			<input id="owner" required type="text" class="dfs16 mfs16 mb1 wiz-form-input">

			<div class="dfs13 mfs11 ml1 wiz-form-label">Main Vessel Contact *</div>
			<input id="contact" required type="text" class="dfs16 mfs16 mb1 wiz-form-input">

			<div class="dfs13 mfs11 ml1 wiz-form-label">Vessel Contact Phone Number *</div>
			<input id="phone" required type="text" class="dfs16 mfs16 mb1 wiz-form-input">

			<div class="dfs13 mfs11 ml1 wiz-form-label">Vessel Contact Email *</div>
			<input id="email" required type="text" class="dfs16 mfs16 mb2 wiz-form-input">

			<div class="dfs13 mfs11 fr">* All fields required</div>
		</div>
	</div>

	<div class="bottom-bar">
		<a id="prev-btn" class="btn prev-btn prev-icon fl">Previous</a>
		<a id="next-btn" class="btn next-btn next-icon fr">Next</a>
	</div>
</div>

<div id="cdt-vessel-info-view" class="view main-view wiz-view cdt-vessel-info-view">
	<div class="view-content main-content wiz-content">
		<div class="wiz-title-view tac bb dfs26 mfs21">Vessel Information</div>
		<div class="wiz-form mt2">
			<div class="dfs13 mfs11 ml1 wiz-form-label">Vessel Name *</div>
			<input id="vessel" required type="text" class="dfs16 mfs16 mb1 wiz-form-input">

			<div class="dfs13 mfs11 ml1 wiz-form-label">Vessel Owner *</div>
			<input id="owner" required type="text" class="dfs16 mfs16 mb1 wiz-form-input">

			<div class="dfs13 mfs11 ml1 wiz-form-label">Main Vessel Contact</div>
			<input id="contact" type="text" class="dfs16 mfs16 mb1 wiz-form-input">

			<div class="dfs13 mfs11 ml1 wiz-form-label">Vessel Contact Phone Number</div>
			<input id="phone" type="text" class="dfs16 mfs16 mb1 wiz-form-input">

			<div class="dfs13 mfs11 ml1 wiz-form-label">Vessel Contact Email</div>
			<input id="email" type="text" class="dfs16 mfs16 mb2 wiz-form-input">

			<div class="dfs13 mfs11 fr">* Indicates required field</div>
		</div>
	</div>

	<div class="bottom-bar">
		<a id="prev-btn" class="btn prev-btn prev-icon fl">Previous</a>
		<a id="next-btn" class="btn next-btn next-icon fr">Next</a>
	</div>
</div>

<div id="installer-info-view" class="view main-view wiz-view installer-info-view">
	<div class="view-content main-content wiz-content">
		<div class="wiz-title-view tac bb dfs26 mfs21">Installer Information</div>
		<div class="wiz-form mt2">
			<div class="dfs13 mfs11 ml1 wiz-form-label">Installer Company *</div>
			<input id="company" required type="text" class="dfs16 mfs16 mb1 wiz-form-input">

			<div class="dfs13 mfs11 ml1 wiz-form-label">Main Installer Contact *</div>
			<input id="contact" required type="text" class="dfs16 mfs16 mb1 wiz-form-input">

			<div class="dfs13 mfs11 ml1 wiz-form-label">Installer Contact Phone Number *</div>
			<input id="phone" required type="text" class="dfs16 mfs16 mb1 wiz-form-input">

			<div class="dfs13 mfs11 ml1 wiz-form-label">Installer Contact Email *</div>
			<input id="email" required type="text" class="dfs16 mfs16 mb2 wiz-form-input">

			<div id="toggle" class="cp mb2">
				<div class="radio-icon fl"></div>
				<span class="dfs13 mfs11 dlh1.6 ml1.6 ml1 highlight">Save this info for use with future installations</span>
			</div>

			<div class="dfs13 mfs11 fr">* Indicates required field</div>
		</div>
	</div>

	<div class="bottom-bar">
		<a id="prev-btn" class="btn prev-btn prev-icon fl">Previous</a>
		<a id="next-btn" class="btn next-btn next-icon fr">Next</a>
	</div>
</div>

-->