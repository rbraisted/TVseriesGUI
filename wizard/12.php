<? include $_SERVER['DOCUMENT_ROOT'] . '/wizard.php'; ?>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="wiz-view">
	<div class="wiz-content">
		<div class="wiz-title-view tac bb dfs26 mfs21">DISH Network</div>
		<div class="tac dfs21 mfs16 mt3 mb1">Choose your DISH Network satellites.</div>
		<div id="radio-table">
			<div id="table-rows">
				<div id="table-row template radio-option" class="btn radio-btn radio-icon bb dfs16 mfs13"></div>
			</div>
		</div>
		<div class="tac mt2">
			<span class="cp dfs16 mfs11 highlighted">Learn more about these satellite options.</span>
		</div>
	</div>

	<div class="bottom-bar">
		<a href="/wizard/11.php" class="btn prev-btn prev-icon fl">Previous</a>
		<a href="/wizard/13.php" class="btn next-btn next-icon fr">Next</a>
	</div>
 </div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<style type="text/css">
	.highlighted {
		color: #669beb;
		text-decoration: underline;
	}
</style>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<script type="text/javascript">
	$(function() {
		var 
		table = TVRO.Table('#radio-table'),
		radio = TVRO.Radio(table),
		data = ['Western Arc (110, 119, 129)', 
				'Eastern Arc (61, 72, 77)', 
				'TriSat East (61, 110, 119)', 
				'DISH 500 (110, 119)', 
				'Other'];

		table.build(function(i, row) {
			row.text(data[i]);
		});

		table.build(data.length);
		radio.refresh();
	});
</script>