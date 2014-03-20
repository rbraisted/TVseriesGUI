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

		<link type="text/css" rel="stylesheet" href="/css/autoswitch.css">


		<script type="text/javascript" src="/js/jquery-1.10.2.min.js"></script>
		<script type="text/javascript" src="/js/base.js"></script>

		<script type="text/javascript" src="/js/lodash.min.js"></script>
		<script src="/js/promise-3.2.0.js"></script>

		<script type="text/javascript" src="/js/tvro.js"></script>
		<script type="text/javascript" src="/js/webservice.js"></script>
		<script type="text/javascript" src="/js/data.js"></script>
		<script type="text/javascript" src="/js/table.js"></script>
		<script type="text/javascript" src="/js/insSatView.js"></script>
		<script type="text/javascript" src="/js/satTable.js"></script>
		<script type="text/javascript" src="/js/satInfoView.js"></script>
		<script type="text/javascript" src="/js/satEditView.js"></script>
		<script type="text/javascript" src="/js/groupTable.js"></script>
		<script type="text/javascript" src="/js/groupInfoView.js"></script>
		<script type="text/javascript" src="/js/groupEditView.js"></script>
		<script type="text/javascript" src="/js/toggleBtn.js"></script>
		<script type="text/javascript" src="/js/dropdown.js"></script>

		<script type="text/javascript" src="/js/ReceiverTableView.js"></script>

		<script type="text/javascript" src="/js/autoswitch.js"></script>

	</head>

	<body>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

		<div class="header #header">
			<div class="status-btn #status-btn">Status</div>
			<div class="nav-btn #nav-btn">Menu</div>
			<div class="tracvision-logo"></div>
		</div>

		<!-- <div id="status" class="view status-view"></div> -->

		<div class="nav #nav">
			<a href="/home.php" class="home-btn #home-btn">Home</a>
			<a href="/satellites.php" class="sat-btn #sat-btn">Satellites</a>
			<a href="/autoswitch.php" class="autoswitch-btn #autoswitch-btn">Autoswitch</a>
			<a href="/settings.php" class="settings-btn #settings-btn">Settings</a>
			<a href="/updates.php" class="updates-btn #updates-btn">Updates</a>
			<a href="/support.php" class="support-btn #support-btn">Support</a>
		</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="sidebar">
	<div class="sidebar-chunk">
		<div class="sidebar-chunk-head">Satellite Switching</div>
		<div class="toggle-btn #mode-tog-btn">
			<span class="on">Manual</span>
			<span class="off">Automatic</span>
		</div>
	</div>

	<div class="sidebar-chunk #ins-sat-view">
		<div class="sidebar-chunk-head">
			<span class="#sat-name"></span>
			<span class="#sat-region"></span>
		</div>
		<div class="sat-signal #ant-bars $0"></div>
		<span class="sat-status #ant-state"></span>
	</div>

	<div class="manual-sat-table #manual-sat-table-view">
		<div class="table-row #table-row">
			<span class="table-col install-btn #install-btn"></span><!--
		 --><span class="table-col #sat-name"></span>
		</div>
	</div>

	<div class="sidebar-chunk">
		<div class="sidebar-chunk-head">Installed Satellites</div>
		<div class="automatic-sat-table #automatic-sat-table-view">
			<div class="table-row #table-row">
				<span class="table-col #sat-name"></span>
			</div>
		</div>
	</div>

	<div class="block-btn #new-btn">
		Add
		<span class="#receiver-type"></span>
	</div>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="view #receiver-table-view">
	<div class="view-head">
		<span class="autoswitch-icon"></span>
		<span class="#receiver-type"></span>
		<div class="back-btn #back-btn"></div>
	</div>

