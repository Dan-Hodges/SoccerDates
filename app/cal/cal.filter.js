(function(){

	angular
		.module("materialCalendar")
		.filter("dateToGmt", dateToGmt);

	function dateToGmt(){
		return function(date) {
	    date = date || new Date();
	    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
		};
	}
})();