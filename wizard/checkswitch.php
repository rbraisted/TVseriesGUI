<?
$wiz = 1;
include $_SERVER['DOCUMENT_ROOT'] . '/base.php';
?>

<script type="text/javascript" src="/js/wizard/checkswitch.js"></script>

<div class="view config-1 #config-1-view">
  <div class="view-head">
    <span class="desktop">Run a</span>
    Check Switch Test
  </div>
  <!-- In Wizard for UHD7, for Dish service, change the text in the Configuration 1 - Run a Check Swith Test UI view as described  - Start - UHD7 - STWA-309 -->
  <?php if($antname === 'UHD7') { ?>
    <div class="column">
      Now you need to run a Checkswitch test on all of your receiver(s)
      ( <a class="link" href="javascript:TVRO.showHelp(910)">learn how to run a Check Switch test</a> ).
      Note that if a receiver needs to download a software update, 
      it might take up to 20 minutes. Otherwise, it will take just 
      a few minutes to complete the process. When the test is complete, 
      click Next.
    </div>
  <?php } else { ?>
    <div class="column">
      Now you need to run a Check Switch test on your receiver
      ( <a class="link" href="javascript:TVRO.showHelp(910)">learn how to run a Check Switch test</a> ).
      Note that if the receiver needs to download a software update,
      it might take up to 20 minutes. Otherwise, it will take just
      a few minutes to complete the process. When the test is complete,
      click Next.
      <div class="important">
        Important!
      </div>
      Be sure your vessel/vehicle is stationary while performing this
      test. The Check Switch test will not pass if the vessel/vehicle
      is moving.
    </div>
  <?php }  ?>
  <!-- In Wizard for UHD7, for Dish service, change the text in the Configuration 1 - Run a Check Swith Test UI view as described  - End - UHD7 - STWA-309 -->

  <div class="bottom-bar">
    <div class="prev-btn #prev-btn">Previous</div>
    <div class="next-btn #next-btn">Next</div>
  </div>
</div>

<div class="view config-2 #config-2-view">
  <div class="view-head">
    <span class="desktop">Configuration 2 - Run a</span>
    Check Switch Test
  </div>
    <div class="column">
      Connect each receiver, one at a time, directly to the “Receiver”
      jack on the back of the TV-Hub then run a Check Switch test
      ( <a class="link" href="javascript:TVRO.showHelp(910)">learn how to run a Check Switch test</a> ).
      Note that if the receiver needs to download a software update,
      it might take up to 20 minutes. Otherwise, it will take just a
      few minutes to complete the process. Once you have run a
      Check Switch test on all of your receivers, click Next.
    <div class="important">
      Important!
    </div>
      Be sure your vessel/vehicle is stationary while performing this
      test. The Check Switch test will not pass if the vessel/vehicle
      is moving.
    </div>

  <div class="bottom-bar">
    <div class="prev-btn #prev-btn">Previous</div>
    <div class="next-btn #next-btn">Next</div>
  </div>
</div>

<div class="view config-3 #config-3-view">
  <div class="view-head">
    <span class="desktop">Configuration 3 - Run a</span>
    Check Switch Test
  </div>
    <div class="column">
      Connect each receiver, one at a time, directly to the “Receiver”
      jack on the back of the TV-Hub then run a Check Switch test
      ( <a class="link" href="javascript:TVRO.showHelp(910)">learn how to run a Check Switch test</a> ).
      Note that if the receiver needs to download a software update,
      it might take up to 20 minutes. Otherwise, it will take just a
      few minutes to complete the process. Once you have run a
      Check Switch test on all of your receivers, click Next.
    <div class="important">
      Important!
    </div>
      Be sure your vessel/vehicle is stationary while performing this
      test. The Check Switch test will not pass if the vessel/vehicle
      is moving.
    </div>

  <div class="bottom-bar">
    <div class="prev-btn #prev-btn">Previous</div>
    <div class="next-btn #next-btn">Next</div>
  </div>
</div>

<div class="view complete-1 #complete-1-view">
  <div class="view-head">
    <span class="desktop">Configuration 1 -</span>
    Check Switch Test Complete
  </div>
  <div class="column first">
    <div class="bullet">1</div>
    <div class="copy">
      Confirm that all receivers and other system devices are
      reconnected as shown in your
      <span class="link #diagram-btn">configuration diagram</span>.
    </div>
  </div><!--
 --><div class="column">
    <div class="bullet">2</div>
    <div class="copy">
      Click Next to continue the Setup Wizard.
    </div>
  </div>

  <div class="bottom-bar">
    <div class="prev-btn #prev-btn">Previous</div>
    <div class="next-btn #next-btn">Next</div>
  </div>
</div>

<div class="view complete-2 #complete-2-view">
  <div class="view-head">
    <span class="desktop">Configuration 2 -</span>
    Check Switch Test Complete
  </div>
  <div class="column first">
    <div class="bullet">2</div>
    <div class="copy">
      Confirm that all receivers and other system devices are
      reconnected as shown in your
      <span class="link #diagram-btn">configuration diagram</span>.
    </div>
  </div><!--
 --><div class="column">
    <div class="bullet">2</div>
    <div class="copy">
      Click Next to continue the Setup Wizard.
    </div>
  </div>

  <div class="bottom-bar">
    <div class="prev-btn #prev-btn">Previous</div>
    <div class="next-btn #next-btn">Next</div>
  </div>
</div>

<div class="view complete-3 #complete-3-view">
  <div class="view-head">
    <span class="desktop">Configuration 3 -</span>
    Check Switch Test Complete
  </div>
  <div class="column first">
    <div class="bullet">3</div>
    <div class="copy">
    Confirm that all of your receivers and other devices are connected
    properly for your particular configuration. Refer to the Installation
    Guide for details. When you are done, click Next to continue.
      <span class="link #diagram-btn">configuration diagram</span>.
    </div>
  </div><!--
 --><div class="column">
    <div class="bullet">2</div>
    <div class="copy">
      Click Next to continue the Setup Wizard.
    </div>
  </div>

  <div class="bottom-bar">
    <div class="prev-btn #prev-btn">Previous</div>
    <div class="next-btn #next-btn">Next</div>
  </div>
</div>

<div class="popup diagram-1 #diagram-1-view">
  <div class="popup-guts">
    <div class="view-head">
      <span>Configuration 1</span>
      <div class="back-btn #back-btn"></div>
    </div>
    <img src="/images/wizard-config-1.svg" class="diagram-image">
  </div>
</div>

<div class="popup diagram-2 #diagram-2-view">
  <div class="popup-guts">
    <div class="view-head">
      <span>Configuration 2</span>
      <div class="back-btn #back-btn"></div>
    </div>
    <img src="/images/wizard-config-2.svg" class="diagram-image">
  </div>
</div>

<div class="popup diagram-3 #diagram-3-view">
  <div class="popup-guts">
    <div class="view-head">
      <span>Configuration 3</span>
      <div class="back-btn #back-btn"></div>
    </div>
    <img src="/images/wizard-config-3.svg" class="diagram-image">
  </div>
</div>