<? include $_SERVER['DOCUMENT_ROOT'] . '/base.php'; ?>

<script type="text/javascript" src="/js/GeneralSettingsView.js"></script>
<script type="text/javascript" src="/js/NetworkSettingsView.js"></script>
<script type="text/javascript" src="/js/AdvancedSettingsView.js"></script>
<script type="text/javascript" src="/js/EthernetSettingsView.js"></script>
<script type="text/javascript" src="/js/WirelessSettingsView.js"></script>
<script type="text/javascript" src="/js/SetLocationView.js"></script>

<script type="text/javascript" src="/js/SettingsPage.js"></script>


<!-- sidebar
- -- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="sidebar">
  <div class="menu-table #menu-table-view">
    <div class="table-row #table-row">
      <div class="table-col">
        <span class="#menu-item"></span>
        Settings
      </div>
    </div>
  </div>
</div>


<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<!-- Spinner
- -- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->
<div class="spin-view spinner-view #spinner-view">
  <div class="headline">Getting location coordinates, please wait...</div>
  </br>
  <div class="spinner"></div>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="view general-settings #general-settings-view">
  <div class="view-head">
    General Settings
    <div class="back-btn #back-btn"></div>
  </div>

  <div class="heading">Setup Wizard</div>
  <p>
    The Setup Wizard guides you through setting up the system, step by step.
    The Setup Wizard should be run after initial installation and repeated
    whenever you make a change to your system's configuration, such as adding
    or removing devices.
  </p>
  <!--<div class="block-btn #wizard-btn">Setup Wizard</div>-->
	<a class="block-btn #wizard-btn">Setup Wizard</a>

  <div class="heading">Location Coordinates</div>
  <p>
  Choose a source and/or backup source(s) for your location coordinates. The
  antenna will use this position data to expedite satellite acquisition. In
  addition, if the antenna has a linear LNB with manual skew, the Setup Wizard will calculate the correct skew
  angle for your location.
  </p>
  <!--<div class="block-btn #gps-location-btn">Set Location</div>-->
	<a class="block-btn #gps-location-btn">Set Location</a>
  <div class="checkswitch-mode">
    <div class="heading">Check Switch Mode</div>
    <p>
      Turn on Check Switch mode only when you need to run a Check Switch test
      to configure a receiver. The Setup Wizard automatically turns on this
      mode when it prompts you to run a Check Switch test then turns it off
      when you proceed to the next step. If you close your browser window
      instead of proceeding to the next step, be sure to turn off Check Switch
      mode when you are done configuring your receiver(s). Keep Check Switch
      mode set to off for normal operation.
    </p>
    <div class="toggle-btn #checkswitch-mode-btn">
      <div class="on">On</div>
      <div class="off">Off</div>
    </div>
  </div>

  <div class="heading">Demo Mode</div>
  <p>
    Turn on Demo mode to browse the capabilities of the web interface and the
    TracVision system without making any actual changes. Not all functionality
    is available in Demo mode. Keep Demo mode set to off for normal operation.
  </p>
  <div class="toggle-btn #demo-mode-btn">
    <div class="on">On</div>
    <div class="off">Off</div>
  </div>
</div>

