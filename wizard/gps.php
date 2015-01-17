<?
$wiz = true;
include $_SERVER['DOCUMENT_ROOT'] . '/base.php';
?>

<script type="text/javascript" src="/js/wizard/gps.js"></script>

<div class="view spinner-view #spinner-view">
  <div class="view-head">Installing Satellites</div>
  <div class="headline">Please wait while your satellites are being installed...</div>
  <br>
  <p class="headline ant_status #ant_status"></p>
  <div class="spinner"></div>
  <div class="bottom-bar">
    <div class="exit-btn #exit-btn">Exit</div>
  </div>
</div>

<!-- Geolocation Spinner
- -- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->
<div class="view spinner-view #geo-spinner-view">
  <div class="headline">Getting location coordinates, please wait...</div>
  <br>
  <div class="spinner"></div>
</div>

<div class="view vessel-location #vessel-location-view">
  <div class="view-head #location-header"></div>

  <div class="nmea-view">
    <div class="headline">
      <div class="desktop #nmea-desktop-header"></div>
      <div class="mobile #nmea-mobile-header"></div>
    </div>

    <div class="clear-table #nmea-table-view">
      <div class="table-row #table-row">
        <span class="table-col install-btn"></span><!--
        --><span class="table-col #nmea-value"></span>
      </div>
    </div>
    
    <div class="block-btn #apply-nmea-btn">Save</div>

  </div>

  <div class="manual-view">
    <div class="headline">
      <div class="desktop #manual-desktop-header"> </div>
      <div class="mobile #manual-mobile-header"> </div>
    </div>

    <div class="clear-table #manual-table-view">
      <div class="table-row #table-row">
        <span class="table-col install-btn"></span><!--
        --><span class="table-col #man-coord-value"></span>
      </div>
    </div>

    <div class="coordinates-view #coordinates-view">
      <span class="coordinates-label label">Enter your coordinates</span>
      <span class="label">Latitude:</span>
      <input type="text" maxlength="7" class="gps-input latitude #latitude">
      <span>&deg;</span>
      <div class="hem-dropdown-btn #lat-hem-btn">
        <div class="#lat-hem"></div>
        <div class="dropdown-icon"></div>
      </div>
      <br>
      <span class="label">Longitude:</span>
      <input type="text" maxlength="8" class="gps-input longitude #longitude">
      <span>&deg;</span>
      <div class="hem-dropdown-btn #lon-hem-btn">
        <div class="#lon-hem"></div>
        <div class="dropdown-icon"></div>
      </div>
    </div>

    <div class="city-view #city-view">
      <span class="city-label label">Choose your nearest major city</span>
      <div class="dropdown-btn #city-btn">
        <div class="#city">Select a City</div>
        <div class="dropdown-icon"></div>
      </div>
    </div>

    <div class="geoloc-view #geoloc-view">
      <span class="geoloc-label label">
        Get your GPS(GNSS) location and time from your mobile device/computer.<p class="#geoloc_error"></p>
      </span>
      <span class="note">Note: GPS(GNSS) location is refreshed each time the Home page of this user interface is visited.</span>
    </div>
    
    <div class="block-btn #apply-manual-btn">Save</div>

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
    <div class="table #table-view" style="overflow-y:scroll;max-height:300px">
      <div class="table-row #table-row">
        <span class="table-col dropdown-icon"></span><!--
      --><span class="table-col #dropdown-value"></span>
      </div>
    </div>
  </div>
</div>

<div class="dropdown #lat-hem-dropdown-view">
  <div class="dropdown-guts #dropdown-content">
    <div class="view-head">
      <span class="#dropdown-title">Hemisphere</span>
      <div class="back-btn #close-btn"></div>
    </div>
    <div class="table #table-view" style="overflow-y:scroll;max-height:300px">
      <div class="table-row #table-row">
        <span class="table-col dropdown-icon"></span><!--
      --><span class="table-col #dropdown-value"></span>
      </div>
    </div>
  </div>
</div>

<div class="dropdown #lon-hem-dropdown-view">
  <div class="dropdown-guts #dropdown-content">
    <div class="view-head">
      <span class="#dropdown-title">Hemisphere</span>
      <div class="back-btn #close-btn"></div>
    </div>
    <div class="table #table-view" style="overflow-y:scroll;max-height:300px">
      <div class="table-row #table-row">
        <span class="table-col dropdown-icon"></span><!--
      --><span class="table-col #dropdown-value"></span>
      </div>
    </div>
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