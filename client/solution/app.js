angular.module('app', [        
    'app.appState',    
    'app.models',
    'app.httpRequest',        
    'ngResource',
    'ngRoute',    
    'ngMaterial',    
    'ngMessages',

])

.config(['$mdThemingProvider', '$mdIconProvider', '$httpProvider', '$routeProvider', '$locationProvider',
    function($mdThemingProvider, $mdIconProvider, $httpProvider, $routeProvider, $locationProvider) {   

       //built a simple color palette theme
       $mdThemingProvider.theme('default')
            .primaryPalette('teal')
            .accentPalette('purple')
            .warnPalette('red')            

        $mdThemingProvider.theme('secondary')
            .primaryPalette('blue-grey')
            .accentPalette('amber')
            .warnPalette('red')
     
	
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];     
 
    //simple app, it contains just one route
    $routeProvider.
        when('/home', {templateUrl: 'views/home.tpl.html', controller: 'frontEndCtrl'}).
        otherwise({redirectTo: '/home'});
}])
.run(function($http, AppState, $rootScope, session) {
        AppState.authentication = {};
        AppState.authentication.key = "d621db0b9ac5a998921cfcbabdec22c9";
        AppState.authentication.secret = "10e69e702a76fe21c6d0b4886a1c56ff0ef29211b88d29d2";
        AppState.authentication.token = "";

        AppState.RadioShows = [];
})