<!-- GPS Location -->
<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="view vessel-location #vessel-location-view">
  <div class="view-head">
    <span class="back-btn #back-btn"></span><!--
    --><span class="#location-header"</span>
  </div>

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
      </br>
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
        Get your GPS(GNSS) location and time from your mobile device/computer.<p class="blink_me #geoloc_error"></p>
      </span>
      <span class="note">Note: GPS(GNSS) location is refreshed each time the Home page of this user interface is visited.</span>
    </div>

    <!--<div class="block-btn #apply-manual-btn spaceBot">Save</div>-->

	<a class="block-btn spaceBot #apply-manual-btn">Save</a>

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

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="view advanced-settings #advanced-settings-view">
  <div class="view-head">
    Advanced Settings
    <div class="back-btn #back-btn"></div>
  </div>

  <div class="heading">Technician Mode</div>
  <p>
    Turn on Technician mode to view the software updates for all TracVision
    system models. Keep Technician mode set to off for normal operation.
  </p>
  <div class="toggle-btn #tech-mode-btn">
    <div class="on">On</div>
    <div class="off">Off</div>
  </div>

  <div class="#tech-mode">
    <p>
      Technicians can enter a URL in this field to get software updates from a
      custom URL. This URL becomes the source of all the software update
      information, i.e. the location of the latest unreleased update file to
      download, until the browser window is closed.
    </p>
    <input placeholder="http://www.kvhupdate.com/TVRO/" class="input update-url #update-url" />
    <div class="block-btn save-btn #save-btn">Save</div>
  </div>

  <div class="heading">Sleep Mode</div>
  <p>
    Sleep mode locks the antenna in place to conserve power whenever you are
    stationary and the antenna is pointing in the same direction for one minute.
    Sleep mode is enabled by default.
  </p>
  <div class="toggle-btn #sleep-mode-btn">
    <div class="on">On</div>
    <div class="off">Off</div>
  </div>

  <div class="sidelobe-mode">
    <div class="heading">Sidelobe Mode (TV6 only)</div>
    <p>
      Sidelobe Mode ensures the antenna is tracking the main beam of the satellite,
      and not a weaker sidelobe. Since sidelobes are not strong enough to become a
      problem in most regions, keep Sidelobe Mode set to off unless directed
      otherwise by KVH Technical Support.
    </p>
    <div class="toggle-btn #sidelobe-mode-btn">
      <div class="on">On</div>
      <div class="off">Off</div>
    </div>
  </div>

  <div class="multiswitch-mode">
    <div class="heading">Band/Polarization Control</div>
    <p>
      With the master receiver in control (default setting), the
      TV-Hub's Receiver port outputs whichever band/polarization is currently
      selected by the master receiver. With the TV-Hub in control, the
      satellite signal output from the TV-Hub's Receiver port is always the
      band and polarization corresponding to the voltage and tone detected on
      the cable connected directly to it, regardless of the band/polarization
      selected by any IP AutoSwitch-equipped master receiver. Always select
      "TV-Hub" for a linear system equipped with a multiswitch and an IP
      AutoSwitch.
    </p>
    <div class="toggle-btn #multiswitch-mode-btn">
      <div class="on">TV-Hub<br>&nbsp;</div>
      <div class="off">Master<br>Receiver</div>
    </div>
  </div>

</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="view network-settings #network-settings-view">
  <div class="view-head">
    Network Settings
    <div class="back-btn #back-btn"></div>
  </div>

  <div class="ethernet-settings">
    <div class="view-head">Ethernet Settings</div>
    <span class="label mode-label">Mode</span><span class="value #eth-mode"></span>
    <span class="label ip-label">IP Address</span><span class="value ip-value #eth-ip"></span>
    <span class="label subnet-label">Subnet</span><span class="value subnet-value #eth-netmask"></span>
    <span class="label gateway-label">Gateway</span><span class="value gateway-value #eth-gateway"></span>
    <span class="label broadcast-label">Broadcast</span><span class="value broadcast-value #eth-broadcast"></span>
    <div class="block-btn edit-btn #ethernet-btn">Edit</div>
  </div>

  <div class="wireless-settings">
    <div class="view-head">Wireless Settings</div>
    <span class="label mode-label">Wireless Mode</span><span class="value #wlan-mode"></span>
    <span class="label network-label">Network Mode</span><span class="value network-value #wlan-network-mode"></span>
    <span class="label ssid-label">SSID</span><span class="value ssid-value #wlan-essid"></span>
    <span class="label ip-label">IP Address</span><span class="value ip-value #wlan-ip"></span>
    <span class="label subnet-label">Subnet</span><span class="value subnet-value #wlan-netmask"></span>
    <span class="label gateway-label">Gateway</span><span class="value gateway-value #wlan-gateway"></span>
    <span class="label broadcast-label">Broadcast</span><span class="value broadcast-value #wlan-broadcast"></span>
    <span class="label security-label">Security Mode</span><span class="value security-value #wlan-security-mode"></span>
    <span class="label password-label">Password</span><span class="value password-value #wlan-security-key"></span>
    <div class="block-btn edit-btn #wireless-btn">Edit</div>
  </div>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="popup #ethernet-settings-view">
  <div class="popup-guts ethernet-settings">
    <div class="view-head">
      Ethernet Settings
      <div class="back-btn #back-btn"></div>
    </div>

    <span class="label mode-label">Mode</span><!--
 --><div class="dropdown-btn mode-dropdown-btn #eth-mode-btn">
        <div class="#eth-mode"></div>
        <div class="dropdown-icon"></div>
    </div>

    <span class="label ip-label">IP Address</span><!--
 --><input class="input ip-input #eth-ip" /><!--
 --><span class="value ip-value #eth-ip"></span>

    <span class="label subnet-label">Subnet</span><!--
 --><input class="input subnet-input #eth-netmask" /><!--
 --><span class="value subnet-value #eth-netmask"></span>

    <span class="label gateway-label">Gateway</span><!--
 --><input class="input gateway-input #eth-gateway" /><!--
 --><span class="value gateway-value #eth-gateway"></span>

    <span class="label broadcast-label">Broadcast</span><!--
 --><input class="input broadcast-input #eth-broadcast" /><!--
 --><span class="value broadcast-value #eth-broadcast"></span>

    <a href="javascript:TVRO.showHelp(903);" class="link">
      Learn more about these Ethernet settings.
    </a>

    <div class="btn-tray">
      <div class="block-btn cancel-btn #back-btn">Cancel</div><!--
    --><div class="block-btn save-btn first #save-btn">Save</div><!--
    --><div class="block-btn reset-btn #reset-btn">Reset</div>
    </div>
  </div>
