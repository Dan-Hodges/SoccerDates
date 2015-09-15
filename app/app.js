angular.module("materialExample", ["ngMaterial", "materialCalendar"]);

angular.module("materialExample").controller("calendarCtrl", function($scope, $filter) {
  $scope.selectedDate = null;
  $scope.setDirection = function(direction) {
    $scope.direction = direction;
  };
  $scope.selectedDate;
  console.log("$scope", $scope);
  $scope.dayClick = function(date) {
    $scope.msg = "You clicked " + $filter("date")(date, "MMM d, y h:mm:ss a Z");
  };
  $scope.prevMonth = function(data) {
    $scope.msg = "You clicked (prev) month " + data.month + ", " + data.year;
  };
  $scope.nextMonth = function(data) {
    $scope.msg = "You clicked (next) month " + data.month + ", " + data.year;
  };
  $scope.setDayContent = function(date) {
    // var content = [{Game: "usj", Date: "August 7th", Field: "A"}, 6, 7];
    // return "<p>" + content + "</p>";
  };
});