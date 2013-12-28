<? include $_SERVER['DOCUMENT_ROOT'] . '/base.php'; ?>

<div id="page" class="page">
	<link type="text/css" rel="stylesheet" href="/css/autoswitch.css">
	<script type="text/javascript" src="/js/autoswitch.js"></script>
	
	<div id="sb" class="sb">
		<a id="add-btn" href="#" class="border-btn"><img class="" src="/images/img.gif">Add Autoswitch</a>
		<a id="autoswitch-btn" href="#" class="autoswitch-btn">Some autoswitch name</a>
		<a id="autoswitch-btn" href="#" class="autoswitch-btn">Some autoswitch name</a>
		<a id="autoswitch-btn" href="#" class="autoswitch-btn">Some autoswitch name</a>
	</div>

	<div id="mc" class="mc">
		<div id="autoswitch" class="autoswitch">
			<label>Name:</label><span id="name view"></span><input id="name edit" />
			<label>Serial #:</label><span id="sn view"></span><input id="sn edit" />
			<label>IP Address:</label><span id="ip view"></span><input id="ip edit" />
			<a id="master-btn" href="#" class="of-btn"><div class="on">On</div><div class="off">Off</div></a>
			<a id="save-btn edit" href="#" class="border-btn">Save</a><!--
		 --><a id="cancel-btn edit" href="#" class="border-btn">Cancel</a><!--
		 --><a id="edit-btn view" href="#" class="border-btn">Edit</a><!--
		 --><a id="remove-btn view" href="#" class="border-btn">Remove</a>
		</div>
	</div>
</div>