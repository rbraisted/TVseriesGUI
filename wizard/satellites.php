<? include $_SERVER['DOCUMENT_ROOT'] . '/wizard.php'; ?>
<script type="text/javascript" src="/js/wizard/satellites.js"></script>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<!-- 14 -->

<div id="options-view" class="view main-view wiz-view options-view">
	<div class="view-content main-content wiz-content">
		<div class="wiz-title-view tac bb dfs26 mfs21">Satellite Selection</div>
		<div class="tac i dfs13 mfs13 dlh1.6 mlh1.6 mt3 mb3 wiz-instructions"><br></div>
		<div class="tac">
			<div id="radio-option" value="SINGLE" class="wiz-opt cp">
				<div class="dfs21 mfs11 dlh1.2 wiz-opt-title">Choose a Single Satellite</div>
				<div class="wiz-opt-single-satellite-img"></div>
				<div class="radio-icon wiz-opt-radio"></div>
			</div><!--
		 --><div id="radio-option" value="PRESET" class="wiz-opt cp">
				<div class="dfs21 mfs11 dlh1.2 wiz-opt-title">Choose a Preset Group of Satellites</div>
				<div class="wiz-opt-preset-group-img"></div>
				<div class="radio-icon wiz-opt-radio"></div>
			</div><!--
		 --><div id="radio-option" value="NEW" class="wiz-opt cp">
				<div class="dfs21 mfs11 dlh1.2 wiz-opt-title">Create a New Group of Satellites</div>
				<div class="wiz-opt-new-group-img"></div>
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

<!-- 15 -->

<div id="circular-options-view" class="view main-view wiz-view circular-options-view">
	<div class="view-content main-content wiz-content">
		<div class="wiz-title-view tac bb dfs26 mfs21">Satellite Selection</div>
		<div class="tac i dfs13 mfs13 dlh1.6 mlh1.6 mt3 mb3 wiz-instructions">
			Note: While you may choose any combination of DIRECTV, DISH Network,
			Bell TV, &/or any other circular satellites you will be limited to
			manual satellite switching. If you wish to enable automatic
			switching, go back &
			<a href="/wizard/9.php" class="wiz-link">choose the desired
			service provider instead.</a>
		</div>
		<div class="tac">
			<div id="radio-option" value="SINGLE" class="wiz-opt cp">
				<div class="dfs21 mfs11 dlh1.2 wiz-opt-title">Choose a Single Satellite</div>
				<div class="wiz-opt-single-satellite-img"></div>
				<div class="radio-icon wiz-opt-radio"></div>
			</div><!--
		 --><div id="radio-option" value="NEW" class="wiz-opt cp">
				<div class="dfs21 mfs11 dlh1.2 wiz-opt-title">Create a New Group of Satellites</div>
				<div class="wiz-opt-new-group-img"></div>
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

<!-- 16 -->

<div id="tv5-manual-options-view" class="view main-view wiz-view tv5-manual-options-view">
	<div class="view-content main-content wiz-content">
		<div class="wiz-title-view tac bb dfs26 mfs21">Satellite Selection</div>
		<div class="tac i dfs13 mfs13 dlh1.6 mlh1.6 mt3 mb3 wiz-instructions">
			* You will have the opportunity to create your own group if one of
			the preset groups doesn’t meet your needs.
		</div>
		<div class="tac">
			<div id="radio-option" value="SINGLE" class="wiz-opt cp">
				<div class="dfs21 mfs11 dlh1.2 wiz-opt-title">Choose a Single Satellite</div>
				<div class="wiz-opt-single-satellite-img"></div>
				<div class="radio-icon wiz-opt-radio"></div>
			</div><!--
		 --><div id="radio-option" value="PRESET" class="wiz-opt cp">
				<div class="dfs21 mfs11 dlh1.2 wiz-opt-title">Choose a Preset Group of Satellites</div>
				<div class="wiz-opt-preset-group-img"></div>
				<div class="radio-icon wiz-opt-radio"></div>
			</div><!--
		 --><div id="radio-option" value="NEW" class="wiz-opt cp">
				<div class="dfs21 mfs11 dlh1.2 wiz-opt-title">Create a New Group of Satellites</div>
				<div class="wiz-opt-new-group-img"></div>
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

<style type="text/css">
	body.at-splash .options-view,
	body.at-options-view .options-view,
	body.at-circular-options-view .circular-options-view,
	body.at-tv5-manual-options-view .tv5-manual-options-view,
	body.at-single-view .single-view,
	body.at-group-view .group-view,
	body.at-group-edit-view .group-edit-view,
	body.at-group-satellites-view .group-satellites-view {
		display: block;
	}

	@media screen and (min-width: 880px) {
		body.at-group-edit-view .group-view,
		body.at-group-satellites-view .group-view {
			display: block;
		}
	}
</style>