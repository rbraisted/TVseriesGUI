!function(TVRO) {
  "use strict";

  var SkewAngleView = function(jQ) {
    var SatView = function(jQ) {
      return {
        setSat: function(sat) {
          if (!sat) return $('.\\#sat-name, .\\#sat-skew', jQ).text('N/A');
          //  grab the skews
          TVRO.getSatParams(sat).then(function(sat) {
            $('.\\#sat-name', jQ).text(sat.name + ' - ' + TVRO.formatOrbitalSlot(sat.antSatID, sat.lon));
            $('.\\#sat-skew', jQ).text(sat.computedSkew);
          });
        }
      };
    };

    var satAView = SatView($('.\\#sat-a-view', jQ));
    var satBView = SatView($('.\\#sat-b-view', jQ));
    var satCView = SatView($('.\\#sat-c-view', jQ));
    var satDView = SatView($('.\\#sat-d-view', jQ));

    var nextBtn = $('.\\#next-btn', jQ).click(function() {
      window.location.hash = '/linear-system-config';
    });

    var prevBtn = $('.\\#prev-btn', jQ).click(function() {
      window.location = '/wizard/satellites.php';
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
        $('.\\#single', jQ).text(installedSat.computedSkew + '˚ Skew Angle');
      });
    });
  };



  var LinearSystemConfigView = function(jQ) {
    var config1 = {
        title: 'Configuration 1',
        subtitle: '1-4 Receivers (1 master receiver)',
        diagramHash: '/diagram-1'
    };

    var config2 = {
        title: 'Configuration 2',
        subtitle: '1-4 Receivers with AutoSwitch(es) installed (multiple master receivers)',
        diagramHash: '/diagram-2'
    };

    var config3 = {
        title: 'Configuration 3',
        subtitle: '5+ Receivers + multiswitch (manual satellite switching only)',
        diagramHash: '/diagram-3'
    };

    var config4 = {
        title: 'Configuration 4',
        subtitle: '5+ Receivers with AutoSwitch(es) installed (1+ master receivers) + multiswitch',
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
      if (!config)
        alert('You must select an option to continue.');
      else if ((config === config1) || (config === config3))
        window.location = '/wizard/activation.php';
      else
        window.location = '/wizard/autoswitch.php';
    });

    var prevBtn = $('.\\#prev-btn', jQ).click(function() {
      Promise.all(
        TVRO.getAntModel(),
        TVRO.getAntSysIdModel(),
        TVRO.getLnbType()
      ).then(function(res) {
        var model = res[0];
        var sysIdModel = res[1];
        var lnbType = res[2];

        if ((lnbType === 'linear') &&
            ((model === 'RV1') ||
             (model === 'TV1') ||
             (model === 'TV3') || 
             (sysIdModel === 'TV5') ||
             (sysIdModel === 'TV6') ||
             (sysIdModel === 'TV8'))) {
          window.location.hash = '/skew-angle';
        } else {
          window.location = '/wizard/satellites.php';
        }
      });   
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
        subtitle: 'Multiple Receivers',
        bgimage: 'wizard-config-2.svg'
    };

    var config3 = {
        title: 'Configuration #3',
        subtitle: 'Multiple Receivers with IP Autoswitch',
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
        TVRO.getAntModel(),
        TVRO.getAntSysIdModel(),
        TVRO.getLnbType(),
        TVRO.getLnbPart(),
        TVRO.getService()
      ).then(function(res) {
        var model = res[0];
        var sysIdModel = res[1];
        var lnbType = res[2];
        var service = res[4];
        var isTriAmericas = res[3] === '19-0577';

        if ((lnbType === 'linear') &&
            ((model === 'RV1') ||
             (model === 'TV1') ||
             (model === 'TV3') || 
             (sysIdModel === 'TV5') ||
             (sysIdModel === 'TV6') ||
             (sysIdModel === 'TV8'))) {
          window.location.hash = '/skew-angle';

        } else if (service === 'BELL' || service === 'DISH') {
          window.location.hash = '/other-system-config';

        } else if (lnbType === 'linear' || isTriAmericas) {
          window.location.hash = '/linear-system-config';
        }
      });
    }

    document.body.className = hash;
  });

  TVRO.reload();
});