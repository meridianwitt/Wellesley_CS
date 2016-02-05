/* Filename: am1.js
Author: Meridian Witt
Date: Feb 7, 2015
Goal: Javascript code for implementing a wep app that searches the Last FM API for albums,
and displays the results dynamically in a web page.

Honor Code Statement:
On this task I collaborated with Clara Smith. I had 
difficulty with the for loop issue, but Clara gave me a good example to 
understand it. All the code in these files was typed by me.
*/

//necessary functionality:
//get the text from the search box - done
//use text as the search parameters in the API call - done
//display the album results (dynamically create elements and the tags needed to style in for loop, easy because JSON parses into an array) - done

//Method purpose: get search term from text box
//on click, search the document for search id and save the info as var input 
var button = document.querySelector("button");
button.onclick = function () {
var input = document.querySelector("#search");

//Eni's code - modified
//to dynamically search, we needed to append input.value to the base URL
var baseURL = "http://ws.audioscrobbler.com/2.0/?method=album.search&album=";
var searchTerm = encodeURI(input.value); // this should later get the value from input field
console.log("Your received searchTerm is " + searchTerm);
    //http://ws.audioscrobbler.com/2.0/?method=album.search&album=believe&api_key=98e2d4e9b205d51992de7b260602ff1c&format=json
var url = baseURL + searchTerm + "&api_key=98e2d4e9b205d51992de7b260602ff1c&format=json";

// invoke the function, makes the request. Also gives a message if there is no search term entered.
if(searchTerm != ""){
   ajaxRequest(url);
} else {
    var resultsDiv = document.getElementById("allalbums");
    var novalue = document.createElement("p");
    novalue.setAttribute("id", "novalue");
    novalue.innerHTML = "No entry given! Refresh and try again.";
    resultsDiv.appendChild(novalue);
    }
}

//this creates the HTTP request
function ajaxRequest(url) {
  var request = new XMLHttpRequest(); 
  request.open("GET", url); 
  
//the request.responseText is the received information that we will display and style
  request.onload = function() {
    if (request.status == 200) { //OK
      displayAlbums(request.responseText); // displayBooks is your function
    }
  }; // otherwise do nothing
  
  request.send(null); //?
}
    
    //var lastfm;

// Method purpose: This is the meat of the JS functionality. Here we need to display the albums
function displayAlbums(result){
  var albums = JSON.parse(result).results.albummatches.album; // response comes as plain text, parse into array called albums
  console.log(albums); //what is received
  //lastfm = albums;
    
  //reference the empty div to start populating it with results
  var resultsDiv = document.getElementById("allalbums");
    //var onealbum = document.createElement("div"); //creating the onealbum container
    //onealbum.setAttribute("class", "acontainer");
    
  //most of the information we want is under album
  //album image floated left as link, album name as url link, artist
  //all (but image) inside a div inside parent div 
    
  for(var i=0; i<albums.length; i++){ //we are creating an books array in this for loop
    var album = albums[i];
      
    var onealbum = document.createElement("div"); //creating the onealbum container
    onealbum.setAttribute("class", "acontainer");
      
    //now making the elements inside the parent onealbum container div: children that need to be appended
    var textdiv = document.createElement("div");
    textdiv.setAttribute("class", "textdiv");
    var image = document.createElement("div");
    var albumname = document.createElement("div");
    albumname.setAttribute("class", "albumname");
    var artist = document.createElement("p");
    artist.setAttribute("class", "artist");
      
    //add content, what if there is no content to be added?
     var imageinfo = album.image[2]['#text'];
    
     if(imageinfo != ""){
          image.innerHTML = "<a href= " + album.url + " ><img src='" + imageinfo + "' alt= '" + album.name + "'></a>" || "<p>Image not available</p>"; 
          } else {
          image.innerHTML = "<p class=noimage>" + album.name + "</p>"
          } 
      
      albumname.innerHTML = "<a href = " + album.url + ">" + "<p class=albumname>" + album.name + "</p>" + "</a>";
      artist.innerHTML = album.artist;
  
    //putting each book information in the bookitem container
    onealbum.appendChild(image);
    onealbum.appendChild(textdiv);
    textdiv.appendChild(albumname);
    textdiv.appendChild(artist);
    
    //putting each book item container in the resultsDiv
    resultsDiv.appendChild(onealbum);
  }
}


