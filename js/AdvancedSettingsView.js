!function(TVRO) {
    "use strict";

    var AdvancedSettingsView = function(jQ) {
        var self;
        
        var techModeBtn = TVRO.ToggleBtn(jQ.find('.\\#tech-mode-btn'))
        .onClick(function(techMode) {
            TVRO.setTechMode(techMode);
            $('.\\#tech-mode', jQ).toggle(TVRO.getTechMode());
            if (TVRO.getShellMode()) TVRO.sendShellCommand('set-tech-mode/' + techMode); //window.location = 'tvro://set-tech-mode/' + techMode;
        });
        
        
        /** technician mode dropdown start **/

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

        TVRO.getLnbList().then(function(xml) {

        	lnbDropdownView.setValues(
        			_.map($('lnb_list name', xml), function(element) {
        				return $(element).text();
        			})	
        	).build();
        });

        var selectBtn = $('.\\#select-btn', lnbView).click(function() {
        	TVRO.setLnb({name:lnbDropdownView.getValue()});
        });        

        /** technician mode dropdown end **/

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

            // Only show the sidelobe block for a TV6 or TV8.
            Promise.all(
            TVRO.getAntModel(),
            TVRO.getLnbList()
            ).then(function(res) {
            	var model = res[0];
            	// Get the installed LNB and format to the list.
            	var lnb = $('installed_lnb part', res[1]).text() + " " + $('installed_lnb name', res[1]).text();

            	lnbLabel.text(lnb);
                lnbDropdownView.setValue(lnb);

                if ('TV8' === model) {
                    $('.\\#sidelobe-info').text("Keep Sidelobe Mode set to " +
                    		                "\"On\" unless directed " +
                    		                "otherwise by KVH Technical " +
                    		                "Support.");
                } else if ('TV6' === model) {
                    $('.\\#sidelobe-info').text("Since sidelobes are not strong enough " +
                                                "to become a problem in most regions, " +
                                                "keep Sidelobe Mode set to \"Off\" unless " +
                                                "directed otherwise by KVH Technical " +
                                                "Support.");
                }  

                jQ.toggleClass('$hide-view', model !== 'TV6' && model !== 'TV8');
            });

            // Only show the multiswitch block when a linear LNB.
            //TVRO.getLnbType().then(function(type) {
            //  jQ.toggleClass('$not-linear', type !== 'linear');
            //});

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
