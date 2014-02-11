<? include $_SERVER['DOCUMENT_ROOT'] . '/wizard.php'; ?>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="wiz-view">
	<div class="wiz-content">
		<div class="wiz-title-view tac bb dfs26 mfs21">Vessel Information</div>
		<div class="wiz-form mt2">
			<div class="dfs13 mfs11 ml1 wiz-form-label">Vessel Name *</div>
			<input id="name" type="text" class="dfs16 mfs16 mb1 wiz-form-input">

			<div class="dfs13 mfs11 ml1 wiz-form-label">Vessel Owner *</div>
			<input id="owner" type="text" class="dfs16 mfs16 mb1 wiz-form-input">

			<div class="dfs13 mfs11 ml1 wiz-form-label">Main Vessel Contact *</div>
			<input id="contact" type="text" class="dfs16 mfs16 mb1 wiz-form-input">

			<div class="dfs13 mfs11 ml1 wiz-form-label">Vessel Contact Phone Number *</div>
			<input id="phone" type="text" class="dfs16 mfs16 mb1 wiz-form-input">

			<div class="dfs13 mfs11 ml1 wiz-form-label">Vessel Contact Email *</div>
			<input id="email" type="text" class="dfs16 mfs16 mb2 wiz-form-input">

			<div class="dfs13 mfs11 fr">* All fields required</div>
		</div>
	</div>

	<div class="bottom-bar">
		<a href="/wizard/2.php" class="btn prev-btn prev-icon fl">Previous</a>
		<a id="next-btn" class="btn next-btn next-icon fr">Next</a>
	</div>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<style type="text/css"></style>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<script type="text/javascript">
	$(function() {
		var webService = TVRO.WebService();

		webService.request('get_product_registration', function(response) {
			$('#name').val($('product vessel_name', response).text());
			$('#owner').val($('user name', response).text());
			$('#contact').val($('user contact_name', response).text());
			$('#phone').val($('user phone', response).text());
			$('#email').val($('user email', response).text());
		});

		$('[id ~= next-btn ]').click(function() {
			var name = $('#name').val(),
				owner = $('#owner').val(),
				contact = $('#contact').val(),
				phone = $('#phone').val(),
				email = $('#email').val();

			if (!name || !owner || !contact || !phone || !email) {
				if (!name) alert('You must enter a vessel name to proceed.');
				else if (!owner) alert('You must enter an owner name to proceed.');
				else if (!contact) alert('You must enter a vessel contact to proceed.');
				else if (!phone) alert('You must enter a phone number to proceed.');
				else if (!email) alert('You must enter an email address to proceed.');
			} else {
				webService.request('set_product_registration', {
					product: {
						vessel_name: name
					},
					user: {
						name: owner,
						contact_name: contact,
						phone: phone,
						email: email
					}
				}, function() {
					window.location = '/wizard/6.php';
				});
			}
		});
	});
</script>