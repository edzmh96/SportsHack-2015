var mongoose = require("mongoose");
mongoose.connect('mongodb://root:cfl123@ds054308.mongolab.com:54308/sportshack')

var db = mongoose.connection;
var events_collection = db.collection("events_collection")
var user_ti = db.collection("ticats_users")

// Adds in a new event to the database given the following attributes 

// class Event {
// 	constructor(restaraunt_name, restaraunt_long, restaraunt_lat, capacity_of_restaraunt, number_of_customers, event_name, game_id, image_url, yelp_url) {
// 		this.restaraunt_name = restaraunt_name
//		this.game_id = game_id
// 		this.restaraunt_long = 	restaraunt_long
// 		this.restaraunt_lat = restaraunt_lat
// 		ths.capacity_of_restaraunt = capacity_of_restaraunt
// 		this.number_of_customers = number_of_customers
// 		this.event_name = event_name
// 		this.image_url = image_url
// 		this.yelp_url = yelp_url
// 	}
// }

function getEventsAroundByLocationAndGameId(obj, callback) {
    var items = [obj.long, obj.lat];
    events_collection.find({
        loc: {
            $near: {
                $geometry: {type: "Point", coordinates: items},
                $minDistance: 0,
                $maxDistance: obj.distance
            }
        },
        game_id: obj.gameId
    }, function (err, data) {
        if (err) {
            callback(err);
            return;
        }

        data.toArray(callback);
    });
}
function getNumberOfUsersAround(obj, callback) {
    var items = [obj.long, obj.lat];
    user_ti.count({
        loc: {
            $near: {
                $geometry: {type: "Point", coordinates: items},
                $minDistance: 0,
                $maxDistance: obj.distance
            }
        }
    }, callback);

    //user_ti.find(
    //    {
    //        loc: {
    //            $near: {
    //                $geometry: {type: "Point", coordinates:items },
    //                $maxDistance: obj.distance
    //            }
    //        }
    //    },function(err, data)
    //    {
    //        if (err)
    //        {
    //            callback(err);
    //            return;
    //        }
    //
    //        data.count(callback);
    //    });
}
//  Returns the event_id of an event given a name
//	@param restaraunt_name: the name of the restaraunt
//	@return: the event id
function get_game_id_by_name(restaraunt_name, callback) {
    return_object_by_name(restaraunt_name, function (err, data) {
        if (err != null) {
            console.log(err)
            callback(err)
        } else {
            var event_obj = data
            var game_id = event_obj[0]["event_id"]
            callback(err, game_id)
        }
    })
}

function get_game_id_by_event(event_name, callback) {
    return_object_by_event(event_name, function (err, data) {
        if (err != null) {
            console.log(err)
            callback(err)
        } else {
            var event_obj = data
            var game_id = event_obj[0]["event_id"]
            callback(err, game_id)
        }
    })
}


// Adds in a new event to the database given the following attributes
// @param multiple fields to identify a new event
// @return void
function add_event(obj, callback) {
    var event_obj = obj
    events_collection.insert(event_obj, function (err, result) {
        if (err != null) {
            console.log("There was an error in adding the object.")
            console.log(err)
            callback(err)
        } else {
            callback(err, result)
        }
    })
}

// @param id: the id of the object we are looking for
// @return: returns the object associated with the id
function return_object_by_id(id, callback) {
	events_collection.find({"_id" : id}, function(err, data) {
		if (err != null) {
			console.log("Could not retrieve the item")
			console.log(err)
			callback(err)
		} else {
			data.toArray(callback)
		}
	})
}

// Returns the object within our database referenced by restaraunt name
// @param restaraunt_name: the name of the restaraunt
// @return: a Json object we can manipulate
function return_object_by_name(restaraunt_name, callback) {
    events_collection.find({"restaraunt_name": restaraunt_name}, function (err, data) {
        if (err != null) {
            console.log("There is no event with this restaraunt name.")
            console.log(err)
            callback(err)
        } else {
            data.toArray(callback)
        }
    })

}


