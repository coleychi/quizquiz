$(document).ready(function() {

  var quizId = window.location.pathname.replace("/quizzes/", "");

  var quizData = {}

  // get quiz info from server
  $.ajax({
    url: "/quizzes/getjson/" + quizId, 
    method: "GET"
    // success function
    }).then(function(data) {
      // console.log("data: ", data);
      quizData = data; // save quiz data to data
      shareQuiz(quizData); // pass data to shareQuiz function

    // error function
    }, function(error) {
      console.log("error: ", error);
  });




  var shareQuiz = function(quizData) {

    console.log(quizData); // confirms data accessible

    var quizTitle = quizData.title;
    // console.log(quizTitle);
    var quizPath = window.location.pathname;
    // console.log(quizPath);
    var fullUrl = "http://quizquizquiz.herokuapp.com/" + quizPath; // change this to heroku app
    // console.log(fullUrl);


    // facebook sharing configuration
    window.fbAsyncInit = function() {
      FB.init({
        appId      : '1754398674789796', // abstract this out?
        xfbml      : true,
        version    : 'v2.5'
      });
    };

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) {return;}
       js = d.createElement(s); js.id = id;
       js.src = "//connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));


    // click event to share -- customize
    $("#facebook-share").click(function() {

      FB.ui({
      display: 'popup',
      method: 'share',
      href: 'http://quizquizquiz.herokuapp.com/', //change this to fullUrl
      }, function(response){});


      })

    })



    // twitter
    window.twttr = (function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0],
      t = window.twttr || {};
    if (d.getElementById(id)) return t;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://platform.twitter.com/widgets.js";
    fjs.parentNode.insertBefore(js, fjs);
   
    t._e = [];
    t.ready = function(f) {
      t._e.push(f);
    };
   
    return t;
    }(document, "script", "twitter-wjs"));


    twitterLink = "https://twitter.com/intent/tweet?url=" + fullUrl + "&text=" + quizTitle + "&via=" + "quizquizapp"

    // anchor tag to share-- customize
    $tweetLink = $("<a></a>").attr({
      href: twitterLink
    })

    $("#twitter-share").wrap($tweetLink)


  }; // closes share quiz function






});



