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

    	});
    };
}]);