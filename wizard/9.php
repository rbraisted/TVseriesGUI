<? include $_SERVER['DOCUMENT_ROOT'] . '/wizard.php'; ?>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="wiz-view">
	<div class="wiz-content">
		<div class="wiz-title-view tac bb dfs26 mfs21">Service Provider</div>
		<div class="tac dfs21 mfs16 mt3 mb1">Choose your satellite TV service provider.</div>
		<div id="radio" class="wiz-radio">
			<div id="radio-option" class="btn radio-btn radio-icon bb dfs16 mfs13">DIRECTV</div>
			<div id="radio-option" class="btn radio-btn radio-icon bb dfs16 mfs13">DISH Network</div>
			<div id="radio-option" class="btn radio-btn radio-icon bb dfs16 mfs13">Bell TV</div>
			<div id="radio-option" class="btn radio-btn radio-icon bb dfs16 mfs13">Other</div>
		</div>
	</div>

	<div class="bottom-bar">
		<a href="/wizard/8.php" class="btn prev-btn prev-icon fl">Previous</a>
		<a href="/wizard/10.php" class="btn next-btn next-icon fr">Next</a>
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