<?
$wiz = true;
include $_SERVER['DOCUMENT_ROOT'] . '/base_.php';
?>

<script type="text/javascript" src="/js/wizard/service.js"></script>



<div class="view service-provider #service-provider-view">
  <div class="view-head">Service Provider</div>
  
  <div class="headline">Choose your satellite TV service provider.</div>

  <div class="clear-table #table-view">
    <div class="table-row #table-row">
      <span class="table-col install-btn"></span><!--
    --><span class="table-col #value"></span>
    </div>
  </div>

  <div class="bottom-bar">
    <div class="prev-btn #prev-btn">Previous</div>
    <div class="next-btn #next-btn">Next</div>
  </div>
</div>



<div class="view local-channels #local-channels-view">
  <div class="view-head">Local Channels</div>

  <div class="note">
    If the channels for your local TV stations are broadcast on the 119
    satellite, then you can choose to install that satellite now.
    Otherwise, click Next to continue with your system setup.
  </div>

  <div class="block-btn #install-btn">Install DIRECTV Satellite 119</div>
  <br>
  <div class="link">Find out which channels are carried on the 119 satellite.</div>

  <div class="bottom-bar">
    <div class="prev-btn #prev-btn">Previous</div>
    <div class="next-btn #next-btn">Next</div>
  </div>
</div>



<div class="view directv #directv-view">
    <div class="view-head">DIRECTV</div>
    <div class="tac dfs21 mfs16 mlh1.6 mt3 mb3">Success! You’re now setup for all your DIRECTV programming!</div>

    <div class="tac">
      <div id="radio-option" value="SINGLE" class="wiz-opt cp">
        <div class="dfs21 mfs11 wiz-opt-title">Single Satellite</div>
        <div class="tal dfs13 mfs13 dlh1.6 mlh1.6 wiz-opt-copy">
          For programming on the 101 satellite, you are ready to activate
          your system!
        </div>
        <div class="radio-icon wiz-opt-radio"></div>
      </div><!--
     --><div id="radio-option" value="MANUAL" class="wiz-opt cp">
        <div class="dfs21 mfs11 wiz-opt-title">Manual Switching</div>
        <div class="tal dfs13 mfs13 dlh1.6 mlh1.6 wiz-opt-copy">
          For programming on the 101 & 119 satellites with manual switching
          between them, you are ready to activate your system!
        </div>
        <div class="radio-icon wiz-opt-radio"></div>
      </div><!--
     --><div id="radio-option" value="AUTOMATIC" class="wiz-opt cp">
        <div class="dfs21 mfs11 wiz-opt-title">Automatic Switching</div>
        <div class="tal dfs13 mfs13 dlh1.6 mlh1.6 wiz-opt-copy">
          For programming on the 101 & 119 satellites with automatic switching
          between them, you need to set up the system for automatic switching.
        </div>
        <div class="radio-icon wiz-opt-radio"></div>
      </div>
    </div>

  <div class="bottom-bar">
    <div class="prev-btn #prev-btn">Previous</div>
    <div class="next-btn #next-btn">Next</div>
  </div>
</div>



<div class="view dish-network #dish-network-view">
  <div class="view-head">DISH Network</div>

  <div class="#groups-view">
    <div class="headline">Choose your DISH Network satellites.</div>
    <div class="clear-table #table-view">
      <div class="table-row #table-row">
        <span class="table-col install-btn"></span><!--
     --><span class="table-col #value"></span>
      </div>
    </div>
    <div class="link">Learn more about these satellite options.</div>
  </div>

  <div class="#sats-view">
    <div class="headline">Choose your DISH Network satellite.</div>
    <div class="clear-table #table-view">
      <div class="table-row #table-row">
        <span class="table-col install-btn"></span><!--
     --><span class="table-col #value"></span>
      </div>
    </div>
  </div>

  <div class="bottom-bar">
    <div class="prev-btn #prev-btn">Previous</div>
    <div class="next-btn #next-btn">Next</div>
  </div>
</div>



<div class="view spinner #spinner-view">
    <div class="view-head">Installing Satellites</div>
    <div class="note">
      Please wait while your satellites are being installed...
    </div>
    <div class="spinner #spinner"></div>
  </div>
</div>