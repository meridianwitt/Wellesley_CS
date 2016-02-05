/*Ella Chao
March 10, 2015
Creates a calender for the user and add selected classes to that calender
calender.js*/

//invokes funtion manually it doesn't load automatically
setTimeout(function(){
    handleClientLoad();},8000);
//key and id
var clientId = '854101346563-j190oatqkhnakfequo4acjdqh9qlgc48.apps.googleusercontent.com'
var apiKey = 'AIzaSyCG2c9Jua6uJ9qzZsXHSWMqM0OlvUvCu54';
var scopes = 'https://www.googleapis.com/auth/calendar';
//global variable
var eventArray=[];
var allCalender;
var id;

/* Function invoked when the client javascript library is loaded */
function handleClientLoad() {
  console.log("Inside handleClientLoad ...");
  gapi.client.setApiKey(apiKey);
  window.setTimeout(checkAuth,100);
}

/* API function to check whether the app is authorized. */
function checkAuth() {
  console.log("Inside checkAuth ...");
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true}, 
                      handleAuthResult);
}

/* Invoked by different functions to handle the result of authentication checks.*/
function handleAuthResult(authResult) {
    console.log("Inside handleAuthResult ...");
    var authorizeButton = document.getElementById('authorize-button');
    var addButton = document.getElementById('addToCalendar');
    if (authResult && !authResult.error) {
          authorizeButton.style.visibility = 'hidden';
          addButton.style.visibility = 'visible'; 
          //load the calendar client library
          gapi.client.load('calendar', 'v3', function(){ 
            console.log("Calendar library loaded.");
          });

    } else {
          authorizeButton.style.visibility = '';
          authorizeButton.onclick = handleAuthClick;
        }
}

/* Event handler that deals with clicking on the Authorize button.*/
function handleAuthClick(event) {
    gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: false}, 
                        handleAuthResult);
    return false;
}

//secretly grabs the user's calender list
setTimeout(function(){
    grabList();},11000); //delays the call becasue it takes a while for the library to load

//invokes function when button is clicked
$("#addToCalendar").click(function(){
    newCalendar();
    setTimeout(function(){
    grabTimes();},10000);
});

function grabList() {
     //grabs the user's calender list
    gapi.client.calendar.calendarList.list().then(function(r){
    allCalender=r;
    var all=allCalender.result.items;
    //loops throught list to check if the calender is there already
    for (var i in all) {
        if (all[i].summary.indexOf("Wellesley Schedule")!==-1) {
            //if yes, stores id into global variable
            id=all[i].id;
        }
    }
    });
}
                                        
//function that creates calender
function newCalendar() {
    //if the calender is not there, create one
    if (id==undefined) {
            var request = gapi.client.calendar.calendars.insert({
                "resource" : {
                    "summary": "Wellesley Schedule",
                    "description": "Wellesley Course Planner",
                    "timezone" : "America/New_York"
                }
            });
    request.execute(function(stat){
        console.log(stat);
        grabList();//grabs list to store id again because calender was not there before

    });
    }
    else {
        console.log("Calender already there. Id: "+id);
        }
}


//var selected= [ {"CRN": "23393","Days": "T","Enrollment": "22", "Hours":["07:00 pm"," 09:30 pm"], "Title": "Images Africana People-Cinema"}]

function grabTimes() {
for (var i in selectedClasses) {
    var CRN=selectedClasses[i].CRN;
    var days=selectedClasses[i].Days;
    var times=selectedClasses[i].MeetingTimes;
    var title=selectedClasses[i].Title;
    //checks how many days and times there are and invokes functions accordingly
    if (days.length==1) {
        makeEvent(days,times[0],times[1],title);
    }
    else if (days.length==2&&times.length==2) {
        makeEvent(days[0],times[0],times[1],title);
        makeEvent(days[1],times[0],times[1],title);
    }
    else if (days.length==2&&times.length==4) {
        makeEvent(days[0],times[0],times[1],title);
        makeEvent(days[1],times[2].times[3],title);
    }
    else if (days.length==3&&times.length==2) {
        makeEvent(days[0],times[0],times[1],title);
        makeEvent(days[1],times[0],times[1],title);
        makeEvent(days[2],times[0],times[1],title);
    }
    else if (days.length==3&&times.length==4) {
        makeEvent(days[0],times[0],times[1],title);
        makeEvent(days[1],times[0],times[1],title);
        makeEvent(days[2],times[2],times[3],title);
    }
}
}

//function that adds events to calender
function makeEvent(d,t1,t2,tit){
    //creates a day array to find out the distance between today and day of class
    var dayName=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    var today=new Date();
    var todayDay=today.getDay();
    var diff;
    //calculates date of class accordingly 
    if (d == "M") {
        diff=dayName.indexOf("Monday")-todayDay;
    } 
    else if (d == "T") {
        diff=dayName.indexOf("Tuesday")-todayDay;
    } else if (d == "W") {
        diff=dayName.indexOf("Wednesday")-todayDay;
    } else if (d == "R") {
       diff=dayName.indexOf("Thursday")-todayDay;
    } else if (d == "F") {
        diff=dayName.indexOf("Friday")-todayDay;
    }
    //makes date of class into a date object
    var actualDay=new Date(today.getFullYear(),today.getMonth(),today.getDate()+diff);
    //put everything into event
    var event = {
        "summary":tit,
        "colorId": "2",
        "start": {
        "dateTime": new Date(actualDay.toLocaleDateString()+" "+t1).toISOString()
    },
        "end": {
            "dateTime": new Date(actualDay.toLocaleDateString()+" "+t2).toISOString()
        }
    };
    //adds class
    var request = gapi.client.calendar.events.insert({
      					'calendarId': id,
      					'resource': event 
    });
    request.execute(function(r){
            console.log(r);
    });
}

//function that deletes the entire calender
function deleteCalender(){
    var deleteRequest = gapi.client.calendar.calendarList.delete({'calendarId': id});
    deleteRequest.execute(function(r){console.log("calendar was deleted", r)});
}

