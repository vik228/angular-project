zopkyFrontendApp.factory('UtilsFactory', ['$http', '$q', '$localStorage', '$window',
	function($http, $q, $localStorage, $window) {

		var utilsFactoryObj = {};

		utilsFactoryObj.doPostCall = function(path, jsonData) {

			var defered = $q.defer();
			var dataPromise = $http({
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				url: baseUrl + path,
				method: 'POST',
				data: $.param({
					'data': jsonData,
					'token': $localStorage.token
				})
			});
			dataPromise.success(function(data) {
				if (data.response.responseCode == 401) {
					delete $localStorage.token;
					console.log(data.response.message);
					$window.location.href = '#/';
					return;
				} else {
					console.log(data.response.token);
					$localStorage.token = data.response.token;
					defered.resolve(data);
				}

			});
			dataPromise.error(function(rejection) {
				console.log(rejection);
				defered.resolve(rejection);
				if (rejection.response.message == "Session Expired.operation not permitted") {
					delete $localStorage.token;
					console.log(rejection.response.message);
					//$window.location.href = '#/';
				} else {
					defered.resolve(rejection);
				}
			});
			return dataPromise;
		}

		utilsFactoryObj.doGetCall = function(path) {

			var defered = $q.defer();
			var dataPromise = $http({
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				url: baseUrl + path + "&token=" + $localStorage.token,
				method: 'GET'
			});
			dataPromise.success(function(data) {
				if (data.response.responseCode == 401) {
					delete $localStorage.token;
					console.log(data.response.message);
					$window.location.href = '#/';
					return;
				} else {
					defered.resolve(data);
				}

			});
			dataPromise.error(function(rejection) {
				// console.log(rejection.response.message);
				if (rejection.response.message == "Session Expired.operation not permitted") {
					delete $localStorage.token;
					console.log(rejection.response.message);
					$window.location.href = '#/';
					return;
				} else {
					defered.resolve(rejection);
				}
			});
			return dataPromise;
			s

		}

		// utilsFactoryObj.getAllCities = function(limit, skip, numRows){
		// 	  var cities = [];
		// 	  var defered = $q.defer();

		// 	    var getUrl = "/city/get/?limit="+limit+"&skip="+skip;
		// 	    var responsePromise = utilsFactoryObj.doGetCall (getUrl);
		// 	      responsePromise.then (function (response){              
		// 	            if (response.status==200) {
		// 	              var data = response.data.response.message;

		// 	              for(var i=0; i<data.length; i++){
		// 	                numRows++;
		// 	                var row = {};
		// 	                row['sequence']=numRows;
		// 	                row['stateId']=data[i].stateId;
		// 	                row['state']=data[i].state;
		// 	                row['id']=data[i].id;
		// 	                row['status']=data[i].status;
		// 	                row['city']=data[i].name;
		// 	                cities.push(row);
		// 	              }

		// 	              if(data.length==0){
		// 	                $window.alert("No more continents available")
		// 	              }
		// 	              console.log(cities);
		// 	              return cities;
		// 	              //$scope.cities = $scope.cities.concat(cities);
		// 	            }

		// 	      }, function(error){
		// 	                var message = error.data.response.message.name[0].message;
		// 	                console.log(message);
		// 	               // window.alert(message);
		//        });

		// 	}
		return utilsFactoryObj;
	}
]);