<!DOCTYPE html>

<!-- 
	using this page to set up a css overhaul that will eventually get
	pushed out across all the other pages

	and it'll probably serve as a good overview of recurring elements
	for new developers who might have to dig into this app later

	NOTE if you are unfamilar with the weird start html comment/end html
	comment between elements, they're there because display:inline-block
	elements will have a little gap between them (because of whitespace)
	unless you do certain things - such as commenting out the white space
	between the elements
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
			<a href="/" class="tracvision-logo">
				<img src="/images/img.gif">
			</a>

			<a id="status-btn" href="#" class="status-btn">
				<div id="power-state" class="status-light"></div>
				<div id="acu-state" class="status-light"></div>
				<div id="ant-state" class="status-light"></div>
				<label>Status</label>
			</a>
			<div id="status-bar" class="status-bar">Everything is OK!</div>

			<a id="nav-btn" href="#" class="nav-btn">
				<div class="nav-btn-square"></div>
				<div class="nav-btn-square"></div>
				<div class="nav-btn-square"></div>
				<div class="nav-btn-square"></div>
				<div class="nav-btn-square"></div>
				<div class="nav-btn-square"></div>
				<label>Menu</label>
			</a>
			<div id="nav-bar" class="nav-bar">
				<a id="home-btn" href="/home.php" class="home-btn nav-btn">
					<img src="/images/img.gif">
					<label>Home</label>
				</a>
				<a id="satellites-btn" href="/satellites.php" class="satellites-btn nav-btn">
			 		<img src="/images/img.gif">
			 		<label>Satellites</label>
			 	</a>
				<a id="autoswitch-btn" href="/autoswitch.php" class="autoswitch-btn nav-btn">
			 		<img src="/images/img.gif">
			 		<label>Autoswitch</label>
			 	</a>
				<a id="settings-btn" href="/settings/" class="settings-btn nav-btn">
			 		<img src="/images/img.gif">
			 		<label>Settings</label>
			 	</a>
				<a id="updates-btn" href="/updates.php" class="updates-btn nav-btn">
			 		<img src="/images/img.gif">
			 		<label>Updates</label>
			 	</a>
				<a id="support-btn" href="/support/" class="support-btn nav-btn">
			 		<img src="/images/img.gif">
			 		<label>Support</label>
			 	</a>
				<a id="sat-finder-btn" href="tvro://sat-finder" class="sat-finder-btn nav-btn">
	 		 		<img src="/images/img.gif">
	 		 		<label>Sat Finder</label>
	 		 	</a>
			</div>
		</div>

		<div id="page" class="page">
			<div id="menu" class="view menu is-active">
				<h1>h1 Heading</h1>
				<h2>h2 Heading</h2>
				<h3>h3 Heading</h3>
				<a id="menu-btn" href="#" class="btn menu-btn">
					<img src="/images/img.gif">
					<label>Africa</label>
				</a>
				<a id="menu-btn" href="#" class="btn menu-btn">
					<img src="/images/img.gif">
					<label>Asia</label>
				</a>
				<a id="menu-btn" href="#" class="btn menu-btn">
					<img src="/images/img.gif">
					<label>Australia</label>
				</a>
				<a id="menu-btn" href="#" class="btn menu-btn">
					<img src="/images/img.gif">
					<label>Europe</label>
				</a>
				<a id="menu-btn" href="#" class="btn menu-btn">
					<img src="/images/img.gif">
					<label>Central / South America</label>
				</a>
				<a id="menu-btn" href="#" class="btn menu-btn">
					<img src="/images/img.gif">
					<label>North America</label>
				</a>
				<a id="menu-btn" href="#" class="btn menu-btn">
					<img src="/images/img.gif">
					<label>All</label>
				</a>

				<a href="#" class="btn">
					<label>Basic Button</label>
				</a>

				<a href="#" class="btn add-btn">
					<img src="/images/img.gif">
					<label>Add Button</label>
				</a>
			</div>

			<div id="view-a" class="view">
				<a id="menu-btn" href="#" class="btn back-btn">
					<img src="/images/img.gif">
					<label>Back to Menu</label>
				</a>

				<h1>View A</h1>

				<br>
				<a href="#" class="btn">
					<label>Simple Button</label>
				</a>

				<br>
				<a id="on-off-switch" class="on-off-switch is-on">
					<div class="on">ON</div>
					<div class="off">OFF</div>
				</a>

				<br>
				<a id="dropdown-btn" href="#" class="dropdown-btn">
					<img src="/images/img.gif">
					<label>Dropdown Btn</label>
				</a>

				<br>
				<a id="sort-btn" href="#" class="sort-btn is-ascending">
					<img src="/images/img.gif">
					<label>Sort Btn</label>
				</a>

				<br>
				<input type="text" />
				<br>
				<a id="view-b-btn" href="#" class="btn">
					<label>Go to View B</label>
				</a>
			</div>

			<div id="view-b" class="view">
				<a id="view-a-btn" href="#" class="btn back-btn">
					<img src="/images/img.gif">
					<label>Back to View A</label>
				</a>

				<h1>View B</h1>

				<br>
				<p class="warning">
					lorem ipsum dolor sit amet, consectetur adipiscing elit. aenean molestie consequat dignissim. sed ut feugiat elit. donec cursus fermentum urna a bibendum. praesent commodo tellus vulputate elementum scelerisque. mauris dignissim metus a lorem lacinia ultrices. cras interdum sodales lectus, vel iaculis diam tincidunt a. proin nec erat id erat porta lacinia at nec lectus.
					<br><br>
					nullam condimentum luctus ligula, a pharetra orci aliquet eu. suspendisse facilisis tincidunt arcu in pretium. vivamus auctor cursus interdum. vivamus id sapien convallis, commodo augue ut, faucibus massa. nulla vel eros ac risus rutrum molestie eu ut sapien. mauris neque risus, pulvinar eget nisi non, tempus ullamcorper lorem. donec adipiscing enim ut est fringilla, vitae malesuada elit rutrum. quisque sagittis felis at rhoncus posuere.
					<br><br>
					maecenas nisi eros, ornare ut odio id, blandit pellentesque metus. curabitur vitae ligula ut massa scelerisque porttitor. phasellus sit amet nulla et quam fringilla lacinia. aenean sollicitudin mi accumsan vestibulum iaculis. aenean in lacus aliquam, cursus nisl quis, malesuada erat. curabitur sagittis, diam at vehicula scelerisque, ante lacus semper sapien, quis auctor mi lacus vel libero. in dui diam, euismod sed venenatis non, dignissim in dui. nam bibendum, odio nec volutpat congue, lectus lorem pretium massa, eu mattis ante quam imperdiet quam. cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. nam vitae felis lacus. etiam malesuada purus ac congue feugiat.
					<br><br>
					sed auctor, orci vel feugiat gravida, sapien ante tristique urna, ut suscipit dolor dolor sit amet elit. quisque id feugiat nulla. vivamus eu ultrices diam. nullam semper hendrerit massa lobortis consequat. donec cursus lorem nec adipiscing tincidunt. suspendisse at condimentum orci. aliquam augue ipsum, imperdiet at metus nec, facilisis scelerisque massa. in sit amet risus in diam fringilla ornare nec et arcu. fusce tempor mi vel augue tempus, vel porttitor elit vehicula. duis fringilla consequat tristique.
					<br><br>
					vestibulum eu gravida mauris. donec quis magna nec leo luctus placerat et eu diam. aliquam erat volutpat. aenean purus enim, cursus eget magna et, scelerisque ultricies tortor. vestibulum elementum cursus varius. ut sodales posuere arcu, rhoncus bibendum arcu blandit id. aliquam varius malesuada lorem in malesuada. suspendisse potenti. nulla nec pretium nulla. donec venenatis arcu sed nisi dapibus pretium. in consequat, odio vitae cursus dictum, tellus lectus malesuada metus, non auctor lorem ipsum vel erat. vestibulum lobortis pharetra nisl, vitae suscipit leo consectetur sed. suspendisse vehicula molestie ante in mollis. proin a neque lacus.
				</p>

				<br>
				<a href="#" class="btn">
					<label>Simple Button</label>
				</a>

				<br>
				<a id="on-off-switch" class="on-off-switch">
					<div class="on">ON</div>
					<div class="off">OFF</div>
				</a>

				<br>
				<a id="dropdown-btn" href="#" class="dropdown-btn">
					<img src="/images/img.gif">
					<label>Dropdown Btn</label>
				</a>

				<br>
				<a id="sort-btn" href="#" class="sort-btn is-ascending">
					<img src="/images/img.gif">
					<label>Sort Btn</label>
				</a>

				<br>
				<input type="text" />
				<br>
				<a id="view-a-btn" href="#" class="btn">
					<label>Go to View A</label>
				</a>
			</div>

		</div>

	</body>
</html>