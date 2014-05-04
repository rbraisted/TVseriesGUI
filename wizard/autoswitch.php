<?
$wiz = 1;
include $_SERVER['DOCUMENT_ROOT'] . '/base_.php';
?>

<script type="text/javascript" src="/js/ReceiverTableView.js"></script>
<script type="text/javascript" src="/js/ReceiverInfoView.js"></script>
<script type="text/javascript" src="/js/ReceiverEditView.js"></script>

<script type="text/javascript" src="/js/wizard/autoswitch.js"></script>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="view receiver-table-view #receiver-table-view">
  <div class="view-head">AutoSwitching Setup</div>

  <div class="copy #ip-autoswitch">
    The following IP AutoSwitch(es) have been found or were previously
    configured on your network. The receiver connected to the master IP
    AutoSwitch controls satellite selection in automatic satellite
    switching mode. You may choose the master by selecting it below or
    by pressing the
    <a class="link" href="/media/IPAS_Master_Select_Button.png">
     Master Select button
    </a>
    on the IP AutoSwitch itself,
    provided it is currently active on the network (status is green).
    Assign a unique name to each IP AutoSwitch so you can easily identify
    it later.
    <div class="note">
      Hint: To determine the location of an IP AutoSwitch, press its
      Master Select button. That IP AutoSwitch will then become the
      master in the list below.
    </div>
  </div>

  <div class="copy #directv">
    The following receivers have been set up for automatic satellite
    switching. The master receiver controls satellite selection. You may
    choose the master by selecting it below. To add a receiver to the
    list, enter its IP address and assign it a unique name.
    <a class="link" href="/media/DTV_FindIPaddress.mp4">
      Find your receiver’s IP address.
    </a>
    <div class="note">
      Note: Receiver must be activated to view its IP address. The
      receiver also must be set up to allow external access before it
      will communicate with the TV-Hub.
      <a class="link" href="/media/DTV_ExternalControl.mp4">
        Learn how to enable external access on your DIRECTV receiver.
      </a>
    </div>
  </div>

  <div class="receiver-table #table-view">
    <div class="table-row #table-row">
      <div class="table-col select-col">
        <div class="label">Master</div>
        <div class="select-icon #select-btn"></div>
      </div><!--
   --><div class="table-col status-col">
        <div class="label">Status</div>
        <div class="status-icon"></div>
      </div><!--
   --><div class="table-col name-col">
        <div class="label #receiver-name-label"></div>
        <div class="value #receiver-name"></div>
      </div><!--
   --><div class="table-col id-col">
        <div class="label #receiver-id-label"></div>
        <div class="value #receiver-id"></div>
      </div><!--
   --><div class="table-col edit-col">
        <div class="block-btn edit-btn #edit-btn">Edit</div>
      </div>
    </div>
  </div>

  <div class="block-btn new-btn #new-btn">
    Add
    <span class="#receiver-type"></span>
  </div><!--
--><div class="come-back-copy copy">
    You can come back to this later if you are not ready to finish the AutoSwitching setup.
  </div>

  <div class="bottom-bar">
    <div class="prev-btn #prev-btn">Previous</div>
    <div class="next-btn #next-btn">Next</div>
  </div>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="popup #receiver-info-view">
  <div class="popup-guts receiver-info">
    <div class="view-head">
      <span class="autoswitch-icon"></span>
      <span class="#ip-autoswitch">IP AutoSwitch</span>
      <span class="#directv">Receiver</span>
      <div class="back-btn #back-btn"></div>
    </div>

    <div class="label #receiver-name-label"></div>
    <div class="value #receiver-name"></div>

    <div class="label #receiver-id-label"></div>
    <div class="value #receiver-id"></div>

    <div class="status-icon label">Status</div>

    <div class="btn-tray">
      <div class="block-btn first edit-btn #edit-btn">Edit</div><!--
   --><div class="block-btn select-btn #select-btn">Select</div><!--
   --><div class="master-icon label">Master</div>
    </div>
  </div>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="popup #receiver-edit-view">
  <div class="popup-guts receiver-edit">
    <div class="view-head">
      <span class="autoswitch-icon"></span>
      <span class="#ip-autoswitch">IP AutoSwitch</span>
      <span class="#directv">Receiver</span>
      <div class="back-btn #back-btn"></div>
    </div>

    <div class="label name-label #receiver-name-label"></div>
    <input class="input name-input #receiver-name" />

    <div class="label id-label #receiver-id-label"></div>
    <input class="input id-input #receiver-id" />

    <div class="status-icon label">Status</div>
    <div class="block-btn remove-btn #delete-btn">Remove</div>

    <div class="btn-tray">
      <div class="block-btn cancel-btn first #back-btn">Cancel</div><!--
   --><div class="block-btn save-btn #save-btn">Save</div>
    </div>
  </div>
</div>