<? include $_SERVER[DOCUMENT_ROOT] . '/base.php'; ?>
<? include $_SERVER[DOCUMENT_ROOT] . '/diagnostics/base.php'; ?>

<div id="event-history" class="diagnostics-section">
	<link type="text/css" rel="stylesheet" href="/css/diagnostics/event-history.css">
	<script type="text/javascript" src="/js/diagnostics/event-history.js"></script>

	<a href="/diagnostics/" class="back-button">◂ Event History</a>

	<h1>Event History</h1>
	<div id="events" class="events"></div>
	<div id="load-button" class="load-button">Load More</div>
	<div id="email-button" class="email-button">Email to Technician</div>
</div>