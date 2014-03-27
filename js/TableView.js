!function(TVRO) {
  "use strict";
  //  <jQ>
  //    <table-head>
  //    <table-row>
  var TableView = function(jQ) {
    var self;

    var tableHead = $('.\\#table-head', jQ).detach();
    var tableRowTemplate = $('.\\#table-row', jQ).detach();

    var values = [];  //  store values to be iterated over in buildCallback
    var value;  //  currently selected value

    var clickCallback = function(value) {}; //  call when a tableRow is clicked - see self.build
    var buildCallback = function(row, value) {};  //  call when a tableRow is built - see self.build

    //  fixed table headers
    //  there is a css dependency here - base.scss/css
    //  make head stay put on scroll
    jQ.scroll(function() {
      var top = jQ.scrollTop()+'px';
      tableHead.css({top: top});
    });

    return self = {
      setValues: function(arg) {
        values = arg;
        return self;
      },

      getValues: function() {
        return values;
      },

      //  this is where we set $sel
      setValue: function(arg) {
        var index = indexOf(values, arg);
        var tableRows = $('.\\#table-row', jQ);
        
        value = arg;

        tableRows.removeClass('$selected');
        if (index != -1) tableRows.eq(index).addClass('$selected');

        return self;
      },

      getValue: function() {
        return value;
      },

      onClick: function(arg) {
        clickCallback = arg;
        return self;
      },

      click: function(arg) {
        var index = indexOf(values, arg);
        if (index != -1) {
          $('.\\#table-row', jQ)
            .eq(index)
            .click();
        }

        return self;
      },

      //  table.build()
      //  builds the table with values.length rows
      //  
      //  table.build(function(row, data) {
      //    on build,
      //    manipulate row before it gets appended
      //  })
      onBuild: function(arg) {
        buildCallback = arg;
        return self;
      },

      //  this is where the click to change $sel is hooked up
      build: function() {
        var tableRows = _.map(values, function(value) {
          //  clone with events so you can manipulate the
          //  tableRows before the buildCallback
          var tableRow = tableRowTemplate.clone(1).click(function() {
            self.setValue(value);
            clickCallback(value);
          });

          buildCallback(tableRow, value);

          return tableRow;
        });

        //  don't let the header get clipped
        tableHead.detach();

        jQ.empty()
          .append(tableHead)
          .append(tableRows)
          .scrollTop(0);

        // reselect value
        self.setValue(value);

        return self;
      }
    };
  };

  TVRO.TableView = TableView;

}(window.TVRO);