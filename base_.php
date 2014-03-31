<!DOCTYPE html>
<html>
  <head>
    <title>v 0.3</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0" />

    <meta http-equiv="cache-control" content="max-age=0" />
    <meta http-equiv="cache-control" content="no-cache" />
    <meta http-equiv="expires" content="0" />
    <meta http-equiv="expires" content="Tue, 01 Jan 1980 1:00:00 GMT" />
    <meta http-equiv="pragma" content="no-cache" />

    <!-- for codekit, since we must include css in head or codekit live reload doesnt work -->
    <link type="text/css" rel="stylesheet" href="/css/<?=basename($_SERVER['SCRIPT_FILENAME'], '.php')?>.css">

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

  <body>

<!-- header/nav
- -- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="header #header-view">
  <div class="status-btn #status-btn">
    <div class="status-light power-status #power-status"></div><!--
 --><div class="status-light acu-status #acu-status"></div><!--
 --><div class="status-light antenna-status #antenna-status"></div>
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

  <div class="tracvision-logo"></div>
</div>

<div class="status #status-view">
  <div class="status-label">
    Power: 
    <span class="power-status #power-status">OK</span>
  </div><!--
--><div class="status-label">
    Control Unit: 
    <span class="acu-status #acu-status">OK</span>
  </div><!--
--><div class="status-label">
    Antenna Status: 
    <span class="antenna-status #antenna-status">OK</span>
  </div>
</div>

<div class="nav #nav-view">
  <a href="/home.php" class="home-btn #home-btn">Home</a><!--
--><a href="/satellites.php" class="sat-btn #sat-btn">Satellites</a><!--
--><a href="/autoswitch.php" class="autoswitch-btn #autoswitch-btn">Autoswitch</a><!--
--><a href="/settings.php" class="settings-btn #settings-btn">Settings</a><!--
--><a href="/updates.php" class="updates-btn #updates-btn">Updates</a><!--
--><a href="/support.php" class="support-btn #support-btn">Support</a>
</div>
