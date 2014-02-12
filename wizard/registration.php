<? include $_SERVER['DOCUMENT_ROOT'] . '/wizard.php'; ?>
<script type="text/javascript" src="/js/wizard/registration.js"></script>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<!-- 2 -->

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

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<!-- 3 -->

<div id="diy-vessel-info-view" class="view main-view wiz-view diy-vessel-info-view">
	<div class="view-content main-content wiz-content">
		<div class="wiz-title-view tac bb dfs26 mfs21">Vessel Information</div>
		<div class="wiz-form mt2">
			<div class="dfs13 mfs11 ml1 wiz-form-label">Vessel Name *</div>
			<input id="name" required type="text" class="dfs16 mfs16 mb1 wiz-form-input">

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

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<!-- 4 -->

<div id="cdt-vessel-info-view" class="view main-view wiz-view cdt-vessel-info-view">
	<div class="view-content main-content wiz-content">
		<div class="wiz-title-view tac bb dfs26 mfs21">Vessel Information</div>
		<div class="wiz-form mt2">
			<div class="dfs13 mfs11 ml1 wiz-form-label">Vessel Name *</div>
			<input id="name" required type="text" class="dfs16 mfs16 mb1 wiz-form-input">

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

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<!-- 5 -->

<div id="installer-info-view" class="view main-view wiz-view installer-info-view">
	<div class="view-content main-content wiz-content">
		<div class="wiz-title-view tac bb dfs26 mfs21">Installer Information</div>
		<div class="wiz-form mt2">
			<div class="dfs13 mfs11 ml1 wiz-form-label">Installer Company *</div>
			<input id="company" type="text" class="dfs16 mfs16 mb1 wiz-form-input">

			<div class="dfs13 mfs11 ml1 wiz-form-label">Main Installer Contact *</div>
			<input id="contact" type="text" class="dfs16 mfs16 mb1 wiz-form-input">

			<div class="dfs13 mfs11 ml1 wiz-form-label">Installer Contact Phone Number *</div>
			<input id="phone" type="text" class="dfs16 mfs16 mb1 wiz-form-input">

			<div class="dfs13 mfs11 ml1 wiz-form-label">Installer Contact Email *</div>
			<input id="email" type="text" class="dfs16 mfs16 mb2 wiz-form-input">

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

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<style type="text/css">
	body.at-splash .installer-identification-view,
	body.at-installer-identification-view .installer-identification-view,
	body.at-cdt-vessel-info-view .cdt-vessel-info-view, 
	body.at-diy-vessel-info-view .diy-vessel-info-view, 
	body.at-installer-info-view .installer-info-view {
		display: block;
	}
</style>