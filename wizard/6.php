<? include $_SERVER['DOCUMENT_ROOT'] . '/wizard.php'; ?>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="wiz-view">
	<div class="wiz-content">
		<div class="wiz-title-view tac bb dfs26 mfs21">Vessel Location</div>
		<div class="tac dfs21 mfs16 dlh1.2 mlh1.6 mt2 mb1">
			<div class="desktop">
				Choose the GPS source you would like to use
				for your location coordinates.
			</div>
			<div class="mobile instructions">
				Choose the GPS source you would like to use
				for your location coordinates.
			</div>
		</div>
		<div id="radio" class="wiz-radio">
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

		<div class="tac dfs16 mfs13 dlh1.6 mlh1.6 mt2 instructions">
			This location will allow the antenna to find
			the satellite(s) more quickly.
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