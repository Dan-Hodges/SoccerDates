app.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    var ref = new Firebase("https://soccerdates.firebaseio.com");
    return $firebaseAuth(ref);
  }
]);