// Returns the object within our database referenced by event name
// @param event_name: the name of the event
// @return: a Json object we can manipulate
function return_object_by_event(event_name, callback) {
    events_collection.find({"event_name": event_name}, function (err, data) {
        if (err != null) {
            console.log("There is no event with this restaraunt name.")
            console.log(err)
            callback(err)
        } else {
            data.toArray(callback)
        }
    })
}


// Returns the coordinates given the name of the restaraunt
// @param restaraunt_name: the name of the restaraunt
// @return: an array with the first element as a latitude, and the second element and a longitude
function coordinates_by_name(restaraunt_name, callback) {
    return_object_by_name(restaraunt_name, function (err, data) {
        if (err != null) {
            console.log("There was an error in getting the coordinates.")
            console.log(err)
            callback(err)
        } else {
            var event_obj = data
            var coordinates = []
            coordinates[0] = event_obj[0].restaraunt_lat
            coordinates[1] = event_obj[0].restaraunt_long
            callback(err, coordinates)
        }
    })
}


// Returns the coordinates given the name of the event
// @param event_name: the name of the event
// @return: an array with the first element as a latitude, and the second element and a longitude
function coordinates_location_by_event(event_name, callback) {
    return_object_by_event(event_name, function (err, data) {
        if (err != null) {
            console.log("There was an error in getting the coordinates.")
            console.log(err)
            callback(err)
        } else {
            var event_obj = data
            var coordinates = []
            coordinates[0] = event_obj[0].restaraunt_lat
            coordinates[1] = event_obj[0].restaraunt_long
            callback(err, coordinates)
        }
    })
}


// Gets the restaraunts capacity given the restaraunt's name
// @param restaraunt_name: the restaunt's name
// @return: returns the restaraunt's capacity
function get_capacity_by_name(restaraunt_name, callback) {
    return_object_by_name(restaraunt_name, function (err, data) {
        if (err != null) {
            console.log("There was an error in getting the event capacity.")
            console.log(err)
            callback(err)
        } else {
            var event_obj = data;
            var capacity = event_obj[0]["capacity_of_restaraunt"]
            callback(err, capacity)
        }
    })
}


// Gets the restaraunts capacity given the event's name
// @param event_name: the event's name
// @return: returns the event's capacity
function get_capacity_by_event(event_name, callback) {
    return_object_by_event(event_name, function (err, data) {
        if (err != null) {
            console.log("There was an error in getting the event capacity.")
            console.log(err)
            callback(err)
        } else {
            var event_obj = data;
            var capacity = event_obj[0]["capacity_of_restaraunt"]
            callback(err, capacity)
        }
    })

}


// Gets the image URL for a certain event
// @param event_name: the name of the event
// @return: an image URL
function get_image_url_by_event(event_name, callback) {
    return_object_by_event(event_name, function (err, data) {
        if (err != null) {
            console.log("There was an error in getting the image URL.")
            console.log(err)
            callback(err)
        } else {
            var event_obj = data
            var image_url = event_obj[0]["image_url"]
            callback(err, image_url)
        }
    })
}


// Get the image URL of a certain restaraunt
// @param restaraunt_name: the name of a restaraunt
// @return: an image URL
function get_image_url_by_name(restaraunt_name, callback) {
    return_object_by_name(restaraunt_name, function (err, data) {
        if (err != null) {
            console.log("There was an error in getting the image URL.")
            console.log(err)
            callback(err)
        } else {
            var event_obj = data
            var image_url = event_obj[0]["image_url"]
            callback(err, image_url)
        }
    })
}


// Get the Yelp URL for a restaraunt
// @param event_name: the name of an event
// @return: a Yelp URL
function get_yelp_url_by_event(event_name, callback) {
    return_object_by_event(event_name, function (err, data) {
        if (err != null) {
            console.log("There was an error in getting the Yelp URL.")
            console.log(err)
            callback(err)
        } else {
            var event_obj = data
            var yelp_url = event_obj[0]["yelp_url"]
            callback(err, yelp_url)
        }
    })
}


// Get the Yelp URL for a restaraunt
// @param restaraunt_name: the name of a restaraunt
// @return: a Yelp URL
function get_yelp_url_by_name(restaraunt_name, callback) {
    return_object_by_name(restaraunt_name, function (err, data) {
        if (err != null) {
            console.log("There was an error in getting the Yelp URL.")
            console.log(err)
            callback(err)
        } else {
            var event_obj = data
            var yelp_url = event_obj[0]["yelp_url"]
            callback(err, yelp_url)
        }
    })
}


