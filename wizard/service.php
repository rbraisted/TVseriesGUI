<?
$wiz = true;
include $_SERVER['DOCUMENT_ROOT'] . '/base.php';
?>

<script type="text/javascript" src="/js/wizard/service.js"></script>



<div class="view spinner-view #spinner-view">
  <div class="view-head">Installing Satellites</div>
  <div class="headline">Please wait while your satellites are being installed...</div>
  <img src="/images/spinner.gif" class="spinner" />
</div>



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


<div class="view service-subtype #service-subtype-view">
  <div class="view-head">Choose the Active Service</div>
  <div class="headline">Which service do you want the antenna to track now?</div>
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



<!-- <div class="view local-channels #local-channels-view"> -->
<!--   <div class="view-head">Local Channels</div> -->

<!--   <div class="note"> -->
<!--     If the channels for your local TV stations are broadcast on the 119 -->
<!--     satellite, then you can choose to install that satellite now. -->
<!--     Otherwise, click Next to continue with your system setup. -->
<!--   </div> -->

<!--   <div class="block-btn #install-btn">Install DIRECTV Satellite 119</div> -->
<!--   <br> -->
<!--   <span class="link #cityDropdown">Find out which channels are carried on the 119 satellite.</span> -->

<!--   <div class="bottom-bar"> -->
<!--     <div class="prev-btn #prev-btn">Previous</div> -->
<!--     <div class="next-btn #next-btn">Next</div> -->
<!--   </div> -->

<!-- </div> -->

 <div class="popup cities-119 #cities-119-view">
  <div class="popup-guts">
    <div class="view-head">
      <span class="mobile">Satellite 119 </span>Cities<span class="desktop"> for DIRECTV Satellite 119 Local Channels</span>
      <div class="back-btn #back-btn"></div>
    </div>
    <div class="cities">
      <?PHP
        $file_handle = fopen("cities.csv", "r");

        while (!feof($file_handle) ) {

          $line_of_text = fgetcsv($file_handle, 1024);

          print $line_of_text[0] . ", " . $line_of_text[1] . "<BR>";
        }

        fclose($file_handle);
      ?>
    </div>
  </div>
</div>


<div class="view directv #directv-view">
  <div class="view-head">DIRECTV</div>
  <div class="headline">Success! You’re now setup for all your DIRECTV programming!</div>
  <div class="link #cityDropdown" align="center">See which cities have their local channels on 119W.</div>
  <br>
  <div class="grey-box-table #table-view">
    <div class="table-row #table-row">
      <div class="title #title"></div>
      <div class="copy #copy"></div>
      <div class="radio-icon"></div>
    </div>
  </div>

  <div class="bottom-bar">
    <div class="prev-btn #prev-btn">Previous</div>
    <div class="next-btn #next-btn">Next</div>
  </div>
</div>



<div class="view dish-network #dish-network-view">
  <div class="view-head">DISH NETWORK</div>
  <div class="#groups-view">
    <div class="headline">Choose your DISH Network satellites.</div>
    <div class="clear-table #table-view">
      <div class="table-row #table-row">
        <span class="table-col install-btn"></span><!--
      --><span class="table-col #value"></span>
      </div>
    </div>
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

  <a href="javascript:TVRO.showHelp(901);" class="link">
    Learn more about these satellite options.
  </a>

  <div class="bottom-bar">
    <div class="prev-btn #prev-btn">Previous</div>
    <div class="next-btn #next-btn">Next</div>
  </div>
</div>

<div class="view checkswitch-spinner-view #checkswitch-spinner-view">
  <div class="view-head">Installing Satellites</div>
  <div class="headline">Please wait while your satellites are being installed...</div>
  <br>
  <p class="headline checkswitch-status #checkswitch-status"></p>
  <img src="/images/spinner.gif" class="spinner" />
</div>