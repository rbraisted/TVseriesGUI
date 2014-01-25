<? include $_SERVER['DOCUMENT_ROOT'] . '/base.php'; ?>
<link type="text/css" rel="stylesheet" href="/css/home.css">
<script type="text/javascript" src="/js/home.js"></script>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div id="vessel-view" class="view main-view vessel-view">
	<div class="view-content main-content">
		<div id="vessel" class="vessel">
			<h1 id="vessel-heading" class="heading"></h1>
			<img id="vessel-animation" class="animation" src="/images/img.gif">
			<h3 id="vessel-name" class="name"></h3>
		</div>
	</div>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div id="menu-view" class="view menu-view">
	<div id="satellite-view" class="menu-sub-view satellite-view">
		<div id="mode-view" class="satellite-sub-view">
			<h3>Satellite Switching</h3>
			<a id="mode-btn" href="#" class="btn toggle-btn satellite-mode-btn">
				<div class="on">Manual</div>
				<div class="off">Automatic</div>
			</a>
		</div>

		<div id="details-view" class="satellite-sub-view">
			<h3>
				<span id="name">Wheatly 1</span>
				<span id="region">Middle East</span>
			</h3>
			<img id="signal" src="/images/img.gif" class="satellite-signal is-0">
			<span id="status" class="satellite-status-label">Tracking...</span>
		</div>

		<div id="satellite-dropdown" class="satellite-sub-view satellite-dropdown-view">
			<div id="dropdown-options">
				<a id="dropdown-option satellite-a-btn" href="#" value="" class="btn dropdown-option satellite-dropdown-option">
					<img src="/images/img.gif">
					<label>
						<span id="name">Rosalind 1</span>
						<span id="region">Europe</span>
					</label>
				</a>
				<a id="dropdown-option satellite-b-btn" href="#" value="" class="btn dropdown-option satellite-dropdown-option">
					<img src="/images/img.gif">
					<label>
						<span id="name">Elena 22</span>
						<span id="region">Europe</span>
					</label>
				</a>
				<a id="dropdown-option satellite-c-btn" href="#" value="" class="btn dropdown-option satellite-dropdown-option">
					<img src="/images/img.gif">
					<label>
						<span id="name">Astrea 2</span>
						<span id="region">Middle East</span>
					</label>
				</a>
				<a id="dropdown-option satellite-d-btn" href="#" value="" class="btn dropdown-option satellite-dropdown-option">
					<img src="/images/img.gif">
					<label>
						<span id="name">Lane 3</span>
						<span id="region">Middle East</span>
					</label>
				</a>
			</div>
		</div>
	</div>

	<div id="autoswitch-view" class="menu-sub-view autoswitch-view">
		<h3>Master</h3>
		<img src="/images/img.gif">
		<span id="name" class="autoswitch-master-label">Kitchen</span>
		<a id="change-btn" href="#" class="btn basic-btn autoswitch-change-btn">
			<label>Change</label>
		</a>
	</div>

	<div id="antenna-view" class="menu-sub-view">
		<h3>Antenna</h3>
		<span id="antenna" class="antenna-label"></span>
	</div>

	<div id="location-view" class="menu-sub-view">
		<h3>Location</h3>
		<span id="longitude" class="location-label"></span>
		<span id="latitude" class="location-label"></span>
	</div>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div id="autoswitch-dropdown" class="view popup-view dropdown-view">
	<div id="dropdown-content" class="view-content popup-content dropdown-content">
		<a id="close-btn" href="#" class="btn back-btn">
			<img src="/images/img.gif">
			<label>Select Master</label>
		</a>
		<h1>Select Master</h1>
		<div id="dropdown-options">
			<a id="dropdown-option" href="#" value="OFF" class="btn dropdown-option">
				<img src="/images/img.gif">
				<label>OFF</label>
			</a>
			<a id="dropdown-option" href="#" value="WPA_PSK" class="btn dropdown-option">
				<img src="/images/img.gif">
				<label>WPA_PSK</label>
			</a>
		</div>
	</div>
</div>