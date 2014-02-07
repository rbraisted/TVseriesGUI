<? include $_SERVER['DOCUMENT_ROOT'] . '/wizard.php'; ?>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="wiz-view">
	<div class="wiz-content">
		<div class="wiz-title-view tac bb dfs26 mfs21">Satellite Selection</div>
		<div class="tac i dfs13 mfs13 dlh1.6 mlh1.6 mt3 mb3 instructions">
			Note: While you may choose any combination of DIRECTV, DISH Network,
			Bell TV, &/or any other circular satellites you will be limited to
			manual satellite switching. If you wish to enable automatic
			switching, go back &
			<a href="/wizard/9.php" class="highlight">choose the desired
			service provider instead.</a>
		</div>

		<div class="tac">
			<div class="wiz-opt">
				<div class="dfs21 mfs11 dlh1.2 wiz-opt-title">Choose a Single Satellite</div>
				<div class="tal dfs13 mfs13 dlh1.6 mlh1.6 wiz-opt-copy">
					<div class="wiz-opt-single-satellite-img"></div>
				</div>
				<div class="btn basic-btn wiz-opt-btn">
					<label>Choose Satellite</label>
				</div>
			</div><!--
		 --><div class="wiz-opt">
				<div class="dfs21 mfs11 dlh1.2 wiz-opt-title">Create a New Group of Satellites</div>
				<div class="tal dfs13 mfs13 dlh1.6 mlh1.6 wiz-opt-copy">
					<div class="wiz-opt-new-group-img"></div>
				</div>
				<div class="btn basic-btn wiz-opt-btn">
					<label>Create Group</label>
				</div>
			</div>
		</div>
	</div>

	<div class="bottom-bar">
		<a href="/wizard/14.php" class="btn prev-btn prev-icon fl">Previous</a>
		<a href="/wizard/16.php" class="btn next-btn next-icon fr">Next</a>
	</div>
 </div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<style type="text/css">
	.highlight {
		color: #669beb;
		text-decoration: underline;
	}
</style>