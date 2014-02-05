<? include $_SERVER['DOCUMENT_ROOT'] . '/wizard.php'; ?>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="wizard-view">
	<div class="wizard-content">
		<div class="wizard-title-view tac bb dfs26 mfs21">Vessel Information</div>
		<div class="vessel-info-form mt2">
			<div class="dfs13 mfs11 ml1 vessel-info-label">Vessel Name *</div>
			<input type="text" class="dfs16 mfs16 mb1 vessel-info-input">

			<div class="dfs13 mfs11 ml1 vessel-info-label">Vessel Owner *</div>
			<input type="text" class="dfs16 mfs16 mb1 vessel-info-input">

			<div class="dfs13 mfs11 ml1 vessel-info-label">Main Vessel Contact *</div>
			<input type="text" class="dfs16 mfs16 mb1 vessel-info-input">

			<div class="dfs13 mfs11 ml1 vessel-info-label">Vessel Contact Phone Number *</div>
			<input type="text" class="dfs16 mfs16 mb1 vessel-info-input">

			<div class="dfs13 mfs11 ml1 vessel-info-label">Vessel Contact Email *</div>
			<input type="text" class="dfs16 mfs16 mb2 vessel-info-input">

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
	.vessel-info-form {
		margin-left: auto;
		margin-right: auto;
		max-width: 440px;
		padding-left: 20px;
		padding-right: 20px;
	}

	.vessel-info-label { margin-bottom: 0.5em; }

	@media screen and (min-width: 880px) {
		.vessel-info-label { margin-top: 0.5em; }
	}

	.vessel-info-input { width: 100%; }
</style>