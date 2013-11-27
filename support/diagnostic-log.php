<? include $_SERVER['DOCUMENT_ROOT'] . '/base.php'; ?>
<? include $_SERVER['DOCUMENT_ROOT'] . '/support/base.php'; ?>

<div id="mc" class="mc">
	<link type="text/css" rel="stylesheet" href="/css/support/diagnostic-log.css">
	<script type="text/javascript" src="/js/support/diagnostic-log.js"></script>

	<a id="back-btn" href="/support/" class="back-btn"><img src="/images/img.gif" />Support</a>
	
	<div id="diagnostic-log" class="diagnostic-log mcg">
		<div class="headline">Diagnostic Log Options</div>

		<a id="operational-btn" href="#" class="border-btn">View / Save Operational Log</a>
		<p>Choose this option to open a text version of the Operational Log.</p>

		<a id="start-btn" href="#" class="border-btn">Start New Log</a>
		<p>This option will delete the existing log data and begin recording a new log.</p>

		<a id="restart-btn" href="#" class="border-btn">Restart System & Start New Log</a>
		<p>This option will restart your antenna system, then begin recording a new log in order to capture information logged in the startup cycle.</p>	

		<a id="entry-btn" href="#" class="border-btn">View / Save Entry Log</a>
		<p>Choose this option to open a text version of the Event Log</p>
	</div>
</div>