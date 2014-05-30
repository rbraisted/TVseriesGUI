$(function() {

  var headerView = TVRO.HeaderView($('.\\#header-view'));

  //  no routing on this page

  //  $on === isManual === get_autoswitch_status <enable>N</enable>
  var satSwitchingBtn = TVRO.ToggleBtn($('.\\#sat-switching-btn'))
    .onClick(function(isManual) {
      TVRO.setAutoswitchEnabled(!isManual).then(reload);
    });

  var installedSatView = TVRO.InstalledSatView($('.\\#installed-sat-view'));
  var masterView = TVRO.MasterView($('.\\#master-view'));
  var manualInstalledGroupView = TVRO.InstalledGroupView($('.\\#manual-installed-group-view'));
  var automaticInstalledGroupView = TVRO.InstalledGroupView($('.\\#automatic-installed-group-view'));
  var vesselView = TVRO.VesselView($('.\\#vessel-view'));

  var reload = function() {
    headerView.reload();
    installedSatView.reload();
    vesselView.reload();

    TVRO.getAntennaStatus().then(function(xml) {
      var latitude = $('gps lat', xml).text();
      var longitude = $('gps lon', xml).text();      
      var source = $('gps source', xml).text();      
      $('.\\#gps-latitude').text(TVRO.formatLatitude(latitude, 4));
      $('.\\#gps-longitude').text(TVRO.formatLongitude(longitude, 4));
      $('.\\#gps-source').text(source);
    });

    TVRO.getGroupMode().then(function(groupMode) {
      
      if (!groupMode) return;

      TVRO.getAutoswitchEnabled().then(function(enabled) {
        $('.\\#manual-installed-group-view').toggle(!enabled);
        satSwitchingBtn.setOn(!enabled);
      });

      masterView.reload();
      manualInstalledGroupView.reload();
      automaticInstalledGroupView.reload();
    });
  };

  // initialization stuff

  TVRO.getAntennaVersions().then(function(xml) {
    //  set the ant model name ie TV1, TV3, etc
    var antModel = $('au model', xml).text();
    $('.\\#ant-model').text(antModel);
  });

  TVRO.getGroupMode().then(function(groupMode) {
    //  if group mode, show sat switching, autoswitch master, installed group
    $('.\\#sat-switching-view').toggle(groupMode);
    $('.\\#master-view').toggle(groupMode);
    $('.\\#manual-installed-group-view').toggle(groupMode);
    $('.\\#automatic-installed-group-view').toggle(groupMode);
    setInterval(reload, 3000);
    reload();
  });
});