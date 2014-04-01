//  requires TableView
!function(TVRO){
  "use strict";

  var UpdateView = function(jQ) {
    var self;
    var update;

    var downloadBtn = $('.\\#download-btn', jQ).click(function() {
      TVRO.getLatestSoftware(update).then(function(xml) {
        var portalVersion = $('software_version', xml).text() || $('version', xml).text();
        var portalUrl = $('url', xml).text();
        var shellUrl = 'tvro://updates/download/'+update+'/'+portalVersion+'/'+portalUrl;
        if (TVRO.shell) {
          window.location = shellUrl;
        } else {
          window.location = portalUrl;
        }
      });
    });

    var uploadBtn = $('.\\#upload-btn', jQ).click(function() {
      if (TVRO.shell) {
        window.location = 'tvro://updates/upload/'+update;
      } else {
        $.ajaxFileUpload({
          url: '/xmlservices.php/upload_software',
          secureuri: false,
          fileElementId: 'upload',
          dataType: 'xml',
          success: function(response) {
            var filename = $('file_name', response).text();
            var confirmed = confirm('Do you wish to install this update?');
            if (confirmed) {
              TVRO.installSoftware({
                install: 'Y',
                filename: filename
              }).then(TVRO.reload);
            }
          }
        });

      }
    });

    var installBtn = $('.\\#install-btn', jQ).click(function() {
      console.log('installBtn');
    });

    // $('[id ~= upload-btn ]', self).click(function() {
    //   console.log('tvro://updates/upload/'+antType);
    //   //  the uploading and installing process for native apps
    //   //  is handled entirely by native code
    //   if (TVRO.MOBILE_APP) {
    //     window.location = 'tvro://updates/upload/'+antType;
    //   } else {
    //     $.ajaxFileUpload({
    //       url : '/xmlservices.php/upload_software',
    //       secureuri : false,
    //       fileElementId : 'upload',
    //       dataType : 'xml',
    //       success : function(response) {
    //         if (confirm('Do you wish to install this update?')) {
    //           webService.request('install_software', {
    //             install: 'Y',
    //             filename: $('file_name', response).text()
    //           });
    //         }
    //       }
    //     });
    //   }
    // });

    return self = {
      setUpdate: function(arg) {
        update = arg;
        var antUpdate = update !== 'SatLibrary';
        var updateName = antUpdate ? update : 'Satellite Library';
        $('.\\#update-name', jQ).text(updateName);

        TVRO.getAntennaVersions().then(function(xml) {
          var connectedAnt = $('au model', xml).text();
          var connected = update === connectedAnt;
          var systemVersion = $('au ver', xml).text();

          jQ.removeClass('$antenna $sat-library $connected');

          if (antUpdate) {
            jQ.addClass('$antenna');
            jQ.toggleClass('$connected', connected);
            $('.\\#system-ver', jQ).text(systemVersion);
          } else {
            jQ.addClass('$sat-library');
            systemVersion = $('sat_list ver', xml).text();
            $('.\\#system-ver', jQ).text(systemVersion);
          }
        });

        TVRO.getLatestSoftware(update).then(function(xml) {
          var portalVersion = $('software_version', xml).text() || $('version', xml).text();
          $('.\\#portal-ver', jQ).text(portalVersion);
        });
      }
    };
  };

  TVRO.UpdateView = UpdateView;

}(window.TVRO);