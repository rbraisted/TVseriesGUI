<? include $_SERVER['DOCUMENT_ROOT'] . '/base.php'; ?>

<script type="text/javascript" src="/js/InstalledSatView.js"></script>
<script type="text/javascript" src="/js/MasterView.js"></script>
<script type="text/javascript" src="/js/InstalledGroupView.js"></script>
<script type="text/javascript" src="/js/VesselView.js"></script>

<script type="text/javascript" src="/js/HomePage.js"></script>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="view vessel-view #vessel-view">
  <div class="demo-mode #demo-mode-indicator">DEMO MODE</div>
  <div class="vessel-heading #vessel-heading"></div>
  <div class="vessel-animation #vessel-animation"></div>
  <div class="vessel-name #vessel-name"></div>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="sidebar">

  <div class="sidebar-chunk #sat-switching-view">
    <div class="sidebar-chunk-head">Satellite Switching</div>
    <div class="toggle-btn #sat-switching-btn">
      <span class="on">Manual</span>
      <span class="off">Automatic</span>
    </div>
  </div>

  <div class="sidebar-chunk #installed-sat-view">
    <div class="sidebar-chunk-head">
      <div class="#sat-region"></div>
      <div>
        <span class="#sat-name"></span>
        <span> - </span>
        <span class="#sat-longitude"></span>
      </div>
    </div>
    <div class="sat-signal #ant-bars $0"></div>
    <span class="sat-status #ant-state"></span>
  </div>

  <div class="sidebar-chunk master-chunk #master-view">
    <div class="sidebar-chunk-head">
      Master Receiver
    </div>
    <div class="label #master-name"></div>
    <div class="block-btn master-btn #master-btn">Change</div>
  </div>

  <div class="#manual-installed-group-view">
    <div class="sat-table #sat-table-view">
      <div class="table-row #table-row">
        <span class="table-col install-btn #install-btn"></span><!--
      --><span class="table-col #sat-name"></span>
      </div>
    </div>
  </div>

  <div class="sidebar-chunk">
    <div class="sidebar-chunk-head">Antenna</div>
    <div class="label #ant-model"></div>
  </div>

  <div class="sidebar-chunk">
    <div class="sidebar-chunk-head">Location - (<span class="#gps-source"></span>)</div>
    <div class="label #gps-state"></div>
    <div class="label #gps-latitude"></div>
    <div class="label #gps-longitude"></div>
  </div>

  <div class="sidebar-chunk #automatic-installed-group-view">
    <div class="sidebar-chunk-head">Installed Satellites</div>
    <div class="#sat-table-view">
      <div class="label #table-row">
        <span class="#sat-name"></span>
      </div>
    </div>
  </div>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="dropdown master-dropdown #master-dropdown-view">
  <div class="dropdown-guts #dropdown-content">
    <div class="view-head">
      <span class="#dropdown-title">Select Master Receiver</span>
      <div class="back-btn #close-btn"></div>
    </div>
    <div class="table #table-view">
      <div class="table-row #table-row">
        <span class="table-col dropdown-icon"></span><!--
      --><span class="table-col #dropdown-value"></span>
      </div>
    </div>
  </div>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->