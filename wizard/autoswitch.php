<? include $_SERVER['DOCUMENT_ROOT'] . '/wizard.php'; ?>
<script type="text/javascript" src="/js/lodash.min.js"></script>
<script src="http://www.promisejs.org/implementations/promise/promise-3.2.0.js"></script>
<script type="text/javascript" src="/js/wizard/autoswitch.js"></script>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div id="autoswitches-view" class="view main-view wiz-view autoswitches-view">
	<div class="view-content main-content wiz-content">
		<div class="wiz-title-view tac bb dfs26 mfs21">Autoswitching Setup</div>
		<div class="dmaxw700 mc">
			<div class="dfs13 dlh1.4 mt3 mb2">
				IP AutoSwitch(es) have been detected on your network. Choose the IP
				AutoSwitch you would like to be the master (controlling satellite
				selection). If you like, you can also name the IP AutoSwitch(es)
				to make them easier to remember.
				<br>
				<br>
				To determine the location of an IP AutoSwitch, click its 
				<a href="" class="wiz-link">master button</a>
				and that IP AutoSwitch will be highlighted in the table below. Once
				you’ve named all the IP AutoSwitch(es), dont forget to choose the
				master.
			</div>
			<div id="table-rows">
				<div id="template table-row" class="device-table-row mt1">
					<div class="device-table-row-status">
						<div class="status-icon"></div>
						<div class="status-text">Status</div>
					</div>
					<div class="device-table-row-name">
						<div class="dfs13 mb1">IP Autoswitch</div>
						<div class="dfs16">Bathroom</div>
					</div>
					<div class="device-table-row-id">
						<div class="dfs13 mb1">Serial #</div>
						<div class="dfs16">1020304050</div>
					</div>
					<div class="device-table-row-master">
						<div class="master-text">Master</div>
						<div class="master-icon"></div>
					</div>
					<div class="btn basic-btn edit-btn">
						<label>Edit</label>
					</div>
					<div class="btn basic-btn master-btn">
						<label>Select</label>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="bottom-bar">
		<a id="prev-btn" class="btn prev-btn prev-icon fl">Previous</a>
		<a id="next-btn" class="btn next-btn next-icon fr">Next</a>
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

<style type="text/css">
	@media screen and (min-width: 880px) {
		body.at-splash .autoswitches-view,
		body.at-autoswitches-view .autoswitches-view,
		body.at-autoswitch-view .autoswitch-view,
		body.at-edit-view .edit-view {
			display: block;
		}
	}

	@media screen and (max-width: 880px) {
		body.at-splash .autoswitches-view,
		body.at-view .autoswitch-view,
		body.at-edit .edit-view {
			display: block;
		}
	}

	.device-table-row {
		background: #000;
		border: 1px solid #c3140f;
		height: 85px;
		position: relative;
	}

	.device-table-row.is-active {
		border-color: #acd038;
	}

	.device-table-row.is-master {
		background-color: #4e79bc;
		border-color: #4e79bc;
	}

	.device-table-row-status,
	.device-table-row-name,
	.device-table-row-id,
	.device-table-row-master,
	.device-table-row .basic-btn {
		position: absolute;
		top: 50%;
	}

	.device-table-row-status {
		left: 20px;
		margin-top: -10px;
	}

	.device-table-row-name {
		left: 120px;
		margin-top: -20px;
	}

	.device-table-row-id {
		left: 280px;
		margin-top: -20px;
	}

	.device-table-row-master {
		right: 20px;
		margin-top: -10px;
	}

	.device-table-row .status-icon,
	.device-table-row .status-text,
	.device-table-row .master-icon,
	.device-table-row .master-text {
		display: inline-block;
		vertical-align: middle;
		font-size: 13px;
	}

	.device-table-row .status-text,
	.device-table-row .master-text {
		margin: 0 5px 0;
	}

	.device-table-row .status-icon,
	.device-table-row .master-icon {
		background: transparent no-repeat center/21px;
		min-width: 21px;
		min-height: 21px;
	}

	.device-table-row .status-icon {
		background-image: url(/images/red-dot-icon.svg);
	}

	.device-table-row .status-icon {
		background-image: url(/images/red-dot-icon.svg);
	}

	.device-table-row .master-icon {
		background-image: url(/images/radio-selected.png);
	}

	.device-table-row .basic-btn {
		min-width: 95px;
		margin-top: -20px;
	}

	.device-table-row .edit-btn {
		right: 135px;
	}

	.device-table-row .master-btn {
		right: 20px;
	}

	.device-table-row.is-master .master-btn {
		display: none;
	}
</style>