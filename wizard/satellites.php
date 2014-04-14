<?
$wiz = true;
include $_SERVER['DOCUMENT_ROOT'] . '/base_.php';
?>

<script type="text/javascript" src="/js/SatTableView.js"></script>
<script type="text/javascript" src="/js/SatInfoView.js"></script>
<script type="text/javascript" src="/js/SatEditView.js"></script>
<script type="text/javascript" src="/js/GroupTableView.js"></script>
<script type="text/javascript" src="/js/GroupInfoView.js"></script>
<script type="text/javascript" src="/js/GroupEditView.js"></script>

<script type="text/javascript" src="/js/wizard/satellites.js"></script>

<div class="view options #options-view">
  <div class="view-head">Satellite Selection</div>

  <div class="grey-box-table #table-view">
    <div class="table-row #table-row">
      <div class="title #title"></div>
      <div class="image"></div>
      <div class="radio-icon"></div>
    </div>
  </div>

  <div class="bottom-bar">
    <div class="prev-btn #prev-btn">Previous</div>
    <div class="next-btn #next-btn">Next</div>
  </div>
</div>



<div class="view circular-options #circular-options-view">
  <div class="view-head">Satellite Selection</div>
  <div class="headline">
    Note: While you may choose any combination of DIRECTV, DISH Network, &/or
    any other circular satellites you will be limited to manual satellite
    switching. If you wish to enable automatic switching, go back &
    <span class="link #service-btn">
      choose the desired service provider instead.
    </span>
  </div>

  <div class="grey-box-table #table-view">
    <div class="table-row #table-row">
      <div class="title #title"></div>
      <div class="image"></div>
      <div class="radio-icon"></div>
    </div>
  </div>

  <div class="bottom-bar">
    <div class="prev-btn #prev-btn">Previous</div>
    <div class="next-btn #next-btn">Next</div>
  </div>
</div>



<div class="view tv5-manual-options #tv5-manual-options-view">
  <div class="view-head">Satellite Selection</div>
  <div class="headline">
    * You will have the opportunity to create your own group if one of
    the preset groups doesn’t meet your needs.
  </div>

  <div class="grey-box-table #table-view">
    <div class="table-row #table-row">
      <div class="title #title"></div>
      <div class="image"></div>
      <div class="radio-icon"></div>
    </div>
  </div>

  <div class="bottom-bar">
    <div class="prev-btn #prev-btn">Previous</div>
    <div class="next-btn #next-btn">Next</div>
  </div>
</div>



<!--

<div id="options-view" class="view main-view wiz-view options-view">
	<div class="view-content main-content wiz-content">
		<div class="wiz-title-view tac bb dfs26 mfs21">Satellite Selection</div>
		<div class="tac i dfs13 mfs13 dlh1.6 mlh1.6 mt3 mb3 wiz-instructions"><br></div>
		<div class="tac">
			<div id="radio-option" value="SINGLE" class="wiz-opt cp">
				<div class="dfs21 mfs11 dlh1.2 wiz-opt-title">Choose a Single Satellite</div>
				<div class="wiz-opt-single-satellite-img"></div>
				<div class="radio-icon wiz-opt-radio"></div>
			</div>
		  <div id="radio-option" value="PRESET" class="wiz-opt cp">
				<div class="dfs21 mfs11 dlh1.2 wiz-opt-title">Choose a Preset Group of Satellites</div>
				<div class="wiz-opt-preset-group-img"></div>
				<div class="radio-icon wiz-opt-radio"></div>
			</div>
		  <div id="radio-option" value="NEW" class="wiz-opt cp">
				<div class="dfs21 mfs11 dlh1.2 wiz-opt-title">Create a New Group of Satellites</div>
				<div class="wiz-opt-new-group-img"></div>
				<div class="radio-icon wiz-opt-radio"></div>
			</div>
		</div>
	</div>
	<div class="bottom-bar">
		<a id="prev-btn" class="btn prev-btn prev-icon fl">Previous</a>
		<a id="next-btn" class="btn next-btn next-icon fr">Next</a>
	</div>
</div>

