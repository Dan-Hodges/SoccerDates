angular.module("materialExample", ["ngMaterial", "materialCalendar", "firebase"])
.constant('_', window._);

angular.module("materialExample").controller("calendarCtrl", function($scope, $firebaseObject, $firebaseArray, $filter) {

  $scope._ = _;

  if ($scope.calendar) {
    console.log($scope.calendar);
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
  }    
});