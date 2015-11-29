console.log("started");
var api = require('./CFLdatabase');
console.log("loaded");
// Our test event_objects
var event1 = {restaraunt_name : "Jack Astor’s Bar & Grill", restaraunt_long : -79.949102, restaraunt_lat : 43.226337, capacity_of_restaraunt : 74, number_of_customers : 12, event_name : "Ottawa Red Blacks vs Edmonton Eskimos @ 3:00pm - 7:00pm, November 29th, 2015", image_url : "http://s3-media1.fl.yelpcdn.com/bphoto/gQLT87Mqzd7fcEjcc_AeGQ/o.jpg", yelp_url : "http://www.yelp.ca/biz/jack-astors-bar-and-grill-ancaster", game_id : 1}
var event2 = {restaraunt_name : "Chilis", restaraunt_long : 32, restaraunt_lat : 69, capacity_of_restaraunt : 49, number_of_customers : 23, event_name : "Bulls View Party", image_url : "www.bulls.com", yelp_url : "www.yelp2.com"}
var event3 = {restaraunt_name : "Tim Hortons", restaraunt_long : 83, restaraunt_lat : 47, capacity_of_restaraunt : 22, number_of_customers : 11, event_name : "Clippers View Party", image_url : "www.clippers.com", yelp_url : "www.yelp3.com"}
var event4 = {restaraunt_name : "Gypsy", restaraunt_long : 11, restaraunt_lat : 33, capacity_of_restaraunt : 87, number_of_customers : 11, event_name : "Hornets View Party", image_url : "www.hornets.com", yelp_url : "www.yelp4.com"}
var event5 = {restaraunt_name : "McDonalds", restaraunt_long : 13, restaraunt_lat : 13, capacity_of_restaraunt : 100, number_of_customers : 0, event_name : "Kings View Party", image_url : "www.kings.com", yelp_url : "www.yelp5.com"}



api.add_event(event1, function(err, data){
	if (err != null) {
		console.log("ERROR: adding event 1.")
	} else {
		console.log("Succesfully added event 1.")
	}
});

api.add_event(event2, function(err, data){
	if (err != null) {
		console.log("ERROR: adding event 2.")
	} else {
		console.log("Succesfully added event 2.")
	}	
});

api.add_event(event3, function(err, data){
	if (err != null) {
		console.log("ERROR: adding event 3.")
	} else {
		console.log("Succesfully added event 3.")
	}
});

api.add_event(event4, function(err, data){
	if (err != null) {
		console.log("ERROR: adding event 4.")
	} else {
		console.log("Succesfully added event 4.")
	}
});

api.add_event(event5, function(err, data){
	if (err != null) {
		console.log("ERROR: adding event 5.")
	} else {
		console.log("Succesfully added event 5.")
	}
});