<? include $_SERVER['DOCUMENT_ROOT'] . '/base.php'; ?>
<link type="text/css" rel="stylesheet" href="/css/autoswitch.css">
<script type="text/javascript" src="/js/autoswitch.js"></script>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div id="menu-view" class="view menu-view">
	<div id="satellite-view" class="menu-sub-view satellite-view">
		<div id="mode-view" class="satellite-sub-view">
			<h3>Satellite Switching</h3>
			<a id="mode-btn" href="#" class="btn toggle-btn satellite-mode-btn">
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
			<a id="radio-option slot-a-btn" href="#" value="" class="btn dropdown-option satellite-dropdown-option">
				<img src="/images/img.gif">
				<label>
					<span id="name">Rosalind 1</span>
					<span id="region">Europe</span>
				</label>
			</a>
			<a id="radio-option slot-b-btn" href="#" value="" class="btn dropdown-option satellite-dropdown-option">
				<img src="/images/img.gif">
				<label>
					<span id="name">Elena 22</span>
					<span id="region">Europe</span>
				</label>
			</a>
			<a id="radio-option slot-c-btn" href="#" value="" class="btn dropdown-option satellite-dropdown-option">
				<img src="/images/img.gif">
				<label>
					<span id="name">Astrea 2</span>
					<span id="region">Middle East</span>
				</label>
			</a>
			<a id="radio-option slot-d-btn" href="#" value="" class="btn dropdown-option satellite-dropdown-option">
				<img src="/images/img.gif">
				<label>
					<span id="name">Lane 3</span>
					<span id="region">Middle East</span>
				</label>
			</a>
		</div>
	</div>

	<a id="new-btn" href="#" class="btn basic-btn new-btn">
		<img src="/images/img.gif">
		<label>Add Receiver</label>
	</a>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div id="autoswitches-view" class="view main-view autoswitches-view">
	<div class="view-content main-content">
		<a id="back-btn" href="#" class="btn back-btn">
			<img src="/images/img.gif">
			<label id="name">Autoswitches</label>
		</a>
		<h1>
			<img src="/images/img.gif">
			<span id="name">Autoswitches</span>
		</h1>
		<div id="table-rows">
			<div id="template table-row" class="autoswitch-view">
				<div class="label status-label">Status</div>
				<img src="/images/img.gif" class="status-img">

				<div class="label master-label">Master</div>
				<img src="/images/img.gif" class="master-img">

				<div class="label receiver-label">Receiver</div>
				<div id="name" class="value receiver-value">Bedroom</div>

				<div class="label serial-number-label">Serial #</div>
				<div id="serial-number" class="value serial-number-value">1234567890</div>

				<a id="edit-btn" href="#" class="btn basic-btn edit-btn">
					<label>Edit</label>
				</a>

				<a id="radio-option select-btn" href="#" class="btn basic-btn select-btn">
					<label>Select</label>
				</a>
			</div>
		</div>
	</div>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div id="edit-view" class="view popup-view edit-view">
	<div class="view-content popup-content">
		<a id="cancel-btn" href="#" class="btn back-btn">
			<img src="/images/img.gif">
			<label>Edit Autoswitch</label>
		</a>
		<h1>Edit Autoswitch</h1>

		<a id="wizard-btn" href="#" class="btn basic-btn wizard-btn">
			<label>Launch Setup Wizard</label>
		</a>

		<p class="copy">KVH recommends that you run the Setup Wizard whenever you change your
			system's configuration by adding or removing devices.</p>

		<div class="guts">
			<div class="label receiver-label">Receiver</div>
			<input id="name" type="text" class="value receiver-value">

			<div class="label serial-number-label">Serial #</div>
			<input id="serial-number" type="text" class="value serial-number-value">
		</div>

		<a id="delete-btn" href="#" class="btn basic-btn delete-btn">
			<label>Remove</label>
		</a>

		<a id="cancel-btn" href="#" class="btn basic-btn cancel-btn">
			<label>Cancel</label>
		</a>

		<a id="save-btn" href="#" class="btn basic-btn save-btn">
			<label>Save</label>
		</a>
	</div>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->
