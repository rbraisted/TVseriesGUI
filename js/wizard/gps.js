!function(TVRO) {
  "use strict";

  var GpsSourceView = function(jQ) {
    var self = TVRO.TableView($('.\\#table-view', jQ))
      .onBuild(function(row, value) {
        if (value === 'NMEA0183') $('.\\#value', row).text('NMEA 0183');
        else if (value === 'NMEA2000') $('.\\#value', row).text('NMEA 2000');
        else if (value === 'NONE') $('.\\#value', row).text('Other');
        else if (value === 'COORDINATES') $('.\\#value', row).text('Other');
        else if (value === 'CITY') $('.\\#value', row).text('Other');
      });

    var prevBtn = $('.\\#prev-btn', jQ).click(function() {
      //  getProductRegistration - if installer info exists,
      //  go to registration.php#/installer-info
      //  otherwise registration.php#/diy-vessel-info
      TVRO.getProductRegistration().then(function(xml) {
        var company = $('dealer company', xml).text();
        var contact = $('dealer installer_name', xml).text();
        var phone = $('dealer installer_phone', xml).text();
        var email = $('dealer installer_email', xml).text();
        if (company && contact && phone && email) {
          window.location = '/wizard/registration.php#/installer-info';
        } else {
          window.location = '/wizard/registration.php#/diy-vessel-info';
        }
      });
    });

    return _.merge(self, {
      setNmea: function() {
        var value = self.getValue();
        var nmea0183Enabled = value === 'NMEA0183' ? 'Y' : 'N';
        var nmea2000Enabled = value === 'NMEA2000' ? 'Y' : 'N';
        return TVRO.setGpsConfig({
          nmea0183: { enable: nmea0183Enabled },
          nmea2000: { enable: nmea2000Enabled }
        });
      }
    });
  };

  

  var BackupGpsSourceView = function(jQ) {
    var self = GpsSourceView(jQ)
      .setValues([
        'NMEA0183',
        'NMEA2000',
        'NONE'
      ])
      .build();

    var nextBtn = $('.\\#next-btn', jQ).click(function() {
      var value = self.getValue();
      if (!value) alert('You must select an option to continue.');
      else if (value === 'NONE') window.location.hash = '/heading-source';
      else self.setNmea().then(function() {
        window.location.hash = '/heading-source';
      });
    });

    return self;
  };



  var VesselLocationView = function(jQ) {
    var self = GpsSourceView(jQ)
      .setValues([
        'NMEA0183',
        'NMEA2000',
        'COORDINATES',
        'CITY'
      ])
      .build();

    var nextBtn = $('.\\#next-btn', jQ).click(function() {
      var value = self.getValue();
      if (!value) alert('You must select an option to continue.');
      else if (value === 'COORDINATES') window.location.hash = '/heading-source';
      else if (value === 'CITY') window.location.hash = '/heading-source';
      else self.setNmea().then(function() {
        window.location.hash = '/heading-source';
      });
    });

    var CoordinatesView = function(jQ) {

    };

    return self;
  };



  var HeadingSourceView = function(jQ) {
    var self = TVRO.TableView($('.\\#table-view', jQ))
      .onBuild(function(row, headingSource) {
        $('.\\#value', row).text(headingSource.name);
      });

    var nextBtn = $('.\\#next-btn', jQ).click(function() {
      console.log("!");
      var value = self.getValue();
      if (!value) alert('You must select an option to continue.');
      else {
        // if (nmea0183Sources.indexOf(headingSources[value]) !== -1) {
        //   webService.request('set_heading_config', {
        //     nmea0183: { enable: 'Y', nmea_source: headingSources[value].source },
        //     nmea2000: { enable: 'N' }
        //   });
        // } else if (nmea2000Sources.indexOf(headingSources[value]) !== -1) {
        //   webService.request('set_heading_config', {
        //     nmea0183: { enable: 'N' },
        //     nmea2000: { enable: 'Y', nmea_source: headingSources[value].source }
        //   });
        // }
        window.location = '/wizard/service.php';
      }
    });

    var prevBtn = $('.\\#prev-btn', jQ).click(function() {
      TVRO.getAntennaVersions().then(function(xml) {
        var antModel = $('au model', xml).text();
        if (antModel === 'TV5' || antModel === 'TV6') window.location.hash = '/backup-gps-source';
        else window.location.hash = '/vessel-location';
      });
    });

    TVRO.getHeadingConfig().then(function(xml) {
      var getHeadingSource = function() {
        var name = $('nmea_name', this).text();
        var source = $('nmea_source', this).text();
        return { name: name, source: source };
      };

      var nmea0183Sources = $('nmea0183 nmea_message', xml).map(getHeadingSource).get();
      var nmea2000Sources = $('nmea2000 nmea_message', xml).map(getHeadingSource).get();
      var headingSources = nmea0183Sources.concat(nmea2000Sources);

      self.setValues(headingSources).build();
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
    if (!hash) {
      TVRO.getAntennaVersions().then(function(xml) {
        var antModel = $('au model', xml).text();
        if (antModel === 'TV5' || antModel === 'TV6') window.location.hash = '/backup-gps-source';
        else window.location.hash = '/vessel-location';
      });
    }

    document.body.className = hash;
  });

  TVRO.reload();
});