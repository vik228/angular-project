'use strict';

zopkyFrontendApp.controller('cityController',function($scope, $http, $window, UtilsFactory, CommonMethods) {
$scope.cityController = {};

$scope.states = [];
$scope.cities = [];

$scope.limit=10;
$scope.skip=0;
$scope.numRows=0;
$scope.numStates=0;

$scope.getCities = function(){

  CommonMethods.getAllCities($scope.limit, $scope.skip, $scope.cities.length, "cities", function(data){
    $scope.cities = $scope.cities.concat(data);
  });
};

$scope.getCities();

$scope.getMoreCities = function(){
    $scope.skip=$scope.cities.length;
    $scope.getCities();
};

$scope.edit = true;
$scope.error = false;
$scope.incomplete = false;

$scope.getActiveStates = function(){
  var criteria = "active=true";
  CommonMethods.searchStates(100,0,criteria, $scope.states.length, "cities", function(data){
    $scope.states = $scope.states.concat(data);
  });
};

$scope.getActiveStates();

$scope.editCity = function(id) {
  if (id == 'new') {
    $scope.formTitle = 'Create New City';
    $scope.act ='add';
    $scope.cityController.city = '';
    $scope.cityController.state = '';
    } else {
    $scope.formTitle = 'Edit City';
    $scope.act ='update';
    $scope.oldCityName = $scope.cities[id-1].city;
    $scope.oldStateId = $scope.cities[id-1].stateId;
    $scope.cityController.city = $scope.cities[id-1].city;
    $scope.cityController.state = $scope.cities[id-1].state;
  }
};

$scope.showModal = false;
  $scope.toggleModal = function(){
      $scope.showModal = !$scope.showModal;
    };

/* saveCity function inserts city information in the database*/
$scope.saveCity = function() {

    if($scope.act === 'add'){
      var cityDetails =[ {
        name:$scope.cityController.city,
        state:$scope.cityController.state
      }];

      if($scope.cityController.state == "" || $scope.cityController.city ==""){
        console.log("null values");
      }else {
        console.log(cityDetails);
        var responsePromise = UtilsFactory.doPostCall ('/city/add', cityDetails);
        responsePromise.then (function (response){

                  var data = response.data['response'];
                  //console.log(data);
              if (response.status==200) {
                $scope.toggleModal();
                var message = data['message'];
                window.alert(message);
              }

        }, function(error){
          $scope.toggleModal();
                  var message = error.data.response.message.name[0].message;
                  console.log(message);
                  window.alert(message);
          });
    }
  }else if($scope.act === 'update'){
    var cityDetails ={
      findCriteria:{
        state:$scope.oldStateId,
        name:$scope.oldCityName
      },
      recordsToUpdate:{
        state:$scope.cityController.state,
        name:$scope.cityController.city
      }
    };
    console.log(cityDetails);

    var responsePromise = UtilsFactory.doPostCall ('/city/update', cityDetails);
      responsePromise.then (function (response){
            var data = response.data['response'];
                //console.log(data);
            if (response.status==200) {
              $scope.toggleModal();
              var message = data['message'];
              $window.alert(message);
            }

      }, function(error){
                $scope.toggleModal();
                var message = error.data.response.message.name[0].message;
                console.log(message);
                $window.alert(message);
        });
  }
};/* saveCity ends here */

/* statusCity function activates or deactivates city information from database*/

$scope.statusCity = function(id) {
    var cityDetails ={
      findCriteria:{
        id:$scope.cities[id-1].id,
        name:$scope.cities[id-1].city
      },
      recordsToUpdate:{
        state:$scope.cities[id-1].id,
        name:$scope.cities[id-1].city,
        "active": !$scope.cities[id-1].status
      }
    };

  console.log(cityDetails);
  var responsePromise = UtilsFactory.doPostCall ('/city/update', cityDetails);
      responsePromise.then (function (response){
                var data = response.data['response'];
                //console.log(data);
            if (response.status==200) {
              $scope.cities[id-1].status = !$scope.cities[id-1].status ;
              var message = data['message'];
              $window.alert(message);
            }

      }, function(error){
                var message = error.data.response.message.name[0].message;
                console.log(message);
                $window.alert(message);
        });
};

});
