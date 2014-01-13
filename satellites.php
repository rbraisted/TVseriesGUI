<? include $_SERVER['DOCUMENT_ROOT'] . '/base.php'; ?>
<link type="text/css" rel="stylesheet" href="/css/satellites.css">
<script type="text/javascript" src="/js/satellites.js"></script>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div id="menu-view" class="view menu-view">
	<div id="details-view" class="details-view">
		<h3>
			<span id="name">Wheatly 1</span>
			<span id="region">Middle East</span>
		</h3>
		<img id="signal" src="/images/img.gif" class="satellite-signal is-0">
		<span id="status" class="satellite-status-label">Tracking...</span>
	</div>

	<div id="mode-view" class="mode-view">
		<h3>Satellite Mode</h3>
		<a id="mode-btn" href="#" class="btn on-off-btn mode-btn">
			<div class="on">Single</div>
			<div class="off">Group</div>
		</a>
	</div>

	<div id="single-view" class="single-view">
		<a id="africa-btn menu-btn" href="#" class="btn menu-btn">
			<img src="/images/img.gif">
			<label>Africa</label>
		</a>
		<a id="asia-btn menu-btn" href="#" class="btn menu-btn">
			<img src="/images/img.gif">
			<label>Asia</label>
		</a>
		<a id="anz-btn menu-btn" href="#" class="btn menu-btn">
			<img src="/images/img.gif">
			<label>Australia / New Zealand</label>
		</a>
		<a id="csa-btn menu-btn" href="#" class="btn menu-btn">
			<img src="/images/img.gif">
			<label>Central / South America</label>
		</a>
		<a id="europe-btn menu-btn" href="#" class="btn menu-btn">
			<img src="/images/img.gif">
			<label>Europe</label>
		</a>
		<a id="na-btn menu-btn" href="#" class="btn menu-btn">
			<img src="/images/img.gif">
			<label>North America</label>
		</a>
		<a id="all-btn menu-btn" href="#" class="btn menu-btn">
			<img src="/images/img.gif">
			<label>All</label>
		</a>
		<a id="new-btn" href="#" class="btn basic-btn new-btn">
			<img src="/images/img.gif">
			<label>Create New Satellite</label>
		</a>
	</div>

	<div id="group-view" class="group-view">
		<div id="group-dropdown">
			<div id="dropdown-options">
				<a id="dropdown-option" href="#" class="btn dropdown-option">
					<img src="/images/img.gif">
					<label id="name">Preset Group 1</label>
				</a>
				<a id="dropdown-option" href="#" class="btn dropdown-option">
					<img src="/images/img.gif">
					<label id="name">Preset Group 2</label>
				</a>
				<a id="dropdown-option" href="#" class="btn dropdown-option">
					<img src="/images/img.gif">
					<label id="name">Preset Group 3</label>
				</a>
			</div>
		</div>
		<a id="new-btn" href="#" class="btn basic-btn new-btn">
			<img src="/images/img.gif">
			<label>Create New Group</label>
		</a>		
	</div>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div id="satellites-table-view" class="view main-view satellites-table-view">
	<div class="view-content main-content">
		<a id="back-btn" href="#" class="btn back-btn">
			<img src="/images/img.gif">
			<label>Satellites</label>
		</a>
		<h1>
			<img src="/images/img.gif">
			<span>Satellites</span>
		</h1>

		<a class="btn sort-btn is-ascending">
			<img src="/images/img.gif">
			<label>Sort</label>
		</a>

		<br>
		<br>

		<table class="satellites-table">
			<thead>
				<tr>
					<th class="installed-col">
						<span>Installed</span>
					</th>
					<th class="name-col">
						<a id="name-btn" href="#" class="btn sort-btn is-ascending">
							<img src="/images/img.gif">
							<label>Name</label>
						</a>
					</th>
					<th class="orbital-slot-col">
						<a id="orbital-slot-btn" href="#" class="btn sort-btn">
							<img src="/images/img.gif">
							<label>Orbital Slot</label>
						</a>
					</th>
					<th class="region-col">
						<a id="region-btn" href="#" class="btn sort-btn is-descending">
							<img src="/images/img.gif">
							<label>Region</label>
						</a>
					</th>
					<th class="favorites-col">
						<a id="favorites-btn" href="#" class="btn sort-btn">
							<img src="/images/img.gif">
							<label>Favorites</label>
						</a>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td class="installed-col">
						<a id="select-btn" href="#" class="btn select-btn">
							<img src="/images/img.gif">
						</a>
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
						<a id="favorite-btn" href="#" class="btn favorite-btn">
							<img src="/images/img.gif">
						</a>
						<a id="info-btn" href="#" class="btn info-btn">
							<img src="/images/img.gif">
						</a>
					</td>
				</tr>
				<tr>
					<td class="installed-col">
						<a id="select-btn" href="#" class="btn select-btn">
							<img src="/images/img.gif">
						</a>
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
						<a id="favorite-btn" href="#" class="btn favorite-btn">
							<img src="/images/img.gif">
						</a>
						<a id="info-btn" href="#" class="btn info-btn">
							<img src="/images/img.gif">
						</a>
					</td>
				</tr>
			</tbody>
		</table>

		<!-- 
		select-col
		name-col
		orbital-slot-col
		region-col
		favorites-col
		-->

		<!--
		<div id="satellites-table" class="table satellites-table">
			<div id="table-header" class="table-row table-header">
				<div class="table-col select-col">Installed</div>
				<a id="name-btn" href="#" class="btn sort-btn name-btn table-col name-col">
					<img src="/images/img.gif">
					<label>Name</label>
				</a>
				<a id="orbital-slot-btn" href="#" class="btn sort-btn orbital-slot-btn table-col orbital-slot-col">
					<img src="/images/img.gif">
					<label>Orbital Slot</label>
				</a>
				<a id="region-btn" href="#" class="btn sort-btn region-btn table-col region-col">
					<img src="/images/img.gif">
					<label>Region</label>
				</a>
				<a id="favorites-btn" href="#" class="btn sort-btn favorites-btn table-col favorites-col">
					<img src="/images/img.gif">
					<label>Favorites</label>
				</a>
			</div>
			<div id="table-row" class="table-row">
				<a id="select-btn" class="table-col select-col btn select-btn">
					<img src="/images/img.gif">
				</a>
				<div id="name" class="table-col name-col">Name</div>
				<div id="orbital-slot" class="table-col orbital-slot-col">Orbital Slot</div>
				<div id="region" class="table-col region-col">Region</div>
				<div class="table-col favorites-col">
					<img src="/images/img.gif">
				</div>
				<a id="edit-btn" href="#" class="btn edit-btn">
					<img src="/images/img.gif">
				</a>
			</div>
		</div>
		-->
	</div>
