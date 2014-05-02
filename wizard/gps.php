<?
$wiz = true;
include $_SERVER['DOCUMENT_ROOT'] . '/base_.php';
?>

<script type="text/javascript" src="/js/wizard/gps.js"></script>

<div class="view vessel-location #vessel-location-view">
  <div class="view-head">Vessel Location</div>

  <div class="headline">
    <div class="desktop">
      Choose the GPS source you would like to use
      for your location coordinates.
    </div>
    <div class="mobile">
      Choose the GPS source you would like to use
      for your location coordinates.
    </div>
  </div>

  <div class="clear-table #table-view">
    <div class="table-row #table-row">
      <span class="table-col install-btn"></span><!--
    --><span class="table-col #value"></span>
    </div>
  </div>

  <div class="coordinates-view #coordinates-view">
    <span class="coordinates-label label">Enter your coordinates</span>
    <span class="label">Latitude:</span>
    <input type="text" placeholder="Format XXS or XXN" class="input latitude #latitude">
    <br>
    <span class="label">Longitude:</span>
    <input type="text" placeholder="Format XXE or XXW" class="input longitude #longitude">
  </div>

  <div class="city-view #city-view">
    <span class="city-label">Choose your nearest major city</span>
    <div class="dropdown-btn #city-btn">
      <div class="#city">Select a City</div>
      <div class="dropdown-icon"></div>
    </div>
  </div>

  <div class="note">
    This location will allow the antenna to find
    the satellite(s) more quickly.
  </div>

  <div class="bottom-bar">
    <div class="prev-btn #prev-btn">Previous</div>
    <div class="next-btn #next-btn">Next</div>
  </div>
</div>


<div class="dropdown #city-dropdown-view">
  <div class="dropdown-guts #dropdown-content">
    <div class="view-head">
      <span class="#dropdown-title">Cities</span>
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




<div class="view backup-gps-source #backup-gps-source-view">
  <div class="view-head">Backup GPS Source</div>
  <div class="headline desktop">
    Choose the backup GPS source you would like
    to use for your location coordinates.
  </div>
  <div class="headline mobile">
    Choose the backup GPS source you would like
    to use for your location coordinates.
  </div>

  <div class="clear-table #table-view">
    <div class="table-row #table-row">
      <span class="table-col install-btn"></span><!--
    --><span class="table-col #value"></span>
    </div>
  </div>

  <div class="note">
    The system will use this backup GPS only if the antenna’s<br class="desktop">
    built-in GPS is unable to determine your location.
  </div>

  <div class="bottom-bar">
    <div class="prev-btn #prev-btn">Previous</div>
    <div class="next-btn #next-btn">Next</div>
  </div>
</div>




<div class="view heading-source #heading-source-view">
  <div class="view-head">Heading Source</div>

  <div class="headline">
    The system has detected the following NMEA heading sources.
    Please choose the one you would like to use.
    Sources are listed in the recommended order.
  </div>

  <div class="clear-table #table-view">
    <div class="table-row #table-row">
      <span class="table-col install-btn"></span><!--
    --><span class="table-col #value"></span>
    </div>
  </div>

  <div class="bottom-bar">
    <div class="prev-btn #prev-btn">Previous</div>
    <div class="next-btn #next-btn">Next</div>
  </div>
</div>