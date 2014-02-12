<!DOCTYPE html>
<html>

<head>
	<title></title>
	<link type="text/css" rel="stylesheet" href="/css/reset.css">
	<script type="text/javascript" src="/js/jquery-1.10.2.min.js"></script>
	<script type="text/javascript" src="/js/base.js"></script>
</head>
<body>
	<div class="test">
		<span class="test-span">Satellites AUTOSWITCH</span>
		<img class="test-img" src="/images/test.svg">
	</div>
	<div id="table" class="table-wrap">
		<table>
			<thead>
				<tr>
					<th class="selected-col">Installed</th>
					<th id="name-btn" class="name-col cp">Name</th>
					<th id="orbital-slot-btn" class="orbital-slot-col cp">Orbital Slot</th>
					<th id="region-btn" class="region-col cp">Region</th>
				</tr>
			</thead>
 			<tbody id="table-rows">
				<tr id="template table-row">
					<td class="selected-col radio-icon"></td>
					<td class="name-col">
						<span id="name"></span>
						<span id="region"></span>
					</td>
					<td id="orbital-slot" class="orbital-slot-col"></td>
					<td id="region" class="region-col"></td>
				</tr>
			</tbody>
		</table>
	</div>
</body>

<style id="style" type="text/css">

	.test {
		height: 50px;
		background: red;
	}

	.test:before {
		content: '';
		vertical-align: middle;
		height: 100%;
		display: inline-block;
		width: 0px;
		overflow: hidden;
		margin-right: -0.125em;
	}

	.test-span {
		vertical-align: middle;
	}

	.test-img {
		display: none;
		/*vertical-align: middle;*/
	}

	.cp {
		cursor: pointer;
	}

	* {
		box-sizing: border-box;
		-moz-box-sizing: border-box;
		cursor: inherit;
		font-size-adjust: 0.55;
		text-rendering: optimizeLegibility;	
		user-select: none;
		-webkit-touch-callout: none;
		-webkit-user-select: none;
		-khtml-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
	}

	*:hover {
		outline: 1px solid #f5aacb;
	}

	html,
	body {
		width: 100%;
		background: black;
	}

	body {
		color: #fff;
		cursor: default;
		font-family: Helvetica, Arial, sans-serif;
		font-size: 16px;
		font-weight: lighter;
		line-height: 1;
	}

	.table-wrap {
		background: white;
		/*height: 500px;*/
		width: 500px;
		margin: 50px auto;
	}

	.table-scroll {
		height: 500px;
		overflow: auto;
	}

	/*

	243774	normal blue
	4f7abd	selected blue
	4c5168	grey 1
	3b4154	grey 2

	*/

	table {
		width: 100%;
	}

	thead {
		font-size: 11px;
		font-weight: inherit;
		text-align: left;
	}

	thead tr {
		background: #243774;
	}

	tbody {
		font-size: 13px;
	}

	tbody tr {
		background: #3b4154;
	}

	tbody tr:nth-child(even) {
		background: #4c5168;
	}

	tr {
		border-bottom: 1px solid #4f7abd;
	}

	th {
		font-weight: inherit;
		height: 25px;
		padding: 0 10px;
		vertical-align: middle;
	}

	td {
		height: 45px;
		padding: 10px;
		vertical-align: middle;
	}

	.thead {
		background: #243774;
		display: block;
		line-height: 25px;
		font-size: 11px;
		white-space: nowrap;
	}

	.th {
		display: inline-block;
		padding: 0 10px;
	}

	.selected-col {
		padding: 0;
		text-align: center;
		width: 10%;
	}

	.name-col {
		width: 40%;
	}

	.orbital-slot-col {
		width: 20%;
	}

	.region-col {
		width: 30%;
	}

	.radio-icon {
		background: transparent url(/images/radio.png) no-repeat center center;
		background-size: 21px 21px;
		min-height: 21px;
		min-width: 21px;
	}


/*	table {
		position: relative;
	}

	thead, tbody {
		display: block;
	}

	thead tr {
		display: block;
		position: relative;
		width: 100%;
	}

	tbody {
		height: 200px;
		overflow: auto;
		width: 100%;
	}
*/
</style>

<script id="script" type="text/javascript">
	$(function() {
		var
		table = TVRO.Table('#table'),
		data = [{
			name: 'Astra 1',
			region: 'Europe',
			antSatID: '19E'
		}, {
			name: 'Astra 2 North',
			region: 'Europe',
			antSatID: '28EN'
		}, {
			name: 'Astra 2 South',
			region: 'Europe',
			antSatID: '28ES'
		}, {
			name: 'Astra 3A',
			region: 'Europe',
			antSatID: '23E'
		}, {
			name: 'Amos 2',
			region: 'Europe',
			antSatID: '4W'
		}, {
			name: 'Amos 2 Middle East',
			region: 'Africa',
			antSatID: '4WME'
		}];

		table.build(function(i, row) {
			i = data[i%data.length];
			$('#name', row).text(i.name);
			$('#orbital-slot', row).text(i.antSatID);
			$('#region', row).text(i.region);
		});

		table.build(data.length * 3);
	});
</script>

</html>


<!--
<? //include $_SERVER['DOCUMENT_ROOT'] . '/base.php'; ?>
<link type="text/css" rel="stylesheet" href="/css/test.css">

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
		<span class="on">On</span>
		<span class="off">Off</span>
	</div>

	<div id="radio">
		<div id="radio-option" value="A" class="btn menu-btn"><label>Option A</label></div>
		<div id="radio-option" value="B" class="btn menu-btn"><label>Option B</label></div>
		<div id="radio-option" value="C" class="btn menu-btn"><label>Option C</label></div>
		<div id="radio-option" value="D" class="btn menu-btn"><label>Option D</label></div>
	</div>

	<div id="table">
		<div id="table-rows">
			<div id="template">
				<span id="id"></span>
				<span id="value"></span>
			</div>
		</div>
	</div>
</div>

<script type="text/javascript">
	$(function() {
		var g = TVRO.Table('#satellites-table');
		g.build(function(i, row) {
			// $('#name', row).text("Sat-Name");
			// $('#region', row).text(i%5 === 1 ? "Long-Region-Name-To-Test-Wrapping" : "Region-Name");
		});
		g.build(50);

		var toggle = TVRO.Toggle('#toggle');
		toggle.click(function(isOn) {
			console.log(isOn);
		});

		var radio = TVRO.Radio('#radio');
		radio.click(function(value) {
			console.log(value);
		});

		radio.click('Brad');


		var tableData = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];

		var table = TVRO.Table('#table');
		table.build(function(i, row) {
			$('#id', row).text(i);
			$('#value', row).text(tableData[i]);
		});
		table.build(tableData.length);
	});
</script>
-->