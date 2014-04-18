//  requires TableView
!function(TVRO){
  "use strict";

  var UpdateView = function(jQ) {
    var self;
    var update;

    var downloadBtn = $('.\\#download-btn', jQ).click(function() {
      TVRO.getLatestSoftware(update).then(function(xml) {
        var portalUrl = $('url', xml).text();
        var portalVersion = $('software_version', xml).text() || $('version', xml).text();
        var shellUrl = 'tvro://updates/download/'+update+'/'+portalVersion+'/'+portalUrl;
        if (TVRO.getShellMode()) window.location = shellUrl;
        else window.location = portalUrl;
        jQ.removeClass('$not-available');
      });
    });

    var clearInput = function() {
      $('#fileToUpload').wrap('<form>').closest('form').get(0).reset();
      $('#fileToUpload').unwrap();
      $('#fileToUpload').change(onChange);
    };

    var onChange = function() {
      if (!jQ.hasClass('$connected')) return;

      if (TVRO.getShellMode()) {
        window.location = 'tvro://updates/upload/'+update;

      } else {
        console.log("starting upload...");
        $.ajaxFileUpload({
          url: 'xmlservices.php/set_config_file',
          secureuri: false,
          fileElementId: 'fileToUpload',
          dataType: 'xml',
          success: function(xml) {
            if (TVRO.debug) {
              console.log('~ SET_CONFIG_FILE');
              console.log($(xml).get(0));
            }

            clearInput();

            var filename = $('file_name', xml).text();

            var confirmed = filename ? confirm('Do you want to install this update?') : false;
            if (confirmed) {
              TVRO.installSoftware({
                install: 'Y',
                filename: filename
              }).then(TVRO.reload);
            }
          },
          error: function(jqXHR, textStatus, errorThrown) {
            clearInput();
            if (TVRO.debug) {
              console.log('\n~ ! ~');
              console.log(jqXHR);
              console.log(textStatus);
              console.log(errorThrown);
              console.log('\n');
            }
          }
        });
      }
    };

    $('#fileToUpload').change(onChange);

    $('.\\#no-shell', jQ).toggle(!TVRO.getShellMode());
    $('.\\#shell', jQ).toggle(TVRO.getShellMode());

    return self = {
      setUpdate: function(arg) {
        update = arg;
        var antUpdate = update !== 'SatLibrary';
        var updateName = antUpdate ? update : 'Satellite Library';
        $('.\\#update-name', jQ).text(updateName);

        var getSystemVersion = TVRO.getAntennaVersions().then(function(xml) {
          var connectedAnt = $('au model', xml).text();
          var connected = update === connectedAnt;
          var systemVersion = $('current', xml).text();

          jQ.removeClass('$antenna $sat-library $connected');

          if (antUpdate) {
            jQ.addClass('$antenna');
            jQ.toggleClass('$connected', connected);
            $('.\\#system-ver', jQ).text(systemVersion);
          } else {
            jQ.addClass('$sat-library $connected');
            systemVersion = $('sat_list ver', xml).text();
            $('.\\#system-ver', jQ).text(systemVersion);
          }

          if (jQ.hasClass('$connected')) return systemVersion;
          else return -1;
        });

        var getPortalVersion = TVRO.getLatestSoftware(update).then(function(xml) {
          var portalVersion = $('software_version', xml).text() || $('version', xml).text();
          $('.\\#portal-ver', jQ).text(portalVersion);

          jQ.removeClass('$not-available');
          return portalVersion;
        }, function() {
          jQ.addClass('$not-available');
          return -1;
        });

        Promise.all(getSystemVersion, getPortalVersion).then(function(versions) {
          var systemVersion = versions[0];
          var portalVersion = versions[1];
          jQ.toggleClass('$up-to-date', systemVersion === portalVersion);
        });
      }
    };
  };

  TVRO.UpdateView = UpdateView;

}(window.TVRO);