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
			<a id="mode-btn" class="btn toggle-btn satellite-mode-btn">
				<div class="on">Manual</div>
				<div class="off">Automatic</div>
			</a>
		</div>

		<div id="details-view" class="satellite-sub-view">
			<h3>
				<span id="name"></span>
				<span id="region"></span>
			</h3>
			<img id="signal" src="/images/img.gif" class="satellite-signal is-0">
			<span id="status" class="satellite-status-label"></span>
		</div>

		<div id="satellite-dropdown" class="satellite-sub-view satellite-dropdown-view">
			<a id="radio-option slot-a-btn" value="" class="btn dropdown-option satellite-dropdown-option">
				<img src="/images/img.gif">
				<label>
					<span id="name"></span>
					<span id="region"></span>
				</label>
			</a>
			<a id="radio-option slot-b-btn" value="" class="btn dropdown-option satellite-dropdown-option">
				<img src="/images/img.gif">
				<label>
					<span id="name"></span>
					<span id="region"></span>
				</label>
			</a>
			<a id="radio-option slot-c-btn" value="" class="btn dropdown-option satellite-dropdown-option">
				<img src="/images/img.gif">
				<label>
					<span id="name"></span>
					<span id="region"></span>
				</label>
			</a>
			<a id="radio-option slot-d-btn" value="" class="btn dropdown-option satellite-dropdown-option">
				<img src="/images/img.gif">
				<label>
					<span id="name"></span>
					<span id="region"></span>
				</label>
			</a>
		</div>
	</div>

	<div id="autoswitch-view" class="menu-sub-view autoswitch-view">
		<h3>Master</h3>
		<img src="/images/img.gif">
		<span id="master" class="autoswitch-master-label"></span>
		<a id="autoswitch-btn" class="btn basic-btn autoswitch-change-btn">
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
		<a id="close-btn" class="btn back-btn">
			<img src="/images/img.gif">
			<label>Select Master</label>
		</a>
		<h1>Select Master</h1>
		<div id="table-rows">
			<a id="table-row template radio-option dropdown-option" value="" class="btn dropdown-option">
				<img src="/images/img.gif">
				<label id="name"></label>
			</a>
		</div>
	</div>
</div>