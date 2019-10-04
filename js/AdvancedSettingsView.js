!function(TVRO) {
    "use strict";

    var usrLnbTextArray = ["",
                           "",
                           "Stacked Circular",
                           "TriAmericas Circular",
                           "DIRECTV-L.A.",
                           "Linear Single",
                           "Linear Universal Dual",
                           "Linear Universal Quad",
                           "",
                           "",
                           "",
                           /* In Settings/Advanced, add the new LNB "UHD7 Circular" to the drop down list - Start - UHD7 - STWA-303 */
                           "UHD7 Circular"
                           /* In Settings/Advanced, add the new LNB "UHD7 Circular" to the drop down list - End - UHD7 - STWA-303 */
                           ];

    function convertToHubLnb(usrLnbText){
        var hubLnbArray = [];
        var deferred = $.Deferred();

        TVRO.getLnbList().then(function(xml) {

            $(xml).find('lnb_list name').each(function(){
                hubLnbArray.push($(this).text());
            });

            switch(usrLnbText) {
            case usrLnbTextArray[2]:
                deferred.resolve(hubLnbArray[2]);
            break;
            case usrLnbTextArray[3]:
                deferred.resolve(hubLnbArray[3]);
            break;
            case usrLnbTextArray[4]:
                deferred.resolve(hubLnbArray[4]);
            break;
            case usrLnbTextArray[5]:
                deferred.resolve(hubLnbArray[5]);
            break;
            case usrLnbTextArray[6]:
                deferred.resolve(hubLnbArray[6]);
            break;
            case usrLnbTextArray[7]:
                deferred.resolve(hubLnbArray[7]);
            break;
            /* In Settings/Advanced, add the new LNB "UHD7 Circular" to the drop down list - Start - UHD7 - STWA-303 */
            case usrLnbTextArray[11]:
                deferred.resolve(hubLnbArray[11]);
            break;
            /* In Settings/Advanced, add the new LNB "UHD7 Circular" to the drop down list - End - UHD7 - STWA-303 */
            case usrLnbTextArray[0]:
            case usrLnbTextArray[1]:
            case usrLnbTextArray[8]:
            case usrLnbTextArray[9]:
            case usrLnbTextArray[10]:
            default:
                alert("Error selecting LNB Type.");
            return -1;
            break;
            }            
        });
        return deferred.promise();        
    };

    function convertToUsrLnb(hubLnbPart){

        switch(hubLnbPart) {
        case "19-0815":
            return usrLnbTextArray[2];
            break;
        case "19-0577":
            return usrLnbTextArray[3];
            break;
        case "19-0805":
            return usrLnbTextArray[4];
            break;
        case "19-0444":
            return usrLnbTextArray[5];
            break;
        case "19-0298":
            return usrLnbTextArray[6];
            break;
        case "19-0299":
            return usrLnbTextArray[7];
            break;
        case "19-0516":
        case "19-0398":
        case "19-0863":
        case "19-0864":
        case "19-0837":
            return "Custom LNB";
            break;
        /* In Settings/Advanced, add the new LNB "UHD7 Circular" to the drop down list - Start - UHD7 - STWA-303 */
        case "02-2289":
            return usrLnbTextArray[11];
            break;
        /* In Settings/Advanced, add the new LNB "UHD7 Circular" to the drop down list - End - UHD7 - STWA-303 */
        default:
            return "Unknown LNB";
        break;
        }
    }
    var AdvancedSettingsView = function(jQ) {
        var self;

        var techModeBtn = TVRO.ToggleBtn(jQ.find('.\\#tech-mode-btn'))
        .onClick(function(techMode) {

            TVRO.setTechMode(techMode);
            $('.\\#tech-mode', jQ).toggle(TVRO.getTechMode());
            // Resize the sidebar due to the addition or subtraction of the
            // Technician Mode elements
            TVRO.resizeSidebar("advanced");

            if (TVRO.getShellMode()){
                TVRO.sendShellCommand('set-tech-mode/' + techMode); //window.location = 'tvro://set-tech-mode/' + techMode;
            }
        });

        var lnbView  = $('.\\#lnb-view', jQ);
        var lnbLabel = $('.\\#lnb', lnbView);

        var lnbDropdownView = TVRO.DropdownView($('.\\#lnb-dropdown-view'))
        .onClick(function(lnb) {
            lnbLabel.text(lnb);
        });

        var showLnbDropdownView = function() {
            lnbDropdownView.show();
        };

        var lnbDropdownBtn = $('.\\#lnb-btn', lnbView).click(showLnbDropdownView);

        lnbDropdownView.setValues(_.without(usrLnbTextArray,"")).build();

        var selectBtn = $('.\\#select-btn', lnbView).click(function() {

            var confirmed = confirm('Are you sure you want to change the LNB type?\nIt must match the LNB that is currently installed in the antenna.');
            if(confirmed){
                Promise.all(
                        convertToHubLnb(lnbDropdownView.getValue())
                ).then(function(lnb){
                    if ((lnb.toString() != "-1") &&
                        (lnb.toString() != "undefined")) {
                        TVRO.setLnb({name:lnb.toString()});
                    }
                });
            }
        });        

        var saveBtn = $('.\\#save-btn', jQ).click(function() {
            sessionStorage['kvhupdate'] = $('.\\#update-url', jQ).val();
        });

        var sleepModeBtn = TVRO.ToggleBtn(jQ.find('.\\#sleep-mode-btn'))
        .onClick(TVRO.setSleepMode);

        var sidelobeModeBtn = TVRO.ToggleBtn(jQ.find('.\\#sidelobe-mode-btn'))
        .onClick(TVRO.setSidelobeMode);

        var multiswitchModeBtn = TVRO.ToggleBtn(jQ.find('.\\#multiswitch-mode-btn'))
        .onClick(TVRO.setMultiswitchMode);

        var reload = function() {

            techModeBtn.setOn(TVRO.getTechMode());
            $('.\\#tech-mode', jQ).toggle(TVRO.getTechMode());
            $('.\\#update-url', jQ).val(sessionStorage['kvhupdate']);

            Promise.all(
                    TVRO.getAntModel(),
                    TVRO.getLnbList()
            ).then(function(res) {  

                var model   = res[0];
                var lnbPart = $('installed_lnb part', res[1]).text();

                if ('A9' === model) {
                    lnbView.addClass('$hide-view');
                } else {
                    var usrLnbText;
                    usrLnbText = convertToUsrLnb(lnbPart);
                    lnbLabel.text(usrLnbText);
                    lnbDropdownView.setValue(usrLnbText);
                }
                // Only show the sidelobe block for a TV6, TV8, or UHD7.
                if ('TV8' === model) {
                    $('.\\#sidelobe-info').text("Keep Sidelobe Mode set to " +
                                                "\"On\" unless directed " +
                                                "otherwise by KVH Technical " +
                                                "Support.");
                } else if (('TV6' === model) || ('UHD7' === model)) {
                    $('.\\#sidelobe-info').text("Since sidelobes are not strong enough " +
                                                "to become a problem in most regions, " +
                                                "keep Sidelobe Mode set to \"Off\" unless " +
                                                "directed otherwise by KVH Technical " +
                                                "Support.");
                } else {
                    $('.sidelobe-mode').addClass('$hide-view');
                }
                // Resize after element hiding has been done.
                TVRO.resizeSidebar("advanced");
            });

            TVRO.getSleepMode().then(sleepModeBtn.setOn);
            TVRO.getSidelobeMode().then(sidelobeModeBtn.setOn);
            TVRO.getMultiswitchMode().then(multiswitchModeBtn.setOn);

        };

        return self = {
                reload: reload
        };
    };

    TVRO.AdvancedSettingsView = AdvancedSettingsView;

}(window.TVRO);
