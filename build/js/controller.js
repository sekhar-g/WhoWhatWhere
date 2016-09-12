var app = angular.module("businessApp", []);
app.controller('myCtrl', function ($scope, $http, $window) {
    $scope.data = [];
    var markers = [];

    function getInfo(input) {
        $http.post('/getdata', input).then(function (resp) {
            if (resp.data instanceof Array && resp.data.length > 0) {
                console.log(resp.data);
                var respData = resp.data;
                setMapOnAllMarkers();
                markers.length = 0;
                $scope.data = [];

                for (var i = 0; i < respData.length; i++) {

                    $scope.data.push({
                        class: i,
                        address: respData[i].address,
                        city: respData[i].city,
                        name: respData[i].name,
                        phone: respData[i].phone,
                        rating: respData[i].rating,
                        url: respData[i].url,
                        cords: respData[i].cords,
                        image: respData[i].photo
                    });


                    //  console.log("image", respData[i].photo);
                }

                loadGoogleMarkers();
            } else {
                console.log('No Results found');
            }

        }, function (error) {
            console.error(error);
        });
    }

    //on search button functionality
    $scope.onMenuButton = function () {
        if ($scope.location.toString().trim().length > 0) {
            $scope.showItemDetails = true;
            getInfo({query: $scope.query, location: $scope.location});
        } else {
            alert('please enter a location');
        }
    };

    function onCityPositionUpdate(position) {
        getCurrentCityPosition(position.coords.latitude, position.coords.longitude);
    }

    function getCurrentCityPosition(latitude, longitude) {
        var latlng = new google.maps.LatLng(latitude, longitude);

        new google.maps.Geocoder().geocode(
            {'latLng': latlng},
            function (results, status) {
                if (status == google.maps.GeocoderStatus.OK) {
                    if (results[0]) {
                        var value = results[0].formatted_address.split(",");
                        var count = value.length;
                        var city = value[count - 3];
                        $scope.$apply(function () {
                            $scope.location = city;
                        });
                    }
                    else {
                        console.log("address not found");
                    }
                }
                else {
                    console.log("Geocoder failed due to: " + status);
                }
            }
        );
    }

    navigator.geolocation.getCurrentPosition(onCityPositionUpdate,
        function () {
            $scope.location = 'Pune';
        },
        {enableHighAccuracy: true, timeout: 5000, maximumAge: 600000});

    function setMapOnAllMarkers() {
        for (var i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }
    }

    function loadMap(cords) {
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 16,
            center: new google.maps.LatLng(cords.lat, cords.lon)
        });
    }

    $scope.onClick = function (url) {
        if (url === 'NA') {
            //no url
        } else {
            $window.open(url, '_blank');
        }
    };

    function onScrollTop(number) {
        $('.panel-container').animate({
            scrollTop: $('.panel-container .element-' + number).offset().top - 250
        }, 1000);
    }

    function addMarker(_marker) {
        var locator = new google.maps.Marker({
            position: _marker.position,
            map: map
        });

        var infowindow = new google.maps.InfoWindow({
            content: '<div>'+_marker.title+'</div><div>'+_marker.address+'</div>'
        });

        locator.addListener('mouseover', function () {
            infowindow.open(map, locator);

        });

        locator.addListener('mouseout', function () {
            infowindow.close();
        });

        //click on marker
        locator.addListener('click', function () {
            onScrollTop(_marker.number);
        });

        return locator;
    }

    //map
    function loadGoogleMarkers() {
        var locations = $scope.data;
        loadMap(locations[0].cords);
        var i;

        for (i = 0; i < locations.length; i++) {
            var cords = locations[i].cords;

            var _marker = new google.maps.Marker({
                number: i,
                position: new google.maps.LatLng(cords.lat, cords.lon),
                title: locations[i].name,
				address: locations[i].address,
                map: map,
                animation: google.maps.Animation.DROP
            });

            markers.push(addMarker(_marker));
        }
    }
});