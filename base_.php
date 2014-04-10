<!DOCTYPE html>
<html>
  <head>
    <title>KVH TracVision</title>
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

    <script type="text/javascript" src="/js/TVRO_.js"></script>
    
    <script type="text/javascript" src="/js/Cookies.js"></script>
    <script type="text/javascript" src="/js/WebService_.js"></script>
    <script type="text/javascript" src="/js/Models.js"></script>

    <script type="text/javascript" src="/js/ToggleBtn_.js"></script>
    <script type="text/javascript" src="/js/TableView.js"></script>
    <script type="text/javascript" src="/js/DropdownView.js"></script>

    <script type="text/javascript" src="/js/HeaderView.js"></script>

  </head>

  <body class>

<!-- header/nav
- -- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="header #header-view">
  <div class="status-btn #status-btn">
    <div title="TV-Hub" class="status-light acu-status #acu-status">H</div><!--
 --><div title="Antenna" class="status-light antenna-status #antenna-status">A</div><!--
 --><div title="Power" class="status-light power-status #power-status">P</div>
    Status
  </div>

  <div class="nav-btn #nav-btn">
    <div class="nav-light"></div><!--
 --><div class="nav-light"></div><!--
 --><div class="nav-light"></div><!--
 --><div class="nav-light"></div><!--
 --><div class="nav-light"></div><!--
 --><div class="nav-light"></div>
    Menu
  </div>

  <div class="tracvision-logo #home-btn"></div>
</div>

<div class="status #status-view">
  <div class="status-label">
    Power: 
    <span class="power-status #power-status">...</span>
  </div><!--
--><div class="status-label">
    TV-Hub: 
    <span class="acu-status #acu-status">...</span>
  </div><!--
--><div class="status-label">
    Antenna: 
    <span class="antenna-status #antenna-status">...</span>
  </div>
</div>

<div class="nav #nav-view">
  <a href="/home.php" class="home-btn #nav-btn #home-btn">Home</a><!--
--><a href="/satellites.php" class="sat-btn #nav-btn #satellites-btn">Satellites</a><!--
--><a href="/autoswitch.php" class="autoswitch-btn #nav-btn #autoswitch-btn">Autoswitch</a><!--
--><a href="/settings.php" class="settings-btn #nav-btn #settings-btn">Settings</a><!--
--><a href="/updates.php" class="updates-btn #nav-btn #updates-btn">Updates</a><!--
--><a href="/support.php" class="support-btn #nav-btn #support-btn">Support</a>
</div>