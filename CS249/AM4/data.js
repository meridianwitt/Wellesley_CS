//JS1 From Nathan Lee. 3/6/15, Copy C1. Includes: course cleaning method, cleanedCourses variable which stores cleaned courses with CRN number indexing AND an items array which contains this same information, indexed instead by an integer 0 through cleanedCourses.length. Both can be used for sorting, and both should contain similar information. In order to compare or cross information, there is a 'getCRN()' function. 
/* List: 
   1. retrieveFeed() //gets feed, put forths Json request to google spreadSheet feed.
   2. cleanCourses() // returns object containing cleaned courses.
   3. items array, which contains cleaned courses object indexed by integers 0 through length
   4. getCRN() which takes a course and returns its CRN
   5. sortDays() which sorts courses by days and inserts them into byWeek array.
   6. assignDay() which pushes a course into a particular day in byWeek array.
   
   COURSE TRAITS: Name, CRN, Date, Hours, Location
   
   On running this JS will: execute retrieveFeed() and, upon finishing, execute sortDays()
*/

var cleanedCourses = {}// global variable that stores cleaned courses
var varHolder;
var feed;
var items; //Same as 'cleanedCourses', but the indices are not the CRN # of the course, unlike in cleanedCourses. 
var byWeek = []; //Array filled with courses sorted by day. 
var m = [], t = [], w = [], th= [], f=[], u = []; //Day variables (arrays) pushed to byWeek.
m.name = "M"; t.name = "T"; w.name = "W"; th.name = "R"; f.name = "F"; u.name = "undefined"; //Assigning name identifiers.
m.courses = []; t.courses =[]; w.courses = []; th.courses=[]; f.courses =[]; u.courses = []; //Adding courses variables.
byWeek.push(m,t,w,th,f,u); //Pushing each day into byWeek.

//Code called to retrieve feed. Puts forth Json request to google spreadsheet feed of the courses.
function retrieveFeed(){
    var r = $.Deferred();
   // $.getJSON("https://spreadsheets.google.com/feeds/list/1035SQBywbuvWHoVof3G-VI0rapYJslaeYN5tTpNZq2M/od6/public/values?alt=json-in-script&gid=0&callback=?",
    $.getJSON("https://spreadsheets.google.com/feeds/list/1A7vAkWJlI7j_X_wwYpmNUf1I564uEoOquKFc1UIEtdI/od6/public/values?alt=json-in-script&gid=0&callback=?",
    function (response){
      console.log(response);  
      varHolder = response; 
      feed = varHolder.feed; //Stores feed
      items = response.feed.entry; //items stores entry files.
      if (response.feed) {
        console.log(response.feed.entry.length);
        processCourses(items);
        console.log("Courses Cleaned.");
      }

    }); 
    setTimeout(function () {
        // and call `resolve` on the deferred object, once you're done
        r.resolve();
    }, 2500);

  // return the deferred object
  return r;
};


//Will print out course objects from integers 0, 1 if needed, instead of using CRN numbers as indices. 
function list(){ for(var i = 0; i < items.length; i++){ console.log(items[i])}};
                
 var cleanedCourses; // global variable
    function processCourses(allCourses){     
      // your code for getting the desirced information from each course
      // 1. create an object that will store each course by its CRN
  for (var i in allCourses){
        var course = allCourses[i];
        //stores course Object as COURSE NUMBER, NAME, TITLE, DAYS IT OCCURS ON.
        var crsObj = {'CRN': course["gsx$crn"]["$t"],
                      'Name': course["gsx$course"]["$t"],
                      'Title': course["gsx$title"]["$t"],
                      // more fields here
                      'Days': course["gsx$days"]["$t"].replace(/\d/g, "").replace(/\n/g, "").replace(/Th/g, "R").replace(/(.)(?=.*\1)/g, ""),
                      'MeetingTimes': course["gsx$meetingtimes"]["$t"].split("-"),
                      'Hours':[],
                      'TimeString': course["gsx$meetingtimes"]["$t"],
                      'Enrollment': course["gsx$currentenrollment"]["$t"],
                      'Seats': course["gsx$seatsavailable"]["$t"].slice(5),
                      'Location':course["gsx$locations"]["$t"],
                      //continue with fields
                      };
      var cleanObj = {'CRN': course["gsx$crn"]["$t"],
                      'Name': course["gsx$course"]["$t"],
                      'Title': course["gsx$title"]["$t"],
                      // more fields here
                      'Days': course["gsx$days"]["$t"].replace(/\d/g, "").replace(/\n/g, "").replace(/Th/g, "R").replace(/(.)(?=.*\1)/g, "").split(''),
                      'Time': course["gsx$meetingtimes"]["$t"].split("\n"),
                      'MeetingTimes': course["gsx$meetingtimes"]["$t"].split("-"),

                      'Enrollment': course["gsx$currentenrollment"]["$t"],
                      'Seats': course["gsx$seatsavailable"]["$t"].slice(5),
                      'Location':course["gsx$locations"]["$t"],
                      //continue with fields
                      };
      for(var e = 0; e < crsObj.MeetingTimes.length; e++){
       tempHours = [];
       tempHours = crsObj.MeetingTimes[e].split('\n');
        for(var f = 0; f < tempHours.length; f++){
       crsObj.Hours.push(tempHours[f]);
        }
      }
    //2. Add it to the cleanedCourses object, using the CRN value as the property name.
        cleanedCourses[crsObj.CRN] = cleanObj;
        items[i]= crsObj;
    }
}

//Code below actually produces the code you will see in the console. 
var url = "https://spreadsheets.google.com/feeds/list/1035SQBywbuvWHoVof3G-VI0rapYJslaeYN5tTpNZq2M/od6/public/values?";

//getCRN takes in
function getCRN(course){
    console.log(course.CRN);
    return course.CRN;
}

//Assigns Days. Takes in a course object.
function assignDays(course){
    for(var i = 0; i < byWeek.length - 1; i++){
    
        if(course.Days.indexOf(byWeek[i].name) > -1){
           /* if(byWeek[i].name == "T"){ //If we're checking for tuesday....
                if(course.Days[course.Days.indexOf(byWeek[i].name)+1] == "h"){ //Here we check to make sure we don't push
                 byWeek[3].courses.push(course);  //Tuesday if the day is thursday. If thursday, push and break.
                 return;
            }
        }*/
         byWeek[i].courses.push(course);
        }
     }
    }


//Sorts by Days. 
function sortDays(){
console.log("Sorting by day and pushign to array byWeek : " );
 for(var i = 0; i < items.length; i++){
     if(items[i].Days === undefined){
         console.log("Course " + items[i] + " does not have Days. I of " + i + " . ");
         byWeek[5].courses.push(items[i]);
     } else{
     for(var e = 0; e < items[i].Days.length; e++){
         assignDays(items[i]);
     }
     }
 }  
}
/*
//Executes assignment functions
console.log("Retrieving Feed : " );
retrieveFeed().done(sortDays);*/

retrieveFeed().done(sortDays);
