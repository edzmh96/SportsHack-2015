/**
 * Created by jlvidal on 2015-11-28.
 */
var app = angular.module('sports', []);


app.factory('geolocation', function getLocation() {
    return geolocation;
})

app.controller('mainCtrl', [
    '$scope', function ($scope) {
        $scope.place = "Hamilton, ON, Canada";

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
        };
        $scope.retrieveLocation = function () {
            getLocation(storeLocation, showError);
        }
        $scope.locationChanged = function () {

        }
    }
])