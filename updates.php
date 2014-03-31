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
        <div class="connected-label #connected-label">CONNECTED</div>

        <div class="version-label antenna-version-label #system-ver-label">
          Antenna S/W Version:
          <span class="version #system-ver">N/A</span>
        </div>

        <div class="version-label portal-version-label">
          Latest Available S/W Version:
          <span class="version #portal-ver">N/A</span>
        </div>

        <div class="version-label device-version-label">
          Downloaded S/W Version:
          <span class="version #device-ver">N/A</span>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="view update #update-view">
  <div class="view-head">
    <span class="#update-name"></span>
    <div class="back-btn #back-btn"></div>
  </div>

  <div class="section portal-version">
    <div class="bg"></div>
    <div class="label">Latest Software Available</div>
    <div class="version">
      Software Version
      <span class="#portal-ver"></span>
      available to download
    </div>
    <div class="download-btn #download-btn"></div>
    <div class="cta">Download Update</div>
  </div>

  <div class="section device-version">
    <div class="bg"></div>
    <div class="desktop">
      <div class="label">My Computer</div>
    </div>
<!--<div class="mobile-version">
      <div class="label">On Device</div>
      <div class="version">Software Version <span id="version"></span> ready to install</div>
    </div> -->
    <a class="install-btn #install-btn">
      <input id="upload" type="file" class="upload-btn">
    </a>
    <div class="cta">Install Update</div>
  </div>

  <div class="section system-version">
    <div class="bg"></div>
    <div class="label">
      My
      <span class="#update-name"></span>
      Antenna Software
    </div>
    <div class="version">
      Software Version
      <span class="#system-ver"></span>
      installed
    </div>  
  </div>  
</div>


<!--
<div id="update-view" class="view main-view #update-view">
  <div class="view-content main-content">
    <a id="back-btn" class="btn back-btn">
      <img src="/images/img.gif">
      <label id="ant-type"></label>
    </a>
    <h1 id="ant-type"></h1>
    <div id="portal" class="p">
      <div class="bg"></div>
      <div class="l">Latest Software Available</div>
      <div class="v">Software Version <span id="version"></span> available to download</div>
      <a id="download-btn" class="btn download-btn"></a>
      <div class="cta">Download Update</div>
    </div>
    <div id="device" class="p">
      <div class="bg"></div>
      <div id="desktop" class="desktop">
        <div class="l">My Computer</div>
      </div>
      <div id="mobile" class="mobile">
        <div class="l">On Device</div>
        <div class="v">Software Version <span id="version"></span> ready to install</div>
      </div>
      <a id="install-btn" class="btn install-btn">
        <input id="upload" type="file" class="upload-btn">
      </a>
      <div class="cta">Install Update</div>
    </div>
    <div id="system" class="p">
      <div class="bg"></div>
      <div class="l">My <span id="ant-type"></span> Antenna Software</div>
      <div class="v">Software Version <span id="version"></span> installed</div>  
    </div>
  </div>
</div>
-->