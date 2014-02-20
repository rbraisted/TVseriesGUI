
<? include $_SERVER['DOCUMENT_ROOT'] . '/wizard.php'; ?>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="wiz-view">
	<div class="wiz-content">
		<div class="wiz-title-view tac bb dfs26 mfs21">Service Provider</div>
		<div class="tac dfs21 mfs16 mt3 mb1">Choose your satellite TV service provider.</div>
		<div id="radio" class="wiz-radio">
			<div id="radio-option" value="DIRECTV" class="btn radio-btn radio-icon bb dfs16 mfs13">DIRECTV</div>
			<div id="radio-option" value="DISH" class="btn radio-btn radio-icon bb dfs16 mfs13">DISH Network</div>
			<div id="radio-option" value="BELL" class="btn radio-btn radio-icon bb dfs16 mfs13">Bell TV</div>
			<div id="radio-option" value="OTHER" class="btn radio-btn radio-icon bb dfs16 mfs13">Other</div>
		</div>
	</div>

	<div class="bottom-bar">
		<a href="/wizard/8.php" class="btn prev-btn prev-icon fl">Previous</a>
		<a id="next-btn" class="btn next-btn next-icon fr">Next</a>
	</div>
 </div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<style type="text/css">
</style>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<script type="text/javascript">
	$(function() {
		var webService = TVRO.WebService(),
			radio = TVRO.Radio('#radio');

		webService.request('get_satellite_groups', function(response) {
			$('[id ~= next-btn ]').click(function() {
				var selectedValue = radio.selectedValue();
				if (!selectedValue) alert('You must select an option to continue.');
				else {
					//	ok, i did this wrong:
					//	the 'service setup' pages of the wizard should be
					//	consolidated into a single page
					webService.request('set_autoswitch_service', {
						enable: 'Y',
						service: selectedValue,
						satellite_group: $('group group_name', response).eq(0).text()
					}, function() {
						window.location = {
							DIRECTV: '/wizard/10.php',
							DISH: '/wizard/12.php',
							BELL: '/wizard/26.php',
							OTHER: '/wizard/15.php'
						}[selectedValue];
					});
				}
			});
		});
	});
</script>