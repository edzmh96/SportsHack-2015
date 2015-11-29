var mongoose = require("mongoose");
mongoose.connect("mongodb://root:cfl123@ds054308.mongolab.com:54308/sportshack")

var db = mongoose.connection;
var events_collection = db.collection("THE NAME OF THE DATABASE WE'RE GOING TO HARDCODE IN")
var user_ti = db.collection("THE NAME OF THE TI-CATS")

export class Event {
	constructor(restaraunt_name, restaraunt_long, restaraunt_lat, capacity_of_restaraunt, number_of_customers, event_name, image_url, yelp_url) {
		this.restaraunt_name = restaraunt_name
		this.restaraunt_long = 	restaraunt_long
		this.restaraunt_lat = restaraunt_lat
		ths.capacity_of_restaraunt = capacity_of_restaraunt
		this.number_of_customers = number_of_customers
		this.event_name = event_name
		this.image_url = image_url
		this.yelp_url = yelp_url
	}
}


// Adds in a new event to the database given the following attributes 
// @param multiple fields to identify a new event
// @return void
export function add_event(obj, callback) {
	var event_obj = obj
	event_collection.insert(event_obj, function(err, result){
		if (err != null) {
			console.log("There was an error in adding the object.")
			console.log(err)
			callback(err) 
		} else {
			callback(err, result)
		}
	})
}


