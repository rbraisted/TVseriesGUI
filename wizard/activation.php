<?
$wiz = true;
include $_SERVER['DOCUMENT_ROOT'] . '/base.php';
?>

<script type="text/javascript" src="/js/wizard/activation.js"></script>

<div class="view generic-activation #generic-activation-view">
  <div class="view-head">Activate the Receiver(s)</div>
  <div class="copy">
    Make sure your receivers are activated and ready to receive.
  </div>
  <div class="bottom-bar">
    <div class="prev-btn #prev-btn">Previous</div>
    <div class="next-btn #next-btn">Next</div>
  </div>
</div>

<div class="view directv-activation #directv-activation-view">
  <div class="view-head">Activate the DIRECTV Receiver(s)</div>

  <!-- In Wizard for UHD7, on Activate the DIRECTV Receiver(s), modify the text  - Start - UHD7 - STWA-306 -->
  <?php if($antname === 'UHD7') { ?>
    <div class="column first center">
      <div class="headline">DIRECTV SWM Receivers/DVRs</div>
      <div class="copy">
        Set each receiver’s Dish Type to “SL3 LNB” and RB/INTL to “None Selected”. 
        The Switch Type should default to “SWM Module 15 CH”.
      </div>
    </div> 
  <?php } else { ?>
    <div class="column first">
      <div class="headline">DIRECTV SWM Receivers/DVRs</div>
      <div class="copy">
        Set each receiver's Satellite Dish Type to "3-LNB (18"x20")" and Switch
        Type to "SWM." See your receiver's manual for details. Then make sure
        the antenna is tracking the satellite prior to calling for activation.
      </div>
    </div><!--

  --><div class="column">
      <div class="headline">
        DIRECTV Latin America and Legacy<br>
        DIRECTV Non-SWM Receivers/DVRs
      </div>
      <div class="copy">
        Set each receiver's Satellite Dish Type to "Round" and Switch Type to
        "MultiSwitch." See your receiver's manual for details. Then make sure the
        antenna is tracking the satellite prior to calling for activation.
      </div>
    </div>
  <?php }  ?>
  <!-- In Wizard for UHD7, on Activate the DIRECTV Receiver(s), modify the text  - End - UHD7 - STWA-306 -->

  <a class="link" href="javascript:TVRO.showHelp(907)">Learn how to set the Dish Type</a>

  <div class="cta">Call to preactivate your account:</div>
  <div class="phone">1-866-551-8004</div>
  <div class="time">(24 hours, 7 days a week)</div>
  <div> &nbsp </div>
  <div class="bottom-bar">
    <div class="prev-btn #prev-btn">Previous</div>
    <div class="next-btn #next-btn">Next</div>
  </div>
</div>

<div class="view dish-activation #dish-activation-view">
  <div class="view-head">Activate the DISH Receiver(s)</div>
  <div class="cta">DISH Network Customers</div>
  <div class="cta">Call to preactivate your account:</div>
  <div class="phone">1-800-970-9829</div>
  <div class="time">
       Mon-Fri: 8:00am-10:45pm CST<br>
       Sat-Sun: 9:00am-8:45pm CST
  </div>
  <div class="bottom-bar">
    <div class="prev-btn #prev-btn">Previous</div>
    <div class="next-btn #next-btn">Next</div>
  </div>
</div>

<div class="view bell-activation #bell-activation-view">
  <div class="view-head">Activate the TracVision System!</div>
  <div class="headline">Bell TV Customers</div>
  <div class="copy">* Info specific to Bell TV users about activation to come.</div>
  <div class="cta">Call to preactivate your account:</div>
  <div class="phone">1-866-551-8004</div>
  <div class="time">(24 hours, 7 days a week)</div>
  <div class="bottom-bar">
    <div class="prev-btn #prev-btn">Previous</div>
    <div class="next-btn #next-btn">Next</div>
  </div>
</div>

<div class="view complete-activation #complete-activation-view">
  <div class="view-head">
    Thank you for choosing KVH
  </div>
  <div class="headline">System Setup is complete!</div>
  <div class="copy">
    Please test the system to ensure everything is working properly. Then stow
    the Welcome Kit onboard in an easily accessible location for quick reference
    when needed.
  </div>

  <div class="bottom-bar">
    <div class="exit-btn #exit-btn">Done</div>
  </div>
</div>
