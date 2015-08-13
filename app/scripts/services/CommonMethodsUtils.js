'use strict';
zopkyFrontendApp.factory('CommonMethods', ['$http', '$localStorage', '$window', 'UtilsFactory',
  function($http, $localStorage, $window, UtilsFactory) {

    var commonMethodsObj = {};

    commonMethodsObj.getAllCities = function(limit, skip, numRows, type, callback) {
      var cities = [];
      var getUrl = "/city/get/?limit=" + limit + "&skip=" + skip;
      var responsePromise = UtilsFactory.doGetCall(getUrl);
      responsePromise.then(function(response) {
        if (response.status == 200) {
          var data = response.data.response.message;

          for (var i = 0; i < data.length; i++) {
            numRows++;
            var row = {};
            row['sequence'] = numRows;
            row['stateId'] = data[i].stateId;
            row['state'] = data[i].state;
            row['id'] = data[i].id;
            row['status'] = data[i].status;
            row['city'] = data[i].name;
            cities.push(row);
          }

          if (data.length == 0) {
            $window.alert("No more " + type + " available")
          }
          console.log(cities);
          // $scope.cities=$scope.cities.concat(cities);
          return (callback(cities));

          //$scope.cities = $scope.cities.concat(cities);
        }

      }, function(error) {
        var message = error.data.response.message.name[0].message;
        console.log(message);
        // window.alert(message);
      });
    }

    commonMethodsObj.getAllActiveStates = function(numStates, type, callback) {
      var states = [];
      var getUrl = "/state/get/?limit=100&skip=0&active=true";
      var responsePromise = UtilsFactory.doGetCall(getUrl);
      responsePromise.then(function(response) {

        if (response.status == 200) {
          var data = response.data.response.message;

          for (var i = 0; i < data.length; i++) {
            numStates++;
            var row = {};
            row['sequence'] = numStates;
            row['id'] = data[i].id;
            row['state'] = data[i].name;
            states.push(row);
          }
          console.log(states);
          // $scope.states = $scope.states.concat(states);
          return (callback(states));
        }

      }, function(error) {
        var message = error.data.response.message.name[0].message;
        console.log(message);
        // window.alert(message);
      });

    }

    commonMethodsObj.getAllStates = function(limit, skip, numRows, type, callback) {
      var states = [];
      var getUrl = "/state/get/?limit=" + limit + "&skip=" + skip;
      var responsePromise = UtilsFactory.doGetCall(getUrl);
      responsePromise.then(function(response) {
        if (response.status == 200) {
          var data = response.data.response.message;

          for (var i = 0; i < data.length; i++) {
            numRows++;
            var row = {};
            row['sequence'] = numRows;
            row['countryId'] = data[i].countryId;
            row['country'] = data[i].country;
            row['id'] = data[i].id;
            row['status'] = data[i].status;
            row['state'] = data[i].name;
            states.push(row);

          }

          if (data.length == 0) {
            window.alert("No more " + type + " available")
          }
          console.log(states);
          // $scope.states = $scope.states.concat(states);
          return (callback(states));
        }

      }, function(error) {
        var message = error.data.response.message.name[0].message;
        console.log(message);
        // window.alert(message);
      });

    }

    commonMethodsObj.getActiveCountries = function(numCountries, type, callback) {
      var countries = [];
      var getUrl = "/country/get/?limit=100&skip=0&active=true";
      var responsePromise = UtilsFactory.doGetCall(getUrl);
      responsePromise.then(function(response) {

        if (response.status == 200) {
          var data = response.data.response.message;

          for (var i = 0; i < data.length; i++) {
            numCountries++;
            var row = {};
            row['sequence'] = numCountries;
            row['id'] = data[i].id;
            row['country'] = data[i].name;
            countries.push(row);
          }
          console.log(countries);
          // $scope.countries = $scope.countries.concat(countries);
          return (callback(countries));
        }

      }, function(error) {
        var message = error.data.response.message.name[0].message;
        console.log(message);
        // window.alert(message);
      });

    }

    commonMethodsObj.getAllCountries = function(limit, skip, numRows, type, callback) {
      var countries = [];
      var getUrl = "/country/get/?limit=" + limit + "&skip=" + skip;
      var responsePromise = UtilsFactory.doGetCall(getUrl);
      responsePromise.then(function(response) {
        if (response.status == 200) {
          var data = response.data.response.message;

          for (var i = 0; i < data.length; i++) {
            numRows++;
            var row = {};
            row['sequence'] = numRows;
            row['continentId'] = data[i].continentId;
            row['continent'] = data[i].continent;
            row['id'] = data[i].id;
            row['status'] = data[i].status;
            row['country'] = data[i].name;
            countries.push(row);
          }

          if (data.length == 0) {
            window.alert("No more " + type + " available")
          }
          console.log(countries);
          // $scope.countries = $scope.countries.concat(countries);
          return (callback(countries));
        }

      }, function(error) {
        var message = error.data.response.message.name[0].message;
        console.log(message);
        // window.alert(message);
      });

    }

    commonMethodsObj.getActiveContinents = function(numContinents, type, callback) {
      var continents = [];
      var getUrl = "/continent/get/?limit=100&skip=0&active=true";
      var responsePromise = UtilsFactory.doGetCall(getUrl);
      responsePromise.then(function(response) {

        if (response.status == 200) {
          var data = response.data.response.message;

          for (var i = 0; i < data.length; i++) {
            numContinents++;
            var row = {};
            row['sequence'] = numContinents;
            row['continent'] = data[i].continent;
            row['id'] = data[i].id;
            row['status'] = data[i].status;
            continents.push(row);
          }

          if (data.length == 0) {
            window.alert("No more continents available")
          }
          console.log(continents);
          // $scope.continents = $scope.continents.concat(continents);
          return (callback(continents));
        }

      }, function(error) {
        var message = error.data.response.message.name[0].message;
        console.log(message);
        // window.alert(message);
      });

    }

    commonMethodsObj.getAllContinents = function(limit, skip, numRows, type, callback) {
      var continents = [];
      var getUrl = "/continent/get/?limit=" + limit + "&skip=" + skip;
      var responsePromise = UtilsFactory.doGetCall(getUrl);
      responsePromise.then(function(response) {

        if (response.status == 200) {
          var data = response.data.response.message;

          for (var i = 0; i < data.length; i++) {
            numRows++;
            var row = {};
            row['sequence'] = numRows;
            row['continent'] = data[i].continent;
            row['id'] = data[i].id;
            row['status'] = data[i].status;
            continents.push(row);
          }

          if (data.length == 0) {
            window.alert("No more continents available")
          }
          console.log(continents);
          // $scope.continents = $scope.continents.concat(continents);
          return (callback(continents));
        }

      }, function(error) {
        var message = error.data.response.message.name[0].message;
        console.log(message);
        // window.alert(message);
      });

    }

    commonMethodsObj.getActivitiesByCriteria = function(limit, page, numRows, criteria, callback) {
      var activities = [];
      var getUrl = "/activity/searchbycriteria/?limit=" + limit + "&page=" + page + "&criteria=" + criteria;
      var responsePromise = UtilsFactory.doGetCall(getUrl);
      responsePromise.then(function(response) {

        if (response.status == 200) {
          //TODO:modify this according to api response
          var data = response.data.response.message;

          for (var i = 0; i < data.length; i++) {
            numRows++;
            var row = {};
            row['sequence'] = numRows;
            row['name'] = data[i].name;
            row['city'] = data[i].city;
            row['cityId'] = data[i].cityId;
            row['type'] = data[i].type;
            row['lat'] = data[i].lat;
            row['lon'] = data[i].lon;
            row['openTime'] = data[i].openTime;
            row['closeTime'] = data[i].closeTime;
            row['duration'] = data[i].duration;
            row['status'] = data[i].active;
            activities.push(row);
          }

          if (data.length == 0) {
            window.alert("No more activities available")
          }
          console.log(activities);
          return (callback(activities));
        }

      }, function(error) {
        var message = error.data.response.message.name[0].message;
        console.log(message);
      });

    }

    return commonMethodsObj;
  }
]);