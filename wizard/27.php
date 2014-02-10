<? include $_SERVER['DOCUMENT_ROOT'] . '/wizard.php'; ?>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="wiz-view">
	<div class="wiz-content">
		<div class="wiz-title-view tac bb dfs26 mfs21">Choose the Active Service</div>
		<div class="tac dfs21 mfs16 mt3 mb1">Which service do you want the antenna to track now?</div>
		<div id="radio" class="wiz-radio">
			<div id="radio-option" class="btn radio-btn radio-icon bb dfs16 mfs13">DIRECTV North America</div>
			<div id="radio-option" class="btn radio-btn radio-icon bb dfs16 mfs13">DIRECTV Latin America</div>
		</div>
	</div>

	<div class="bottom-bar">
		<a href="/wizard/26.php" class="btn prev-btn prev-icon fl">Previous</a>
		<a href="/wizard/28.php" class="btn next-btn next-icon fr">Next</a>
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