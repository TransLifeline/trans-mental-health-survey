'use strict';

/*
JS needed by the home page.
*/
function home($) {
  $('#validate').hide();
  $('#required').hide();
  $('#submit').click(function(event) {
    event.preventDefault();
    var email = $('#email').val();
    var first = $('#first').val();
    var last = $('#last').val();
    var zip = $('#zip').val();
    if(email) {
      $.ajax({
        type: 'POST',
        url: '/subscribe',
        data: { email: email, first: first, last: last, zip: zip },
        success: function() {
          console.log('success');
          $('#validate').show();
          $('#required').hide();
          $('#subscribe').hide();
        },
        dataType: 'json'
      });
    } else {
      $('#required').show();
    }
  });
}

module.exports = home;
