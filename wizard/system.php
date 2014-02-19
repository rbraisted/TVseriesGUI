<? include $_SERVER['DOCUMENT_ROOT'] . '/wizard.php'; ?>
<script type="text/javascript" src="/js/wizard/system.js"></script>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<!-- 28 -->

<div id="skew-angle-view" class="view main-view wiz-view skew-angle-view">
	<div class="view-content main-content wiz-content">
		<div class="wiz-title-view tac bb dfs26 mfs21 mb2">Set Skew Angle</div>
		<div class="d2col dlh1.6 mlh1.2 mt1 mb2 skew">
			<div class="dfs16 mfs13">
				Based on your selections, the LNB inside the antenna
				needs to be set to the following skew angle:
			</div>
			<div id="single" class="dfs26 mfs21 mt1 mb1">
				<span id="skew">X X </span>˚ Skew Angle
			</div>
			<table id="group" class="mt1 mb1 skew-table">
				<thead>
					<th class="slot-col">Slot</th>
					<th class="name-col">Satellite</th>
					<th class="skew-col">Skew Angle</th>
				</thead>
				<tbody>
					<tr id="slot-a">
						<td class="slot-col">A</td>
						<td id="name" class="name-col"></td>
						<td class="skew-col">
							<span id="skew"></span>˚
						</td>
					</tr>
					<tr id="slot-b">
						<td class="slot-col">B</td>
						<td id="name" class="name-col"></td>
						<td class="skew-col">
							<span id="skew"></span>˚
						</td>
					</tr>
					<tr id="slot-c">
						<td class="slot-col">C</td>
						<td id="name" class="name-col"></td>
						<td class="skew-col">
							<span id="skew"></span>˚
						</td>
					</tr>
					<tr id="slot-d">
						<td class="slot-col">D</td>
						<td id="name" class="name-col"></td>
						<td class="skew-col">
							<span id="skew"></span>˚
						</td>
					</tr>
				</tbody>
			</table>
			<div class="dfs21 mfs16">
				Important!
			</div>
			<div class="mfs11 mb1 mobile"></div>
			<div class="dfs16 mfs13">
				Do not attempt to adjust the LNB with the antenna powered on.
				The antenna’s moving parts can cause injury. Just note the skew
				angle for now. When you complete the wizard, disconnect power
				from the antenna then adjust the LNB to the proper skew angle.
			</div>
		</div><!--
	 --><div class="d2col dlh1.2 mlh1.6 mb2">
			<div class="diagram"></div>
			<div class="cp tac dfs16 mfs13 mt2 wiz-link">
				Learn how to adjust the LNB’s skew angle.
			</div>
		</div>
	</div>

	<div class="bottom-bar">
		<a id="prev-btn" class="btn prev-btn prev-icon fl">Previous</a>
		<a id="next-btn" class="btn next-btn next-icon fr">Next</a>
	</div>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<!-- 29 + 30 -->

<div id="other-system-config-view" class="view main-view wiz-view other-system-config-view">
	<div class="view-content main-content wiz-content">
		<div class="wiz-title-view tac bb dfs26 mfs21"><span class="desktop">Choose Your </span>System Configuration</div>
		<div class="tac dfs21 mfs16 dlh1.6 mt2 mb2 wiz-instructions">
			Choose the configuration that most closely resembles<br class="desktop">
			the one on your vessel.
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
		<a id="prev-btn" class="btn prev-btn prev-icon fl">Previous</a>
		<a id="next-btn" class="btn next-btn next-icon fr">Next</a>
	</div>
 </div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<!-- 31 -->

