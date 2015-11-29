/*
var app = angular.module('Hype', []);


app.factory('geolocation', function getLocation(){
  return geolocation;
} )

app.controller('listCtrl', [
  '$scope', function($scope){


  }
])

*/

document.addEventListener('DOMContentLoaded', getLocation, false);

var lat;
var long;


function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(storeLocation);
    } else {
        console.log("Geolocation is not supported by this browser.");
    }
}

function storeLocation(position){
  lat = position.coords.latitude;
  long = position.coords.longitude;
}

function getLat(){
  //.getElementById("lat").innerHTML = lat;
  return lat;
}

function getLong(){
  //document.getElementById("long").innerHTML = long;
  return long;
}
