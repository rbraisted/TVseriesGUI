!function(TVRO) {
  "use strict";

  var SkewAngleView = function(jQ) {
    var SatView = function(jQ) {
      return {
        setSat: function(sat) {
          if (!sat) return $('.\\#sat-name, .\\#sat-skew', jQ).text('N/A');
          //  grab the skews
          TVRO.getSatParams(sat).then(function(sat) {
            $('.\\#sat-name', jQ).text(sat.name + ' - ' + TVRO.formatLongitude(sat.lon, 0));
            $('.\\#sat-skew', jQ).text(sat.skew + '˚');            
          });
        }
      };
    };

    var satAView = SatView($('.\\#sat-a-view', jQ));
    var satBView = SatView($('.\\#sat-b-view', jQ));
    var satCView = SatView($('.\\#sat-c-view', jQ));
    var satDView = SatView($('.\\#sat-d-view', jQ));

    var nextBtn = $('.\\#next-btn', jQ).click(function() {
      window.location = '/wizard/activation.php';
    });

    var prevBtn = $('.\\#prev-btn', jQ).click(function() {
      window.history.back();
    });

    TVRO.getGroupMode().then(function(groupMode) {
      $('.\\#single', jQ).toggle(!groupMode);
      $('.\\#group', jQ).toggle(groupMode);

      if (groupMode) TVRO.getInstalledGroup().then(function(installedGroup) {
        satAView.setSat(installedGroup.satA);
        satBView.setSat(installedGroup.satB);
        satCView.setSat(installedGroup.satC);
        satDView.setSat(installedGroup.satD);
      });

      else TVRO.getInstalledSat().then(TVRO.getSatParams).then(function(installedSat) {
        $('.\\#single', jQ).text(installedSat.skew + '˚ Skew Angle');
      });
    });
  };



  var LinearSystemConfigView = function(jQ) {
    var config1 = {
      title: 'Configuration 1',
      subtitle: '1-4 Recievers (1 master reciever)',
      diagramHash: '/diagram-1'
    };

    var config2 = {
      title: 'Configuration 2',
      subtitle: '1-4 Recievers with AutoSwitch(es) installed (multiple master recievers)',
      diagramHash: '/diagram-2'
    };

    var config3 = {
      title: 'Configuration 3',
      subtitle: '5+ Receivers + multiswitch (manual satellite switching only)',
      diagramHash: '/diagram-3'
    };

    var config4 = {
      title: 'Configuration 4',
      subtitle: '5+ Recievers with AutoSwitch(es) installed (1+ master receivers) + multiswitch',
      diagramHash: '/diagram-4'
    };

    var self = TVRO.TableView($('.\\#table-view', jQ))
      .setValues([config1, config2, config3, config4])
      .onBuild(function(row, config) {
        $('.\\#title', row).text(config.title);
        $('.\\#subtitle', row).text(config.subtitle);
        $('.\\#info-btn', row).click(function(event) {
          event.stopPropagation();
          window.location.hash = config.diagramHash;
        });
      })
      .build();

    var nextBtn = $('.\\#next-btn', jQ).click(function() {
      var config = self.getValue();
      if (!config) alert('You must select an option to continue.');
      else if (config === config1) window.location.hash = '/regions';
      else if (config === config2) window.location.hash = '/groups';
      else if (config === config3) window.location.hash = '/groups/new/edit';
      else if (config === config4) window.location.hash = '/groups/new/edit';
    });

    var prevBtn = $('.\\#prev-btn', jQ).click(function() {
      window.history.back();
    });

    return self;
  };



  var OtherSystemConfigView = function(jQ) {
    var config1 = {
      title: 'Configuration #1',
      subtitle: 'One Receiver',
      bgimage: 'wizard-config-1.svg'
    };

    var config2 = {
      title: 'Configuration #2',
      subtitle: 'One Master Receiver + Multiswitch',
      bgimage: 'wizard-config-2.svg'
    };

    var config3 = {
      title: 'Configuration #3',
      subtitle: 'Multiple Receivers w/ AutoSwitch(es)',
      bgimage: 'wizard-config-3.svg'
    };

    var self = TVRO.TableView($('.\\#table-view', jQ))
      .setValues([config1, config2, config3])
      .onBuild(function(row, config) {
        $('.\\#title', row).text(config.title);
        $('.\\#subtitle', row).text(config.subtitle);
        $('.\\#image', row).css('background-image', 'url(/images/' + config.bgimage + ')');
      })
      .build();

    var nextBtn = $('.\\#next-btn', jQ).click(function() {
      var config = self.getValue();
      if (!config) alert('You must select an option to continue.');
      else if (config === config1) window.location = '/wizard/checkswitch.php#/config-1';
      else if (config === config2) window.location = '/wizard/checkswitch.php#/config-2';
      else if (config === config3) window.location = '/wizard/checkswitch.php#/config-3';
    });

    var prevBtn = $('.\\#prev-btn', jQ).click(function() {
      window.location = '/wizard/service.php#/dish-network'
    });

    return self;
  };

  TVRO.SkewAngleView = SkewAngleView;
  TVRO.LinearSystemConfigView = LinearSystemConfigView;
  TVRO.OtherSystemConfigView = OtherSystemConfigView;

}(window.TVRO);

$(function() {
  var skewAngleView = TVRO.SkewAngleView($('.\\#skew-angle-view'));
  var linearSystemConfigView = TVRO.LinearSystemConfigView($('.\\#linear-system-config-view'));
  var otherSystemConfigView = TVRO.OtherSystemConfigView($('.\\#other-system-config-view'));

  //  for popups
  $('.\\#back-btn').click(function() {
    window.location.hash = '/linear-system-config';
  });

  TVRO.onHashChange(function(hash) {

    //  tv1, tv3, tv5 manual

    if (!hash) {
      Promise.all(
        TVRO.getAntennaVersions(),
        TVRO.getSatelliteService()
      ).then(function(xmls) {
        var antModel = $('au model', xmls[0]).text();
        var lnbType = $('lnb polarization', xmls[0]).text();
        var isManual = $('available:first', xmls[1]).text() === 'N';
        var service = $('service', xmls[1]).text();
        var isTriAmericas = $('lnb name', xmls[0]).text() === 'Tri-Americas';

        if ((antModel === 'TV1' || antModel === 'TV3') && lnbType === 'linear') window.location.hash = '/skew-angle';
        else if ((antModel === 'TV5' && isManual) && lnbType === 'linear') window.location.hash = '/skew-angle';
        else if (service === 'BELL' || service === 'DISH') window.location.hash = '/other-system-config';
        else if (lnbType === 'linear') window.location.hash = '/linear-system-config';
        // else if (isTriAmericas) window.location.hash = '';
      });
    }

    document.body.className = hash;
  });

  TVRO.reload();
});