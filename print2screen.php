<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />

    <title>KVH TVHUB Text Only webCONTROL</title>
    <script language="javascript" type="text/javascript">

        // Scrolls the page as the data from the antenna is received
        function pageScroll()
        {
            window.scrollBy(0,10); // horizontal and vertical scroll increments
            //scrolldelay = setTimeout('pageScroll()',100); // scrolls every 100 milliseconds
            var objDiv = document.getElementById("tnet");
            objDiv.scrollTop = objDiv.scrollHeight;

        }

		// Tells the Telnet socket below to close
		function pageClosing()
		{
			document.myTelnet.exitingPage.value = "close";
			document.myTelnet.submit();

		}



		//pageScroll();
		setInterval(pageScroll, 100);

    </script>

</head>
<body onunload="pageClosing()" onload="pageScroll()">
  <style type="text/css">
    body {
      color: #000000;
      background-color: #FFFFFF;
      font-family: Helvetica, Arial, sans-serif;
      font-size: 16px;
      font-weight: lighter;
      line-height: 1.4;

      @media screen and (max-width: 440px) {
        font-size: 13px;
      }
    }
  </style>
	<form name="myTelnet" method="POST" action="#">
        <input type="hidden" name="exitingPage" />
        <div id="tnet" style='height:96%; width:98%; position:absolute' >
            <?php

                // Opens a telnet session to receive data from the antenna
                if ( !isset($_POST["exitingPage"]) ) {
                    $fp = fsockopen("127.0.0.1", 50001, $errno, $errstr, 10);
                }

                // Reads the data coming from the antenna to send to the screen
				if ( false !== $fp ) {

					while ( !isset($_POST["exitingPage"]) && false !== $fp ) {
						echo fgets($fp, 128) . "<br />";
						flush();
						ob_flush();

						if( isset($_POST["exitingPage"]) ) {

							if ( "close" == $_POST["exitingPage"] ) {
								fclose($fp);

							}

						}

					}

					echo 'Connection lost. Try refreshing the browser (F5)';

				} else {
					echo 'Cannot connect try refreshing the browser (F5)';

				}

            ?>
        </div>
    </form>

</body>
</html>