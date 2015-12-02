if ($scope.calendar){
  function downFromFire () {
  var ref = new Firebase("https://soccerdates.firebaseio.com");
  $scope.FB = $firebaseObject(ref);
  $scope.FB.$loaded()
    .then(function() {
      console.log($scope.FB);
      for (key in $scope.calendar.weeks[$scope.calendar.month]) {
        for (key2 in $scope.calendar.weeks[$scope.calendar.month][key]) {
          var date = $scope.calendar.weeks[$scope.calendar.month][key][key2].jsonId;
          console.log(date);
          for (var i = 0; i < $scope.FB[$scope.calendar.month].length; i++){            
            if ($scope.FB[$scope.calendar.month].date === date) {
              $scope.calendar.weeks[$scope.calendar.month][key][key2].info = angular.copy(FB[$scope.calendar.month][i].info);
            }
          }
        }
      } 
    })
    .catch(function(err) {
      console.error(err);
    });
  }
  downFromFire();
  console.log("downFromFire()");
  console.log($scope.calendar);
}


if ($scope.calendar) {
  function weeksToDates{
    for (key in $scope.calendar.weeks[$scope.calendar.month]) {
      for (key2 in $scope.calendar.weeks[$scope.calendar.month][key]) {
        var date = $scope.calendar.weeks[$scope.calendar.month][key][key2].date;
        console.log(date);
        for (var i in $scope.calendar.dates[$scope.calendar.month]){            
          if ($scope.calendar.dates[$scope.calendar.month][i] === date) {
            $scope.calendar.dates[$scope.calendar.month][i].info = angular.copy($scope.calendar.weeks[$scope.calendar.month][key][key2].info);
          }
        }
      }
    } 
  }
  weeksToDates();
}

if ($scope.calendar) {
  function datesUpToFire {
    var ref = new Firebase("https://soccerdates.firebaseio.com");
    var FbObj = $firebaseFbObject(ref);
    FbObj.[$scope.calendar.month] = $scope.calendar.date[$scope.calendar.month];
    FbObj.$save().then(function(ref) {
      ref.key() === FbObj.$id;
    }, function(error) {
      console.log("Error:", error);
    });
  }
}


var app = angular.module("sampleApp", ["firebase"]);

app.controller("SampleCtrl", function($scope, $firebaseArray) {
  var ref = new Firebase("https://<YOUR-FIREBASE-APP>.firebaseio.com/messages");

  // create a synchronized array
  $scope.messages = $firebaseArray(ref);

  // add new items to the array
  // the message is automatically added to our Firebase database!
  $scope.addMessage = function() {
    $scope.messages.$add({
      text: $scope.newMessageText
    });
  };

  // click on `index.html` above to see $remove() and $save() in action
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
  // var ref = new Firebase("https://soccerdates.firebaseio.com");
  // $scope.FB = $firebaseObject(ref);
  // // this waits for the FB to load and then logs the output. Therefore,
  // // FB from the server will now appear in the logged output. Use this with care!
  // if ($scope.calendar) {
  //   $scope.FB.$loaded()
  //     .then(function() {
  //     console.log($scope.FB);
  //       function fromFire () {
  //         for (var i = 0; i < $scope.FB[$scope.calendar.month].length; i++) { //Sept Array in Firebase
  //           for (var z = 0; z < $scope.FB[$scope.calendar.month][i].length; z++) { 
  //             var date = $scope.FB[$scope.calendar.month][i][z].date;
  //             console.log("date of FB :", date);
  //             for (key in $scope.calendar.weeks[$scope.calendar.month]){
  //               for (key2 in $scope.calendar.weeks[$scope.calendar.month][key]) {
  //                 console.log("date of weeks :", $scope.calendar.weeks[$scope.calendar.month][key][key2].jsonId);
  //                 if ($scope.calendar.weeks[$scope.calendar.month][key][key2].jsonId = date && ($scope.FB[$scope.calendar.month][i][z].info)) {
  //                   $scope.calendar.weeks[$scope.calendar.month][key][key2].info = angular.copy($scope.FB[$scope.calendar.month][i][z].info);
  //                   console.log("copied");
  //                 }
  //               }
  //             }
  //           }  
  //         } 
  //       }
  //       console.log("fromFire()");
  //       fromFire();
  //       console.log($scope.calendar);
  //     })
  //     .catch(function(err) {
  //       console.error(err);
  //     });
  // }





  // if ($scope.calendar){
  //   function sync () {
  //     for (key in $scope.calendar.weeks[$scope.calendar.month]) {
  //       for (key2 in $scope.calendar.weeks[$scope.calendar.month][key]) {
  //         var date = $scope.calendar.weeks[$scope.calendar.month][key][key2].date;
  //         console.log(date);
  //         for (var i in $scope.calendar.dates[$scope.calendar.month]){            
  //           if ($scope.calendar.dates[$scope.calendar.month][i] === date) {
  //             $scope.calendar.dates[$scope.calendar.month][i].info = angular.copy($scope.calendar.weeks[$scope.calendar.month][key][key2].info);
  //           }
  //         }
  //       }
  //     } 
  //   }
  //   sync();
  //   console.log("sync()");
  //   console.log($scope.calendar);
  // }
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


  // $scope.setDayContent = function(date) {
  // // var ref = new Firebase("https://soccerdates.firebaseio.com");
  // // FB = $firebaseObject(ref);
  // // var id = date.jsonId;
  //   // console.log('date :',  date);
  //   // FB.$loaded()
  //   //   .then(function() {   
  //   //     for (key in FB[month]) {
  //   //     // console.log('FB :', FB[month][key]);    
  //   //       for (key2 in FB[month][key]) {
  //   //         if(FB[month][key][key2].date === date.jsonId) {
  //   //           // content = FB[$scope.calendar.month][key][key2].content;
  //   //           console.log("great successs");
  //   //         }
  //   //       }
  //   //     };
  //     // });
  //   // console.log(date);
  //   var word = "hello";
  //   return word ;
  // };
