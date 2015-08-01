'use strict';

zopkyFrontendApp.controller('airportTransferController', function($scope,$http,UtilsFactory) {
$scope.airportTransferController = {};

$scope.airportTransfers = [
{id:1,  airportCode:'IGI', airportName:'IGI Airport', city:'New Delhi', tag:'0', currency:'INR',status:'true'},
{id:2,  airportCode:'IGI', airportName:'IGI Airport', city:'New Delhi', tag:'0', currency:'INR',status:'false'},
{id:3,  airportCode:'IGI', airportName:'IGI Airport', city:'New Delhi', tag:'1', currency:'INR',status:'false'},
{id:4,  airportCode:'IGI', airportName:'IGI Airport', city:'New Delhi', tag:'0', currency:'INR',status:'true'},
{id:5,  airportCode:'IGI', airportName:'IGI Airport', city:'New Delhi', tag:'1', currency:'INR',status:'true'},
{id:6,  airportCode:'IGI', airportName:'IGI Airport', city:'New Delhi', tag:'1', currency:'INR',status:'false'},
];

$scope.edit = true;
$scope.error = false;
$scope.incomplete = false; 
$scope.info= false;

/* To edit airportTransfer */

$scope.editAirportTransfer = function(id,edit) {
  if(edit ==='show')
    $scope.info=true;
  else
    $scope.info=false;

  if (id == 'new') {
    $scope.formTitle = 'Create New Transfer';
  //  $scope.incomplete = true;
    $scope.act ='add';
    $scope.airportTransferController.city = '';
    $scope.airportTransferController.airportCode = '';
    $scope.airportTransferController.airportName = '';
    $scope.airportTransferController.tag = 'Select';
    $scope.airportTransferController.currency = '';
    } 
  else {
      if(edit ==='show')
          $scope.formTitle = 'Airport Transfer Details';
        else
          $scope.formTitle = 'Edit Airport Transfer';
    $scope.act ='update';
    $scope.airportTransferController.city = $scope.airportTransfers[id-1].city; 
    $scope.airportTransferController.airportCode = $scope.airportTransfers[id-1].airportCode; 
    $scope.airportTransferController.airportName = $scope.airportTransfers[id-1].airportName; 
    $scope.airportTransferController.tag = $scope.airportTransfers[id-1].tag ==='0'? 'Airport to City' : 'City to Airport'; 
    $scope.airportTransferController.currency = $scope.airportTransfers[id-1].currency; 
  }
};

$scope.showModal = false;
  $scope.toggleModal = function(){
      $scope.showModal = !$scope.showModal;
    };

/* saveActivities function inserts activities information in the database*/
$scope.saveairportTransfer = function() {
  var connectivity = {
    busConnectivity: $scope.airportTransferController.busConnectivity === 'Yes'? 'true' : 'false', 
    metroConnectivity: $scope.airportTransferController.metroConnectivity === 'Yes'? 'true' : 'false', 
    taxiConnectivity: $scope.airportTransferController.taxiConnectivity === 'Yes'? 'true' : 'false'
  }
  var airportTransferDetails = {
    city:$scope.airportTransferController.city,
    airportTransferName:$scope.airportTransferController.airportTransferName,
    airportTransferCode:$scope.airportTransferController.airportTransferCode,
    international:$scope.airportTransferController.international === 'Yes'? 'true' : 'false', 
    GMToffset:$scope.airportTransferController.GMToffset,
    address:$scope.airportTransferController.address,
    lat: $scope.airportTransferController.lat,
    long: $scope.airportTransferController.long, 
    connectivity: connectivity
  };

  console.log(airportTransferDetails);
  if($scope.act === 'add')
    var responsePromise = UtilsFactory.doPostCall ('/airportTransfer/add', airportTransferDetails);
  else if($scope.act === 'update')
    var responsePromise = UtilsFactory.doPostCall ('/airportTransfer/update', airportTransferDetails);
      responsePromise.then (function (response){

        console.log (response);

      });
}; /* saveContinent ends here */

/* statusActivity function activates or deactivates Continent information from database*/
$scope.statusairportTransfer = function(id) {
  $scope.airportTransfers[id-1].status = !$scope.airportTransfers[id-1].status ;
  var airportTransferDetails = {
    id:$scope.airportTransfers[id-1].id,
    active:$scope.airportTransfers[id-1].status
  };
  console.log(airportTransferDetails);
  var responsePromise = UtilsFactory.doPostCall ('/airportTransfer/update', airportTransferDetails);
      responsePromise.then (function (response){

        console.log (response);

      });
}; /* statusContinent ends here */ 

$scope.toggleEnabled = function(){
  $scope.info = !$scope.info;
}

});