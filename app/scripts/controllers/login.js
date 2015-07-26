'use strict';
zopkyFrontendApp.controller('loginController', ['$scope', '$http','UtilsFactory',function($scope, $http,UtilsFactory) {

$scope.responseError= 'NO Connection';
$scope.loginController = {};
    $scope.login = function() {
    	var loginDetails = {login_id:$scope.loginController.username, passwd:$scope.loginController.password};
    	console.log(loginDetails);
    	var responsePromise = UtilsFactory.doPostCall ('/user/login', loginDetails);
    	responsePromise.then (function (response){

    		console.log (response);
    		if (response['responseCode']==200) {
    			var authToken = response['auth_token'];
    			//save in cookie
    			//post login process
    		}else{
    			//show login error
    			var message = response['message'];
    			console.log(message);
    		}

    	});
    };
}]);