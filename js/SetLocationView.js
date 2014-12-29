!function(TVRO) {
  "use strict";

  //  getSources('nmea0183', xml)
  //  can use for gps and heading sources
  var getSources = function(type, xml) {
    return _.map($(type + ' nmea_message', xml), function(xml) {
      var name     = $('nmea_name', xml).text();
      var value    = $('heading_value', xml).text();
      var source   = $('nmea_source', xml).text();
      var state    = $('state', xml).text();
      var selected = $('selected', xml).text() === 'Y';
      var display  = (type === 'nmea0183' ? 'NMEA 0183' : 'NMEA 2000') + ' - ' + name;
      return {
        type     : type,
        name     : name,
        source   : source,
        state    : state,
        selected : selected,
        display  : display
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

    return _.merge(self, {
      setNmeaSource: setSource(TVRO.setGpsConfig),
      getNmeaSources: function() {
        return TVRO.getGpsConfig().then(function(xml) {
          var nmea0183Sources = getSources('nmea0183', xml);
          var nmea2000Sources = getSources('nmea2000', xml);
          var nmeaSources     = nmea0183Sources.concat(nmea2000Sources);
          //  include a 'None' option
          //  see self.onBuild and setNmeaSource
          nmeaSources.push({ display: 'None' });
          return nmeaSources;
        });
      },
    });
  };

  var VesselLocationView = function(jQ) {

      // Define a function to retrieve the values for NMEA/Manual GPS.
      var getVesselLocationValues = function(){

          latitudeInput[0].value  = "";
          longitudeInput[0].value = "";

          setLatHem("");
          setLonHem("");

          self.getNmeaSources()
          .then(function(values) {
              var city;
              //  insert CITY and COORDINATES before None
              var none = values.pop();
              values = values.concat(['COORDINATES', 'CITY']);
              self.setValues(values).build();

              //  get the selected value
              //  check nmea values first
              var value = _.find(values, 'selected');
              if (value) {
                  self.setValue(value);
                  //  then check for CITY or COORDINATES
              } else {
                  TVRO.getGps().then(function(xml) {
                      var latitude  = $('lat', xml).text();
                      var longitude = $('lon', xml).text();

                      city = $('city', xml).text();

                      var array = [latitude,longitude];
                      return array;
                  }).then(function(LatLonArray){
                      return TVRO.formatGPS('inputDisplay',LatLonArray[0],LatLonArray[1]);
                  }).then(function(array){
                      if (city) {
                          self.setValue('CITY');
                          cityLabel.text(city);
                          cityDropdownView.setValue(city);
                      } else {
                          self.setValue('COORDINATES');
                      }
                      setLatHem(array[0][1]);
                      setLonHem(array[1][1]);
                      latitudeInput.val(array[0][0]);
                      longitudeInput.val(array[1][0]);
                  });
              }
          });
      }
      
      var clientGPSTest = function(){
          //Client GPS Test
          var clientGps = $('.\\#client-gps', coordinatesView)[0];
          //console.log(clientGps);
          var techMode = TVRO.getTechMode();
          if(false === techMode) {
              clientGps.style.display = 'none';
          } else {
              clientGps.style.display = 'block';
              TVRO.getClientGps(
              ).then(function(clientGpsData){
                  var clientLat       = $('.\\#client-lat', coordinatesView);
                  var clientLon       = $('.\\#client-lon', coordinatesView);
                  var clientAccuracy  = $('.\\#client-accuracy', coordinatesView);
                  var clientTime      = $('.\\#client-time', coordinatesView);

                  clientLat.text(clientGpsData[0]);
                  clientLon.text(clientGpsData[1]);
                  clientAccuracy.text(clientGpsData[2]);
                  clientTime.text(clientGpsData[3]);
              });
          }
      }
    
    var coordinatesView = $('.\\#coordinates-view', jQ).detach();    
    var cityView        = $('.\\#city-view', jQ).detach();
        
    var latHemInput    = $('.\\#lat-hem', coordinatesView);
    var lonHemInput    = $('.\\#lon-hem', coordinatesView);
    var latitudeInput  = $('.\\#latitude', coordinatesView);
    var longitudeInput = $('.\\#longitude', coordinatesView).click(function(event) {
      event.stopPropagation();
      self.setValue('COORDINATES');
    });

    var showCityDropdownView = function() {
      cityDropdownView.show(cityDropdownBtn.offset());
      self.setValue('CITY');
    };

    var setLatHem = function(hem) {
      $('.\\#lat-hem', jQ).text(hem);
      latHemDropdownView.setValue(hem);
    };

    var setLonHem = function(hem) {
      $('.\\#lon-hem', jQ).text(hem);
      lonHemDropdownView.setValue(hem);
    };

    var latHemBtn = $('.\\#lat-hem-btn',coordinatesView).click(function() {
      latHemDropdownView.show(latHemBtn.offset());
    });

    var latHemDropdownView = TVRO.DropdownView($('.\\#lat-hem-dropdown-view'))
    .setValues([
                'N',
                'S'
                ])
                .onClick(setLatHem)
                .build();

    var lonHemBtn = $('.\\#lon-hem-btn',coordinatesView).click(function() {
      lonHemDropdownView.show(lonHemBtn.offset());
    });

    var lonHemDropdownView = TVRO.DropdownView($('.\\#lon-hem-dropdown-view'))
    .setValues([
                'E',
                'W'
                ])
                .onClick(setLonHem)
                .build();

    var cityLabel = $('.\\#city', cityView);
    var cityDropdownView = TVRO.DropdownView($('.\\#city-dropdown-view'))
    .onClick(function(city) {
      cityLabel.text(city);

      // Set GPS from city selection so that it can be displayed in the
      // coordinates box.
      TVRO.setGps({
        city: city
      }).then(function(){
        // Delay so system has time to respond.
        setTimeout(function(){
          TVRO.getGps().then(function(xml) {
            var latitude  = $('lat', xml).text();
            var longitude = $('lon', xml).text();
            var array     = [latitude,longitude];
            return array; 
          }).then(function(LatLonArray){
            return TVRO.formatGPS('inputDisplay', LatLonArray[0], LatLonArray[1]);
          }).then(function(array){
            setLatHem(array[0][1]);
            setLonHem(array[1][1]);
            latitudeInput.val(array[0][0]);
            longitudeInput.val(array[1][0]);
          });
        },500);
      });
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
      if (value === 'COORDINATES') { 
        $('.\\#value', row).append(coordinatesView);
      } else if (value === 'CITY') {
        $('.\\#value', row).append(cityView);
      } else {
        $('.\\#value', row).text(value.display);
      }
    })
    .onClick(function(value) {
      if (value === 'COORDINATES') {
        latitudeInput.focus();
      } else if (value === 'CITY') {
        showCityDropdownView();
      }
    });

    var backBtn = $('.\\#back-btn', jQ).click(function() {
      window.location.hash = '/general';
    })
    .end()

    var applyGpsBtn = $('.\\#apply-gps-btn', coordinatesView).click(function() {
      var value = self.getValue();
      if (!value) {
        alert('You must select an option to continue.');
        //  custom COORDINATES selected
      } else if (value === 'COORDINATES') {
        var latitude  = latitudeInput.val();
        var longitude = longitudeInput.val();
        var latHem    = latHemDropdownView.getValue();
        var lonHem    = lonHemDropdownView.getValue();

        if (!latitude || !longitude) {
          alert('You must enter a latitude and longitude to continue.');
        } else if (!latHem || !lonHem) {
          alert('You must enter a Hemisphere to continue.');
        } else {
          Promise.all(
                      // Append the hemisphere to the latitude and longitude
                      TVRO.formatGPS('input', latitude + latHem, longitude + lonHem)
          ).then(function(latLonArray){

            if(latLonArray != -1){
              var confirmed = confirm('Are you sure you want to apply a new location?');
              if (confirmed) {
                TVRO.setGps({
                  lat: latLonArray[0],
                  lon: latLonArray[1]
                });
              }
            }
          });
        }
        //  CITY selected
      } else if (value === 'CITY') {
        var city = cityDropdownView.getValue();
        if (!city) {
          alert('You must select a city to continue.');
        }else { 
          var confirmed = confirm('Are you sure you want to apply a new location?');
          if (confirmed) {
            TVRO.setGps({
              city: city
            });
          }
        }
        //  NMEA source selected
      } else { 
        var confirmed = confirm('Are you sure you want to apply a new location?');
        if (confirmed) {
          self.setNmeaSource(value);
        }
      }
    });

    // Call the function to retrieve the values from NMEA/Manual
    getVesselLocationValues();
    clientGPSTest();
    
    var reload = function() { 
        clientGPSTest();
        getVesselLocationValues();
    };

    return _.merge(self, {
        reload: reload
    });

  };

  TVRO.VesselLocationView = VesselLocationView;

}(window.TVRO);
