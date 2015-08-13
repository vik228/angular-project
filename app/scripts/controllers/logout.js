'use strict';
zopkyFrontendApp.controller('logoutController', ['$scope', '$http','UtilsFactory', '$localStorage', '$window',
    function($scope, $http,UtilsFactory, $localStorage, $window) {
    		// console.log("inside logout");
    	 var getUrl = "/employee/logout";
		    var responsePromise = UtilsFactory.doGetCall (getUrl);
		      responsePromise.then (function (response){              
		            if (response.status==200) {
		              console.log("inside logout");
		              delete $localStorage.token;
		              $window.location.href = '#/';
		            }

		      }, function(error){
		      			console.log("inside logout");
		               delete $localStorage.token;
		              $window.location.href = '#/';
		      }

    )}]);