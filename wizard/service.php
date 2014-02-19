<? include $_SERVER['DOCUMENT_ROOT'] . '/wizard.php'; ?>
<script type="text/javascript" src="/js/wizard/service.js"></script>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<!-- 9 -->

<div id="service-provider-view" class="view main-view wiz-view service-provider-view">
	<div class="view-content main-content wiz-content">
		<div class="wiz-title-view tac bb dfs26 mfs21">Service Provider</div>
		<div class="tac dfs21 mfs16 mt3 mb1">Choose your satellite TV service provider.</div>
		<div class="wiz-radio">
			<div id="radio-option" value="DIRECTV" class="btn radio-btn radio-icon bb dfs16 mfs13">DIRECTV</div>
			<div id="radio-option" value="DISH" class="btn radio-btn radio-icon bb dfs16 mfs13">DISH Network</div>
			<div id="radio-option" value="BELL" class="btn radio-btn radio-icon bb dfs16 mfs13">Bell TV</div>
			<div id="radio-option" value="OTHER" class="btn radio-btn radio-icon bb dfs16 mfs13">Other</div>
		</div>
	</div>

	<div class="bottom-bar">
		<a id="prev-btn" class="btn prev-btn prev-icon fl">Previous</a>
		<a id="next-btn" class="btn next-btn next-icon fr">Next</a>
	</div>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<!-- 10 -->

<div id="local-channels-view" class="view main-view wiz-view local-channels-view">
	<div class="view-content main-content wiz-content">
		<div class="wiz-title-view tac bb dfs26 mfs21">Local Channels</div>
		<div class="tac dfs16 mfs13 dlh1.6 mlh1.6 mt3 mb1 wiz-instructions">
			If the channels for your local TV stations are broadcast on the 119
			satellite, then you can choose to install that satellite now.
			Otherwise, click Next to continue with your system setup.
		</div>
		<div class="tac mt2">
			<div id="install-btn" class="btn basic-btn">
				<label>Install DIRECTV Satellite 119</label>
			</div>
		</div>
		<div class="cp tac dfs16 mfs11 dlh1.6 mlh1.6 mt2 wiz-link">Find out which channels are carried on the 119 satellite.</div>
	</div>

	<div class="bottom-bar">
		<a id="prev-btn" class="btn prev-btn prev-icon fl">Previous</a>
		<a id="next-btn" class="btn next-btn next-icon fr">Next</a>
	</div>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<!-- 11 -->

<div id="directv-view" class="view main-view wiz-view directv-view">
	<div class="view-content main-content wiz-content">
		<div class="wiz-title-view tac bb dfs26 mfs21">DIRECTV</div>
		<div class="tac dfs21 mfs16 mlh1.6 mt3 mb3">Success! You’re now setup for all your DIRECTV programming!</div>

		<div class="tac">
			<div id="radio-option" value="SINGLE" class="wiz-opt cp">
				<div class="dfs21 mfs11 wiz-opt-title">Single Satellite</div>
				<div class="tal dfs13 mfs13 dlh1.6 mlh1.6 wiz-opt-copy">
					For programming on the 101 satellite, you are ready to activate
					your system!
				</div>
				<div class="radio-icon wiz-opt-radio"></div>
			</div><!--
		 --><div id="radio-option" value="MANUAL" class="wiz-opt cp">
				<div class="dfs21 mfs11 wiz-opt-title">Manual Switching</div>
				<div class="tal dfs13 mfs13 dlh1.6 mlh1.6 wiz-opt-copy">
					For programming on the 101 & 119 satellites with manual switching
					between them, you are ready to activate your system!
				</div>
				<div class="radio-icon wiz-opt-radio"></div>
			</div><!--
		 --><div id="radio-option" value="AUTOMATIC" class="wiz-opt cp">
				<div class="dfs21 mfs11 wiz-opt-title">Automatic Switching</div>
				<div class="tal dfs13 mfs13 dlh1.6 mlh1.6 wiz-opt-copy">
					For programming on the 101 & 119 satellites with automatic switching
					between them, you need to set up the system for automatic switching.
				</div>
				<div class="radio-icon wiz-opt-radio"></div>
			</div>
		</div>
	</div>

	<div class="bottom-bar">
		<a id="prev-btn" class="btn prev-btn prev-icon fl">Previous</a>
		<a id="next-btn" class="btn next-btn next-icon fr">Next</a>
	</div>
</div>


<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<!-- 12 -->

<div id="dish-network-view" class="view main-view wiz-view dish-network-view">
	<div class="view-content main-content wiz-content">
		<div class="wiz-title-view tac bb dfs26 mfs21">DISH Network</div>

		<div id="group">
			<div class="tac dfs21 mfs16 mt3 mb1">Choose your DISH Network satellites.</div>
			<div class="wiz-radio">
				<div id="table-rows">
					<div id="table-row template radio-option" class="btn radio-btn radio-icon bb dfs16 mfs13"></div>
				</div>
				<div id="table-row radio-option" class="btn radio-btn radio-icon bb dfs16 mfs13"></div>
			</div>
			<div class="tac mt2">
				<span class="cp dfs16 mfs11 wiz-link">Learn more about these satellite options.</span>
			</div>
		</div>

		<div id="single">
			<div class="tac dfs21 mfs16 mt3 mb1">Choose your DISH Network satellite.</div>
			<div class="wiz-radio">
				<div id="table-rows">
					<div id="table-row template radio-option" class="btn radio-btn radio-icon bb dfs16 mfs13"></div>
				</div>
				<div id="table-row radio-option" class="btn radio-btn radio-icon bb dfs16 mfs13"></div>
			</div>
		</div>
	</div>

	<div class="bottom-bar">
		<a id="prev-btn" class="btn prev-btn prev-icon fl">Previous</a>
		<a id="next-btn" class="btn next-btn next-icon fr">Next</a>
	</div>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<!-- 26 -->

<div id="spinner-view" class="view main-view wiz-view spinner-view">
	<div class="view-content main-content wiz-content">
		<div class="wiz-title-view tac bb dfs26 mfs21">Installing Satellites</div>
		<div class="tac dfs21 mfs16 mlh1.6 mt3 mb3 wiz-instructions">
			Please wait while your satellites are being installed...
		</div>
		<div id="spinner" class="spinner"></div>
	</div>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<!-- 27 -->

<div id="service-subtype-view" class="view main-view wiz-view service-subtype-view">
	<div class="view-content main-content wiz-content">
		<div class="wiz-title-view tac bb dfs26 mfs21">Choose the Active Service</div>
		<div class="tac dfs21 mfs16 mt3 mb1">Which service do you want the antenna to track now?</div>
		<div class="wiz-radio">
			<div id="radio-option" value="NORTH_AMERICA" class="btn radio-btn radio-icon bb dfs16 mfs13">DIRECTV North America</div>
			<div id="radio-option" value="LATIN_AMERICA" class="btn radio-btn radio-icon bb dfs16 mfs13">DIRECTV Latin America</div>
		</div>
	</div>

	<div class="bottom-bar">
		<a id="prev-btn" class="btn prev-btn prev-icon fl">Previous</a>
		<a id="next-btn" class="btn next-btn next-icon fr">Next</a>
	</div>
 </div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<style type="text/css">
	body.at-splash .service-provider-view,
	body.at-service-provider-view .service-provider-view,
	body.at-local-channels-view .local-channels-view,
	body.at-directv-view .directv-view,
	body.at-service-subtype-view .service-subtype-view,
	body.at-dish-network-view .dish-network-view,
	body.at-spinner-view .spinner-view {
		display: block;
	}
</style>