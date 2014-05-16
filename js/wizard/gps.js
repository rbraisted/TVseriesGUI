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



  var VesselLocationView = function(jQ) {
    var coordinatesView = $('.\\#coordinates-view', jQ).detach();
    var cityView = $('.\\#city-view', jQ).detach();

    var latitudeInput = $('.\\#latitude', coordinatesView);
    var longitudeInput = $('.\\#longitude', coordinatesView).click(function(event) {
      event.stopPropagation();
      self.setValue('COORDINATES');
    });

    var showCityDropdownView = function() {
      cityDropdownView.show(cityDropdownBtn.offset());
      self.setValue('CITY');
    };

    var cityLabel = $('.\\#city', cityView);
    var cityDropdownView = TVRO.DropdownView($('.\\#city-dropdown-view'))
      .onClick(function(city) {
        cityLabel.text(city);
      });
    var cityDropdownBtn = $('.\\#city-btn', cityView).click(showCityDropdownView);

    TVRO.getGpsCities().then(function(xml) {
      cityDropdownView.setValues(
        _.map($('city', xml), function(element) {
          return $(element).text();
        })
      ).build();
    });

    var self = GpsSourceView(jQ)
      .onBuild(function(row, value) {
        if (value === 'COORDINATES') $('.\\#value', row).append(coordinatesView);
        else if (value === 'CITY') $('.\\#value', row).append(cityView);
        else $('.\\#value', row).text(value.display);
      })
      .onClick(function(value) {
        if (value === 'COORDINATES') latitudeInput.focus();
        else if (value === 'CITY') showCityDropdownView();
      });

    self.getNmeaSources()
      .then(function(values) {
        //  insert CITY and COORDINATES before None
        var none = values.pop();
        values = values.concat(['COORDINATES', 'CITY']);
        self.setValues(values).build();

        //  get the selected value
        //  check nmea values first
        var value = _.find(values, 'selected');
        if (value) self.setValue(value);

        //  then check for CITY or COORDINATES
        else TVRO.getGps().then(function(xml) {
          var city = $('city', xml).text();
          var latitude = $('lat', xml).text();
          var longitude = $('lon', xml).text();

          if (city) {
            self.setValue('CITY');
            cityDropdownView.setValue(city);
            cityLabel.text(city);

          } else if (latitude || longitude) {
            self.setValue('COORDINATES');
            latitudeInput.val(latitude);
            longitudeInput.val(longitude);

          } else {
            //  None
            self.setValue(_.last(values));
          }
        });
      });

    var goToNext = function() {
      TVRO.getAntennaVersions().then(function(xml) {
        var antModel = $('au model', xml).text();
        
        if (antModel === 'RV1'){
            window.location = '/wizard/service.php';
        }else{
            window.location.hash = '/heading-source';
        }
      });
    };

    var nextBtn = $('.\\#next-btn', jQ).click(function() {
      var value = self.getValue();
      if (!value) {
        alert('You must select an option to continue.');

      //  custom COORDINATES selected
      } else if (value === 'COORDINATES') {
        var latitude = latitudeInput.val();
        var longitude = longitudeInput.val();
        if (!latitude || !longitude) alert('You must enter a latitude and longitude to continue.');
        else TVRO.setGps({
          lat: latitude,
          lon: longitude
        }).then(goToNext);

      //  CITY selected
      } else if (value === 'CITY') {
        var city = cityDropdownView.getValue();
        if (!city) alert('You must select a city to continue.');
        else TVRO.setGps({
          city: city
        }).then(goToNext);

      //  NMEA source selected
      } else self.setNmeaSource(value).then(goToNext);
    });

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
        TVRO.getAntennaVersions().then(function(xmls) {
          var antModel = $('au model', xmls[0]).text();
          var lnbType = $('lnb polarization', xmls[0]).text();
          var lnbName = $('lnb name', xmls[0]).text();
          var systemIDModel = $('au systemIDModel', xmls[0]).text();

          // CIRCULAR LNB -> select service (service.php)
          if ((lnbType === 'circular') && 
              (lnbName !== 'Tri-Americas Circular') &&
              ((lnbName !== 'DIRECTV-LA Circular'))) window.location = '/wizard/service.php';

          // GALAXY -> directv (service.php#/directv)
          else if (lnbName === 'DIRECTV-LA Circular'){
            TVRO.setAutoswitchService({
              enable: 'N',
              satellite_group: 'GALAXY-LA'
            }).then(function() {
              document.body.className = '/spinner';
              
              setTimeout(function() {
                var interval = setInterval(function() {
                  TVRO.getAntennaStatus(1,1).then(function(xml) {
                    var state =  $('antenna state', xml).text();
                    if (state === 'SEARCHING') {
                      clearInterval(interval);
                        window.location = '/wizard/activation.php';
                    } //End if (state === 'SEARCHING')
                  });          
                }, 1000);
              }, 10000);
            });
            
          // TRI AMERICAS -> directv (service.php#/directv)
        }else if (lnbName === 'Tri-Americas Circular') window.location = '/wizard/service.php#/tri-am-group';

          // LINEAR LNB TV5/6 with motorized skew -> options (single satellite, predfined group, user-defined group
          else if (systemIDModel === 'TV5SK' || systemIDModel === 'TV6SK') window.location = '/wizard/satellites.php#/options';

          // TV5 + MANUAL -> select satellites (satellites.php)
          else window.location = '/wizard/satellites.php#/tv5-manual-options';

        });
      });
    });


    var prevBtn = $('.\\#prev-btn', jQ).click(function() {
      window.location.hash = '/vessel-location';
    });

    TVRO.getHeadingConfig().then(function(xml) {
      var nmea0183Sources = getSources('nmea0183', xml);
      var nmea2000Sources = getSources('nmea2000', xml);
      var headingSources = nmea0183Sources.concat(nmea2000Sources);
      headingSources.push({ display: 'None' });
      self.setValues(headingSources).build();
    }).then(function() {
      //  select previously selected value on init
      //  default to None if no previous value available
      var values = self.getValues();
      var value = _.find(values, 'selected') || _.find(values, { display: 'None' });
      self.setValue(value);
    });


    return self;
  };

  TVRO.VesselLocationView = VesselLocationView;
  TVRO.HeadingSourceView = HeadingSourceView;

}(window.TVRO);


$(function() {
  var vesselLocationView = TVRO.VesselLocationView($('.\\#vessel-location-view'));
  var headingSourceView = TVRO.HeadingSourceView($('.\\#heading-source-view'));

  TVRO.onHashChange(function(hash) {
    if (!hash){   	
        window.location.hash = '/vessel-location';
    }   
    
    document.body.className = hash;
  });

  TVRO.reload();
});