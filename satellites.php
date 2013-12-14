<? include $_SERVER['DOCUMENT_ROOT'] . '/base.php'; ?>

<div id="page" class="page">
	<link type="text/css" rel="stylesheet" href="/css/satellites.css">
	<script type="text/javascript" src="/js/satellites.js"></script>

	<div id="sb" class="sb">
		<div class="headline">View satellites by region</div>
		<a id="africa-btn" href="#" class="menu-btn"><img src="/images/img.gif">Africa</a>
		<a id="asia-btn" href="#" class="menu-btn"><img src="/images/img.gif">Asia</a>
		<a id="australia-btn" href="#" class="menu-btn"><img src="/images/img.gif">Australia</a>
		<a id="central-and-south-america-btn" href="#" class="menu-btn"><img src="/images/img.gif">Central/South America</a>
		<a id="north-america-btn" href="#" class="menu-btn"><img src="/images/img.gif">North America</a>
		<a id="all-btn" href="#" class="menu-btn"><img src="/images/img.gif">All Regions</a>
	</div>

	<div id="mc" class="mc">
		<a id="back-btn" href="/support/" class="back-btn"><img src="/images/img.gif" />Change region</a>

		<div class="mcg">

			<div id="satellites-table" class="table">
				<div class="table-header">
					<span class="table-col">Select</span><!--
				 --><a id="region-btn" href="#" class="table-col sort-btn">Region</a><!--
				 --><a id="name-btn" href="#" class="table-col sort-btn">Satellite Name</a><!--
				 --><a id="enabled-btn" href="#" class="table-col sort-btn">Enabled</a><!--
				 --><a id="favorite-btn" href="#" class="table-col sort-btn">Favorite</a><!--
				 --><span class="table-col">Satellite Profile</span>
				</div>
				<div id="satellites-table-row" class="table-row">
					<a href="#" class="table-col"><img src="/images/img.gif"></a><!--
				 --><span class="table-col"></span><!--
				 --><span class="table-col"></span><!--
				 --><a href="#" class="table-col"><img src="/images/img.gif"></a><!--
				 --><a href="#" class="table-col"><img src="/images/img.gif"></a><!--
				 --><span class="table-col"><a href="#">View</a>/<a href="#">Edit</a></span>
				</div>
			</div>

			
		</div>
	</div>

</div>