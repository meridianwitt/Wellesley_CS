var map;
var geocoder; // global variable
var bounds;
var myLocations; //array
var locationInput;
var infowindow;
//var latlong = {"Dorchester": new google.maps.LatLng(42.30163049999999,-71.06760500000001)};
//var thismarker;
var locName;
var marker;
var placename;
    
//on initialize: make geocoder, bound, infowindow, and map objects
//access the array of Historically Black Neighborhoods
//go through the array to create and place the markers
function initialize() {
  geocoder = new google.maps.Geocoder();
  bounds = new google.maps.LatLngBounds();     
  infoWindow = new google.maps.InfoWindow();

  var mapOptions = {
    center: { lat: 42.066667, lng: -71.293056},
    zoom: 8,
  };
  map = new google.maps.Map(document.querySelector("#map-canvas"),
      mapOptions); 

  getNeighborhoods();
  makeMarkers(map);
}

google.maps.event.addDomListener(window, 'load', initialize);

//goes through the array for neighborhoods and creates a marker for each
function makeMarkers(map){ //going through the array to make the organize the objects 
      for(var i=0; i<myLocations.length;i++){
        var place = myLocations[i];
        var loc = myLocations[i].latlong; 
        placeMarkers(loc, place.locName);
        ifhover(marker, place.locName);
        //$("li").setAttribute("id", place.locName);
}
     
}

//separated into its own function in attempts to allow hovering over a particular li element to make it bounce or draw a circle
//currently, makes a wikipedia call for the neighborhood's article. Some lead to redirecting pages.
function ifhover(marker, loc){
    $("li").hover(function(){
    //get innerHTML .html
    var innerHTML = $(this).text();
    //console.log(innerHTML);
    var baseURL = "http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrsearch="
    var restURL = "&gsrlimit=1&prop=pageimages|extracts&exsentences=10&explaintext&callback=displayWiki";
    var allURL = baseURL+innerHTML+restURL;
    //console.log(allURL);    
    jsonpRequest(allURL);
    //get the placename of the marker to match the text() of this
   /* if (marker.title == innerHTML){
        console.log(marker.title == innerHTML);
        marker.setAnimation(google.maps.Animation.BOUNCE);}

      var populationOptions = {
          strokeColor: '#FF0000',
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: '#FF0000',
          fillOpacity: 0.35,
          map: map,
          center: grabLatLong(loc),
          radius: 100000,
        };
        // Add the circle for this city to the map.
        var cityCircle = new google.maps.Circle(populationOptions);  */
    });
}

//function to create the markers
//populate infowindow, create the appropriate bounds or frame,
function placeMarkers(locationInput, placename){ //placing on the map
     marker = new google.maps.Marker({position:locationInput, title:placename});
    
    google.maps.event.addListener(marker, 'click', function() {
      if(placename != null){
        infoWindow.setContent(placename); //placename from the array
        infoWindow.open(map, marker);
      } else{
        infoWindow.setContent(locName); //locname from the user
        infoWindow.open(map, marker);
        }
    });
    
    bounds.extend(locationInput);
    marker.setMap(map);
    map.fitBounds(bounds);
        
}