</div>

<!-- <link type="text/css" rel="stylesheet" href="/css/satellites.css">
<script type="text/javascript" src="/js/satellites.js"></script>

<div id="sb" class="sb active">
	<div class="headline">View satellites by region</div>
	<a id="enabled-btn filter-btn" href="#" class="menu-btn"><img src="/images/img.gif">Enabled</a>
	<a id="favorites-btn filter-btn" href="#" class="menu-btn"><img src="/images/img.gif">Favorites</a>
	<a id="africa-btn filter-btn" href="#" class="menu-btn"><img src="/images/img.gif">Africa</a>
	<a id="asia-btn filter-btn" href="#" class="menu-btn"><img src="/images/img.gif">Asia</a>
	<a id="australia-btn filter-btn" href="#" class="menu-btn"><img src="/images/img.gif">Australia</a>
	<a id="central-and-south-america-btn filter-btn" href="#" class="menu-btn"><img src="/images/img.gif">Central/South America</a>
	<a id="north-america-btn filter-btn" href="#" class="menu-btn"><img src="/images/img.gif">North America</a>
	<a id="filter-btn" href="#" class="menu-btn"><img src="/images/img.gif">Entire Library</a>
	<a id="add-btn" href="#" class="border-btn"><img src="/images/img.gif">Add Satellite</a>
</div>

