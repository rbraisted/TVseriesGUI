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

		<!-- 	<link type="text/css" rel="stylesheet" href="/css/base.css"> -->

		<!-- <link type="text/css" rel="stylesheet" href="/css/test.css"> -->
		<!-- <link type="text/css" rel="stylesheet" href="/css/base.css"> -->
		<link type="text/css" rel="stylesheet" href="/css/satellites.css">


		<script type="text/javascript" src="/js/jquery-1.10.2.min.js"></script>
		<script type="text/javascript" src="/js/base.js"></script>

		<script type="text/javascript" src="/js/lodash.min.js"></script>
		<script src="http://www.promisejs.org/implementations/promise/promise-3.2.0.js"></script>

		<script type="text/javascript" src="/js/tvro.js"></script>
		<script type="text/javascript" src="/js/webservice.js"></script>
		<script type="text/javascript" src="/js/data.js"></script>
		<!-- <script type="text/javascript" src="/js/ctrl.js"></script> -->
		<script type="text/javascript" src="/js/table.js"></script>
		<script type="text/javascript" src="/js/insSatView.js"></script>
		<script type="text/javascript" src="/js/satTable.js"></script>
		<script type="text/javascript" src="/js/satInfoView.js"></script>
		<script type="text/javascript" src="/js/satEditView.js"></script>
		<script type="text/javascript" src="/js/groupTable.js"></script>
		<script type="text/javascript" src="/js/groupInfoView.js"></script>
		<script type="text/javascript" src="/js/groupEditView.js"></script>
		<script type="text/javascript" src="/js/toggleBtn.js"></script>
		<script type="text/javascript" src="/js/test.js"></script>
	</head>

	<body>

<!-- header/nav
- -- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

		<div class="header #header">
			<div class="status-btn #status-btn">Status</div>
			<div class="nav-btn #nav-btn">Menu</div>
			<div class="tracvision-logo"></div>
		</div>

		<!-- <div id="status" class="view status-view"></div> -->

		<div class="nav #nav">
			<div href="/home.php" class="home-btn #home-btn">Home</div>
			<div href="/satellites.php" class="sat-btn #sat-btn">Satellites</div>
			<div href="/autoswitch.php" class="autoswitch-btn #autoswitch-btn">Autoswitch</div>
			<div href="/settings.php" class="settings-btn #settings-btn">Settings</div>
			<div href="/updates.php" class="updates-btn #updates-btn">Updates</div>
			<div href="/support.php" class="support-btn #support-btn">Support</div>
		</div>

<!-- sidebar
contains .#region-table-view (single mode)
and also .#group-table-view (group mode)
- -- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->
<div class="sidebar">
	<div class="sidebar-chunk #ins-sat-view">
		<div class="sidebar-chunk-header">
			<span class="#sat-name">Satellite</span>
			<span class="#sat-region"></span>
		</div>
		<div class="sat-signal #ant-bars $0"></div>
		<span class="sat-status #ant-state"></span>
	</div>
	
	<div class="sidebar-chunk">
		<div class="sidebar-chunk-header">Satellite Mode</div>
		<div class="toggle-btn #mode-toggle-btn">
			<span class="on">Single</span>
			<span class="off">Group</span>
		</div>
	</div>

	<div class="region-table #region-table-view">
		<div class="table-row #table-row">
			<span class="table-col #region-name"></span>
		</div>
	</div>

	<div class="group-table #group-table-view">
		<div class="table-row #table-row">
			<span class="table-col install-btn #install-btn"></span><!--
		 --><span class="table-col #group-name"></span>
		</div>
	</div>
	<div class="block-btn #group-add">Create New Group</div>
</div>



