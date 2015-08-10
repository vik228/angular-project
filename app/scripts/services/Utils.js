zopkyFrontendApp.factory ('UtilsFactory',['$http', '$q',function ($http, $q){
	
	var utilsFactoryObj = {};

	utilsFactoryObj.doPostCall = function (path, jsonData) {

		var defered = $q.defer();

		var dataPromise = $http({
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			url:baseUrl+path,
			method:'POST',
			data:$.param({'data':jsonData})
		});
		dataPromise.success(function (data){
			defered.resolve(data);
			

		});
		dataPromise.error(function (rejection) {
			console.log(rejection);
            defered.resolve(rejection);
        });
		return dataPromise;

	}

	utilsFactoryObj.doGetCall = function (path) {

		var defered = $q.defer();

		var dataPromise = $http({
			headers: {'Content-Type': 'application/x-www-form-urlencoded'},
			url:baseUrl+path,
			method:'GET'
		});
		dataPromise.success(function (data){
			defered.resolve(data);
			

		});
		dataPromise.error(function (rejection) {
			console.log(rejection);
            defered.resolve(rejection);
        });
		return dataPromise;

	}
	return utilsFactoryObj;
}]);