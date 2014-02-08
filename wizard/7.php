<? include $_SERVER['DOCUMENT_ROOT'] . '/wizard.php'; ?>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="wiz-view">
	<div class="wiz-content">
		<div class="wiz-title-view tac bb dfs26 mfs21">Backup GPS Source</div>
		<div class="tac dfs21 mfs16 dlh1.2 mlh1.6 mt2 mb1">
			<div class="desktop nw">
				Choose the backup GPS source you would like
				to use for your location coordinates.
			</div>
			<div class="mobile wiz-instructions">					
				Choose the backup GPS source you would like
				to use for your location coordinates.
			</div>
		</div>

		<div id="radio" class="wiz-radio">
			<div id="radio-option" class="btn radio-btn radio-icon bb dfs16 mfs13">NMEA 0183</div>
			<div id="radio-option" class="btn radio-btn radio-icon bb dfs16 mfs13">NMEA 2000</div>
			<div id="radio-option" class="btn radio-btn radio-icon bb dfs16 mfs13">Other</div>
		</div>

		<div class="tac dfs16 mfs13 dlh1.6 mlh1.6 mt2 wiz-instructions">
			The system will use this backup GPS only if the antenna’s<br class="desktop">
			built-in GPS is unable to determine your location.
		</div>
	</div>

	<div class="bottom-bar">
		<a href="/wizard/6.php" class="btn prev-btn prev-icon fl">Previous</a>
		<a href="/wizard/8.php" class="btn next-btn next-icon fr">Next</a>
	</div>
 </div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<style type="text/css">
</style>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<script type="text/javascript">
	$(function() {
		var radio = TVRO.Radio('#radio');
	});
</script>