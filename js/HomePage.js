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

  
  TVRO.getGps().then(function(xml) {
      var latitude  = $('lat', xml).text();
      var longitude = $('lon', xml).text();

      source = $('source', xml).text();
      city   = $('city', xml).text();

      if(source === 'CLIENT') {
          TVRO.getClientGps().then(function(clientGpsData){

              TVRO.setGps({
                  source: 'CLIENT',
                  lat: clientGpsData[0],
                  lon: clientGpsData[1]
              }).then(TVRO.setDateTime(clientGpsData[2]));
          });
      }
  });

  var reload = function() {
    headerView.reload();
    installedSatView.reload();
    vesselView.reload();

    TVRO.getAntennaStatus().then(function(xml) {
      var latitude = $('gps lat', xml).text();
      var longitude = $('gps lon', xml).text();      
      var source = $('gps source', xml).text();
      var state = $('gps state', xml).text();
      
      var latLonArray = TVRO.formatGPS('homePage',latitude,longitude);

      // Only display state if an Error
      if (state === 'ERROR'){
        $('.\\#gps-state').text(state);
      }

      $('.\\#gps-latitude').text(latLonArray[0]);
      $('.\\#gps-longitude').text(latLonArray[1]);
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

  TVRO.getAntModel().then(function(model) {
    $('.\\#ant-model').text(model);
  });

  TVRO.getGroupMode().then(function(groupMode) {
    //  if group mode, show sat switching, autoswitch master, installed group
    $('.\\#sat-switching-view').toggle(groupMode);
    $('.\\#master-view').toggle(groupMode);
    $('.\\#manual-installed-group-view').toggle(groupMode);
    $('.\\#automatic-installed-group-view').toggle(groupMode);
    setInterval(reload, 1000);
    reload();
  });
});