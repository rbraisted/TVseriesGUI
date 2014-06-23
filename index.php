<?
$wiz = true;
include $_SERVER['DOCUMENT_ROOT'] . '/base.php';
?>

<!-- <style type="text/css">body{display:none;}</style> -->
<script type="text/javascript">
  $(function() {
    TVRO.getWizardComplete().then(function(wizardComplete) {
      if (wizardComplete) window.location = '/home.php';
      else window.location = '/wizard';
    },function(error){
      alert("Error: get_wizard_status returned " + error);
      window.location = '/home.php';
      });
  });
</script>

<?
// header("Location: /home.php");
// die();