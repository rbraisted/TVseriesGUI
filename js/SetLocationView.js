!function(TVRO) {
    "use strict";

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
            }
        });
    };

    var ManualSourceView = function(jQ) {
        return TVRO.TableView($('.\\#manual-table-view', jQ));
    };

    var VesselLocationView = function(jQ) {

        var citiesCoordArray = [];

        // Define a function to retrieve the values for NMEA Devices.
        var getNmeaDevices = function() {
            
            nmea.getNmeaSources()
            .then(function(values) {
                
                // Build the NMEA table.
                nmea.setValues(values).build();

                // Hide the NMEA table when no NMEA devices are connected
                jQ.toggleClass('$hide-view', values == 0);

                // This block sets the proper header text for the NMEA and Manual
                // blocks based upon if there is an internal GPS or NMEA connected.
                Promise.all(
                    TVRO.isGpsAnt(),
                    TVRO.getAntSysIdModel(),
                    TVRO.getLnbType()
                ).then(function(results) {
                    var isGpsAnt = results[0];
                    var sysModelId   = results[1];
                    var polarization = results[2];

                    // Is the antenna a Linear LNB with manual skew
                    var isLinManSkew = (((sysModelId !== 'TV5SK') && (sysModelId !== 'TV6SK') && (sysModelId !== 'TV8SK')) && (polarization === 'linear')) ? true : false;

                    if (isGpsAnt) {
                        if (values == 0) {
                            // System with GPS and no NMEA
                            $('.\\#nmea-desktop-header').text("");
                            $('.\\#nmea-mobile-header').text("");

                            $('.\\#manual-desktop-header').text("Choose the backup source for your location coordinates. The antenna will use this source if the system's GPS is unavailable.");
                            $('.\\#manual-mobile-header').text("Choose the backup source for your location coordinates. The antenna will use this source if the system's GPS is unavailable.");
                        } else {
                            // System with GPS and a NMEA
                            $('.\\#nmea-desktop-header').text("Choose the backup source for your location coordinates. The antenna will use this source if the system's GPS is unavailable.");
                            $('.\\#nmea-mobile-header').text("Choose the backup source for your location coordinates. The antenna will use this source if the system's GPS is unavailable.");

                            $('.\\#manual-desktop-header').text("Choose the alternate source to use if both the system's GPS and NMEA are unavailable.");
                            $('.\\#manual-mobile-header').text("Choose the alternate source to use if both the system's GPS and NMEA are unavailable.");
                        }
                    } else {
                        if (values == 0) {
                            // System with no GPS and no NMEA
                            $('.\\#nmea-desktop-header').text("");
                            $('.\\#nmea-mobile-header').text("");

                            if (isLinManSkew) {
                                $('.\\#manual-desktop-header').text("Choose the source for your location coordinates. This data will expedite satellite acquisition and is required to ensure an accurate skew calculation.");
                                $('.\\#manual-mobile-header').text("Choose the source for your location coordinates. This data will expedite satellite acquisition and is required to ensure an accurate skew calculation.");
                            } else {
                                $('.\\#manual-desktop-header').text("Choose the source for your location coordinates. This data will expedite satellite acquisition.");
                                $('.\\#manual-mobile-header').text("Choose the source for your location coordinates. This data will expedite satellite acquisition.");                              
                            }
                        } else {
                            // System with no GPS and a NMEA
                            if (isLinManSkew) {
                                $('.\\#nmea-desktop-header').text("Choose the source for your location coordinates. This data will expedite satellite acquisition and is required to ensure an accurate skew calculation.");
                                $('.\\#nmea-mobile-header').text("Choose the source for your location coordinates. This data will expedite satellite acquisition and is required to ensure an accurate skew calculation.");
                            } else {
                                $('.\\#nmea-desktop-header').text("Choose the source for your location coordinates. This data will expedite satellite acquisition.");
                                $('.\\#nmea-mobile-header').text("Choose the source for your location coordinates. This data will expedite satellite acquisition.");                              
                            }

                            $('.\\#manual-desktop-header').text("Choose the backup source to use if NMEA is unavailable.");
                            $('.\\#manual-mobile-header').text("Choose the backup source to use if NMEA is unavailable.");
                        }
                    }
                });

                var value = _.find(values, 'selected');

                if (value) {
                    nmea.setValue(value);
                }
            });
        };

        // Define a function to retrieve the values for manual coordinates.
        var getManualCoord = function() {

            manual.setValue("");
            latitudeInput.val("");
            longitudeInput.val("");

            setLatHem("");
            setLonHem("");

            // Clear the error label.
            $('.\\#geoloc_error').text("");

            var city;
            var source;

            var values = ['COORDINATES', 'CITY', 'GEO'];

            // Build the table
            manual.setValues(values).build();

            TVRO.getGps().then(function(xml) {
                var latitude  = $('lat', xml).text();
                var longitude = $('lon', xml).text();

                source = $('source', xml).text();
                city   = $('city', xml).text();

                if (source === 'CLIENT') {
                    
                    // Get the current displayed page then switch to the
                    // spinner.
                    var docClassName        = document.body.className;
                    document.body.className = '/spinner';

                    TVRO.getClientGps().then(function(clientGpsData) {

                        latitude  = clientGpsData[0];
                        longitude = clientGpsData[1];
                        var time  = clientGpsData[2];

                        TVRO.setGps({
                            source: 'CLIENT',
                            lat: latitude,
                            lon: longitude
                        }).then(TVRO.setDateTime(time));
                    }, function() {
                        // This is the reject  callback. Clear the spinner.
                        document.body.className = docClassName;
                    }).then(function() {
                        // Clear the spinner.
                        document.body.className = docClassName;
                    });
                }

                var array = [latitude,longitude];
                return array;
            }).then(function(LatLonArray) {
                return setCoordDisplay(LatLonArray[0],LatLonArray[1]);
            }).then(function() {
                if (city) {
                    manual.setValue('CITY');
                    cityLabel.text(city);
                    cityDropdownView.setValue(city);
                } else if (source === 'MANUAL') {
                    manual.setValue('COORDINATES');
                } else if (source === 'CLIENT') {
                    manual.setValue('GEO');
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
            ).then(function(array) {
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

            // Clear the error label.
            $('.\\#geoloc_error').text("");

            // Get the current displayed page then switch to the
            // spinner.
            var docClassName = document.body.className;
            document.body.className = '/spinner';

            TVRO.getClientGps().then(function(clientGpsData){
                latitude  = clientGpsData[0];
                longitude = clientGpsData[1];
                source    = 'CLIENT';
                return clientGpsData[2];
            }, function() {
                // This is the reject  callback. Clear the spinner.
                document.body.className = docClassName;
            }).then(function(time) {

                setCoordDisplay(latitude, longitude);

                // Call set_gps to set the changed source/lat-lon
                TVRO.setGps({
                    source: source,
                    lat: latitude,
                    lon: longitude
                }).then(function() {
                    TVRO.setDateTime(time);
                });
            }).then(function() {
                // Clear the spinner.
                document.body.className = docClassName;
            });
        };

        var showCityDropdownView = function() {
	
		if(citiesCoordArray[0].city_name != '')
		{
			cityDropdownView.show();
		}
		
            
            manual.setValue('CITY');
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
            latHemDropdownView.show();
        });

        var latHemDropdownView = TVRO.DropdownView($('.\\#lat-hem-dropdown-view'))
        .setValues([
                    'N',
                    'S'
                    ])
                    .onClick(setLatHem)
                    .build();

        var lonHemBtn = $('.\\#lon-hem-btn',coordinatesView).click(function() {
            lonHemDropdownView.show();
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

        var nmea = NmeaSourceView(jQ)
        .onBuild(function(row, value) {
            $('.\\#nmea-value', row).text(value.display);
        })
        .onClick(function(value) {
        	$('.\\#geoloc_error').text("");
        });

        var manual = ManualSourceView(jQ)
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
        	$('.\\#geoloc_error').text("");
        });

        var backBtn = $('.\\#back-btn', jQ).click(function() {
            window.location.hash = '/general';
        })
        .end()


        var applyNmeaBtn = $('.\\#apply-nmea-btn', jQ).click(function() {
            var value = nmea.getValue();

            if (!value) {
                alert('You must select an option to continue.');
            }else {
                var confirmed = confirm('Are you sure you want to apply a new location?');
                if (confirmed) {
                    nmea.setNmeaSource(value);
                }
            }
        });

        var applyManualBtn = $('.\\#apply-manual-btn', jQ).click(function() {
            var value = manual.getValue();

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
                    ).then(function(latLonArray) {

                        if (latLonArray != -1) {
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
                } else { 
                    var confirmed = confirm('Are you sure you want to apply a new location?');
                    if (confirmed) {
                        TVRO.setGps({
                            source: 'MANUAL',
                            city: city
                        });
                    }
                }
            } else if (value === 'GEO') {
                var confirmed = confirm('Are you sure you want to apply a new location?');
                if (confirmed) {
                    clientGeoLoc();
                }
            }
        });

        var reload = function() {

            TVRO.getAntModel().then(function(model) {
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
