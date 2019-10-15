<? include $_SERVER['DOCUMENT_ROOT'] . '/base.php'; ?>

<script type="text/javascript" src="/js/InstalledSatView.js"></script>
<script type="text/javascript" src="/js/SatTableView.js"></script>
<script type="text/javascript" src="/js/SatInfoView.js"></script>
<script type="text/javascript" src="/js/SatEditView.js"></script>
<script type="text/javascript" src="/js/GroupTableView.js"></script>
<script type="text/javascript" src="/js/GroupInfoView.js"></script>
<script type="text/javascript" src="/js/GroupEditView.js"></script>

<script type="text/javascript" src="/js/SatellitesPage.js"></script>

<!-- sidebar
contains .#region-table-view (single mode)
and also .#group-table-view (group mode)
- -- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->
<div class="sidebar">

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

  <div class="sidebar-chunk">
    <div class="sidebar-chunk-head">Satellite Mode</div>
    <div class="toggle-btn #sat-mode-btn">
      <span class="on">Single</span>
      <span class="off">Group</span>
    </div>
  </div>

  <div class="region-table #region-table-view">
    <div class="table-row #table-row">
      <span class="table-col #region-name"></span>
    </div>
  </div>

  <div class="group-table #group-table-view">
    <div class="#table-view">
      <div class="table-row #table-row">
        <span class="table-col install-btn #install-btn"></span><!--
       --><span class="table-col #group-name"></span>
      </div>
    </div>
  </div>

  <div class="block-btn #new-btn">Create New Group</div>

</div>

