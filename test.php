<? include $_SERVER['DOCUMENT_ROOT'] . '/base.php'; ?>
<link type="text/css" rel="stylesheet" href="/css/test.css">

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->
<div id="satellites-table-view" class="view main-view satellites-table-view">
	<div class="view-content main-content">
		<a id="back-btn" class="btn back-btn">
			<img src="/images/img.gif">
			<label>Satellites</label>
		</a>
		<h1>
			<img src="/images/img.gif">
			<span>Satellites</span>
		</h1>

		<table id="satellites-table" class="satellites-table">
			<thead>
				<tr>
					<th class="installed-col">
						<div>Installed</div>
					</th>
					<th class="name-col">
						<div id="name-btn sort-btn" class="btn sort-btn">Name</div>
					</th>
					<th class="orbital-slot-col">
						<div id="orbital-slot-btn sort-btn" class="btn sort-btn">Orbital</div>
					</th>
					<th class="region-col">
						<div id="region-btn sort-btn" class="btn sort-btn">Region</div>
					</th>
					<th class="favorites-col">
						<div id="favorites-btn sort-btn" class="btn sort-btn">Favorites</div>
					</th>
				</tr>
			</thead>
			<tbody id="table-rows">
				<tr id="template table-row">
					<td class="installed-col">
						<div id="select-btn" class="btn radio-icon"></div>
					</td>
					<td class="name-col">
						<span id="name">Name</span>
						<span id="region">Region</span>
					</td>
					<td class="orbital-slot-col">
						<span id="orbital-slot">Orbital Slot</span>
					</td>
					<td class="region-col">
						<span id="region">Region</span>
					</td>
					<td class="favorites-col">
						<div id="favorite-btn" class="btn heart-icon"></div>
						<div id="info-btn" class="btn info-icon"></div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>	
</div>

<div class="menu-view">
	<div id="toggle" class="btn toggle-btn">
		<span class="on">BRAD</span>
		<span class="off">MIKY</span>
	</div>

	<div id="radio">
		<div id="radio-option" value="Rigo" class="btn menu-btn"><label>Rigo</label></div>
		<div id="radio-option" value="Brad" class="btn menu-btn"><label>Brad</label></div>
		<div id="radio-option" value="Miky" class="btn menu-btn"><label>Miky</label></div>
		<div id="radio-option" value="Revo" class="btn menu-btn"><label>Revo</label></div>
	</div>

	<div id="table">
		<div id="table-rows">
			<div id="template">
				<span id="id"></span>
				| Age:
				<span id="age"></span>
				| Name:
				<span id="name"></span>
			</div>
		</div>
	</div>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<script type="text/javascript">
	$(function() {
		var g = TVRO.Table('#satellites-table');
		g.build(function(i, row) {
			$('#name', row).text("Row "+i);
			$('#region', row).text(!(i%5) ? "Extra Long Region Name" : "Region");
		});
		g.build(20);

		var toggle = TVRO.Toggle('#toggle');
		toggle.click(function(isBrad) {
			console.log(isBrad);
		});

		var radio = TVRO.Radio('#radio');
		radio.click(function(value) {
			console.log(value);
		});

		radio.click('Brad');


		var tableData = [{
			age: 27,
			name: 'Rigo'
		},
		{
			age: 24,
			name: 'Brad'
		},
		{
			age: '??',
			name: 'Revo'
		},
		{
			age: 25,
			name: 'Miky'
		}];

		var table = TVRO.Table('#table');
		table.build(function(i, row) {
			$('#id', row).text(i);
			$('#name', row).text(tableData[i].name);
			$('#age', row).text(tableData[i].age);
		});
		table.build(tableData.length);
	});
</script>