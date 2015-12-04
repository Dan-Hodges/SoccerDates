(function(){
	'use strict'

	angular
		.module('soccerDates')

		.run(run);

		run.$inject = ["$rootScope", "$location"];
		
		function run($rootScope, $location){
		  $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
		    // We can catch the error thrown when the $requireAuth promise is rejected
		    // and redirect the user back to the home page
		    if (error === "AUTH_REQUIRED") {
		      $location.path("/");
		    }
		  });
		}
})();