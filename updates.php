<? include $_SERVER['DOCUMENT_ROOT'] . '/base_.php'; ?>
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

        <div class="version-label antenna-version-label">
          Installed Version:
          <span class="version #system-ver">N/A</span>
        </div>

        <div class="version-label portal-version-label">
          Latest Available Version:
          <span class="version #portal-ver">N/A</span>
        </div>

        <div class="version-label device-version-label #device-ver-label">
          Downloaded Version:
          <span class="version #device-ver">N/A</span>
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
    <div class="desktop-version #no-device-ver-label">
      <div class="bg"></div>
      <div class="label">My Computer</div>
    </div>

    <div class="mobile-version #device-ver-label">
      <div class="bg"></div>
      <div class="label">On Device</div>
      <div class="version connected-label">
        Software Version
        <span class="#device-ver"></span>
        ready to install
      </div>
    </div>

    <div class="install-btn #install-btn">
      <input type="file" id="fileToUpload" name="fileToUpload" class="upload-btn #upload-btn" />
    </div>
    <div class="cta connected-label">
      <span class="not-up-to-date-label">Install Update</span>
      <span class="up-to-date-label">Latest Version installed</span>
    </div>
    <div class="cta not-connected-label">Not connected</div>
  </div>

  <div class="section system-version">
    <div class="bg"></div>
    <div class="label">
      My
      <span class="#update-name"></span>
      Antenna Software
    </div>
    <div class="version connected-label">
      Software Version
      <span class="#system-ver"></span>
      installed
    </div>
    <div class="version not-connected-label">
      Version not available
    </div>

    <div class="block-btn flash-current-btn #flash-current-btn">Flash Current</div><!--
 --><div class="block-btn flash-all-btn #flash-all-btn">Flash All</div>
  </div>  
</div>