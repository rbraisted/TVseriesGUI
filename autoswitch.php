<? include $_SERVER['DOCUMENT_ROOT'] . '/base.php'; ?>
<link type="text/css" rel="stylesheet" href="/css/autoswitch.css">
<script type="text/javascript" src="/js/autoswitch.js"></script>

<div id="menu-view" class="view menu-view">
	<div id="satellite-view" class="menu-sub-view satellite-view">
		<div id="mode-view" class="satellite-sub-view">
			<h3>Satellite Switching</h3>
			<a id="mode-btn" href="#" class="btn toggle-btn satellite-mode-btn">
				<div class="on">Manual</div>
				<div class="off">Automatic</div>
			</a>
		</div>

		<div id="details-view" class="satellite-sub-view">
			<h3>
				<span id="name">Wheatly 1</span>
				<span id="region">Middle East</span>
			</h3>
			<img id="signal" src="/images/img.gif" class="satellite-signal is-0">
			<span id="status" class="satellite-status-label">Tracking...</span>
		</div>

		<div id="satellite-dropdown" class="satellite-sub-view satellite-dropdown-view">
			<a id="radio-option slot-a-btn" href="#" value="" class="btn dropdown-option satellite-dropdown-option">
				<img src="/images/img.gif">
				<label>
					<span id="name">Rosalind 1</span>
					<span id="region">Europe</span>
				</label>
			</a>
			<a id="radio-option slot-b-btn" href="#" value="" class="btn dropdown-option satellite-dropdown-option">
				<img src="/images/img.gif">
				<label>
					<span id="name">Elena 22</span>
					<span id="region">Europe</span>
				</label>
			</a>
			<a id="radio-option slot-c-btn" href="#" value="" class="btn dropdown-option satellite-dropdown-option">
				<img src="/images/img.gif">
				<label>
					<span id="name">Astrea 2</span>
					<span id="region">Middle East</span>
				</label>
			</a>
			<a id="radio-option slot-d-btn" href="#" value="" class="btn dropdown-option satellite-dropdown-option">
				<img src="/images/img.gif">
				<label>
					<span id="name">Lane 3</span>
					<span id="region">Middle East</span>
				</label>
			</a>
		</div>
	</div>
</div>