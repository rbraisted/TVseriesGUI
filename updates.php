<? include $_SERVER['DOCUMENT_ROOT'] . '/base.php'; ?>
<script type="text/javascript" src="/js/ajaxfileupload.js"></script>
<script type="text/javascript" src="/js/UpdateView.js"></script>
<script type="text/javascript" src="/js/UpdatesPage.js"></script>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="sidebar">
  <div class="menu-table #menu-table-view">
    <div class="table-row #table-row">
      <div class="table-col">
        <div class="update-label #update-name"></div>
        <div class="connected-label">CONNECTED</div>

        <div class="version-label portal-version-label">
          Latest available version:
          <span class="version #portal-ver">N/A</span>
        </div>

        <div class="version-label antenna-version-label">
          <span class="version #update-req"></span>
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
    <div class="label">Latest <span class ="#update-type"></span> Available</div>
    <div class="version available-label">
      <span class ="#download-type"></span>
      <span class="#portal-ver"></span>
      available to download
    </div>
    <div class="version not-available-label">
      Latest <span class ="#update-type"></span> Version not available
    </div>
    <div class="download-btn #download-btn"></div>
    <div class="cta available-label">Download update</div>
    <div class="cta not-available-label">Not available</div>
  </div>

  <div class="section device-version">

      <div class="bg"></div>
      <div class="label">On User Device</div>
      <div class="version">
        <span class ="#usr-dev-sw"></span>
      </div>

    <div class="install-btn #install-btn">
      <input type="file" id="fileToUpload" name="fileToUpload" class="upload-btn #upload-btn" />
    </div>
    <div class="cta connected-label">
      <span class="not-up-to-date-label">Install Update</span>
      <span class="up-to-date-label">Latest version installed</span>
    </div>
    <div class="cta not-connected-label">Not connected</div>
  </div>

  <div class="section system-version">
    <div class="bg"></div>
    <div class="label">
      My
      <span class="#install-type"></span>
    </div>
    <div class="version connected-label">
      <span class ="#download-type"></span>
      <span class="#system-ver"></span>

      <div class="up-to-date-label">
        Your 
        <span class="#install-type"></span>
        is up-to-date!
      </div>
    </div>
    <div class="version not-connected-label">
      Version not available
    </div>

    <div class="block-btn flash-current-btn #flash-current-btn">Flash Current</div><!--
 --><div class="block-btn flash-all-btn #flash-all-btn">Flash All</div>
  </div>
</div>
