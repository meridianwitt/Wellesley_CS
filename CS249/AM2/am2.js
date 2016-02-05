/* Filename: am2.js
Author: Meridian Witt
Date: Feb 13, 2015
Goal: Javascript code for implementing a web app that works with the Facebook API.

Honor Code Statement:
On this task I collaborated with Diana Tosca, Katherine K., Priscilla, and Chimuanya. I had 
difficulty with the necessity of two functions to get the liked pages, but Priscilla gave me a good example to 
understand it. All the code in these files was typed by me.
*/

/* necessary functionality:
-allow person to log in successfully - done
-grab all Wellesley pages (NOT COMMUNITY PAGES), sorted by numlikes - done
-separate Wellesley pages into two divs: ones that the user already liked and pages in general - done
-get all of the name, numlikes, and a link for each page - done
-each page shows the cover image in appropriate div (if no coverimage show text saying so) - done
-upon hover, show the likes and the links above the image - done (something still wrong with hover...)
*/

//pasted FB code
window.fbAsyncInit = function() {
    FB.init({
      appId      : '1070934749598917',
      xfbml      : true,
      version    : 'v2.2'
    });

 FB.getLoginStatus(function(response) {
    statusChangeCallback(response);
    });
  };


  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk')); //function invoked

function checkLoginState() {
    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });
}

// This is called with the results from from FB.getLoginStatus().
  function statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      // Logged into your app and Facebook.
      testAPI();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into Facebook.';
    }
  }

// Here we run a very simple test of the Graph API after login is
// successful. I added the two API calls I need: to get the results and process them.
function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
      console.log('Successful login for: ' + response.name);
      document.getElementById('status').innerHTML =
        'Thanks for logging in, ' + response.name + '!';
    
    });
    FB.api('/search?q=wellesley+college&type=page&fields=name,likes,link,cover', processResults);
    FB.api('/me/likes', getmyLikes); 
}

//This function puts all of the user's Like IDs in an array for use in the processResults function.
var myLikes;
var allLikes = []; //array of all likes
function getmyLikes(likesresponse){
     myLikes = likesresponse.data; //get the array of the person's likes
     //for loop to look through likes for the id of the likes: in var myLikes
    
     for(var i=0; i<likesresponse.data.length; i++){
        var likeids = likesresponse.data[i].id;
        //console.log(likeids);
        if(myLikes[i].hasOwnProperty("id")){
        allLikes.push(likeids);
        }
     }
}



//This is the function to process all of the pages related to Wellesley College.
/*In a for loop, it creates a div with the appropriate information per result and pulls the page id. Using the array of likes from the
  getmyLikes function, we search of the page id. Depending on whether the id is there or not, we place the div in the appropriate place.
 */
var myResults;
var allpage; //array of all page ids
function processResults(pagesresponse){ 
    //console.log(response);
    //search likes for page   
    myResults = pagesresponse.data;
    
        for(var i=0; i<pagesresponse.data.length; i++){ //iterating the pages
            
            var pagediv = document.createElement("div");
            pagediv.setAttribute("class", "pagediv");
            
            var superdiv = document.createElement("div");
	    superdiv.setAttribute("class","superdiv");
	    $(".superdiv").hover(function() {$(".superdiv").addClass("hovering");}, function() { $(".superdiv").removeClass("hovering");});

            if(myResults[i].hasOwnProperty("cover")){
            var photosrc = myResults[i].cover.source;}
            else {
            var photosrc = "http://www.hollandlift.com/wp-content/themes/hollandlift/assets/images/no_image.jpg"; 
            
            }
            //console.log(photosrc)
            var photo = document.createElement("img");
            //photo.setAttribute("class", "coverphoto");
            photo.setAttribute ("src", photosrc);
            
 	    var name = document.createElement("div");
 	    name.innerHTML = "<p>" + myResults[i].name + "</p>"          
 
            var numlikes = document.createElement("div");
            numlikes.innerHTML = "<p>" + myResults[i].likes + " likes</p>"
            
            var link = document.createElement("div");
            link.innerHTML = "<a href= " + myResults[i].link + "><p>Visit the page to like it!</p>"
                        
            /*pagediv.appendChild(photo);
            pagediv.appendChild(numlikes);
            pagediv.appendChild(link);*/
            
            superdiv.appendChild(name);
            superdiv.appendChild(numlikes);
            superdiv.appendChild(link);
	    pagediv.appendChild(photo);
            pagediv.appendChild(superdiv);
            

            var pageid = pagesresponse.data[i].id; //for page one, get the id
            //console.log(pageid);
       

            if (allLikes.indexOf(pageid) != -1) { //searching the array for the first page
                var yourlikes = document.querySelector("#yourlikes");
                yourlikes.appendChild(pagediv);
            } else {
                var thepages = document.querySelector("#otherpages");
                otherpages.appendChild(pagediv);
            }
        }
            
        }
  



