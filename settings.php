<? include $_SERVER['DOCUMENT_ROOT'] . '/base_.php'; ?>

<script type="text/javascript" src="/js/GeneralSettingsView.js"></script>
<script type="text/javascript" src="/js/NetworkSettingsView.js"></script>
<script type="text/javascript" src="/js/AdvancedSettingsView.js"></script>
<script type="text/javascript" src="/js/EthernetSettingsView.js"></script>
<script type="text/javascript" src="/js/WirelessSettingsView.js"></script>

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

<div class="view general-settings #general-settings-view">
  <div class="view-head">
    General Settings
    <div class="back-btn #back-btn"></div>
  </div>

  <div class="heading">Technician Mode</div>
  <p>
    Turn on Technician mode to view software updates for all TracVision
    system models.
  </p>
  <div class="toggle-btn #tech-mode-btn">
    <div class="on">On</div>
    <div class="off">Off</div>
  </div>

  <div class="heading">Demo Mode</div>
  <p>
    Turn on Demo mode to browse the capabilities of the app and the TracVision
    system without making any actual changes. Not all functionality is
    available in demo mode.
  </p>
  <div class="toggle-btn #demo-mode-btn">
    <div class="on">On</div>
    <div class="off">Off</div>
  </div>

  <div class="heading">Setup Wizard</div>
  <p>
    Placeholder text placeholder text placeholder text placeholder text
  </p>
  <div class="block-btn #wizard-btn">Setup Wizard</div>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="view advanced-settings #advanced-settings-view">
  <div class="view-head">
    Advanced Settings
    <div class="back-btn #back-btn"></div>
  </div>

  <div class="heading">Sleep Mode</div>
  <p>
    Sleep mode locks the antenna in place to conserve power whenever the 
    <span class="#vessel-type"></span> is stationary and holds its position for
    one minute. Sleep mode is enabled by default.
  </p>
  <div class="toggle-btn #sleep-mode-btn">
    <div class="on">On</div>
    <div class="off">Off</div>
  </div>

  <div class="heading">Sidelobe Mode</div>
  <p>
    Side Lobe mode ensures the antenna is always tracking the main beam of the
    satellite, and not on a weaker side lobe. For optimum performance, keep Side
    Lobe mode enabled unless directed otherwise by KVH Technical Support.
  </p>
  <div class="toggle-btn #sidelobe-mode-btn">
    <div class="on">On</div>
    <div class="off">Off</div>
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
    <span class="label mode-label">Mode</span><span class="value #wlan-mode"></span>
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

    <span class="label mode-label">Mode</span><!--
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