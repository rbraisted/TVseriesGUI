$(function() {
    var headerView = TVRO.HeaderView($('.\\#header-view'));

    setInterval(function() {
        headerView.reload();
    }, 3000);
    

    var menuTableView = TVRO.TableView($('.\\#menu-table-view'))
    .setValues([
                'TV1',
                'TV3',
                'TV5',
                'TV6',
                'TV8',
                'RV1',
                'A9',
                'SatLibrary'
                ])
    .onBuild(function(row, update) {
        var techMode   = TVRO.getTechMode();
        var antUpdate  = update !== 'SatLibrary';
        var updateName = antUpdate ? update : 'Satellite Library';
        
        $('.\\#update-name', row).text(updateName);

        row.toggleClass('$antenna', antUpdate);
        row.toggleClass('$sat-library', !antUpdate);

        Promise.all(
                TVRO.getPortalVersion(update),
                TVRO.getAntModel(),
                TVRO.getAntState()
        ).then(function(args) {
            var portalVer = args[0];
            var model     = args[1];
            var antState  = args[2];

            // Display the portal versions
            $('.\\#portal-ver', row).text(portalVer);

            // Display only the Sat Lib and ant model unless tech mode.
            row.toggle(techMode || (update === model) || !antUpdate);

            if (antUpdate) {
                // Check to see if the Ant is connected, if so
                // display the connected block which hides the
                // red x
                var connected = (update === model) && (antState !== "DISCONNECTED");
                row.toggleClass('$connected', connected);

                TVRO.getSystemVersion().then(function(arg) {
                    var appsVer    = arg[0];
                    var sysSynched = arg[1] === 'Y' ? true : false;

                    $('.\\#update-req', row).toggleClass("green", true);

                    // This block displays the proper update text.
                    // Checks if the application version is greater than or
                    // equal to the portal version in a case of a portal
                    // version being taken down.
                    if ((sysSynched) &&
                        (Number(appsVer) >= Number(portalVer))) {
                        $('.\\#update-req', row).text("Software up-to-date");
                    } else {
                        $('.\\#update-req', row).text("Software Update Required");
                    }
                });

            } else { //  sat lib update
                TVRO.getSatLibraryVersion().then(function(version) {
                    $('.\\#update-req', row).toggleClass("green", false);
                    $('.\\#update-req', row).text("Installed version: " + version);
                });
            }
        });
    })
    .onClick(function(update) {
        window.location.hash = '/' + update;
    })
    .build();


    var updateView = TVRO.UpdateView(
            $('.\\#update-view')
            .find('.\\#back-btn')
            .click(function() {
                window.location.hash = '';
            })
            .end()
    );

    //  initializations

    TVRO.onHashChange(function(hash) {
        headerView.reload();

        //  so that device versions can be updated
        //  after the file has been downloaded in to the shell
        if (TVRO.getShellMode()) {
            menuTableView.build();
        }

        if (hash) {
            var update = hash.substr(1);
            menuTableView.setValue(update);
            updateView.setUpdate(update);
            document.body.className = '/update';
        } else {
            // set connected ant as default view
            TVRO.getAntModel().then(function(model) {
                menuTableView.setValue(model);
                updateView.setUpdate(model);
            });

            document.body.className = '';
        }
    });

    TVRO.reload();
});


