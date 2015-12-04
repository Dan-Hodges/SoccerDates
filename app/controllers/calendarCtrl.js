(function() {
  'use strict';

  angular
    .module('soccerDates')
    .controller('calendarCtrl', calendarCtrl);

  calendarCtrl.$inject = ["$scope", "currentAuth", "$firebaseObject","$firebaseArray",
  "$filter","$mdDialog","$timeout","$mdSidenav","$log","$mdUtil", "$location", "$rootScope"];

  function calendarCtrl($scope,currentAuth, $firebaseObject,$firebaseArray,
  	$filter,$mdDialog,$timeout,$mdSidenav,$log,$mdUtil, $location, $rootScope){

	  $scope.uid = uid;
	  var uid = currentAuth.uid;
	  var ref = new Firebase("https://soccerdates.firebaseio.com/" + uid);
	  var currentUserObject = new $firebaseObject(ref);
	  $scope.unauth = function () {
	    var ref = new Firebase("https://soccerdates.firebaseio.com/");
	    ref.unauth();
	    $location.path("/");
	  }

	  $scope.currentuser;

	  currentUserObject.$loaded()
	    .then(function() {
	      if (currentUserObject.$value) {
	        $scope.currentuser = currentUserObject.$value;
	      } else {
	        $scope.currentuser = 'Setup Your Profile';
	      }
	    })
	    .catch(function(err) {
	      console.log('err :', err);
	    }
	  );
	  


	  var usersRef = new Firebase("https://soccerdates.firebaseio.com/users");
	  $scope.users = $firebaseArray(usersRef);
	  $scope.users.$loaded()
	    .then(function(){
	     // console.log($scope.users);
	    });
	  $scope.setUser = function () {
	    $scope.currentuser = $scope.club;
	    currentUserObject.$value = $scope.club;
	    $scope.users.$add({club: $scope.club, mascot: $scope.mascot});
	    currentUserObject.$save();
	  }

	  $scope.close = function () {
	    $mdSidenav('right').close()
	      .then(function () {
	        $log.debug("close RIGHT is done");
	      }
	    );
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
	  }

	  $scope.showAdvanced = function(ev) {
	    $scope.eventObj = ev;
	    $scope.alreadyPlaying = Object.getOwnPropertyNames(ev.info.games);
	    $scope.otherUsers = $scope.users.slice();


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
	        } else if (ev.info.games[$scope.currentuser].status === 'Invitation Sent') {
	          mdObj.templateUrl = './Templates/dialog3.tmpl.html';
	        } else if (ev.info.games[$scope.currentuser].status === 'Confirmed') {
	          mdObj.templateUrl = './Templates/dialog4.tmpl.html';          
	        } else {
	          mdObj.templateUrl = './Templates/dialog1.tmpl.html';
	        }
	      } else {
	        mdObj.templateUrl = './Templates/dialog1.tmpl.html';
	      }
	    } else {
	      mdObj.templateUrl = './Templates/dialog1.tmpl.html';
	    };

	    if (mdObj.templateUrl === './Templates/dialog1.tmpl.html') {
	      for (var i = 0; i < $scope.otherUsers.length; i++) {
	        if ($scope.otherUsers[i].club === $scope.currentuser) {
	          $scope.otherUsers.splice(i, 1);
	        } else {
	          for (var z = 0; z < $scope.alreadyPlaying.length; z++) {
	            if ($scope.otherUsers[i].club === $scope.alreadyPlaying[z]) {
	              $scope.otherUsers.splice(i, 1);
	            }
	          }
	        }
	      }
	    };

	    $mdDialog.show(mdObj)
	    .then(function(answer) {
	      $scope.status = 'You said the information was "' + answer + '".';
	    }, function() {
	      $scope.status = 'You cancelled the dialog.';
	    });
	    // brings in the date from the scope event argument
	    $scope.date = ev;
	  };

	  $scope.thumbDownReject = function (data) {
	    var opponent = data.info.games[$scope.currentuser][$scope.currentuser];
	    data.info.games[$scope.currentuser] = null;
	    data.info.games[opponent] = null;
	    $rootScope.update();
	  };

	  $scope.thumbUpAccept = function (data) {
	    var opponent = data.info.games[$scope.currentuser][$scope.currentuser];
	    data.info.games[$scope.currentuser].status = 'Confirmed';
	    data.info.games[opponent].status = 'Confirmed';
	    $rootScope.update();
	  };

	  $scope.set_color = function(day) {
	    if (day.info.games[$scope.currentuser]){
	      if (day.info.games[$scope.currentuser].status){
	        var status = day.info.games[$scope.currentuser].status;
	        if (status === 'Invitation Sent') {
	          return {background: "#FF80AB" };
	        } 
	        if (status === 'Waiting Confimation') {
	          return {background: "#F50057" };
	        }
	        if (status === 'Confirmed') {
	          return {background: "#C5CAE9" };
	        }
	      } else {return null};
	    } else {return null};
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

	    $scope.addGame = function (ev) {
	      var userVar = $scope.currentuser;
	      var opponentVar = $scope.otherUsers[$scope.otherUsers.length - 1];
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
	        location : inviteField,
	        status : 'Waiting Confimation'
	      }
	      $scope.date.info.games[opponentVar] = inviteObj;
	      $scope.date.info.games[userVar] = gameObj;
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
	  $scope.verticalDirection = false;
	  var directionCounter = 0;
	  $scope.setDirection = function() {
	    if (directionCounter % 2 === 0) {
	      $scope.direction = 'vertical';
	      $scope.verticalDirection = true;
	    } else {
	      $scope.direction = 'horizontal';
	      $scope.verticalDirection = false;
	    }
	    directionCounter += 1;
	  };

	  $scope.viewAll = false;
	  var viewAllCounter = 0;
	  $scope.setViewAll = function() {
	    console.log('setViewAll');
	    if (viewAllCounter % 2 === 0) {
	      $scope.viewAll = true;
	      console.log('$scope.viewAll = true');
	    } else {
	      $scope.viewAll = false;
	      console.log('$scope.viewAll = false');
	    }
	    viewAllCounter += 1;
	  };

	  $scope.selectedDate;

	  $scope.dayClick = function(date) {
	    if (date) {
	      console.log(date);
	      $scope.msg = "You clicked " + $filter("date")(date, "MMM d, y h:mm:ss a Z");
	      $scope.alreadyPlaying = Object.getOwnPropertyNames(date.info.games);
	      $scope.showAdvanced(date);
	    }
	  };
	  $scope.prevMonth = function(data) {
	    $scope.msg = "You clicked (prev) month " + data.month + ", " + data.year;
	  };
	  $scope.nextMonth = function(data) {
	    $scope.msg = "You clicked (next) month " + data.month + ", " + data.year;
	  }
  } //end of calendarCtrl

})();    