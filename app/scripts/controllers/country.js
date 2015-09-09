'use strict';

zopkyFrontendApp.controller('countryController', ["$scope", "$http", "UtilsFactory", "CommonMethods", function($scope, $http, UtilsFactory, CommonMethods) {
  $scope.countryController = {};

  $scope.limit = 10;
  $scope.skip = 0;

  $scope.countries = [];
  $scope.continents = [];
  $scope.numRows = 0;
  $scope.numContinents = 0;

  $scope.getCountries = function() {

    CommonMethods.getAllCountries($scope.limit, $scope.skip, $scope.countries.length, "countries", function(data) {
      $scope.countries = $scope.countries.concat(data);
    });
  };

  $scope.getCountries();

  $scope.getMoreCountries = function() {
    $scope.skip = $scope.countries.length;
    $scope.getCountries();
  };

  $scope.getActiveContinents = function() {
    var criteria = "active=true";
    CommonMethods.searchContinents(100, 0,criteria, $scope.continents.length, "continents", function(data) {
      $scope.continents = $scope.continents.concat(data);
      console.log($scope.continents);
    });
  };

  $scope.getActiveContinents();

  $scope.edit = true;
  $scope.error = false;
  $scope.incomplete = false;

  $scope.editCountry = function(id) {
    if (id == 'new') {
      $scope.formTitle = 'Create New Country';
      $scope.act = 'add';
      $scope.countryController.country = '';
      $scope.countryController.continent = '';

    } else {
      $scope.formTitle = 'Edit Country';
      $scope.act = 'update';
      $scope.oldCountryName = $scope.countries[id - 1].country;
      $scope.oldContinentId = $scope.countries[id - 1].continentId;
      $scope.countryController.country = $scope.countries[id - 1].country;
      $scope.countryController.continent = $scope.countries[id - 1].continentId;
      console.log($scope.countries[id - 1].continentId);
    }
  };


  $scope.showModal = false;
  $scope.toggleModal = function() {
    $scope.showModal = !$scope.showModal;
  };

  /* saveCountry function inserts country information in the database*/
  $scope.saveCountry = function() {

    if ($scope.act === 'add') {
      var countryDetails = [{
        continent: $scope.countryController.continent,
        name: $scope.countryController.country
      }];

      if ($scope.countryController.continent == "" || $scope.countryController.country == "") {
        console.log("null values");
      } else {
        console.log(countryDetails);
        var responsePromise = UtilsFactory.doPostCall('/country/add', countryDetails);
        responsePromise.then(function(response) {

          var data = response.data['response'];
          //console.log(data);
          if (response.status == 200) {
            $scope.toggleModal();
            var message = data['message'];
            window.alert(message);
          }

        }, function(error) {
          $scope.toggleModal();
          var message = error.data.response.message.name[0].message;
          console.log(message);
          window.alert(message);
        });
      }
    } else if ($scope.act === 'update') {
      var countryDetails = {
        findCriteria: {
          continent: $scope.oldContinentId,
          name: $scope.oldCountryName
        },
        recordsToUpdate: {
          continent: $scope.countryController.continent,
          name: $scope.countryController.country
        }
      };
      console.log(countryDetails);

      var responsePromise = UtilsFactory.doPostCall('/country/update', countryDetails);
      responsePromise.then(function(response) {
        var data = response.data['response'];
        //console.log(data);
        if (response.status == 200) {
          $scope.toggleModal();
          var message = data['message'];
          window.alert(message);
        }

      }, function(error) {
        $scope.toggleModal();
        var message = error.data.response.message.name[0].message;
        console.log(message);
        window.alert(message);
      });
    }
  }; /* saveCountry ends here */

  /* statusCountry function activates or deactivates country information from database*/
  $scope.statusCountry = function(id) {

    console.log(id);

    var countryDetails = {
      findCriteria: {
        continent: $scope.countries[id - 1].continentId,
        name: $scope.countries[id - 1].country
      },
      recordsToUpdate: {
        continent: $scope.countries[id - 1].continentId,
        name: $scope.countries[id - 1].country,
        "active": !$scope.countries[id - 1].status
      }
    };

    $scope.countries[id - 1].status = !$scope.countries[id - 1].status;
    console.log(countryDetails);
    var responsePromise = UtilsFactory.doPostCall('/country/update', countryDetails);
    responsePromise.then(function(response) {
      var data = response.data['response'];
      //console.log(data);
      if (response.status == 200) {
        var message = data['message'];
        window.alert(message);
      }

    }, function(error) {
      var message = error.data.response.message.name[0].message;
      console.log(message);
      window.alert(message);
    });
  }; /* statusContinent ends here */
}]);
