<? include $_SERVER[DOCUMENT_ROOT] . '/views/base.php'; ?>
<? include $_SERVER[DOCUMENT_ROOT] . '/views/diagnostics/base.php'; ?>

<div id="command-line" class="diagnostics-section">
	<link type="text/css" rel="stylesheet" href="/css/diagnostics/command-line.css">
	<script type="text/javascript" src="/js/diagnostics/command-line.js"></script>

	<a href="/diagnostics/" class="back-button">◂ Command Line</a>

	<h1>Command Line</h1>
	<p class="warning">
		Improper use of antenna commands can directly impact performance.
		Only KVH-authorized technicians should use this interface.
	</p>
	<input id="input"></input>
	<div id="send-button" class="send-button">Send</div>
	<iframe id="output" src="/print2screen.php"></iframe>
</div>