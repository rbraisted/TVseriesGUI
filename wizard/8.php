<? include $_SERVER['DOCUMENT_ROOT'] . '/wizard.php'; ?>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="wiz-view">
	<div class="wiz-content">
		<div class="wiz-title-view tac bb dfs26 mfs21">Backup GPS Source</div>
		<div class="tac mt2 mlh1.6">
			<div class="dfs16 mfs13 dlh1.6 instructions">
				The system has detected the following NMEA heading sources.
				Please choose the one you would like to use.
				Sources are listed in the recommended order.
			</div>
			<div class="mt1"></div>
		</div>

		<div id="radio" class="wiz-radio">
			<div id="radio-option" class="btn radio-btn radio-icon bb dfs16 mfs13">THS</div>
			<div id="radio-option" class="btn radio-btn radio-icon bb dfs16 mfs13">OSD - Own Ship Data</div>
			<div id="radio-option" class="btn radio-btn radio-icon bb dfs16 mfs13">VHW - Water Speed & Handling</div>
			<div id="radio-option" class="btn radio-btn radio-icon bb dfs16 mfs13">HDT - Heading - True</div>
			<div id="radio-option" class="btn radio-btn radio-icon bb dfs16 mfs13">HDG - Heading - Deviation & Variation</div>
			<div id="radio-option" class="btn radio-btn radio-icon bb dfs16 mfs13">HDM - Heading - Magnetic</div>
			<div id="radio-option" class="btn radio-btn radio-icon bb dfs16 mfs13">Other</div>
		</div>
	</div>

	<div class="bottom-bar">
		<a href="/wizard/7.php" class="btn prev-btn prev-icon fl">Previous</a>
		<a href="/wizard/9.php" class="btn next-btn next-icon fr">Next</a>
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