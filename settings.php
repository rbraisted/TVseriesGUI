<? include $_SERVER['DOCUMENT_ROOT'] . '/base.php'; ?>
<link type="text/css" rel="stylesheet" href="/css/settings.css">
<script type="text/javascript" src="/js/settings.js"></script>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div id="menu-view" class="view menu-view">
	<a id="general-settings-btn menu-btn" class="btn menu-btn">
		<img src="/images/img.gif">
		<label>General Settings</label>
	</a>
	<a id="network-settings-btn menu-btn" class="btn menu-btn">
		<img src="/images/img.gif">
		<label>Network Settings</label>
	</a>
	<a id="advanced-settings-btn menu-btn" class="btn menu-btn">
		<img src="/images/img.gif">
		<label>Advanced Settings</label>
	</a>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div id="general-settings-view" class="view main-view settings-view general-settings-view">
	<div class="copy view-content main-content">
		<a id="back-btn" class="btn back-btn">
			<img src="/images/img.gif">
			<label>General Settings</label>
		</a>
		<h1>General Settings</h1>
		<h2>Technician Mode</h2>
		<p>	Info about Technician Mode: Nulla feugiat vestibulum egestas.
			Integer porttitor est turpis, at convallis nisi tristique ac.
			Vestibulum ac est a quam pellentesque porta. Nunc id pulvinar
			metus. Etiam commodo faucibus augue, id placerat elit aliquet
			non. Sed ac diam enim. Phasellus vitae interdum magna.
		</p>
		<a id="technician-mode-btn" class="btn toggle-btn setting-toggle-btn">
			<div class="on">On</div>
			<div class="off">Off</div>
		</a>
		<h2>Demo Mode</h2>
		<p>	Turn on Demo mode to browse the capabilities of the app and 
			the TracVision system without making any actual changes.
		</p>
		<a id="demo-mode-btn" class="btn toggle-btn setting-toggle-btn">
			<div class="on">On</div>
			<div class="off">Off</div>
		</a>
	</div>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div id="advanced-settings-view" class="view main-view settings-view advanced-settings-view">
	<div class="view-content main-content">
		<a id="back-btn" class="btn back-btn">
			<img src="/images/img.gif">
			<label>Advanced Settings</label>
		</a>
		<h1>Advanced Settings</h1>
		<h2>Sleep Mode</h2>
		<p>	Sleep mode locks the antenna in place to conserve power whenever the 
			<span id="vessel-type-copy"></span> is stationary and holds its position for one minute. 
			Sleep mode is enabled by default.
		</p>
		<a id="sleep-mode-btn" class="btn toggle-btn setting-toggle-btn">
			<div class="on">On</div>
			<div class="off">Off</div>
		</a>
		<h2>Sidelobe Mode</h2>
		<p>	Side Lobe mode ensures the antenna is always tracking the main beam of 
			the satellite, and not on a weaker side lobe. For optimum performance, 
			keep Side Lobe mode enabled unless directed otherwise by KVH Technical 
			Support.
		</p>
		<a id="sidelobe-mode-btn" class="btn toggle-btn setting-toggle-btn">
			<div class="on">On</div>
			<div class="off">Off</div>
		</a>
	</div>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div id="network-settings-view" class="view main-view settings-view network-settings-view">
	<div class="view-content main-content">
		<a id="back-btn" class="btn back-btn">
			<img src="/images/img.gif">
			<label>Network Settings</label>
		</a>
		<div id="ethernet-settings-view">
			<h1>Ethernet Settings</h1>
			<div class="setting">
				<label class="setting-name">Mode</label><!--
			 --><span id="mode" class="setting-value"></span>
			</div>
			<div id="static-view">
				<div class="setting">
					<label class="setting-name">IP Address</label><!--
				 --><span id="ip" class="setting-value"></span>
				</div>
				<div class="setting">
					<label class="setting-name">Subnet</label><!--
				 --><span id="subnet" class="setting-value"></span>
				</div>
				<div class="setting">
					<label class="setting-name">Gateway</label><!--
				 --><span id="gateway" class="setting-value"></span>
				</div>
				<div class="setting">
					<label class="setting-name">Broadcast</label><!--
				 --><span id="broadcast" class="setting-value"></span>
				</div>
			</div>
			<a id="edit-btn" class="btn basic-btn setting-edit-btn">
				<label>Edit</label>
			</a>
		</div>
		<div id="wireless-settings-view">
			<h1>Wireless Settings</h1>
			<div class="setting">
				<label class="setting-name">Mode</label><!--
			 --><span id="mode" class="setting-value"></span>
			</div>
			<div id="adhoc-view">
				<div class="setting">
					<label class="setting-name">IP Address</label><!--
				 --><span id="ip" class="setting-value"></span>
				</div>
				<div class="setting">
					<label class="setting-name">Security</label><!--
				 --><span id="security" class="setting-value"></span>
				</div>
				<div id="password-view" class="setting">
					<label class="setting-name">Password</label><!--
				 --><span id="password" class="setting-value"></span>
				</div>
			</div>
			<div id="infrastructure-view">
				<div class="setting">
					<label class="setting-name">Network Mode</label><!--
				 --><span id="mode" class="setting-value"></span>
				</div>
				<div id="static-view">
					<div class="setting">
						<label class="setting-name">IP Address</label><!--
					 --><span id="ip" class="setting-value"></span>
					</div>
					<div class="setting">
						<label class="setting-name">Subnet</label><!--
					 --><span id="subnet" class="setting-value"></span>
					</div>
					<div class="setting">
						<label class="setting-name">Gateway</label><!--
					 --><span id="gateway" class="setting-value"></span>
					</div>
					<div class="setting">
						<label class="setting-name">Broadcast</label><!--
					 --><span id="broadcast" class="setting-value"></span>
					</div>
					<div class="setting">
						<label class="setting-name">SSID</label><!--
					 --><span id="ssid" class="setting-value"></span>
					</div>
					<div class="setting">
						<label class="setting-name">Security Mode</label><!--
					 --><span id="security" class="setting-value"></span>
					</div>
					<div id="security-view" class="setting">
						<label class="setting-name">Password</label><!--
					 --><span id="password" class="setting-value"></span>
					</div>
				</div>
				<div id="dynamic-view">
					<div class="setting">
						<label class="setting-name">IP Address</label><!--
					 --><span id="ip" class="setting-value"></span>
					</div>
					<div class="setting">
						<label class="setting-name">SSID</label><!--
					 --><span id="ssid" class="setting-value"></span>
					</div>
					<div class="setting">
						<label class="setting-name">Security Mode</label><!--
					 --><span id="security" class="setting-value"></span>
					</div>
					<div id="security-view" class="setting">
						<label class="setting-name">Password</label><!--
					 --><span id="password" class="setting-value"></span>
					</div>
				</div>
			</div>
			<a id="edit-btn" class="btn basic-btn setting-edit-btn">
				<label>Edit</label>
			</a>
		</div>
	</div>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div id="edit-ethernet-settings-view" class="view popup-view settings-view edit-settings-view edit-ethernet-settings-view">
	<div class="view-content popup-content">
		<a id="cancel-btn" class="btn back-btn">
			<img src="/images/img.gif">
			<label>Edit Ethernet Settings</label>
		</a>
		<h1>Edit Ethernet Settings</h1>
		<div class="setting">
			<label class="setting-name">Mode</label><!--
		 --><a id="mode-btn" class="btn dropdown-btn setting-dropdown-btn">
				<img src="/images/img.gif">
				<label id="mode"></label>
			</a>
		</div>
		<div id="static-view">
			<div class="setting">
				<label class="setting-name">IP Address</label><!--
			 --><input id="ip" type="text" class="setting-input"/>
			</div>
			<div class="setting">
				<label class="setting-name">Subnet</label><!--
			 --><input id="subnet" type="text" class="setting-input"/>
			</div>
			<div class="setting">
				<label class="setting-name">Gateway</label><!--
			 --><input id="gateway" type="text"  class="setting-input"/>
			</div>
			<div class="setting">
				<label class="setting-name">Broadcast</label><!--
			 --><input id="broadcast" type="text" class="setting-input"/>
			</div>
		</div>
		<div class="tool-bar">
			<a id="reset-btn" class="btn basic-btn reset-btn">
				<label>Factory Settings</label>
			</a>
			<a id="cancel-btn" class="btn basic-btn cancel-btn">
				<label>Cancel</label>
			</a>
			<a id="save-btn" class="btn basic-btn save-btn">
				<label>Save</label>
			</a>
		</div>
	</div>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div id="edit-wireless-settings-view" class="view popup-view settings-view edit-settings-view edit-wireless-settings-view">
	<div class="view-content popup-content">
		<a id="cancel-btn" class="btn back-btn">
			<img src="/images/img.gif">
			<label>Edit Wireless Settings</label>
		</a>
		<h1>Edit Wireless Settings</h1>
		<div class="setting">
			<label class="setting-name">Mode</label>
			<a id="mode-btn" class="btn dropdown-btn setting-dropdown-btn">
				<img src="/images/img.gif">
				<label id="mode"></label>
			</a>
		</div>

		<div id="adhoc-view">
			<div class="setting">
				<label class="setting-name">IP Address</label>
				<input id="ip" type="text" class="setting-input"/>
			</div>
			<div class="setting">
				<label class="setting-name">Security Mode</label>
				<a id="security-btn" class="btn dropdown-btn setting-dropdown-btn">
					<img src="/images/img.gif">
					<label id="security"></label>
				</a>
			</div>
			<div id="adhoc-security" class="setting">
				<label class="setting-name">Password</label>
				<input id="password" type="text" class="setting-input"/>
			</div>
		</div>

		<div id="infrastructure-view">
			<div class="setting">
				<label class="setting-name">Network Mode</label>
				<a id="mode-btn" class="btn dropdown-btn setting-dropdown-btn">
					<img src="/images/img.gif">
					<label id="mode"></label>
				</a>
			</div>
			<div id="static-view">
				<div class="setting">
					<label class="setting-name">IP Address</label>
					<input id="ip" type="text" class="setting-input"/>
				</div>
				<div class="setting">
					<label class="setting-name">Subnet</label>
					<input id="subnet" type="text" class="setting-input"/>
				</div>
				<div class="setting">
					<label class="setting-name">Gateway</label>
					<input id="gateway" type="text" class="setting-input"/>
				</div>
				<div class="setting">
					<label class="setting-name">Broadcast</label>
					<input id="broadcast" type="text" class="setting-input"/>
				</div>
				<div class="setting">
					<label class="setting-name">SSID</label>
					<input id="ssid" type="text" class="setting-input"/>
				</div>
				<div class="setting">
					<label class="setting-name">Security Mode</label>
					<a id="security-btn" class="btn dropdown-btn setting-dropdown-btn">
						<img src="/images/img.gif">
						<label id="security"></label>
					</a>
				</div>
				<div id="security-view" class="setting">
					<label class="setting-name">Password</label>
					<input id="password" type="text" class="setting-input"/>
				</div>
			</div>
			<div id="dynamic-view">
				<div class="setting">
					<label class="setting-name">SSID</label>
					<input id="ssid" type="text" class="setting-input"/>
				</div>
				<div class="setting">
					<label class="setting-name">Security Mode</label>
					<a id="security-btn" class="btn dropdown-btn setting-dropdown-btn">
						<img src="/images/img.gif">
						<label id="security"></label>
					</a>
				</div>
				<div id="security-view" class="setting">
					<label class="setting-name">Password</label>
					<input id="password" type="text" class="setting-input"/>
				</div>
			</div>
		</div>

		<div class="tool-bar">
			<a id="reset-btn" class="btn basic-btn reset-btn">
				<label>Factory Settings</label>
			</a>
			<a id="cancel-btn" class="btn basic-btn cancel-btn">
				<label>Cancel</label>
			</a>
			<a id="save-btn" class="btn basic-btn save-btn">
				<label>Save</label>
			</a>
		</div>
	</div>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div id="ethernet-mode-dropdown" class="view popup-view dropdown-view">
	<div id="dropdown-content" class="view-content popup-content dropdown-content">
		<a id="close-btn" class="btn back-btn">
			<img src="/images/img.gif">
			<label>Mode</label>
		</a>
		<h1>Mode</h1>
		<div id="dropdown-options">
			<a id="dropdown-option" value="OFF" class="btn dropdown-option">
				<img src="/images/img.gif">
				<label>DISABLED</label>
			</a>
			<a id="dropdown-option" value="STATIC" class="btn dropdown-option">
				<img src="/images/img.gif">
				<label>STATIC</label>
			</a>
			<a id="dropdown-option" value="DYNAMIC" class="btn dropdown-option">
				<img src="/images/img.gif">
				<label>DHCP</label>
			</a>
		</div>
	</div>
