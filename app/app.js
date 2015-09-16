angular.module("materialExample", ["ngMaterial", "materialCalendar", "firebase"]);

angular.module("materialExample").controller("calendarCtrl", function($scope, $firebaseObject, $filter) {
  var ref = new Firebase("https://soccerdates.firebaseio.com/");
  $scope.data = $firebaseObject(ref);

$scope.data.$loaded()
  .then(function() {
    $scope.games = $scope.data.TCA.schedule;
    console.log("TCA Games :", $scope.games);
  })
  .catch(function(err) {
    console.error(err);
  });


  $scope.selectedDate = null;
  $scope.setDirection = function(direction) {
    $scope.direction = direction;
  };
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
  $scope.setDayContent = function() {
    
    return ;
  };

  console.log("$scope.calendar in app :", $scope.calendar);
});