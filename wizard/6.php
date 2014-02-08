<? include $_SERVER['DOCUMENT_ROOT'] . '/wizard.php'; ?>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="wiz-view">
	<div class="wiz-content">
		<div class="wiz-title-view tac bb dfs26 mfs21">Vessel Location</div>
		<div class="tac dfs21 mfs16 dlh1.2 mlh1.6 mt2 mb1">
			<div class="desktop">
				Choose the GPS source you would like to use
				for your location coordinates.
			</div>
			<div class="mobile wiz-instructions">
				Choose the GPS source you would like to use
				for your location coordinates.
			</div>
		</div>
		<div id="radio" class="wiz-radio">
			<div id="radio-option" class="btn radio-btn radio-icon bb dfs16 mfs13">NMEA 0183</div>
			<div id="radio-option" class="btn radio-btn radio-icon bb dfs16 mfs13">NMEA 2000</div>
			<div class="desktop">
				<div id="radio-option" class="btn radio-btn radio-icon bb dfs16 mfs13">
					Enter your latitude<input type="text" placeholder="Format XXS or XXN" class="dfs13 ml1 mr1">
					and longitude<input type="text" placeholder="Format XXE or XXW" class="dfs13 ml1 mr1">
				</div>
				<div id="radio-option" class="btn radio-btn radio-icon bb dfs16 mfs13 ">
					Choose your nearest major city<!--
				 --><div id="city-btn" class="btn dropdown-btn ml1">
						<img src="/images/img.gif">
						<label id="radio-value">Los Angeles</label>
					</div>
				</div>
			</div>
			<div class="mobile">
				<div id="radio-option" class="btn radio-btn radio-icon bb dfs16 mfs13">Enter your latitude & longitude</div>
				<div id="radio-option city-btn" class="btn radio-btn radio-icon bb dfs16 mfs13">
					<span id="radio-value">Choose your nearest major city</span>
				</div>
			</div>
		</div>

		<div class="tac dfs16 mfs13 dlh1.6 mlh1.6 mt2 wiz-instructions">
			This location will allow the antenna to find
			the satellite(s) more quickly.
		</div>
	</div>

	<div class="bottom-bar">
		<a href="/wizard/5.php" class="btn prev-btn prev-icon fl">Previous</a>
		<a href="/wizard/7.php" class="btn next-btn next-icon fr">Next</a>
	</div>
 </div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

 <div id="city-dropdown" class="view popup-view dropdown-view">
	<div id="dropdown-content" class="view-content popup-content dropdown-content">
		<a id="close-btn" class="btn back-btn">
			<img src="/images/img.gif">
			<label>Select a City</label>
		</a>
		<h1>Select a City</h1>
		<div id="table-rows">
			<a id="template table-row dropdown-option radio-option" class="btn dropdown-option">
				<img src="/images/img.gif">
				<label id="name"></label>
			</a>
		</div>
	</div>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<style type="text/css">
</style>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<script type="text/javascript">
	$(function() {
		var
		webService = TVRO.WebService(),
		radio = TVRO.Radio('#radio'),
		dropdown = TVRO.Dropdown('#city-dropdown'),
		table = TVRO.Table(dropdown),
		cities = [];

		radio.click(function(value) {

		});

		dropdown.setButtons('[id ~= city-btn ]');
		dropdown.click(function(city) {
			console.log(city);
		});

		table.build(function(i, row) {
			row.attr('value', cities[i]);
			$('#name', row).text(cities[i]);
		});

		webService.request('get_gps_cities', function(response) {
			cities = [];
			$('city', response).each(function(i) {
				cities[i] = $(this).text();
			});

			table.build(cities.length);
			dropdown.refresh();
		});
	});
</script>