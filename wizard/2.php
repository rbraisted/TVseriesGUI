<? include $_SERVER['DOCUMENT_ROOT'] . '/wizard.php'; ?>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="wiz-view">
	<div class="wiz-content">
		<div class="wiz-title-view tac bb dfs26 mfs21">Installer Identification</div>
		<div class="tac dfs21 mfs16 mt3 mb1">Who Installed the TracVision System?</div>
		<div id="radio" class="wiz-radio">
			<div id="radio-option" value="/wizard/4.php" class="btn radio-btn radio-icon bb dfs16 mfs13">Certified Dealer Technician</div>
			<div id="radio-option" value="/wizard/3.php" class="btn radio-btn radio-icon bb dfs16 mfs13">System Owner (do-it-yourself install)</div>
		</div>
	</div>

	<div class="bottom-bar">
		<a href="/wizard/1.php" class="btn prev-btn prev-icon fl">Previous</a>
		<a id="next-btn" class="btn next-btn next-icon fr">Next</a>
	</div>
 </div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<style type="text/css">
</style>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<script type="text/javascript">
	$(function() {
		var radio = TVRO.Radio('#radio');
		$('[id ~= next-btn ]').click(function() {
			var selectedValue = radio.selectedValue();
			if (!selectedValue) alert('You must select an option to continue.');
			else window.location = selectedValue;
		});
	});
</script>