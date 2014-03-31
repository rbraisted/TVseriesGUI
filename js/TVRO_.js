!function(window) {
  "use strict";

  //  don't know if this really helps
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




  var TVRO = {
    debug: 0
  };


  //  for formatting longitude/latitude for display
  //  -122.05 becomes 122.05W, etc
  var formatCoordinate = function(type, coordinate, places) {
    var posStr, negStr;
    if (type === 'latitude') {
      posStr = 'N';
      negStr = 'S';
    } else {  // assume longitude
      posStr = 'E';
      negStr = 'W';
    }

    coordinate = Number(coordinate).toFixed(places);
    return coordinate > 0 ? coordinate+posStr : Math.abs(coordinate)+negStr;
  };

  TVRO.formatLatitude = _.curry(formatCoordinate, 2)('latitude');
  TVRO.formatLongitude = _.curry(formatCoordinate, 2)('longitude');


  //  for routing, hash changes

  var hash;
  var hashCallbacks = [];

  hashCallbacks.push(function(hash) {
    if (TVRO.debug) console.log("-> #: "+hash);
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
















  window.TVRO = TVRO;

}(window);