<!-- shared views (#sat-info-view, #sat-edit-view)
- -- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->
<div class="popup #sat-info-view">
	<div class="view sat-info">
		<div class="view-header">Satellite Details</div>
		<div class="back-btn #back-btn"></div>
		<div class="name-block">
			<div class="label">Satellite Name</div>
			<div class="#sat-name">N/A</div>
		</div><!--
	 --><div class="fav-block">
			<div class="label">Add To Favorites</div>
			<div class="btn toggle-btn favorite-btn #fav-btn">
				<div class="on">On</div>
				<div class="off">Off</div>
			</div>
			<div class="heart-btn #fav-btn">
				<div class="on"></div>
				<div class="off"></div>				
			</div>
		</div><!--
	 --><div class="region-block">
			<div class="label">Region</div>
			<div class="#sat-region">N/A</div>
		</div><!--
	 --><div class="orb-slot-block">
			<div class="label">Orbital Slot</div>
			<div class="#sat-antSatID">N/A</div>
		</div><!--
	 --><div class="hemisphere-block">
			<div class="label">Hemisphere</div>
			<div class="#sat-hemisphere">N/A</div>
		</div><!--
	 --><div class="suffix-block">
			<div class="label">Suffix</div>
			<div class="#sat-suffix">N/A</div>
		</div><!--
	 --><div class="skew-block">
			<div class="label">Pre-Skew</div>
			<div class="#sat-skew">N/A</div>
		</div><!--
	 --><div class="lnb-block">
			<div class="label">LNB Type</div>
			<div class="#sat-lnb">N/A</div>
		</div><!--
	 --><div class="lo1-block">
			<div class="label">Local Oscillator #1</div>
			<div class="#sat-lo1">N/A</div>
		</div><!--
	 --><div class="lo2-block">
			<div class="label">Local Oscillator #2</div>
			<div class="#sat-lo2">N/A</div>
		</div>
		<div class="slot #xponder-hh-view">
			<div class="slot-head">Horizontal High</div>
			<div class="xponder-block">
				<div class="label">Frequency (MHz)</div>
				<div class="#xponder-freq">N/A</div>
			</div>
			<div class="xponder-block">
				<div class="label">Symbol Rate (Msym/s)</div>
				<div class="#xponder-symRate">N/A</div>
			</div>
			<div class="xponder-block">
				<div class="label">FEC Code</div>
				<div class="#xponder-fec">N/A</div>
			</div>
			<div class="xponder-block">
				<div class="label">Satellite ID</div>
				<div class="#xponder-netID">N/A</div>
			</div>
			<div class="xponder-block">
				<div class="label">Decoder Type</div>
				<div class="#xponder-modType">N/A</div>
			</div>
		</div><!--
	 --><div class="slot #xponder-hl-view">
			<div class="slot-head">Horizontal Low</div>
			<div class="xponder-block">
				<div class="label">Frequency (MHz)</div>
				<div class="#xponder-freq">N/A</div>
			</div>
			<div class="xponder-block">
				<div class="label">Symbol Rate (Msym/s)</div>
				<div class="#xponder-symRate">N/A</div>
			</div>
			<div class="xponder-block">
				<div class="label">FEC Code</div>
				<div class="#xponder-fec">N/A</div>
			</div>
			<div class="xponder-block">
				<div class="label">Satellite ID</div>
				<div class="#xponder-netID">N/A</div>
			</div>
			<div class="xponder-block">
				<div class="label">Decoder Type</div>
				<div class="#xponder-modType">N/A</div>
			</div>
		</div><!--
	 --><div class="slot #xponder-vh-view">
			<div class="slot-head">Vertical High</div>
			<div class="xponder-block">
				<div class="label">Frequency (MHz)</div>
				<div class="#xponder-freq">N/A</div>
			</div>
			<div class="xponder-block">
				<div class="label">Symbol Rate (Msym/s)</div>
				<div class="#xponder-symRate">N/A</div>
			</div>
			<div class="xponder-block">
				<div class="label">FEC Code</div>
				<div class="#xponder-fec">N/A</div>
			</div>
			<div class="xponder-block">
				<div class="label">Satellite ID</div>
				<div class="#xponder-netID">N/A</div>
			</div>
			<div class="xponder-block">
				<div class="label">Decoder Type</div>
				<div class="#xponder-modType">N/A</div>
			</div>
		</div><!--
	 --><div class="slot #xponder-vl-view">
			<div class="slot-head">Vertical Low</div>
			<div class="xponder-block">
				<div class="label">Frequency (MHz)</div>
				<div class="#xponder-freq">N/A</div>
			</div>
			<div class="xponder-block">
				<div class="label">Symbol Rate (Msym/s)</div>
				<div class="#xponder-symRate">N/A</div>
			</div>
			<div class="xponder-block">
				<div class="label">FEC Code</div>
				<div class="#xponder-fec">N/A</div>
			</div>
			<div class="xponder-block">
				<div class="label">Satellite ID</div>
				<div class="#xponder-netID">N/A</div>
			</div>
			<div class="xponder-block">
				<div class="label">Decoder Type</div>
				<div class="#xponder-modType">N/A</div>
			</div>
		</div>
		<div class="btn-tray">
			<div class="block-btn edit-btn #edit-btn">Edit</div>
		</div>
	</div>
</div>


<div class="popup #sat-edit-view">
	<div class="view sat-edit">
		<div class="view-header">Satellite Details</div>
		<div class="back-btn #back-btn"></div>
		<div class="name-block">
			<div class="label">Satellite Name</div>
			<input class="input #sat-name" />
		</div><!--
	 --><div class="fav-block">
			<div class="label">Add To Favorites</div>
			<div class="btn toggle-btn favorite-btn #sat-favorite">
				<div class="on">On</div>
				<div class="off">Off</div>
			</div>
			<div class="heart-btn #sat-favorite">
				<div class="on"></div>
				<div class="off"></div>				
			</div>
		</div><!--
	 --><div class="region-block">
			<div class="label">Region</div>
			<input class="input #sat-region" />
		</div><!--
	 --><div class="orb-slot-block">
			<div class="label">Orbital Slot</div>
			<input class="input #sat-antSatID" />
		</div><!--
	 --><div class="hemisphere-block">
			<div class="label">Hemisphere</div>
			<input class="input #sat-hemisphere" />
		</div><!--
	 --><div class="suffix-block">
			<div class="label">Suffix</div>
			<input class="input #sat-suffix" />
		</div><!--
	 --><div class="skew-block">
			<div class="label">Pre-Skew</div>
			<input class="input #sat-skew" />
		</div><!--
	 --><div class="lnb-block">
			<div class="label">LNB Type</div>
			<input class="input #sat-lnb" />
		</div><!--
	 --><div class="lo1-block">
			<div class="label">Local Oscillator #1</div>
			<input class="input #sat-lo1" />
		</div><!--
	 --><div class="lo2-block">
			<div class="label">Local Oscillator #2</div>
			<input class="input #sat-lo2" />
		</div>
		<div class="slot #xponder-hh-view">
			<div class="slot-head">Horizontal High</div>
			<div class="xponder-block">
				<div class="label">Frequency (MHz)</div>
				<input class="input #xponder-freq" />
			</div>
			<div class="xponder-block">
				<div class="label">Symbol Rate (Msym/s)</div>
				<input class="input #xponder-symRate" />
			</div>
			<div class="xponder-block">
				<div class="label">FEC Code</div>
				<input class="input #xponder-fec" />
			</div>
			<div class="xponder-block">
				<div class="label">Satellite ID</div>
				<input class="input #xponder-netID" />
			</div>
			<div class="xponder-block">
				<div class="label">Decoder Type</div>
				<input class="input #xponder-modType" />
			</div>
		</div><!--
	 --><div class="slot #xponder-hl-view">
			<div class="slot-head">Horizontal Low</div>
			<div class="xponder-block">
				<div class="label">Frequency (MHz)</div>
				<input class="input #xponder-freq" />
			</div>
			<div class="xponder-block">
				<div class="label">Symbol Rate (Msym/s)</div>
				<input class="input #xponder-symRate" />
			</div>
			<div class="xponder-block">
				<div class="label">FEC Code</div>
				<input class="input #xponder-fec" />
			</div>
			<div class="xponder-block">
				<div class="label">Satellite ID</div>
				<input class="input #xponder-netID" />
			</div>
			<div class="xponder-block">
				<div class="label">Decoder Type</div>
				<input class="input #xponder-modType" />
			</div>
		</div><!--
	 --><div class="slot #xponder-vh-view">
			<div class="slot-head">Vertical High</div>
			<div class="xponder-block">
				<div class="label">Frequency (MHz)</div>
				<input class="input #xponder-freq" />
			</div>
			<div class="xponder-block">
				<div class="label">Symbol Rate (Msym/s)</div>
				<input class="input #xponder-symRate" />
			</div>
			<div class="xponder-block">
				<div class="label">FEC Code</div>
				<input class="input #xponder-fec" />
			</div>
			<div class="xponder-block">
				<div class="label">Satellite ID</div>
				<input class="input #xponder-netID" />
			</div>
			<div class="xponder-block">
				<div class="label">Decoder Type</div>
				<input class="input #xponder-modType" />
			</div>
		</div><!--
	 --><div class="slot #xponder-vl-view">
			<div class="slot-head">Vertical Low</div>
			<div class="xponder-block">
				<div class="label">Frequency (MHz)</div>
				<input class="input #xponder-freq" />
			</div>
			<div class="xponder-block">
				<div class="label">Symbol Rate (Msym/s)</div>
				<input class="input #xponder-symRate" />
			</div>
			<div class="xponder-block">
				<div class="label">FEC Code</div>
				<input class="input #xponder-fec" />
			</div>
			<div class="xponder-block">
				<div class="label">Satellite ID</div>
				<input class="input #xponder-netID" />
			</div>
			<div class="xponder-block">
				<div class="label">Decoder Type</div>
				<input class="input #xponder-modType" />
			</div>
		</div>
		<div class="btn-tray">
			<div class="block-btn save-btn #save-btm">Save</div>
			<div class="block-btn cancel-btn #back-btn">Cancel</div>
			<div class="block-btn reset-btn #reset-btn">Reset</div>
		</div>
	</div>
</div>

<!-- single views
- -- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->
<div class="view #single-sat-table-view">
	<div class="view-header">
		<span class="sat-icon"></span>
		<span>Satellites</span>
	</div>
	<div class="back-btn #back-btn"></div>
	<div class="sat-table #sat-table-view">
		<div class="table-head #table-head">
			<div class="table-col install-col">Installed</div><!--
		 --><div class="table-col name-col sort-btn #name-sort-btn">Name</div><!--
		 --><div class="table-col orb-slot-col sort-btn #antSatID-sort-btn">Orbital Slot</div><!--
		 --><div class="table-col region-col sort-btn #region-sort-btn">Region</div><!--
		 --><div class="table-col fav-col sort-btn #favorite-sort-btn">Favorites</div>
		</div>
		<div class="table-row #table-row">
			<div class="table-col install-col">
				<div class="install-btn #install-btn"></div>
			</div><!--
		 --><div class="table-col name-col">
		 		<span class="#sat-name"></span>
		 		<span class="#sat-region"></span>
			</div><!--
		 --><div class="table-col orb-slot-col #sat-antSatID"></div><!--
		 --><div class="table-col region-col #sat-region"></div><!--
		 --><div class="table-col fav-col">
		 		<div class="fav-btn #fav-btn"></div>
		 		<div class="info-btn #info-btn"></div>
			</div>
		</div>
	</div>
</div>

 -->
<!-- group views
- -- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="view group-info #group-info-view">
	<div class="view-header">
		<span class="sat-icon"></span>
		<span class="#group-name"></span>
	</div>
	<div class="back-btn #back-btn"></div>
	<div class="slot first-slot #sat-view #sat-a-view">
		<div class="slot-head">Slot A</div>
		<div class="sat-name #sat-name"></div>
		<div class="install-btn #install-btn"></div>
		<div class="info-btn #info-btn"></div>
		<div class="slot-foot">Installed</div>
	</div><!--
 --><div class="slot #sat-view #sat-b-view">
		<div class="slot-head">Slot B</div>
		<div class="sat-name #sat-name"></div>
		<div class="install-btn #install-btn"></div>
		<div class="info-btn #info-btn"></div>
		<div class="slot-foot">Installed</div>
	</div><!--
 --><div class="slot #sat-view #sat-c-view">
		<div class="slot-head">Slot C</div>
		<div class="sat-name #sat-name"></div>
		<div class="install-btn #install-btn"></div>
		<div class="info-btn #info-btn"></div>
		<div class="slot-foot">Installed</div>
	</div><!--
 --><div class="slot #sat-view #sat-d-view">
		<div class="slot-head">Slot D</div>
		<div class="sat-name #sat-name"></div>
		<div class="install-btn #install-btn"></div>
		<div class="info-btn #info-btn"></div>
		<div class="slot-foot">Installed</div>
	</div>
	<div class="btn-tray">
		<div class="block-btn delete-btn #delete-btn">Delete Group</div>
		<div class="block-btn edit-btn #edit-btn">Edit Group</div>
		<div class="block-btn install-btn #install-btn">Install Group</div>
	</div>
</div>

<div class="popup #group-edit-view">
	<div class="view group-edit">
		<div class="view-header">Edit Satellite Group</div>
		<div class="back-btn #back-btn"></div>
		<label class="label">Satellite Group Name</label>
		<input type="text" class="input name-input #group-name" />
		<div class="slot first-slot #sat-view #sat-a-view">
			<span class="label">Slot A</span>
			<span class="sat-name #sat-name"></span>
		</div>
		<div class="slot #sat-view #sat-b-view">
			<span class="label">Slot B</span>
			<span class="sat-name #sat-name"></span>
		</div>
		<div class="slot #sat-view #sat-c-view">
			<span class="label">Slot C</span>
			<span class="sat-name #sat-name"></span>
		</div>
		<div class="slot #sat-view #sat-d-view">
			<span class="label">Slot D</span>
			<span class="sat-name #sat-name"></span>
		</div>
		<div class="btn-tray">
			<div class="block-btn #save-btn">Save Group</div>
			<div class="block-btn #back-btn">Cancel Group</div>
		</div>
	</div>
</div>

<div class="popup #group-sat-table-view">
	<div class="view">
		<div class="view-header">
			<span class="sat-icon"></span>
			<span>Satellites</span>
		</div>
		<div class="back-btn #back-btn"></div>
		<div class="sat-table #sat-table-view">
			<div class="table-head #table-head">
				<div class="table-col install-col">Installed</div><!--
			 --><div class="table-col name-col sort-btn #name-sort-btn">Name</div><!--
			 --><div class="table-col orb-slot-col sort-btn #antSatID-sort-btn">Orbital Slot</div><!--
			 --><div class="table-col region-col sort-btn #region-sort-btn">Region</div><!--
			 --><div class="table-col fav-col sort-btn #favorite-sort-btn">Favorites</div>
			</div>
			<div class="table-row #table-row">
				<div class="table-col install-col">
					<div class="install-btn #install-btn"></div>
				</div><!--
			 --><div class="table-col name-col">
			 		<span class="#sat-name"></span>
			 		<span class="#sat-region"></span>
				</div><!--
			 --><div class="table-col orb-slot-col #sat-antSatID"></div><!--
			 --><div class="table-col region-col #sat-region"></div><!--
			 --><div class="table-col fav-col">
			 		<div class="fav-btn #fav-btn"></div>
			 		<div class="info-btn #info-btn"></div>
				</div>
			</div>
		</div>
	</div>
</div>

<!-- 
<div id="region-dropdown" class="view popup-view dropdown-view">
	<div id="dropdown-content" class="view-content popup-content dropdown-content">
		<a id="close-btn" class="btn back-btn">
			<img src="/images/img.gif">
			<label>Region</label>
		</a>
		<h1>Region</h1>
		<a id="dropdown-option radio-option" value="Africa" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>Africa</label>
		</a>
		<a id="dropdown-option radio-option" value="Asia" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>Asia</label>
		</a>
		<a id="dropdown-option radio-option" value="Australia" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>Australia / New Zealand</label>
		</a>
		<a id="dropdown-option radio-option" value="Central/South America" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>Central / South America</label>
		</a>
		<a id="dropdown-option radio-option" value="Europe" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>Europe</label>
		</a>
		<a id="dropdown-option radio-option" value="North America" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>North America</label>
		</a>
	</div>
</div>

<div id="hemisphere-dropdown" class="view popup-view dropdown-view">
	<div id="dropdown-content" class="view-content popup-content dropdown-content">
		<a id="close-btn" class="btn back-btn">
			<img src="/images/img.gif">
			<label>Hemisphere</label>
		</a>
		<h1>Hemisphere</h1>
		<a id="dropdown-option radio-option" value="East" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>East</label>
		</a>
		<a id="dropdown-option radio-option" value="West" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>West</label>
		</a>
	</div>
</div>

<div id="lnb-type-dropdown" class="view popup-view dropdown-view">
	<div id="dropdown-content" class="view-content popup-content dropdown-content">
		<a id="close-btn" class="btn back-btn">
			<img src="/images/img.gif">
			<label>Region</label>
		</a>
		<h1>Region</h1>
		<a id="dropdown-option radio-option" value="Linear" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>Linear</label>
		</a>
		<a id="dropdown-option radio-option" value="Circular" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>Circular</label>
		</a>
	</div>
</div>

<div id="fec-code-dropdown" class="view popup-view dropdown-view">
	<div id="dropdown-content" class="view-content popup-content dropdown-content">
		<a id="close-btn" class="btn back-btn">
			<img src="/images/img.gif">
			<label>FEC Code</label>
		</a>
		<h1>FEC Code</h1>
		<a id="dropdown-option radio-option" value="1/2" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>1/2</label>
		</a>
		<a id="dropdown-option radio-option" value="2/3" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>2/3</label>
		</a>
		<a id="dropdown-option radio-option" value="3/4" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>3/4</label>
		</a>
		<a id="dropdown-option radio-option" value="3/5" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>3/5</label>
		</a>
		<a id="dropdown-option radio-option" value="4/5" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>4/5</label>
		</a>
		<a id="dropdown-option radio-option" value="5/6" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>5/6</label>
		</a>
		<a id="dropdown-option radio-option" value="5/11" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>5/11</label>
		</a>
		<a id="dropdown-option radio-option" value="6/7" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>6/7</label>
		</a>
		<a id="dropdown-option radio-option" value="7/8" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>7/8</label>
		</a>
		<a id="dropdown-option radio-option" value="8/9" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>8/9</label>
		</a>
		<a id="dropdown-option radio-option" value="9/9" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>9/9</label>
		</a>
		<a id="dropdown-option radio-option" value="9/10" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>9/10</label>
		</a>
	</div>
</div>

<div id="decoder-type-dropdown" class="view popup-view dropdown-view">
	<div id="dropdown-content" class="view-content popup-content dropdown-content">
		<a id="close-btn" class="btn back-btn">
			<img src="/images/img.gif">
			<label>Decoder Type</label>
		</a>
		<h1>Decoder Type</h1>
		<a id="dropdown-option radio-option" value="QDSS" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>DSS DTV</label>
		</a>
		<a id="dropdown-option radio-option" value="QDC2" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>DCII QPSK DigiCipher 2</label>
		</a>
		<a id="dropdown-option radio-option" value="QDVB" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>DVB QPSK</label>
		</a>
		<a id="dropdown-option radio-option" value="LQPSK" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>LDPC QPSK STD DVB-S2</label>
		</a>
		<a id="dropdown-option radio-option" value="L8PSK" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>LDPC 8PSK STD DVB-S2</label>
		</a>
		<a id="dropdown-option radio-option" value="TQPSK" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>Turbo QPSK Dish</label>
		</a>
		<a id="dropdown-option radio-option" value="T8PSK" class="btn dropdown-option">
			<img src="/images/img.gif">
			<label>Turbo 8PSK Dish</label>
		</a>
	</div>
</div>

-->