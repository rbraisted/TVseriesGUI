<!DOCTYPE html>
<html>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0" />

    <meta http-equiv="cache-control" content="max-age=0" />
    <meta http-equiv="cache-control" content="no-cache" />
    <meta http-equiv="expires" content="0" />
    <meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
    <meta http-equiv="pragma" content="no-cache" />

    <!-- for codekit, since we must include css in head or codekit live reload doesnt work -->
    <? if (isset($wiz)): ?>
      <link type="text/css" rel="stylesheet" href="/css/test.css">
    <? else: ?>
      <link type="text/css" rel="stylesheet" href="/css/<?=basename($_SERVER['SCRIPT_FILENAME'], '.php')?>.css">
    <? endif; ?>

    <script type="text/javascript" src="/js/jquery-1.10.2.min.js"></script>

    <script type="text/javascript" src="/js/lodash.min.js"></script>
    <script src="/js/promise-3.2.0.js"></script>

    <script type="text/javascript" src="/js/TVRO.js"></script>
    <script type="text/javascript" src="/js/Cookies.js"></script>
  </head>
  <body>
    <script type="text/javascript">
      TVRO.setShellMode(true);
      window.location = '/';
    </script>
  </body>
</script>
