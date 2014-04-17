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

  TVRO.setDemoMode = function(value) {
    if (TVRO.shell) {
      TVRO.demoMode = value;
      window.location = 'tvro://set-demo-mode/' + value;
    } else {
      set('tvro-demo-mode');
    }
  }

  TVRO.setTechMode = function(value) {
    if (TVRO.shell) {
      TVRO.techMode = value;
      window.location = 'tvro://set-tech-mode/' + value;
    } else {
      set('tvro-tech-mode');
    }
  }

  //  return as bool
  TVRO.getDemoMode = function() {
    $('#debugger').append('<br><br>~ getDemoMode');
    $('#debugger').append('<br>TVRO.shell: ' + TVRO.shell);
    $('#debugger').append('<br>TVRO.demoMode: ' + TVRO.demoMode);
    if (TVRO.shell) return TVRO.demoMode;
    else return !!get('tvro-demo-mode')();
  };

  TVRO.getTechMode = function() {
    if (TVRO.shell) return TVRO.techMode;
    else return !!get('tvro-tech-mode')();
  };
}(window.TVRO);