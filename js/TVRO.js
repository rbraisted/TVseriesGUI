!function(window) {
  "use strict";

  var decode = decodeURIComponent;
  var encode = encodeURIComponent;

  //  loose index
  var indexOf = function(arr, x) {
    var index = _.indexOf(arr, x);  //  check primitives
    if (index < 0) index = _.findIndex(arr, x); //  check objs - for sats, groups, receivers, etc
    return index;
  };

  window.encode = encode;
  window.decode = decode;
  window.indexOf = indexOf;

}(window);



!function(window) {
  "use strict";

  var TVRO = {};
  TVRO.debug = 0;

  //  for formatting longitude/latitude for display
  //  -122.05 becomes 122.05W, etc
  var formatCoordinate = function(type, coordinate, places) {
    if (_.isNaN(coordinate) || coordinate == '')
      return 'N/A';

    var posStr, negStr;
    if (type === 'latitude') {
      posStr = 'N';
      negStr = 'S';
    } else {  // assume longitude
      posStr = 'E';
      negStr = 'W';
    }

    return coordinate > 0 ? Number(coordinate).toFixed(places) + posStr : Math.abs(Number(coordinate)).toFixed(places) + negStr;
  };

  TVRO.formatLatitude = _.curry(formatCoordinate, 2)('latitude');
  TVRO.formatLongitude = _.curry(formatCoordinate, 2)('longitude');


  TVRO.formatOrbitalSlot = function(antSatID, lon) {
    var antLon, i, prec, lonStr;

    if (antSatID.substring(0, 4) === 'USER') {
      if (_.isNaN(lon) || lon == '') {
        antLon = 'N/A';
      } else {
        lonStr = lon.toString();
        i = lonStr.indexOf('.');
        if (i == -1) {
          prec = 0;
        } else {
          prec = lonStr.length - i -1;
        }
        antLon = TVRO.formatLongitude(lon, prec);
      }
    } else if ((antSatID.charAt(antSatID.length-1) != "E") && (antSatID.charAt(antSatID.length-1) != "W")) {
      antLon = antSatID.substring(0, antSatID.length-1);
    } else {
      antLon =  antSatID;
    }

    return antLon;
  };

  TVRO.formatGPS = function(formatType, latitude, longitude) {
    var lon;
    var lat;

    if (formatType === 'input') {
      var validLat  = /^([0-9]{1,2}[\.]?[0-9]{0,4})(N{1}|S{1})$/ig;
      var validLon  = /^([0-9]{1,3}[\.]?[0-9]{0,4})(E{1}|W{1})$/ig;

      var parseLat  = validLat.exec(latitude);
      var parseLon  = validLon.exec(longitude);

      if (parseLat) {
        lat = parseLat[1];

        if (parseLat[2].toUpperCase() === "S") {
          lat = -lat;
        }

        if ((lat > 90) || (lat < -90)) {
          alert("Latitude is out of range.\nPlease enter a valid Latitude.")
          return Number(-1);            
        }
      } else {
        alert("Please enter a valid Latitude.");
        return Number(-1);
      }

      if (parseLon) {
        lon = parseLon[1];

        if (parseLon[2].toUpperCase() === "W") {
          lon = -lon;
        }

        if ((lon > 180) || (lon < -180)) {
          alert("Longitude is out of range.\nPlease enter a valid Longitude.")
          return Number(-1);            
        }
      } else {
        alert("Please enter a valid Longitude.");
        return Number(-1);
      }

      var latLonArray = [lat.toString(),lon.toString()];

    } else if (formatType === 'inputDisplay') {
      var lonArray;
      var latArray;

      lat = (Math.abs(latitude).toFixed(0));
      lon = (Math.abs(longitude).toFixed(0));

      if (latitude < 0) {
        var latArray = [lat, 'S']
      } else {
        var latArray  = [lat, 'N']
      }

      if (longitude < 0) {
        var lonArray = [lon, 'W']
      } else {
        var lonArray  = [lon, 'E']
      }
      
      var latLonArray = [latArray, lonArray];
      
    } else if (formatType === 'homePage') {
      
      // Parse the incoming lat/lon which is in decimal degree format.
      var parsedLat = latitude.split('.');
      var parsedLon = longitude.split('.');

      // The following four conditionals test to make sure the parsed array is
      // not undefined for some reason, so it does not display a NaN after the
      // math functions.
      
      if (!parsedLat[0]) {
        parsedLat[0] = 0;
      }
      
      if (!parsedLon[0]) {
        parsedLon[0] = 0;
      }

      if (!parsedLat[1]) {
        parsedLat[1] = 0;
      }
      
      if (!parsedLon[1]) {
        parsedLon[1] = 0;
      }
      
      // Take absolute of the parsed degree since it is pos/neg in the message.
      var latDeg = Math.abs(parsedLat[0]);
      var lonDeg = Math.abs(parsedLon[0]);

      // Calculate the decimal minute part. Must prepend the decimal since it
      // was stripped in the parse.
      var latMin = (('.' + parsedLat[1]) * 60).toFixed(2);
      var lonMin = (('.' + parsedLon[1]) * 60).toFixed(2);

      // Create the formated GPS string with non-breaking spaces so that HTML
      // does not collapse the space.
      if (latitude < 0) {
        lat = latDeg + '\xB0\u00A0\u00A0' + latMin + "'\u00A0\u00A0S";
      } else {
        lat = latDeg + '\xB0\u00A0\u00A0' + latMin + "'\u00A0\u00A0N";
      }

      if(longitude < 0) {
        lon = lonDeg  + '\xB0\u00A0\u00A0' + lonMin + "'\u00A0\u00A0W";
      } else {
        lon = lonDeg  + '\xB0\u00A0\u00A0'+ lonMin + "'\u00A0\u00A0E";
      }
      var latLonArray = [lat, lon];
    }

    return latLonArray;
  };

  //  for routing, hash changes

  var hash;
  var hashCallbacks = [];

  hashCallbacks.push(function(hash) {
    if (TVRO.debug) {
      console.log("-> #: " + hash);
    }
  });

  TVRO.onHashChange = function(arg) {
    if (_.isFunction(arg)) {
      hashCallbacks.push(arg);

    } else if (_.isUndefined(arg)) {
      _.invoke(hashCallbacks, 'call', null, hash);
    } else {
      hash = arg;
      window.location.hash = '#'+hash;
    }

    return TVRO;
  };

  TVRO.reload = function() {
    if (TVRO.debug) {
      console.log("-> #: reloading...");
    }

    hash = window.location.hash.substring(1);
    _.invoke(hashCallbacks, 'call', null, hash);
  };

  window.onhashchange = function() {
    if (hash !== window.location.hash.substring(1)) {
      TVRO.reload();
    }
  };

  TVRO.sendShellCommand = function(command) {
    //  http://stackoverflow.com/questions/2934789/triggering-shouldstartloadwithrequest-with-multiple-window-location-href-calls/2935005#2935005
    var iFrame = document.createElement('IFRAME');
    iFrame.setAttribute('src', 'tvro://' + command);
    document.body.appendChild(iFrame); 
    iFrame.parentNode.removeChild(iFrame);
    iFrame = null;
  };

  TVRO.showHelp = function(mapNo) {
    TVRO.getAntModel().then(function(model) {
      var helpUrl = RH_GetHelpUrlWithMapNo('help/' + model + '_Help' + '/index.htm', mapNo);
      
      if (TVRO.getShellMode()) {
        TVRO.sendShellCommand(helpUrl);
      } else {
        window.open('/' + helpUrl, 'TVHub Help', 'width=400,height=600,scrollbars=yes');
      }
    });    
  };

  window.TVRO = TVRO;

}(window);

$(function() {
  FastClick.attach(document.body);
});