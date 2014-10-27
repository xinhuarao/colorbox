angular.module('index',['ngAnimate', 'ngRoute', 'login', 'addApp', 'myApps'])

.config(['$routeProvider',
    function($routeProvider){
        $routeProvider
        .when('/login', {
            controller: 'loginCtrl',
            templateUrl: 'login.html'
        })
        .when('/register', {
            controller: 'registerCtrl',
            templateUrl: 'register.html'
        })
        .when('/add', {
            controller: 'addAppCtrl',
            templateUrl: 'add-app.html'
        })
        .when('/add-dialog', {
            controller: 'myAppsCtrl',
            templateUrl: 'dialog.html'
        })
        .when('/my-apps', {
            controller: 'myAppsCtrl',
            templateUrl: 'my-apps.html'
        });
    }
])

angular.bootstrap(document, ['index']);