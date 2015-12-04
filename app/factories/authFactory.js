(function(){
	angular
	  .module("soccerDates")

	  .factory("Auth", Auth);

	  //Auth.$inject["$firebaseAuth"];
	
	function Auth($firebaseAuth){
    var ref = new Firebase("https://soccerdates.firebaseio.com");
    return $firebaseAuth(ref);		
	}

})();