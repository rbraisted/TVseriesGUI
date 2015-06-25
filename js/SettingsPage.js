$(function() {

    var headerView = TVRO.HeaderView($('.\\#header-view'));

    setInterval(function() {
        headerView.reload();
    }, 3000);

    var menuTableView = TVRO.TableView($('.\\#menu-table-view'))
    .setValues([
                'General',
                'Network',
                'Advanced'
                ])
                .onClick(function(value) {
                    window.location.hash = '/' + value.toLowerCase();
                })
                .onBuild(function(row, value) {
                    $('.\\#menu-item', row).text(value);
                })
                .build();

    var generalSettingsView = TVRO.GeneralSettingsView(
            $('.\\#general-settings-view')
            .find('.\\#back-btn')
            .click(function() {
                window.location.hash = '';
            })
            .end()
    );

    var advancedSettingsView = TVRO.AdvancedSettingsView(
            $('.\\#advanced-settings-view')
            .find('.\\#back-btn')
            .click(function() {
                window.location.hash = '';
            })
            .end()
    );

    var vesselLocationView = TVRO.VesselLocationView(
            $('.\\#vessel-location-view')
            .find('.\\#back-btn')
            .click(function() {
                window.location.hash = '';
            })
            .end()
    );

    var networkSettingsView = TVRO.NetworkSettingsView(
            $('.\\#network-settings-view')
            .find('.\\#back-btn')
            .click(function() {
                window.location.hash = '';
            })
            .end()
            .find('.\\#ethernet-btn')
            .click(function() {
                window.location.hash = '/network/ethernet';
            })
            .end()
            .find('.\\#wireless-btn')
            .click(function() {
                window.location.hash = '/network/wireless';
            })
            .end()
    );

    var ethernetSettingsView = TVRO.EthernetSettingsView(
            $('.\\#ethernet-settings-view')
            .find('.\\#back-btn')
            .click(function() {
                window.location.hash = '/network';
            })
            .end()
    );

    var wirelessSettingsView = TVRO.WirelessSettingsView(
            $('.\\#wireless-settings-view')
            .find('.\\#back-btn')
            .click(function() {
                window.location.hash = '/network';
            })
            .end()
    );

    function resizeSidebar(page) {
        if( $(window).load()){
            var pageHeight;
            switch(page){
            case "advanced":
                pageHeight = document.getElementsByClassName("#advanced-settings-view")[0].scrollHeight;
                break;
            case "general":
                pageHeight = document.getElementsByClassName("#general-settings-view")[0].scrollHeight;
                break;
            case "network":
                pageHeight = document.getElementsByClassName("#network-settings-view")[0].scrollHeight;
                break;
            case "location":
                pageHeight = document.getElementsByClassName("#vessel-location-view")[0].scrollHeight;
                break;
            }

            var sidebarElement = document.getElementsByClassName("sidebar")[0];

            sidebarElement.style.height = pageHeight + "px";
        }
    };

    //  pretty simple routing
    //  /general
    //  /advanced
    //  /network
    //  /network/ethernet
    //  /network/wireless

    TVRO.onHashChange(function(hash) {
        headerView.reload();

        if (!hash) {
            menuTableView.setValue('General');
            Promise.all(
                    generalSettingsView.reload()
            ).then(function(){
                resizeSidebar("general");
            });

        } else if (hash.match(/\/general/)) {
            menuTableView.setValue('General');
            Promise.all(
                    generalSettingsView.reload()
            ).then(function(){
                resizeSidebar("general");
            });

        } else if (hash.match(/\/vessel-location/)) {
            menuTableView.setValue('General');
            Promise.all(
                    vesselLocationView.reload()
            ).then(function(){
                resizeSidebar("location");
            });

        } else if (hash.match(/\/advanced/)) {
            menuTableView.setValue('Advanced');
            Promise.all(
                    advancedSettingsView.reload()
            ).then(function(){
                resizeSidebar("advanced");
            });


        } else if (hash.match(/\/network/)) {
            menuTableView.setValue('Network');
            Promise.all(
                    networkSettingsView.reload()
            ).then(function(){
                resizeSidebar("network");
            });

            if (hash.match(/\/ethernet/)) ethernetSettingsView.reload();
            else if (hash.match(/\/wireless/)) wirelessSettingsView.reload();
        }

        document.body.className = hash; 
    });
    TVRO.resizeSidebar = resizeSidebar;
    TVRO.reload();
});