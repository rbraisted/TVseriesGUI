<? include $_SERVER['DOCUMENT_ROOT'] . '/base.php'; ?>
<link type="text/css" rel="stylesheet" href="/css/autoswitch.css">
<script type="text/javascript" src="/js/autoswitch.js"></script>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div id="menu-view" class="view menu-view">
	<div id="satellite-view" class="menu-sub-view satellite-view">
		<div id="mode-view" class="satellite-sub-view">
			<h3>Satellite Switching</h3>
			<a id="mode-btn" class="btn toggle-btn satellite-mode-btn">
				<div class="on">Manual</div>
				<div class="off">Automatic</div>
			</a>
		</div>

		<div id="details-view" class="satellite-sub-view">
			<h3>
				<span id="name">Wheatly 1</span>
				<span id="region">Middle East</span>
			</h3>
			<img id="signal" src="/images/img.gif" class="satellite-signal is-0">
			<span id="status" class="satellite-status-label">Tracking...</span>
		</div>

		<div id="satellite-dropdown" class="satellite-sub-view satellite-dropdown-view">
			<a id="radio-option slot-a-btn" value="" class="btn dropdown-option satellite-dropdown-option">
				<img src="/images/img.gif">
				<label>
					<span id="name">Rosalind 1</span>
					<span id="region">Europe</span>
				</label>
			</a>
			<a id="radio-option slot-b-btn" value="" class="btn dropdown-option satellite-dropdown-option">
				<img src="/images/img.gif">
				<label>
					<span id="name">Elena 22</span>
					<span id="region">Europe</span>
				</label>
			</a>
			<a id="radio-option slot-c-btn" value="" class="btn dropdown-option satellite-dropdown-option">
				<img src="/images/img.gif">
				<label>
					<span id="name">Astrea 2</span>
					<span id="region">Middle East</span>
				</label>
			</a>
			<a id="radio-option slot-d-btn" value="" class="btn dropdown-option satellite-dropdown-option">
				<img src="/images/img.gif">
				<label>
					<span id="name">Lane 3</span>
					<span id="region">Middle East</span>
				</label>
			</a>
		</div>
	</div>

	<a id="new-btn" class="btn basic-btn new-btn">
		<img src="/images/img.gif">
		<label id="not-directv">Add IP Autoswitch</label>
		<label id="directv">Add Receiver</label>
	</a>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div id="autoswitches-view" class="view main-view autoswitches-view">
	<div class="view-content main-content">
		<a id="back-btn" class="btn back-btn">
			<img src="/images/img.gif">
			<label id="not-directv">IP Autoswitches</label>
			<label id="directv">Receivers</label>
		</a>
		<a id="new-btn" class="btn basic-btn new-btn">
			<img src="/images/img.gif">
		</a>
		<h1>
			<img src="/images/img.gif">
			<span id="not-directv">IP Autoswitches</span>
			<span id="directv">Receivers</span>
		</h1>
		<div id="table-rows">
			<div id="template table-row" class="autoswitch-table-row">
				<a id="view-btn" class="btn view-btn">
					<img src="/images/img.gif">
				</a>
				<div class="label status-label">Status</div>
				<img src="/images/img.gif" class="status-img">

				<div class="label master-label">Master</div>
				<img src="/images/img.gif" class="master-img">

				<div class="label receiver-label">
					<span id="not-directv">IP Autoswitch</span>
					<span id="directv">Receiver</span>
				</div>
				<div id="name" class="value receiver-value"></div>

				<div id="not-directv" class="label serial-number-label">Serial #</div>
				<div id="not-directv serial-number" class="value serial-number-value"></div>

				<div id="directv" class="label serial-number-label">IP Address</div>
				<div id="directv ip" class="value serial-number-value"></div>

				<a id="edit-btn" class="btn basic-btn edit-btn">
					<label>Edit</label>
				</a>

				<a id="select-btn" class="btn basic-btn select-btn">
					<label>Select</label>
				</a>
			</div>
		</div>
	</div>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div id="autoswitch-view" class="view main-view autoswitch-view">
	<div class="view-content main-content">
		<a id="back-btn" class="btn back-btn">
			<img src="/images/img.gif">
			<label id="not-directv">AutoSwitch Details</label>
			<label id="directv">Receiver Details</label>
		</a>
		<h1>
			<img src="/images/img.gif">
			<span id="not-directv">AutoSwitch Details</span>
			<span id="directv">Receiver Details</span>
		</h1>

		<div class="label receiver-label">
			<span id="not-directv">IP Autoswitch</span>
			<span id="directv">Receiver</span>
		</div>
		<div id="name" class="value receiver-value"></div>

		<div id="not-directv" class="label serial-number-label">Serial #</div>
		<div id="not-directv serial-number" class="value serial-number-value"></div>

		<div id="directv" class="label serial-number-label">IP Address</div>
		<div id="directv ip" class="value serial-number-value"></div>

		<div class="label status-label">Status</div>
		<img src="/images/img.gif" class="status-img">

		<div class="label master-label">Master</div>
		<img src="/images/img.gif" class="master-img">

		<a id="edit-btn" class="btn basic-btn edit-btn">
			<label>Edit</label>
		</a>

		<a id="select-btn" class="btn basic-btn select-btn">
			<label>Select</label>
		</a>
	</div>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div id="edit-view" class="view popup-view edit-view">
	<div class="view-content popup-content">
		<a id="cancel-btn" class="btn back-btn">
			<img src="/images/img.gif">
			<label>
				<span id="new">Add</span>
				<span id="old">Edit</span>
				<span id="not-directv">IP Autoswitch</span>
				<span id="directv">Receiver</span>
			</label>
		</a>
		<h1>
			<span id="new">Add</span>
			<span id="old">Edit</span>
			<span id="not-directv">IP Autoswitch</span>
			<span id="directv">Receiver</span>
		</h1>


		<p class="copy">KVH recommends that you run the Setup Wizard whenever you change your
			system's configuration by adding or removing devices.</p>

		<a id="wizard-btn" class="btn basic-btn wizard-btn">
			<label>Launch Setup Wizard</label>
		</a>
		
		<div class="guts">
			<div class="label receiver-label">
				<span id="not-directv">IP Autoswitch</span>
				<span id="directv">Receiver</span>
			</div>
			<input id="name" type="text" class="value receiver-value">

			<div id="not-directv" class="label serial-number-label">Serial #</div>
			<input id="not-directv serial-number" type="text" class="value serial-number-value">

			<div id="directv" class="label serial-number-label">IP Address</div>
			<input id="directv ip" type="text" class="value serial-number-value">
		</div>

		<a id="old delete-btn" class="btn basic-btn delete-btn">
			<label>Remove</label>
		</a>

		<a id="cancel-btn" class="btn basic-btn cancel-btn">
			<label>Cancel</label>
		</a>

		<a id="save-btn" class="btn basic-btn save-btn">
			<label>Save</label>
		</a>
	</div>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->
