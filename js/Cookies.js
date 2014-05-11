!function(TVRO) {
  "use strict";

  // https://developer.mozilla.org/en-US/docs/Web/API/document.cookie

  var get = function(key, asBool) {
    return function() {
      // return as bool
      var value = (decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || undefined);
      if (asBool) return !!value;
      else return value;
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

  TVRO.getDemoMode = get('tvro-demo-mode', true);
  TVRO.getTechMode = get('tvro-tech-mode', true);
  TVRO.getShellMode = get('tvro-shell-mode', true);

  TVRO.setInstallerCompany = set('tvro-installer-company');
  TVRO.setInstallerContact = set('tvro-installer-contact');
  TVRO.setInstallerPhone = set('tvro-installer-phone');
  TVRO.setInstallerEmail = set('tvro-installer-email');

  TVRO.getInstallerCompany = get('tvro-installer-company');
  TVRO.getInstallerContact = get('tvro-installer-contact');
  TVRO.getInstallerPhone = get('tvro-installer-phone');
  TVRO.getInstallerEmail = get('tvro-installer-email');

}(window.TVRO);