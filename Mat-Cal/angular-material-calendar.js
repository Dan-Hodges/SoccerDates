angular.module("materialCalendar", ["ngMaterial", "ngSanitize"])
.filter("dateToGmt", function() {
  return function(date) {
    date = date || new Date();
    return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  };
})
.service("Calendar", ["$filter", function ($filter) { function Calendar(year, month) {
    var self = this;
    var now = $filter("dateToGmt")();
    this.year = now.getFullYear();
    this.month = now.getMonth();
    // this.dates = [];
    this.getNumDays = function () {
      return $filter("dateToGmt")(new Date(
        this.start.getYear(),
        this.start.getMonth() + 1,
        0
      )).getDate();
    };
    this.firstDayOfWeek = ("Sunday" +1);
    this.getFirstDayOfCalendar = function () {
      var date = this.start;
      var first = new Date(date.getFullYear(), date.getMonth(), 1);
      first.setDate(first.getDate() - first.getDay() + (this.firstDayOfWeek === "Sunday" ? 0 : 1));
      return first;
    };
    this.next = function () {
      this.init(this.year, this.month + 2);
    };
    this.prev = function () {
      this.init(this.year, this.month);
    };
    function _isFirstDayOfWeek(date) {
      return ! date.getDay();
    };
    this.init = function (year, month) {
      if (year && month) {
        this.year = year;
        // this.month = month - 1;
        this.month = month;
      } else if(year && ! month) {
        this.year = year - 1;
        this.month = 11;
      }
      // Set up the new date.
      function ngObjFixHack(ngObj) {
        var output;
        output = angular.toJson(ngObj);
        output = angular.fromJson(output);
        return output;
      }     
      this.start = $filter("dateToGmt")(new Date(this.year, this.month, 1, 0, 0));
      this.dates = [[],[],[],[],[],[],[],[],[],[],[],[]];
      this.weeks = [];
      this.year = this.start.getFullYear();
      this.month = this.start.getMonth();
      var currentMonth = this.month;
      this.myArray = [];
      this.weeks = {[currentMonth]: this.myArray};
      // this.fireCal = ngObjFixHack(this.weeks);
      // this.fireCal = {};
      var first = this.getFirstDayOfCalendar();
      var _i = first.getDate() == 1 && this.getNumDays() == 28 ? 28 : 35;

      for (var i = 0; i < _i; i++) {
        var date = $filter("dateToGmt")(new Date(first.valueOf() + (i * 86400000)));
        // Sunday? Let's start a new week.
        // @todo If timezone changes, this goes haywire.
        if (i % 7 === 0) {
          this.myArray.push([]);
        }
        this.dates[currentMonth].push({date: date, info: ''});
        this.myArray[this.myArray.length - 1].push({date :date, jsonId:angular.toJson(date), info: {games : {}}});
        // this.myArray[this.myArray.length - 1].push({date :date, info: {games : {}}});
      }
      // this.fireCal = {[currentMonth]: ngObjFixHack(this.weeks[currentMonth])};
      return this.dates;
    };
    this.init(year, month);
  }
  return Calendar;
}])
.directive("mdCalendar", ["$compile", "$parse", "$http", "$q", "$filter", "Calendar","$firebaseObject", function ($compile, $parse, $http, $q, $filter, Calendar, $firebaseObject) {
  
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
                // console.log($scope.FB);
                for (key in $scope.calendar.weeks[$scope.calendar.month]) {
                  for (key2 in $scope.calendar.weeks[$scope.calendar.month][key]) {
                    var dateId = $scope.calendar.weeks[$scope.calendar.month][key][key2].jsonId;
                    // console.log("json date :", dateId);
                    var index = $scope.calendar.month;
                    for (i in $scope.FB[index]){   
                      // console.log("$scope.FB[index][i].date :", JSON.stringify($scope.FB[index][i].date));         
                      if (JSON.stringify($scope.FB[index][i].date) === dateId) {
                        if ($scope.FB[$scope.calendar.month][i].info) {
                          $scope.calendar.weeks[$scope.calendar.month][key][key2].info = angular.copy($scope.FB[$scope.calendar.month][i].info);
                        }
                        // console.log("$scope.FB[$scope.calendar.month][i].info :", $scope.FB[$scope.calendar.month][i].info)
                        // console.log("match");
                      } else {
                        // console.log("no match from fire");
                      }
                    }
                  }
                } 
              })
              .catch(function(err) {
                console.error(err);
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
                console.log("if has come");
                $scope.calendar.dates[$scope.calendar.month][i].info = angular.copy($scope.calendar.weeks[$scope.calendar.month][key][key2].info);
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
      }

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
        console.log("$scope.calendar :", $scope.calendar);
        $scope.downFromFire();
        var data = {
          year: $scope.calendar.year,
          month: $scope.calendar.month + 2
        };
        handleCb($scope.onNextMonth, data);
      };

      $scope.handleDayClick = function (date) {
        $scope.active = date;
        if ($scope.templateUrl === defaultTemplate) {
          console.log("$scope.template === defaultTemplate")
          $scope.weeksToDates();
          $scope.datesUpToFire();
          $scope.downFromFire();

          if ($attrs.ngModel) {
            $parse($attrs.ngModel).assign($scope.$parent, date);
          }
          handleCb($scope.onDayClick, date);
          // sync();
          console.log('$scope.calendar :', $scope.calendar);
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
    }
  };
}]);