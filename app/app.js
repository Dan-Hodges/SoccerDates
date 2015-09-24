var app = angular.module("soccerDates", ["ngRoute", "ngMaterial", "materialCalendar", "firebase"]);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/login.html',
        controller: 'loginCtrl'
      })
      .when('/calendar', {
        templateUrl: 'partials/cal.html',
        controller: 'calendarCtrl'
      })
      // .when('/profile', {
      //   templateUrl: 'partials/profile.html',
      //   controller: 'ProfileCtrl'
      // })
      // .when('/chooseskill', {
      //   templateUrl: 'partials/chooseskill.html',
      //   controller: 'ChooseSkillCtrl'
      // })
      // .when('/culinaryrepo', {
      //   templateUrl: 'partials/culinaryrepo.html',
      //   controller: 'CulinaryRepoCtrl'
      // })
      .otherwise({
        redirectTo: '/'
      });
  }
]);