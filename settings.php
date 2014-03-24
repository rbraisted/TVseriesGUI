<!DOCTYPE html>
<html>
	<head>
		<title>v 0.3</title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0" />

		<meta http-equiv="cache-control" content="max-age=0" />
		<meta http-equiv="cache-control" content="no-cache" />
		<meta http-equiv="expires" content="0" />
		<meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
		<meta http-equiv="pragma" content="no-cache" />

		<link type="text/css" rel="stylesheet" href="/css/settings.css">


		<script type="text/javascript" src="/js/jquery-1.10.2.min.js"></script>
		<script type="text/javascript" src="/js/base.js"></script>

		<script type="text/javascript" src="/js/lodash.min.js"></script>
		<script src="/js/promise-3.2.0.js"></script>

		<script type="text/javascript" src="/js/tvro.js"></script>
		<script type="text/javascript" src="/js/webservice.js"></script>
		<script type="text/javascript" src="/js/data.js"></script>
		<script type="text/javascript" src="/js/table.js"></script>
		<script type="text/javascript" src="/js/toggleBtn.js"></script>
		<script type="text/javascript" src="/js/dropdown.js"></script>

		<script type="text/javascript" src="/js/GeneralSettingsView.js"></script>
		<script type="text/javascript" src="/js/NetworkSettingsView.js"></script>
		<script type="text/javascript" src="/js/AdvancedSettingsView.js"></script>
    <script type="text/javascript" src="/js/EthernetSettingsView.js"></script>
    <script type="text/javascript" src="/js/WirelessSettingsView.js"></script>

		<script type="text/javascript" src="/js/settings.js"></script>

	</head>

	<body>

<!-- header/nav
- -- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="header #header">
	<div class="status-btn #status-btn">Status</div>
	<div class="nav-btn #nav-btn">Menu</div>
	<div class="tracvision-logo"></div>
</div>

<div class="nav #nav">
	<a href="/home.php" class="home-btn #home-btn">Home</a>
	<a href="/satellites.php" class="sat-btn #sat-btn">Satellites</a>
	<a href="/autoswitch.php" class="autoswitch-btn #autoswitch-btn">Autoswitch</a>
	<a href="/settings.php" class="settings-btn #settings-btn">Settings</a>
	<a href="/updates.php" class="updates-btn #updates-btn">Updates</a>
	<a href="/support.php" class="support-btn #support-btn">Support</a>
</div>

<!-- sidebar
- -- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="sidebar">
	<div class="menu-table #menu-table-view">
		<div class="table-row #table-row">
			<div class="table-col #menu-item"></div>
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
	<p>Info about Technician Mode: Nulla feugiat vestibulum egestas.
		Integer porttitor est turpis, at convallis nisi tristique ac.
		Vestibulum ac est a quam pellentesque porta. Nunc id pulvinar
		metus. Etiam commodo faucibus augue, id placerat elit aliquet
		non. Sed ac diam enim. Phasellus vitae interdum magna.
	</p>
	<div class="toggle-btn #tech-tog-btn">
		<div class="on">On</div>
		<div class="off">Off</div>
	</div>

	<div class="heading">Demo Mode</div>
	<p>Turn on Demo mode to browse the capabilities of the app and 
		the TracVision system without making any actual changes.
	</p>
	<div class="toggle-btn #demo-tog-btn">
		<div class="on">On</div>
		<div class="off">Off</div>
	</div>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="view advanced-settings #advanced-settings-view">
	<div class="view-head">
		Advanced Settings
		<div class="back-btn #back-btn"></div>
	</div>

	<div class="heading">Sleep Mode</div>
	<p>Sleep mode locks the antenna in place to conserve power whenever the 
		<span class="#vessel-type"></span>is stationary and holds its position
		for one minute. Sleep mode is enabled by default.
	</p>
	<div class="toggle-btn #sleep-tog-btn">
		<div class="on">On</div>
		<div class="off">Off</div>
	</div>

	<div class="heading">Sidelobe Mode</div>
	<p>Turn on Demo mode to browse the capabilities of the app and 
		the TracVision system without making any actual changes.
	</p>
	<div class="toggle-btn #sidelobe-tog-btn">
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
    <span class="label ip-label">IP Address</span><input class="input ip-input #eth-ip" />
    <span class="label subnet-label">Subnet</span><input class="input subnet-input #eth-netmask" />
    <span class="label gateway-label">Gateway</span><input class="input gateway-input #eth-gateway" />
    <span class="label broadcast-label">Broadcast</span><input class="input broadcast-input #eth-broadcast" />

    <div class="btn-tray">
      <div class="block-btn cancel-btn #back-btn">Cancel</div><!--
    --><div class="block-btn save-btn first #save-btn">Save</div><!--
    --><div class="block-btn reset-btn #reset-btn">Reset</div>
    </div>
  </div>
</div>

<div class="dropdown #eth-mode-dropdown">
  <div class="dropdown-guts #dropdown-content">
    <div class="view-head">
      <span class="#dropdown-title">Mode</span>
      <div class="back-btn #close-btn"></div>
    </div>
    <div class="table #dropdown-table-view">
      <div class="table-row #table-row">
        <span class="table-col dropdown-icon"></span><!--
      --><span class="table-col #dropdown-val"></span>
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
  --><span class="label ssid-label">SSID</span><input class="input ssid-input #wlan-essid" />
    <span class="label ip-label">IP Address</span><input class="input ip-input #wlan-ip" />
    <span class="label subnet-label">Subnet</span><input class="input subnet-input #wlan-netmask" />
    <span class="label gateway-label">Gateway</span><input class="input gateway-input #wlan-gateway" />
    <span class="label broadcast-label">Broadcast</span><input class="input broadcast-input #wlan-broadcast" />
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

<div class="dropdown #wlan-mode-dropdown">
  <div class="dropdown-guts #dropdown-content">
    <div class="view-head">
      <span class="#dropdown-title">Mode</span>
      <div class="back-btn #close-btn"></div>
    </div>
    <div class="table #dropdown-table-view">
      <div class="table-row #table-row">
        <span class="table-col dropdown-icon"></span><!--
      --><span class="table-col #dropdown-val"></span>
      </div>
    </div>
  </div>
</div>

<div class="dropdown #wlan-network-mode-dropdown">
  <div class="dropdown-guts #dropdown-content">
    <div class="view-head">
      <span class="#dropdown-title">Network Mode</span>
      <div class="back-btn #close-btn"></div>
    </div>
    <div class="table #dropdown-table-view">
      <div class="table-row #table-row">
        <span class="table-col dropdown-icon"></span><!--
      --><span class="table-col #dropdown-val"></span>
      </div>
    </div>
  </div>
</div>

<div class="dropdown #wlan-security-mode-dropdown">
  <div class="dropdown-guts #dropdown-content">
    <div class="view-head">
      <span class="#dropdown-title">Security Mode</span>
      <div class="back-btn #close-btn"></div>
    </div>
    <div class="table #dropdown-table-view">
      <div class="table-row #table-row">
        <span class="table-col dropdown-icon"></span><!--
      --><span class="table-col #dropdown-val"></span>
      </div>
    </div>
  </div>
</div>