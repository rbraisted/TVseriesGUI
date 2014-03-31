<? include $_SERVER['DOCUMENT_ROOT'] . '/base_.php'; ?>

<script type="text/javascript" src="/js/SystemInfoView.js"></script>
<script type="text/javascript" src="/js/OperationalLogView.js"></script>
<script type="text/javascript" src="/js/EventLogView.js"></script>
<script type="text/javascript" src="/js/RestartSystemView.js"></script>
<script type="text/javascript" src="/js/CommandLineView.js"></script>

<script type="text/javascript" src="/js/SupportPage.js"></script>

<!-- sidebar
- -- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="sidebar">

	<div class="menu-table #menu-table-view">
		<div class="table-row #table-row">
			<div class="table-col #menu-item"></div>
		</div>
	</div>

	<div class="contact-header">Technical Support</div>

	<div class="contact-region">North/South America, Australia, New Zealand</div>
	<a href="mailto:support@kvh.com" class="block-btn">support@kvh.com</a>
	<a href="tel:+1 (401) 847-3327" class="block-btn">+1 401 847-3327</a>

	<div class="contact-region">Africa, Asia, Europe, Middle East</div>
	<a href="mailto:support@emea.kvh.com" class="block-btn">support@emea.kvh.com</a>
	<a href="tel:+45 45 160 180" class="block-btn">+45 45 160 180</a>

</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="view system-info #system-info-view">
  <div class="view-head">
    System Info
    <div class="back-btn #back-btn"></div>
  </div>

  <div class="tv-hub">
    <div class="view-head">TV-Hub</div>
    <span class="label">S/N</span><span class="value #hub-sn"></span>
    <span class="label">Date/Time</span><span class="value #date-time"></span>
    <span class="label">Version</span><span class="value #hub-ver"></span>
    <span class="label">Web UI Version</span><span class="value #webui-ver"></span>
    <span class="label">Satellite Library Version</span><span class="value #sat-ver"></span>
    <span class="label">Satellite Service</span><span class="value #sat-service"></span>
    <span class="label">Support IP</span><span class="value #gprs-ip"></span>
    <span class="label">DiSEqC Version</span><span class="value #diseqc-ver"></span>
    <span class="label">IP Autoswitch Version</span><span class="value #ipautosw-ver"></span>
  </div>
  
  <div class="antenna-unit">
    <div class="view-head">Antenna Unit</div>
    <span class="label">Model</span><span class="value #ant-model"></span>
    <span class="label">S/N</span><span class="value #ant-sn"></span>
    <span class="label">Main Version</span><span class="value #ant-ver"></span>
    <span class="label">RF Version</span><span class="value #rf-ver"></span>
    <span class="label">FPGA Version</span><span class="value #fpga-ver"></span>
    <span class="label">AZ/EL Version</span><span class="value #az-ver"></span>
    <span class="label">SKEW Version</span><span class="value #skew-ver"></span>
    <span class="label">LNB Type</span><span class="value #lnb-name"></span>
    <span class="label">LNB Version</span><span class="value #lnb-ver"></span>
  </div>  
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="view operational-log #operational-log-view">
	<div class="view-head">
		Operational Log
		<div class="back-btn #back-btn"></div>
	</div>

	<p>
    When initiated, the Operational Log records all messages generated by the
    antenna system.
  </p>

	<div class="block-btn view-curr-log-btn #view-btn">
		View Current Log
	</div>

	<p>
    Choose this option to view the current Operational Log.
  </p>

	<div class="block-btn start-new-log-btn #start-btn">
		Start New Log
	</div>

	<p>
    Choose this option to delete the current Operational Log and begin
    recording a new one.
  </p>

	<div class="block-btn restart-btn #restart-btn">
		Restart System & Start New Log
	</div>

	<p>
    Choose this option to delete the current Operational Log, restart the
    antenna, and begin recording a new Operational Log that includes startup
    self-test results. This information is very useful for diagnostics.
  </p>

	</div>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="view event-log #event-log-view">
	<div class="view-head">
		Event Log
		<div class="back-btn #back-btn"></div>
	</div>

	<p>
    The Event Log keeps a historical record of all major system events,
    including any error messages generated by the system.
  </p>

	<div class="event-table #event-table-view">
		<div class="table-head #table-head">
			<div class="table-col date-col #event-date">Date/Time</div><!--
		--><div class="table-col message-col message #event-message">Message</div>
		</div>
		<div class="table-row #table-row">
			<div class="table-col date-col #event-date"></div><!--
		--><div class="table-col message-col message #event-message"></div>
		</div>
	</div>

	<div class="btn-tray">
		<div id="" class="block-btn save-btn #save-btn">Save Log</div>
		<div id="" class="block-btn email-btn #email-btn">Email Log</div>
 	</div>

</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="view restart-system #restart-system-view">
	<div class="view-head">
		Restart System
		<div class="back-btn #back-btn"></div>
	</div>

<!-- this may come back one day -->
<!--
  <div class="block-btn restart-hub-btn #system-btn">
		Restart TV-Hub
	</div>
	<p>
    Choose this option to restart just the TV-Hub.
  </p>
-->

	<div class="block-btn restart-ant-btn #antenna-btn">
		Restart Antenna
	</div>
	<p>
    Choose this option to restart just the antenna.
  </p>

	<div class="block-btn restart-all-btn #all-btn">
		Restart All
	</div>
	<p>
    Choose this option to restart the entire system, both TV-Hub and antenna.
  </p>

</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->

<div class="view command-line #command-line-view">
	<div class="view-head">
		Command Line
		<div class="back-btn #back-btn"></div>
	</div>

	<p>
    Improper use of antenna commands can directly impact performance.
    Only KVH-authorized technicians should use this interface.
  </p>

	<!-- src set in CmdLineView -->
	<iframe src="" class="output #output"></iframe>
	<div class="btn-tray">
		<input placeholder="Enter your commands here." class="input #input" /><!--
	--><div class="block-btn #send-btn">Send</div>
	</div>
</div>

<!-- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -->
	</body>
</html>