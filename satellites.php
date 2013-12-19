<? include $_SERVER['DOCUMENT_ROOT'] . '/base.php'; ?>

<div id="page" class="page">
	<link type="text/css" rel="stylesheet" href="/css/satellites.css">
	<script type="text/javascript" src="/js/satellites.js"></script>

	<div id="sb" class="sb">
		<div class="headline">View satellites by region</div>
		<a id="africa-btn" href="#" class="menu-btn"><img src="/images/img.gif">Africa</a>
		<a id="asia-btn" href="#" class="menu-btn"><img src="/images/img.gif">Asia</a>
		<a id="australia-btn" href="#" class="menu-btn"><img src="/images/img.gif">Australia</a>
		<a id="central-and-south-america-btn" href="#" class="menu-btn"><img src="/images/img.gif">Central/South America</a>
		<a id="north-america-btn" href="#" class="menu-btn"><img src="/images/img.gif">North America</a>
		<a id="all-btn" href="#" class="menu-btn"><img src="/images/img.gif">All Regions</a>
	</div>

	<div id="mc" class="mc">
		<a id="back-btn" href="/support/" class="back-btn"><img src="/images/img.gif" />Change region</a>

		<div class="mcg">

			<div id="satellites-table" class="satellites-table">
				<div class="table-header">
					<a id="name-sort-btn sort-btn" href="#" class="name-col table-col sort-btn"><img src="/images/img.gif">Name</a><!--
				 --><a id="orbital-slot-sort-btn sort-btn" href="#" class="orbital-slot-col table-col sort-btn"><img src="/images/img.gif">Orbital Slot</a><!--
				 --><a id="region-sort-btn sort-btn" href="#" class="region-col table-col sort-btn"><img src="/images/img.gif">Region</a><!--
				 --><div class="favorites-col table-col">Favorites</div><!--
				 --><div class="selected-col table-col">Selected</div>
				</div>
				<a id="table-row" href="#" class="table-row">
					<div id="name" class="name-col table-col"></div><!--
				 --><div id="orbital-slot" class="orbital-slot-col table-col"></div><!--
				 --><div id="region" class="region-col table-col"></div><!--
				 --><div id="favorites" class="favorites-col table-col"><img src="/images/img.gif"></div><!--
				 --><div id="selected" class="selected-col table-col"><img src="/images/img.gif"></div><!--
				 --><div class="hover">View / Edit Details</div>
				</a>
			</div>

			<div id="satellite-details" class="satellite-details">
				<div class="name">
					<label>Name</label>
					<span id="name view"></span>
					<input id="name edit" type="text" />
				</div>

				<div class="region">
					<label>Region</label>
					<span id="region view"></span>
					<a id="region edit region-btn" href="#" class="dropdown-btn">Region</a>
					<div id="region-dropdown" class="dropdown">
						<div class="dropdown-header">Region</div>
						<a href="#" value="Africa" class="dropdown-option"><img src="/images/img.gif">Africa</a>
						<a href="#" value="Asia" class="dropdown-option"><img src="/images/img.gif">Asia</a>
						<a href="#" value="Australia" class="dropdown-option"><img src="/images/img.gif">Australia</a>
						<a href="#" value="Central/South America" class="dropdown-option"><img src="/images/img.gif">Central/South America</a>
						<a href="#" value="Europe" class="dropdown-option"><img src="/images/img.gif">Europe</a>
						<a href="#" value="North America" class="dropdown-option"><img src="/images/img.gif">North America</a>
					</div>
				</div>

				<div class="orbital-slot">
					<label>Orbital Slot</label>
					<span id="orbital-slot view"></span>
					<input id="orbital-slot edit" type="text" />
				</div>

				<div class="hemisphere">
					<label>Hemisphere</label>
					<span id="hemisphere view"></span>
					<input id="hemisphere edit" type="text" />
				</div>

				<div class="sat-id">
					<label>SatID</label>
					<span id="sat-id view"></span>
					<input id="sat-id edit" type="text" />
				</div>

				<div class="pre-skew">
					<label>Pre-Skew</label>
					<span id="pre-skew view"></span>
					<input id="pre-skew edit" type="text" />
				</div>

				<div class="tri-sat-id">
					<label>Tri-Sat</label>
					<span id="tri-sat-id view"></span>
					<input id="tri-sat-id edit" type="text" />
				</div>

				<label>Enable Satellite</label>
				<a id="enable-btn" href="#" class="of-btn"><div class="on">On</div><div class="off">Off</div></a>

				<label>Add to Favorites</label>
				<a id="favorite-btn" href="#" class="of-btn"><div class="on">On</div><div class="off">Off</div></a>

				<div id="xponder xponder-1" class="xponder">
					<div class="polarization">
						<label>Polarization</label>
						<span id="polarization view"></span>
						<a id="polarization edit polarization-btn" href="#" class="dropdown-btn">Polarization</a>
						<div id="polarization-dropdown" class="dropdown">
							<div class="dropdown-header">Polarization</div>
							<a href="#" value="Horizontal High" class="dropdown-option"><img src="/images/img.gif">Horizontal High</a>
							<a href="#" value="Horizontal Low" class="dropdown-option"><img src="/images/img.gif">Horizontal Low</a>
							<a href="#" value="Vertical High" class="dropdown-option"><img src="/images/img.gif">Vertical High</a>
							<a href="#" value="Vertical Low" class="dropdown-option"><img src="/images/img.gif">Vertical Low</a>
							<a href="#" value="Circular Right High" class="dropdown-option"><img src="/images/img.gif">Circular Right High</a>
							<a href="#" value="Circular Right Low" class="dropdown-option"><img src="/images/img.gif">Circular Right Low</a>
							<a href="#" value="Circular Left High" class="dropdown-option"><img src="/images/img.gif">Circular Left High</a>
							<a href="#" value="Circular Left Low" class="dropdown-option"><img src="/images/img.gif">Circular Left Low</a>
						</div>
					</div>

					<div class="frequency">
						<label>Frequency</label>
						<span id="frequency view"></span>
						<input id="frequency edit" type="text" />
					</div>

					<div class="symbol-rate">
						<label>Symbol Rate</label>
						<span id="symbol-rate view"></span>
						<input id="symbol-rate edit" type="text" />
					</div>

					<div class="fec-code">
						<label>FEC Code</label>
						<span id="fec-code view"></span>
						<a id="fec-code edit fec-code-btn" href="#" class="dropdown-btn">FEC Code</a>
						<div id="fec-code-dropdown" class="dropdown">
							<div class="dropdown-header">FEC Code</div>
							<a href="#" value="1/2" class="dropdown-option"><img src="/images/img.gif">1/2</a>
							<a href="#" value="2/3" class="dropdown-option"><img src="/images/img.gif">2/3</a>
							<a href="#" value="3/4" class="dropdown-option"><img src="/images/img.gif">3/4</a>
							<a href="#" value="3/5" class="dropdown-option"><img src="/images/img.gif">3/5</a>
							<a href="#" value="4/5" class="dropdown-option"><img src="/images/img.gif">4/5</a>
							<a href="#" value="5/6" class="dropdown-option"><img src="/images/img.gif">5/6</a>
							<a href="#" value="5/11" class="dropdown-option"><img src="/images/img.gif">5/11</a>
							<a href="#" value="6/7" class="dropdown-option"><img src="/images/img.gif">6/7</a>
							<a href="#" value="7/8" class="dropdown-option"><img src="/images/img.gif">7/8</a>
							<a href="#" value="8/9" class="dropdown-option"><img src="/images/img.gif">8/9</a>
							<a href="#" value="9/9" class="dropdown-option"><img src="/images/img.gif">9/9</a>
							<a href="#" value="9/10" class="dropdown-option"><img src="/images/img.gif">9/10</a>
						</div>
					</div>

					<div class="network-id">
						<label>Network ID</label>
						<span id="network-id view"></span>
						<input id="network-id edit" type="text" />
					</div>

					<div class="decoder-type">
						<label>Decoder Type</label>
						<span id="decoder-type view"></span>
						<a id="decoder-type edit decoder-type-btn" href="#" class="dropdown-btn">Decoder Type</a>
						<div id="decoder-type-dropdown" class="dropdown">
							<div class="dropdown-header">Decoder Type</div>
							<a href="#" value="QDVB" class="dropdown-option"><img src="/images/img.gif">DVB QPSK</a>
							<a href="#" value="QDSS" class="dropdown-option"><img src="/images/img.gif">DSS DTV</a>
							<a href="#" value="QDC2" class="dropdown-option"><img src="/images/img.gif">DCII QPSK DigiCipher 2</a>
							<a href="#" value="LQPSK" class="dropdown-option"><img src="/images/img.gif">LDPC QPSK STD DVB-S2</a>
							<a href="#" value="L8PSK" class="dropdown-option"><img src="/images/img.gif">LDPC 8PSK STD DVB-S2</a>
							<a href="#" value="TQPSK" class="dropdown-option"><img src="/images/img.gif">Turbo QPSK Dish</a>
							<a href="#" value="T8PSK" class="dropdown-option"><img src="/images/img.gif">Turbo 8PSK Dish</a>
						</div>
					</div>
				</div>

				<a id="save-btn edit" href="#" class="border-btn">Save</a>
				<a id="cancel-btn edit" href="#" class="border-btn">Cancel</a>
				<a id="edit-btn view" href="#" class="border-btn">Edit</a>
				<a id="select-btn view" href="#" class="border-btn">Select Satellite</a>

			</div>



		</div>
	</div>

</div>