!function(TVRO) {
  "use strict";

  var InstallerIdView = function(jQ) {
    var self = TVRO.TableView($('.\\#table-view', jQ))
      .setValues(['CDT', 'DIY'])
      .onBuild(function(row, value) {
        if (value === 'CDT') $('.\\#value', row).text('Certified Dealer Technician');
        if (value === 'DIY') $('.\\#value', row).text('System Owner (do-it-yourself install)');
      });

    var nextBtn = $('.\\#next-btn', jQ).click(function() {
      var value = self.getValue();
      if (!value) alert('You must select an option to continue.');
      else if (value === 'CDT') window.location.hash = '/cdt-vessel-info';
      else if (value === 'DIY') window.location.hash = '/diy-vessel-info';
    });

    var prevBtn = $('.\\#prev-btn', jQ).click(function() {
      window.location = '/wizard';
    });

    TVRO.getProductRegistration().then(function(xml) {
      var vessel = $('product vessel_name', xml).text();
      var company = $('dealer company', xml).text();
      if (company) self.setValue('CDT'); //  if installer company set, we last chose CDT
      else if (vessel) self.setValue('DIY'); //  else if vessel name set, we last chose DIY
      self.build();
    });

    return self;
  };


  //  use as base class for
  //  VesselInfoView (which is the base class for DIY and CDT vessel info views)
  //  and InstallerInfoView
  var InfoView = function(jQ) {
    return {
      isValid: function() {
        var isValid = true;

        $('input', jQ).each(function() {
          var input = $(this);
          if (this.hasAttribute('required') && !this.value) {
            if (input.hasClass('#vessel')) alert('You must enter a vessel name to continue.');
            else if (input.hasClass('#company')) alert('You must enter a company name to continue.');
            else if (input.hasClass('#owner')) alert('You must enter an owner name to continue.');
            else if (input.hasClass('#contact')) alert('You must enter a contact name to continue.');
            else if (input.hasClass('#phone')) alert('You must enter a phone number to continue.');
            else if (input.hasClass('#email')) alert('You must enter an email address to continue.');
            isValid = false;
            return false;
          }
        });

        return isValid;
      }
    };
  };



  var VesselInfoView = function(jQ) {
    var self = InfoView(jQ);

    TVRO.getProductRegistration().then(function(xml) {
      var vessel = $('product vessel_name', xml).text();
      var owner = $('user name', xml).text();
      var contact = $('user contact', xml).text();
      var phone = $('user phone', xml).text();
      var email = $('user email', xml).text();
      $('.\\#vessel', jQ).val(vessel);
      $('.\\#owner', jQ).val(owner);
      $('.\\#contact', jQ).val(contact);
      $('.\\#phone', jQ).val(phone);
      $('.\\#email', jQ).val(email);
    });

    return _.merge(self, {
      setVesselInfo: function() {
        var vessel = $('.\\#vessel', jQ).val();
        var owner = $('.\\#owner', jQ).val();
        var contact = $('.\\#contact', jQ).val();
        var phone = $('.\\#phone', jQ).val();
        var email = $('.\\#email', jQ).val();

        return TVRO.setProductRegistration({
          product: {
            vessel_name: vessel
          },
          user: {
            name: owner,
            contact: contact,
            phone: phone,
            email: email
          }
        });
      }
    });
  };



  var CdtVesselInfoView = function(jQ) {
    var self = VesselInfoView(jQ);

    var prevBtn = $('.\\#prev-btn', jQ).click(function() {
      TVRO.getAntennaVersions().then(function(xml) {
        var antModel = $('au model', xml).text();
        if (antModel === 'TV5' || antModel === 'TV6') window.location = '/wizard/';
        else window.location.hash = '/installer-id';
      });
    });

    var nextBtn = $('.\\#next-btn', jQ).click(function() {
      if (!self.isValid()) return;
      self.setVesselInfo().then(function() {
        window.location.hash = '/installer-info';
      });
    });

    return self;
  };



  var DiyVesselInfoView = function(jQ) {
    var self = VesselInfoView(jQ);

    var prevBtn = $('.\\#prev-btn', jQ).click(function(event) {
      window.location.hash = '/installer-id';
    });

    var nextBtn = $('.\\#next-btn', jQ).click(function() {
      if (!self.isValid()) return;
      self.setVesselInfo().then(function() {
        window.location = '/wizard/gps.php';
      });
    });

    return self;
  };



  var InstallerInfoView = function(jQ) {
    var self = InfoView(jQ);

    var saveBtn = TVRO.ToggleBtn($('.\\#save-btn', jQ));

    var nextBtn = $('.\\#next-btn', jQ).click(function() {
      if (!self.isValid()) return;

      var company = $('.\\#company', jQ).val();
      var contact = $('.\\#contact', jQ).val();
      var phone = $('.\\#phone', jQ).val();
      var email = $('.\\#email', jQ).val();

      TVRO.setProductRegistration({
        dealer: {
          company: company,
          installer_name: contact,
          installer_phone: phone,
          installer_email: email
        }
      }).then(function() {
        if (saveBtn.getOn()) {
          if (TVRO.getShellMode()) {
            TVRO.sendShellCommand('set-installer-company/' + company);
            TVRO.sendShellCommand('set-installer-contact/' + contact);
            TVRO.sendShellCommand('set-installer-phone/' + phone);
            TVRO.sendShellCommand('set-installer-email/' + email);
          }
          //  save cookies
          TVRO.setInstallerCompany(company);
          TVRO.setInstallerContact(contact);
          TVRO.setInstallerPhone(phone);
          TVRO.setInstallerEmail(email);          
        }

        window.location = '/wizard/gps.php';
      });
    });

    var prevBtn = $('.\\#prev-btn', jQ).click(function() {
      window.location.hash = '/cdt-vessel-info';
    });

    TVRO.getInstallerInfo().then(function(installerInfo) {
      $('.\\#company', jQ).val(installerInfo.company);
      $('.\\#contact', jQ).val(installerInfo.contact);
      $('.\\#phone', jQ).val(installerInfo.phone);
      $('.\\#email', jQ).val(installerInfo.email);
    });

    return self;
  };

  TVRO.InstallerIdView = InstallerIdView;
  TVRO.CdtVesselInfoView = CdtVesselInfoView;
  TVRO.DiyVesselInfoView = DiyVesselInfoView;
  TVRO.InstallerInfoView = InstallerInfoView;

}(window.TVRO);



$(function() {
  var installerIdView = TVRO.InstallerIdView($('.\\#installer-id-view'));
  var cdtVesselInfoView = TVRO.CdtVesselInfoView($('.\\#cdt-vessel-info-view'));
  var diyVesselInfoView = TVRO.DiyVesselInfoView($('.\\#diy-vessel-info-view'));
  var installerInfoView = TVRO.InstallerInfoView($('.\\#installer-info-view'));

  TVRO.onHashChange(function(hash) {
    //  TV5 & 6 go to diy vessel info
    //  everybody else goes to installer-id
    if (!hash)
      TVRO.getAntennaVersions().then(function(xml) {
        var antModel = $('au model', xml).text();
        if (antModel === 'TV5' || antModel === 'TV6') window.location.hash = '/cdt-vessel-info';
        else window.location.hash = '/installer-id';
      });

    else if (hash === '/cdt-vessel-info') installerIdView.setValue('CDT');
    else if (hash === '/diy-vessel-info') installerIdView.setValue('DIY');
    else if (hash === '/installer-info') installerIdView.setValue('CDT');

    document.body.className = hash;
  });

  TVRO.reload();
});