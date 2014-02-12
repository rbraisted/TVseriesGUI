<? include $_SERVER['DOCUMENT_ROOT'] . '/wizard.php'; ?>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="wiz-view">
	<div class="wiz-content">
		<div class="wiz-title-view tac bb dfs26 mfs21">Choose the Active Service</div>
		<div class="tac dfs21 mfs16 mt3 mb1">Which service do you want the antenna to track now?</div>
		<div id="radio" class="wiz-radio">
			<div id="radio-option" class="btn radio-btn radio-icon bb">
				<span class="dfs16 mfs13">
					Configuration 1<span class="desktop">:</span>
				</span>
				<br class="mobile">
				<span class="dfs13 mfs11">1-4 Recievers (1 master reciever)</span>
				<div class="info-icon info-btn"></div>
			</div>
			<div id="radio-option" class="btn radio-btn radio-icon bb">
				<span class="dfs16 mfs13">
					Configuration 2<span class="desktop">:</span>
				</span>
				<br class="mobile">
				<span class="dfs13 mfs11">1-4 Recievers with AutoSwitch(es) installed (multiple master recievers)</span>
				<div class="info-icon info-btn"></div>
			</div>
			<div id="radio-option" class="btn radio-btn radio-icon bb">
				<span class="dfs16 mfs13">
					Configuration 3<span class="desktop">:</span>
				</span>
				<br class="mobile">
				<span class="dfs13 mfs11">5+ Receivers + multiswitch (manual satellite switching only)</span>
				<div class="info-icon info-btn"></div>
			</div>
			<div id="radio-option" class="btn radio-btn radio-icon bb">
				<span class="dfs16 mfs13">
					Configuration 4<span class="desktop">:</span>
				</span>
				<br class="mobile">
				<span class="dfs13 mfs11">5+ Recievers with AutoSwitch(es) installed (1+ master receivers) + multiswitch</span>
				<div class="info-icon info-btn"></div>
			</div>
		</div>
	</div>

	<div class="bottom-bar">
		<a href="/wizard/30.php" class="btn prev-btn prev-icon fl">Previous</a>
		<a href="/wizard/32.php" class="btn next-btn next-icon fr">Next</a>
	</div>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<style type="text/css">
	.info-btn {
		height: 100%;
		position: absolute;
		right: 0;
		top: 0;
	}

	@media screen and (max-width: 880px) {
		.radio-btn {
			line-height: 1.2;
			padding-top: 10px;
			padding-bottom: 10px;
			padding-right: 40px;
		}		
	}
</style>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<script type="text/javascript">
	$(function() {
		var radio = TVRO.Radio('#radio');
	});
</script>