<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>KVH's TracVision HD11 webCONTROL</title>
    <link href="/css/styles.css" rel="stylesheet" type="text/css" />
    <script type="text/JavaScript" src="/js/jquery.js"></script>
    <script type="text/JavaScript" src="/js/cmdLine.js"></script>
</head>

<?php flush(); ?>

<body>
	<div style="width:96%; height:90%; position:absolute; background-color:#FFFFFF">
		<div style="background-color:red; height:auto; padding:1% 2% 1% 2%; text-align:center; font-size:12pt; color:white;">
			<strong>Improper use of antenna commands can directly impact performance.<br />
			Only KVH-authorized technicians should use this interface.
			</strong>
		</div>
		<div style="padding:1% 2% 1% 2%">
			<form name="buttonHasFocus">
				<input type="text" id="CMDtoSend" name="CMDtoSend" onKeyPress="return submitenter(this,event)" style="width:50%"/>
				<input type="button" id="sendCMD" name="sendCMD" value="SEND" onclick="sendAcmd()"/>
			</form>
		</div>
		<div style="padding:1% 2% 1% 2%">
			<b>Command Shortcuts:</b>
			<br />
			<i>(choose the shortcut below to automatically insert the code into the live comms window)</i>
		</div>
		<div style="padding:1% 2% 1% 2%">
			<input type="button" value="HALT" onclick="send_A_command('HALT')" />
			<input type="button" value="Restart" onclick="send_A_command('zap')" />
			<input type="button" value="Calibrate Gyros" onclick="send_A_command('=calgyro')" />
			<input type="button" value="Debug On" onclick="send_A_command('debugon')" />
			<input type="button" value="Enable Sidelobe Mode" onclick="send_A_command('sidelobe,on')" />
			<input type="button" value="Clear EEPROM" onclick="send_A_command('clearee')" />
			<input type="button" value="Disable Sidelobe Mode" onclick="send_A_command('sidelobe,off')" />
			<input type="button" value="Unlock EEPROM" onclick="send_A_command('eeunlock')" />
		</div>
		<div style="padding:1% 2% 1% 2%">
			<div style="height:60%; width:96%; border:2px solid #D8D8D8; position:absolute; overflow: auto;">
				<!-- Displays the data coming from the antenna to the screen -->
				<iframe src = "/print2screen.php" style="height:100%; width:100%" frameborder="0">alternate content</iframe>
			</div>
		</div>
	</div>
</body>
</html>