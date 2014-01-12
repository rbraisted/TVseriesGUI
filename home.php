<? include $_SERVER['DOCUMENT_ROOT'] . '/base.php'; ?>
<link type="text/css" rel="stylesheet" href="/css/home.css">
<script type="text/javascript" src="/js/home.js"></script>
<script type="text/javascript" src="/RoboHelp_CSH 2.js"></script>

<div id="menu-view" class="view menu-view">
	<div id="satellite-view" class="menu-sub-view satellite-view">
		<div id="mode-view" class="satellite-sub-view satellite-mode-view">
			<h3>Satellite Switching</h3>
			<a id="mode-btn" href="#" class="btn on-off-btn satellite-mode-btn">
				<div class="on">Manual</div>
				<div class="off">Automatic</div>
			</a>
		</div>

		<div id="details-view" class="satellite-sub-view satellite-details-view">
			<h3 id="name">Amos 2 Middle East</h3>
			<img id="signal" src="/images/img.gif" class="satellite-signal is-0">
			<span class="satellite-status-label">Tracking...</span>
		</div>

		<div id="satellite-dropdown" class="satellite-sub-view satellite-dropdown-view">
			<div id="dropdown-content dropdown-options">
				<a id="dropdown-option" href="#" value="A" class="btn dropdown-option satellite-dropdown-option">
					<img src="/images/img.gif">
					<label>Rosalind 1 Europe</label>
				</a>
				<a id="dropdown-option" href="#" value="B" class="btn dropdown-option satellite-dropdown-option">
					<img src="/images/img.gif">
					<label>Elena 22 Europe</label>
				</a>
				<a id="dropdown-option" href="#" value="C" class="btn dropdown-option satellite-dropdown-option">
					<img src="/images/img.gif">
					<label>Astrea 2 Middle East</label>
				</a>
				<a id="dropdown-option" href="#" value="D" class="btn dropdown-option satellite-dropdown-option">
					<img src="/images/img.gif">
					<label>Lane 3 Middle East</label>
				</a>
			</div>
		</div>

	</div>

	<div id="autoswitch-view" class="menu-sub-view autoswitch-view">
		<h3>Master</h3>
		<img src="/images/img.gif">
		<span id="status" class="autoswitch-master-label">Kitchen</span>
		<a id="change-btn" href="#" class="btn basic-btn autoswitch-change-btn">
			<label>Change</label>
		</a>
	</div>

	<div id="antenna-view" class="menu-sub-view antenna-view">
		<h3>Antenna</h3>
		<span id="antenna" class="antenna-label"></span>
	</div>

	<div id="location-view" class="menu-sub-view location-view">
		<h3>Location</h3>
		<span id="longitude" class="location-label"></span>
		<span id="latitude" class="location-label"></span>
	</div>
</div>

<div id="vessel-view" class="view main-view vessel-view">
	<div class="view-content main-content">
		<div id="vessel" class="vessel">
			<h1 id="vessel-heading" class="heading"></h1>
			<img id="vessel-animation" class="animation" src="/images/img.gif">
			<h3 id="vessel-name" class="name"></h3>
		</div>
	</div>
</div>