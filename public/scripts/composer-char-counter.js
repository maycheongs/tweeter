//runs callback when DOM is ready to be manipulated with JQuery
$(document).ready(function() {


$("#tweet-text").on('input', function(event) {

  const counterLimit = 140;
  
  const counter = this.closest('form').counter;  
  counter.value = counterLimit - this.value.length;
  

  if (counter.value < 0) {
    counter.classList.add("below-zero");
  }

  if (counter.value >= 0 && $(".below-zero")) {
    counter.classList.remove("below-zero");
  }  
})
  
})
