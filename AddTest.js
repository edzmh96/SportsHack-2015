console.log("started");
var api = require('./CFLdatabase');
console.log("loaded");
// Our test event_objects
var event1 = {restaraunt_name : "Apple Bees", restaraunt_long : 12, restaraunt_lat : 20, capacity_of_restaraunt : 12, number_of_customers : 3, event_name : "Warriors View Party", image_url : "www.warriors.com", yelp_url : "www.yelp1.com"}
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