<!-- shared views (#sat-info-view, #sat-edit-view)
- -- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->
<div class="popup #sat-info-view">
  <div class="popup-guts sat-info">
    <div class="#spinner popup-spinner"></div>
    <div class="view-head">
      Satellite Details
      <div class="back-btn #back-btn"></div>
    </div>
    <div class="name-block">
      <div class="label">Satellite Name</div>
      <div class="value #sat-name">N/A</div>
    </div><!--
 --><div class="fav-block">
      <div class="label">Add To Favorites</div>
      <div class="btn toggle-btn fav-btn #fav-btn">
        <div class="on">On</div>
        <div class="off">Off</div>
      </div>
      <div class="heart-btn #fav-btn">
        <div class="on"></div>
        <div class="off"></div>
      </div>
    </div><!--
   --><div class="region-block">
      <div class="label">Region</div>
      <div class="value #sat-region">N/A</div>
    </div><!--
   --><div class="orb-slot-block">
      <div class="label">Orbital Slot</div>
      <div class="value #sat-longitude">N/A</div>
    </div><!--
   --><div class="skew-block">
      <div class="label">Pre-Skew</div>
      <div class="value #sat-skew">N/A</div>
    </div><!--
   --><div class="lnb-block">
      <div class="label">LNB Type</div>
      <div class="value #sat-lnb">N/A</div>
    </div><!--
 --><div class="lo1-block">
      <div class="label">Local Oscillator #1</div>
      <div class="value #sat-lo1">N/A</div>
    </div><!--
 --><div class="lo2-block">
      <div class="label">Local Oscillator #2</div>
      <div class="value #sat-lo2">N/A</div>
    </div>
    <div class="xponder first #xponder-1-view">
      <div class="slot-head #xponder-display"></div>
      <div class="freq-block xponder-block">
        <div class="label">Frequency (MHz)</div>
        <div class="value #xponder-freq">N/A</div>
      </div><!--
    --><div class="symRate-block xponder-block">
        <div class="label">Symbol Rate</div>
        <div class="value #xponder-symRate">N/A</div>
      </div><!--
    --><div class="fec-block xponder-block">
        <div class="label">FEC Code</div>
        <div class="value #xponder-fec">N/A</div>
      </div><!--
    --><div class="netID-block xponder-block">
        <div class="label">Satellite ID</div>
        <div class="value #xponder-netID">N/A</div>
      </div><!--
    --><div class="modType-block xponder-block">
        <div class="label">Decoder Type</div>
        <div class="value #xponder-modType">N/A</div>
      </div>
    </div><!--
   --><div class="xponder #xponder-2-view">
      <div class="slot-head #xponder-display"></div>
      <div class="freq-block xponder-block">
        <div class="label">Frequency (MHz)</div>
        <div class="value #xponder-freq">N/A</div>
      </div><!--
    --><div class="symRate-block xponder-block">
        <div class="label">Symbol Rate</div>
        <div class="value #xponder-symRate">N/A</div>
      </div><!--
    --><div class="fec-block xponder-block">
        <div class="label">FEC Code</div>
        <div class="value #xponder-fec">N/A</div>
      </div><!--
    --><div class="netID-block xponder-block">
        <div class="label">Satellite ID</div>
        <div class="value #xponder-netID">N/A</div>
      </div><!--
    --><div class="modType-block xponder-block">
        <div class="label">Decoder Type</div>
        <div class="value #xponder-modType">N/A</div>
      </div>
    </div><!--
   --><div class="xponder #xponder-3-view">
      <div class="slot-head #xponder-display"></div>
      <div class="freq-block xponder-block">
        <div class="label">Frequency (MHz)</div>
        <div class="value #xponder-freq">N/A</div>
      </div><!--
    --><div class="symRate-block xponder-block">
        <div class="label">Symbol Rate</div>
        <div class="value #xponder-symRate">N/A</div>
      </div><!--
    --><div class="fec-block xponder-block">
        <div class="label">FEC Code</div>
        <div class="value #xponder-fec">N/A</div>
      </div><!--
    --><div class="netID-block xponder-block">
        <div class="label">Satellite ID</div>
        <div class="value #xponder-netID">N/A</div>
      </div><!--
    --><div class="modType-block xponder-block">
        <div class="label">Decoder Type</div>
        <div class="value #xponder-modType">N/A</div>
      </div>
    </div><!--
   --><div class="xponder #xponder-4-view">
      <div class="slot-head #xponder-display"></div>
      <div class="freq-block xponder-block">
        <div class="label">Frequency (MHz)</div>
        <div class="value #xponder-freq">N/A</div>
      </div><!--
    --><div class="symRate-block xponder-block">
        <div class="label">Symbol Rate</div>
        <div class="value #xponder-symRate">N/A</div>
      </div><!--
    --><div class="fec-block xponder-block">
        <div class="label">FEC Code</div>
        <div class="value #xponder-fec">N/A</div>
      </div><!--
    --><div class="netID-block xponder-block">
        <div class="label">Satellite ID</div>
        <div class="value #xponder-netID">N/A</div>
      </div><!--
    --><div class="modType-block xponder-block">
        <div class="label">Decoder Type</div>
        <div class="value #xponder-modType">N/A</div>
      </div>
    </div>
    <div class="btn-tray">
      <div class="block-btn edit-btn #edit-btn">Edit</div>
    </div>
  </div>
</div>

<div class="popup #sat-edit-view">
  <div class="popup-guts sat-edit">
    <div class="#spinner popup-spinner"></div>
    <div class="view-head">
      Edit Satellite Details
      <div class="back-btn #back-btn"></div>
    </div>
    <div class="name-block">
      <div class="label">Satellite Name</div>
      <input class="input #sat-name" />
      <div class="value #sat-name"></div>
    </div><!--
   --><div class="fav-block">
      <div class="label">Add To Favorites</div>
      <div class="btn toggle-btn fav-btn #fav-btn">
        <div class="on">On</div>
        <div class="off">Off</div>
      </div>
      <div class="heart-btn #fav-btn">
        <div class="on"></div>
        <div class="off"></div>
      </div>
    </div><!--
   --><div class="region-block">
      <div class="label">Region</div>
      <div class="value #sat-region"></div>
      <div class="dropdown-btn #region-btn">
        <div class="#sat-region"></div>
        <div class="dropdown-icon"></div>
      </div>
    </div><!--
   --><div class="orb-slot-block">
      <div class="label">Orbital Slot</div>
      <input class="input #sat-longitude" />
      <div class="value #sat-longitude"></div>
    </div><!--
   --><div class="skew-block">
      <div class="label">Pre-Skew</div>
      <input class="input #sat-skew" />
      <div class="value #sat-skew"></div>
    </div><!--
   --><div class="lnb-block">
      <div class="label">LNB Type</div>
      <div class="value #sat-lnb"></div>
    </div><!--
   --><div class="lo1-block">
      <div class="label">Local Oscillator #1</div>
      <div class="value #sat-lo1"></div>
    </div><!--
   --><div class="lo2-block">
      <div class="label">Local Oscillator #2</div>
      <div class="value #sat-lo2"></div>
    </div>
    <div class="xponder first #xponder-1-view">
      <div class="slot-head #xponder-display"></div>
      <div class="freq-block xponder-block">
        <div class="label">Frequency (MHz)</div>
        <input class="input #xponder-freq" />
      </div><!--
    --><div class="symRate-block xponder-block">
        <div class="label">Symbol Rate</div>
        <input class="input #xponder-symRate" />
      </div><!--
    --><div class="fec-block xponder-block">
        <div class="label">FEC Code</div>
        <div class="dropdown-btn #fec-btn">
          <div class="#xponder-fec"></div>
          <div class="dropdown-icon"></div>
        </div>
      </div><!--
    --><div class="netID-block xponder-block">
        <div class="label">Satellite ID</div>
        <input class="input #xponder-netID" />
      </div><!--
    --><div class="modType-block xponder-block">
        <div class="label">Decoder Type</div>
        <div class="dropdown-btn #modType-btn">
          <div class="#xponder-modType"></div>
          <div class="dropdown-icon"></div>
        </div>
      </div>
    </div><!--
   --><div class="xponder #xponder-2-view">
      <div class="slot-head #xponder-display"></div>
      <div class="freq-block xponder-block">
        <div class="label">Frequency (MHz)</div>
        <input class="input #xponder-freq" />
      </div><!--
    --><div class="symRate-block xponder-block">
        <div class="label">Symbol Rate</div>
        <input class="input #xponder-symRate" />
      </div><!--
    --><div class="fec-block xponder-block">
        <div class="label">FEC Code</div>
        <div class="dropdown-btn #fec-btn">
          <div class="#xponder-fec"></div>
          <div class="dropdown-icon"></div>
        </div>
      </div><!--
    --><div class="netID-block xponder-block">
        <div class="label">Satellite ID</div>
        <input class="input #xponder-netID" />
      </div><!--
    --><div class="modType-block xponder-block">
        <div class="label">Decoder Type</div>
        <div class="dropdown-btn #modType-btn">
          <div class="#xponder-modType"></div>
          <div class="dropdown-icon"></div>
        </div>
      </div>
    </div><!--
   --><div class="xponder #xponder-3-view">
      <div class="slot-head #xponder-display"></div>
      <div class="freq-block xponder-block">
        <div class="label">Frequency (MHz)</div>
        <input class="input #xponder-freq" />
      </div><!--
    --><div class="symRate-block xponder-block">
        <div class="label">Symbol Rate</div>
        <input class="input #xponder-symRate" />
      </div><!--
    --><div class="fec-block xponder-block">
        <div class="label">FEC Code</div>
        <div class="dropdown-btn #fec-btn">
          <div class="#xponder-fec"></div>
          <div class="dropdown-icon"></div>
        </div>
      </div><!--
    --><div class="netID-block xponder-block">
        <div class="label">Satellite ID</div>
        <input class="input #xponder-netID" />
      </div><!--
    --><div class="modType-block xponder-block">
        <div class="label">Decoder Type</div>
        <div class="dropdown-btn #modType-btn">
          <div class="#xponder-modType"></div>
          <div class="dropdown-icon"></div>
        </div>
      </div>
    </div><!--
   --><div class="xponder #xponder-4-view">
      <div class="slot-head #xponder-display"></div>
      <div class="freq-block xponder-block">
        <div class="label">Frequency (MHz)</div>
        <input class="input #xponder-freq" />
      </div><!--
    --><div class="symRate-block xponder-block">
        <div class="label">Symbol Rate</div>
        <input class="input #xponder-symRate" />
      </div><!--
    --><div class="fec-block xponder-block">
        <div class="label">FEC Code</div>
        <div class="dropdown-btn #fec-btn">
          <div class="#xponder-fec"></div>
          <div class="dropdown-icon"></div>
        </div>
      </div><!--
    --><div class="netID-block xponder-block">
        <div class="label">Satellite ID</div>
        <input class="input #xponder-netID" />
      </div><!--
    --><div class="modType-block xponder-block">
        <div class="label">Decoder Type</div>
        <div class="dropdown-btn #modType-btn">
          <div class="#xponder-modType"></div>
          <div class="dropdown-icon"></div>
        </div>
      </div>
    </div>

    <a href="javascript:TVRO.showHelp(905);" class="link">
      Learn more about these satellite parameters.
    </a>

    <div class="btn-tray">
      <div class="block-btn first save-btn #save-btn">Save</div><!--
    --><div class="block-btn cancel-btn #back-btn">Cancel</div><!--
    --><div class="block-btn reset-btn #reset-btn">Reset</div>
    </div>
  </div>
</div>

<div class="dropdown #sat-edit-region-dropdown-view">
  <div class="dropdown-guts #dropdown-content">
    <div class="view-head">
      <span class="#dropdown-title">Regions</span>
      <div class="back-btn #close-btn"></div>
    </div>
    <div class="table #table-view">
      <div class="table-row #table-row">
        <span class="table-col #dropdown-value"></span>
      </div>
    </div>
  </div>
</div>

<div class="dropdown #sat-edit-fec-dropdown-view">
  <div class="dropdown-guts #dropdown-content">
    <div class="view-head">
      <span class="#dropdown-title">FEC Code</span>
      <div class="back-btn #close-btn"></div>
    </div>
    <div class="table #table-view">
      <div class="table-row #table-row">
        <span class="table-col #dropdown-value"></span>
      </div>
    </div>
  </div>
</div>

<div class="dropdown #sat-edit-modType-dropdown-view">
  <div class="dropdown-guts #dropdown-content">
    <div class="view-head">
      <span class="#dropdown-title">Decoder Type</span>
      <div class="back-btn #close-btn"></div>
    </div>
    <div class="table #table-view">
      <div class="table-row #table-row">
        <span class="table-col #dropdown-value"></span>
      </div>
    </div>
  </div>
</div>


<!-- single views
- -- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->
<div class="view #single-sat-table-view">
  <div class="view-head">
    <span class="sat-icon"></span>
    <span>Satellites</span>
    <div class="back-btn #back-btn"></div>
    <div class="note">
      <span style="font-size: 14px;">Please Note: To change your satellite TV service, please use the <a href="/wizard" style="border-bottom: dashed 1px;border-top: dashed 1px;">Setup Wizard</a></span>
    </div>
  </div>
  <div class="sat-table single-sat-table #table-view">
    <div class="table-head #table-head">
      <div class="table-col install-col">Selected</div><!--
     --><div class="table-col name-col sort-btn #sort-btn #name-btn">Name</div><!--
     --><div class="table-col orb-slot-col sort-btn #sort-btn #lon-btn">Orbital Slot</div><!--
     --><div class="table-col region-col sort-btn #sort-btn #region-btn">Region</div><!--
     --><div class="table-col fav-col sort-btn #sort-btn #fav-btn">Favorites</div>
    </div>
    <div class="table-row #table-row">
      <div class="table-col install-col">
        <div class="install-btn #install-btn"></div>
      </div><!--
     --><div class="table-col name-col">
        <div class="#sat-name"></div>
      </div><!--
     --><div class="table-col orb-slot-col #sat-longitude"></div><!--
     --><div class="table-col region-col #sat-region"></div><!--
     --><div class="table-col fav-col">
        <div class="fav-btn #fav-btn"></div>
        <div class="info-btn #info-btn"></div>
      </div>
    </div>
  </div>
</div>

<!-- group views
- -- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="view group-info #group-info-view $installed $predefined">
  <div class="view-head">
    <span class="sat-icon"></span>
    <span class="#group-name"></span>
    <div class="back-btn #back-btn"></div>
  </div>
  <div class="name-block">
    <div class="name-label">Satellite Group Name</div>
    <div class="group-name #group-name">N/A</div>
  </div>
  <div class="slot first #sat-view #sat-a-view $n/a">
    <div class="slot-head">Slot A</div>
    <div class="sat-name #sat-name">N/A</div>
    <div class="install-btn #install-btn"></div>
    <div class="info-btn #info-btn"></div>
    <div class="slot-foot">Selected</div>
  </div><!--
 --><div class="slot #sat-view #sat-b-view $n/a">
    <div class="slot-head">Slot B</div>
    <div class="sat-name #sat-name">N/A</div>
    <div class="install-btn #install-btn"></div>
    <div class="info-btn #info-btn"></div>
    <div class="slot-foot">Selected</div>
  </div><!--
 --><div class="slot #sat-view #sat-c-view $n/a">
    <div class="slot-head">Slot C</div>
    <div class="sat-name #sat-name">N/A</div>
    <div class="install-btn #install-btn"></div>
    <div class="info-btn #info-btn"></div>
    <div class="slot-foot">Selected</div>
  </div><!--
 --><div class="slot #sat-view #sat-d-view $n/a">
    <div class="slot-head">Slot D</div>
    <div class="sat-name #sat-name">N/A</div>
    <div class="install-btn #install-btn"></div>
    <div class="info-btn #info-btn"></div>
    <div class="slot-foot">Selected</div>
  </div>
  <div class="btn-tray">
    <div class="block-btn first delete-btn #delete-btn">Delete Group</div><!--
   --><div class="block-btn edit-btn #edit-btn">Edit Group</div><!--
   --><div class="block-btn install-btn #install-btn">Install Group</div>
  </div>
</div>

<div class="popup #group-edit-view">
  <div class="popup-guts group-edit">
    <div class="view-head">
      Edit Satellite Group
      <div class="back-btn #back-btn"></div>
    </div>
    <div class="name-block">
      <div class="name-label">Satellite Group Name</div>
      <input type="text" class="input group-name #group-name" />
    </div>
    <div class="slot first #sat-view #sat-a-view $n/a">
      <div class="slot-head">Slot A</div>
      <div class="sat-name #sat-name">N/A</div>
    </div>
    <div class="slot #sat-view #sat-b-view $n/a">
      <div class="slot-head">Slot B</div>
      <div class="sat-name #sat-name">N/A</div>
    </div>
    <div class="slot #sat-view #sat-c-view $n/a">
      <div class="slot-head">Slot C</div>
      <div class="sat-name #sat-name">N/A</div>
    </div>
    <div class="slot #sat-view #sat-d-view $n/a">
      <div class="slot-head">Slot D</div>
      <div class="sat-name #sat-name">N/A</div>
    </div>
    <div class="btn-tray">
      <div class="block-btn first save-btn #save-btn">Save</div><!--
     --><div class="block-btn cancel-btn #back-btn">Cancel</div>
    </div>
  </div>
</div>

<div class="popup #group-sat-table-view">
  <div class="popup-guts">
    <div class="view-head">
      <span class="sat-icon"></span>
      <span>Satellites</span>
      <div class="back-btn #back-btn"></div>
    </div>
    <div class="sat-table group-sat-table #table-view">
      <div class="table-head #table-head">
        <div class="table-col install-col">Selected</div><!--
     --><div class="table-col name-col sort-btn #sort-btn #name-btn">Name</div><!--
     --><div class="table-col orb-slot-col sort-btn #sort-btn #lon-btn">Orbital Slot</div><!--
     --><div class="table-col region-col sort-btn #sort-btn #region-btn">Region</div><!--
     --><div class="table-col fav-col sort-btn #sort-btn #fav-btn">Favorites</div>
      </div>
      <div class="table-row #table-row">
        <div class="table-col install-col">
          <div class="install-btn #install-btn"></div>
        </div><!--
     --><div class="table-col name-col">
          <div class="#sat-name"></div>
        </div><!--
     --><div class="table-col orb-slot-col #sat-longitude"></div><!--
     --><div class="table-col region-col #sat-region"></div><!--
     --><div class="table-col fav-col">
          <div class="fav-btn #fav-btn"></div>
          <div class="info-btn #info-btn"></div>
        </div>
      </div>
    </div>
  </div>
</div>

<div class="spin-view spinner-view #spinner-view">
  <div class="spin-view-head">Installing Satellites</div>
  <div class="headline">Please wait while your satellites are being installed...</div>
  <div id="timer" style="text-align:center;font-size: 60px;padding: 10px 0;"></div>
  <div id="timer1" style="text-align:center;padding: 10px 0;color: red;font-size: 30px;"></div>

  <br>
  <p class="headline ant_status #ant_status"></p>


  <div class="spinner"></div>
  <div class="bottom-bar">
    <div class="exit-btn #exit-btn">Exit</div>
  </div>
</div>