app.controller("calendarCtrl",function(
$scope,currentAuth, $firebaseObject,$firebaseArray,$filter,$mdDialog,$timeout,$mdSidenav,$log,$mdUtil) {



  $scope.uid = uid;
  var uid = currentAuth.uid;
  var ref = new Firebase("https://soccerdates.firebaseio.com/" + uid);
  var currentUserObject = new $firebaseObject(ref);
  $scope.currentuser;
  currentUserObject.$loaded()
    .then(function() {
      console.log("currentUserObject :", currentUserObject);
      if (currentUserObject.$value) {
        $scope.currentuser = currentUserObject.$value;
      } else {
        $scope.currentuser = 'Setup Your Profile';
      }
      console.log($scope.currentuser);
    })
    .catch(function(err) {
      console.error(err);
    });
    console.log("$scope.currentuser :", $scope.currentuser);
    console.log("uid :", uid);

  if($scope.calendar) {
    $scope.calendar.currentUser = $scope.currentUser;
    console.log($scope.calendar);
  }  



  
  var usersRef = new Firebase("https://soccerdates.firebaseio.com/users");
  $scope.users = $firebaseArray(usersRef);
  $scope.users.$loaded()
    .then(function(){
      console.log("$scope.users :", $scope.users);
    });
  $scope.setUser = function () {
    console.log("setUsername");
    $scope.currentuser = $scope.club;
    currentUserObject.$value = $scope.club;
    $scope.users.$add({club: $scope.club, mascot: $scope.mascot});
    currentUserObject.$save();
  }

  $scope.close = function () {
    $mdSidenav('right').close()
      .then(function () {
        $log.debug("close RIGHT is done");
      });
  }

  // $scope.toggleRight = buildToggler('right');
  $scope.toggleRight = buildToggler('right');
  function buildToggler(navID) {
    var debounceFn =  $mdUtil.debounce(function(){
      $mdSidenav(navID)
        .toggle()
        .then(function () {
          $log.debug("toggle " + navID + " is done");
        });
      },200);
    return debounceFn;
  }
  // $scope.toggleRight();


  $scope.showAdvanced = function(ev, date) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: './Templates/dialog1.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      scope: $scope.$new()
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
    $scope.date = ev;
    console.log("$scope.date :", $scope.date);
  };
  function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };
    $scope.cancel = function() {
      $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
    $scope.yo = function() {
      console.log("yo");
    }
  }

  var d = new Date().getHours(); // get the hour in 24 hour format
  var a = d > 11 ? "pm" : "am"; /// get AM or PM
  var hour = ((d + 11) % 12 + 1); // Convert 24 hours to 12 
  $scope.hoursList = (hour + ':00 ' + a); // Set the dropdowns selected value
  console.log("$scope.hoursList :", $scope.hoursList);



  $scope.selectedDate = null;
  $scope.setDirection = function(direction) {
    $scope.direction = direction;
  };
  // $scope.setDirection("verticle");
  $scope.selectedDate;

  $scope.dayClick = function(date) {
    $scope.msg = "You clicked " + $filter("date")(date, "MMM d, y h:mm:ss a Z");
    $scope.showAdvanced(date);
    // date.info = 'yes man';
  };
  $scope.prevMonth = function(data) {
    $scope.msg = "You clicked (prev) month " + data.month + ", " + data.year;
  };
  $scope.nextMonth = function(data) {
    $scope.msg = "You clicked (next) month " + data.month + ", " + data.year;
  }    
});