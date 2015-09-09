'use strict';

zopkyFrontendApp.controller('continentController', ["$scope", "$http", "UtilsFactory", "CommonMethods", function ($scope, $http, UtilsFactory, CommonMethods) {
  $scope.continentController = {};
  $scope.continents = [];

  $scope.limit = 10;
  $scope.skip = 0;

  $scope.edit = true;
  $scope.error = false;
  $scope.incomplete = false;

  $scope.numRows = 0;

  $scope.getContinents = function () {
    CommonMethods.getAllContinents($scope.limit, $scope.skip, $scope.continents.length, "continents", function (data) {
      $scope.continents = $scope.continents.concat(data);
    });
  };

  $scope.getContinents();

  $scope.getMoreContinents = function () {
    $scope.skip = $scope.continents.length;
    $scope.getContinents();
  };

  $scope.editActivity = function (id) {
    if (id == 'new') {
      $scope.formTitle = 'Create New Continent';
      //  $scope.incomplete = true;
      $scope.act = 'add';
      $scope.continentController.continent = '';

    } else {

      $scope.formTitle = 'Edit Continent';
      $scope.act = 'update';
      $scope.oldName = $scope.continents[id - 1].continent;
      $scope.continentController.continent = $scope.continents[id - 1].continent;
    }
  };

  $scope.showModal = false;
  $scope.toggleModal = function () {
    $scope.showModal = !$scope.showModal;
  };

  /* saveContinent function inserts continent information in the database*/
  $scope.saveContinent = function () {

    if ($scope.act === 'add') {
      var continentDetails = [{
        name: $scope.continentController.continent
      }];
      var responsePromise = UtilsFactory.doPostCall('/continent/add', continentDetails);
      responsePromise.then(function (response) {

        var data = response.data['response'];
        //console.log(data);
        if (response.status == 200) {
          $scope.toggleModal();
          var message = data['message'];
          window.alert(message);
        }

      }, function (error) {
        $scope.toggleModal();
        var message = error.data.response.message.name[0].message;
        console.log(message);
        window.alert(message);
      });
    } else if ($scope.act === 'update') {

      var continentDetails = {
        findCriteria: {
          name: $scope.oldName
        },
        recordsToUpdate: {
          name: $scope.continentController.continent
        }
      };
      console.log(continentDetails);

      var responsePromise = UtilsFactory.doPostCall('/continent/update', continentDetails);
      responsePromise.then(function (response) {
        var data = response.data['response'];
        //console.log(data);
        if (response.status == 200) {
          $scope.toggleModal();
          var message = data['message'];
          window.alert(message);
        }

      }, function (error) {
        $scope.toggleModal();
        var message = error.data.response.message.name[0].message;
        console.log(message);
        window.alert(message);
      });
    }
  };
  /* saveContinent ends here */

  /* statusContinent function activates or deactivates Continent information from database*/
  $scope.statusContinent = function (id) {
    console.log(id);

    var continentDetails = {
      findCriteria: {
        id: $scope.continents[id - 1].id,
        name: $scope.continents[id - 1].continent
      },
      recordsToUpdate: {
        id: $scope.continents[id - 1].id,
        name: $scope.continents[id - 1].continent,
        "active": !$scope.continents[id - 1].status
      }
    };

    console.log(continentDetails);
    var responsePromise = UtilsFactory.doPostCall('/continent/update', continentDetails);
    responsePromise.then(function (response) {
      var data = response.data['response'];
      //console.log(data);
      if (response.status == 200) {
        $scope.continents[id - 1].status = !$scope.continents[id - 1].status;
        var message = data['message'];
        window.alert(message);
      }

    }, function (error) {
      var message = error.data.response.message.name[0].message;
      console.log(message);
      window.alert(message);
    });
  };

}]);
