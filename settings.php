<? include $_SERVER['DOCUMENT_ROOT'] . '/base.php'; ?>
<link type="text/css" rel="stylesheet" href="/css/settings.css">
<script type="text/javascript" src="/js/settings.js"></script>



<div id="menu view" class="view menu is-active">
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



<div id="general-settings-view view" class="view view view">
	<a id="back-btn" href="#" class="btn back-btn">
		<img src="/images/img.gif" />
		<label>General Settings</label>
	</a>

	<h1>General Settings</h1>
	<div class="text-wall">
		<h2>Technician Mode</h2>
		<p>
			Info about Technician Mode: Nulla feugiat vestibulum egestas.
			Integer porttitor est turpis, at convallis nisi tristique ac.
			Vestibulum ac est a quam pellentesque porta. Nunc id pulvinar
			metus. Etiam commodo faucibus augue, id placerat elit aliquet
			non. Sed ac diam enim. Phasellus vitae interdum magna.
		</p>
		<a id="technician-mode-btn" href="#" class="on-off-btn">
			<div class="on">On</div>
			<div class="off">Off</div>
		</a>

		<h2>Demo Mode</h2>
		<p>
			Info about Demo Mode: In blandit nec libero ut lobortis. Aliquam
			et eros eleifend urna mollis convallis. Duis orci nisl, gravida
			at lacus vitae, vehicula laoreet leo. Proin nec sagittis urna.
		</p>
		<a id="demo-mode-btn" href="#" class="on-off-btn">
			<div class="on">On</div>
			<div class="off">Off</div>
		</a>
	</div>
</div>



<div id="network-settings-view view" class="view">
	<a id="back-btn" href="#" class="btn back-btn">
		<img src="/images/img.gif" />
		<label>Settings</label>
	</a>

	<div id="wireless-settings" class="settings">
		<div class="headline">Wireless Settings</div>
		<div class="setting"><span class="label">Mode:</span><span id="wireless-mode"></span></div>
		<div id="if-mode">
			<div class="setting"><span class="label">IP Address:</span><span id="if-ip"></span></div>
			<div class="setting"><span class="label">Subnet:</span><span id="if-subnet"></span></div>
			<div class="setting"><span class="label">Gateway:</span><span id="if-gateway"></span></div>
			<div class="setting"><span class="label">Broadcast:</span><span id="if-broadcast"></span></div>
			<div class="setting"><span class="label">SSID:</span><span id="if-ssid"></span></div>
		</div>
		<div id="adhoc-mode">
			<div class="setting"><span class="label">IP Address:</span><span id="adhoc-ip"></span></div>
			<div class="setting"><span class="label">Security:</span><span id="adhoc-security"></span></div>
			<div class="setting"><span class="label">Password:</span><span id="adhoc-password"></span></div>
		</div>
		<a href="/settings/wireless-settings.php" class="border-btn">Edit</a>
	</div>

	<div id="ethernet-settings" class="settings">
		<div class="headline">Ethernet Settings</div>
		<div class="setting"><span class="label">Mode:</span><span id="ethernet-mode"></span></div>
		<div class="setting"><span class="label">IP Address:</span><span id="ethernet-ip"></span></div>
		<div class="setting"><span class="label">Subnet:</span><span id="ethernet-subnet"></span></div>
		<div class="setting"><span class="label">Gateway:</span><span id="ethernet-gateway"></span></div>
		<div class="setting"><span class="label">Broadcast:</span><span id="ethernet-broadcast"></span></div>
		<a href="/settings/ethernet-settings.php" class="border-btn">Edit</a>
	</div>
</div>



<div id="advanced-settings-view view" class="view">
	<a id="back-btn" href="#" class="btn back-btn">
		<img src="/images/img.gif" />
		<label>Settings</label>
	</a>

	<h1>Advanced Settings</h1>
	<div class="text-wall">
		<h2>Sleep Mode</h2>
		<p>
			Info about Sleep Mode: In blandit nec libero ut lobortis.
			Aliquam et eros eleifend urna mollis convallis. Duis orci nisl,
			gravida at lacus vitae, vehicula laoreet leo. Proin nec sagittis
			urna.
		</p>
		<a id="sleep-mode-btn" href="#" class="on-off-btn">
			<div class="on">On</div>
			<div class="off">Off</div>
		</a>

		<h2>Sidelobe Mode</h2>
		<p>
			Info about Sidelobe Mode: Nulla feugiat vestibulum egestas. Integer
			porttitor est turpis, at convallis nisi tristique ac. Vestibulum ac
			est a quam pellentesque porta. Nunc id pulvinar metus. Etiam commodo
			faucibus augue, id placerat elit aliquet non. Sed ac diam enim.
			Phasellus vitae interdum magna.
		</p>
		<a id="sidelobe-mode-btn" href="#" class="on-off-btn">
			<div class="on">On</div>
			<div class="off">Off</div>
		</a>
	</div>
</div>