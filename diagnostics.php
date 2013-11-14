<!DOCTYPE html>
<html>
	<head>
		<title>KVH TVRO</title>
		<meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0" />

		<link type="text/css" rel="stylesheet" href="css/base.css">
		<link type="text/css" rel="stylesheet" href="css/diagnostics.css">

		<script type="text/javascript" src="js/jquery-1.10.2.min.js"></script>
		<script type="text/javascript" src="js/jquery-ui-1.10.3.min.js"></script>
		<script type="text/javascript" src="js/script.js"></script>

		<script type="text/javascript" src="js/diagnostics.js"></script>
	</head>
	<body>

		<? include 'views/header.php'; ?>

		<!-- <div id="diagnostics" class="diagnostics-page"> -->
			<div id="sidebar" class="sidebar selected"><!-- i'm not sure if "sidebar" is the most semantically accurate name here since it's a full view on smaller screens. -->
				<div class="diagnostics-nav">
					<div id="restart-system-button" 	section="restart-system-section" 	class="diagnostics-nav-button">Restart System</div>
					<div id="product-manuals-button" 	section="product-manuals-section" 	class="diagnostics-nav-button">Product Manuals</div>
					<div id="diagnostic-logs-button" 	section="diagnostic-logs-section" 	class="diagnostics-nav-button">Diagnostic Log</div>
					<div id="event-history-button" 		section="event-history-section" 	class="diagnostics-nav-button">Event History</div>
					<div id="advanced-button" 			section="advanced-section" 			class="diagnostics-nav-button">Advanced</div>
				</div>

				<div class="contact">
					<div class="title">Contact KVH</div>
					<div class="north-america contact-region">
						<div class="region-name">North America</div>
						<div class="email contact-button">Email KVH</div>
						<div class="phone contact-button">(401) 847-3327</div>
					</div>
					<div class="international contact-region">
						<div class="region-name">
							Africa, Asia, Europe,<br>
							Middle East, Australia
						</div>
						<div class="email contact-button">Email KVH</div>
						<div class="phone contact-button">+45 45 160 180</div>
					</div>
				</div>
			</div>

			<div class="diagnostics-sections">
				<div id="back-button" class="back-button"></div>
				<div id="restart-system-section" class="restart-system-section diagnostics-section">
					<div class="section-title">Restart System</div>
					<div id="restart-antenna-button" class="">Restart Antenna</div>
					<div id="restart-bdu-button" class="">Restart BDU</div>
					<div id="restart-all-button" class="">Restart All</div>
				</div>

				<div id="product-manuals-section" class="product-manuals-section diagnostics-section">
					<div class="section-title">Product Manuals</div>
					<a href="#" class="product-manual">Manual 1</a>
					<a href="#" class="product-manual">Manual 2</a>
					<a href="#" class="product-manual">Manual 3</a>
				</div>

				<div id="diagnostic-logs-section" class="diagnostic-logs-section diagnostics-section">
					<div class="section-title">Diagnostic Logs</div>
					diagnostics logs
				</div>

				<div id="event-history-section" class="event-history-section diagnostics-section">
					<div class="section-title">Event History</div>
					<div id="events" class="events">
					</div>
					<div id="email-events-button" class="email-events-button">
						Email to Technician
					</div>
				</div>

				<div id="advanced-section" class="advanced-section diagnostics-section">
					<div class="section-title">Command Line</div>
					advanced/command line
				</div>

			</div>
		<!-- </div> -->

	</body>
</html>