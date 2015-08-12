'use strict';
zopkyFrontendApp.controller('loginController', ['$scope', '$http','UtilsFactory', '$localStorage', '$window',
    function($scope, $http,UtilsFactory, $localStorage, $window) {

        //$scope.$storage = $localStorage;

// if($cookieStore.get('zopkyAuth') !=null){
if($localStorage.token != null){
         //$window.alert($localStorage.token);
                    $("#user").hide();
                    $("#pass").hide();
                    $("#button").hide();
                    $("#loggedIn").show();
                    $window.location.href = '#/navtab';

}else{
$scope.responseError= 'NO Connection';
$scope.loginController = {};
    $scope.login = function() {
    	var loginDetails = {login_id:$scope.loginController.username, passwd:$scope.loginController.password};
    	//console.log(loginDetails);
    	var responsePromise = UtilsFactory.doPostCall ('/employee/login', loginDetails);
    	responsePromise.then (function (response){

        		//console.log (response['response']);
                var data = response.data['response'];
                //console.log(data);
        		if (response.status==200) {
        			var authToken = data['token'];
                    var loginId = data['login_id'];

                    $localStorage.token = authToken;
                    $localStorage.loginId = loginId;
                    $("#user").hide();
                    $("#pass").hide();
                    $("#button").hide();
                    $("#loggedIn").show();
        			
                    $window.location.href = '#/navtab';
        		}

    	}, function(error){
           // console.log(error);
                var message = error.data.response.message;
                console.log(message);
                $window.alert(message);
        });
    };
}
}]);