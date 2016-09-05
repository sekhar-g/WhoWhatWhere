app = angular.module('whoWhatWhere', ['ngRoute']);
app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
        when('/business', {
            templateUrl: 'views/businessInfo.html',
            controller: 'myCtrl'
        }).
        when('/food', {
            templateUrl: 'views/businessInfo.html',
            controller: 'myCtrl'
        }).
        when('/restaurant', {
            templateUrl: 'views/businessInfo.html',
            controller: 'myCtrl'
        }).
        when('/lifeStyle', {
            templateUrl: 'views/businessInfo.html',
            controller: 'myCtrl'
        }).
        when('/fun', {
            templateUrl: 'views/businessInfo.html',
            controller: 'myCtrl'
        }).
        otherwise({
            redirectTo: '/restaurant'
        });
    }]);