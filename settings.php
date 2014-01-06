<? include $_SERVER['DOCUMENT_ROOT'] . '/base.php'; ?>
<link type="text/css" rel="stylesheet" href="/css/settings.css">
<script type="text/javascript" src="/js/settings.js"></script>



<div id="menu" class="view menu is-active">
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



<div id="general-settings-view" class="view">
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



<div id="advanced-settings-view" class="view">
	<a id="back-btn" href="#" class="btn back-btn">
		<img src="/images/img.gif">
		<label>Advanced Settings</label>
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



<div id="network-settings-view" class="view">
	<a id="back-btn" href="#" class="btn back-btn">
		<img src="/images/img.gif">
		<label>Network Settings</label>
	</a>

	<div id="ethernet-settings-view" class="settings-view">
		<h1>Ethernet Settings</h1>
		<div class="text-wall">
			<div class="setting">
				<label>Mode:</label>
				<span id="mode"></span>
			</div>
			<div class="setting">
				<label>IP Address:</label>
				<span id="ip"></span>
			</div>
			<div class="setting">
				<label>Subnet:</label>
				<span id="subnet"></span>
			</div>
			<div class="setting">
				<label>Gateway:</label>
				<span id="gateway"></span>
			</div>
			<div class="setting">
				<label>Broadcast:</label>
				<span id="broadcast"></span>
			</div>
			<a id="edit-btn" href="#" class="btn">
				<label>Edit</label>
			</a>
		</div>

		<div id="edit-ethernet-settings-view" class="edit-settings-view popup">
			<div class="popup-header">
				<label>Edit Ethernet Settings</label>
				<a id="cancel-btn" href="#" class="btn close-btn">
					<img src="/images/img.gif">
				</a>
			</div>
			<div class="popup-content">
			</div>
		</div>
	</div>

	<div id="wireless-settings-view" class="settings-view">
		<h1>Wireless Settings</h1>
		<div class="text-wall">
			<div class="setting">
				<label>Mode:</label>
				<span id="mode"></span>
			</div>
			<div id="infrastructure-view">
				<div class="setting">
					<label>IP Address:</label>
					<span id="ip"></span>
				</div>
				<div class="setting">
					<label>Subnet:</label>
					<span id="subnet"></span>
				</div>
				<div class="setting">
					<label>Gateway:</label>
					<span id="gateway"></span>
				</div>
				<div class="setting">
					<label>Broadcast:</label>
					<span id="broadcast"></span>
				</div>
				<div class="setting">
					<label>SSID:</label>
					<span id="ssid"></span>
				</div>
			</div>
			<div id="adhoc-view">
				<div class="setting">
					<label>IP Address:</label>
					<span id="ip"></span>
				</div>
				<div class="setting">
					<label>Security:</label>
					<span id="security"></span>
				</div>
				<div class="setting">
					<label>Password:</label>
					<span id="password"></span>
				</div>
			</div>
			<a id="edit-btn" href="#" class="btn">
				<label>Edit</label>
			</a>
		</div>
	</div>
</div>