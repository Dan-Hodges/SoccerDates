app.controller("calendarCtrl", function($scope, $firebaseObject, $firebaseArray, $filter, $mdDialog, $timeout, $mdSidenav, $log, $mdUtil) {

  $scope._ = _;

  if ($scope.calendar) {
    console.log($scope.calendar);
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
  // $scope.toggleRight();


  $scope.showAdvanced = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: './Templates/dialog1.tmpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true
    })
    .then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
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