<div id="circular-options-view" class="view main-view wiz-view circular-options-view">
	<div class="view-content main-content wiz-content">
		<div class="wiz-title-view tac bb dfs26 mfs21">Satellite Selection</div>
		<div class="tac i dfs13 mfs13 dlh1.6 mlh1.6 mt3 mb3 wiz-instructions">
			Note: While you may choose any combination of DIRECTV, DISH Network,
			Bell TV, &/or any other circular satellites you will be limited to
			manual satellite switching. If you wish to enable automatic
			switching, go back &
			<a href="/wizard/9.php" class="wiz-link">choose the desired
			service provider instead.</a>
		</div>
		<div class="tac">
			<div id="radio-option" value="SINGLE" class="wiz-opt cp">
				<div class="dfs21 mfs11 dlh1.2 wiz-opt-title">Choose a Single Satellite</div>
				<div class="wiz-opt-single-satellite-img"></div>
				<div class="radio-icon wiz-opt-radio"></div>
			</div>
		  <div id="radio-option" value="NEW" class="wiz-opt cp">
				<div class="dfs21 mfs11 dlh1.2 wiz-opt-title">Create a New Group of Satellites</div>
				<div class="wiz-opt-new-group-img"></div>
				<div class="radio-icon wiz-opt-radio"></div>
			</div>
		</div>
	</div>
	<div class="bottom-bar">
		<a id="prev-btn" class="btn prev-btn prev-icon fl">Previous</a>
		<a id="next-btn" class="btn next-btn next-icon fr">Next</a>
	</div>
</div>

<div id="tv5-manual-options-view" class="view main-view wiz-view tv5-manual-options-view">
	<div class="view-content main-content wiz-content">
		<div class="wiz-title-view tac bb dfs26 mfs21">Satellite Selection</div>
		<div class="tac i dfs13 mfs13 dlh1.6 mlh1.6 mt3 mb3 wiz-instructions">
			* You will have the opportunity to create your own group if one of
			the preset groups doesn’t meet your needs.
		</div>
		<div class="tac">
			<div id="radio-option" value="SINGLE" class="wiz-opt cp">
				<div class="dfs21 mfs11 dlh1.2 wiz-opt-title">Choose a Single Satellite</div>
				<div class="wiz-opt-single-satellite-img"></div>
				<div class="radio-icon wiz-opt-radio"></div>
			</div>
		  <div id="radio-option" value="PRESET" class="wiz-opt cp">
				<div class="dfs21 mfs11 dlh1.2 wiz-opt-title">Choose a Preset Group of Satellites</div>
				<div class="wiz-opt-preset-group-img"></div>
				<div class="radio-icon wiz-opt-radio"></div>
			</div>
		  <div id="radio-option" value="NEW" class="wiz-opt cp">
				<div class="dfs21 mfs11 dlh1.2 wiz-opt-title">Create a New Group of Satellites</div>
				<div class="wiz-opt-new-group-img"></div>
				<div class="radio-icon wiz-opt-radio"></div>
			</div>
		</div>
	</div>
	<div class="bottom-bar">
		<a id="prev-btn" class="btn prev-btn prev-icon fl">Previous</a>
		<a id="next-btn" class="btn next-btn next-icon fr">Next</a>
	</div>
</div>

<div id="single-view" class="view main-view wiz-view single-view">
	<div class="view-content main-content wiz-content">
		<div class="wiz-title-view tac bb dfs26 mfs21">
			<div id="back-btn" class="btn back-btn prev-icon"></div>
			Select a Satellite
		</div>
		<div class="tac dfs16 dlh1.6 mt2 mb2 wiz-instructions desktop">
			Select a region. Then choose a satellite in that region.
		</div>
		<div class="container">
			<div id="radio" class="menu-view">
				<h1>Region</h1>
				<div class="tac mlh1.6 mfs13 mt1 mb2 wiz-instructions mobile">
					Select a region. Then choose a satellite in that region.
				</div>
				<a id="radio-option" value="Africa" class="btn menu-btn">
					<img src="/images/img.gif">
					<label>Africa</label>
				</a>
				<a id="radio-option" value="Asia" class="btn menu-btn">
					<img src="/images/img.gif">
					<label>Asia</label>
				</a>
				<a id="radio-option" value="Australia" class="btn menu-btn">
					<img src="/images/img.gif">
					<label>Australia / New Zealand</label>
				</a>
				<a id="radio-option" value="Central/South America" class="btn menu-btn">
					<img src="/images/img.gif">
					<label>Central / South America</label>
				</a>
				<a id="radio-option" value="Europe" class="btn menu-btn">
					<img src="/images/img.gif">
					<label>Europe</label>
				</a>
				<a id="radio-option" value="North America" class="btn menu-btn">
					<img src="/images/img.gif">
					<label>North America</label>
				</a>
				<a id="radio-option" value="All" class="btn menu-btn">
					<img src="/images/img.gif">
					<label>All</label>
				</a>
			</div>
			<div class="right main-view">
				<h1>Satellites</h1>
				<div class="satellites-table-container">
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
									<div id="orbital-slot-btn sort-btn" class="btn sort-btn">Orbital Slot</div>
								</th>
								<th class="region-col">
									<div id="region-btn sort-btn" class="btn sort-btn">Region</div>
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
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
	<div class="bottom-bar">
		<a id="prev-btn" class="btn prev-btn prev-icon fl">Previous</a>
		<a id="next-btn" class="btn next-btn next-icon fr">Next</a>
	</div>