</div>

<div class="dropdown #eth-mode-dropdown-view">
  <div class="dropdown-guts #dropdown-content">
    <div class="view-head">
      <span class="#dropdown-title">Mode</span>
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

<div class="popup #wireless-settings-view">
  <div class="popup-guts wireless-settings">
    <div class="view-head">
      Wireless Settings
      <div class="back-btn #back-btn"></div>
    </div>

    <span class="label mode-label">Wireless Mode</span><!--
 --><div class="dropdown-btn mode-dropdown-btn #wlan-mode-btn">
      <div class="#wlan-mode"></div>
      <div class="dropdown-icon"></div>
    </div>

    <span class="label network-label">Network Mode</span><!--
 --><div class="dropdown-btn network-dropdown-btn #wlan-network-mode-btn">
      <div class="#wlan-network-mode"></div>
      <div class="dropdown-icon"></div>
    </div><!--

 --><span class="label ssid-label">SSID</span><!--
 --><input class="input ssid-input #wlan-essid" />

    <span class="label ip-label">IP Address</span><!--
 --><input class="input ip-input #wlan-ip" /><!--
 --><span class="value ip-value #wlan-ip"></span>

    <span class="label subnet-label">Subnet</span><!--
 --><input class="input subnet-input #wlan-netmask" /><!--
 --><span class="value subnet-value #wlan-netmask"></span>

    <span class="label gateway-label">Gateway</span><!--
 --><input class="input gateway-input #wlan-gateway" /><!--
 --><span class="value gateway-value #wlan-gateway"></span>

    <span class="label broadcast-label">Broadcast</span><!--
 --><input class="input broadcast-input #wlan-broadcast" /><!--
 --><span class="value broadcast-value #wlan-broadcast"></span>

    <span class="label security-label">Security Mode</span><!--
 --><div class="dropdown-btn security-dropdown-btn #wlan-security-mode-btn">
      <div class="#wlan-security-mode"></div>
      <div class="dropdown-icon"></div>
    </div>

    <span class="label password-label">Password</span><input class="input password-input #wlan-security-key" />
    <span class="password-info-label">Must contain 8 or more characters<br>Case sensitive</span>

    <a href="javascript:TVRO.showHelp(904);" class="link">
      Learn more about these wireless settings.
    </a>

    <div class="btn-tray">
      <div class="block-btn cancel-btn #back-btn">Cancel</div><!--
   --><div class="block-btn save-btn first #save-btn">Save</div><!--
   --><div class="block-btn reset-btn #reset-btn">Reset</div>
    </div>
  </div>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="dropdown #wlan-mode-dropdown-view">
  <div class="dropdown-guts #dropdown-content">
    <div class="view-head">
      <span class="#dropdown-title">Wireless Mode</span>
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

<div class="dropdown #wlan-network-mode-dropdown-view">
  <div class="dropdown-guts #dropdown-content">
    <div class="view-head">
      <span class="#dropdown-title">Network Mode</span>
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

<div class="dropdown #wlan-security-mode-dropdown-view">
  <div class="dropdown-guts #dropdown-content">
    <div class="view-head">
      <span class="#dropdown-title">Security Mode</span>
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
