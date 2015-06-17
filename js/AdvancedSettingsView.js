!function(TVRO) {
    "use strict";

    var AdvancedSettingsView = function(jQ) {
        var self;
	var lnbView        = $('.\\#lnb-view', jQ)
        var techModeBtn = TVRO.ToggleBtn(jQ.find('.\\#tech-mode-btn'))
        .onClick(function(techMode) {
            TVRO.setTechMode(techMode);
            $('.\\#tech-mode', jQ).toggle(TVRO.getTechMode());
            if (TVRO.getShellMode()) TVRO.sendShellCommand('set-tech-mode/' + techMode); //window.location = 'tvro://set-tech-mode/' + techMode;
        });
        
        
        /** technician mode dropdown start **/
        
        var name_array = [];
        var setSource = _.curry(function(webServiceCall, source) {
       // console.log(webServiceCall);
	
		var params = {
		                name: $('#lnb').html()
		};
		return webServiceCall(params);
	    });
        
        var getSources = function(type, xml) {
	   return  _.map($(type, xml), function(element) {
	        var nameArray;
	        nameArray = {lnb_name:$(element).text()};
	        name_array[name_array.length] = nameArray;
	        return nameArray.lnb_name;
	    })
	};
	
        var lnbLabel = $('.\\#lnb', lnbView);
        var lnbDropdownView = TVRO.DropdownView($('.\\#lnb-dropdown-view'));
        var showLnbDropdownView = function(val) {
        
        	TVRO.getLnbList().then(function(xml) {
        	$('.lnb').html("");
        	
        	var selectedPart;
			_.map($('installed_lnb', xml), function(installed) {
				_.map($('part', installed), function(part) {
					//alert($(part).text());
					selectedPart = $(part).text();
				})
			})
		
			_.map($('lnb_list', xml), function(element) {

				var listSources = getSources('name', element);
		       		for(var i=0; i<listSources.length; i++)
		       		{
		       			//alert(listSources[i].split(" ")[0]);
		       			if(selectedPart == listSources[i].split(" ")[0])
		       			{
		       				$('.\\#lnb').html(listSources[i]);
		       				$("<div class='table-row lnb-row #table-row $selected'><span class='table-col dropdown-icon'></span><span class='table-col #dropdown-value'>"+listSources[i]+"</span></div>").appendTo(".lnb");
		       			}
		       			else
		       			{
		       				$("<div class='table-row lnb-row #table-row'><span class='table-col dropdown-icon'></span><span class='table-col #dropdown-value'>"+listSources[i]+"</span></div>").appendTo(".lnb");
		       			}
		       		}
			})

                });
                if(val == "hide")
                {
                	lnbDropdownView.hide();
                }
                else
                {
                	lnbDropdownView.show();
                }

            setTimeout(function() {
            	 $('.lnb-row').click(function(){
			 $('.lnb-row').removeClass('$selected');
			 $(this).addClass('$selected');
			$('.\\#lnb').html($(this).children().next().html());
			TVRO.DropdownView($('.\\#lnb-dropdown-view')).hide();
			setSource(TVRO.setLnb)
		});
            
            }, 500);
        };
        
        showLnbDropdownView("hide");
        var lnbDropdownBtn = $('.\\#lnb-btn', lnbView).click(showLnbDropdownView);
        
        
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
            TVRO.getAntModel().then(function(model) {

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
