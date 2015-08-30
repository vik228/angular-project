'use strict';
zopkyFrontendApp.factory('CommonMethods', ['$http', '$localStorage', '$window', 'UtilsFactory',
  function($http, $localStorage, $window, UtilsFactory) {

    var commonMethodsObj = {};

    commonMethodsObj.searchCities = function(limit, page, criteria, numRows, type, callback)  {
      var cities = [];
      var getUrl = "/city/search?limit=" + limit + "&page=" + page+"&"+criteria;
      var responsePromise = UtilsFactory.doGetCall(getUrl);
      responsePromise.then(function(response) {

        if (response.status == 200) {
          var data = response.data.response.message;

          for (var i = 0; i < data.length; i++) {
            numRows++;
            var row = {};
            row['sequence'] = numRows;
            row['id'] = data[i].id;
            row['city'] = data[i].name;
            row['state'] = data[i].country;
            cities.push(row);
          }
          console.log(cities);
          // $scope.states = $scope.states.concat(states);
          return (callback(cities));
        }

      }, function(error) {
        var message = error.data.response.message.name[0].message;
        console.log(message);
        // window.alert(message);
      });

    }

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

    commonMethodsObj.searchStates = function(limit, page, criteria, numRows, type, callback)  {
      var states = [];
      var getUrl = "/state/search?limit=" + limit + "&page=" + page+"&"+criteria;
      var responsePromise = UtilsFactory.doGetCall(getUrl);
      responsePromise.then(function(response) {

        if (response.status == 200) {
          var data = response.data.response.message;

          for (var i = 0; i < data.length; i++) {
            numRows++;
            var row = {};
            row['sequence'] = numRows;
            row['id'] = data[i].id;
            row['state'] = data[i].name;
            row['country'] = data[i].country;
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

    commonMethodsObj.searchCountries = function(limit, page, criteria, numRows, type, callback)  {
      var countries = [];
      var getUrl = "/country/search/?limit=" + limit + "&page=" + page+"&"+criteria;
      var responsePromise = UtilsFactory.doGetCall(getUrl);
      responsePromise.then(function(response) {

        if (response.status == 200) {
          var data = response.data.response.message;

          for (var i = 0; i < data.length; i++) {
            numRows++;
            var row = {};
            row['sequence'] = numRows;
            row['id'] = data[i].id;
            row['country'] = data[i].name;
            row['continent']=data[i].continent;
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

    commonMethodsObj.searchContinents = function(limit, page, criteria,numRows, type, callback)  {
      var continents = [];
      var getUrl = "/continent/search/?limit=" + limit + "&page=" + page+"&"+criteria;
      var responsePromise = UtilsFactory.doGetCall(getUrl);
      responsePromise.then(function(response) {

        if (response.status == 200) {
          var data = response.data.response.message;
          console.log(data);
          for (var i = 0; i < data.length; i++) {
            numRows++;
            var row = {};
            row['sequence'] = numRows;
            row['continent'] = data[i].name;
            row['id'] = data[i].id;
            continents.push(row);
          }

          if (data.length == 0) {
            window.alert("No more continents available")
          }

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

    commonMethodsObj.searchActivities = function(limit, page, criteria, numRows, callback) {
      var activities = [];
      var getUrl = "/activity/search?limit=" + limit + "&page=" + page+"&"+criteria;
      var responsePromise = UtilsFactory.doGetCall(getUrl);
      responsePromise.then(function(response) {

        if (response.status == 200) {
          var data = response.data.response.message;

          for (var i = 0; i < data.length; i++) {
            numRows++;
            var row = {};
            row['sequence'] = numRows;
            row['id']=data[i].id;
            row['name'] = data[i].name;
            row['cityId'] = data[i].city;
            row['theme'] = data[i].category.name;
            row['lat'] = data[i].location.lat;
            row['lon'] = data[i].location.long;
            row['openTime'] = data[i].openTime;
            row['closeTime'] = data[i].closeTime;
            row['duration'] = data[i].duration;
            row['status'] = data[i].active;
            row['price']=data[i].price.price;
            row['currency']=data[i].price.currency;
            row['taRating']=data[i].tar;
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

    commonMethodsObj.getActiveRecordeByCriteria = function(url, limit, page, criteria, numRows, callback) {
      var records = [];
      var getUrl = url + "?limit=" + limit + "&page=" + page + "&criteria=" + criteria;
      var responsePromise = UtilsFactory.doGetCall(getUrl);
      responsePromise.then(function(response) {
        if (response.status == 200) {
          var data = response.data.response.message;
          for (var i = 0; i < data.length; i++) {
            numRows++;
            var row = {};
            row['sequence'] = numRows;
            row['name'] = data[i].name;
            row['id'] = data[i].id;
            records.push(row);
          }
          if (data.length == 0) {
            window.alert("No more data available")
          }
          console.log(records);
          return (callback(records));
        }
      }, function(error) {
        var message = error.data.response.message.name[0].message;
        console.log(message);
      });
    }

    commonMethodsObj.getGoogleLocation = function(address, callback) {
      var records = [];
      var getUrl = "/location/get/?loc_string=" + address;
      var responsePromise = UtilsFactory.doGetCall(getUrl);
      responsePromise.then(function(response) {
        if (response.status == 200) {
          var data = response.data.response.message;

          if (data.length == 0) {
            window.alert("Can't fetch google location")
          }
          console.log(data);
          return (callback(data));
        }
      }, function(error) {
        var message = error.data.response.message.name[0].message;
        console.log(message);
      });
    }

    commonMethodsObj.getAllFlickrImages = function(limit, page, tag, latitude, longitude, callback) {
      var records = [];

      var url = '/flicker/getphotos?limit='+limit+'&page='+page+'&tags='+tag+'&latitude='+latitude+'&longitude='+longitude;
      var responsePromise = UtilsFactory.doGetCall(url);
      responsePromise.then(function(response) {
        if (response.status == 200) {
          var data = response.data.response.message;

          console.log(data);
          return (callback(data));
        }
      }, function(error) {
        var message = error.data.response.message.name[0].message;
        console.log(message);
      });
    }

    commonMethodsObj.getTALocations = function(address, latitude, longitude, callback) {
      var records = [];

      var url = '/tripadvisor/location_mapper?q='+address+'&lat='+latitude+'&lon='+longitude;
      var responsePromise = UtilsFactory.doGetCall(url);
      responsePromise.then(function(response) {
        if (response.status == 200) {
          var data = response.data.response.message;

          console.log(data);
          return (callback(data));
        }
      }, function(error) {
        var message = error.data.response.message.name[0].message;
        console.log(message);
      });
    }

    commonMethodsObj.getAllRoomTypes = function(limit, page, criteria, numRows, type, callback)  {
      var roomtypes = [];
      var getUrl = "/roomtype/search?limit=" + limit + "&page=" + page+"&"+criteria;
      var responsePromise = UtilsFactory.doGetCall(getUrl);
      responsePromise.then(function(response) {

        if (response.status == 200) {
          var data = response.data.response.message;

          for (var i = 0; i < data.length; i++) {
            numRows++;
            var row = {};
            row['sequence'] = numRows;
            row['id'] = data[i].id;
            row['name'] = data[i].name;
            row['capacity'] = data[i].nop;
            row['status']=data[i].active;
            roomtypes.push(row);
          }
          console.log(roomtypes);
          return (callback(roomtypes));
        }

      }, function(error) {
        var message = error.data.response.message.name[0].message;
        console.log(message);
        // window.alert(message);
      });

    }

    commonMethodsObj.searchHotels = function(limit, page, criteria, numRows, type, callback)  {
      var hotels = [];
      var getUrl = "/hotel/search?limit=" + limit + "&page=" + page+"&"+criteria;
      var responsePromise = UtilsFactory.doGetCall(getUrl);
      responsePromise.then(function(response) {

        if (response.status == 200) {
          var data = response.data.response.message;

          for (var i = 0; i < data.length; i++) {
            numRows++;
            var row = {};
            row['sequence'] = numRows;
            row['id'] = data[i].id;
            row['name'] = data[i].name;
            row['city'] = data[i].city;
            row['status']=data[i].active;
            row['address']=data[i].address;
            row['pincode']=data[i].pincode;
            row['lat']=data[i].location.lat;
            row['long']=data[i].location.long;
            row['price']=data[i].price;
            row['currency']=data[i].currency;
            row['star']=data[i].rating;

            try {
              row['swimmingPool'] = data[i].amenities.swimming;
              row['freeWifi'] = data[i].amenities.wifi;
              row['gym'] = data[i].amenities.gym;
              row['restaurant'] = data[i].amenities.restaurant;
            }catch(err){
              console.log(err);
            }
            row['checkin_time']=data[i].checkin;
            row['checkout_time']=data[i].checkout;
            hotels.push(row);
          }
          console.log(hotels);
          return (callback(hotels));
        }

      }, function(error) {
        var message = error.data.response.message.name[0].message;
        console.log(message);
        // window.alert(message);
      });

    }

    commonMethodsObj.searchMinitours = function(limit, page, criteria, numRows, type, callback)  {
      var minitours = [];
      var getUrl = "/tour/search?limit=" + limit + "&page=" + page+"&"+criteria;
      var responsePromise = UtilsFactory.doGetCall(getUrl);
      responsePromise.then(function(response) {

        if (response.status == 200) {
          var data = response.data.response.message;

          for (var i = 0; i < data.length; i++) {
            numRows++;
            var row = {};
            row['sequence'] = numRows;
            row['id'] = data[i].id;
            row['name'] = data[i].name;
            row['city'] = data[i].city;
            row['status']=data[i].active;
            row['price']=data[i].price;
            row['currency']=data[i].currency;
            row['departure']=data[i].departure;
            row['type']=data[i].type;
            row['duration']=data[i].duration;
            row['pickuptime']=data[i].pickuptime;
            row['droptime']=data[i].droptime;
            row['activities']=data[i].activities;
            row['highlight']=data[i].highlight;
            row['description']=data[i].description;
            row['lunch']=data[i].lunch;
            row['dinner']=data[i].dinner;
            row['inclusions']=data[i].inclusions;
            row['exclusions']=data[i].exclusions;
            minitours.push(row);
          }
          console.log(minitours);
          return (callback(minitours));
        }

      }, function(error) {
        var message = error.data.response.message.name[0].message;
        console.log(message);
        // window.alert(message);
      });

    }

    return commonMethodsObj;
  }

]);
