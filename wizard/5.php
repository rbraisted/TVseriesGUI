<? include $_SERVER['DOCUMENT_ROOT'] . '/wizard.php'; ?>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="wiz-view">
	<div class="wiz-content">
		<div class="wiz-title-view tac bb dfs26 mfs21">Installer Information</div>
		<div class="wiz-form mt2">
			<div class="dfs13 mfs11 ml1 wiz-form-label">Installer Company *</div>
			<input id="company" type="text" class="dfs16 mfs16 mb1 wiz-form-input">

			<div class="dfs13 mfs11 ml1 wiz-form-label">Main Installer Contact *</div>
			<input id="contact" type="text" class="dfs16 mfs16 mb1 wiz-form-input">

			<div class="dfs13 mfs11 ml1 wiz-form-label">Installer Contact Phone Number *</div>
			<input id="phone" type="text" class="dfs16 mfs16 mb1 wiz-form-input">

			<div class="dfs13 mfs11 ml1 wiz-form-label">Installer Contact Email *</div>
			<input id="email" type="text" class="dfs16 mfs16 mb2 wiz-form-input">

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
		var webService = TVRO.WebService(),
			toggle = TVRO.Toggle('#toggle');

		toggle.click(function(isOn) {
			toggle.toggleClass('is-selected', isOn);
		});

		webService.request('get_product_registration', function(response) {
			$('#company').val($('dealer company', response).text());
			$('#contact').val($('dealer installer_name', response).text());
			$('#phone').val($('dealer installer_phone', response).text());
			$('#email').val($('dealer installer_email', response).text());
		});

		webService.request('antenna_versions', function(response) {
			$('[id ~= next-btn ]').click(function() {
				var company = $('#company').val(),
					contact = $('#contact').val(),
					phone = $('#phone').val(),
					email = $('#email').val();

				if (!company || !owner || !contact || !phone || !email) {
					if (!company) alert('You must enter a company name to proceed.');
					else if (!contact) alert('You must enter an installer contact to proceed.');
					else if (!phone) alert('You must enter a phone number to proceed.');
					else if (!email) alert('You must enter an email address to proceed.');
				} else {
					webService.request('set_product_registration', {
						dealer: {
							company: company,
							installer_name: contact,
							installer_phone: phone,
							installer_email: email
						}
					}, function() {
						//	note that response here is from the antenna_versions
						//	call, not the set_product_registration call
						window.location = {
							TV1: '/wizard/6.php',
							TV3: '/wizard/6.php',
							RV1: '/wizard/6.php',
							TV5: '/wizard/7.php',
							TV6: '/wizard/7.php'
						}[$('au model', response).text()];
					});
				}
			});
		});
	});
</script>