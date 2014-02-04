<? include $_SERVER['DOCUMENT_ROOT'] . '/base.php'; ?>
<link type="text/css" rel="stylesheet" href="/css/updates.css">
<script type="text/javascript" src="/js/ajaxfileupload.js"></script>
<script type="text/javascript" src="/js/updates.js"></script>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div id="menu-view" class="view menu-view">
	<?	$a = array('tv1', 'tv3', 'tv5', 'tv6'); 
		for ($i = 0; $i < count($a); $i++): 
			$antType = $a[$i]; ?>

	<a id="radio-option <?=$antType?>-btn" value="<?=$i?>" class="btn menu-btn updates-menu-btn">
		<label>
			<?=strtoupper($antType)?>
			<span id="connected" class="c">CONNECTED</span>
			<div id="system" class="v">
				Antenna S/W Version:
				<span id="version">N/A</span>
			</div>
			<div id="portal" class="v">
				Latest S/W Version Available:
				<span id="version">N/A</span>
			</div>
			<div id="device" class="v">
				Downloaded S/W Version:
				<span id="version">N/A</span>
			</div>
		</label>
		<img src="/images/img.gif">
	</a>

	<?	endfor; ?>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div id="update-view" class="view main-view update-view">
	<div class="view-content main-content">
		<a id="back-btn" class="btn back-btn">
			<img src="/images/img.gif">
			<label id="ant-type"></label>
		</a>
		<h1 id="ant-type"></h1>
		<div id="portal" class="p">
			<div class="bg"></div>
			<div class="l">Latest Software Available</div>
			<div class="v">Software Version <span id="version"></span> available to download</div>
			<a id="download-btn" class="btn download-btn"></a>
			<div class="cta">Download Update</div>
		</div>
		<div id="device" class="p">
			<div class="bg"></div>
			<div id="desktop" class="desktop">
				<div class="l">My Computer</div>
			</div>
			<div id="mobile" class="mobile">
				<div class="l">On Device</div>
				<div class="v">Software Version <span id="version"></span> ready to install</div>
			</div>
			<a id="install-btn" class="btn install-btn">
				<input id="upload" type="file" class="upload-btn">
			</a>
			<div class="cta">Install Update</div>
		</div>
		<div id="system" class="p">
			<div class="bg"></div>
			<div class="l">My <span id="ant-type"></span> Antenna Software</div>
			<div class="v">Software Version <span id="version"></span> installed</div>	
		</div>
	</div>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->