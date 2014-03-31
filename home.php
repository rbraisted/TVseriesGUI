<? include $_SERVER['DOCUMENT_ROOT'] . '/base_.php'; ?>

<script type="text/javascript" src="/js/InstalledSatView.js"></script>
<script type="text/javascript" src="/js/InstalledGroupView.js"></script>
<script type="text/javascript" src="/js/VesselView.js"></script>

<script type="text/javascript" src="/js/HomePage.js"></script>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="view vessel-view #vessel-view">
  <div class="demo-mode #demo-mode-indicator">DEMO MODE</div>
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

<!-- 

	<div id="autoswitch-view" class="menu-sub-view autoswitch-view">
		<h3>Master</h3>
		<img src="/images/img.gif">
		<span id="master" class="autoswitch-master-label"></span>
		<a id="autoswitch-btn" class="btn basic-btn autoswitch-change-btn">
			<label>Change</label>
		</a>
	</div>

-->

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->