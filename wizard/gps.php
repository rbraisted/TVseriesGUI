<?
$wiz = true;
include $_SERVER['DOCUMENT_ROOT'] . '/base_.php';
?>

<script type="text/javascript" src="/js/wizard/gps.js"></script>

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
			<div id="radio-option" value="NMEA0183" class="btn radio-btn radio-icon bb dfs16 mfs13">NMEA 0183</div>
			<div id="radio-option" value="NMEA2000" class="btn radio-btn radio-icon bb dfs16 mfs13">NMEA 2000</div>
			<div class="desktop">
				<div id="radio-option" value="COORDINATES" class="btn radio-btn radio-icon bb dfs16 mfs13">
					Enter your latitude<input id="latitude" type="text" placeholder="Format XXS or XXN" class="dfs13 ml1 mr1">
					and longitude<input id="longitude" type="text" placeholder="Format XXE or XXW" class="dfs13 ml1 mr1">
				</div>
				<div id="radio-option" value="CITY" class="btn radio-btn radio-icon bb dfs16 mfs13 ">
					Choose your nearest major city<!--
				 --><div id="city-btn" class="btn dropdown-btn ml1">
						<img src="/images/img.gif">
						<label id="radio-value">Select a City</label>
					</div>
				</div>
			</div>
			<div class="mobile">
				<div id="radio-option" value="COORDINATES" class="btn radio-btn radio-icon bb dfs16 mfs13">Enter your latitude & longitude</div>
				<div id="radio-option city-btn" value="CITY" class="btn radio-btn radio-icon bb dfs16 mfs13">
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
		<a id="back-btn" class="btn back-btn bb">
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
</div>

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

<!-- 7 -->

<div id="backup-gps-source-view" class="view main-view wiz-view backup-gps-source-view">
	<div class="view-content main-content wiz-content">
		<div class="wiz-title-view tac bb dfs26 mfs21">Backup GPS Source</div>
		<div class="tac dfs21 mfs16 dlh1.2 mlh1.6 mt2 mb1">
			<div class="desktop nw">
				Choose the backup GPS source you would like
				to use for your location coordinates.
			</div>
			<div class="mobile wiz-instructions">					
				Choose the backup GPS source you would like
				to use for your location coordinates.
			</div>
		</div>

		<div id="radio" class="wiz-radio">
			<div id="radio-option" value="NMEA0183" class="btn radio-btn radio-icon bb dfs16 mfs13">NMEA 0183</div>
			<div id="radio-option" value="NMEA2000" class="btn radio-btn radio-icon bb dfs16 mfs13">NMEA 2000</div>
			<div id="radio-option" value="NONE" class="btn radio-btn radio-icon bb dfs16 mfs13">None</div>
		</div>

		<div class="tac dfs16 mfs13 dlh1.6 mlh1.6 mt2 wiz-instructions">
			The system will use this backup GPS only if the antenna’s<br class="desktop">
			built-in GPS is unable to determine your location.
		</div>
	</div>

	<div class="bottom-bar">
		<a href="/wizard/" class="btn prev-btn prev-icon fl">Previous</a>
		<a id="next-btn" class="btn next-btn next-icon fr">Next</a>
	</div>
</div>

<!-- 8 -->

<div id="heading-source-view" class="view main-view wiz-view heading-source-view">
	<div class="view-content main-content wiz-content">
		<div class="wiz-title-view tac bb dfs26 mfs21">Heading Source</div>
		<div class="tac mt2 mlh1.6">
			<div class="dfs16 mfs13 dlh1.6 wiz-instructions">
				The system has detected the following NMEA heading sources.
				Please choose the one you would like to use.
				Sources are listed in the recommended order.
			</div>
			<div class="mt1"></div>
		</div>

		<div id="table-rows" class="wiz-radio">
			<div id="template table-row radio-option" value="" class="btn radio-btn radio-icon bb dfs16 mfs13">
				<span id="source"></span> - <span id="name"></span>
			</div>
		</div>
	</div>

	<div class="bottom-bar">
		<a href="/wizard/" class="btn prev-btn prev-icon fl">Previous</a>
		<a id="next-btn" class="btn next-btn next-icon fr">Next</a>
	</div>
</div>