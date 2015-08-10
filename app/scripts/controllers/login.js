'use strict';
zopkyFrontendApp.controller('loginController', ['$scope', '$http','UtilsFactory', '$cookieStore',function($scope, $http,UtilsFactory, $cookieStore) {

// if($cookieStore.get('zopkyAuth') !=null){
//                     $("#user").hide();
//                     $("#pass").hide();
//                     $("#button").hide();
//                     $("#loggedIn").show();
// }else{
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
                    //console.log(authToken);
        			//save in cookie

                    $cookieStore.put('zopkyAuth',data);
                    $("#user").hide();
                    $("#pass").hide();
                    $("#button").hide();
                    $("#loggedIn").show();
        			//post login process
        		}

    	}, function(error){
           // console.log(error);
                var message = error.data.response.message;
                console.log(message);
                window.alert(message);
        });
    };
// }
}]);