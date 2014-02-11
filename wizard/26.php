<? include $_SERVER['DOCUMENT_ROOT'] . '/wizard.php'; ?>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="wiz-view">
	<div class="wiz-content">
		<div class="wiz-title-view tac bb dfs26 mfs21">Installing Satellites</div>
		<div class="tac dfs21 mfs16 mlh1.6 mt3 mb3 wiz-instructions">
			Please wait while your satellites are being installed...
		</div>
		<div id="spinner" class="spinner"></div>
	</div>

	<div class="bottom-bar">
		<a href="/wizard/25.php" class="btn prev-btn prev-icon fl">Previous</a>
		<a href="/wizard/27.php" class="btn next-btn next-icon fr">Next</a>
	</div>
 </div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<style type="text/css">
	.spinner {
		background: transparent url(/images/wizard-spinner.png) no-repeat center center;
		height: 120px;
		margin: auto;
		width: 120px;
	}
</style>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<script type="text/javascript">
	$(function() {
		var radio = TVRO.Radio('#radio'),
			spinner = $('#spinner'),
			rotation = 0;

		setInterval(function() {
			spinner.css({
				'transform' : 'rotate('+rotation+'deg)',
				'-moz-transform' : 'rotate('+rotation+'deg)',
				'-ms-transform' : 'rotate('+rotation+'deg)',
				'-webkit-transform' : 'rotate('+rotation+'deg)'
			});
			rotation -= 45;
		}, 125);
	});
</script>