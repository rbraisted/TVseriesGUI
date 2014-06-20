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
  
  //  for routing, hash changes

  var hash;
  var hashCallbacks = [];

  hashCallbacks.push(function(hash) {
    if (TVRO.debug) console.log("-> #: " + hash);
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
    if (TVRO.debug) console.log("-> #: reloading...");

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
      if (TVRO.getShellMode()) TVRO.sendShellCommand(helpUrl);
      else window.open('/' + helpUrl, 'TVHub Help', 'width=400,height=600,scrollbars=yes');
    });    
  };


  window.TVRO = TVRO;

}(window);



$(function() {
  FastClick.attach(document.body);
});