</div>

<div id="group-view" class="view main-view wiz-view group-view">
	<div class="view-content main-content wiz-content">
		<div class="wiz-title-view tac bb dfs26 mfs21">
			<div id="back-btn" class="btn back-btn prev-icon"></div>
			Select a Satellite Group
		</div>
		<div class="tac dfs16 dlh1.6 mt2 mb2 wiz-instructions desktop">
			Select a group name to view its included satellites.
		</div>
		<div class="container">
			<div id="radio" class="menu-view">
				<h1>Groups</h1>
				<div class="tac mfs13 mlh1.6 mt1 mb2 wiz-instructions mobile">
					Select a group name to view its included satellites.
				</div>
				<div id="table-rows" class="group-menu-view">
					<div id="radio-option table-row template" value="" class="btn dropdown-option group-menu-btn">
						<a id="select-btn" class="group-menu-select-btn">
							<img src="/images/img.gif">
						</a>
						<img src="/images/img.gif" class="menu-btn-image">
						<label id="name">Preset Group 1</label>
					</div>
				</div>
				<div class="dfs13 mfs13 dlh1.6 mlh1.6 wiz-instructions">
					If you don't see a group that will work for you...
				</div>
				<div id="new-btn" class="btn basic-btn new-btn">
					<img src="/images/img.gif">
					<label>Create New Group</label>
				</div>
			</div>
			<div class="right main-view">
				<h1>Satellites</h1>
				<div class="tac i dfs13 mfs13 dlh1.6 mlh1.6 mt1 mb1">
					<br class="mobile">
					Note: For automatic satellite switching, be sure to set up
					the satellites in<br>your receivers in the same order as they
					are listed in the group (A-B-C-D).
				</div>
				<div id="slot-a-view slot-view" class="slot">
					<div class="slot-label slot-letter-label">Slot A</div>
					<div class="slot-label slot-installed-label">Installed</div>
					<div class="slot-label slot-static-name-label">Satellite Name</div>
					<div id="name" class="slot-label slot-dynamic-name-label">DirecTV 1R</div>
				</div>
			  <div id="slot-b-view slot-view" class="slot">
					<div class="slot-label slot-letter-label">Slot B</div>
					<div class="slot-label slot-installed-label">Installed</div>
					<div class="slot-label slot-static-name-label">Satellite Name</div>
					<div id="name" class="slot-label slot-dynamic-name-label">DirecTV 1R</div>
				</div>
			  <div id="slot-c-view slot-view" class="slot">
					<div class="slot-label slot-letter-label">Slot C</div>
					<div class="slot-label slot-installed-label">Installed</div>
					<div class="slot-label slot-static-name-label">Satellite Name</div>
					<div id="name" class="slot-label slot-dynamic-name-label">DirecTV 1R</div>
				</div>
			  <div id="slot-d-view slot-view" class="slot">
					<div class="slot-label slot-letter-label">Slot D</div>
					<div class="slot-label slot-installed-label">Installed</div>
					<div class="slot-label slot-static-name-label">Satellite Name</div>
					<div id="name" class="slot-label slot-dynamic-name-label">DirecTV 1R</div>
				</div>
				<div id="install-btn" class="btn basic-btn fr mr1">
					<label>Install Group</label>
				</div>
			</div>
		</div>
	</div>
	<div class="bottom-bar">
		<a id="prev-btn" class="btn prev-btn prev-icon fl">Previous</a>
		<a id="next-btn" class="btn next-btn next-icon fr">Next</a>
	</div>
</div>

