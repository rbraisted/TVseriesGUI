<? include $_SERVER['DOCUMENT_ROOT'] . '/base.php'; ?>
<? include $_SERVER['DOCUMENT_ROOT'] . '/support/base.php'; ?>

<div id="support-main" class="smc mmc lmc">
	<link type="text/css" rel="stylesheet" href="/css/support/command-line.css">
	<script type="text/javascript" src="/js/support/command-line.js"></script>

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