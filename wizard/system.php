<?
// include $_SERVER['DOCUMENT_ROOT'] . '/wizard.php';
$wiz = 1;
include $_SERVER['DOCUMENT_ROOT'] . '/base_.php';
?>
<script type="text/javascript" src="/js/wizard/system.js"></script>


<div class="view skew-angle #skew-angle-view">
  <div class="view-head">Set Skew Angle</div>
  <div class="column first">
    Based on your selections, the LNB inside the antenna
    needs to be set to the following skew angle:

    <div class="single #single">
      Skew Angle N/A
    </div>

    <div class="skew-table #group">
      <div class="table-head">
        <div class="table-col slot-col">Slot</div><!--
     --><div class="table-col sat-col">Satellite</div><!--
     --><div class="table-col skew-col">Skew Angle</div>
      </div>
      <div class="table-row #sat-a-view">
        <div class="table-col slot-col">A</div><!--
     --><div class="table-col sat-col #sat-name">N/A</div><!--
     --><div class="table-col skew-col #sat-skew">N/A</div>
      </div>
      <div class="table-row #sat-b-view">
        <div class="table-col slot-col">B</div><!--
     --><div class="table-col sat-col #sat-name">N/A</div><!--
     --><div class="table-col skew-col #sat-skew">N/A</div>
      </div>
      <div class="table-row #sat-c-view">
        <div class="table-col slot-col">C</div><!--
     --><div class="table-col sat-col #sat-name">N/A</div><!--
     --><div class="table-col skew-col #sat-skew">N/A</div>
      </div>
      <div class="table-row #sat-d-view">
        <div class="table-col slot-col">D</div><!--
     --><div class="table-col sat-col #sat-name">N/A</div><!--
     --><div class="table-col skew-col #sat-skew">N/A</div>
      </div>
    </div>

    <div class="important">
      Important!
    </div>

    Do not attempt to adjust the LNB with the antenna powered on.
    The antenna’s moving parts can cause injury. Just note the skew
    angle for now. When you complete the wizard, disconnect power
    from the antenna then adjust the LNB to the proper skew angle.
  </div><!--
--><div class="column">
    <img src="/images/wizard-skew.svg" class="skew-image">
    <a href="javascript:TVRO.showHelp(902);" class="link">
      Learn how to adjust the LNB’s skew angle.
    </a>
  </div>

  <div class="bottom-bar">
    <a class="prev-btn #prev-btn">Previous</a>
    <a class="next-btn #next-btn">Next</a>
  </div>
</div>



<div class="view linear-system-config #linear-system-config-view">
  <div class="view-head">
    <span class="desktop">Choose Your </span>System Configuration
  </div>
  <div class="copy">
    Choose the configuration that most closely resembles
    the one on your vessel.
  </div>

  <div class="clear-table #table-view">
    <div class="table-row #table-row">
      <span class="table-col install-col install-btn"></span><!--
   --><span class="table-col content-col">
        <span class="title #title"></span>
        <span class="desktop">:</span>
        <br class="mobile">
        <span class="subtitle #subtitle"></span>
      </span><!--
   --><span class="table-col info-col info-btn #info-btn"></span>
    </div>
  </div>

  <div class="bottom-bar">
    <a class="prev-btn #prev-btn">Previous</a>
    <a class="next-btn #next-btn">Next</a>
  </div>  
</div>



<div class="view other-system-config #other-system-config-view">
  <div class="view-head">
    <span class="desktop">Choose Your </span>System Configuration
  </div>
  <div class="copy">
    Choose the configuration that most closely resembles
    the one on your vessel.
  </div>

  <div class="grey-box-table #table-view">
    <div class="table-row #table-row">
      <div class="title #title"></div>
      <div class="image #image"></div>
      <div class="subtitle #subtitle"></div>
      <div class="radio-icon"></div>
    </div>
  </div>

  <div class="bottom-bar">
    <a class="prev-btn #prev-btn">Previous</a>
    <a class="next-btn #next-btn">Next</a>
  </div>  
</div>




<div class="popup diagram-1 #diagram-1-view">
  <div class="popup-guts">
    <div class="view-head">
      <span>Configuration 1</span>
      <div class="back-btn #back-btn"></div>
    </div>
    <img src="/images/wizard-diagram-1.svg" class="diagram-image">
  </div>
</div>  

<div class="popup diagram-2 #diagram-2-view">
  <div class="popup-guts">
    <div class="view-head">
      <span>Configuration 2</span>
      <div class="back-btn #back-btn"></div>
    </div>
    <img src="/images/wizard-diagram-2.svg" class="diagram-image">
  </div>
</div>  

<div class="popup diagram-3 #diagram-3-view">
  <div class="popup-guts">
    <div class="view-head">
      <span>Configuration 3</span>
      <div class="back-btn #back-btn"></div>
    </div>
    <img src="/images/wizard-diagram-3.svg" class="diagram-image">
  </div>
</div>  

<div class="popup diagram-4 #diagram-4-view">
  <div class="popup-guts">
    <div class="view-head">
      <span>Configuration 4</span>
      <div class="back-btn #back-btn"></div>
    </div>
    <img src="/images/wizard-diagram-4.svg" class="diagram-image">
  </div>
</div>