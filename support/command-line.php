<? include $_SERVER['DOCUMENT_ROOT'] . '/base.php'; ?>
<? include $_SERVER['DOCUMENT_ROOT'] . '/support/base.php'; ?>

<div id="mc" class="mc">
	<a id="back-btn" href="/support/" class="back-btn"><img src="/images/img.gif" />Support</a>

	<div id="command-line" class="command-line support-mc">
		<link type="text/css" rel="stylesheet" href="/css/support/command-line.css">
		<script type="text/javascript" src="/js/support/command-line.js"></script>

	<div class="headline">Command Line</div>
	<p class="warning">
		Improper use of antenna commands can directly impact performance.
		Only KVH-authorized technicians should use this interface.
	</p>
	<input id="input"></input>
	<div id="send-btn" class="border-btn">Send</div>
	<iframe id="output" src="/print2screen.php"></iframe>
</div>