!function(TVRO) {
  "use strict";

  var CommandLineView = function(jQ) {
    var self;

    var output = $('.\\#output', jQ);
    var input = $('.\\#input', jQ);

    // if "Enter" key on key board pressed send the command
    $('.\\#input').keypress(function(event){
      var keycode = (event.keyCode ? event.keyCode : event.which);
      if(keycode == '13') {
        $(".\\#send-btn").click();
      }
    });

    var sendBtn = $('.\\#send-btn', jQ).click(function() {
      var command = input.val();

      if (command) {
        self.stopOutput();

        $.ajax({
          type: 'post',
          url: 'systemCMD.php',
          dataType : 'xml',
          data : "cmd="+command,
          success: function (response) {
            input.val(''); //  clear input
          }
        });

        self.startOutput();
      }
    });

    return self = {
                   stopOutput: function() {
                    output.empty();
                   },

                   startOutput: function() {
                     output.empty().append('<iframe type="text/html" src="/print2screen.php"></iframe>');
                   }
    };
  };

  TVRO.CommandLineView = CommandLineView;

}(window.TVRO);