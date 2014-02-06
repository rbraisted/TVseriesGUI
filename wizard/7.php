<? include $_SERVER['DOCUMENT_ROOT'] . '/wizard.php'; ?>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="wizard-view">
	<div class="wizard-content">
		<div class="wizard-title-view tac bb dfs26 mfs21">Installer Identification</div>
		<div class="tac dfs21 mfs16 mt3 mb1">Who Installed the TracVision System?</div>

		<div class="test">
		<table id="table">
			<thead>
				<tr>
					<th class="installed-col">Installed</th>
					<th class="source-col">Source</th>
					<th class="state-col">State</th>
				</tr>
			</thead>
			<tbody id="table-rows">
				<tr id="template table-row" class="cp">
					<td class="installed-col radio-icon"></td>
					<td id="source" class="source-col"></td>
					<td id="state" class="state-col"></td>
				</tr>
			</tbody>
		</table>
		</div>
	</div>

	<div class="bottom-bar">
		<a href="/wizard/4.php" class="btn prev-btn prev-icon fl">Previous</a>
		<a href="/wizard/6.php" class="btn next-btn next-icon fr">Next</a>
	</div>
 </div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<style type="text/css">
	.installed-col { width: 15%; min-width: 15%; }
	.source-col { width: 42%; min-width: 42%; }
	.state-col { width: 43%; min-width: 43%; }
	.test { width: 700px; }
</style>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<script type="text/javascript">
	$(function() {
		var 
		table = TVRO.Table('#table'),
		// radio = TVRO.Radio(table),
		data = ['The Quick Brown Fox Jumps Over The Lazy Dog',
				'NMEA 0183', 
				'NMEA 2000',
				'Other'];

		table.build(function(i, row) {
			$('#source', row).text(data[i]);
			$('#state', row).text(data[i]);			
		});

		table.build(data.length);
		// radio.refresh();
	});
</script>