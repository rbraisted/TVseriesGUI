<? include $_SERVER['DOCUMENT_ROOT'] . '/base_.php'; ?>
<style type="text/css">body{display:none;}</style>
<script type="text/javascript">
  TVRO.getWizardStatus().then(function(xml) {
    var status = $('status', xml).text();
    if (status === 'SUCCESS') {
      window.location = '/home.php';
    } else {
      window.location = '/wizard';
    }
	});
</script>

<?
// header("Location: /home.php");
// die();