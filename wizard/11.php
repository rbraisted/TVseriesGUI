<? include $_SERVER['DOCUMENT_ROOT'] . '/wizard.php'; ?>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="wizard-view">
	<div class="wizard-content">
		<div class="wizard-title-view tac bb dfs26 mfs21">DIRECTV</div>
		<div class="tac dfs21 mfs16 mlh1.6 mt3 mb3">Success! You’re now setup for all your DIRECTV programming!</div>

		<div class="option option-1">
			<div class="tac dfs21 mfs11 option-title">Single Satellite</div>
			<div class="dfs13 mfs13 dlh1.6 mlh1.6 option-copy">
				For programming on the 101 satellite, you are ready to activate
				your system!
			</div>
			<div class="btn basic-btn option-btn">
				<label>Activate Me!</label>
			</div>
		</div><!--
	 --><div class="option option-2">
			<div class="tac dfs21 mfs11 option-title">Manual Switching</div>
			<div class="dfs13 mfs13 dlh1.6 mlh1.6 option-copy">
				For programming on the 101 & 119 satellites with manual switching
				between them, you are ready to activate your system!
			</div>
			<div class="btn basic-btn option-btn">
				<label>Activate Me!</label>
			</div>
		</div><!--
	 --><div class="option option-3">
			<div class="tac dfs21 mfs11 option-title">Automatic Switching</div>
			<div class="dfs13 mfs13 dlh1.6 mlh1.6 option-copy">
				For programming on the 101 & 119 satellites with automatic switching
				between them, you need to set up the system for automatic switching.
			</div>
			<div class="btn basic-btn option-btn">
				<label>Setup Automatic Switching</label>
			</div>
		</div>
	</div>

	<div class="bottom-bar">
		<a href="/wizard/9.php" class="btn prev-btn prev-icon fl">Previous</a>
		<a href="/wizard/11.php" class="btn next-btn next-icon fr">Next</a>
	</div>
 </div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<style type="text/css">
	.option {
		background-color: #283148;
		position: relative;
		vertical-align: top;
	}

	.option-btn {
		display: block;
		left: 0;
		position: absolute;
		width: 100%;
	}

	@media screen and (max-width: 880px) {
		.wizard-content {
			max-width: none;
		}

		.option-title {
			background-color: #000;
			line-height: 25px;
			width: 100%;
		}

		.option-copy {
			background: transparent url(/images/menu-btn.png) no-repeat right 20px center;
			padding: 20px 60px 20px 20px;
		}

		.option-btn,
		.option-btn:hover {
			background-color: transparent;
			height: 100%;
			top: 0;
		}

		.option-btn label {
			display: none;
		}
	}

	@media screen and (min-width: 880px) {
		.option {
			display: inline-block;
			height: 200px;
			padding: 0 20px;
			width: calc(33.33% - 20px);
		}

		.option-2 {
			margin-left: 30px;
			margin-right: 30px;
		}

		.option-title {
			border-bottom: 1px solid #fff;
			line-height: 60px;
		}

		.option-copy {
			padding: 20px 5px;
		}

		.option-btn {
			top: 100%;
			margin-top: 15px;
		}
	}
</style>