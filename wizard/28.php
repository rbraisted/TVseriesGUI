<? include $_SERVER['DOCUMENT_ROOT'] . '/wizard.php'; ?>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="wiz-view">
	<div class="wiz-content">
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
		<a href="/wizard/27.php" class="btn prev-btn prev-icon fl">Previous</a>
		<a href="/wizard/29.php" class="btn next-btn next-icon fr">Next</a>
	</div>
 </div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<style type="text/css">
	.diagram {
		background: transparent url(/images/wizard-skew-large.png) no-repeat center center;
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

	@media screen and (max-width: 880px) {
		.skew { padding: 1em 20px 0;}

		.skew-table {
			margin-left: -20px;
			width: calc(100% + 40px);
		}
	}

	@media screen and (max-width: 440px) {
		.diagram {
			background-image: url(/images/wizard-skew-small.png);
			height: 280px;
		}
	}
</style>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<script type="text/javascript">
	$(function() {
		var radio = TVRO.Radio('#radio');
	});
</script>