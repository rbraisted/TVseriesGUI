//requires TableView
!function(TVRO){
    "use strict";

    var UpdateView = function(jQ) {
        var self;
        var model;

        var flashCurrentBtn = $('.\\#flash-current-btn', jQ).click(function() {
            var confirmed = confirm('Are you sure you want to flash the current system software?');
            if (confirmed) TVRO.rollbackCurrent().then(TVRO.reload);
        });

        var flashAllBtn = $('.\\#flash-all-btn', jQ).click(function() {
            var confirmed = confirm('Are you sure you want to flash all system software?');
            if (confirmed) TVRO.rollbackAll().then(TVRO.reload);
        });

        var downloadBtn = $('.\\#download-btn', jQ).click(function() {
            Promise.all(
                    TVRO.getPortalVersion(model),
                    TVRO.getPortalUrl(model)
            ).then(function(res) {
                var version = res[0];
                var url = res[1];
                if (TVRO.getShellMode()) {
                    TVRO.sendShellCommand('download/' + model + '/' + version + '/' + url);
                } else {
                    window.location = url;
                    TVRO['setDownloaded' + model + 'UpdateVersion'](version);
                    setTimeout(function() {
                        window.location.reload();
                    }, 500);
                }
                jQ.removeClass('$not-available');
            });
        });

        var getConfirmation = function() {
            var confirmed = confirm('Software update takes up to 30 minutes during which TV programming is unavailable. Are you sure you want to proceed?');
            //  ran into a strange error here where confirmation alerts would stack up
            //  if you selected "Cancel" on the 2nd confirmation
            //  not sure why, but this seemed to fix it
            if (confirmed && jQ.hasClass('$antenna')) return confirmed = confirm('Please Note:\nTV-Hub loses network connection during software updates. If using Wi-Fi, you must reconnect to your TV-Hub network when it becomes available.');
            else return confirmed;
        };

        var uploadBtn = $('.\\#upload-btn', jQ).click(function(event) {
            if (TVRO.getShellMode()) {
                event.preventDefault();
                var confirmed = getConfirmation();
                if (confirmed) TVRO.sendShellCommand('upload/' + model);
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

                    TVRO.installFilename(filename).then(TVRO.reload);          
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
                    model = arg;

                    var antUpdate   = model !== 'SatLibrary';
                    var updateName  = antUpdate ? model : 'Satellite Library';
                    var updateType  = antUpdate ? 'System Software' : 'Satellite Library';
                    var installType = antUpdate ? model + ' System Software' : ' Satellite Library';
                    
                    $('.\\#update-name', jQ).text(updateName);
                    $('.\\#update-type', jQ).text(updateType);
                    $('.\\#download-type', jQ).text(installType + " Version ");
                    $('.\\#install-type', jQ).text(installType);

                    jQ.toggleClass('$tech-mode', TVRO.getTechMode());
                    jQ.toggleClass('$antenna', antUpdate);
                    jQ.toggleClass('$sat-library', !antUpdate);

                    Promise.all(
                            TVRO.getPortalVersion(model),
                            TVRO.getSystemVersion(),
                            TVRO.getDeviceVersions(),
                            TVRO.getAntState()
                    ).then(function(ret) {
                        var portalVer      = ret[0];
                        var appsVer        = ret[1][0];
                        var sysSynched     = ret[1][1] === 'Y' ? true : false;
                        var deviceVersions = ret[2];
                        var antState       = ret[3];

                        var downloadedVersionForThisUpdate = deviceVersions[model];

                        // Displays if software is detected from cache on the User Device.
                        if (downloadedVersionForThisUpdate === undefined || downloadedVersionForThisUpdate === "") {
                            $('.\\#usr-dev-sw', jQ).text("No software detected");
                        } else {
                            $('.\\#usr-dev-sw', jQ).text(installType + " Version " + downloadedVersionForThisUpdate + " detected");
                        }

                        // Turns the download arrow gray if the latest is
                        // detected on the User Device.
                        jQ.toggleClass('$has-downloaded-latest', downloadedVersionForThisUpdate === portalVer);

                        jQ.toggleClass('$not-available', portalVer === "N/A");
                        
                        // Display the Portal software version (Ant and SatLib)
                        $('.\\#portal-ver', jQ).text(portalVer);
                        
                        if (antUpdate) {
                            // Checks if the application version is greater
                        	// than or equal to the portal version in a case
                        	// of a portal version being rolled back. Also, the
                        	// ant versions compared in the hub must match.
                            var sysUpToDate = ((Number(appsVer) >= Number(portalVer)) && sysSynched);

                            jQ.toggleClass('$up-to-date', sysUpToDate);

                            // Check to see if the Ant is connected, if so
                            // display the connected block which hides the
                            // red x
                            var connected = (antState !== "DISCONNECTED");
                            jQ.toggleClass('$connected', connected);

                            // This block displays the proper update text.
                            if ((sysUpToDate) || 
                                ((portalVer === "N/A") &&
                                (sysSynched))) {
                                $('.\\system-version .\\#download-type', jQ).toggleClass("hide", false);
                                $('.\\#system-ver', jQ).toggleClass("green", false);
                                $('.\\#system-ver', jQ).text(appsVer + " installed");
                            } else {
                                $('.\\system-version .\\#download-type', jQ).toggleClass("hide", true);
                                $('.\\#system-ver', jQ).toggleClass("green", true);
                                $('.\\#system-ver', jQ).text("Software Update Required");
                            }

                            $('#fileToUpload').attr('accept', 'text/kvh');

                        } else { //  sat lib update

                            TVRO.getSatLibraryVersion().then(function(version) {
                                var libUpToDate = (version === portalVer);

                                jQ.toggleClass('$up-to-date', libUpToDate);

                                $('.\\system-version .\\#download-type', jQ).toggleClass("hide", false);
                                $('.\\#system-ver', jQ).toggleClass("green", false);
                                $('.\\#system-ver', jQ).text(version + " installed");
                            });

                            jQ.addClass('$connected');
                            $('#fileToUpload').attr('accept', 'text/xml');
                        } // End Sat Lib Else
                    }); // End Promise.all then.
                } // End setUpdate method
        };
    };

    TVRO.UpdateView = UpdateView;

}(window.TVRO);