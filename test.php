<!DOCTYPE html>
<html>
	<head>
		<title>KVH TVRO</title>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
		<meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0" />

		<meta http-equiv="cache-control" content="max-age=0" />
		<meta http-equiv="cache-control" content="no-cache" />
		<meta http-equiv="expires" content="0" />
		<meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
		<meta http-equiv="pragma" content="no-cache" />

		<link type="text/css" rel="stylesheet" href="/css/test.css">

		<script type="text/javascript" src="/js/jquery-1.10.2.min.js"></script>
		<script type="text/javascript" src="/js/base.js"></script>
		<script type="text/javascript" src="/js/settings.js"></script>
	</head>
	<body class="at-splash">

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

		<div id="header" class="view header-view">
			<a href="/" class="btn tracvision-logo">
				<img src="/images/img.gif">
			</a>
			<a id="status-btn" href="#" class="btn header-btn status-btn">
				<img src="/images/img.gif">
				<label>Status</label>
			</a>
			<a id="nav-btn" href="#" class="btn header-btn nav-btn">
				<img src="/images/img.gif">
				<label>Menu</label>
			</a>
		</div>

		<div id="status" class="view status-view"></div>

		<div id="nav" class="view nav-view">
			<a id="home-btn nav-btn" href="/home.php" class="btn nav-btn home-btn">
				<img src="/images/img.gif">
				<label>Home</label>
			</a>
			<a id="satellites-btn nav-btn" href="/satellites.php" class="btn nav-btn satellites-btn">
				<img src="/images/img.gif">
				<label>Satellites</label>
			</a>
			<a id="autoswitch-btn nav-btn" href="/autoswitch.php" class="btn nav-btn autoswitch-btn">
				<img src="/images/img.gif">
				<label>Autoswitch</label>
			</a>
			<a id="settings-btn nav-btn" href="/settings.php" class="btn nav-btn settings-btn">
				<img src="/images/img.gif">
				<label>Settings</label>
			</a>
			<a id="updates-btn nav-btn" href="/updates.php" class="btn nav-btn updates-btn">
				<img src="/images/img.gif">
				<label>Updates</label>
			</a>
			<a id="support-btn nav-btn" href="/support/" class="btn nav-btn support-btn">
				<img src="/images/img.gif">
				<label>Support</label>
			</a>
			<a id="sat-finder-btn nav-btn" href="tvro://sat-finder" class="btn nav-btn sat-finder-btn">
 				<img src="/images/img.gif">
 				<label>Sat Finder</label>
 			</a>
		</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

		<div id="menu" class="view menu-view">
			<a id="general-settings-btn menu-btn" href="#" class="btn menu-btn">
				<img src="/images/img.gif">
				<label>General Settings</label>
			</a>
			<a id="network-settings-btn menu-btn" href="#" class="btn menu-btn">
				<img src="/images/img.gif">
				<label>Network Settings</label>
			</a>
			<a id="advanced-settings-btn menu-btn" href="#" class="btn menu-btn">
				<img src="/images/img.gif">
				<label>Advanced Settings</label>
			</a>
		</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

		<div id="general-settings-view" class="view main-view general-settings-view">
			<div class="view-content main-content">
				<a id="back-btn" href="#" class="btn back-btn">
					<img src="/images/img.gif">
					<label>General Settings</label>
				</a>
				<h1>General Settings</h1>
				<div class="copy">
					<h2>Technician Mode</h2>
					<p>	Info about Technician Mode: Nulla feugiat vestibulum egestas.
						Integer porttitor est turpis, at convallis nisi tristique ac.
						Vestibulum ac est a quam pellentesque porta. Nunc id pulvinar
						metus. Etiam commodo faucibus augue, id placerat elit aliquet
						non. Sed ac diam enim. Phasellus vitae interdum magna.
					</p>
				</div>
				<a id="technician-mode-btn" href="#" class="btn on-off-btn">
					<div class="on">On</div>
					<div class="off">Off</div>
				</a>
				<div class="copy">
					<h2>Demo Mode</h2>
					<p>	Info about Demo Mode: In blandit nec libero ut lobortis. Aliquam
						et eros eleifend urna mollis convallis. Duis orci nisl, gravida
						at lacus vitae, vehicula laoreet leo. Proin nec sagittis urna.
					</p>
				</div>
				<a id="demo-mode-btn" href="#" class="btn on-off-btn">
					<div class="on">On</div>
					<div class="off">Off</div>
				</a>
			</div>
		</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

		<div id="advanced-settings-view" class="view main-view advanced-settings-view">
			<div class="view-content">
				<a id="back-btn" href="#" class="btn back-btn">
					<img src="/images/img.gif">
					<label>Advanced Settings</label>
				</a>
				<h1>Advanced Settings</h1>
				<div class="copy">
					<h2>Sleep Mode</h2>
					<p>	Info about Sleep Mode: In blandit nec libero ut lobortis.
						Aliquam et eros eleifend urna mollis convallis. Duis orci nisl,
						gravida at lacus vitae, vehicula laoreet leo. Proin nec sagittis
						urna.
					</p>
				</div>
				<a id="sleep-mode-btn" href="#" class="btn on-off-btn">
					<div class="on">On</div>
					<div class="off">Off</div>
				</a>
				<div class="copy">
					<h2>Sidelobe Mode</h2>
					<p>	Info about Sidelobe Mode: Nulla feugiat vestibulum egestas. Integer
						porttitor est turpis, at convallis nisi tristique ac. Vestibulum ac
						est a quam pellentesque porta. Nunc id pulvinar metus. Etiam commodo
						faucibus augue, id placerat elit aliquet non. Sed ac diam enim.
						Phasellus vitae interdum magna.
					</p>
				</div>
				<a id="sidelobe-mode-btn" href="#" class="btn on-off-btn">
					<div class="on">On</div>
					<div class="off">Off</div>
				</a>
			</div>
		</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

		<div id="network-settings-view" class="view main-view network-settings-view">
			<div class="view-content main-content">
				<a id="back-btn" href="#" class="btn back-btn">
					<img src="/images/img.gif">
					<label>Network Settings</label>
				</a>

				<div id="ethernet-settings" class="settings">
					<h1>Ethernet Settings</h1>
					<div class="copy">
						<div class="setting">
							<div class="setting-name">Mode:</div>
							<span class="setting-value" id="mode"></span>
						</div>
						<div class="setting">
							<div class="setting-name">IP Address:</div>
							<span class="setting-value" id="ip"></span>
						</div>
						<div class="setting">
							<div class="setting-name">Subnet:</div>
							<span class="setting-value" id="subnet"></span>
						</div>
						<div class="setting">
							<div class="setting-name">Gateway:</div>
							<span class="setting-value" id="gateway"></span>
						</div>
						<div class="setting">
							<div class="setting-name">Broadcast:</div>
							<span class="setting-value" id="broadcast"></span>
						</div>
						<a id="edit-btn" href="#" class="btn">
							<label>Edit</label>
						</a>
					</div>
				</div>

				<div id="wireless-settings" class="settings">
					<h1>Wireless Settings</h1>
					<div class="copy">
						<div class="setting">
							<div class="setting-name">Mode:</div>
							<span class="setting-value" id="mode"></span>
						</div>
						<div id="infrastructure-view">
							<div class="setting">
								<div class="setting-name">IP Address:</div>
								<span class="setting-value" id="ip"></span>
							</div>
							<div class="setting">
								<div class="setting-name">Subnet:</div>
								<span class="setting-value" id="subnet"></span>
							</div>
							<div class="setting">
								<div class="setting-name">Gateway:</div>
								<span class="setting-value" id="gateway"></span>
							</div>
							<div class="setting">
								<div class="setting-name">Broadcast:</div>
								<span class="setting-value" id="broadcast"></span>
							</div>
							<div class="setting">
								<div class="setting-name">SSID:</div>
								<span class="setting-value" id="ssid"></span>
							</div>
						</div>
						<div id="adhoc-view">
							<div class="setting">
								<div class="setting-name">IP Address:</div>
								<span id="ip"></span>
							</div>
							<div class="setting">
								<div class="setting-name">Security:</div>
								<span id="security"></span>
							</div>
							<div class="setting">
								<div class="setting-name">Password:</div>
								<span id="password"></span>
							</div>
						</div>
						<a id="edit-btn" href="#" class="btn">
							<label>Edit</label>
						</a>
					</div>
				</div>
			</div>
		</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

		<div id="edit-ethernet-settings-view" class="view popup-view edit-ethernet-settings-view">
			<div class="view-content popup-content">
				<a id="cancel-btn" href="#" class="btn back-btn">
					<img src="/images/img.gif">
					<label>Edit Ethernet Settings</label>
				</a>
				<h1>Edit Ethernet Settings</h1>
				<div class="settings edit-settings">
					<div class="setting">
						<div class="setting-name">Mode:</div>
						<a id="mode-btn" href="#" class="btn dropdown-btn">
							<label id="mode">HI</label>
						</a>
					</div>

					<div id="static-view">
						<div class="setting">
							<div class="setting-name">IP Address:</div>
							<input id="ip" type="text" />
						</div>
						<div class="setting">
							<div class="setting-name">Subnet:</div>
							<input id="subnet" type="text" class="setting-value"/>
						</div>
						<div class="setting">
							<div class="setting-name">Gateway:</div>
							<input id="gateway" type="text"  class="setting-value"/>
						</div>
						<div class="setting">
							<div class="setting-name">Broadcast:</div>
							<input id="broadcast" type="text" class="setting-value"/>
						</div>
					</div>
				</div>

				<div class="btns">
					<a id="save-btn" href="#" class="btn">
						<img src="/images/img.gif">
						<label>Save</label>
					</a>
					<a id="cancel-btn" href="#" class="btn">
						<img src="/images/img.gif">
						<label>Cancel</label>
					</a>
					<a id="reset-btn" href="#" class="btn">
						<img src="/images/img.gif">
						<label>Factory Settings</label>
					</a>
				</div>
			</div>
		</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

		<div id="ethernet-mode-dropdown" class="view popup-view dropdown-view">
			<div id="dropdown-content" class="view-content popup-content dropdown-content">
				<a id="cancel-btn" href="#" class="btn back-btn">
					<img src="/images/img.gif">
					<label>Ethernet Mode</label>
				</a>
				<h1>Ethernet Mode</h1>
				<div id="dropdown-options">
					<a id="dropdown-option" href="#" value="OFF" class="btn dropdown-option">
						<img src="/images/img.gif">
						<label>DISABLED</label>
					</a>
					<a id="dropdown-option" href="#" value="STATIC" class="btn dropdown-option">
						<img src="/images/img.gif">
						<label>STATIC</label>
					</a>
					<a id="dropdown-option" href="#" value="DYNAMIC" class="btn dropdown-option">
						<img src="/images/img.gif">
						<label>DHCP</label>
					</a>
				</div>
			</div>
		</div>


<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

 	</body>
</html>
