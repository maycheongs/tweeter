/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// const userHelper = require('../../server/lib/util/user-helper')


$(document).ready(function() {


//Create html element with a tweet obj.
const createTweetElement = function(tweetObj) {
  const tweetEl = 
  `<article>
    <header>
      <span class="user-name"><img src="${tweetObj.user.avatars}" class="avatar">${tweetObj.user.name}</span><span class="user-id">${tweetObj.user.handle}</span>
    </header>
    <div class="tweeted-text">${tweetObj.content.text}
    </div>
    <footer>
      <span class="timestamp">created at 51651651</span><span class="interact">like buttons</span>
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
  $('#all-tweets').append(render)
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
  .always(() => console.log('get complete'))  
}

loadTweets();

//Ajax /POST to add new tweet to backend and reload /GET.

$('#tweet-form').on('submit', function(event) {
  
  event.preventDefault();

  //Check for invalid text in the form i.e. empty strings/ only spaces.

  if ($.trim($('#tweet-text').val()) === '') {
    alert('No text to submit!');
    return;
  }
  if ($('#tweet-text').val().length > 140) {
    alert('Over text limit!');
    return;
  }

  const formText = $(this).serialize();
  $('#all-tweets').empty();

  $.ajax({
    url: `/tweets`,
    method: 'POST',
    data: formText,
  })
  .done(() => {    
    $('#tweet-text').val('').change();
  })
  .fail(() => alert('error'))
  .always(() => loadTweets()) 
  
})

})

