app.controller("calendarCtrl",function(
$scope,currentAuth, $firebaseObject,$firebaseArray,$filter,$mdDialog,$timeout,$mdSidenav,$log,$mdUtil, $location, $rootScope) {

  $scope.uid = uid;
  var uid = currentAuth.uid;
  var ref = new Firebase("https://soccerdates.firebaseio.com/" + uid);
  var currentUserObject = new $firebaseObject(ref);
  $scope.unauth = function () {
    console.log("click");
    var ref = new Firebase("https://soccerdates.firebaseio.com/");
    ref.unauth();
    $location.path("/");
  }
  $scope.currentuser;
  currentUserObject.$loaded()
    .then(function() {
      console.log('currentUserObject.$value :', currentUserObject.$value);
      if (currentUserObject.$value) {
        $scope.currentuser = currentUserObject.$value;
        console.log('$scope.currentuser :', $scope.currentuser);
      } else {
        $scope.currentuser = 'Setup Your Profile';
      }
    })
    .catch(function(err) {
      console.error(err);
    });
  
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

  $scope.dayClickDialog = function(event) {
    console.log("dayClickDialog");
  }

  $scope.showAdvanced = function(ev) {
    $scope.eventObj = ev;
    console.log('$scope.eventObj :', $scope.eventObj);
    $scope.otherUsers = $scope.users.slice();

    for (var i = 0; i < $scope.otherUsers.length; i++) {
      if ($scope.otherUsers[i].club === $scope.currentuser) {
        console.log("match");
        console.log('i :', i);
        $scope.otherUsers.splice(i, 1);
      }
    }
    console.log("$scope.currentuser :", $scope.currentuser);
    console.log("$scope.users :", $scope.users);
    console.log("$scope.otherUsers :", $scope.otherUsers);

    var mdObj = {
      controller: DialogController,
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      scope: $scope.$new()
    }

    if (ev.info.games[$scope.currentuser]) {
      if (ev.info.games[$scope.currentuser].status) {
        if (ev.info.games[$scope.currentuser].status === 'Waiting Confimation') {
          mdObj.templateUrl = './Templates/dialog2.tmpl.html';
        } if (ev.info.games[$scope.currentuser].status === 'Invitation Sent') {
          mdObj.templateUrl = './Templates/dialog3.tmpl.html';
        } else {
          mdObj.templateUrl = './Templates/dialog1.tmpl.html';
        }
      } else {
        mdObj.templateUrl = './Templates/dialog1.tmpl.html';
      }
    } else {
      mdObj.templateUrl = './Templates/dialog1.tmpl.html';
    }

    $mdDialog.show(mdObj)
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
    // brings in the date from the scope event argument
    $scope.date = ev;
    console.log("ev :", ev);
  };

  console.log("scope.dates :", $scope.dates);
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
    $scope.addGame = function (ev) {
      console.log("click ");
      var userVar = $scope.currentuser;
      var opponentVar = $scope.otherUsers[$scope.otherUsers.length - 1];
      console.log("opponentVar :", opponentVar);
      console.log("$scope.otherUsers :", $scope.otherUsers);
      var timeVar = $scope.timesArray[$scope.timesArray.length -1];
      var locationVar = $scope.fields[$scope.fields.length -1];
      var inviteField;
      if (locationVar === 'Home') {
        inviteField = 'Away';
      } else {
        inviteField = 'Home';
      }
      var gameObj = {
        [userVar]: opponentVar,
        time: timeVar,
        location : locationVar,
        status : 'Invitation Sent'
      };
      var inviteObj = {
        [opponentVar]: userVar,
        time: timeVar,
        location : locationVar,
        status : 'Waiting Confimation'
      }
      console.log("ev :", ev);
      console.log("inviteObj :", inviteObj);
      $scope.date.info.games[opponentVar] = inviteObj;
      $scope.date.info.games[userVar] = gameObj;
      console.log("inviteObj :", inviteObj);
      console.log("gameObj :", gameObj);
      console.log('$scope.date.info.games[userVar] :', $scope.date.info.games[userVar]);
      console.log('$scope.date.info.invites[opponentVar] :', $scope.date.info.invites[opponentVar]);
      $rootScope.update();
    }
  }

  var time = [], i, j;
  for(i=7; i<23; i++) {
    if (i > 12) {
      var z = i -12;
    } else {
      var z = i;
    }
    for(j=0; j<=45; j+=15) {
      var medium;
      if (i < 13) {
        medium = " AM";
      } else {
        medium = " PM";
      }
      if (j == 0) {
        time.push({time :(z + ':00' + medium)});
      } else {
        time.push({time: (z + ':' + j + medium)});
      }
    }
  }

  time.pop();
  $scope.timesArray = time;
  $scope.fields = [{field: "Home"}, {field: "Away"}];

  function AppCtrl ($scope) {
    $scope.data = {
      selectedIndex: 0,
      secondLocked:  true,
      secondLabel:   "Item Two",
      bottom:        false
    };
    $scope.next = function() {
      $scope.data.selectedIndex = Math.min($scope.data.selectedIndex + 1, 2) ;
    };
    $scope.previous = function() {
      $scope.data.selectedIndex = Math.max($scope.data.selectedIndex - 1, 0);
    };
  }  

  $scope.selectedDate = null;
  $scope.setDirection = function(direction) {
    $scope.direction = direction;
  };
  // $scope.setDirection("verticle");
  $scope.selectedDate;

  $scope.dayClick = function(date) {
    if (date) {
      $scope.msg = "You clicked " + $filter("date")(date, "MMM d, y h:mm:ss a Z");
      $scope.showAdvanced(date);
    }
  };
  $scope.prevMonth = function(data) {
    $scope.msg = "You clicked (prev) month " + data.month + ", " + data.year;
  };
  $scope.nextMonth = function(data) {
    $scope.msg = "You clicked (next) month " + data.month + ", " + data.year;
  }    
});