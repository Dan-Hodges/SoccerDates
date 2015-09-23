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
    // setTimeout(function(){
    //   $scope.weeksToDates();
    // }(),3000);
    // setTimeout(function(){
    //   $scope.datesUpToFire();
    // }(),3000);
  };

  $scope.nextMonth = function(data) {
    $scope.msg = "You clicked (next) month " + data.month + ", " + data.year;
    // var timoutId =;
    // function delayedCode() {
    //   timoutId = window.setTimeout(runCode, 2000);
    // }
    // function runCode () {
    //   weeksToDates();
    //   datesUpToFire();
    // }
  }    
});
  // function downFromFire () {
  //   var ref = new Firebase("https://soccerdates.firebaseio.com");
  //   $scope.FB = $firebaseObject(ref);
  //   $scope.FB.$loaded()
  //   .then(function() {
  //     console.log("downFromFire");
  //     for (key in $scope.calendar.weeks[$scope.calendar.month]) {
  //       for (key2 in $scope.calendar.weeks[$scope.calendar.month][key]) {
  //         var date = $scope.calendar.weeks[$scope.calendar.month][key][key2].jsonId;
  //         // console.log($scope.calendar.month);
  //         var index = $scope.calendar.month;
  //         for (i in $scope.FB[index]){            
  //           if ($scope.FB[$scope.calendar.month][i] === date) {
  //             $scope.calendar.weeks[$scope.calendar.month][key][key2].info = angular.copy($scope.FB[$scope.calendar.month][i].info);
  //             console.log("$scope.FB[$scope.calendar.month][i].info :", $scope.FB[$scope.calendar.month][i].info)
  //             console.log("match");
  //           }
  //         }
  //       }
  //     } 
  //   })
  //   .catch(function(err) {
  //     console.error(err);
  //   });
  // };
  // if ($scope.calendar) {
  //   downFromFire();
  // }

  // function weeksToDates (){
  //   for (key in $scope.calendar.weeks[$scope.calendar.month]) {
  //     for (key2 in $scope.calendar.weeks[$scope.calendar.month][key]) {
  //       var date = $scope.calendar.weeks[$scope.calendar.month][key][key2].jsonId;
  //       console.log(date);
  //       for (var i in $scope.calendar.dates[$scope.calendar.month]){            
  //         if ($scope.calendar.dates[$scope.calendar.month][i] === date) {
  //           $scope.calendar.weeks[$scope.calendar.month][key][key2].info = angular.copy($scope.calendar.dates[$scope.calendar.month][i].info);
  //         }
  //       }
  //     }
  //   } 
  // };

  // function datesUpToFire () {
  //   console.log("$scope.calendar.date[$scope.calendar.month] :", $scope.calendar.dates[$scope.calendar.month]);
  //   var happy = $scope.calendar.dates[$scope.calendar.month];
  //   var number = $scope.calendar.month;
  //   var ref = new Firebase("https://soccerdates.firebaseio.com/" + number);
  //   ref.update(number=happy);
  //   console.log("happy :", happy);
  //   console.log("number :", number);
  // };