<div id="mc" class="mc">
	<div class="mcg">
		<div id="satellites-table" class="satellites-table">
			<a id="back-btn" href="#" class="back-btn"><img src="/images/img.gif" />Back</a>
			<div class="table-header">
				<a id="name-sort-btn sort-btn" href="#" class="name-col table-col sort-btn"><img src="/images/img.gif">Name</a>
				<a id="orbital-slot-sort-btn sort-btn" href="#" class="orbital-slot-col table-col sort-btn"><img src="/images/img.gif">Orbital Slot</a>
				<a id="region-sort-btn sort-btn" href="#" class="region-col table-col sort-btn"><img src="/images/img.gif">Region</a>
				<div class="favorites-col table-col">Favorites</div>
				<div class="selected-col table-col">Selected</div>
			</div>
			<a id="table-row" href="#" class="table-row">
				<div id="name" class="name-col table-col"></div>
				<div id="orbital-slot" class="orbital-slot-col table-col"></div>
				<div id="region" class="region-col table-col"></div>
				<div id="favorites" class="favorites-col table-col"><img src="/images/img.gif"></div>
				<div id="selected" class="selected-col table-col"><img src="/images/img.gif"></div>
				<div class="hover">View / Edit Details</div>
			</a>
		</div>

		<div id="satellite-details" class="satellite-details">
			<a id="back-btn" href="#" class="back-btn"><img src="/images/img.gif" />Back</a>
			<div class="name satellite-detail">
				<label>Name</label>
				<span id="name view"></span>
				<input id="name edit" type="text" />
			</div>
			<div class="region satellite-detail">
				<label>Region</label>
				<span id="region view"></span>
				<a id="region edit region-btn" href="#" class="dropdown-btn">Region</a>
			</div>
			<div class="orbital-slot satellite-detail">
				<label>Orbital Slot</label>
				<span id="orbital-slot view"></span>
				<input id="orbital-slot edit" type="text" />
			</div>
			<div class="hemisphere satellite-detail">
				<label>Hemisphere</label>
				<span id="hemisphere view"></span>
				<input id="hemisphere edit" type="text" />
			</div>
			<div class="sat-id satellite-detail">
				<label>SatID</label>
				<span id="sat-id view"></span>
				<input id="sat-id edit" type="text" />
			</div>
			<div class="pre-skew satellite-detail">
				<label>Pre-Skew</label>
				<span id="pre-skew view"></span>
				<input id="pre-skew edit" type="text" />
			</div>
			<div class="tri-sat-id satellite-detail">
				<label>Tri-Sat</label>
				<span id="tri-sat-id view"></span>
				<input id="tri-sat-id edit" type="text" />
			</div>
			<div class="local-oscillators">
			 	<div class="local-oscillator local-oscillator-1 satellite-detail">
					<label>Local Oscillator #1</label>
					<span id="local-oscillator-1 view"></span>
					<input id="local-oscillator-1 edit" type="text" />
				</div>
				<div class="local-oscillator local-oscillator-2 satellite-detail">
					<label>Local Oscillator #2</label>
					<span id="local-oscillator-2 view"></span>
					<input id="local-oscillator-2 edit" type="text" />
				</div>
			</div>

			<div class="enable">
				<label>Enable Satellite</label>
				<a id="enable-btn" href="#" class="of-btn"><div class="on">On</div><div class="off">Off</div></a>
			</div>

			<div class="favorite">
				<label>Add to Favorites</label>
				<a id="favorite-btn" href="#" class="of-btn"><div class="on">On</div><div class="off">Off</div></a>
			</div>

			<div class="xponders">
				<div id="xponder-1" class="xponder-details">
					<div class="name">Parameter 1</div>
					<div class="polarization xponder-detail">
						<label>Polarization:</label>
						<span id="polarization view"></span>
						<a id="polarization edit polarization-btn" href="#" class="dropdown-btn">Polarization</a>
					</div>
					<div class="frequency xponder-detail">
						<label>Frequency:</label>
						<span id="frequency view"></span>
						<input id="frequency edit" type="text" />
					</div>
					<div class="symbol-rate xponder-detail">
						<label>Symbol Rate:</label>
						<span id="symbol-rate view"></span>
						<input id="symbol-rate edit" type="text" />
					</div>
					<div class="fec-code xponder-detail">
						<label>FEC Code:</label>
						<span id="fec-code view"></span>
						<a id="fec-code edit fec-code-btn" href="#" class="dropdown-btn">FEC Code</a>
					</div>
					<div class="network-id xponder-detail">
						<label>Network ID:</label>
						<span id="network-id view"></span>
						<input id="network-id edit" type="text" />
					</div>
					<div class="decoder-type xponder-detail">
						<label>Decoder Type:</label>
						<span id="decoder-type view"></span>
						<a id="decoder-type edit decoder-type-btn" href="#" class="dropdown-btn">Decoder Type</a>
					</div>
				</div>
				<div id="xponder-3" class="xponder-details">
					<div class="name">Parameter 2</div>
					<div class="polarization">
						<label>Polarization:</label>
						<span id="polarization view"></span>
						<a id="polarization edit polarization-btn" href="#" class="dropdown-btn">Polarization</a>
					</div>
					<div class="frequency xponder-detail">
						<label>Frequency:</label>
						<span id="frequency view"></span>
						<input id="frequency edit" type="text" />
					</div>
					<div class="symbol-rate xponder-detail">
						<label>Symbol Rate:</label>
						<span id="symbol-rate view"></span>
						<input id="symbol-rate edit" type="text" />
					</div>
					<div class="fec-code xponder-detail">
						<label>FEC Code:</label>
						<span id="fec-code view"></span>
						<a id="fec-code edit fec-code-btn" href="#" class="dropdown-btn">FEC Code</a>
					</div>
					<div class="network-id xponder-detail">
						<label>Network ID:</label>
						<span id="network-id view"></span>
						<input id="network-id edit" type="text" />
					</div>
					<div class="decoder-type xponder-detail">
						<label>Decoder Type:</label>
						<span id="decoder-type view"></span>
						<a id="decoder-type edit decoder-type-btn" href="#" class="dropdown-btn">Decoder Type</a>
					</div>
				</div>
				<div id="xponder-5" class="xponder-details">
					<div class="name">Parameter 3</div>
					<div class="polarization">
						<label>Polarization:</label>
						<span id="polarization view"></span>
						<a id="polarization edit polarization-btn" href="#" class="dropdown-btn">Polarization</a>
					</div>
					<div class="frequency xponder-detail">
						<label>Frequency:</label>
						<span id="frequency view"></span>
						<input id="frequency edit" type="text" />
					</div>
					<div class="symbol-rate xponder-detail">
						<label>Symbol Rate:</label>
						<span id="symbol-rate view"></span>
						<input id="symbol-rate edit" type="text" />
					</div>
					<div class="fec-code xponder-detail">
						<label>FEC Code:</label>
						<span id="fec-code view"></span>
						<a id="fec-code edit fec-code-btn" href="#" class="dropdown-btn">FEC Code</a>
					</div>
					<div class="network-id xponder-detail">
						<label>Network ID:</label>
						<span id="network-id view"></span>
						<input id="network-id edit" type="text" />
					</div>
					<div class="decoder-type xponder-detail">
						<label>Decoder Type:</label>
						<span id="decoder-type view"></span>
						<a id="decoder-type edit decoder-type-btn" href="#" class="dropdown-btn">Decoder Type</a>
					</div>
				</div>
				<div id="xponder-7" class="xponder-details">
					<div class="name">Parameter 4</div>
					<div class="polarization">
						<label>Polarization:</label>
						<span id="polarization view"></span>
						<a id="polarization edit polarization-btn" href="#" class="dropdown-btn">Polarization</a>
					</div>
					<div class="frequency xponder-detail">
						<label>Frequency:</label>
						<span id="frequency view"></span>
						<input id="frequency edit" type="text" />
					</div>
					<div class="symbol-rate xponder-detail">
						<label>Symbol Rate:</label>
						<span id="symbol-rate view"></span>
						<input id="symbol-rate edit" type="text" />
					</div>
					<div class="fec-code xponder-detail">
						<label>FEC Code:</label>
						<span id="fec-code view"></span>
						<a id="fec-code edit fec-code-btn" href="#" class="dropdown-btn">FEC Code</a>
					</div>
					<div class="network-id xponder-detail">
						<label>Network ID:</label>
						<span id="network-id view"></span>
						<input id="network-id edit" type="text" />
					</div>
					<div class="decoder-type xponder-detail">
						<label>Decoder Type:</label>
						<span id="decoder-type view"></span>
						<a id="decoder-type edit decoder-type-btn" href="#" class="dropdown-btn">Decoder Type</a>
					</div>
				</div>
			</div>

			<div id="region-dropdown" class="dropdown">
				<div class="dropdown-header">Region</div>
				<a id="dropdown-option" href="#" value="Africa" class="dropdown-option"><img src="/images/img.gif">Africa</a>
				<a id="dropdown-option" href="#" value="Asia" class="dropdown-option"><img src="/images/img.gif">Asia</a>
				<a id="dropdown-option" href="#" value="Australia" class="dropdown-option"><img src="/images/img.gif">Australia</a>
				<a id="dropdown-option" href="#" value="Central/South America" class="dropdown-option"><img src="/images/img.gif">Central/South America</a>
				<a id="dropdown-option" href="#" value="Europe" class="dropdown-option"><img src="/images/img.gif">Europe</a>
				<a id="dropdown-option" href="#" value="North America" class="dropdown-option"><img src="/images/img.gif">North America</a>
			</div>

			<div id="polarization-dropdown" class="dropdown">
				<div class="dropdown-header">Polarization</div>
				<a id="dropdown-option" href="#" value="Horizontal High" class="dropdown-option"><img src="/images/img.gif">Horizontal High</a>
				<a id="dropdown-option" href="#" value="Horizontal Low" class="dropdown-option"><img src="/images/img.gif">Horizontal Low</a>
				<a id="dropdown-option" href="#" value="Vertical High" class="dropdown-option"><img src="/images/img.gif">Vertical High</a>
				<a id="dropdown-option" href="#" value="Vertical Low" class="dropdown-option"><img src="/images/img.gif">Vertical Low</a>
				<a id="dropdown-option" href="#" value="Circular Right High" class="dropdown-option"><img src="/images/img.gif">Circular Right High</a>
				<a id="dropdown-option" href="#" value="Circular Right Low" class="dropdown-option"><img src="/images/img.gif">Circular Right Low</a>
				<a id="dropdown-option" href="#" value="Circular Left High" class="dropdown-option"><img src="/images/img.gif">Circular Left High</a>
				<a id="dropdown-option" href="#" value="Circular Left Low" class="dropdown-option"><img src="/images/img.gif">Circular Left Low</a>
			</div>

			<div id="decoder-type-dropdown" class="dropdown">
				<div class="dropdown-header">Decoder Type</div>
				<a id="dropdown-option" href="#" value="QDVB" class="dropdown-option"><img src="/images/img.gif">DVB QPSK</a>
				<a id="dropdown-option" href="#" value="QDSS" class="dropdown-option"><img src="/images/img.gif">DSS DTV</a>
				<a id="dropdown-option" href="#" value="QDC2" class="dropdown-option"><img src="/images/img.gif">DCII QPSK DigiCipher 2</a>
				<a id="dropdown-option" href="#" value="LQPSK" class="dropdown-option"><img src="/images/img.gif">LDPC QPSK STD DVB-S2</a>
				<a id="dropdown-option" href="#" value="L8PSK" class="dropdown-option"><img src="/images/img.gif">LDPC 8PSK STD DVB-S2</a>
				<a id="dropdown-option" href="#" value="TQPSK" class="dropdown-option"><img src="/images/img.gif">Turbo QPSK Dish</a>
				<a id="dropdown-option" href="#" value="T8PSK" class="dropdown-option"><img src="/images/img.gif">Turbo 8PSK Dish</a>
			</div>

			<div id="fec-code-dropdown" class="dropdown">
				<div class="dropdown-header">FEC Code</div>
				<a id="dropdown-option" href="#" value="1/2" class="dropdown-option"><img src="/images/img.gif">1/2</a>
				<a id="dropdown-option" href="#" value="2/3" class="dropdown-option"><img src="/images/img.gif">2/3</a>
				<a id="dropdown-option" href="#" value="3/4" class="dropdown-option"><img src="/images/img.gif">3/4</a>
				<a id="dropdown-option" href="#" value="3/5" class="dropdown-option"><img src="/images/img.gif">3/5</a>
				<a id="dropdown-option" href="#" value="4/5" class="dropdown-option"><img src="/images/img.gif">4/5</a>
				<a id="dropdown-option" href="#" value="5/6" class="dropdown-option"><img src="/images/img.gif">5/6</a>
				<a id="dropdown-option" href="#" value="5/11" class="dropdown-option"><img src="/images/img.gif">5/11</a>
				<a id="dropdown-option" href="#" value="6/7" class="dropdown-option"><img src="/images/img.gif">6/7</a>
				<a id="dropdown-option" href="#" value="7/8" class="dropdown-option"><img src="/images/img.gif">7/8</a>
				<a id="dropdown-option" href="#" value="8/9" class="dropdown-option"><img src="/images/img.gif">8/9</a>
				<a id="dropdown-option" href="#" value="9/9" class="dropdown-option"><img src="/images/img.gif">9/9</a>
				<a id="dropdown-option" href="#" value="9/10" class="dropdown-option"><img src="/images/img.gif">9/10</a>
			</div>

			<a id="save-btn edit" href="#" class="border-btn">Save</a>
			<a id="cancel-btn edit" href="#" class="border-btn">Cancel</a>

			<a id="select-btn view" href="#" class="border-btn">Select Satellite</a>
			<a id="edit-btn view" href="#" class="border-btn">Edit</a>
		</div>
	</div>
</div> -->