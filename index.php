<? include $_SERVER['DOCUMENT_ROOT'] . '/base.php'; ?>
<script type="text/javascript">
	TVRO.WebService().request('get_wizard_status', function(response) {
		if ($('status', response).text() === 'SUCCESS') {
			window.location = '/home.php';
		} else {
			window.location = '/wizard';
		}
	});
</script>

<?
// header("Location: /home.php");
// die();