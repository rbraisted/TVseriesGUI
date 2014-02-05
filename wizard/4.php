<? include $_SERVER['DOCUMENT_ROOT'] . '/wizard.php'; ?>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="wizard-view">
	<div class="wizard-content">
		<div class="wizard-title-view tac bb dfs26 mfs21">Installer Information</div>
		<div class="installer-info-form mt2">
			<div class="dfs13 mfs11 ml1 installer-info-label">Installer Name *</div>
			<input type="text" class="dfs16 mfs16 mb1 installer-info-input">

			<div class="dfs13 mfs11 ml1 installer-info-label">Main Installer Contact *</div>
			<input type="text" class="dfs16 mfs16 mb1 installer-info-input">

			<div class="dfs13 mfs11 ml1 installer-info-label">Installer Contact Phone Number *</div>
			<input type="text" class="dfs16 mfs16 mb1 installer-info-input">

			<div class="dfs13 mfs11 ml1 installer-info-label">Installer Contain Email *</div>
			<input type="text" class="dfs16 mfs16 mb2 installer-info-input">

			<div class="mb2">
				<div class="radio-icon is-selected fl"></div>
				<span class="dfs13 mfs11 dlh1.6 ml1.6 ml1 highlight">Save this info for use with future installations</span>
			</div>

			<div class="dfs13 mfs11 fr">* Indicates required field</div>
		</div>
	</div>

	<div class="bottom-bar">
		<div class="btn prev-btn prev-icon fl">Previous</div>
		<div class="btn next-btn next-icon fr">Next</div>
	</div>
 </div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<style type="text/css">
/*
	should merge this css with css in 3.php
	.vessel-info-* and .installer-info-*
	are the same
	*/
	.installer-info-form {
		margin-left: auto;
		margin-right: auto;
		max-width: 440px;
		padding-left: 20px;
		padding-right: 20px;
	}

	.installer-info-label { margin-bottom: 0.5em; }

	@media screen and (min-width: 880px) {
		.installer-info-label { margin-top: 0.5em; }
	}

	.installer-info-input { width: 100%; }

	.highlight { color: #669beb; }
</style>