angular.module("materialExample", ["ngMaterial", "materialCalendar", "firebase"])
.constant('_', window._);

angular.module("materialExample").controller("calendarCtrl", function($scope, $firebaseObject, $filter) {

  $scope._ = _;
  var ref = new Firebase("https://soccerdates.firebaseio.com/");; // assume value here is { foo: "bar" }
  var fireCal = $firebaseObject(ref);
  // $scope.calendar.weeksObj = {};
  var allDemWeeks = {};

  if ($scope.calendar) {
    var weekCounter = 0;
    var dayCounter = 0;
    for (key in $scope.calendar.weeks) {
      allDemWeeks[weekCounter] = $scope.calendar.weeks[key].slice();
      weekCounter ++;
      // console.log($scope.calendar.weeks[key]);
      for (key2 in $scope.calendar.weeks[key]){
        allDemWeeks[key][key2] = {
          date: $scope.calendar.weeks[key][key2]
        } 
        console.log($scope.calendar.weeks[key][key2]);
        dayCounter++;
      }
    }
    console.log("allDemWeeks :", allDemWeeks);
    $scope.calendar.allDemWeeks = allDemWeeks;
  }
  
  $scope.selectedDate = null;
  $scope.setDirection = function(direction) {
    $scope.direction = direction;
  };
  // $scope.setDirection("verticle");
  $scope.selectedDate;
  $scope.dayClick = function(date) {
    $scope.msg = "You clicked " + $filter("date")(date, "MMM d, y h:mm:ss a Z");
  };
  $scope.prevMonth = function(data) {
    $scope.msg = "You clicked (prev) month " + data.month + ", " + data.year;
  };
  $scope.nextMonth = function(data) {
    $scope.msg = "You clicked (next) month " + data.month + ", " + data.year;
  };
  // $scope.setDayContent = function() {
    
  //   return $scope.calendar;
  // };

});