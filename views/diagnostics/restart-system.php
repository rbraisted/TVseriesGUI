<? include $_SERVER[DOCUMENT_ROOT] . '/views/base.php'; ?>
<? include $_SERVER[DOCUMENT_ROOT] . '/views/diagnostics/base.php'; ?>

<div id="restart-system" class="diagnostics-section">
	<link type="text/css" rel="stylesheet" href="/css/diagnostics/restart-system.css">
	<script type="text/javascript" src="/js/diagnostics/restart-system.js"></script>

	<a href="/diagnostics/" class="back-button">◂ Restart System</a>

	<h1>Restart System</h1>
	<div id="system-button" class="restart-system-button">Restart System</div>
	<div id="antenna-button" class="restart-system-button">Restart Antenna</div>
	<div id="all-button" class="restart-system-button">Restart Both</div>
</div>