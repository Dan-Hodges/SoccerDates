app.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    var ref = new Firebase("https://soccerdates.firebaseio.com");
    alert("To view demo this app, login with TCA@TCA.com, pass");
    return $firebaseAuth(ref);
  }
]);