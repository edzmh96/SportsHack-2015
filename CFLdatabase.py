import os 
import datetime
import pymongo
import json
from pymongo import MongoClient

client = MongoClient(["STUB LINK"])
db = client.eventDatabase
event_collection = db.event_collection # a collection of events avaliable 

# most find and change functions should be referenced by restaraunt_name and event_name
# need to change number_of_customers

# Adds in a new event to the database given the following attributes 
# @param multiple fields to identify a new event
# @return void
def add_event(restaraunt_name, restaraunt_long, restaraunt_lat, capacity_of_restaraunt, number_of_customers, event_name, image_url, yelp_url):
	# Just setting the attributes for our appended object. The line is long, but just trust it works.
	appended = {"restaraunt_name" : restaraunt_name, "restaraunt_long" : restaraunt_long, "restaraunt_lat" : restaraunt_lat, "capacity_of_restaraunt" : capacity_of_restaraunt, "number_of_customers" : number_of_customers, "event_name" : event_name, "image_url" : image_url, "yelp_url" : yelp_url}
	append_id = event_collection.insert(appended)


# Returns the object within our database referenced by restaraunt name
# @param restaraunt_name: the name of the restaraunt
# @return: a Json object we can manipulate
def return_object_by_name(restaraunt_name):
	returned = db.event_collection.findOne({"restaraunt_name" : restaraunt_name})
	return returned


# Returns the object within our database referenced by event name
# @param event_name: the name of the event
# @return: a Json object we can manipulate
def return_object_by_event(event_name):
	returned = db.event_collection.findOne({"event_name" : event_name})
	return returned


# Returns the coordinates given the name of the restaraunt
# @param restaraunt_name: the name of the restaraunt
# @return: an array with the first element as a latitude, and the second element and a longitude
def coordinates_by_name(restaraunt_name):
	event_object = return_object_by_name(restaraunt_name)
	coordinates = []
	coordinates[0] = event_object["restaraunt_lat"]
	coordinates[1] = event_object["restaraunt_long"]
	return coordinates


# Returns the coordinates given the name of the event
# @param event_name: the name of the event
# @return: an array with the first element as a latitude, and the second element and a longitude
def coordinates_location_by_event(event_name):
	event_object = return_object_by_event(event_name)
	coordinates = []
	coordinates[0] = event_object["restaraunt_lat"]
	coordinates[1] = event_object["restaraunt_long"]
	return coordinates


# Gets the restaraunts capacity given the restaraunt's name
# @param restaraunt_name: the restaunt's name
# @return: returns the restaraunt's capacity
def get_capacity_by_name(restaraunt_name):
	event_object = return_object_by_name(restaraunt_name)
	capacity = event_object["capacity_of_restaraunt"]
	return capacity


# Gets the restaraunts capacity given the event's name
# @param event_name: the event's name
# @return: returns the event's capacity
def get_capacity_by_event(event_name):
	event_object = return_object_by_event(event_name)
	capacity = event_object["capacity_of_restaraunt"]
	return capacity


# Gets the image URL for a certain event
# @param event_name: the name of the event
# @return: an image URL
def get_image_url_by_event(event_name):
	event_object = return_object_by_event(event_name)
	image_url = event_object["image_url"]
	return image_url

# Get the image URL of a certain restaraunt
# @param restaraunt_name: the name of a restaraunt
# @return: an image URL
def get_image_url_by_name(restaraunt_name):
	event_object = return_object_by_name(restaraunt_name)
	image_url = event_object["image_url"]
	return image_url


# Get the Yelp URL for a restaraunt 
# @param event_name: the name of an event
# @return: a Yelp URL
def get_yelp_url_by_event(event_name):
	event_object = return_object_by_event(event_name)
	yelp_url = event_object["yelp_url"]
	return yelp_url


# Get the Yelp URL for a restaraunt 
# @param restaraunt_name: the name of a restaraunt
# @return: a Yelp URL
def get_yelp_url_by_name(restaraunt_name):
	event_object = return_object_by_name(restaraunt_name)
	yelp_url = event_object["yelp_url"]
	return yelp_url


# Get the number of people who are attending an event
# @param event_name: name of an event
# @return: the number of people attending 
def get_customers_by_event(event_name):
	event_object = return_object_by_event(event_name)
	number_of_customers = event_object["number_of_customers"]
	return number_of_customers


# Get the number of people who are attending an event
# @param restaraunt_name: name of a restaraunt
# @return: the number of people attending 
def get_customers_by_name(restaraunt_name):
	event_object = return_object_by_name(restaraunt_name)
	number_of_customers = event_object["number_of_customers"]
	return number_of_customers


# Changes the number of people attending an event
# @param restaraunt_name: name of the restaraunt
# @param difference: the difference to the number of customers
# @return: none
def change_customers_by_name(restaraunt_name, difference):
	event_object = return_object_by_name(restaraunt_name)
	new_number_customers = event_object["number_of_customers"] + difference

	event_collection.update(
		{"restaraunt_name" : restaraunt_name},
		{ "$set" : {"number_of_customers" : new_number_customers}},
		upsert = True
		)


# Changes the number of people attending an event
# @param event_name: name of the event
# @param difference: the difference to the number of customers
# @return: none
def change_customers_by_event(event_name, difference):
	# event_object = return_object_by_event(event_name)
	# new_number_customers = event_object["number_of_customers"] + difference
 	
    # event_collection.update(
	# 	{"event_name" : event_name},
	# 	{ "$set" : {"number_of_customers" : new_number_customers}},
	# 	upsert = True
	# 	)



# Returns a list of all restaraunts
# @param: none 
# @return: an array of restaraunts
def return_all_restaraunts():
	returned = []

	for iter_object in event_collection.find():
		returned.append(iter_object["restaraunt_name"])

	return returned


# Returns a list of all events
# @param: none
# @return: an array of events
def return_all_events():
	returned = []

	for iter_object in event_collection.find():
		returned.append(iter_object["event_name"])

	return returned

