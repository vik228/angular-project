'use strict';

zopkyFrontendApp.controller('roomController', function($scope,$http,UtilsFactory) {
$scope.roomController = {};

$scope.rooms = [
{id:1, roomType:'Deluxe AC', capacity: '1', status:'0'},
{id:2, roomType:'Luxary AC', capacity: '2', status:'1'},
{id:3, roomType:'Single AC', capacity: '1', status:'0'},
{id:4, roomType:'Deluxe Non-AC', capacity: '4', status:'1'},
{id:5, roomType:'Regular AC', capacity: '5', status:'1'},
{id:6, roomType:'Regular Non-AC', capacity: '3', status:'0'}
]; 

$scope.edit = true;
$scope.error = false;
$scope.incomplete = false; 
$scope.info= false;

/* To edit airport */

$scope.editRoom = function(id,edit) {
  if(edit ==='show')
    $scope.info=true;
  else
    $scope.info=false;

  if (id == 'new') {
    $scope.formTitle = 'Create New Room';
  //  $scope.incomplete = true;
    $scope.act ='save';
    $scope.roomController.roomType = '';
    $scope.roomController.capacity = '';
    } 
  else {
      if(edit ==='show')
          $scope.formTitle = 'Room Details';
        else
          $scope.formTitle = 'Edit Room';
    $scope.act ='update';
    $scope.roomController.hotelName = $scope.rooms[id-1].roomType; 
    $scope.roomController.city = $scope.rooms[id-1].capacity; 
  }
};

$scope.showModal = false;
  $scope.toggleModal = function(){
      $scope.showModal = !$scope.showModal;
    };

/* saveRoom function inserts room information in the database*/
$scope.saveRoom = function() {
  var roomDetails = {
    action:$scope.act,
    roomType:$scope.roomController.roomType,
    capacity:$scope.roomController.capacity
  };

  console.log(roomDetails);

  var responsePromise = UtilsFactory.doPostCall ('/user/roomType', roomDetails);
      responsePromise.then (function (response){

        console.log (response);

      });
}; /* saveRoom ends here */

/* statusRoom function activates or deactivates room information from database*/
$scope.statusRoom = function(id) {
  if($scope.rooms[id-1].status === '0')
    $scope.stat='1';
  else
    $scope.stat='0';
  var roomDetails = {
    action:'status',
    id:$scope.rooms[id-1].id,
    active:$scope.stat
  };
  console.log(roomDetails);
  var responsePromise = UtilsFactory.doPostCall ('/user/roomType', roomDetails);
      responsePromise.then (function (response){

        console.log (response);

      });
}; /* statusContinent ends here */ 

$scope.toggleEnabled = function(){
  $scope.info = !$scope.info;
}

});