zopkyFrontendApp.factory('UtilsFactory', ['$http', '$q', '$localStorage', '$window',
  function ($http, $q, $localStorage, $window) {

    var utilsFactoryObj = {};

    utilsFactoryObj.doPostCall = function (path, jsonData) {

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
      dataPromise.success(function (data) {
        //if (data.response.responseCode == 401) {
        //	delete $localStorage.token;
        //	console.log(data.response.message);
        //	$window.location.href = '#/';
        //	return;
        //} else {
        defered.resolve(data);
        //}

      });
      dataPromise.error(function (rejection) {
        console.log(rejection);
        defered.resolve(rejection);
        if (rejection.response.responseCode == 401) {
          delete $localStorage.token;
          console.log(rejection.response.message);
          //$window.location.href = '#/';
        } else {
          defered.resolve(rejection);
        }
      });
      return dataPromise;
    }

    utilsFactoryObj.doGetCall = function (path) {

      var defered = $q.defer();
      var dataPromise = $http({
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        url: baseUrl + path + "&token=" + $localStorage.token,
        method: 'GET'
      });
      dataPromise.success(function (data) {
        //if (data.response.responseCode == 401) {
        //	delete $localStorage.token;
        //	console.log(data.response.message);
        //	$window.location.href = '#/';
        //	return;
        //} else {
        defered.resolve(data);
        //}

      });
      dataPromise.error(function (rejection) {
        // console.log(rejection.response.message);
        if (rejection.response.message == "Session Expired.operation not permitted") {
          delete $localStorage.token;
          console.log(rejection.response.message);
          //$window.location.href = '#/';
          return;
        } else {
          defered.resolve(rejection);
        }
      });
      return dataPromise;

    }
    return utilsFactoryObj;
  }
]);
