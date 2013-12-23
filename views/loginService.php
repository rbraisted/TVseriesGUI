<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<title>KVH's TracVision HD11 webCONTROL</title>
<link rel="icon" type="image/bmp" href="/images/favicon.ico.bmp" />
<link href="/css/kvhservice.css" rel="stylesheet" type="text/css" />
<?php if(isset($extrahead)) echo $extrahead ?>

</head>

<?php flush(); ?>

<body style="background-color:white;">
    <form id="loginForm" action="../service/login.php" method="post">
      <fieldset>
      <legend>PLEASE LOGIN</legend>
        <div>
          <label for="username">USERNAME</label> 
          <input type="text" name="usernameService" id="usernameService" size="11" />
          <br/> <br/>
        </div>
        <div>
            <div class="formfield">
              <label for="password">PASSWORD</label>
              <input type="password" name="passwordService" id="passwordService" size="11" />
              <br/> <br/>
            </div>
            <input type="submit" value="LOGIN" class="submit"/><br />
            <input type="hidden" name="cmd" value="doServiceLogin"/><br/>
            <div id="loginResult" class="red-bold">
              <?php if(isset($loginR)) { echo $loginR; } ?>
            </div>
        </div>
      </div>
      </fieldset>
    </form>
    <script language="javascript">document.getElementById('usernameService').focus();</script>
</body>
</html>