<div id="linear-system-config-view" class="view main-view wiz-view linear-system-config-view">
	<div class="view-content main-content wiz-content">
		<div class="wiz-title-view tac bb dfs26 mfs21"><span class="desktop">Choose Your </span>System Configuration</div>
		<div class="tac dfs21 mfs16 dlh1.6 mt2 mb1">
			Choose the configuration that most closely resembles<br class="desktop">
			the one on your vessel.
		</div>
		<div id="radio" class="wiz-radio">
			<div id="radio-option" class="btn radio-btn radio-icon bb">
				<span class="dfs16 mfs13">
					Configuration 1<span class="desktop">:</span>
				</span>
				<br class="mobile">
				<span class="dfs13 mfs11">1-4 Recievers (1 master reciever)</span>
				<div id="diagram-1-btn" class="info-icon info-btn"></div>
			</div>
			<div id="radio-option" class="btn radio-btn radio-icon bb">
				<span class="dfs16 mfs13">
					Configuration 2<span class="desktop">:</span>
				</span>
				<br class="mobile">
				<span class="dfs13 mfs11">1-4 Recievers with AutoSwitch(es) installed (multiple master recievers)</span>
				<div id="diagram-2-btn" class="info-icon info-btn"></div>
			</div>
			<div id="radio-option" class="btn radio-btn radio-icon bb">
				<span class="dfs16 mfs13">
					Configuration 3<span class="desktop">:</span>
				</span>
				<br class="mobile">
				<span class="dfs13 mfs11">5+ Receivers + multiswitch (manual satellite switching only)</span>
				<div id="diagram-3-btn" class="info-icon info-btn"></div>
			</div>
			<div id="radio-option" class="btn radio-btn radio-icon bb">
				<span class="dfs16 mfs13">
					Configuration 4<span class="desktop">:</span>
				</span>
				<br class="mobile">
				<span class="dfs13 mfs11">5+ Recievers with AutoSwitch(es) installed (1+ master receivers) + multiswitch</span>
				<div id="diagram-4-btn" class="info-icon info-btn"></div>
			</div>
		</div>
	</div>

	<div class="bottom-bar">
		<a id="prev-btn" class="btn prev-btn prev-icon fl">Previous</a>
		<a id="next-btn" class="btn next-btn next-icon fr">Next</a>
	</div>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div id="diagram-1-view" class="view popup-view diagram-view diagram-1-view">
	<div class="view-content popup-content">
		<a id="close-btn" class="btn back-btn">
			<img src="/images/img.gif">
			<label>Configuration 1</label>
		</a>
		<h1>Configuration 1</h1>
		<img src="/images/wizard-diagram-1.svg">
	</div>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div id="diagram-2-view" class="view popup-view diagram-view diagram-2-view">
	<div class="view-content popup-content">
		<a id="close-btn" class="btn back-btn">
			<img src="/images/img.gif">
			<label>Configuration 2</label>
		</a>
		<h1>Configuration 2</h1>
		<img src="/images/wizard-diagram-2.svg">
	</div>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div id="diagram-3-view" class="view popup-view diagram-view diagram-3-view">
	<div class="view-content popup-content">
		<a id="close-btn" class="btn back-btn">
			<img src="/images/img.gif">
			<label>Configuration 3</label>
		</a>
		<h1>Configuration 3</h1>
		<img src="/images/wizard-diagram-3.svg">
	</div>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div id="diagram-4-view" class="view popup-view diagram-view diagram-4-view">
	<div class="view-content popup-content">
		<a id="close-btn" class="btn back-btn">
			<img src="/images/img.gif">
			<label>Configuration 4</label>
		</a>
		<h1>Configuration 4</h1>
		<img src="/images/wizard-diagram-4.svg">
	</div>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<style type="text/css">
	body.at-splash .linear-system-config-view,
	body.at-skew-angle-view .skew-angle-view,
	body.at-other-system-config-view .other-system-config-view,
	body.at-linear-system-config-view .linear-system-config-view,
	body.at-diagram-1-view .diagram-1-view,
	body.at-diagram-2-view .diagram-2-view,
	body.at-diagram-3-view .diagram-3-view,
	body.at-diagram-4-view .diagram-4-view {
		display: block;
	}

	@media screen and (min-width: 880px) {
		body.at-diagram-1-view .linear-system-config-view,
		body.at-diagram-2-view .linear-system-config-view,
		body.at-diagram-3-view .linear-system-config-view,
		body.at-diagram-4-view .linear-system-config-view {
			display: block;
		}
	}

	.diagram {
		background: transparent url(/images/wizard-skew.svg) no-repeat center/320px;
		height: 350px;
		width: 100%;
		margin: auto;
	}

	.skew-table { display: none; }
	.skew-table thead tr { border: 0; }
	.skew-table tbody tr { background-color: transparent; }

	.slot-col {
		text-align: center;
		width: 15%;
	}

	.name-col { width: 55%; }
	.skew-col { width: 30%; }

	.linear-system-config-view .info-btn {
		height: 100%;
		position: absolute;
		right: 0;
		top: 0;
	}

	@media screen and (max-width: 880px) {
		.skew { padding: 1em 20px 0;}

		.skew-table {
			margin-left: -20px;
			width: calc(100% + 40px);
		}

		.linear-system-config-view .radio-btn {
			line-height: 1.2;
			padding-top: 10px;
			padding-bottom: 10px;
			padding-right: 40px;
		}
	}

	@media screen and (max-width: 440px) {
		.diagram {
			background-size: 260px;
			height: 280px;
		}
	}
</style>