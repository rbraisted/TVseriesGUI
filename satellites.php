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

			<div id="satellites-table" class="table">
				<div class="table-header">
					<a id="name-btn" class="name-col table-col sort-btn" tabindex="1"><img src="/images/img.gif">Name</a><!--
				 --><a id="orbital-slot-btn" class="orbital-slot-col table-col sort-btn" tabindex="1"><img src="/images/img.gif">Orbital Slot</a><!--
				 --><a id="region-btn" class="region-col table-col sort-btn" tabindex="1"><img src="/images/img.gif">Region</a><!--
				 --><a class="favorites-col table-col" tabindex="1">Favorites</a><!--
				 --><a class="selected-col table-col" tabindex="1">Selected</a>
				</div>
				<a id="table-row" class="table-row selected" tabindex="1">
					<div class="name-col table-col">Satellite name</div><!--
				 --><div class="orbital-slot-col table-col">136W</div><!--
				 --><div class="region-col table-col">Europe</div><!--
				 --><div class="favorites-col table-col"><img src="/images/img.gif"></div><!--
				 --><div class="selected-col table-col"><img src="/images/img.gif"></div><!--
				 --><div class="hover">View / Edit Details</div>
				</a>
				<a id="table-row" class="table-row" tabindex="1">
					<div class="name-col table-col">Satellite name</div><!--
				 --><div class="orbital-slot-col table-col">136W</div><!--
				 --><div class="region-col table-col">Europe</div><!--
				 --><div class="favorites-col table-col"><img src="/images/img.gif"></div><!--
				 --><div class="selected-col table-col"><img src="/images/img.gif"></div><!--
				 --><div class="hover">View / Edit Details</div>
				</a>
				<a id="table-row" class="table-row favorite" tabindex="1">
					<div class="name-col table-col">Satellite name</div><!--
				 --><div class="orbital-slot-col table-col">136W</div><!--
				 --><div class="region-col table-col">Europe</div><!--
				 --><div class="favorites-col table-col"><img src="/images/img.gif"></div><!--
				 --><div class="selected-col table-col"><img src="/images/img.gif"></div><!--
				 --><div class="hover">View / Edit Details</div>
				</a>
				<a id="table-row" class="table-row" tabindex="1">
					<div class="name-col table-col">Satellite name</div><!--
				 --><div class="orbital-slot-col table-col">136W</div><!--
				 --><div class="region-col table-col">Europe</div><!--
				 --><div class="favorites-col table-col"><img src="/images/img.gif"></div><!--
				 --><div class="selected-col table-col"><img src="/images/img.gif"></div><!--
				 --><div class="hover">View / Edit Details</div>
				</a>
				<a id="table-row" class="table-row favorite" tabindex="1">
					<div class="name-col table-col">Satellite name</div><!--
				 --><div class="orbital-slot-col table-col">136W</div><!--
				 --><div class="region-col table-col">Europe</div><!--
				 --><div class="favorites-col table-col"><img src="/images/img.gif"></div><!--
				 --><div class="selected-col table-col"><img src="/images/img.gif"></div><!--
				 --><div class="hover">View / Edit Details</div>
				</a>
			</div>

			<div id="satellite-editor">
				<label for="name">Name</label><input id="name" type="text" />

				<a id="region-btn" href="#" class="dropdown-btn">Region</a>
				<div id="region-dropdown" class="dropdown">
					<div class="dropdown-header">Region</div>
					<a href="#" value="Africa" class="dropdown-option"><img src="/images/img.gif">Africa</a>
					<a href="#" value="Asia" class="dropdown-option"><img src="/images/img.gif">Asia</a>
					<a href="#" value="Australia" class="dropdown-option"><img src="/images/img.gif">Australia</a>
					<a href="#" value="Central/South America" class="dropdown-option"><img src="/images/img.gif">Central/South America</a>
					<a href="#" value="Europe" class="dropdown-option"><img src="/images/img.gif">Europe</a>
					<a href="#" value="North America" class="dropdown-option"><img src="/images/img.gif">North America</a>
				</div>

				<label for="lon">Lon</label><input id="lon" type="text" />

				<a id="suffix-btn" href="#" class="dropdown-btn">Suffix</a>
				<div id="suffix-dropdown" class="dropdown">
					<div class="dropdown-header">Suffix</div>
					<a href="#" value="N" class="dropdown-option"><img src="/images/img.gif">N</a>
					<a href="#" value="S" class="dropdown-option"><img src="/images/img.gif">S</a>
					<a href="#" value="A" class="dropdown-option"><img src="/images/img.gif">A</a>
					<a href="#" value="B" class="dropdown-option"><img src="/images/img.gif">B</a>
					<a href="#" value="C" class="dropdown-option"><img src="/images/img.gif">C</a>
					<a href="#" value="D" class="dropdown-option"><img src="/images/img.gif">D</a>
					<a href="#" value="F" class="dropdown-option"><img src="/images/img.gif">F</a>
					<a href="#" value="G" class="dropdown-option"><img src="/images/img.gif">G</a>
					<a href="#" value="H" class="dropdown-option"><img src="/images/img.gif">H</a>
					<a href="#" value="I" class="dropdown-option"><img src="/images/img.gif">I</a>
					<a href="#" value="J" class="dropdown-option"><img src="/images/img.gif">J</a>
					<a href="#" value="K" class="dropdown-option"><img src="/images/img.gif">K</a>
					<a href="#" value="L" class="dropdown-option"><img src="/images/img.gif">L</a>
					<a href="#" value="M" class="dropdown-option"><img src="/images/img.gif">M</a>
					<a href="#" value="O" class="dropdown-option"><img src="/images/img.gif">O</a>
					<a href="#" value="P" class="dropdown-option"><img src="/images/img.gif">P</a>
					<a href="#" value="Q" class="dropdown-option"><img src="/images/img.gif">Q</a>
					<a href="#" value="R" class="dropdown-option"><img src="/images/img.gif">R</a>
					<a href="#" value="T" class="dropdown-option"><img src="/images/img.gif">T</a>
					<a href="#" value="U" class="dropdown-option"><img src="/images/img.gif">U</a>
					<a href="#" value="V" class="dropdown-option"><img src="/images/img.gif">V</a>
					<a href="#" value="X" class="dropdown-option"><img src="/images/img.gif">X</a>
					<a href="#" value="Y" class="dropdown-option"><img src="/images/img.gif">Y</a>
					<a href="#" value="Z" class="dropdown-option"><img src="/images/img.gif">Z</a>
				</div>

				<label for="skew">Skew</label><input id="skew" type="text" />

				<a id="enable-btn" href="#" class="of-btn"><div class="on">On</div><div class="off">Off</div></a>
				<a id="favorite-btn" href="#" class="of-btn"><div class="on">On</div><div class="off">Off</div></a>

				<label for="tri-sat-id">Tri-Sat</label><input id="tri-sat-id" type="text" />

				<label for="lo1">Local Oscillator 1</label><input id="lo1" type="text" />
				<label for="lo2">Local Oscillator 2</label><input id="lo2" type="text" />

				<div id="xponder xponder-1">
					<a id="pol-btn" href="#" class="dropdown-btn">Polarization</a>
					<div id="pol-dropdown" class="dropdown">
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
				
					<label for="freq">Frequency</label><input id="freq" type="text" />
					<label for="sym-rate">Symbol Rate</label><input id="sym-rate" type="text" />

					<a id="fec-btn" href="#" class="dropdown-btn">FEC Code</a>
					<div id="fec-dropdown" class="dropdown">
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

					<label for="net-id">Network ID</label><input id="net-id" type="text" />

					<a id="mod-type-btn" href="#" class="dropdown-btn">Decoder Type</a>
					<div id="mod-type-dropdown" class="dropdown">
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

		</div>
	</div>

</div>