</div>

<div id="wireless-mode-dropdown" class="view popup-view dropdown-view">
	<div id="dropdown-content" class="view-content popup-content dropdown-content">
		<a id="close-btn" class="btn back-btn">
			<img src="/images/img.gif">
			<label>Mode</label>
		</a>
		<h1>Mode</h1>
		<div id="dropdown-options">
			<a id="dropdown-option" value="OFF" class="btn dropdown-option">
				<img src="/images/img.gif">
				<label>DISABLED</label>
			</a>
			<a id="dropdown-option" value="ADHOC" class="btn dropdown-option">
				<img src="/images/img.gif">
				<label>ADHOC</label>
			</a>
			<a id="dropdown-option" value="IF" class="btn dropdown-option">
				<img src="/images/img.gif">
				<label>INFRASTRUCTURE</label>
			</a>
		</div>
	</div>
</div>

<div id="infrastructure-mode-dropdown" class="view popup-view dropdown-view">
	<div id="dropdown-content" class="view-content popup-content dropdown-content">
		<a id="close-btn" class="btn back-btn">
			<img src="/images/img.gif">
			<label>Network Mode</label>
		</a>
		<h1>Network Mode</h1>
		<div id="dropdown-options">
			<a id="dropdown-option" value="OFF" class="btn dropdown-option">
				<img src="/images/img.gif">
				<label>DISABLED</label>
			</a>
			<a id="dropdown-option" value="STATIC" class="btn dropdown-option">
				<img src="/images/img.gif">
				<label>STATIC</label>
			</a>
			<a id="dropdown-option" value="DYNAMIC" class="btn dropdown-option">
				<img src="/images/img.gif">
				<label>DHCP</label>
			</a>
		</div>
	</div>
