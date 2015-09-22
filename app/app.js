angular.module("materialExample", ["ngMaterial", "materialCalendar", "firebase"])
.constant('_', window._);

angular.module("materialExample").controller("calendarCtrl", function($scope, $firebaseObject, $filter) {

  $scope._ = _;



  if($scope.calendar) {

  }






  // FB.$bindTo($scope, "calendar.fireCal").then(function(unbind) {
  //   console.log()
  //   //unbind();
  // });





  $scope.onLoad = function() {
    // firstStep();
    // updateLocal();
    // bringTheFire();
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
  // $scope.prevMonth = function(data) {
  //   $scope.msg = "You clicked (prev) month " + data.month + ", " + data.year;
  //     if($scope.calendar) {
  //   FB[$scope.calendar.month] = $scope.calendar.fireCal;
  //   FB.$save().then(function(ref) {
  //     ref.key() === FB.$id; // true
  //   }, function(error) {
  //     console.log("Error:", error);
  //   });
  // }
  // };
  // $scope.nextMonth = function(data) {
  //   $scope.msg = "You clicked (next) month " + data.month + ", " + data.year;
  //   if ($scope.calendar) {
  //     if (data.month === 9) {    
  //       var ref = new Firebase("https://soccerdates.firebaseio.com/");
  //       var FB = $firebaseObject(ref);
  //       FB[9] = $scope.calendar.fireCal;
  //       FB.$save().then(function(ref) {
  //         ref.key() === FB.$id; // true
  //       }, function(error) {
  //         console.log("Error:", error);
  //       });
  //     }    
  //   }
  // };

});



  // $scope.setDayContent = function() {
    
  //   return $scope.calendar;
  // };


  //   fireCal.$save().then(function(ref) {
  //     ref.key() === fireCal.$id; // true
  //   }, function(error) {
  //     console.log("Error:", error);
  //   });    
  // }

  // function bringTheFire () {
  //   $scope.calendar.fireCal[$scope.calendar.month].$loaded()
  //   .then(function() {
  //     for (key in $scope.calendar.weeks[$scope.calendar.month] {
  //       for (key2 in $scope.calendar.weeks[$scope.calendar.month[key]) {
  //         if($scope.calendar.weeks[$scope.calendar.month[key][key2].date) {
  //           var dateId = $scope.calendar.weeks[$scope.calendar.month][key][key2].date;
  //           for (key3 in $scope.calendar.fireCal[$scope.calendar.month]) {
  //             for (key4 in $scope.calendar.fireCal[$scope.calendar.month][key3]) {              
  //               if ($scope.calendar.fireCal[$scope.calendar.month][key3][key4].date === dateId) {
  //                 $scope.calendar.weeks[$scope.calendar.month[key][key2].clicked = $scope.calendar.fireCal[$scope.calendar.month][key3][key4].clicked;
  //               }  
  //             }
  //           }
  //         }
  //       }
  //     }
  //   })
  // }

  // $scope.onUpdate = function() {  
  //   firstStep();   
  //   // updateLocal();
  //   // updateFire();
  // };













