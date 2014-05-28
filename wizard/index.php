<?
$wiz = true;
include $_SERVER['DOCUMENT_ROOT'] . '/base.php';
?>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="view wizard-index">
	<div class="view-head">
		Welcome to the <span class="desktop">TracVision Setup </span>Wizard
	</div>

	<div class="system-detected">
		System Detected:<br>
		<span class="copy">
			TracVision <span class="#ant-model"></span>
			<span class="desktop">with</span>
			<br class="mobile">
			<span class="#ant-lnb"></span> LNB
		</span>
	</div>

	<div class="col first">
		<div class="headline">
			Before you start the Wizard,<br>
			please do the following:
		</div>
		<div class="step step-1">
			Identify the desired service provider<br>
      and associated satellite(s)
			<div class="bullet">1</div>
		</div>
		<div class="step step-2">
			Update the antenna software to the<br>
      latest version.
			<div class="bullet">2</div>
		</div>
		<div class="step step-3">
			Connect all system components for<br>
      your particular configuration
			<div class="bullet">3</div>
		</div>
		<div class="note">
		Note: Refer to the Installation Guide for details.
		</div>
	</div><!--
--><div class="col">
		<div class="headline">
			I have everything I need.<br>
			Let's get started!
		</div>
		<div class="copy">
			Please note that the setup process might<br>
			take up to 30 minutes to complete.
		</div>
		<a href="/wizard/registration.php" class="block-btn">
			Proceed with Setup Wizard
		</a>
	</div>
</div>

<div class="bottom-bar">
	<a href="/home.php" class="exit-btn">Exit</a>
	<a href="/wizard/registration.php" class="next-btn">Next</a>
</div>


<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<script type="text/javascript">
  $(function() {
    TVRO.getAntennaVersions().then(function(xml) {
      var antModel = $('au model', xml).text();
      var antLnb = $('lnb name', xml).text();
      $('.\\#ant-model').text(antModel);
      $('.\\#ant-lnb').text(antLnb);
    });
  });
</script>