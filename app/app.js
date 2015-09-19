angular.module("materialExample", ["ngMaterial", "materialCalendar", "firebase"])
.constant('_', window._);

angular.module("materialExample").controller("calendarCtrl", function($scope, $firebaseObject, $filter) {

  $scope._ = _;
  var ref = new Firebase("https://soccerdates.firebaseio.com/");
  var fireCal = $firebaseObject(ref);

  $scope.ngObjFixHack = function(ngObj) {
    var output;
    output = angular.toJson(ngObj);
    output = angular.fromJson(output);
    return output;
  }  



  // function updateLocal() {
  //     var weekCounter = 0;
  //     var dayCounter = 0;
  //     for (key in $scope.calendar.weeks) {
  //       $scope.calendar.localCal[weekCounter] = $scope.calendar.weeks[key].slice();
  //       weekCounter ++;
  //       for (key2 in $scope.calendar.weeks[key]){
  //         $scope.calendar.localCal[key][key2] = {
  //           clicked: $scope.calendar.weeks[key][key2].clicked,
  //           id: $scope.calendar.weeks[key][key2].id,
  //           games: $scope.calendar.weeks[key][key2].games
  //         }
  //         dayCounter++;
  //       }
  //     }
  // }
  // if ($scope.calendar) {
    // $scope.localCal=localCal = $scope.ngObjFixHack($scope.calendar.weeks);
  //   console.log(localCal);
  // }
  
  // function updateFire () {
  //   var weekCounter = 0;
  //   var dayCounter = 0;
  //   for (key in $scope.calendar.localCal) {
  //     fireCal[weekCounter] = $scope.calendar.localCal[weekCounter];
  //     weekCounter ++;
  //     for (key2 in $scope.calendar.localCal[key]){
  //       fireCal[key][key2] = {
  //         id: $scope.calendar.localCal[key][key2].id,
  //         games: $scope.calendar.localCal[key][key2].games
  //       }
  //       if ($scope.calendar.weeks[key][key2].clicked) {
  //         fireCal[key][key2].clicked = $scope.calendar.weeks[key][key2].clicked;
  //         console.log("got it");
  //       }
  //       dayCounter++;
  //     }
  //   }
  //   console.log("fireCal :", fireCal);
  //   fireCal.$save().then(function(ref) {
  //     ref.key() === fireCal.$id; // true
  //   }, function(error) {
  //     console.log("Error:", error);
  //   });    
  // }

  // function bringTheFire () {
  //   fireCal.$loaded()
  //   .then(function() {
  //     for (key in $scope.calendar.weeks) {
  //       for (key2 in $scope.calendar.weeks[key]) {
  //         if($scope.calendar.weeks[key][key2].id) {
  //           var dateId = $scope.calendar.weeks[key][key2].id;
  //           for (key3 in fireCal) {
  //             for (key4 in fireCal[key3]) {              
  //               if (fireCal[key3][key4].id === dateId) {
  //                 if(fireCal[key3][key4].clicked){
  //                   $scope.calendar.weeks[key][key2].clicked = fireCal[key3][key4].clicked;
  //                 };
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
  $scope.onLoad = function() {
    // firstStep();
    // updateLocal();
    // bringTheFire();
  }

  if($scope.calendar) {
    $scope.onLoad();
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
  };
  // $scope.setDayContent = function() {
    
  //   return $scope.calendar;
  // };
});


















