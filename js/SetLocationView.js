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

  var NmeaSourceView = function(jQ) {
    var nmeaTable = TVRO.TableView($('.\\#nmea-table-view', jQ));

    return _.merge(nmeaTable, {
      setNmeaSource: setSource(TVRO.setGpsConfig),
      getNmeaSources: function() {
        return TVRO.getGpsConfig().then(function(xml) {
          var nmea0183Sources = getSources('nmea0183', xml);
          var nmea2000Sources = getSources('nmea2000', xml);
          var nmeaSources     = nmea0183Sources.concat(nmea2000Sources);
          return nmeaSources;
        });
      },
    });
  };

  var ManualSourceView = function(jQ) {
      return TVRO.TableView($('.\\#manual-table-view', jQ));
  };

  
  var VesselLocationView = function(jQ) {

      var citiesCoordArray = [];

      // Define a function to retrieve the values for NMEA Devices.
      var getNmeaDevices = function() {
          selfd.getNmeaSources()
          .then(function(values) {
              selfd.setValues(values).build();
              
              // Hide the NMEA table when no NMEA device are connected
              jQ.toggleClass('$hide-view', values == 0);

              // This block sets the proper header text for the NMEA and Manual
              // blocks based upon if there is a internal GPS or NMEA connected.
              Promise.all(
                  TVRO.isGpsAnt(),
                  TVRO.getAntSysIdModel(),
                  TVRO.getLnbType()
              )
              .then(function(results){
                  var isGpsAnt = results[0];
                  
                  // Is the antenna a Linear LNB with manual skew
                  var isLinManSkew = (((results[1] == 'TV5SK') || (results[1] == 'TV5SK')) && (results[2] == 'LINEAR')) ? true : false;
                  
                  if (isGpsAnt) {
                      if(values == 0) {
                          // System with GPS and no NMEA
                          $('.\\#nmea-desktop-header').text("");
                          $('.\\#nmea-mobile-header').text("");
                          
                          $('.\\#manual-desktop-header').text("Choose the backup source for your location coordinates. The antenna will use this source if GPS is unavailable.");
                          $('.\\#manual-mobile-header').text("Choose the backup source for your location coordinates. The antenna will use this source if GPS is unavailable.");
                      } else {
                          // System with GPS and a NMEA
                          $('.\\#nmea-desktop-header').text("Choose the backup source for your location coordinates. The antenna will use this source if GPS is unavailable.");
                          $('.\\#nmea-mobile-header').text("Choose the backup source for your location coordinates. The antenna will use this source if GPS is unavailable.");
                          
                          $('.\\#manual-desktop-header').text("Choose the alternate source to use if both GPS and NMEA are unavailable.");
                          $('.\\#manual-mobile-header').text("Choose the alternate source to use if both GPS and NMEA are unavailable.");
                      }
                  }else {
                      if(values == 0) {
                          // System with no GPS and no NMEA
                          $('.\\#nmea-desktop-header').text("");
                          $('.\\#nmea-mobile-header').text("");
                          
                          if(isLinManSkew) {
                              $('.\\#manual-desktop-header').text("Choose the source for your location coordinates. This data will expedite satellite acquistion and is required to ensure an accurate skew calculation.");
                              $('.\\#manual-mobile-header').text("Choose the source for your location coordinates. This data will expedite satellite acquistion and is required to ensure an accurate skew calculation.");
                          } else {
                              $('.\\#manual-desktop-header').text("Choose the source for your location coordinates. This data will expedite satellite acquistion.");
                              $('.\\#manual-mobile-header').text("Choose the source for your location coordinates. This data will expedite satellite acquistion.");                              
                          }
                      } else {
                          // System with no GPS and a NMEA
                          if(isLinManSkew) {
                              $('.\\#nmea-desktop-header').text("Choose the source for your location coordinates. This data will expedite satellite acquistion and is required to ensure an accurate skew calculation.");
                              $('.\\#nmea-mobile-header').text("Choose the source for your location coordinates. This data will expedite satellite acquistion and is required to ensure an accurate skew calculation.");
                          } else {
                              $('.\\#nmea-desktop-header').text("Choose the source for your location coordinates. This data will expedite satellite acquistion.");
                              $('.\\#nmea-mobile-header').text("Choose the source for your location coordinates. This data will expedite satellite acquistion.");                              
                          }
                          
                          $('.\\#manual-desktop-header').text("Choose the backup source to use if NMEA is unavailable.");
                          $('.\\#manual-mobile-header').text("Choose the backup source to use if NMEA is unavailable.");
                      }
                  }
              });
              
              var value = _.find(values, 'selected');
              
              if(value) {
                  selfd.setValue(value);
              }
          });
      };
        
      // Define a function to retrieve the values for NMEA Devices.
      var getManualCoord = function() {

          selfm.setValue("");
          latitudeInput.val("");
          longitudeInput.val("");

          setLatHem("");
          setLonHem("");

          // Clear the error label.
          $('.\\#geoloc_error').text("");

          var city;
          var source;
          //values = selfm.getValues();
          var values = ['COORDINATES', 'CITY', 'GEO'];
          // Build the table
          selfm.setValues(values).build();

          TVRO.getGps().then(function(xml) {
              var latitude  = $('lat', xml).text();
              var longitude = $('lon', xml).text();

              source = $('source', xml).text();
              city   = $('city', xml).text();

              if(source === 'CLIENT') {
                  TVRO.getClientGps().then(function(clientGpsData) {
                      latitude  = clientGpsData[0];
                      longitude = clientGpsData[1];
                      var time  = clientGpsData[2];

                      TVRO.setGps({
                          source: 'CLIENT',
                          lat: latitude,
                          lon: longitude
                      }).then(TVRO.setDateTime(time));
                  });
              }

              var array = [latitude,longitude];
              return array;

          }).then(function(LatLonArray) {
              return setCoordDisplay(LatLonArray[0],LatLonArray[1]);
          }).then(function() {

              if (city) {
                  selfm.setValue('CITY');
                  cityLabel.text(city);
                  cityDropdownView.setValue(city);
              } else if(source === 'MANUAL') {
                  selfm.setValue('COORDINATES');
              } else if(source === 'CLIENT') {
                  selfm.setValue('GEO');
              }
          });
      };

    var coordinatesView = $('.\\#coordinates-view', jQ).detach();    
    var cityView        = $('.\\#city-view', jQ).detach();
    var geoLocView      = $('.\\#geoloc-view', jQ).detach();    
        
    var latHemInput    = $('.\\#lat-hem', coordinatesView);
    var lonHemInput    = $('.\\#lon-hem', coordinatesView);
    var latitudeInput  = $('.\\#latitude', coordinatesView);
    var longitudeInput = $('.\\#longitude', coordinatesView).click(function(event) {
      event.stopPropagation();
      self.setValue('COORDINATES');
    });

    var setCoordDisplay = function(latitude,longitude) {
        Promise.all(
            TVRO.formatGPS('inputDisplay',latitude,longitude)
        ).then(function(array){
            setLatHem(array[0][1]);
            setLonHem(array[1][1]);
            latitudeInput.val(array[0][0]);
            longitudeInput.val(array[1][0]);
        });
    };
    
    var clientGeoLoc = function() {

        var source;
        var latitude;
        var longitude;

        // Get the current Table
        var tableValues = selfm.getValues();

        // Retrieve a selected NMEA if it is there.
        //var value = _.find(tableValues, 'selected');
        
        // Clear the error label.
        $('.\\#geoloc_error').text("");

        //if(geoLocMode) {
            // Remove the Manual and city entry rows.
            //tableValues = _.without(tableValues, 'COORDINATES','CITY')

            // Set the table with the proper rows and build.
            //self.setValues(tableValues).build();

            // Call the geolocation when the button is set to on and no NEMA
            // is selected.
            TVRO.getClientGps().then(function(clientGpsData){
                //console.log(clientGpsData);
                latitude  = clientGpsData[0];
                longitude = clientGpsData[1];
                source    = 'CLIENT';
                return clientGpsData[2];
            }).then(function(time){
                setCoordDisplay(latitude, longitude);

                // Call set_gps to set the changed source/lat-lon
                TVRO.setGps({
                    source: source,
                    lat: latitude,
                    lon: longitude
                }).then(function(){
                    TVRO.setDateTime(time);
                });

                //self.setValue(value);

            });
        //} else {
            // Push the manual Coord and city row back on the table.
            //tableValues.push('COORDINATES');
            //tableValues.push('CITY');


            // Set the table with the proper rows and build.
           // self.setValues(tableValues).build();

            // Retrieve the lat-lon so that set_gps can be called to set the
            // source.
//            TVRO.getGps().then(function(xml) {
//                latitude  = $('lat', xml).text();
//                longitude = $('lon', xml).text();
//                source    = 'MANUAL';
//            }).then(function(){

                // Display the coordinates.
//                setCoordDisplay(latitude, longitude);

                // Call set_gps to set the changed source/lat-lon
 //               TVRO.setGps({
//                    source: source,
//                    lat: latitude,
//                    lon: longitude
//                });

                // Set the proper check radial
                //if (value) {
                 //   self.setValue(value);
                //} else {
                //    self.setValue('COORDINATES');
                //}
//            });
       // }
    };

    var showCityDropdownView = function() {
      cityDropdownView.show(cityDropdownBtn.offset());
      selfm.setValue('CITY');
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
      
      var selectedCity = _.findWhere(citiesCoordArray,{city_name:city});

      setCoordDisplay(selectedCity.lat, selectedCity.lon);
    });

    var cityDropdownBtn = $('.\\#city-btn', cityView).click(showCityDropdownView);

    TVRO.getGpsCities().then(function(xml) {

        cityDropdownView.setValues(
                        _.map($('city', xml), function(element) {
                            var cityArray;

                            cityArray = {city_name:$(element.getElementsByTagName('city_name')).text(),
                                            lat:$(element.getElementsByTagName('lat')).text(),
                                            lon:$(element.getElementsByTagName('lon')).text()};
                            
                            citiesCoordArray[citiesCoordArray.length] = cityArray;
                            
                            return cityArray.city_name;
                        })
        ).build();
    });

    var selfd = NmeaSourceView(jQ)
    .onBuild(function(row, value) {
//      if (value === 'COORDINATES') { 
//        $('.\\#value', row).append(coordinatesView);
//      } else if (value === 'CITY') {
//        $('.\\#value', row).append(cityView);
//      } else {
        $('.\\#nmea-value', row).text(value.display);
//      }
    })
    .onClick(function(value) {
//      if (value === 'COORDINATES') {
//        latitudeInput.focus();
//      } else if (value === 'CITY') {
//        showCityDropdownView();
//      }
    });
    
    var selfm = ManualSourceView(jQ)
    .onBuild(function(row, value) {
        if (value === 'COORDINATES') { 
            $('.\\#man-coord-value', row).append(coordinatesView);
        } else if (value === 'CITY') {
            $('.\\#man-coord-value', row).append(cityView);
        } else if (value === 'GEO') {
            $('.\\#man-coord-value', row).append(geoLocView);
        }
    })
    .onClick(function(value) {
//      if (value === 'COORDINATES') {
//      latitudeInput.focus();
//      } else if (value === 'CITY') {
//      showCityDropdownView();
//      }
    });

    var backBtn = $('.\\#back-btn', jQ).click(function() {
      window.location.hash = '/general';
    })
    .end()

    
    var applyNmeaBtn = $('.\\#apply-nmea-btn', jQ).click(function() {
        var value = selfd.getValue();
        alert(value);
        if (!value) {
            alert('You must select an option to continue.');
        }else {
            var confirmed = confirm('Are you sure you want to apply a new location?');
            if (confirmed) {
                selfd.setNmeaSource(value);
            }
        }
    });
    
    var applyManualBtn = $('.\\#apply-manual-btn', jQ).click(function() {
      var value = selfm.getValue();

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
                              source: 'MANUAL',
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
                      source: 'MANUAL',
                      city: city
                  });
              }
          }
    } else if (value === 'GEO') {
            var confirmed = confirm('Are you sure you want to turn on Geolocation?');
            if (confirmed) {
                
                clientGeoLoc();
                
                
            }
        }
    });
    
