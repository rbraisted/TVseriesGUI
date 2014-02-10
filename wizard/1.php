<? include $_SERVER['DOCUMENT_ROOT'] . '/wizard.php'; ?>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<!--
	i left the ids blank, but you get the idea
	miky out
-->

<div class="wiz-view">
	<div class="wiz-content">
		<div class="wiz-title-view tac bb dfs26 mfs21">
			Welcome to The <span class="desktop">TracVision Setup </span>Wizard
		</div>

		<div class="tac mb3 mt3 dfs21 mfs16 dlh1.2 mlh1.6">
			System Detected:<br class="mobile">
			<span class="dfs26 mfs21">
				Tracvision <span id="">XX-X</span>
				<span class="desktop">with</span>
				<br class="mobile">
				<span id="">XXXXX</span> LNB
			</span>
		</div>

		<div class="d2col dlh1.2 mlh1.6 mb2">
			<div class="tac mb1 dfs21 mfs16">
				Before you start the Wizard,<br>
				please do the following:
			</div>
			<div class="step step-1 bb dfs16 mfs13">
				Identify the desired service provider<br>
				& associated satellite(s)
				<div class="bullet tac dfs21 mfs16">1</div>
			</div>
			<div class="step step-2 bb dfs16 mfs13">
				Download the latest antenna software
				<div class="bullet tac dfs21 mfs16">2</div>
			</div>
			<div class="step step-3 bb dfs16 mfs13">
				Connect all system components for<br>
				your particular configuration
				<div class="bullet tac dfs21 mfs16">3</div>
			</div>
		</div><!--
	 --><div class="d2col dlh1.2 mlh1.6">
			<div class="tac mb1 dfs21 mfs16">
				I have everything I need.<br>
				Let's get started!
			</div>
			<div class="tac dfs13 mfs13">
				Please note that the setup process might<br>
				take up to 30 minutes to complete.
			</div>
			<div class="tac mt2">
				<a href="/wizard/2.php" class="btn basic-btn">
					<label>Proceed with Setup Wizard</label>
				</a>
			</div>
		</div>
	</div>

	<div class="bottom-bar">
		<a href="/home.php" class="btn exit-btn exit-icon fl">Exit</a>
		<a href="/wizard/2.php" class="btn next-btn next-icon fr">Next</a>
	</div>
 </div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<style type="text/css">
	.step {
		height: 65px;
		position: relative;
		margin: auto 15px auto 75px;
	}

	@media screen and (max-width: 880px) {
		.step { margin: auto 20px auto 75px; }
	}

	.step-1, .step-3 { padding-top: 12px; }
	.step-2 { padding-top: 22px; }

	.bullet {
		background-color: #466ab2;
		border-radius: 100%;
		height: 45px;
		left: -60px;
		line-height: 45px;
		position: absolute;
		top: 10px;
		width: 45px;
	}
</style>