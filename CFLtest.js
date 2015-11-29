var api = require('./CFLdatabase');

console.log("Return all restaraunts test:")
api.return_all_restaraunts(function(err, data) {
	if (err != null) {
		console.log("ERROR: returning all restaraunts.")
	} else {
		console.log(data[0])
	}
});

// console.log("")
// console.log("Return all events test:")
// api.return_all_events(function(err, data) {
// 	if (err != null) {
// 		console.log("ERROR: returning all events.")
// 	} else {
// 		console.log(data)
// 	}
// });

// console.log("")
// console.log("Return object by name test:")
// api.return_object_by_name("Apple Bees", function(err, data){
// 	if (err != null) {
// 		console.log("ERROR: returning object by name.")
// 	} else {
// 		console.log(data)
// 	}
// });

// console.log("")
// console.log("Return object by event test:")
// api.return_object_by_event('Clippers View Party', function(err, data){
// 	if (err != null) {
// 		console.log("ERROR: returning object by event.")
// 	} else {
// 		console.log(data)
// 	}
// });

// console.log("")
// console.log("Return coordinates by name test:")
// api.coordinates_by_name("McDonalds", function(err, data){
// 	if (err != null) {
// 		console.log("ERROR: returning coordinates by name.")
// 	} else {
// 		console.log(data)
// 	}
// }); 

// console.log("")
// console.log("Return coordinates by event test:")
// api.coordinates_location_by_event("Bulls View Party", function(err, data){
// 	if (err != null) {
// 		console.log("ERROR: returning coordinates by name.")
// 	} else {
// 		console.log(data)
// 	}
// }); 


// console.log("")
// console.log("Return capacity by name test:")
// api.get_capacity_by_name("Chilis", function(err, data) {
// 	if (err != null) {
// 		console.log("ERROR IN CAPACITY BY NAME")
// 	} else {
// 		console.log(data)
// 	}
// })

// console.log("")
// console.log("Return capacity by event test:")
// api.get_capacity_by_event("Warriors View Party", function(err, data) {
// 	if (err != null) {
// 		console.log("ERROR IN CAPACITY BY EVENT")
// 	} else {
// 		console.log(data)
// 	}
// })

// console.log("")
// console.log("Return image url by event test:")
// api.get_image_url_by_event("Warriors View Party", function(err, data) {
// 	if (err != null) {
// 		console.log("ERROR IN IMAGE URL BY NAME")
// 	} else {
// 		console.log(data)
// 	}
// })

// console.log("")
// console.log("Return image url by name test:")
// api.get_image_url_by_name("Tim Hortons", function(err, data) {
// 	if (err != null) {
// 		console.log("ERROR IN IMAGE URL BY NAME")
// 	} else {
// 		console.log(data)
// 	}
// })

// console.log("")
// console.log("Return yelp_url by event test:")
// api.get_yelp_url_by_event("Bulls View Party", function(err, data) {
// 	if (err != null) {
// 		console.log("ERROR IN YELP URL BY EVENT")
// 	} else {
// 		console.log(data)
// 	}
// })

// console.log("")
// console.log("Return yelp_url by name test:")
// api.get_yelp_url_by_name("Gypsy", function(err, data) {
// 	if (err != null) {
// 		console.log("ERROR IN YELP URL BY NAME")
// 	} else {
// 		console.log(data)
// 	}
// })

// console.log("")
// console.log("Return customer by name test:")
// api.get_customers_by_name("Tim Hortons", function(err, data) {
// 	if (err != null) {
// 		console.log("ERROR IN CUSTOMERS BY NAME TEST")
// 	} else {
// 		console.log(data)
// 	}
// })

// console.log("")
// console.log("Return customer by event test:")
// api.get_customers_by_event("Bulls View Party", function(err, data) {
// 	if (err != null) {
// 		console.log("ERROR IN CUSTOMERS BY EVENT TEST")
// 	} else {
// 		console.log(data)
// 	}
// })

// console.log("")
// console.log("Change customers by name test:")
// api.change_customers_by_name("Apple Bees", 12, function(err, data) {
// 	if (err != null) {
// 		console.log("ERROR IN CHANGING CUSTOMERS BY NAME")
// 	} else {
// 		console.log(data)
// 	}
// })

// console.log("")
// console.log("Change customers by event test:")
// api.change_customers_by_event("Warriors View Party", 69, function(err, data) {
// 	if (err != null) {
// 		console.log("ERROR IN CHANGING CUSTOMERS BY EVENT")
// 	} else {
// 		console.log(data)
// 	}
// })



