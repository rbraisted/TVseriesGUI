<? include $_SERVER['DOCUMENT_ROOT'] . '/wizard.php'; ?>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="wizard-view">
	<div class="wizard-content">
		<div class="wizard-title-view tac bb dfs26 mfs21">Installer Identification</div>
		<div class="tac dfs21 mfs16 mt3 mb1">Who Installed the TracVision System?</div>
		<div id="radio">
			<div id="radio-option" class="btn radio-btn radio-icon bb dfs16 mfs13">Certified Dealer Technician</div>
			<div id="radio-option" class="btn radio-btn radio-icon bb dfs16 mfs13">System Owner (do-it-yourself install)</div>
		</div>
	</div>

	<div class="bottom-bar">
		<div class="btn prev-btn prev-icon fl">Previous</div>
		<div class="btn next-btn next-icon fr">Next</div>
	</div>
 </div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<style type="text/css">
	.radio-btn {
		display: block;	
		background-position: left center;
		padding-left: 30px;
		line-height: 3.75;
	}

	@media screen and (max-width: 880px) {
		.radio-btn {
			margin: 0 20px;
		}
	}
</style>