<div id="group-edit-view" class="view popup-view group-edit-view">
	<div class="view-content popup-content">
		<a id="cancel-btn" class="btn back-btn">
			<img src="/images/img.gif">
			<label>Create New Satellite Group</label>
		</a>
		<h1>Create New Satellite Group</h1>
		<div class="tac desktop mb2">
			<div class="dfs16 mfs13 dlh1.6 mlh1.6">
				You can choose up to 4 satellites, using slots A-D.
			</div>
			<div class="i dfs13 mfs11 dlh1.2 mlh1.2">
				Note: For automatic satellite switching, be sure to set up
				the satellites in<br>your receivers in the same order as they
				are listed in the group (A-B-C-D).
			</div>
		</div>
		<div class="slot-btn">
			<label class="group-name-label">Satellite Group Name</label>
			<input id="name" type="text" class="group-name-input"/>
		</div>
		<a id="slot-a-btn slot-btn" class="btn slot-btn">
			<img src="/images/img.gif">
			<span class="slot-name-label">Slot A</span>
			<span id="name" class="satellite-name-label"></span>
		</a>
		<a id="slot-b-btn slot-btn" class="btn slot-btn">
			<img src="/images/img.gif">
			<span class="slot-name-label">Slot B</span>
			<span id="name" class="satellite-name-label"></span>
		</a>
		<a id="slot-c-btn slot-btn" class="btn slot-btn">
			<img src="/images/img.gif">
			<span class="slot-name-label">Slot C</span>
			<span id="name" class="satellite-name-label"></span>
		</a>
		<a id="slot-d-btn slot-btn" class="btn slot-btn">
			<img src="/images/img.gif">
			<span class="slot-name-label">Slot D</span>
			<span id="name" class="satellite-name-label"></span>
		</a>
		<div class="tool-bar">
			<a id="cancel-btn" class="btn basic-btn cancel-btn">
				<label>Cancel</label>
			</a>
			<a id="save-btn" class="btn basic-btn save-btn">
				<label>Save</label>
			</a>
		</div>
	</div>
</div>

<div id="group-sats-view" class="view popup-view group-sats-view">
	<div class="view-content popup-content">
		<a id="cancel-btn" class="btn back-btn">
			<img src="/images/img.gif">
			<label>Edit Satellite Group Details</label>
		</a>
		<h1>Edit Satellite Group Details</h1>
		<div class="satellites-table-container">
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
					</tr>
				</thead>
				<tbody id="table-rows">
					<tr id="template table-row radio-option">
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
					</tr>
				</tbody>
			</table>
		</div>
	</div>
</div>

