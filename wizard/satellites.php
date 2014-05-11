<?
$wiz = true;
include $_SERVER['DOCUMENT_ROOT'] . '/base.php';
?>

<script type="text/javascript" src="/js/SatTableView.js"></script>
<script type="text/javascript" src="/js/SatInfoView.js"></script>
<script type="text/javascript" src="/js/SatEditView.js"></script>
<script type="text/javascript" src="/js/GroupTableView.js"></script>
<script type="text/javascript" src="/js/GroupInfoView.js"></script>
<script type="text/javascript" src="/js/GroupEditView.js"></script>

<script type="text/javascript" src="/js/wizard/satellites.js"></script>

<div class="view spinner-view #spinner-view">
  <div class="view-head">Installing Satellites</div>
  <div class="headline">Please wait while your satellites are being installed...</div>

  <img src="/images/spinner.gif" class="spinner" />
</div>


<div class="view options #options-view">
  <div class="view-head">Satellite Selection</div>

  <div class="grey-box-table #table-view">
    <div class="table-row #table-row">
      <div class="title #title"></div>
      <div class="image #image"></div>
      <div class="radio-icon"></div>
    </div>
  </div>

  <div class="bottom-bar">
    <div class="prev-btn #prev-btn">Previous</div>
    <div class="next-btn #next-btn">Next</div>
  </div>
</div>



<div class="view circular-options #circular-options-view">
  <div class="view-head">Satellite Selection</div>
  <div class="copy">
    Note: While you may choose any combination of DIRECTV, DISH Network, &/or
    any other circular satellites you will be limited to manual satellite
    switching. If you wish to enable automatic switching, go back &
    <span class="link #prev-btn">
      choose the desired service provider instead.
    </span>
  </div>

  <div class="grey-box-table #table-view">
    <div class="table-row #table-row">
      <div class="title #title"></div>
      <div class="image #image"></div>
      <div class="radio-icon"></div>
    </div>
  </div>

  <div class="bottom-bar">
    <div class="prev-btn #prev-btn">Previous</div>
    <div class="next-btn #next-btn">Next</div>
  </div>
</div>



<div class="view tv5-manual-options #tv5-manual-options-view">
  <div class="view-head">Satellite Selection</div>
  <div class="copy">
    * You will have the opportunity to create your own group if one of
    the preset groups doesn’t meet your needs.
  </div>

  <div class="grey-box-table #table-view">
    <div class="table-row #table-row">
      <div class="title #title"></div>
      <div class="image #image"></div>
      <div class="radio-icon"></div>
    </div>
  </div>

  <div class="bottom-bar">
    <div class="prev-btn #prev-btn">Previous</div>
    <div class="next-btn #next-btn">Next</div>
  </div>
</div>



<div class="view single-view #single-view">
  <div class="view-head">Select a Satellite</div>
  <div class="copy">Select a region. Then choose a satellite in that region.</div>

  <div class="container">
    
    <div class="left container-head region-table-head">Regions</div>
    <div class="right container-head sat-table-head">Satellites</div>

    <div class="left region-table #region-table-view">
      <div class="table-row #table-row">
        <span class="table-col #region-name"></span>
      </div>
    </div>

    <div class="right single-sat-table #single-sat-table-view">
      <div class="sat-table #table-view">
        <div class="table-head #table-head">
          <div class="table-col install-col">Installed</div><!--
         --><div class="table-col name-col sort-btn #sort-btn #name-btn">Name</div><!--
         --><div class="table-col orb-slot-col sort-btn #sort-btn #lon-btn">Orbital Slot</div><!--
         --><div class="table-col region-col sort-btn #sort-btn #region-btn">Region</div>
        </div>
        <div class="table-row #table-row">
          <div class="table-col install-col">
            <div class="install-btn #install-btn"></div>
          </div><!--
       --><div class="table-col name-col">
            <span class="#sat-name"></span>
          </div><!--
       --><div class="table-col orb-slot-col #sat-longitude"></div><!--
       --><div class="table-col region-col #sat-region"></div>
        </div>
      </div>
    </div>

  </div>

  <div class="bottom-bar">
    <div class="prev-btn #prev-btn">Previous</div>
    <div class="next-btn #next-btn">Next</div>
  </div>
</div>

<div class="view group-view #group-view">
  <div class="view-head">Select a Satellite Group</div>
  <div class="copy">Select a group name to view its included satellites.</div>

  <div class="container">
    <div class="left container-head group-table-head">Groups</div>
    <div class="right container-head group-info-head">Satellites</div>

    <div class="left group-table #group-table-view">
      <div class="#table-view">
        <div class="table-row #table-row">
          <span class="table-col install-btn #install-btn"></span><!--
         --><span class="table-col #group-name"></span>
        </div>
      </div>
      <div class="block-btn #new-btn">Create New Group</div>
    </div>

    <div class="right group-info #group-info-view $installed $predefined">
      <div class="name-block">
        <div class="name-label">Satellite Group Name</div>
        <div class="group-name #group-name">N/A</div>
      </div>
      <div class="slot first #sat-view #sat-a-view $n/a">
        <div class="slot-head">Slot A</div>
        <div class="sat-name #sat-name">N/A</div>
        <div class="slot-foot">Installed</div>
      </div><!--
     --><div class="slot #sat-view #sat-b-view $n/a">
        <div class="slot-head">Slot B</div>
        <div class="sat-name #sat-name">N/A</div>
        <div class="slot-foot">Installed</div>
      </div><!--
     --><div class="slot #sat-view #sat-c-view $n/a">
        <div class="slot-head">Slot C</div>
        <div class="sat-name #sat-name">N/A</div>
        <div class="slot-foot">Installed</div>
      </div><!--
     --><div class="slot #sat-view #sat-d-view $n/a">
        <div class="slot-head">Slot D</div>
        <div class="sat-name #sat-name">N/A</div>
        <div class="slot-foot">Installed</div>
      </div>
      <div class="block-btn install-btn #install-btn">Install Group</div>
    </div>
  </div>

  <div class="bottom-bar">
    <div class="prev-btn #prev-btn">Previous</div>
    <div class="next-btn #next-btn">Next</div>
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
        <div class="table-col name-col sort-btn #sort-btn #name-btn">Name</div><!--
     --><div class="table-col orb-slot-col sort-btn #sort-btn #lon-btn">Orbital Slot</div><!--
     --><div class="table-col region-col sort-btn #sort-btn #region-btn">Region</div>
      </div>
      <div class="table-row #table-row">
        <div class="table-col name-col">
          <div class="#sat-name"></div>
        </div><!--
     --><div class="table-col orb-slot-col #sat-longitude"></div><!--
     --><div class="table-col region-col #sat-region"></div>
      </div>
    </div>
  </div>
</div>
