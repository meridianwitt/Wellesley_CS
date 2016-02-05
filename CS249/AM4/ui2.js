/*
Meridian Witt
ui2.js
Second iteration of my UI file
Purpose: all UI functionality including: user prompted department search, checkboxes for day, timepicker (all filters can be concatenated), display results, select classes, and hand off to calendar.js. 
*/

//global variables
var displayedClasses = {}; //to autopopulate table
var functionsArray; //functions acting as filters
var selectedClasses = []; //

//anonymous function to autoprompt departments
$(function() {
    var availableTags = [
      "AFR",
      "AMST",
      "ANTH",
      "ARTS",
      "ASTR",
      "BABS",
      "BIOC",
      "BISC",
      "CAMS",
      "CHEM",
      "CHIN",
      "CLCV",
      "CPLT",
      "EALC",
      "ECON",
      "EDUC",
      "ENG",
      "ES",
      "EXTD",
      "FREN",
      "GEOS",
      "HEBR",
      "HIST",
      "HNUR",
      "ITAS",
      "JPN",
      "KOR",
      "LAT",
      "LING",
      "MATH",
      "MUS",
      "NEUR",
      "PE",
      "PEAC",
      "PHIL",
      "PHYS",
      "POL1",
      "POL2",
      "POL3",
      "POL4",
      "PSYC",
      "QR",
      "RAST",
      "REL",
      "RUSS",
      "SAS",
      "SOC",
      "SPAN",
      "SUST",
      "SWA",
      "THST",
      "WGST",
      "WRIT"
    ];
    $("#dept").autocomplete({
      source: availableTags
    });
  });

//click event handler to call filter call
var button = document.getElementById("filterAll");
button.onclick = filterAll;
               
//an array of functions acting as filters on the course browser classes
function filterAll(){
    //retrieveFeed();
    console.log("In function");
    displayedClasses = {};
    functionsArray = []; //initializing the array of functions, filters on filters
    
    //checking dept
    var input = document.querySelector("#dept");
    var department = input.value; //get the value from the input box
    //console.log(department);
    if(department != ""){ //only if there is a department given...
    functionsArray.push( //...add this function that checks if course obj has the right name 
        function(course){
            //console.log(functionsArray);
            //console.log(course.Name == department);
            return course.Name.search(department) != -1; //if function returns true, meets req
        }); 
    } 
        
    //checking days
    console.log("about to look at checkboxes...");
    
    var daysChecked = [];
    var daysCheckedStr;
    $.each($(".radio input:checkbox:checked"),//checking each checkbox of class day
        function(){
            daysChecked.push($(this).val());
            if (daysChecked.indexOf("W") != -1){
                daysCheckedStr = daysChecked.sort().toString().replace(/,/g, ''); //because W classes reorder the string
            } else {
                daysCheckedStr = daysChecked.toString().replace(/,/g, '');
            }     
                functionsArray.push( //add this function that checks if the course obj has the right day/days
                    function (course){
                        console.log(course);
                        console.log("Days: " +  course.Days);
                        console.log("String: " + daysCheckedStr);
                        return course.Days.indexOf(daysCheckedStr) != -1; //why?
                    }
                );
            }
          );
    
    //checking times
    var start = document.getElementById("start").value; //getting user input for class start time
    var startFormatted = convertDate(start); //helper method to convert times to comparable locale time
//    console.log("This is the start time as entered:");
//    console.log(start);
//    console.log("This is the start time formatted:");
//    console.log(startFormatted);

    var end = document.getElementById("end").value; //getting user input for class end time
    var endFormatted = convertDate(end);
    //console.log(endFormatted);
    
    if(start != ""){ //if the user puts in a start time...
        functionsArray.push( //add a function that checks if the course obj has the right start time
            function (course){
                var cleanedCourseStart = course.MeetingTimes[0];
                var cleanedCourseStartFormatted = convertDate(cleanedCourseStart);
                return cleanedCourseStartFormatted.indexOf(startFormatted) != -1; //if function returns true, meets req 
                }
        )
    }
    
       
    if(end != ""){ //if the user puts in a start time...
        functionsArray.push( //add a function that checks if the course obj has the right start time
            function (course){
                var cleanedCourseEnd = course.MeetingTimes[1];
                var cleanedCourseEndFormatted = convertDate(cleanedCourseEnd);
                return cleanedCourseEndFormatted.indexOf(endFormatted) != -1; //if function returns true, meets req 
                }
        )
    }
    
    
    
    //iterating through the course browser items, where the full functionality is
    for(var i in cleanedCourses){ 
        if(isOk(cleanedCourses[i])){ //if the object meet all the reqs (all the functions returned true)
            //add to displayedClasses
            displayedClasses[cleanedCourses[i].CRN] = cleanedCourses[i];
        }
    }
//    console.log("Displayed Classes:");
//    console.log(displayedClasses);
//    console.log("Create table");
    populateTable();
    //getClasses();
}

//if any of the functions returned false for this object, the obj does not meet the reqs to be added to displayedClasses
function isOk(course){
    for (var f in functionsArray){ //calling all the functions on the course object
        if( !functionsArray[f](course) ){ //if it returned false
            return false;
        }
    } 
    return true; //complete the for loop
}

//helper function
function convertDate(time){
    var timeDate = new Date("2015/01/01 " + time);
    var timeFormatted = timeDate.toLocaleTimeString();
    return timeFormatted;
}

//function to populate table and listen for the submission of classes (will separate concerns later)
function populateTable(){
$("#table").empty();
 //make header from obj keys
var appendHeaders = "<tr>"
//console.log("DisplayedClasses: " + Object.keys(displayedClasses));
if(jQuery.isEmptyObject(displayedClasses)){
   alert("No classes found!");
} else {

 for(var i in displayedClasses[Object.keys(displayedClasses)[0]]){ //although need keys to access objects, knows 0th is the first
     appendHeaders += "<th>"+i+"</th>";
 }
appendHeaders += "<th>Select</th></tr>";
appendHeaders += "</tr>";

$("#table").append(appendHeaders);
    
//populate results
var result = "";
for(var i in displayedClasses){
    result += "<tr id="+displayedClasses[i].CRN+">";
    for(var j in displayedClasses[i]){
    result += "<td>"+displayedClasses[i][j]+"</td>";
    }
    result += "<td><input type='checkbox' class='displayClass' id='" +displayedClasses[i].CRN + "'></td>"; //alternate between double and single quotes
    
    result += "</tr>";
}
  
console.log(result);
$("#table").append(result);
$("th:nth-child(6)").hide();    
$("td:nth-child(6)").hide();

$("#submitClasses").click( function(){
//    console.log("Clicked submit selected classes");
    selectedClasses = [];
    $(".displayClass:checkbox:checked").each(function(){
        selectedClasses.push(displayedClasses[$(this).attr("id")]);
        var inner = "<div id='selected'>";
        for(var i in selectedClasses){inner += "<p>" + selectedClasses[i].Title + "</p>"};
        inner += "</div>";
        $("#plans").html(inner);
  });
});
       
    }
     //for (var i in selectedClasses) {console.log(selectedClasses[i])};
}





