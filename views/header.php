<?
//	create a scope for the header to avoid interfering with page scope
call_user_func(function() {
	$page = basename($_SERVER[REQUEST_URI]);
?>
		<div id="test"></div>
		<div class="header">
			<div class="kvh-logo"></div>
			<div class="nav-toggle">
				<div class="icon"></div>
				<div class="label">MENU</div>
			</div>
			<div class="status-lights">
				<div class="power-status-light status-light status-light-good"></div><!--
			 --><div class="antenna-status-light status-light status-light-bad"></div><!--
			 --><div class="system-status-light status-light status-light-good"></div>
			</div>
		</div>

		<div class="nav">
			<a href="status.php" class="status-button nav-button<? if ($page == 'status.php') echo ' selected'; ?>">
				<div class="icon"></div>
				<div class="label">Status</div>
			</a><!--
		 --><a href="satellites.php" class="satellites-button nav-button<? if ($page == 'satellites.php') echo ' selected'; ?>">
		 		<div class="icon"></div>
		 		<div class="label">Satellites</div>
		 	</a><!--
		 --><a href="autoswitch.php" class="autoswitch-button nav-button<? if ($page == 'autoswitch.php') echo ' selected'; ?>">
		 		<div class="icon"></div>
		 		<div class="label">Autoswitch</div>
		 	</a><!--
		 --><a href="settings.php" class="settings-button nav-button<? if ($page == 'settings.php') echo ' selected'; ?>">
		 		<div class="icon"></div>
		 		<div class="label">Settings</div>
		 	</a><!--
		 --><a href="updates.php" class="updates-button nav-button<? if ($page == 'updates.php') echo ' selected'; ?>">
		 		<div class="icon"></div>
		 		<div class="label">Updates</div>
		 	</a><!--
		 --><a href="diagnostics.php" class="diagnostics-button nav-button<? if ($page == 'diagnostics.php') echo ' selected'; ?>">
		 		<div class="icon"></div>
		 		<div class="label">Diagnostics</div>
			</a>
		</div>
<?
});
?>