//  requires TableView
!function(TVRO){
  "use strict";

  var UpdateView = function(jQ) {
    var self;
    var update;

    var flashCurrentBtn = $('.\\#flash-current-btn', jQ).click(function() {
      var confirmed = confirm('Are you sure you want to flash the current system software?');
      if (confirmed) TVRO.resetSoftware({ rollback: 'CURRENT' }).then(TVRO.reload);
    });
    
    var flashAllBtn = $('.\\#flash-all-btn', jQ).click(function() {
      var confirmed = confirm('Are you sure you want to flash all system software?');
      if (confirmed) TVRO.resetSoftware({ rollback: 'ALL' }).then(TVRO.reload);
    });

    var downloadBtn = $('.\\#download-btn', jQ).click(function() {
      TVRO.getLatestSoftware(update).then(function(xml) {
        var portalUrl = $('url', xml).text();
        var portalVersion = $('software_version', xml).text() || $('version', xml).text();
        var shellUrl = 'tvro://download/' + update + '/' + portalVersion + '/' + portalUrl;
        if (TVRO.getShellMode()) window.location = shellUrl;
        else window.location = portalUrl;
        jQ.removeClass('$not-available');
      });
    });

    var getConfirmation = function() {
      var confirmed = confirm('You are about to update the software on your TV-Hub, are you sure you want to proceed?');
      //  ran into a strange error here where confirmation alerts would stack up
      //  if you selected "Cancel" on the 2nd confirmation
      //  not sure why, but this seemed to fix it
      if (confirmed && jQ.hasClass('$antenna')) return confirmed = confirm('This operation may take up to 30 minutes during which you will not be able to obtain a satellite signal, are you sure you want to proceed?');
      else return confirmed;
    };

    var uploadBtn = $('.\\#upload-btn', jQ).click(function(event) {
      if (TVRO.getShellMode()) {
        event.preventDefault();
        var confirmed = getConfirmation();
        if (confirmed) window.location = 'tvro://upload/' + update;
      }
    });

    var clearInput = function() {
      $('#fileToUpload').wrap('<form>').closest('form').get(0).reset();
      $('#fileToUpload').unwrap();
      $('#fileToUpload').off('change').change(onChange);
    };

    var onChange = function() {
      if (!jQ.hasClass('$connected')) return;

      var confirmed = getConfirmation();
      if (!confirmed) {
        clearInput();
        return;
      }

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
          if (!filename) return alert('An unexpected error occured. Please try again later.');
          
          TVRO.installSoftware({
            install: 'Y',
            filename: filename
          }).then(TVRO.reload);
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
    };

    $('#fileToUpload').change(onChange);

    return self = {
      setUpdate: function(arg) {
        update = arg;
        var antUpdate = update !== 'SatLibrary';
        var updateName = antUpdate ? update : 'Satellite Library';
        $('.\\#update-name', jQ).text(updateName);

        jQ.toggleClass('$tech-mode', TVRO.getTechMode());

        var getSystemVersion = TVRO.getAntennaVersions().then(function(xml) {
          var connectedAnt = $('au model', xml).text();
          var connected = update === connectedAnt;
          var systemVersion = $('current', xml).text();

          jQ.removeClass('$antenna $sat-library $connected');

          if (antUpdate) {
            jQ.addClass('$antenna');
            jQ.toggleClass('$connected', connected);
            $('.\\#system-ver', jQ).text(systemVersion);
            $('#fileToUpload').attr('accept', 'text/kvh');
          } else {
            jQ.addClass('$sat-library $connected');
            systemVersion = $('sat_list ver', xml).text();
            $('.\\#system-ver', jQ).text(systemVersion);
            $('#fileToUpload').attr('accept', 'text/xml');
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

        TVRO.getDeviceVersions().then(function(deviceVersions) {
          $('.\\#device-ver-label', jQ).show();
          $('.\\#no-device-ver-label', jQ).hide();
          $('.\\#device-ver', jQ).text(deviceVersions[update] || 'N/A');
        });
      }
    };
  };

  TVRO.UpdateView = UpdateView;

}(window.TVRO);