//    var applyGpsBtn = $('.\\#apply-gps-btn', jQ).click(function() {
//      var value = self.getValue();
//      if (!value) {
//        alert('You must select an option to continue.');
//        //  custom COORDINATES selected
//      } else if (value === 'COORDINATES') {
//        var latitude  = latitudeInput.val();
//        var longitude = longitudeInput.val();
//        var latHem    = latHemDropdownView.getValue();
//        var lonHem    = lonHemDropdownView.getValue();
//
//        if (!latitude || !longitude) {
//          alert('You must enter a latitude and longitude to continue.');
//        } else if (!latHem || !lonHem) {
//          alert('You must enter a Hemisphere to continue.');
//        } else {
//          Promise.all(
//              // Append the hemisphere to the latitude and longitude
//              TVRO.formatGPS('input', latitude + latHem, longitude + lonHem)
//          ).then(function(latLonArray){
//
//            if(latLonArray != -1){
//              var confirmed = confirm('Are you sure you want to apply a new location?');
//              if (confirmed) {
//                TVRO.setGps({
//                  lat: latLonArray[0],
//                  lon: latLonArray[1]
//                });
//              }
//            }
//          });
//        }
//        //  CITY selected
//      } else if (value === 'CITY') {
//        var city = cityDropdownView.getValue();
//        if (!city) {
//          alert('You must select a city to continue.');
//        }else { 
//          var confirmed = confirm('Are you sure you want to apply a new location?');
//          if (confirmed) {
//            TVRO.setGps({
//              city: city
//            });
//          }
//        }
//        //  NMEA source selected
//      } else { 
//        var confirmed = confirm('Are you sure you want to apply a new location?');
//        if (confirmed) {
//          self.setNmeaSource(value);
//        }
//      }
//    });
    
    var reload = function() {

        TVRO.getAntModel().then(function(model){
            if (model === 'RV1' || model === 'A9') {
                $('.\\#location-header').text("Vehicle Location");
            } else {
                $('.\\#location-header').text("Vessel Location");
            }
        });

        getNmeaDevices();
        getManualCoord();
    };

    return _.merge(self, {
        reload: reload
    });

  };

  TVRO.VesselLocationView = VesselLocationView;

}(window.TVRO);