// Returns the object within our database referenced by restaraunt name
// @param restaraunt_name: the name of the restaraunt
// @return: a Json object we can manipulate
export function return_object_by_name(restaraunt_name, callback) {
	db.event_collection.findOne({"restaraunt_name" : restaraunt_name}, function(err, data) {
		if (err != null) {
			console.log("There is no event with this restaraunt name.")
			console.log(err)
			callback(err)
		} else {
			callback(err, data)
		}
	}

}


// Returns the object within our database referenced by event name
// @param event_name: the name of the event
// @return: a Json object we can manipulate
export function return_object_by_event(event_name, callback) {
	db.event_collection.findOne({"event_name" : event_name}, function(err, data) {
		if (err != null) {
			console.log("There is no event with this event name.")
			console.log(err)
			callback(err)
		} else {
			callback(err, data)
		}
	})
}


// Returns the coordinates given the name of the restaraunt
// @param restaraunt_name: the name of the restaraunt
// @return: an array with the first element as a latitude, and the second element and a longitude
export function coordinates_by_name(restaraunt_name, callback) {
	return_object_by_name(restaraunt_name, function(err, data){
		if (err != null) {
			console.log("There was an error in getting the coordinates.")
			console.log(err)
			callback(err)
		} else {
			var event_obj = data
			var coordinates = []
			coordinates[0] = event_obj["restaraunt_lat"]
			coordinates[1] = event_obj["restaraunt_long"]
			callback(err, coordinates)
		}
	})
}


// Returns the coordinates given the name of the event
// @param event_name: the name of the event
// @return: an array with the first element as a latitude, and the second element and a longitude
export function coordinates_location_by_event(event_name, callback) {
	return_object_by_event(event_name, function(err, data){
		if (err != null) {
			console.log("There was an error in getting the coordinates.")
			console.log(err)
			callback(err)
		} else {
			var event_obj = data
			var coordinates = []
			coordinates[0] = event_obj["restaraunt_lat"]
			coordinates[1] = event_obj["restaraunt_long"]
			callback(err, coordinates)
		}
	})
}


// Gets the restaraunts capacity given the restaraunt's name
// @param restaraunt_name: the restaunt's name
// @return: returns the restaraunt's capacity
export function get_capacity_by_name(restaraunt_name, callback) {
	return_object_by_name(restaraunt_name, function(err, data) {
		if (err != null) {
			console.log("There was an error in getting the event capacity.")
			console.log(err)
			callback(err)
		} else {
			var event_obj = data;
			var capacity = event_obj["capacity_of_restaraunt"]
			callback(err, capacity)
		}
	})
}


// Gets the restaraunts capacity given the event's name
// @param event_name: the event's name
// @return: returns the event's capacity
export function get_capacity_by_event(event_name, callback) {
	return_object_by_event(event_name, function(err, data) {
		if (err != null) {
			console.log("There was an error in getting the event capacity.")
			console.log(err)
			callback(err)
		} else {
			var event_obj = data;
			var capacity = event_obj["capacity_of_restaraunt"]
			callback(err, capacity)
		}
	})

}


// Gets the image URL for a certain event
// @param event_name: the name of the event
// @return: an image URL
export function get_image_url_by_event(event_name, callback) {
	return_object_by_event(event_name, function(err, data) {
		if (err != null) {
			console.log("There was an error in getting the image URL.")
			console.log(err)
			callback(err)
		} else {
			var event_obj = data
			var image_url = event_obj["image_url"]
			callback(err, image_url)
		}
	}) 
}


// Get the image URL of a certain restaraunt
// @param restaraunt_name: the name of a restaraunt
// @return: an image URL
export function get_image_url_by_name(restaraunt_name, callback) {
	return_object_by_name(restaraunt_name, function(err, data) {
		if (err != null) {
			console.log("There was an error in getting the image URL.")
			console.log(err)
			callback(err)
		} else {
			var event_obj = data
			var image_url = event_obj["image_url"]
			callback(err, image_url)
		}
	}) 
}


// Get the Yelp URL for a restaraunt 
// @param event_name: the name of an event
// @return: a Yelp URL
export function get_yelp_url_by_event(event_name, callback) {
	return_object_by_event(event_name, function(err, data){
		if (err != null) {
			console.log("There was an error in getting the Yelp URL.")
			console.log(err)
			callback(err)
		} else {
			var event_obj = data
			var yelp_url = event_obj["yelp_url"]
			callback(err, yelp_url)
		}
	}) 
}


// Get the Yelp URL for a restaraunt 
// @param restaraunt_name: the name of a restaraunt
// @return: a Yelp URL
export function get_yelp_url_by_name(restaraunt_name, callback) {
	return_object_by_name(restaraunt_name, function(err, data) {
		if (err != null) {
			console.log("There was an error in getting the Yelp URL.")
			console.log(err)
			callback(err)
		} else {
			var event_obj = data
			var yelp_url = event_obj["yelp_url"]
			callback(err, yelp_url)
		}
	})
}


// Get the number of people who are attending an event
// @param event_name: name of an event
// @return: the number of people attending 
export function get_customers_by_event(event_name, callback) {

	return_object_by_event(event_name, function(err, data) {
		if (err != null) {
			console.log("There was an error in getting number of customers.")
			console.log(err)
			callback(err)
		} else {
			var event_obj = data
			var number_of_customers = event_obj["number_of_customers"]
			callback(err, number_of_customers)

		}
	})
}


// Get the number of people who are attending an event
// @param restaraunt_name: name of a restaraunt
// @return: the number of people attending 
export function get_customers_by_name(restaraunt_name, callback) {
	return_object_by_name(restaraunt_name, function(err, data) {
		if (err != null) {
			console.log("There was an error in getting number of customers.")
			console.log(err)
			callback(err)
		} else {
			var event_obj = data
			//console.log(event_obj);
			var number_of_customers = event_obj["number_of_customers"]
			callback(err, number_of_customers);
		
	})
}


//FIGURE THIS CRAP OUT THIS ONE IS IMPORANT
// Changes the number of people attending an event
// @param restaraunt_name: name of the restaraunt
// @param difference: the difference to the number of customers
// @return: none
export function change_customers_by_name(restaraunt_name, difference, callback) {
	return_object_by_name(restaraunt_name, function (err, data)
	{
	if (err != null) {
		console.log("Error in getting your event.")
		console.log(err)
		callback(err)
	} else {
		var event_obj = data;
		var new_number_customers = event_obj["number_of_customers"] + difference

		event_obj.updateOne(
			{"restaraunt_name" : restaraunt_name}, 
			{$set : {"number_of_customers" : new_number_customers}},
			function(err, results) {
				if (err) {
					console.log("Error in changing the number of attendants.")
					console.log(err)
					callback(err)
				}
			})
		}

	callback(err)
	})	
}


//FIGURE THIS CRAP OUT 
// Changes the number of people attending an event
// @param event_name: name of the event
// @param difference: the difference to the number of customers
// @return: none
export function change_customers_by_event(event_name, difference, callback) {
	return_object_by_name(restaraunt_name, function (err, data)
	{
	if (err != null) {
		console.log("Error in getting your event.")
		console.log(err)
		callback(err)
	} else {
		var event_obj = data;
		var new_number_customers = event_obj["number_of_customers"] + difference

		event_obj.updateOne(
			{"event_name" : event_name}, 
			{$set : {"number_of_customers" : new_number_customers}},
			function(err, results) {
				if (err) {
					console.log("Error in changing the number of attendants.")
					console.log(err)
					callback(err)
				}
			})
		}

	callback(err)
	})	
}


// Returns a list of all restaraunts
// @param: none 
// @return: an array of restaraunts
export function return_all_restaraunts(callback) {
	events_collection.find({}, {restaraunt_name : 1}, function(err, data) {
		if (err != null) {
			console.log("Error in returning all events.")
			console.log(err)
			callback(err)
		} else {
			var restaraunts = data
			callback(err, restaraunts)
		}
	})
}

// Returns a list of all events
// @param: none
// @return: an array of events
export function return_all_events(callback) {
	events_collection.find({}, {event_name : 1}, function(err, data) {
		if (err != null) {
			console.log("Error in returning all events.")
			console.log(err)
			callback(err)
		} else {
			var events = data
			callback(err, events)
		}
	})
}


