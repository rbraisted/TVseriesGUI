!function(TVRO) {
  "use strict";

  // https://developer.mozilla.org/en-US/docs/Web/API/document.cookie

  var get = function(key, asBool) {
    return function() {
      // return as bool
      var value = (decodeURIComponent(document.cookie.replace(new RegExp('(?:(?:^|.*;)\\s*' + encodeURIComponent(key).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*([^;]*).*$)|^.*$'), '$1')) || undefined);
      if (asBool) return !!value;
      else return value;
    };
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
    };
  };

  TVRO.setDemoMode = set('tvro-demo-mode');
  TVRO.setTechMode = set('tvro-tech-mode');
  TVRO.setShellMode = set('tvro-shell-mode');
  TVRO.setSatfinderMode = set('tvro-satfinder-mode');

  TVRO.getDemoMode = get('tvro-demo-mode', true);
  TVRO.getTechMode = get('tvro-tech-mode', true);
  TVRO.getShellMode = get('tvro-shell-mode', true);
  TVRO.getSatfinderMode = get('tvro-satfinder-mode', true);

  TVRO.setInstallerCompany = set('tvro-installer-company');
  TVRO.setInstallerContact = set('tvro-installer-contact');
  TVRO.setInstallerPhone = set('tvro-installer-phone');
  TVRO.setInstallerEmail = set('tvro-installer-email');

  TVRO.getInstallerCompany = get('tvro-installer-company');
  TVRO.getInstallerContact = get('tvro-installer-contact');
  TVRO.getInstallerPhone = get('tvro-installer-phone');
  TVRO.getInstallerEmail = get('tvro-installer-email');

  TVRO.getDownloadedSatLibraryUpdateVersion = get('tvro-downloaded-sat-library-update-version');
  TVRO.getDownloadedTV1UpdateVersion = get('tvro-downloaded-tv1-update-version');
  TVRO.getDownloadedTV3UpdateVersion = get('tvro-downloaded-tv3-update-version');
  TVRO.getDownloadedTV5UpdateVersion = get('tvro-downloaded-tv5-update-version');
  TVRO.getDownloadedTV6UpdateVersion = get('tvro-downloaded-tv6-update-version');
  TVRO.getDownloadedRV1UpdateVersion = get('tvro-downloaded-rv1-update-version');

  TVRO.setDownloadedSatLibraryUpdateVersion = set('tvro-downloaded-sat-library-update-version');
  TVRO.setDownloadedTV1UpdateVersion = set('tvro-downloaded-tv1-update-version');
  TVRO.setDownloadedTV3UpdateVersion = set('tvro-downloaded-tv3-update-version');
  TVRO.setDownloadedTV5UpdateVersion = set('tvro-downloaded-tv5-update-version');
  TVRO.setDownloadedTV6UpdateVersion = set('tvro-downloaded-tv6-update-version');
  TVRO.setDownloadedRV1UpdateVersion = set('tvro-downloaded-rv1-update-version');

}(window.TVRO);