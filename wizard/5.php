<? include $_SERVER['DOCUMENT_ROOT'] . '/wizard.php'; ?>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="wiz-view">
	<div class="wiz-content">
		<div class="wiz-title-view tac bb dfs26 mfs21">Installer Information</div>
		<div class="wiz-form mt2">
			<div class="dfs13 mfs11 ml1 wiz-form-label">Installer Name *</div>
			<input type="text" class="dfs16 mfs16 mb1 wiz-form-input">

			<div class="dfs13 mfs11 ml1 wiz-form-label">Main Installer Contact *</div>
			<input type="text" class="dfs16 mfs16 mb1 wiz-form-input">

			<div class="dfs13 mfs11 ml1 wiz-form-label">Installer Contact Phone Number *</div>
			<input type="text" class="dfs16 mfs16 mb1 wiz-form-input">

			<div class="dfs13 mfs11 ml1 wiz-form-label">Installer Contact Email *</div>
			<input type="text" class="dfs16 mfs16 mb2 wiz-form-input">

			<div id="toggle" class="cp mb2">
				<div class="radio-icon fl"></div>
				<span class="dfs13 mfs11 dlh1.6 ml1.6 ml1 highlight">Save this info for use with future installations</span>
			</div>

			<div class="dfs13 mfs11 fr">* Indicates required field</div>
		</div>
	</div>

	<div class="bottom-bar">
		<a href="/wizard/4.php" class="btn prev-btn prev-icon fl">Previous</a>
		<a href="/wizard/6.php" class="btn next-btn next-icon fr">Next</a>
	</div>
 </div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<style type="text/css">
	.highlight { color: #669beb; }
</style>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<script type="text/javascript">
	$(function() {
		var toggle = TVRO.Toggle('#toggle');
		toggle.click(function(isOn) {
			toggle.toggleClass('is-selected', isOn);
		});
	});
</script>