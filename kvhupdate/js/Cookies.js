!function(TVRO) {
  "use strict";

  // https://developer.mozilla.org/en-US/docs/Web/API/document.cookie

  var get = function(key) {
    return function() {
      // return as bool
      return !!(decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || null);
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

  TVRO.setShellMode = set('tvro-shell-mode');
  TVRO.setDemoMode = set('tvro-demo-mode');
  TVRO.setTechMode = set('tvro-tech-mode');

  TVRO.getDemoMode = get('tvro-demo-mode');
  TVRO.getTechMode = get('tvro-tech-mode');
  TVRO.getShellMode = get('tvro-shell-mode');

}(window.TVRO);