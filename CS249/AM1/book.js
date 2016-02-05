//necessary functionality:
//get the text from the search box - done
//use text as the search parameters in the API call - done
//display the books (dynamically create elements and the tags needed to style in for loop, easy because JSON parses into an array) - done

//Method purpose: get search term from text box
//on click, search the document for search id and save the info as var input 
var button = document.querySelector("button");
button.onclick = function () {
var input = document.querySelector("#search");
    
//Eni's code - modified
//to dynamically search, we needed to append input.value to the base URL
var baseURL = "https://www.googleapis.com/books/v1/volumes?q=";
var searchTerm = encodeURI(input.value); // this should later get the value from input field
//console.log("Your received searchTerm is " + searchTerm);
var url = baseURL + searchTerm;
    
// invoke the function, makes the request. Also gives a message if there is no search term entered.
if(searchTerm != ""){
   ajaxRequest(url);
} else {
    var resultsDiv = document.getElementById("results");
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
      displayBooks(request.responseText); // displayBooks is your function
    }
  }; // otherwise do nothing
  
  request.send(null); //?
}

// Method purpose: This is the meat of the JS functionality. Here we need to display the books
function displayBooks(result){
  var books = JSON.parse(result).items; // response comes as plain text, need to convert it to JSON
  //console.log(results); //what is received
    
  //reference the empty div to later populate it with results
  var resultsDiv = document.getElementById("results");
  
  //title, author array, image, description - ALL INSIDE ON BOOKITEM div 
    
  for(var i=0; i<books.length; i++){ //we are creating an books array in this for loop
    var book = books[i];
      
    var bookitem = document.createElement("div"); //creating the bookitem container
    bookitem.setAttribute("class", "bcontainer");
      
    //now making the elements inside the parent bookitem container div: children that need to be appended
    var date = document.createElement("div");
    date.setAttribute("class", "pubdate");
    
    var title = document.createElement("h2");
    var authors = document.createElement("h3");
    var image = document.createElement("div");
    var description = document.createElement("p");
    
    //add content, what if there is no content to be added?
    date.innerHTML = "<p>" + book.volumeInfo.publishedDate + "</p>" || "<p>Date not available</p>"; //need the <p> tag 
    title.innerHTML = book.volumeInfo.title || "<p>Book title not available</p>";      
    authors.innerHTML = book.volumeInfo.authors || "<p>Author(s) not available</p>"   
    image.innerHTML = "<img src='" + book.volumeInfo.imageLinks.thumbnail + "' alt= '" + book.volumeInfo.title + "'width='100px'>" || "<p>Image not available</p>"; 
    description.innerHTML = book.volumeInfo.description || "<p>Description not available</p>";
    
    //putting each book information in the bookitem container
    bookitem.appendChild(date); 
    bookitem.appendChild(title);
    bookitem.appendChild(authors);
    bookitem.appendChild(image);
    bookitem.appendChild(description);
      
    //putting each book item container in the resultsDiv
    resultsDiv.appendChild(bookitem);
  }
}



