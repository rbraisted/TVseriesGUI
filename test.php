<!DOCTYPE html>
<html>

<head>
	<title></title>
	<link type="text/css" rel="stylesheet" href="/css/reset.css">
</head>
<body>
	<div class="table-wrap">
		<table>
			<thead>
				<tr>
					<th class="col-1"></th>
					<th class="col-2"></th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td class="col-1">
						<div class="td-content-wrap">
							this text is too long! 
							this text is too long! 
							this text is too long! 
							this text is too long! 
							this text is too long! 
							this text is too long! 
							this text is too long! 
							this text is too long! 
							this text is too long! 
							this text is too long! 
							this text is too long! 
							this text is too long! 
							this text is too long! 
							this text is too long! 
						</div>
					</td>
					<td class="col-2"></td>
				</tr>
			</tbody>
		</table>
	</div>
</body>
<style type="text/css">
	* {
		box-sizing: border-box;
	}

	body {
		width: 100%;
	}

	.table-wrap {
		background: #f5aacb;
		height: 500px;
		width: 500px;
		margin: 50px auto;
	}

	table {
		width: 100%;
	}

	thead {
		border-bottom: 1px solid red;
		text-align: left;
	}

	td, th {
		padding: 5px;
	}

	.col-1 {
		width: 20%;
		background: green;
	}

	.col-2 {
		width: 80%;
		background: blue;
	}

	.td-content-wrap {
		min-width: 110px;
	}

	/*
	.blue-btn {
		-webkit-background-clip: border-box;
		-webkit-background-origin: padding-box;
		-webkit-background-size: 21px 21px;
		-webkit-user-select: none;
		background-attachment: scroll;
		background-clip: border-box;
		background-color: rgba(0, 0, 0, 0);
		background-image: url(http://localhost/images/radio.png);
		background-origin: padding-box;
		background-size: 21px 21px;
		border-bottom-color: rgb(255, 255, 255);
		border-bottom-style: none;
		border-bottom-width: 0px;
		border-collapse: collapse;
		border-image-outset: 0px;
		border-image-repeat: stretch;
		border-image-slice: 100%;
		border-image-source: none;
		border-image-width: 1;
		border-left-color: rgb(255, 255, 255);
		border-left-style: none;
		border-left-width: 0px;
		border-right-color: rgb(255, 255, 255);
		border-right-style: none;
		border-right-width: 0px;
		border-top-color: rgb(255, 255, 255);
		border-top-style: none;
		border-top-width: 0px;
		box-sizing: border-box;
		color: rgb(255, 255, 255);
		cursor: pointer;
		display: block;
		font-family: Helvetica, Arial, sans-serif;
		font-size: 13px;
		font-weight: 100;
		height: 21px;
		line-height: 13px;
		margin-bottom: 0px;
		margin-left: 0px;
		margin-right: 0px;
		margin-top: 0px;
		min-height: 21px;
		min-width: 21px;
		outline-color: rgb(255, 255, 255);
		outline-style: none;
		outline-width: 0px;
		padding-bottom: 0px;
		padding-left: 0px;
		padding-right: 0px;
		padding-top: 0px;
		position: relative;
		text-align: left;
		text-rendering: optimizelegibility;
		vertical-align: baseline;
		width: 59px;
	}
	*/
</style>
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