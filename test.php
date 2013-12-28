<!DOCTYPE html>

<!-- 
	using this page to set up a css overhaul that will eventually get
	pushed out across all the other pages

	and it'll probably serve as a good overview of recurring elements
	for new developers who might have to dig into this app later
	-->

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
		<script type="text/javascript" src="/js/test.js"></script>
	</head>
	<body>

		<div id="header" class="header">
			<a href="/" class="tracvision-logo"><img src="/images/img.gif"></a>
			<a id="status-btn" href="#" class="status-btn"><img src="/images/img.gif">STATUS</a>
			<a id="nav-btn" href="#" class="nav-btn"><img src="/images/img.gif">MENU</a>

			<div id="status" class="status">Everything is OK!</div>

<!--		so if you are unfamilar with the weird start html comment/end html
			comment between elements here in the #menu, the reason is that
			display:inline-block elements will have a little gap between them
			(because of whitespace) unless you do certain things, one of which
			is to comment out the white space between the elements
			-->
			<div id="menu" class="menu">
				<a id="dashboard-btn" href="/dashboard.php" class="dashboard-btn menu-btn"><img src="/images/img.gif">Dashboard</a><!--
			 --><a id="satellites-btn" href="/satellites.php" class="satellites-btn menu-btn"><img src="/images/img.gif">Satellites</a><!--
			 --><a id="autoswitch-btn" href="/autoswitch.php" class="autoswitch-btn menu-btn"><img src="/images/img.gif">Autoswitch</a><!--
			 --><a id="settings-btn" href="/settings/" class="settings-btn menu-btn"><img src="/images/img.gif">Settings</a><!--
			 --><a id="updates-btn" href="/updates.php" class="updates-btn menu-btn"><img src="/images/img.gif">Updates</a><!--
			 --><a id="support-btn" href="/support/" class="support-btn menu-btn"><img src="/images/img.gif">Support</a><!--
	 		 --><a id="sat-finder-btn" href="tvro://sat-finder" class="sat-finder-btn menu-btn"><img src="/images/img.gif">Sat Finder</a>
			</div>
		</div>

		<div id="page" class="page">
			<div id="menu" class="view menu is-active">
				<div class="title">Menu Title</div>
				<a id="menu-btn" href="#" class="menu-btn"><img src="/images/img.gif">Menu Button</a>
				<a id="menu-btn" href="#" class="menu-btn"><img src="/images/img.gif">Menu Button</a>
				<a id="view-1-btn menu-btn" href="#" class="menu-btn"><img src="/images/img.gif">Go to View 1</a>
				<br>
				<a href="#" class="basic-btn">Simple Button</a>
			</div>

			<div id="view-1" class="view">
				<a href="#" class="back-btn"><img src="/images/img.gif">Back to Menu</a>
				<div class="headline">Title</div>
				<br>
				<a href="#" class="basic-btn">Simple Button</a>
				<br>
				<a id="on-off-switch" class="on-off-switch is-on"><div class="on">On</div><div class="off">Off</div></a>
				<br>
				<a id="dropdown-btn" href="#" class="dropdown-btn"><img src="/images/img.gif">Dropdown Btn</a>
				<br>
				<a id="sort-btn" href="#" class="sort-btn is-ascending"><img src="/images/img.gif">Sort Btn</a>
				<br>
				<input type="text" />
				<br>
				<a href="#" class="basic-btn">Go to View 2</a>
			</div>

			<div id="view-2" class="view">
				<a href="#" class="back-btn"><img src="/images/img.gif">Back to View 1</a>
				<br>
				<label>Label:</label><a href="#" class="basic-btn">Simple Button</a>
				<br>
				<label>Another Label:</label><a id="on-off-switch" class="on-off-switch is-on"><div class="on">Enabled</div><div class="off">Disabled</div></a>
				<br>
				<label>Label #3:</label><a id="dropdown-btn" href="#" class="dropdown-btn"><img src="/images/img.gif">Dropdown Btn</a>
				<br>
				<label>Label No. Four:</label><a id="sort-btn" href="#" class="sort-btn is-ascending"><img src="/images/img.gif">Sort Btn</a>
				<br>
				<label>5th Label:</label><input type="text" />
			</div>
		</div>
	</body>
</html>