<!-- 
		<div id="not-directv" class="copy">
			The following IP AutoSwitch(es) have been found or were previously
			configured on your network. The receiver connected to the master IP
			AutoSwitch controls satellite selection in automatic satellite
			switching mode. You may choose the master by selecting it below or
			by pressing the Master Select button on the IP AutoSwitch itself,
			provided it is currently active on the network (status is green).
			Assign a unique name to each IP AutoSwitch so you can easily identify
			it later.

			<span class="white">
				Hint: To determine the location of an IP AutoSwitch, press its
				Master Select button. That IP AutoSwitch will then become the
				master in the list below.
			</span>

		</div>

		<div id="directv" class="copy">
			The following receivers have been set up for automatic satellite
			switching. The master receiver controls satellite selection. You may
			choose the master by selecting it below. To add a receiver to the 
			list, enter its IP address and assign it a unique name (location).

			<a href="#">
				(Find your receiver’s IP address.)
			</a>

			<span class="white">
				Note: Receiver must be activated to view its IP address. The 
				receiver also must be set up to allow external access before it 
				will communicate with the TV-Hub. 
				
				<a href="#">
					Learn how to enable external access on your DIRECTV receiver.
				</a>

			</span>

		</div>
 -->

	<div class="receiver-table #receiver-table">
		<div class="table-row #table-row">
			<div class="table-col status-col">
				<div class="status-icon label">Status</div>
			</div><!--
		--><div class="table-col name-col">
				<div class="label #receiver-name-label"></div>
				<div class="#receiver-name"></div>
			</div><!--
		--><div class="table-col id-col">
				<div class="label #receiver-id-label"></div>
				<div class="#receiver-id"></div>
			</div><!--
		--><div class="table-col edit-col">
				<div class="block-btn edit-btn #edit-btn">Edit</div>
			</div><!--
		--><div class="table-col select-col">
				<div class="block-btn select-btn #select-btn">Select</div>
				<div class="master-icon label">Master</div>
			</div>
		</div>
	</div>
</div>


<!--


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
				<span id="name"></span>
				<span id="region"></span>
			</h3>
			<img id="signal" src="/images/img.gif" class="satellite-signal is-0">
			<span id="status" class="satellite-status-label"></span>
		</div>

		<div id="satellite-dropdown" class="satellite-sub-view satellite-dropdown-view">
			<a id="radio-option slot-a-btn" value="" class="btn dropdown-option satellite-dropdown-option">
				<img src="/images/img.gif">
				<label>
					<span id="name"></span>
					<span id="region"></span>
				</label>
			</a>
			<a id="radio-option slot-b-btn" value="" class="btn dropdown-option satellite-dropdown-option">
				<img src="/images/img.gif">
				<label>
					<span id="name"></span>
					<span id="region"></span>
				</label>
			</a>
			<a id="radio-option slot-c-btn" value="" class="btn dropdown-option satellite-dropdown-option">
				<img src="/images/img.gif">
				<label>
					<span id="name"></span>
					<span id="region"></span>
				</label>
			</a>
			<a id="radio-option slot-d-btn" value="" class="btn dropdown-option satellite-dropdown-option">
				<img src="/images/img.gif">
				<label>
					<span id="name"></span>
					<span id="region"></span>
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
		<div id="not-directv" class="copy">
			The following IP AutoSwitch(es) have been found or were previously
			configured on your network. The receiver connected to the master IP
			AutoSwitch controls satellite selection in automatic satellite
			switching mode. You may choose the master by selecting it below or
			by pressing the Master Select button on the IP AutoSwitch itself,
			provided it is currently active on the network (status is green).
			Assign a unique name to each IP AutoSwitch so you can easily identify
			it later.
			<span class="white">
				Hint: To determine the location of an IP AutoSwitch, press its
				Master Select button. That IP AutoSwitch will then become the
				master in the list below.
			</span>
		</div>
		<div id="directv" class="copy">
			The following receivers have been set up for automatic satellite
			switching. The master receiver controls satellite selection. You may
			choose the master by selecting it below. To add a receiver to the 
			list, enter its IP address and assign it a unique name (location).
			<a href="#">(Find your receiver’s IP address.)</a>
			<span class="white">
				Note: Receiver must be activated to view its IP address. The 
				receiver also must be set up to allow external access before it 
				will communicate with the TV-Hub. 
				<a href="#">Learn how to enable external access on your DIRECTV receiver.</a>
			</span>
		</div>
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
		<div id="mode-view" class="satellite-sub-view">
			<h3>Satellite Switching</h3>
			<a id="mode-btn" class="btn toggle-btn satellite-mode-btn">
				<div class="on">Manual</div>
				<div class="off">Automatic</div>
			</a>
		</div>
	</div>
</div>

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

-->

	</body>
</html>