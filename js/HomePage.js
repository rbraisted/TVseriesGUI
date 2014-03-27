$(function() {

  //  no routing on this page
  
  var vesselView = TVRO.VesselView($('.\\#vessel-view'));

  //  $on === isManual
  var satSwitchingBtn = TVRO.ToggleBtn($('.\\#sat-switching-btn'))
    .onClick(function(isManual) {
      TVRO.setAutoswitchService({
        enable: isManual ? 'N' : 'Y'
      }).then(function() {
        $('.\\#manual-installed-group-view').toggle(isManual);
        reload();
      });
    });

  var installedSatView = TVRO.InstalledSatView($('.\\#installed-sat-view'));
  var manualInstalledGroupView = TVRO.InstalledGroupView($('.\\#manual-installed-group-view'));
  var automaticInstalledGroupView = TVRO.InstalledGroupView($('.\\#automatic-installed-group-view'));

  var reload = function() {
    //  force recache
    //  it's getAntennaStatus(params:Obj, recache:Bool)
    TVRO.getAntennaStatus({}, 1).then(function(xml) {
      var latitude = $('gps lat', xml).text();
      var longitude = $('gps lon', xml).text();
      $('.\\#gps-latitude').text(TVRO.formatLatitude(latitude, 3));
      $('.\\#gps-longitude').text(TVRO.formatLongitude(longitude, 3));

      vesselView.reload();
      installedSatView.reload();
      manualInstalledGroupView.reload();
      automaticInstalledGroupView.reload();
    });
  };


  // initialization

  TVRO.getAntennaVersions().then(function(xml) {
    var isManual = $('autoswitch enable', xml).text() === 'Y';
    var antModel = $('au model', xml).text();

    satSwitchingBtn.setOn(isManual);
    $('.\\#manual-installed-group-view').toggle(isManual);
    $('.\\#ant-model').text(antModel);
  });

  setInterval(reload, 3000);
  reload();
  
});