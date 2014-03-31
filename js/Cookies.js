!function(TVRO) {
  "use strict";

  // https://developer.mozilla.org/en-US/docs/Web/API/document.cookie

  var get = function(key) {
    return function() {
      return decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null;
    }
  };

  var set = function(key) {
    key = encodeURIComponent(key);
    return function(value) {
      if (value) {
        value = encodeURIComponent(value);
        document.cookie = key + '=' + value + '; path=/';
      } else {
        document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
      }
    }
  };

  TVRO.setDemoMode = set('tvro-demo-mode');
  TVRO.setTechMode = set('tvro-tech-mode');

  //  return as bool
  TVRO.getDemoMode = function() {
    return !!get('tvro-demo-mode')();
  };

  TVRO.getTechMode = function() {
    return !!get('tvro-tech-mode')();
  };
}(window.TVRO);