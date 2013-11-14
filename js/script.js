$(document).ready(function() {

	$('.kvh-logo').click(function() {
		window.location.reload();
	});

	$('.nav-toggle').click(function() {
		$(this).toggleClass('selected');
		// $('.nav').toggleClass('toggled', 500);
		$('.nav').toggleClass('toggled');
	});
});