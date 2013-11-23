<? include $_SERVER['DOCUMENT_ROOT'] . '/base.php'; ?>
<? include $_SERVER['DOCUMENT_ROOT'] . '/support/base.php'; ?>

<div id="support-main" class="smc mmc lmc">
	<link type="text/css" rel="stylesheet" href="/css/support/diagnostic-log.css">
	<script type="text/javascript" src="/js/support/diagnostic-log.js"></script>

	<a href="/diagnostics/" class="back-button">◂ Diagnostic Log</a>
	
	<h1>Diagnostic Log Options</h1>
	<div id="operational-button" class="diagnostic-log-button">View / Save Operational Log</div>
	<p>Choose this option to open a text version of the Operational Log.</p>
	<div id="start-button" class="diagnostic-log-button">Start New Log</div>
	<p>This option will delete the existing log data and begin recording a new log.</p>
	<div id="restart-button" class="diagnostic-log-button">Restart System & Start New Log</div>
	<p>This option will restart your antenna system, then begin recording a new log in order to capture information logged in the startup cycle.</p>	
	<div id="entry-button" class="diagnostic-log-button">View / Save Entry Log</div>	
	<p>Choose this option to open a text version of the Event Log</p>
</div>