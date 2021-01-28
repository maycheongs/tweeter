/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  //Create html element with a tweet obj.
const createTweetElement = function(tweetObj) {

  const escape =  function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }
  const tweetEl = 
  `<article>
    <header>
      <span class="user-name"><img src="${tweetObj.user.avatars}" class="avatar">${tweetObj.user.name}</span><span class="user-id">${tweetObj.user.handle}</span>
    </header>
    <div class="tweeted-text">${escape(tweetObj.content.text)}
    </div>
    <footer>
      <span class="timestamp">${$.timeago(Number(tweetObj['created_at']))}</span><span class="interact">like buttons</span>
    </footer>
</article>
`;
return tweetEl;

}

//Loop through array of tweet objs and append to #all-tweets section.

const renderTweets = function(tweetObjsArr) {
  let render = '';
  for (tweetObj of tweetObjsArr) {
    $tweet = createTweetElement(tweetObj);
    render = $tweet + render;
  }
  $('#all-tweets').append(render);
  
}

//Ajax /GET from /tweets to get tweets database from backend. 

const loadTweets = function() {

  $.ajax({
    url: `/tweets`,
    method: 'GET'
  })
  .done(result => {                    //already JSON parsed
    renderTweets(result); 
  })
  .fail(() => console.log('Error'))
  .always(() => console.log(Date.now()) )  
}

loadTweets();

//Ajax /POST to add new tweet to backend and reload /GET.

$('#tweet-form').on('submit', function(event) {
  
  event.preventDefault();
  $('#error-display').hide();

  //Check for invalid text in the form i.e. empty strings/ only spaces/ > char limit.

  if ($.trim($('#tweet-text').val()) === '') {

    $('#error-msg').html(` <b>Error</b>: Please enter something`);
    $('#error-display').slideDown('fast');
    
    return;
  }
  if ($('#tweet-text').val().length > 140) {

    $('#error-msg').html(` <b>Error</b>: Too long. Please stay within the char limit :)`);
    $('#error-display').slideDown('fast');
    return;
  }
  
  $('#all-tweets').empty();

  $.ajax({
    url: `/tweets`,
    method: 'POST',
    data: $(this).serialize()
  })
  .done(() => {    
    $('#tweet-text').val('').change();
  })
  .fail(() => alert('error'))
  .always(() => loadTweets()) 
  
})



// Hide/Unhide compose section on button click

$(".nav-compose-btn").on('click', function(event) {
  $("section.new-tweet").slideToggle(400, function() {
    $("#tweet-text").focus();
    
  });
  $(".nav-compose-btn img").toggle();


})

//Back-to-top function:

$(window).on("scroll", () => {

  //check position of this and show the backToTop btn if below a certain position else hide again.

  if($(window).scrollTop() > $(window).height()*0.3){
    $('#to-top-btn').show()
  } else {
    $('#to-top-btn').hide();
}

//On button click, toggle compose items if hidden then set scrollTop to 0.

$('#to-top-btn').on('click', function(event){

  if ($('.new-tweet').is(":hidden")) {
    $('.new-tweet').toggle();
    $('.compose-btn img').toggle();
  }
  $("#tweet-text").focus();
  $(window).scrollTop(0);
  
})
  


})

//button.on click handler
//scroll back up using $(element).animate({}) with body and scrollTop.

})

