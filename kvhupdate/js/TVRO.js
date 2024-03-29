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

  // JG: test comment to verify change moves kvh update site, can be removed
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

    coordinate = Number(coordinate).toFixed(places);
    return coordinate > 0 ? coordinate+posStr : Math.abs(coordinate)+negStr;
  };

  TVRO.formatLatitude = _.curry(formatCoordinate, 2)('latitude');
  TVRO.formatLongitude = _.curry(formatCoordinate, 2)('longitude');


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
    console.log("!");
    TVRO.getAntennaVersions().then(function(xml) {
      var antModel = $('au model', xml).text();
      var helpUrl = RH_GetHelpUrlWithMapNo('help/' + antModel + '_Help' + '/index.htm', mapNo);  
      if (TVRO.getShellMode()) TVRO.sendShellCommand(helpUrl);
      else window.open('/' + helpUrl, 'TVHub Help', 'width=400,height=600');
    });    
  };


  window.TVRO = TVRO;

}(window);



$(function() {
  FastClick.attach(document.body);
});