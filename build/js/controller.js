/*var searchItem = '';
var app = angular.module("businessApp", []);
app.controller("myCtrl", function ($q, $http, $scope, $compile, $filter) {

    $scope.responseData = [];
    $scope.onMenuClick = function (event) {
        searchItem = event.target.id;
    };
    var location = 'california';
    $http({
        method: 'GET',
        url: '/search?location=' + location + '&term=' + searchItem + ''
    }).then(function successCallback(response) {
        var requestData = response.data.businesses;
        for (var i = 0; i < requestData.length; i++) {
            $scope.responseData.push(
                {
                    name: requestData[i].name, address: requestData[i].location.display_address,
                    ratingImage: requestData[i].rating_img_url, image: requestData[i].image_url
                }
            )
        }
    }, function errorCallback(response) {
        console.log('search data error', response);
    });

    $scope.$watch('search', function (val) {
        $scope.personalData = $filter('filter')($scope.responseData, val);
    });
});*/




var app = angular.module("businessApp", []);
app.controller('myCtrl', function($scope, $http) {
    $scope.data = [];
    $http.post('/getdata', {query:"food", location:"new york"}).then(function (resp) {
        if (resp.data instanceof Array && resp.data.length > 0) {
            console.log(resp.data);
            var respData = resp.data;
            console.log("respData-",respData);
            for(var i = 0; i <= 25;i++){
                $scope.data.push({
                        address:respData[i].address,
                        city:respData[i].city,
                        name:respData[i].name,
                        phone:respData[i].phone,
                        rating:respData[i].rating,
                        url:respData[i].url,
                        image:respData[i].photo
            });
            }
            console.log($scope.data);
            
        } else {
            console.log('No Results found');
        }
    }, function (error) {
        console.error(error);
    });
});