<style type="text/css">
	body.at-splash .single-view,
	body.at-options-view .options-view,
	body.at-circular-options-view .circular-options-view,
	body.at-tv5-manual-options-view .tv5-manual-options-view,
	body.at-single-menu-view .single-view,
	body.at-single-main-view .single-view,
	body.at-group-menu-view .group-view,
	body.at-group-main-view .group-view,
	body.at-group-edit-view .group-edit-view,
	body.at-group-sats-view .group-sats-view {
		display: block;
	}

	@media screen and (max-width: 880px) {
		body.at-single-menu-view .single-view .back-btn,
		body.at-single-menu-view .single-view .main-view,
		body.at-single-main-view .single-view .menu-view,

		body.at-group-menu-view .group-view .back-btn,
		body.at-group-menu-view .group-view .main-view,
		body.at-group-main-view .group-view .menu-view {
			display: none;
		}
	}

	@media screen and (min-width: 880px) {
		body.at-group-edit-view .group-view,
		body.at-group-edit-view .group-view .menu-view,
		body.at-group-edit-view .group-view .main-view,

		body.at-group-sats-view .group-view,
		body.at-group-sats-view .group-view .menu-view,
		body.at-group-sats-view .group-view .main-view {
			display: block;
		}
	}

	.menu-view {
		background-color: transparent;
		min-height: 0;
		padding: 0;
		position: absolute;
		z-index: 0;
	}

	.satellites-table .radio-icon {
		display: block;
	}

	.group-menu-btn.is-selected img {
		background-image: url(/images/radio.png);
	}

	.group-menu-btn.is-installed .group-menu-select-btn img {
		background-image: url(/images/radio-selected.png);
	}

	.slot {
		background-color: #283148;
		display: inline-block;
		font-size: 13px;
		height: 120px;
		margin: 0 0 12px 12px;
		position: relative;
		width: 260px;
	}

	.slot.is-selected {
		background-color: #243774;
	}

	.slot.is-selected .slot-select-btn img {
		background-image: url(/images/radio-selected.png);
	}

	.slot-label {
		position: absolute;
		text-align: center;
		width: 100%;
	}

	.slot-letter-label,
	.slot-installed-label {
		background-color: #000;
		padding: 0.5em;
	}

	.slot-installed-label {
		bottom: 0;
		color: #000;
	}

	.slot.is-selected .slot-letter-label,
	.slot.is-selected .slot-installed-label {
		background-color: #456ab3;
		color: inherit;
	}

	.slot-static-name-label {
		color: #bac7da;
		bottom: 50%;
		margin-bottom: 0.5em;
	}

	.slot-dynamic-name-label {
		top: 50%;
		font-size: 16px;
		margin-top: 0.25em;
	}

	.slot-select-btn img,
	.slot-info-btn img {
		height: auto;
		top: 50%;
		margin-top: -20px;
	}

	.slot-select-btn {
		left: 10px;
	}

	.slot-info-btn {
		right: 50px;
	}


	@media screen and (max-width: 880px) {
		.container h1 {
			display: none;
		}

		.menu-view {
			width: 100%;
		}

		.right {
			padding-top: 0;
		}

		.group-menu-btn .menu-btn-image {
			background-image: url(/images/menu-btn.png) !important;
			float: right;
		}

		.group-menu-btn.is-selected {
			background-color: #243774;
		}

		.group-view .slot-info-btn,
		.group-view .slot-letter-label,
		.group-view .slot-static-name-label,
		.group-view .slot-installed-label,
		.group-view .install-btn {
			display: none !important;
		}

		.group-view .slot {
			background-color: transparent !important;
			border-bottom: 1px solid #456ab3;
			display: block;
			margin: 0;
			width: 100%;
			height: 50px;
			overflow: hidden;
		}

		.group-view .slot-dynamic-name-label {
			top: 14px;
			text-align: left;
			margin-left: 45px;
		}

		.group-view .slot-select-btn {
			left: 0;
		}

		.satellite-group-name-label {
			color: #bac7da;
			font-size: 13px;
			display: block;
			margin-bottom: 1em;
		}

		.installed-col,
		.region-col {
			display: none;
		}

		.name-col {
			width: 65%;
		}

		.orbital-slot-col {
			width: 35%;
		}
	}
	
	@media screen and (min-width: 880px) {
		.container {
			background-color: #101f30;	
			height: 450px;
			position: relative;
			width: 100%;
		}

		.container h1 {
			background-color: #000;
			margin-bottom: 0;
		}

		.group-menu-view {
			max-height: 270px;
			overflow: auto;
		}

		.right {
			height: 100%;
			padding: 0 0 0 243px;

		}

		.satellites-table-container {
			overflow: auto;
		}

		.single-view .satellites-table-container {
			height: calc(100% - 45px);/*based on the height of h1*/
		}

		.group-sats-view .satellites-table-container {
			height: 100%;
		}

		.installed-col {
			text-align: center;
			width: 11%;
		}

		.name-col {
			width: 29%;
		}

		.orbital-slot-col {
			width: 28%;
		}

		.region-col {
			width: 32%;
		}

		.group-menu-btn .menu-btn-image {
			display: none;
		}
	}

	.menu-view .new-btn {
		display: block;
		margin: 1em;
	}

	.menu-view .new-btn img {
		background: transparent url(/images/add-btn.png) no-repeat center center;
		position: absolute;
		right: 0;
		width: auto;
	}

	.menu-view .new-btn label {
		padding: 0.75em;
		text-align: left;
	}

	.menu-view .wiz-instructions {
		padding: 20px 20px 0;
	}

	.slot-btn {
		border-bottom: 1px solid #466ab2;
		display: block;
		line-height: 1.6;
		padding: 10px;
	}

	.slot-btn img {
		background-image: url(/images/menu-btn.png);
		right: 0;
	}

	.group-name-label,
	.slot-name-label {
		color: #bac7da;
		display: block;
		font-size: 13px;
	}

	.group-name-input {
		margin-left: -10px;
	}

	.group-sats-view .view-content {
		padding: 46px 0 0 0;
	}

	.single-view .back-btn,
	.group-view .back-btn {
		background-color: transparent;
		background-position: 10px 50%;
		height: 100%;
		left: 0;
		position: absolute;
		top: 0;
		width: 100%;
	}
</style>

-->