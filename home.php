<? include $_SERVER['DOCUMENT_ROOT'] . '/base_.php'; ?>

<script type="text/javascript" src="/js/InstalledSatView.js"></script>
<script type="text/javascript" src="/js/InstalledGroupView.js"></script>
<script type="text/javascript" src="/js/VesselView.js"></script>

<script type="text/javascript" src="/js/HomePage.js"></script>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="view vessel-view #vessel-view">
  <div class="demo-mode">DEMO MODE</div>
  <div class="vessel-heading #vessel-heading"></div>
  <div class="vessel-animation-bg"></div>
  <div class="vessel-animation #vessel-animation"></div>
  <div class="vessel-name #vessel-name"></div>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="sidebar">

  <div class="sidebar-chunk">
    <div class="sidebar-chunk-head">Satellite Switching</div>
    <div class="toggle-btn #sat-switching-btn">
      <span class="on">Manual</span>
      <span class="off">Automatic</span>
    </div>
  </div>

  <div class="sidebar-chunk #installed-sat-view">
    <div class="sidebar-chunk-head">
      <span class="#sat-name"></span>
      <span class="#sat-region"></span>
    </div>
    <div class="sat-signal #ant-bars $0"></div>
    <span class="sat-status #ant-state"></span>
  </div>

  <div class="#manual-installed-group-view">
    <div class="sat-table #sat-table-view">
      <div class="table-row #table-row">
        <span class="table-col install-btn #install-btn"></span><!--
      --><span class="table-col #sat-name"></span>
      </div>
    </div>
  </div>

  <div class="sidebar-chunk #automatic-installed-group-view">
    <div class="sidebar-chunk-head">Installed Satellites</div>
    <div class="#sat-table-view">
      <div class="label #table-row">
        <span class="#sat-name"></span>
      </div>
    </div>
  </div>

  <div class="sidebar-chunk">
    <div class="sidebar-chunk-head">Antenna</div>
    <div class="label #ant-model"></div>
  </div>

  <div class="sidebar-chunk">
    <div class="sidebar-chunk-head">Location</div>
    <div class="label #gps-latitude"></div>
    <div class="label #gps-longitude"></div>
  </div>

</div>

<!-- <div id="menu-view" class="view menu-view">
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
</div> -->

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->