(function(){
	'use strict';
	angular
	  .module("soccerDates")

	  .config(config);

	config.$inject = ['$routeProvider'];

	function config ($routeProvider){
    $routeProvider
    .when('/', {
      templateUrl: 'partials/login.html',
      controller: 'sideNavCtrl'
    })
    .when('/calendar', {
      templateUrl: 'partials/cal.html',
      controller: 'calendarCtrl',
      resolve: {
        // controller will not be loaded until $waitForAuth resolves
        // Auth refers to our $firebaseAuth wrapper in the example above
        "currentAuth": ["Auth", function(Auth) {
          // $waitForAuth returns a promise so the resolve waits for it to complete
          return Auth.$requireAuth();
        }]
      }
    })
    .otherwise({
      redirectTo: '/'
    });
	}
	
})();