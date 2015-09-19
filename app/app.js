angular.module("materialExample", ["ngMaterial", "materialCalendar", "firebase"])
.constant('_', window._);

angular.module("materialExample").controller("calendarCtrl", function($scope, $firebaseObject, $filter) {

  $scope._ = _;
  var ref = new Firebase("https://soccerdates.firebaseio.com/"); // assume value here is { foo: "bar" }
  var fireCal = $firebaseObject(ref);
  // console.log("fireCal :", fireCal);  
  if ($scope.calendar) {
    console.log("$scope.calendar :", $scope.calendar);
    $scope.calendar.localCal = {};
  }

  //removes $$hashkey from objects to make them json/firebase friendly
  $scope.ngObjFixHack = function(ngObj) {
    var output;
    output = angular.toJson(ngObj);
    output = angular.fromJson(output);
    return output;
  }  

  ///$scope.calendar is the object created by Matertial Calendar///
  ///I am modifying it into something I can work with (add games, etc...)///
  var allWeeks = {};
  var months = [];
  if ($scope.calendar) {
    var weekCounter = 0;
    var dayCounter = 0;
    ///looping over weeks array-ish objects///
    for (key in $scope.calendar.weeks) {
      // console.log("$scope.calendar.localCal first:", $scope.calendar.localCal);
      allWeeks[weekCounter] = $scope.calendar.weeks[key].slice();
      // console.log('$scope.calendar.weeks in beforehack :', $scope.calendar.weeks);
      weekCounter ++;
      ///looping over days array-ish objects///
      for (key2 in $scope.calendar.weeks[key]){
        allWeeks[key][key2] = {
          ///creating a JSON friendly key value pair I can use to sync firebase data-object -->
          /// with local $scope.calendar.weeks/allweeks object///
          id: angular.toJson($scope.calendar.weeks[key][key2]),
          date: $scope.calendar.weeks[key][key2],
          games: {first:""}
        }
        dayCounter++;
      }
    }
    console.log($scope.calendar.month);
    $scope.calendar.weeks = allWeeks;
    // console.log("allWeeks :", allWeeks);
    // console.log("$scope.calendar.weeks after allweeks :", $scope.calendar.weeks);
  }

  function updateLocal() {
    if ($scope.calendar) {
      var weekCounter = 0;
      var dayCounter = 0;
      ///looping over weeks array-ish objects///
      for (key in $scope.calendar.weeks) {
        // console.log('$scope.calendar.weeks in updateLocal :', $scope.calendar.weeks);
        $scope.calendar.localCal[weekCounter] = $scope.calendar.weeks[key].slice();
        weekCounter ++;
        ///looping over days array-ish objects///
        for (key2 in $scope.calendar.weeks[key]){
          $scope.calendar.localCal[key][key2] = {
            clicked: $scope.calendar.weeks[key][key2].clicked,
            id: $scope.calendar.weeks[key][key2].id,
            games: $scope.calendar.weeks[key][key2].games
          }
          dayCounter++;
        }
      }
      $scope.calendar.localCal = $scope.ngObjFixHack($scope.calendar.localCal);
    }
  }
  
  function updateFire () {
    var weekCounter = 0;
    var dayCounter = 0;
    ///looping over weeks array-ish objects///
    for (key in $scope.calendar.localCal) {
      fireCal[weekCounter] = $scope.calendar.localCal[weekCounter];
      weekCounter ++;
      ///looping over days array-ish objects///
      for (key2 in $scope.calendar.localCal[key]){
        fireCal[key][key2] = {
          id: $scope.calendar.localCal[key][key2].id,
          games: $scope.calendar.localCal[key][key2].games
        }
        if ($scope.calendar.weeks[key][key2].clicked) {
          fireCal[key][key2].clicked = $scope.calendar.weeks[key][key2].clicked;
          console.log("got it");
        }
        dayCounter++;
      }
    }
    console.log("fireCal :", fireCal);
    // var myObject = _.merge($scope.calendar.weeks, fireCal);
    // console.log("myObject :", myObject);
    fireCal.$save().then(function(ref) {
      ref.key() === fireCal.$id; // true
    }, function(error) {
      console.log("Error:", error);
    });    
  }

  //next step is to dynamically merge fireCal with $scope.calendar.weeks

  function bringTheFire () {
    fireCal.$loaded()
    .then(function() {
      console.log($scope.calendar.weeks);
      console.log(fireCal);
      for (key in $scope.calendar.weeks) {
        for (key2 in $scope.calendar.weeks[key]) {
          // console.log("for check");
          if($scope.calendar.weeks[key][key2].id) {
            // console.log("if check");
            var dateId = $scope.calendar.weeks[key][key2].id;
            // console.log(dateId);
            for (key3 in fireCal) {
              for (key4 in fireCal[key3]) {              
                if (fireCal[key3][key4].id === dateId) {
                  if(fireCal[key3][key4].clicked){
                    $scope.calendar.weeks[key][key2].clicked = fireCal[key3][key4].clicked;
                    console.log($scope.calendar.weeks[key][key2]);
                  };
                }
              }
            }
          }
        }
      }
    })
  }


  $scope.onUpdate = function() {
    updateLocal();
    updateFire();
  };
  $scope.onLoad = function() {
    updateLocal();
    bringTheFire();
  }

  if($scope.calendar) {
    $scope.onLoad();
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