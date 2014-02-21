<? include $_SERVER['DOCUMENT_ROOT'] . '/base.php'; ?>
<link type="text/css" rel="stylesheet" href="/css/satellites.css">
<script type="text/javascript" src="/js/satellites.js"></script>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div id="menu-view" class="view menu-view">
	<div id="tracking-view">
		<div id="details-view" class="details-view">
			<h3>
				<span id="name">Wheatly 1</span>
				<span id="region">Middle East</span>
			</h3>
			<img id="signal" src="/images/img.gif" class="satellite-signal is-0">
			<span id="status" class="satellite-status-label">Tracking...</span>
		</div>
	</div>
	
	<div id="mode-view" class="mode-view">
		<h3>Satellite Mode</h3>
		<a id="mode-btn" class="btn toggle-btn mode-btn">
			<div class="on">Single</div>
			<div class="off">Group</div>
		</a>
	</div>

	<div id="single-view" class="single-view">
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

	<div id="group-view table" class="group-view">
		<div id="table-rows">
			<div id="radio-option table-row template" value="" class="btn dropdown-option group-menu-btn">
				<a id="select-btn" class="group-menu-select-btn">
					<img src="/images/img.gif">
				</a>
				<img src="/images/img.gif" class="menu-btn-image">
				<label id="name">Preset Group 1</label>
			</div>
		</div>
		<a id="new-btn" class="btn basic-btn new-btn">
			<img src="/images/img.gif">
			<label>Create New Group</label>
		</a>
	</div>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div id="satellite-group-view" class="view main-view satellite-group-view">
	<div class="view-content main-content">
		<a id="back-btn" class="btn back-btn">
			<img src="/images/img.gif">
			<label id="name">Satellites</label>
		</a>
		<h1>
			<img src="/images/img.gif">
			<span id="name">Satellites</span>
		</h1>
		<div class="mobile">
			<span class="satellite-group-name-label">Satellite Group Name</span>
			<span id="name">Satellites</span>
		</div>
		<div id="slot-a-view slot-view" class="slot">
			<div class="slot-label slot-letter-label">Slot A</div>
			<div class="slot-label slot-installed-label">Installed</div>
			<div class="slot-label slot-static-name-label">Satellite Name</div>
			<div id="name" class="slot-label slot-dynamic-name-label">DirecTV 1R</div>
			<a id="select-btn" class="btn select-btn slot-select-btn">
				<img src="/images/img.gif">
			</a>
			<a id="info-btn" class="btn info-btn slot-info-btn">
				<img src="/images/img.gif">
			</a>
		</div><!--
	 --><div id="slot-b-view slot-view" class="slot">
			<div class="slot-label slot-letter-label">Slot B</div>
			<div class="slot-label slot-installed-label">Installed</div>
			<div class="slot-label slot-static-name-label">Satellite Name</div>
			<div id="name" class="slot-label slot-dynamic-name-label">DirecTV 1R</div>
			<a id="select-btn" class="btn select-btn slot-select-btn">
				<img src="/images/img.gif">
			</a>
			<a id="info-btn" class="btn info-btn slot-info-btn">
				<img src="/images/img.gif">
			</a>
		</div><!--
	 --><div id="slot-c-view slot-view" class="slot">
			<div class="slot-label slot-letter-label">Slot C</div>
			<div class="slot-label slot-installed-label">Installed</div>
			<div class="slot-label slot-static-name-label">Satellite Name</div>
			<div id="name" class="slot-label slot-dynamic-name-label">DirecTV 1R</div>
			<a id="select-btn" class="btn select-btn slot-select-btn">
				<img src="/images/img.gif">
			</a>
			<a id="info-btn" class="btn info-btn slot-info-btn">
				<img src="/images/img.gif">
			</a>
		</div><!--
	 --><div id="slot-d-view slot-view" class="slot">
			<div class="slot-label slot-letter-label">Slot D</div>
			<div class="slot-label slot-installed-label">Installed</div>
			<div class="slot-label slot-static-name-label">Satellite Name</div>
			<div id="name" class="slot-label slot-dynamic-name-label">DirecTV 1R</div>
			<a id="select-btn" class="btn select-btn slot-select-btn">
				<img src="/images/img.gif">
			</a>
			<a id="info-btn" class="btn info-btn slot-info-btn">
				<img src="/images/img.gif">
			</a>
		</div>
		<div class="tool-bar">
			<a id="delete-btn" class="btn basic-btn delete-btn">
				<label>Delete Group</label>
			</a>
			<a id="edit-btn" class="btn basic-btn edit-btn">
				<label>Edit Group</label>
			</a>
			<a id="install-btn" class="btn basic-btn install-btn">
				<label>Install Group</label>
			</a>
		</div>
	</div>
