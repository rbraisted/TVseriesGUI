<? include $_SERVER['DOCUMENT_ROOT'] . '/wizard.php'; ?>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="wiz-view">
	<div class="wiz-content">
		<div class="wiz-title-view tac bb dfs26 mfs21">Satellite Selection</div>
		<div class="tac i dfs13 mfs13 dlh1.6 mlh1.6 mt3 mb3 wiz-instructions">
			* You will have the opportunity to create your own group if one of
			the preset groups doesn’t meet your needs.
		</div>

		<div id="radio" class="tac">
			<div id="radio-option" class="wiz-opt wiz-opt-config cp">
				<div class="dfs21 mfs11 dlh1.2 wiz-opt-title">Configuration #1</div>
				<div class="wiz-opt-config-1-img"></div>
				<div class="tac dfs13 mfs13">One Receiver</div>
				<div class="radio-icon wiz-opt-radio"></div>
			</div><!--
		 --><div id="radio-option" class="wiz-opt wiz-opt-config cp">
				<div class="dfs21 mfs11 dlh1.2 wiz-opt-title">Configuration #2</div>
				<div class="wiz-opt-config-2-img"></div>
				<div class="tac dfs13 mfs13">One Master Receiver + Multiswitch</div>
				<div class="radio-icon wiz-opt-radio"></div>
			</div><!--
		 --><div id="radio-option" class="wiz-opt wiz-opt-config cp">
				<div class="dfs21 mfs11 dlh1.2 wiz-opt-title">Configuration #3</div>
				<div class="wiz-opt-config-3-img"></div>
				<div class="tac dfs13 mfs13">Multiple Receivers w/ AutoSwitch(es)</div>
				<div class="radio-icon wiz-opt-radio"></div>
			</div>
		</div>
	</div>

	<div class="bottom-bar">
		<a href="/wizard/28.php" class="btn prev-btn prev-icon fl">Previous</a>
		<a href="/wizard/30.php" class="btn next-btn next-icon fr">Next</a>
	</div>
 </div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<style type="text/css">
</style>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<script type="text/javascript">
	$(function() {
		var radio = TVRO.Radio('#radio');
	});
</script>