function getNeighborhoods(){ //an array of historically black neighborhoods
     myLocations = [
        {'locName': 'Centeral District', 'latlong': new google.maps.LatLng(47.6087583, -122.2964235)},
        {'locName': 'Rainer Beach','latlong':new google.maps.LatLng(47.512255,-122.26397609999998)},
        {'locName': 'Yesler Terrace','latlong':new google.maps.LatLng(47.6028027,-122.31968710000001)},
        {'locName': 'Boise','latlong':new google.maps.LatLng(45.5515145,-122.6722049)},
        {'locName': 'Concordia','latlong':new google.maps.LatLng(45.5663706,-122.6299358)},
        {'locName': 'Harlem', 'latlong':new google.maps.LatLng(40.8115504,-73.9464769)},
        {'locName': 'Hyde Park','latlong':new google.maps.LatLng(41.794295,-87.59070099999997)},
        {'locName': 'Grand Crossing','latlong':new google.maps.LatLng(41.7634139,-87.59538250000003)},
        {'locName': 'OakLand', 'latlong':new google.maps.LatLng(37.8043637,-122.2711137)},
        {'locName': 'Dorchester', 'latlong':new google.maps.LatLng(42.30163049999999,-71.06760500000001)},
        {'locName': 'Jamaica Plain', 'latlong':new google.maps.LatLng(42.3097365,-71.11514310000001)},
        {'locName': 'Beaver Hills', 'latlong':new google.maps.LatLng(41.3254311,-72.94753300000002)},
        {'locName': 'Fair Haven', 'latlong':new google.maps.LatLng(41.3090274,-72.89585349999999)},
        {'locName': 'Allerton', 'latlong':new google.maps.LatLng(40.8637435,-73.8624893)},
        {'locName': 'Co-op City ', 'latlong':new google.maps.LatLng(40.872952,-73.826571)},
        {'locName': 'Tremont', 'latlong':new google.maps.LatLng(40.8447416,-73.8933596)},
        {'locName': 'Williamsbridge', 'latlong':new google.maps.LatLng(40.8684923,-73.86235349999998)},
        {'locName': 'Crown Heights', 'latlong':new google.maps.LatLng(40.6681032,-73.94479939999997)},
        {'locName': 'Lower East Side', 'latlong':new google.maps.LatLng(40.7150337,-73.98427240000001)},
        {'locName': 'Jamaica Queens', 'latlong':new google.maps.LatLng(40.702677,-73.78896889999999)},
        {'locName': 'East Baltimore Midway', 'latlong':new google.maps.LatLng(39.31471000000001,-76.60372219999999)},
        {'locName': 'Cherry Hill', 'latlong':new google.maps.LatLng(39.2510969,-76.6268306)},
        {'locName': 'Walnut Hill', 'latlong':new google.maps.LatLng(39.9549215,-75.21727579999998)},
        {'locName': 'Capital View', 'latlong':new google.maps.LatLng(38.90149,-77.01547199999999)},
        {'locName': 'Buena Vista', 'latlong':new google.maps.LatLng(38.8511,-76.96859999999998)},
        {'locName': 'Wynnefield', 'latlong':new google.maps.LatLng(38.8521605,-76.96870580000001)},
        {'locName': 'Black Pearl', 'latlong':new google.maps.LatLng(29.9349556,-90.13428879999998)},
        {'locName': 'Central City', 'latlong':new google.maps.LatLng(29.9422241,-90.08635809999998)},
        {'locName': 'Ben Hill', 'latlong':new google.maps.LatLng(33.6724377,-84.51959740000001)},
        {'locName': 'College Park', 'latlong':new google.maps.LatLng(33.6534427,-84.44937249999998)},
        {'locName': 'South Berkeley', 'latlong':new google.maps.LatLng(37.8604881,-122.27106019999997)}
        
    ];
}

// getting the search term
var button = document.querySelector("#button");
button.onclick = function(){
    locName = document.querySelector("#textbox").value;
    findLocation(locName);
    
   var baseURL = "http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrsearch="
    var restURL = "&gsrlimit=1&prop=pageimages|extracts&exsentences=10&explaintext&callback=displayWiki";
    var allURL = baseURL+locName+restURL;
    console.log(allURL);
    jsonpRequest(allURL);
}

function displayWiki(result){ 
 for(var i in result.query.pages){
     //add as innerHTML of the div that changes with hover on the list
     //console.log(result.query.pages[i].extract);
     $("#info p").text(result.query.pages[i].extract);
 }
}

//Attempt to grab the correct latlong to choose which marker to add the circle to
/*function grabLatLong(locName){
    for (var i in myLocations){
        console.log("My location:" + myLocations[i].locName);
        console.log("Location from parameter" + marker.title);
        console.log(marker.title == myLocations[i].locName);
        if(marker.title == myLocations[i].locName){
         return marker.position;
        } 
    }
}*/

function jsonpRequest(requestURL) {

	var newScriptElement = document.createElement("script");
	newScriptElement.setAttribute("src", requestURL);
	newScriptElement.setAttribute("id", "jsonp");
	var oldScriptElement = document.getElementById("jsonp");
	var head = document.getElementsByTagName("head")[0];
	if (oldScriptElement == null) {
		head.appendChild(newScriptElement);
	}
	else {
		head.replaceChild(newScriptElement, oldScriptElement);
	}
}

// Function that invokes the "geocode" method and sets
//
function findLocation(locName){
    geocoder.geocode( { 'address': locName}, 
                     function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location); //centers on appropriate location
        locationInput = results[0].geometry.location; 
        placename = locationInput.formatted_address;
        placeMarkers(locationInput,placename);
     
      }
    });
}