</div>

<div id="adhoc-security-dropdown" class="view popup-view dropdown-view">
	<div id="dropdown-content" class="view-content popup-content dropdown-content">
		<a id="close-btn" class="btn back-btn">
			<img src="/images/img.gif">
			<label>Security Mode</label>
		</a>
		<h1>Security Mode</h1>
		<div id="dropdown-options">
			<a id="dropdown-option" value="OFF" class="btn dropdown-option">
				<img src="/images/img.gif">
				<label>OFF</label>
			</a>
			<a id="dropdown-option" value="WEP" class="btn dropdown-option">
				<img src="/images/img.gif">
				<label>WEP</label>
			</a>
		</div>
	</div>
</div>

<div id="static-security-dropdown" class="view popup-view dropdown-view">
	<div id="dropdown-content" class="view-content popup-content dropdown-content">
		<a id="close-btn" class="btn back-btn">
			<img src="/images/img.gif">
			<label>Security Mode</label>
		</a>
		<h1>Security Mode</h1>
		<div id="dropdown-options">
			<a id="dropdown-option" value="OFF" class="btn dropdown-option">
				<img src="/images/img.gif">
				<label>OFF</label>
			</a>
			<a id="dropdown-option" value="WPA_PSK" class="btn dropdown-option">
				<img src="/images/img.gif">
				<label>WPA_PSK</label>
			</a>
		</div>
	</div>
</div>

<div id="dynamic-security-dropdown" class="view popup-view dropdown-view">
	<div id="dropdown-content" class="view-content popup-content dropdown-content">
		<a id="close-btn" class="btn back-btn">
			<img src="/images/img.gif">
			<label>Security Mode</label>
		</a>
		<h1>Security Mode</h1>
		<div id="dropdown-options">
			<a id="dropdown-option" value="OFF" class="btn dropdown-option">
				<img src="/images/img.gif">
				<label>OFF</label>
			</a>
			<a id="dropdown-option" value="WPA_PSK" class="btn dropdown-option">
				<img src="/images/img.gif">
				<label>WPA_PSK</label>
			</a>
		</div>
	</div>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->