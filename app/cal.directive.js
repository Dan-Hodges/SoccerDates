(function(){

	angular
		.module("materialCalendar")
		.directive("mdCalendar", mdCalendar);

		mdCalendar.$inject = ["$compile", "$parse", "$http", "$q", "$filter", "Calendar","$firebaseObject",'$rootScope'];

	function mdCalendar($compile, $parse, $http, $q, $filter, Calendar, $firebaseObject, $rootScope){

	  var hasCss;
	  var defaultTemplate = "Templates/angular-material-calendar.html";

	  var injectCss = function() {
	    if (! hasCss) {
	      var head = document.getElementsByTagName("head")[0];
	      var css = document.createElement("style");
	      css.type = "text/css";
	      css.id="mdCalendarCss";
	      css.innerHTML = "/* angular-material-calendar.css */";
	      head.insertBefore(css, head.firstChild);
	      hasCss = true;
	    }
	  };

	  return {
	    restrict: "E",
	    templateUrl: defaultTemplate,
	    scope: {
	      ngModel: "=?",
	      onDayClick: "=?",
	      onPrevMonth: "=?",
	      onNextMonth: "=?",
	      calendarDirection: "=?",
	      dayContent: "=?",
	      timezone: "=?",
	      titleFormat: "=?",
	      templateRef: "=?",
	      dayFormat: "=?",
	      dayLabelFormat: "=?",
	      dayLabelTooltipFormat: "=?",
	      dayTooltipFormat: "=?"
	    },

	    link: function ($scope, $element, $attrs, $ngModel) {

	      if ($attrs.hasOwnProperty("templateRef")) {
	        $scope.templateUrl = $attrs.templateRef;
	      } else {
	        $scope.templateUrl = defaultTemplate;
	      }

	      // $scope.template = defaultTemplate;
	      injectCss();
	      $scope.columnWeekLayout = "column";
	      $scope.weekLayout = "row";
	      $scope.timezone = $scope.timezone || null;
	      $scope.titleFormat = $scope.titleFormat || "MMMM yyyy";
	      $scope.dayLabelFormat = $scope.dayLabelFormat || "EEE";
	      $scope.dayLabelTooltipFormat = $scope.dayLabelTooltipFormat || "EEEE";
	      $scope.dayFormat = $scope.dayFormat || "d";
	      $scope.dayTooltipFormat = $scope.dayTooltipFormat || "fullDate";
	      $scope.getDayContent = $scope.dayContent || function() {};

	      $scope.sameMonth = function(date) {
	        var d = $filter("dateToGmt")(date);
	        return d.getFullYear() === $scope.calendar.year &&
	          d.getMonth() === $scope.calendar.month;
	      };

	      $scope.calendarDirection = $scope.calendarDirection || "horizontal";

	      $scope.$watch("calendarDirection", function(val) {
	        $scope.weekLayout = val === "horizontal" ? "row" : "column";
	      });

	      var month = parseInt($element.data("month") || (new Date().getMonth() + 1));
	      var year = parseInt($element.data("year") || (new Date().getFullYear()));

	      $scope.calendar = new Calendar(year, month);

        $scope.downFromFire = function() {
          if ($scope.templateUrl === defaultTemplate) {
            var ref = new Firebase("https://soccerdates.firebaseio.com");
            $scope.FB = $firebaseObject(ref);
            $scope.FB.$loaded()
              .then(function() {
                for (key in $scope.calendar.weeks[$scope.calendar.month]) {
                  for (key2 in $scope.calendar.weeks[$scope.calendar.month][key]) {
                    var dateId = $scope.calendar.weeks[$scope.calendar.month][key][key2].jsonId;
                    var index = $scope.calendar.month;
                    for (i in $scope.FB[index]){   
                      if (JSON.stringify($scope.FB[index][i].date) === dateId) {
                        if ($scope.FB[$scope.calendar.month][i].info) {
                          $scope.calendar.weeks[$scope.calendar.month][key][key2].info = angular.copy($scope.FB[$scope.calendar.month][i].info);
                        }
                      } else {
                      }
                    }
                  }
                } 
              })
              .catch(function(err) {
                console.error(console.log($scope.calendar));
              });
          }
        };
        $scope.downFromFire();

	      $scope.weeksToDates = function (){
	        for (key in $scope.calendar.weeks[$scope.calendar.month]) {
	          for (key2 in $scope.calendar.weeks[$scope.calendar.month][key]) {
	            var date = $scope.calendar.weeks[$scope.calendar.month][key][key2].date;
	            for (var i in $scope.calendar.dates[$scope.calendar.month]){          
	              if ($scope.calendar.dates[$scope.calendar.month][i].date === date) {
	                // console.log("if has come");
	                $scope.calendar.dates[$scope.calendar.month][i].info = angular.copy($scope.calendar.weeks[$scope.calendar.month][key][key2].info);
	                $scope.calendar.weeks[$scope.calendar.month][key][key2].short = $scope.calendar.dates[$scope.calendar.month][i].short;
	              }  
	            }
	          }
	        } 
	      };

	      $scope.datesUpToFire = function () {
	        if ($scope.templateUrl === defaultTemplate) {
	          var happy = $scope.calendar.dates[$scope.calendar.month];
	          var number = $scope.calendar.month;
	          var ref = new Firebase("https://soccerdates.firebaseio.com/" + number);
	          ref.update(number=happy);
	        }  
	      };

	      function sync () {
	        for (key in $scope.calendar.weeks[$scope.calendar.month]) {
	          for (key2 in $scope.calendar.fireCal[$scope.calendar.month][key]) {
	            var dateId = $scope.calendar.fireCal[$scope.calendar.month][key][key2].jsonId;
	            for (key3 in $scope.calendar.weeks[$scope.calendar.month]){
	              for (key4 in $scope.calendar.weeks[$scope.calendar.month][key3]){
	                if ($scope.calendar.weeks[$scope.calendar.month][key3][key4].jsonId === dateId) {
	                  $scope.calendar.fireCal[$scope.calendar.month][key][key2].info = $scope.calendar.weeks[$scope.calendar.month][key3][key4].info;
	                }
	              }
	            }
	          }
	        } 
	      };

	      var handleCb =  function(cb, data) {
	        if("function" === typeof cb) {
	            cb(data || null);
	        }
	      };

	      $scope.prev = function () {
	        $scope.calendar.prev();
	        $scope.downFromFire();
	        var data = {
	          year: $scope.calendar,
	          month: $scope.calendar.month + 1
	        };
	        handleCb($scope.onPrevMonth, data);
	      };

	      $scope.next = function () {
	        $scope.calendar.next();
	        $scope.downFromFire();
	        var data = {
	          year: $scope.calendar.year,
	          month: $scope.calendar.month + 2
	        };
	        handleCb($scope.onNextMonth, data);
	      };


	      $rootScope.update = function () {
	        $scope.weeksToDates();
	        $scope.datesUpToFire();
	        $scope.downFromFire();
	      }

	      $scope.handleDayClick = function (date) {
	        $scope.active = date;
	        if ($scope.templateUrl === defaultTemplate) {
	          $scope.weeksToDates();
	          $scope.datesUpToFire();
	          $scope.downFromFire();

	          if ($attrs.ngModel) {
	            $parse($attrs.ngModel).assign($scope.$parent, date);
	          }
	          handleCb($scope.onDayClick, date);
	        }
	      };

	      var setTemplate = function(contents) {
	        $element.html(contents);
	        $compile($element.contents())($scope);
	      };

	      var init = function() {
	        var deferred = $q.defer();

	        if ($scope.templateUrl) {
	          $http
	            .get($scope.templateUrl)
	            .success(function(html, status, fn, xhr) {
	              deferred.resolve(html);
	            })
	            .error(deferred.reject);
	        } else if ($scope.template()) {
	          deferred.resolve($scope.template());
	        } else {
	          deferred.resolve(defaultTemplate);
	        }
	        return deferred.promise;
	      };
	      init().then(setTemplate);
	    } // end link
	  }; // end MdCalendar's return
	}; //end mdCalendar
})();