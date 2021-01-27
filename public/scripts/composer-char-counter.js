
$(document).ready(function() {

  // get max character attribute of textarea
  const counter = $('#tweet-form').find('[name="counter"]');

  const counterLimit = counter.attr('data-max');

  // display the counter on page load.
  counter.val(counterLimit);


  // dynamically change the character count on inputs
$("#tweet-text").on('input', function(event) {
 
  counter.val(counterLimit - $(this).val().length);

  // add/remove a class when counter is below 0.

  if (counter.val() < 0) {
    counter.addClass("below-zero");
  }

  if (counter.val() >= 0 && $(".below-zero")) {
    counter.removeClass("below-zero");
  }  
})

// also changes the char count when form is submitted and textarea clears

$("#tweet-text").on('change', function(event) {

  counter.val(counterLimit - $(this).val().length)
})
  
})
