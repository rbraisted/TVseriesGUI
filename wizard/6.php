<? include $_SERVER['DOCUMENT_ROOT'] . '/wizard.php'; ?>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="wizard-view">
	<div class="wizard-content">
		<div class="wizard-title-view tac bb dfs26 mfs21">Vessel Location</div>
		<div class="tac mt2 dlh1.6 mlh1.6">
			<div class="dfs21 mfs16">Choose the GPS source you would like to use for your location coordinates.</div>
			<div class="mobile mt1"></div>
			<div class="dfs16 mfs13">This location will allow the antenna to find the satellite(s) more quickly.</div>
			<div class="mobile mt1"></div>
		</div>
		<div id="radio">
			<div id="radio-option" class="btn radio-btn radio-icon bb dfs16 mfs13">NMEA 0183</div>
			<div id="radio-option" class="btn radio-btn radio-icon bb dfs16 mfs13">NMEA 2000</div>
			<div id="radio-option" class="btn radio-btn radio-icon bb dfs16 mfs13">
				Enter your latitude <input type="text" class="dfs13">
				and longitude <input type="text" class="dfs13">
			</div>
			<div id="radio-option" class="btn radio-btn radio-icon bb dfs16 mfs13 ">
				Choose your nearest major city
			</div>
		</div>
	</div>

	<div class="bottom-bar">
		<a href="/wizard/5.php" class="btn prev-btn prev-icon fl">Previous</a>
		<a href="/wizard/7.php" class="btn next-btn next-icon fr">Next</a>
	</div>
 </div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<style type="text/css">
</style>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<script type="text/javascript">
	$(function() {
		
	});
</script>