// Get the number of people who are attending an event
// @param event_name: name of an event
// @return: the number of people attending
function get_customers_by_event(event_name, callback) {

    return_object_by_event(event_name, function (err, data) {
        if (err != null) {
            console.log("There was an error in getting number of customers.")
            console.log(err)
            callback(err)
        } else {
            var event_obj = data
            var number_of_customers = event_obj[0]["number_of_customers"]
            callback(err, number_of_customers)

        }
    })
}


// Get the number of people who are attending an event
// @param restaraunt_name: name of a restaraunt
// @return: the number of people attending
function get_customers_by_name(restaraunt_name, callback) {
    return_object_by_name(restaraunt_name, function (err, data) {
        if (err != null) {
            console.log("There was an error in getting number of customers.")
            console.log(err)
            callback(err)
        } else {
            var event_obj = data
            //console.log(event_obj);
            var number_of_customers = event_obj[0]["number_of_customers"]
            callback(err, number_of_customers);

        }
    })

}


//FIGURE THIS CRAP OUT THIS ONE IS IMPORANT
// Changes the number of people attending an event
// @param restaraunt_name: name of the restaraunt
// @param difference: the difference to the number of customers
// @return: none
function change_customers_by_name(restaraunt_name, difference, callback) {
    return_object_by_name(restaraunt_name, function (err, data) {
        if (err != null) {
            console.log("Error in getting your event.")
            console.log(err)
            callback(err)
        } else {
            var event_obj = data;
            console.log(event_obj)
            var new_number_customers = event_obj[0]["number_of_customers"] + difference

            events_collection.update(
                {"restaraunt_name": restaraunt_name},
                {$set: {"number_of_customers": new_number_customers}},
                function (err, results) {
                    if (err) {
                        console.log("Error in changing the number of attendants.")
                        console.log(err)
                        callback(err)
                    }
                    else {
                        callback(err, results.result);
                    }
                })
        }
    })
}


//FIGURE THIS CRAP OUT
// Changes the number of people attending an event
// @param event_name: name of the event
// @param difference: the difference to the number of customers
// @return: none
function change_customers_by_event(event_name, difference, callback) {
    return_object_by_event(event_name, function (err, data) {
        if (err != null) {
            console.log("Error in getting your event.")
            console.log(err)
            callback(err)
        } else {
            console.log("got the objs")
            var event_obj = data;
            console.log(event_obj)
            var new_number_customers = event_obj[0]["number_of_customers"] + difference

            events_collection.update(
                {"event_name": event_name},
                {$set: {"number_of_customers": new_number_customers}},
                function (err, results) {
                    if (err) {
                        console.log("Error in changing the number of attendants.")
                        console.log(err)
                        callback(err)
                    }
                    else {
                        callback(err, results.result);
                    }
                })
        }
    })
}


// Returns a list of all restaraunts
// @param: none
// @return: an array of restaraunts
function return_all_restaraunts(callback) {
    events_collection.find({}, {restaraunt_name: 1}, function (err, data) {
        if (err != null) {
            console.log("Error in returning all events.")
            console.log(err)
            callback(err)
        } else {
            data.toArray(callback)
        }
    })
}

// Returns a list of all events
// @param: none
// @return: an array of events
function return_all_events(callback) {
    events_collection.find({}, {event_name: 1}, function (err, data) {
        if (err != null) {
            console.log("Error in returning all events.")
            console.log(err)
            callback(err)
        } else {
            data.toArray(callback)
            //callback(err, events)
        }
    })
}


module.exports = {
    add_event, return_all_events, return_all_restaraunts,
    change_customers_by_name, change_customers_by_event,
    get_customers_by_name, get_customers_by_event,
    get_yelp_url_by_name, get_yelp_url_by_event,
    get_image_url_by_name, get_image_url_by_event,
    get_capacity_by_event, get_capacity_by_name,
    coordinates_by_name, coordinates_location_by_event,
    return_object_by_name, return_object_by_event,
    getNumberOfUsersAround, getEventsAroundByLocationAndGameId
}
