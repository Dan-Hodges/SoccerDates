(function(){
	angular
		.module("materialCalendar")
		.service("Calendar", Calendar);
		Calendar.$inject = ['$filter'];

	function Calendar($filter){
		// console.log($filter);
		function cal(year, month){
	    var self = this;
	    var now = $filter("dateToGmt")();
	    this.year = now.getFullYear();
	    this.month = now.getMonth();
	    // this.dates = [];
	    this.getNumDays = function () {
	      return $filter("dateToGmt")(new Date(
	        this.start.getYear(),
	        this.start.getMonth() + 1,
	        0
	      )).getDate();
	    };
	    this.firstDayOfWeek = ("Sunday" +1);
	    this.getFirstDayOfCalendar = function () {
	      var date = this.start;
	      var first = new Date(date.getFullYear(), date.getMonth(), 1);
	      first.setDate(first.getDate() - first.getDay() + (this.firstDayOfWeek === "Sunday" ? 0 : 1));
	      return first;
	    };
	    this.next = function () {
	      this.init(this.year, this.month + 2);
	    };
	    this.prev = function () {
	      this.init(this.year, this.month);
	    };
	    function _isFirstDayOfWeek(date) {
	      return ! date.getDay();
	    };
	    this.init = function (year, month) {
	      if (year && month) {
	        this.year = year;
	        // this.month = month - 1;
	        this.month = month;
	      } else if(year && ! month) {
	        this.year = year - 1;
	        this.month = 11;
	      }
	      // Set up the new date.
	      function ngObjFixHack(ngObj) {
	        var output;
	        output = angular.toJson(ngObj);
	        output = angular.fromJson(output);
	        return output;
	      }     
	      this.start = $filter("dateToGmt")(new Date(this.year, this.month, 1, 0, 0));
	      this.dates = [[],[],[],[],[],[],[],[],[],[],[],[]];
	      this.weeks = [];
	      this.year = this.start.getFullYear();
	      this.month = this.start.getMonth();
	      var currentMonth = this.month;
	      this.myArray = [];
	      this.weeks = {[currentMonth]: this.myArray};
	      // this.fireCal = ngObjFixHack(this.weeks);
	      // this.fireCal = {};
	      var first = this.getFirstDayOfCalendar();
	      var _i = first.getDate() == 1 && this.getNumDays() == 28 ? 28 : 35;

	      for (var i = 0; i < _i; i++) {
	        var date = $filter("dateToGmt")(new Date(first.valueOf() + (i * 86400000)));
	        var simpleDate = date.toString();
	        simpleDate = simpleDate.slice(0,15);
	        // Sunday? Let's start a new week.
	        // @todo If timezone changes, this goes haywire.
	        if (i % 7 === 0) {
	          this.myArray.push([]);
	        }
	        this.dates[currentMonth].push({date: date, info: '', short: simpleDate});
	        this.myArray[this.myArray.length - 1].push({date :date, jsonId:angular.toJson(date), info: {games : {}}});
	        // this.myArray[this.myArray.length - 1].push({date :date, info: {games : {}}});
	      }
	      // this.fireCal = {[currentMonth]: ngObjFixHack(this.weeks[currentMonth])};
	      return this.dates;
	    };
	    this.init(year, month);
		} // end of cal function
		return cal;
	} //end of Calendar function
})();