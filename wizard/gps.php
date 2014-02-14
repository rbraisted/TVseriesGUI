<? include $_SERVER['DOCUMENT_ROOT'] . '/wizard.php'; ?>
<script type="text/javascript" src="/js/wizard/gps.js"></script>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<!-- 6 -->

<div id="vessel-location-view" class="view main-view wiz-view vessel-location-view">
	<div class="view-content main-content wiz-content">
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
		<div class="wiz-radio">
			<div id="radio-option" value="nmea0183" class="btn radio-btn radio-icon bb dfs16 mfs13">NMEA 0183</div>
			<div id="radio-option" value="nmea2000" class="btn radio-btn radio-icon bb dfs16 mfs13">NMEA 2000</div>
			<div class="desktop">
				<div id="radio-option" value="coordinates" class="btn radio-btn radio-icon bb dfs16 mfs13">
					Enter your latitude<input id="latitude" type="text" placeholder="Format XXS or XXN" class="dfs13 ml1 mr1">
					and longitude<input id="longitude" type="text" placeholder="Format XXE or XXW" class="dfs13 ml1 mr1">
				</div>
				<div id="radio-option" value="city" class="btn radio-btn radio-icon bb dfs16 mfs13 ">
					Choose your nearest major city<!--
				 --><div id="city-btn" class="btn dropdown-btn ml1">
						<img src="/images/img.gif">
						<label id="radio-value"></label>
					</div>
				</div>
			</div>
			<div class="mobile">
				<div id="radio-option" value="coordinates" class="btn radio-btn radio-icon bb dfs16 mfs13">Enter your latitude & longitude</div>
				<div id="radio-option city-btn" value="city" class="btn radio-btn radio-icon bb dfs16 mfs13">
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
		<a href="/wizard/" class="btn prev-btn prev-icon fl">Previous</a>
		<a id="next-btn" class="btn next-btn next-icon fr">Next</a>
	</div>
</div>

<div id="coordinates-view" class="view main-view coordinates-view">
	<div class="view-content main-content">
		<a id="cancel-btn" class="btn back-btn bb">
			<img src="/images/img.gif">
			<label>Enter Coordinates</label>
		</a>
		<div class="mlh1.6">
			<div class="mfs11">Enter Latitude</div>
			<input id="latitude" type="text" placeholder="Format XXS or XXN" class="mfs13">
		</div>
		<div class="mlh1.6 mt1">
			<div class="mfs11">Enter Longitude</div>
			<input id="longitude" type="text" placeholder="Format XXE or XXW" class="mfs13">
		</div>
	</div>

	<div class="bottom-bar">
		<a id="cancel-btn" class="btn fl">Cancel</a>
		<a id="save-btn" class="btn fr">Save</a>
	</div>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->



<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->



<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<style type="text/css">
	body.at-splash .vessel-location-view,
	body.at-vessel-location-view .vessel-location-view,
	body.at-backup-gps-source-view .backup-gps-source-view, 
	body.at-heading-source-view .heading-source-view {
		display: block;
	}

	@media screen and (min-width: 880px) {
		body.at-coordinates-view .vessel-location-view {
			display: block;
		}
	}

	@media screen and (max-width: 880px) {
		body.at-coordinates-view .coordinates-view {
			display: block;
		}

		.coordinates-view input {
			width: 100%;
		}
	}
</style>