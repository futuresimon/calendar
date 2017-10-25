// ajax.js
// this script handles all the functions for the calendar
function deleteEventAjax(event){
	var eventId = null;
	var event_radio_pointers = document.getElementsByName("eventId");
	for(var i=0; i<event_radio_pointers.length; i++){
			if(event_radio_pointers[i].checked){
					eventId = event_radio_pointers[i].value;
					break;
			}
	}
	if(eventId){
		// Make a URL-encoded string for passing POST data:
		var token = document.getElementById("token").value;
		var dataString = "eventId=" + encodeURIComponent(eventId) + "&token=" + encodeURIComponent(token);
		var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
		xmlHttp.open("POST", "delete_event_ajax.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
		xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
		xmlHttp.addEventListener("load", function(event){
			var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
			if(jsonData.success){  // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
			alert("Event Has Been Deleted!");
			getEventAjax(); //update the event list
			}else{
				alert("Event Not Deleted.  "+jsonData.message);
			}
		}, false); // Bind the callback to the load event
		xmlHttp.send(dataString); // Send the data
	}
	else{
		alert("Please Select An Event");
	}
}
function editEventAjax(event){
	var eventId = null;
	var event_radio_pointers = document.getElementsByName("eventId");
	for(var i=0; i<event_radio_pointers.length; i++){
			if(event_radio_pointers[i].checked){
					eventId = event_radio_pointers[i].value;
					break;
			}
	}
	if(eventId){
		var editedEventName = document.getElementById("edit_event_name").value; // Get the username from the form
		var year = document.getElementById("edit_year").value; // Get the event time from the form
		var month = document.getElementById("edit_month").value; // Get the event time from the form
		var day = document.getElementById("edit_day").value; // Get the event time from the form
		var hour = document.getElementById("edit_hour").value; // Get the event time from the form
		var minute = document.getElementById("edit_minute").value; // Get the event time from the form
		var editedEventTime = year+"-"+month+"-"+day+" "+hour+":"+minute;
		var token = document.getElementById("token").value;
		// Make a URL-encoded string for passing POST data:
		var dataString = "eventId=" + encodeURIComponent(eventId) + "&token="+encodeURIComponent(token) + "&editedEventName=" + encodeURIComponent(editedEventName) + "&editedEventTime=" + encodeURIComponent(editedEventTime);
		var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
		xmlHttp.open("POST", "edit_event_ajax.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
		xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
		xmlHttp.addEventListener("load", function(event){
			var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
			if(jsonData.success){  // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
			alert("Event Has Been Edited!");
			getEventAjax(); //update the event list
			}else{
				alert("Event Not Edited.  "+jsonData.message);
			}
		}, false); // Bind the callback to the load event
		xmlHttp.send(dataString); // Send the data
	}
	else{
		alert("Please Select An Event")
	}
}
function shareEventAjax(event){
	var eventId = null;
	var event_radio_pointers = document.getElementsByName("eventId");
	for(var i=0; i<event_radio_pointers.length; i++){
			if(event_radio_pointers[i].checked){
					eventId = event_radio_pointers[i].value;
					break;
			}
	}
	if(eventId){
		var sharedEventUser = document.getElementById("share_event_user").value; // Get the user from the form
		// Make a URL-encoded string for passing POST data:
		var dataString = "eventId=" + encodeURIComponent(eventId) + "&sharedEventUser=" + encodeURIComponent(sharedEventUser);
		var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
		xmlHttp.open("POST", "share_event_ajax.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
		xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
		xmlHttp.addEventListener("load", function(event){
			console.log(event.target.responseText);
			var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
			if(jsonData.success){  // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
			alert("Event Has Been Shared!");
			getEventAjax(); //update the event list
			}else{
				alert("Event Not Shared.  "+jsonData.message);
			}
		}, false); // Bind the callback to the load event
		xmlHttp.send(dataString); // Send the data
	}
	else{
		alert("Please Select An Event")
	}
}
function logoutAjax(event){
 	var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
 	xmlHttp.open("GET", "logout_ajax.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
 	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
 	xmlHttp.addEventListener("load", function(event){
 		var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
 		if(jsonData.success){  // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
 			alert("You've been Logged Out!");
			var docUser = document.getElementById("user");
			var emptyUser = "";
			var docTable = document.getElementById("events");
			var emptyEvents = "<p>Log In To See Upcoming Events!<p>";
			docUser.innerHTML = emptyUser;
			docTable.innerHTML = emptyEvents;
			calendarUser = null;
 		}else{
 			alert("You were not logged out.  "+jsonData.message);
 		}
 	}, false); // Bind the callback to the load event
 	xmlHttp.send(null); // Send the data
}
function loginAjax(event){
	var username = document.getElementById("username").value; // Get the username from the form
	var password = document.getElementById("password").value; // Get the password from the form
	// Make a URL-encoded string for passing POST data:
	var dataString = "username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password);
	var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
	xmlHttp.open("POST", "login_ajax.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
		if(jsonData.success){  // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
			alert("You've been Logged In!");
			var docUser = document.getElementById("user");
			calendarUser = jsonData.user;
			docUser.innerHTML = "Welcome " + calendarUser + "!";
			//from https://www.w3schools.com/jsref/dom_obj_hidden.asp
			document.getElementById("token").value = jsonData.token;
			getEventAjax(); //get the events for the logged in user
		}else{
			alert("You were not logged in.  "+jsonData.message);
		}
	}, false); // Bind the callback to the load event
	xmlHttp.send(dataString); // Send the data
}
function signUpAjax(event){
	var username = document.getElementById("signup_username").value; // Get the username from the form
	var password = document.getElementById("signup_password").value; // Get the password from the form
	var confirmPassword = document.getElementById("confirm_signup_password").value; // Get the confirmed password from the form
	// Make a URL-encoded string for passing POST data:
	var dataString = "username=" + encodeURIComponent(username) + "&password=" + encodeURIComponent(password) + "&password_confirm=" + encodeURIComponent(confirmPassword);

	var xmlHttp = new XMLHttpRequest(); // Initialize our XMLHttpRequest instance
	xmlHttp.open("POST", "signup_ajax.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
	xmlHttp.addEventListener("load", function(event){
		var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
		if(jsonData.success){  // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
		alert("You've been Signed Up!");
		}else{
			alert("You were not signed up.  "+jsonData.message);
		}
	}, false); // Bind the callback to the load event
	xmlHttp.send(dataString); // Send the data
}
function createEventAjax(event){
	var name = document.getElementById("event_name").value; // Get the event title from the form
	var year = document.getElementById("year").value; // Get the event time from the form
	var month = document.getElementById("month").value; // Get the event time from the form
	var day = document.getElementById("day").value; // Get the event time from the form
	var hour = document.getElementById("hour").value; // Get the event time from the form
	var minute = document.getElementById("minute").value; // Get the event time from the form
	var time = year+"-"+month+"-"+day+" "+hour+":"+minute;
	var priority = document.getElementById("priority").value;
	// Make a URL-encoded string for passing POST data
	var dataString = "name=" + encodeURIComponent(name) + "&time=" + encodeURIComponent(time) + "&priority=" + encodeURIComponent(priority);
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("POST", "create_event_ajax.php", true); // Starting a POST request (NEVER send passwords as GET variables!!!)
	xmlHttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); // It's easy to forget this line for POST requests
	xmlHttp.addEventListener("load", function(event){
		console.log(event.target.responseText);
		var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
		if(jsonData.success){  // in PHP, this was the "success" key in the associative array; in JavaScript, it's the .success property of jsonData
		alert("You've added the event!");
		getEventAjax(); //update the event list
		}else{
			alert("Event not added.  "+jsonData.message);
		}
	}, false); // Bind the callback to the load event
	xmlHttp.send(dataString); // Send the data
}
function getEventAjax(){
	// The XMLHttpRequest is simple this time:
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", "display_events_ajax.php", true);
	xmlHttp.addEventListener("load", getEventCallback, false);
	xmlHttp.send(null); //Send the data
}
function getEventCallback(event){
	var jsonData = JSON.parse(event.target.responseText); // parse the JSON into a JavaScript object
	if(jsonData.emptyTable){
			var docEvents = document.getElementById("events");
			var emptyEventHtml = "";
			docEvents.innerHTML = emptyEventHtml;
	}
	else{
		var docEvents = document.getElementById("events");
		var eventHtml = "<table><tr><td>edit/delete</td><td>name</td><td>date/time</td><td>priority </td>";
		// Loop through Object and create peopleHTML
		// Help from https://jonsuh.com/blog/convert-loop-through-json-php-javascript-arrays-objects/
		for (var key in jsonData.events) {
			var name = jsonData.events[key].name;
			var time = jsonData.events[key].time;
			var id = jsonData.events[key].id;
			var priority = jsonData.events[key].priority;
			eventHtml += "<tr>";
			eventHtml += "<td><input type='radio' name='eventId' value='"+id+"' id='"+id+"'></td>";
			eventHtml += "<td>" + name + " </td>";
			eventHtml += "<td>" + time + " </td>";
			eventHtml += "<td>" + priority + " </td>";
			eventHtml += "</tr>";
		}
		eventHtml += "</table>"
		docEvents.innerHTML = eventHtml;
	}
}
//from the class wiki
function updateCalendar(){
	var weeks = currentMonth.getWeeks();
	var year = currentMonth.year;
	var monthName = getMonthName(currentMonth.month);
	var calendarOutput = "<table id='calendarTable' class='calenderTable'>";
	calendarOutput +="<tr><td>Sun</td><td>Mon</td><td>Tues</td><td>Wed</td><td>Thurs</td><td>Fri</td><td>Sat</td><tr>";
	for(var w in weeks){
		var days = weeks[w].getDates();
		calendarOutput += "<tr>";
		for(var d in days){
			//https://stackoverflow.com/questions/34053715/how-to-output-date-in-javascript-in-iso-8601-without-milliseconds-and-with-z for help with javascript regex
			var fullDate = days[d].toISOString().split('T')[0];
			day = fullDate.split('-')[2];
			calendarOutput += "<td>"+ day +"</td>";
		}
		calendarOutput+="</tr>"
	}
	calendarOutput +="</table>"
	document.getElementById("month_and_year").innerHTML = "<strong>" + monthName + "</strong> " + year;
	document.getElementById("calendar").innerHTML = calendarOutput;
}
//Make calendar on DOM content load
document.addEventListener("DOMContentLoaded", updateCalendar, false);
document.getElementById("login_btn").addEventListener("click", loginAjax, false); // Bind the AJAX call to button click
document.getElementById("signup_btn").addEventListener("click", signUpAjax, false); // Bind the AJAX call to button click
document.getElementById("create_event_btn").addEventListener("click", createEventAjax, false); // Bind the AJAX call to button click
document.getElementById("logout_btn").addEventListener("click", logoutAjax, false); // Bind the AJAX call to button click
document.getElementById("next_month_btn").addEventListener("click", function(event){
	currentMonth = currentMonth.nextMonth(); // Previous month would be currentMonth.prevMonth()
	updateCalendar(); // Whenever the month is updated, we'll need to re-render the calendar in HTML
}, false);
document.getElementById("prev_month_btn").addEventListener("click", function(event){
	currentMonth = currentMonth.prevMonth(); // Previous month would be currentMonth.prevMonth()
	updateCalendar(); // Whenever the month is updated, we'll need to re-render the calendar in HTML
}, false);
document.getElementById("delete_event_btn").addEventListener("click", deleteEventAjax, false);
document.getElementById("edit_event_btn").addEventListener("click", editEventAjax, false);
document.getElementById("share_event_btn").addEventListener("click", shareEventAjax, false);

//define a global varaible for the logged in user and the current month
var calendarUser=null;
var currentMonth = new Month(2017, 9); // October 2017
//function that creates a drop down list of years
//help from https://stackoverflow.com/questions/20873302/html-looping-option-values-in-drop-down-list
(function() {
	var start = new Date().getFullYear();
	var end = 2050;
	var options = "";
	for(var y=start; y<=end; y++){
		options += "<option value="+y+">"+ y +"</option>";
	}
	document.getElementById("year").innerHTML = options;
	document.getElementById("edit_year").innerHTML = options;
}());
//create list of months
(function() {
	var start = 0;
	var end = 11;
	var options = "";
	for(var m=start; m<=end; m++){
		var monthCorrection = m+1;
		options += "<option value="+monthCorrection+">"+ getMonthName(m) +"</option>";
	}
	document.getElementById("month").innerHTML = options;
	document.getElementById("edit_month").innerHTML = options;
}());
//create menu for days
(function() {
	var start = 1;
	var end = 31;
	var options = "";
	for(var d=start; d<=end; d++){
		options += "<option value="+d+">"+ d +"</option>";
	}
	document.getElementById("day").innerHTML = options;
	document.getElementById("edit_day").innerHTML = options;
}());
(function() {
	var start = 0;
	var end = 23;
			var options = "";
	for(var h=start; h<=end; h++){
		options += "<option value="+h+">"+ h +"</option>";
	}
	document.getElementById("hour").innerHTML = options;
	document.getElementById("edit_hour").innerHTML = options;
}());
(function() {
	var start = 0;
	var end = 59;
	var options = "";
	for(var min=start; min<=end; min++){
		options += "<option value="+min+">"+ min +"</option>";
	}
	document.getElementById("minute").innerHTML = options;
	document.getElementById("edit_minute").innerHTML = options;
}());

function getMonthName(month){
	if(month==0){
		return "January";
	}
	else if(month==1) {
		return "Febuary";
	}
	else if(month==2){
		return "March";
	}
	else if(month==3){
		return "April";
	}
	else if(month==4){
		return "May";
	}
	else if(month==5){
		return "June";
	}
	else if(month==6){
		return "July";
	}
	else if(month==7){
		return "August";
	}
	else if(month==8){
		return "September";
	}
	else if(month==9){
		return "October";
	}
	else if(month==10){
		return "November";
	}
	else{
		return "December";
	}
}
//Calendar API
(function () {
	"use strict";

	/* Date.prototype.deltaDays(n)
	 *
	 * Returns a Date object n days in the future.
	 */
	Date.prototype.deltaDays = function (n) {
		// relies on the Date object to automatically wrap between months for us
		return new Date(this.getFullYear(), this.getMonth(), this.getDate() + n);
	};

	/* Date.prototype.getSunday()
	 *
	 * Returns the Sunday nearest in the past to this date (inclusive)
	 */
	Date.prototype.getSunday = function () {
		return this.deltaDays(-1 * this.getDay());
	};
}());
/** Week
 *
 * Represents a week.
 *
 * Functions (Methods):
 *	.nextWeek() returns a Week object sequentially in the future
 *	.prevWeek() returns a Week object sequentially in the past
 *	.contains(date) returns true if this week's sunday is the same
 *		as date's sunday; false otherwise
 *	.getDates() returns an Array containing 7 Date objects, each representing
 *		one of the seven days in this month
 */
function Week(initial_d) {
	"use strict";

	this.sunday = initial_d.getSunday();


	this.nextWeek = function () {
		return new Week(this.sunday.deltaDays(7));
	};

	this.prevWeek = function () {
		return new Week(this.sunday.deltaDays(-7));
	};

	this.contains = function (d) {
		return (this.sunday.valueOf() === d.getSunday().valueOf());
	};

	this.getDates = function () {
		var dates = [];
		for(var i=0; i<7; i++){
			dates.push(this.sunday.deltaDays(i));
		}
		return dates;
	};
}
/** Month
 *
 * Represents a month.
 *
 * Properties:
 *	.year == the year associated with the month
 *	.month == the month number (January = 0)
 *
 * Functions (Methods):
 *	.nextMonth() returns a Month object sequentially in the future
 *	.prevMonth() returns a Month object sequentially in the past
 *	.getDateObject(d) returns a Date object representing the date
 *		d in the month
 *	.getWeeks() returns an Array containing all weeks spanned by the
 *		month; the weeks are represented as Week objects
 */
function Month(year, month) {
	"use strict";

	this.year = year;
	this.month = month;

	this.nextMonth = function () {
		return new Month( year + Math.floor((month+1)/12), (month+1) % 12);
	};

	this.prevMonth = function () {
		return new Month( year + Math.floor((month-1)/12), (month+11) % 12);
	};

	this.getDateObject = function(d) {
		return new Date(this.year, this.month, d);
	};

	this.getWeeks = function () {
		var firstDay = this.getDateObject(1);
		var lastDay = this.nextMonth().getDateObject(0);

		var weeks = [];
		var currweek = new Week(firstDay);
		weeks.push(currweek);
		while(!currweek.contains(lastDay)){
			currweek = currweek.nextWeek();
			weeks.push(currweek);
		}

		return weeks;
	};
}
