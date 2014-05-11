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
    <link type="text/css" rel="stylesheet" href="css/updates.css">
    

    <script type="text/javascript" src="js/jquery-1.10.2.min.js"></script>
    <script type="text/javascript" src="js/fastclick.js"></script>

    <script type="text/javascript" src="js/lodash.min.js"></script>
    <script src="js/promise-3.2.0.js"></script>

    <script type="text/javascript" src="js/TVRO.js"></script>
    
    <script type="text/javascript" src="js/Cookies.js"></script>
    <script type="text/javascript" src="js/WebService.js"></script>
    <script type="text/javascript" src="js/Models.js"></script>

    <script type="text/javascript" src="js/ToggleBtn.js"></script>
    <script type="text/javascript" src="js/TableView.js"></script>
    <script type="text/javascript" src="js/DropdownView.js"></script>

    <script type="text/javascript" src="js/HeaderView.js"></script>

    <script type="text/javascript" src="js/ajaxfileupload.js"></script>
    <script type="text/javascript" src="js/UpdateView.js"></script>
    <script type="text/javascript" src="js/UpdatesPage.js"></script>

  </head>

  <body class>




<!-- header
- -- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="header #header-view">
  <div class="tracvision-logo #home-btn"></div>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="sidebar">
  <div class="menu-table #menu-table-view">
    <div class="table-row #table-row">
      <div class="table-col">
        <div class="update-label #update-name"></div>
        <div class="connected-label">CONNECTED</div>

        <div class="version-label portal-version-label">
          Latest Available Version:
          <span class="version #portal-ver">N/A</span>
        </div>

        <div class="version-label device-version-label #device-ver-label">
          Downloaded Version:
          <span class="version #device-ver">N/A</span>
        </div>

        <div class="version-label antenna-version-label">
          Installed Version:
          <span class="version #system-ver">N/A</span>
        </div>

      </div>
    </div>
  </div>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="view update #update-view">
  <div class="view-head">
    <span class="updates-icon"></span>
    <span class="#update-name"></span>
    Update
    <div class="back-btn #back-btn"></div>
  </div>

  <div class="section portal-version">
    <div class="bg"></div>
    <div class="label">Latest Software Available</div>
    <div class="version available-label">
      Software Version
      <span class="#portal-ver"></span>
      available to download
    </div>
    <div class="version not-available-label">
      Latest Software Version not available
    </div>
    <div class="download-btn #download-btn"></div>
    <div class="cta available-label">Download Update</div>
    <div class="cta not-available-label">Not available</div>
  </div>

  <div class="section device-version">
    <div class="mobile-version #device-ver-label">
      <div class="bg"></div>
      <div class="label">On Device</div>
      <div class="version">
        Software Version
        <span class="#device-ver"></span>
        downloaded
      </div>
    </div>
  </div>

</div>