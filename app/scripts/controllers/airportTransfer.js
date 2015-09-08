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

$scope.seats = [
{id:1, size: '3', status:'false', airportPrice:'200', cityPrice: '300'},
{id:2, size: '5', status:'true', airportPrice:'200', cityPrice: '400'},
{id:3, size: '9', status:'false', airportPrice:'200', cityPrice: '100'},
{id:4, size: '15', status:'true', airportPrice:'200', cityPrice: '340'},
{id:5, size: '45', status:'false', airportPrice:'200', cityPrice: '370'},
{id:6, size: '54', status:'true', airportPrice:'200', cityPrice: '230'},
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
    //call seats api here and make prices null
    $scope.seats = [
      {id:1, size: '3', status:'false', airportPrice:'', cityPrice: ''},
      {id:2, size: '5', status:'true', airportPrice:'', cityPrice: ''},
      {id:3, size: '9', status:'false', airportPrice:'', cityPrice: ''},
      {id:4, size: '15', status:'true', airportPrice:'', cityPrice: ''},
      {id:5, size: '45', status:'false', airportPrice:'', cityPrice: ''},
      {id:6, size: '54', status:'true', airportPrice:'', cityPrice: ''},
      ]; 
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
$scope.saveAirportTransfer = function() {
   var prices =[];
    angular.forEach($scope.seats, function(value, key){
    var price={seater: value.size, airportPrice:value.airportPrice, cityPrice:value.cityPrice};
    prices.push(price);
  });

  var airportTransferDetails = {
    city:$scope.airportTransferController.city,
    airportName:$scope.airportTransferController.airportName,
    airportCode:$scope.airportTransferController.airportCode,
    prices: JSON.stringify(prices)
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

/* statusAirportTransfer function activates or deactivates airportTransfers information from database*/
$scope.statusAirportTransfer = function(id) {
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
}; /* statusAirportTransfer ends here */ 

$scope.toggleEnabled = function(){
  $scope.info = !$scope.info;
}

});