!function(TVRO) {
  "use strict";

  //  getSources('nmea0183', xml)
  //  can use for gps and heading sources
  var getSources = function(type, xml) {
    return _.map($(type + ' nmea_message', xml), function(xml) {
      var name = $('nmea_name', xml).text();
      var value = $('heading_value', xml).text();
      var source = $('nmea_source', xml).text();
      var state = $('state', xml).text();
      var selected = $('selected', xml).text() === 'Y';
      var display = (type === 'nmea0183' ? 'NMEA 0183' : 'NMEA 2000') + ' - ' + name;
      return {
        type: type,
        name: name,
        source: source,
        state: state,
        selected: selected,
        display: display
      };
    });
  };

  //  setSource(TVRO.setGpsConfig)
  //  setSource(TVRO.setHeadingConfig)
  //  setSource(TVRO.setHeadingConfig, source)
  var setSource = _.curry(function(webServiceCall, source) {
    //  default - the 'None' option
    var params = {
      nmea0183: { enable: 'N', nmea_source: '' },
      nmea2000: { enable: 'N', nmea_source: '' }
    };

    if (source['type']) {
      params[source.type].enable = 'Y';
      params[source.type].nmea_source = source.source;
    }

    return webServiceCall(params);
  });



  var GpsSourceView = function(jQ) {
    //  use as base for BackupGpsView + VesselLocationView
    var self = TVRO.TableView($('.\\#table-view', jQ));

    var prevBtn = $('.\\#prev-btn', jQ).click(function() {
      //  getProductRegistration - if installer info exists,
      //  go to registration.php#/installer-info
      //  otherwise registration.php#/diy-vessel-info
      TVRO.getProductRegistration().then(function(xml) {
        var company = $('dealer company', xml).text();
        if (company) window.location = '/wizard/registration.php#/installer-info';
        else window.location = '/wizard/registration.php#/diy-vessel-info';
      });
    });

    return _.merge(self, {
      setNmeaSource: setSource(TVRO.setGpsConfig),
      getNmeaSources: function() {
        return TVRO.getGpsConfig().then(function(xml) {
          var nmea0183Sources = getSources('nmea0183', xml);
          var nmea2000Sources = getSources('nmea2000', xml);
          var nmeaSources = nmea0183Sources.concat(nmea2000Sources);
          //  include a 'None' option
          //  see self.onBuild and setNmeaSource
          nmeaSources.push({ display: 'None' });
          return nmeaSources;
        });
      }
    });
  };

  

  var BackupGpsSourceView = function(jQ) {
    var self = GpsSourceView(jQ)
      .onBuild(function(row, value) {
        $('.\\#value', row).text(value.display);
      });

    var nextBtn = $('.\\#next-btn', jQ).click(function() {
      var value = self.getValue();
      if (!value) alert('You must select an option to continue.');
      else self.setNmeaSource(value).then(function() {
        window.location.hash = '/heading-source';
      });
    });

    self.getNmeaSources()
      .then(self.setValues)
      .then(self.build)
      .then(function() {
        var values = self.getValues();
        var value = _.find(values, 'selected') || _.find(values, { display: 'None' });
        self.setValue(value);
        // we don't expect more than 1 one of the options from get_gps_config
        // to have <selected>Y</selected>
      });

    return self;
  };



  var VesselLocationView = function(jQ) {
    var self = GpsSourceView(jQ)
      .onBuild(function(row, value) {
        $('.\\#value', row).text(value.display);
      });

    self.getNmeaSources()
      .then(self.setValues)
      .then(self.build);

    var nextBtn = $('.\\#next-btn', jQ).click(function() {
    //   var value = self.getValue();
    //   if (!value) alert('You must select an option to continue.');
    //   else if (value === 'COORDINATES') window.location.hash = '/heading-source';
    //   else if (value === 'CITY') window.location.hash = '/heading-source';
    //   else self.setNmeaSource().then(function() {
    //     window.location.hash = '/heading-source';
    //   });
    });

    var CoordinatesView = function(jQ) {

    };

    return self;
  };



  var HeadingSourceView = function(jQ) {
    var self = TVRO.TableView($('.\\#table-view', jQ))
      .onBuild(function(row, headingSource) {
        $('.\\#value', row).text(headingSource.display);
      });

    var nextBtn = $('.\\#next-btn', jQ).click(function() {
      var value = self.getValue();
      if (!value) alert('You must select an option to continue.');
      else setSource(TVRO.setHeadingConfig, value)
        .then(function() {
          return Promise.all(
            TVRO.getAntennaVersions(),
            TVRO.getAutoswitchStatus()
          );
        })
        .then(function(xmls) {
          var antModel = $('au model', xmls[0]).text();
          var lnbType = $('lnb polarization', xmls[0]).text();
          var isTriAmericas = $('lnb name', xmls[0]).text() === 'Tri-Americas';
          var isManual = $('available:first', xmls[1]).text() === 'N';

          // CIRCULAR LNB -> select service (service.php)
          if (lnbType === 'circular') window.location = '/wizard/service.php';

          // TV5 + MANUAL -> select satellites (satellites.php)
          else if (antModel === 'TV5' && isManual) window.location = '/wizard/satellites.php#/tv5-manual-options';

          // LINEAR LNB TV5/6 -> select satellites (satellites.php)
          else if (lnbType === 'linear' && (antModel === 'TV5' || antModel === 'TV6')) window.location = '/wizard/satellites.php#/options';

          // TRI AMERICAS -> directv (service.php)
          else if (isTriAmericas) window.location = '/wizard/service.php#/directv';

          else window.location = '/wizard/service.php';
        });
    });


    var prevBtn = $('.\\#prev-btn', jQ).click(function() {
      TVRO.getAntennaVersions().then(function(xml) {
        var antModel = $('au model', xml).text();
        if (antModel === 'TV5' || antModel === 'TV6') window.location.hash = '/backup-gps-source';
        else window.location.hash = '/vessel-location';
      });
    });

    TVRO.getHeadingConfig().then(function(xml) {
      var nmea0183Sources = getSources('nmea0183', xml);
      var nmea2000Sources = getSources('nmea2000', xml);
      var headingSources = nmea0183Sources.concat(nmea2000Sources);
      headingSources.push({ display: 'None' });
      self.setValues(headingSources).build();
    }).then(function() {
      var values = self.getValues();
      var value = _.find(values, 'selected') || _.find(values, { display: 'None' });
      self.setValue(value);
      // don't expect more than 1 option from get_heading_config
      // to be <selected>Y</selected>
    });


    return self;
  };

  TVRO.VesselLocationView = VesselLocationView;
  TVRO.BackupGpsSourceView = BackupGpsSourceView;
  TVRO.HeadingSourceView = HeadingSourceView;

}(window.TVRO);


$(function() {
  var vesselLocationView = TVRO.VesselLocationView($('.\\#vessel-location-view'));
  var backupGpsSourceView = TVRO.BackupGpsSourceView($('.\\#backup-gps-source-view'));
  var headingSourceView = TVRO.HeadingSourceView($('.\\#heading-source-view'));

  TVRO.onHashChange(function(hash) {
    if (!hash)
      TVRO.getAntennaVersions().then(function(xml) {
        var antModel = $('au model', xml).text();
        if (antModel === 'TV5' || antModel === 'TV6') window.location.hash = '/backup-gps-source';
        else window.location.hash = '/vessel-location';
      });

    document.body.className = hash;
  });

  TVRO.reload();
});