</div>

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
						<div id="orbital-slot-btn sort-btn" class="btn sort-btn">Orbital Slot</div>
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

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div id="edit-satellite-group-view" class="view popup-view edit-satellite-group-view">
	<div class="view-content popup-content">
		<a id="cancel-btn" class="btn back-btn">
			<img src="/images/img.gif">
			<label>Edit Satellite Group Details</label>
		</a>
		<h1>Edit Satellite Group Details</h1>
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

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div id="satellites-table-popup-view" class="view popup-view satellite-table-popup-view">
	<div class="view-content popup-content">
		<a id="cancel-btn" class="btn back-btn">
			<img src="/images/img.gif">
			<label>Edit Satellite Group Details</label>
		</a>
		<h1>Edit Satellite Group Details</h1>
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
					<td class="favorites-col">
						<div id="favorite-btn" class="btn heart-icon"></div>
						<div id="info-btn" class="btn info-icon"></div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div id="satellite-info-view" class="view popup-view satellite-info-view">
	<div class="view-content popup-content">
		<a id="back-btn" class="btn back-btn">
			<img src="/images/img.gif">
			<label>Satellite Details</label>
		</a>
		<h1>Satellite Details</h1>
		<div class="detail name-container">
			<div class="label">Satellite Name</div>
			<div id="name view" class="value"></div>
			<input id="name edit">
		</div>
		<div class="detail favorite-container">
			<div class="label">Add To Favorite</div>
			<a id="favorite-btn" class="btn toggle-btn favorite-btn">
				<div class="on">On</div>
				<div class="off">OFF</div>
				<img src="/images/img.gif">
			</a>
		</div>
		<div class="detail top-detail five-split">
			<div class="label">Region</div>
			<div id="region view" class="value"></div>
			<a id="region-btn edit" class="btn dropdown-btn">
				<img src="/images/img.gif">
				<label id="region edit"></label>
			</a>
		</div>
		<div class="detail top-detail five-split">
			<div class="label">Orbital Slot</div>
			<div id="orbital-slot" class="value"></div>
			<!--
			<div id="orbital-slot view" class="value"></div>
			<input id="orbital-slot edit">
			-->
		</div>
		<div class="detail top-detail five-split">
			<div class="label">Hemisphere</div>
			<div id="hemisphere view" class="value"></div>
			<a id="hemisphere-btn edit" class="btn dropdown-btn">
				<img src="/images/img.gif">
				<label id="hemisphere edit"></label>
			</a>
		</div>
		<div class="detail top-detail five-split">
			<div class="label">Suffix</div>
			<div id="suffix view" class="value"></div>
			<input id="suffix edit">
		</div>
		<div class="detail top-detail five-split">
			<div class="label">Pre-Skew</div>
			<div id="pre-skew view" class="value"></div>
			<input id="pre-skew edit">
		</div>
		<div class="detail top-detail three-split">
			<div class="label">LNB Type</div>
			<div id="lnb-type view" class="value"></div>
			<a id="lnb-type-btn edit" class="btn dropdown-btn">
				<img src="/images/img.gif">
				<label id="lnb-type edit"></label>
			</a>
		</div>
		<div class="detail top-detail three-split">
			<div class="label">Local Oscillator #1</div>
			<div id="local-oscillator-1 view" class="value"></div>
			<input id="local-oscillator-1 edit">
		</div>
		<div class="detail top-detail three-split">
			<div class="label">Local Oscillator #2</div>
			<div id="local-oscillator-2 view" class="value"></div>
			<input id="local-oscillator-2 edit">
		</div>

		<div id="linear" class="linear">
			<div id="xponder-1 linear" class="xponder">
				<div class="xponder-header">Horizontal High</div>
				<div class="detail xponder-detail two-split">
					<div class="label">Frequency (MHz)</div>
					<div id="frequency view" class="value"></div>
					<input id="frequency edit">
				</div>
				<div class="detail xponder-detail two-split">
					<div class="label">Symbol Rate (Msym/s)</div>
					<div id="symbol-rate view" class="value"></div>
					<input id="symbol-rate edit">
				</div>
				<div class="detail xponder-detail two-split">
					<div class="label">FEC Code</div>
					<div id="fec-code view" class="value"></div>
					<a id="fec-code-btn edit" class="btn dropdown-btn">
						<img src="/images/img.gif">
						<label id="fec-code edit"></label>
					</a>
				</div>
				<div class="detail xponder-detail two-split">
					<div class="label">Satellite ID</div>
					<div id="satellite-id view" class="value"></div>
					<input id="satellite-id edit">
				</div>
				<div class="detail xponder-detail two-split">
					<div class="label">Decoder Type</div>
					<div id="decoder-type view" class="value"></div>
					<a id="decoder-type-btn edit" class="btn dropdown-btn">
						<img src="/images/img.gif">
						<label id="decoder-type edit"></label>
					</a>
				</div>
			</div>
			<div id="xponder-3 linear" class="xponder">
				<div class="xponder-header">Horizontal Low</div>
				<div class="detail xponder-detail two-split">
					<div class="label">Frequency (MHz)</div>
					<div id="frequency view" class="value"></div>
					<input id="frequency edit">
				</div>
				<div class="detail xponder-detail two-split">
					<div class="label">Symbol Rate (Msym/s)</div>
					<div id="symbol-rate view" class="value"></div>
					<input id="symbol-rate edit">
				</div>
				<div class="detail xponder-detail two-split">
					<div class="label">FEC Code</div>
					<div id="fec-code view" class="value"></div>
					<a id="fec-code-btn edit" class="btn dropdown-btn">
						<img src="/images/img.gif">
						<label id="fec-code edit"></label>
					</a>
				</div>
				<div class="detail xponder-detail two-split">
					<div class="label">Satellite ID</div>
					<div id="satellite-id view" class="value"></div>
					<input id="satellite-id edit">
				</div>
				<div class="detail xponder-detail two-split">
					<div class="label">Decoder Type</div>
					<div id="decoder-type view" class="value"></div>
					<a id="decoder-type-btn edit" class="btn dropdown-btn">
						<img src="/images/img.gif">
						<label id="decoder-type edit"></label>
					</a>
				</div>
			</div>
			<div id="xponder-5 linear" class="xponder">
				<div class="xponder-header">Vertical High</div>
				<div class="detail xponder-detail two-split">
					<div class="label">Frequency (MHz)</div>
					<div id="frequency view" class="value"></div>
					<input id="frequency edit">
				</div>
				<div class="detail xponder-detail two-split">
					<div class="label">Symbol Rate (Msym/s)</div>
					<div id="symbol-rate view" class="value"></div>
					<input id="symbol-rate edit">
				</div>
				<div class="detail xponder-detail two-split">
					<div class="label">FEC Code</div>
					<div id="fec-code view" class="value"></div>
					<a id="fec-code-btn edit" class="btn dropdown-btn">
						<img src="/images/img.gif">
						<label id="fec-code edit"></label>
					</a>
				</div>
				<div class="detail xponder-detail two-split">
					<div class="label">Satellite ID</div>
					<div id="satellite-id view" class="value"></div>
					<input id="satellite-id edit">
				</div>
				<div class="detail xponder-detail two-split">
					<div class="label">Decoder Type</div>
					<div id="decoder-type view" class="value"></div>
					<a id="decoder-type-btn edit" class="btn dropdown-btn">
						<img src="/images/img.gif">
						<label id="decoder-type edit"></label>
					</a>
				</div>
			</div>
			<div id="xponder-7 linear" class="xponder">
				<div class="xponder-header">Vertical Low</div>
				<div class="detail xponder-detail two-split">
					<div class="label">Frequency (MHz)</div>
					<div id="frequency view" class="value"></div>
					<input id="frequency edit">
				</div>
				<div class="detail xponder-detail two-split">
					<div class="label">Symbol Rate (Msym/s)</div>
					<div id="symbol-rate view" class="value"></div>
					<input id="symbol-rate edit">
				</div>
				<div class="detail xponder-detail two-split">
					<div class="label">FEC Code</div>
					<div id="fec-code view" class="value"></div>
					<a id="fec-code-btn edit" class="btn dropdown-btn">
						<img src="/images/img.gif">
						<label id="fec-code edit"></label>
					</a>
				</div>
				<div class="detail xponder-detail two-split">
					<div class="label">Satellite ID</div>
					<div id="satellite-id view" class="value"></div>
					<input id="satellite-id edit">
				</div>
				<div class="detail xponder-detail two-split">
					<div class="label">Decoder Type</div>
					<div id="decoder-type view" class="value"></div>
					<a id="decoder-type-btn edit" class="btn dropdown-btn">
						<img src="/images/img.gif">
						<label id="decoder-type edit"></label>
					</a>
				</div>
			</div>
		</div>

		<div class="tool-bar">
			<a id="edit-btn view" class="btn basic-btn edit-btn">
				<label>Edit Satellite Details</label>
			</a>
			<a id="reset-btn edit" class="btn basic-btn reset-btn">
				<label>Reset To Factory Settings</label>
			</a>
			<a id="cancel-btn edit" class="btn basic-btn cancel-btn">
				<label>Cancel</label>
			</a>
			<a id="save-btn edit" class="btn basic-btn save-btn">
				<label>Save</label>
			</a>
		</div>
	</div>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div id="region-dropdown" class="view popup-view dropdown-view">
	<div id="dropdown-content" class="view-content popup-content dropdown-content">
		<a id="close-btn" class="btn back-btn">
			<img src="/images/img.gif">
			<label>Region</label>
		</a>
		<h1>Region</h1>
		<a id="dropdown-option radio-option" value="Africa" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>Africa</label>
		</a>
		<a id="dropdown-option radio-option" value="Asia" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>Asia</label>
		</a>
		<a id="dropdown-option radio-option" value="Australia" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>Australia / New Zealand</label>
		</a>
		<a id="dropdown-option radio-option" value="Central/South America" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>Central / South America</label>
		</a>
		<a id="dropdown-option radio-option" value="Europe" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>Europe</label>
		</a>
		<a id="dropdown-option radio-option" value="North America" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>North America</label>
		</a>
	</div>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div id="hemisphere-dropdown" class="view popup-view dropdown-view">
	<div id="dropdown-content" class="view-content popup-content dropdown-content">
		<a id="close-btn" class="btn back-btn">
			<img src="/images/img.gif">
			<label>Hemisphere</label>
		</a>
		<h1>Hemisphere</h1>
		<a id="dropdown-option radio-option" value="East" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>East</label>
		</a>
		<a id="dropdown-option radio-option" value="West" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>West</label>
		</a>
	</div>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div id="lnb-type-dropdown" class="view popup-view dropdown-view">
	<div id="dropdown-content" class="view-content popup-content dropdown-content">
		<a id="close-btn" class="btn back-btn">
			<img src="/images/img.gif">
			<label>Region</label>
		</a>
		<h1>Region</h1>
		<a id="dropdown-option radio-option" value="Linear" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>Linear</label>
		</a>
		<a id="dropdown-option radio-option" value="Circular" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>Circular</label>
		</a>
	</div>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div id="fec-code-dropdown" class="view popup-view dropdown-view">
	<div id="dropdown-content" class="view-content popup-content dropdown-content">
		<a id="close-btn" class="btn back-btn">
			<img src="/images/img.gif">
			<label>FEC Code</label>
		</a>
		<h1>FEC Code</h1>
		<a id="dropdown-option radio-option" value="1/2" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>1/2</label>
		</a>
		<a id="dropdown-option radio-option" value="2/3" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>2/3</label>
		</a>
		<a id="dropdown-option radio-option" value="3/4" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>3/4</label>
		</a>
		<a id="dropdown-option radio-option" value="3/5" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>3/5</label>
		</a>
		<a id="dropdown-option radio-option" value="4/5" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>4/5</label>
		</a>
		<a id="dropdown-option radio-option" value="5/6" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>5/6</label>
		</a>
		<a id="dropdown-option radio-option" value="5/11" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>5/11</label>
		</a>
		<a id="dropdown-option radio-option" value="6/7" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>6/7</label>
		</a>
		<a id="dropdown-option radio-option" value="7/8" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>7/8</label>
		</a>
		<a id="dropdown-option radio-option" value="8/9" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>8/9</label>
		</a>
		<a id="dropdown-option radio-option" value="9/9" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>9/9</label>
		</a>
		<a id="dropdown-option radio-option" value="9/10" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>9/10</label>
		</a>
	</div>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div id="decoder-type-dropdown" class="view popup-view dropdown-view">
	<div id="dropdown-content" class="view-content popup-content dropdown-content">
		<a id="close-btn" class="btn back-btn">
			<img src="/images/img.gif">
			<label>Decoder Type</label>
		</a>
		<h1>Decoder Type</h1>
		<a id="dropdown-option radio-option" value="QDSS" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>DSS DTV</label>
		</a>
		<a id="dropdown-option radio-option" value="QDC2" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>DCII QPSK DigiCipher 2</label>
		</a>
		<a id="dropdown-option radio-option" value="QDVB" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>DVB QPSK</label>
		</a>
		<a id="dropdown-option radio-option" value="LQPSK" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>LDPC QPSK STD DVB-S2</label>
		</a>
		<a id="dropdown-option radio-option" value="L8PSK" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>LDPC 8PSK STD DVB-S2</label>
		</a>
		<a id="dropdown-option radio-option" value="TQPSK" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>Turbo QPSK Dish</label>
		</a>
		<a id="dropdown-option radio-option" value="T8PSK" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>Turbo 8PSK Dish</label>
		</a>
	</div>
</div>