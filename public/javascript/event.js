/**
 * Created by jlvidal on 2015-11-28.
 */
var app = angular.module('sports', []);


app.filter('filterTest', function () {
    return function (obj) {
        console.log(obj);
        return obj;
    };
})

app.controller('mainCtrl', [
    '$scope', "$http", function ($scope, $http) {
        $scope.place = "Hamilton, ON, Canada";
        $scope.showPeopleStats = false;
        $scope.cflQtdPeople = 0;

        $scope.lat = 43.2500;
        $scope.long = -79.8660914
        $scope.customMarkers = [];

        function getLocation(storeLocation, showError) {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(storeLocation, showError);
            } else {
                console.log("Geolocation is not supported by this browser.");
            }
        }

        function showError(error) {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    swal({
                        title: "Error!",
                        text: "The request for Geolocation was denied!",
                        type: "error",
                        confirmButtonText: "OK"
                    });
                    break;
                case error.POSITION_UNAVAILABLE:
                    swal({
                        title: "Error!",
                        text: "Location information is unavailable.",
                        type: "error",
                        confirmButtonText: "OK"
                    });
                    break;
                case error.TIMEOUT:
                    swal({
                        title: "Error!",
                        text: "The request to get user location timed out.",
                        type: "error",
                        confirmButtonText: "OK"
                    });
                    break;
                case error.UNKNOWN_ERROR:
                    swal({title: "Error!", text: "An unknown error occurred.", type: "error", confirmButtonText: "OK"});
                    break;
            }
        }

        function storeLocation(position) {
            $scope.lat = position.coords.latitude;
            $scope.long = position.coords.longitude;
            var latlng = {lat: parseFloat($scope.lat), lng: parseFloat($scope.long)};
            geocoder.geocode({'location': latlng}, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    if (results[1]) {
                        $scope.place = results[1].formatted_address;
                        $scope.$apply();

                        google.maps.event.trigger(inputBox, 'focus')
                        google.maps.event.trigger(inputBox, 'keydown', {
                            keyCode: 13
                        });
                    } else {
                        swal({title: "Error!", text: "No results found", type: "error", confirmButtonText: "OK"});
                    }
                } else {
                    swal({
                        title: "Error!",
                        text: "Geocoder failed due to: " + status,
                        type: "error",
                        confirmButtonText: "OK"
                    });
                }
            })
        }

        $scope.mapLoaded = function () {
            $scope.isLoaded = true;
            $scope.locationChanged();
        };
        $scope.retrieveLocation = function () {
            getLocation(storeLocation, showError);
        };

        function getEventByLocation(options, callBack) {

            //callBack("Failed!", "");
            //var fakeData = {
            //    "_id": "565a485fc6037020ac326129",
            //    "restaurant_name": "Endzone Bar & Grill",
            //    "restaurant_long": -79.807365,
            //    "restaurant_lat": 43.2311,
            //    "capacity_of_restaurant": 75,
            //    "number_of_customers": 75,
            //    "event_name": "Ti-Cats at Home vs. Winnepeg",
            //    "Date": "8/9/2016",
            //    "Time": "5:00:00 PM",
            //    "event_id": 9,
            //    "image_url": "http://www.yelp.ca/biz_photos/endzone-bar-and-grill-hamilton?select=uMw-RrUfbdmWV4IKWS4ISg",
            //    "yelp_url": "http://www.yelp.ca/biz/endzone-bar-and-grill-hamilton"
            //};
            //
            //var result = {eventData: [fakeData], peopleQtd: 100};
            //
            //callBack(undefined, result);

            function getQueryStringValue (key) {
                return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
            }
            var gameId = getQueryStringValue("id");

            $http({
                method: 'POST',
                url: '/game-events/getFiltered',
                data : {
                    lat : $scope.lat,
                    long : $scope.long,
                    gameId : gameId
                }
            }).then(function successCallback(response) {

                callBack(undefined, response);

            }, function errorCallback(response) {
                console.log(response);
               callBack("Sorry, the service is not available.");
            });
            return;
        }

        function processEventResults(err, data) {
            if (err) {
                if (err.msg) {
                    swal({
                        title: "Error!",
                        text: "An unknown error occurred." + " (" + err.msg + ")",
                        type: "error",
                        confirmButtonText: "OK"
                    });
                }
                else {
                    swal({
                        title: "Error!",
                        text: "An unknown error occurred." + " (" + err.toString() + ")",
                        type: "error",
                        confirmButtonText: "OK"
                    });
                }
                return;
            }

            console.log(data);
            return;

            $scope.cflQtdPeople = data.peopleQtd;
            $scope.showPeopleStats = true;
            $scope.allEvents = data.eventData;
            $scope.rebuildMarkers();
            try {
                $scope.$apply();
            }
            catch (ex) {

            }

        }

        $scope.rebuildMarkers = function () {
            $scope.customMarkers.forEach(function (marker) {
                marker.setMap(null);
            });
            $scope.customMarkers = [];
            $scope.lastSelected = undefined;
            $scope.allEvents.forEach(function (obj,index) {
                obj.selected = false;

                var image = 'images/beachflag.png'
                var newMarker = new google.maps.Marker({
                    map: map,
                    icon: image,
                    title: obj.restaurant_name,
                    draggable: true,
                    position: {lat: obj.restaurant_lat, lng: obj.restaurant_long}
                });

                $scope.customMarkers.push(newMarker);
                newMarker.addListener('click', function () {
                    if ($scope.lastSelected)
                    {
                        $scope.lastSelected.selected = false;
                    }
                    var newArray = $scope.allEvents.slice();

                    setTimeout(function ()
                    {
                        obj.selected = true;
                        $scope.lastSelected = obj;
                        $scope.allEvents = newArray;
                        if (focusOnSelectedEvent)
                        {
                            focusOnSelectedEvent();
                        }
                        $scope.$apply();


                    },1);


                })
            });
        };

        $scope.locationChanged = function () {
            getEventByLocation({lat: $scope.lat, long: $scope.long}, processEventResults);
        }
    }
])