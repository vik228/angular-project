'use strict';

zopkyFrontendApp.controller('minitourController', function($scope,$http,UtilsFactory) {
$scope.minitourController = {};

$scope.minitours = [
{id:1,  minitourName:'Mumbai Darshan', city:'New Delhi', activitiesInvolved:'rafting, road trip', description:'very adventurous', departureTime:'5am and 2pm', duration:'9', endTime:'2pm and 11pm', type:'Sightseeing', price: '2000', highlights:'Attractive, must visit', notes:'notes goes here', lunch:'true', dinner:'true', inclusions:'inclusions goes here', excluisons:'excluisons goes here', transportType:'Cab', category:'Private', status:'true'},
{id:2,  minitourName:'Mumbai Darshan', city:'New Delhi', activitiesInvolved:'rafting, road trip', description:'very adventurous', departureTime:'5am and 2pm', duration:'9', endTime:'2pm and 11pm', type:'Sightseeing', price: '2000', highlights:'Attractive, must visit', notes:'notes goes here', lunch:'true', dinner:'true', inclusions:'inclusions goes here', excluisons:'excluisons goes here', transportType:'Cab', category:'SIC', status:'true'},
{id:3,  minitourName:'Mumbai Darshan', city:'New Delhi', activitiesInvolved:'rafting, road trip', description:'very adventurous', departureTime:'5am and 2pm', duration:'9', endTime:'2pm and 11pm', type:'Sightseeing', price: '2000', highlights:'Attractive, must visit', notes:'notes goes here', lunch:'true', dinner:'true', inclusions:'inclusions goes here', excluisons:'excluisons goes here', transportType:'Bus', category:'Private', status:'false'},
{id:4,  minitourName:'Mumbai Darshan', city:'New Delhi', activitiesInvolved:'rafting, road trip', description:'very adventurous', departureTime:'5am and 2pm', duration:'9', endTime:'2pm and 11pm', type:'Sightseeing', price: '2000', highlights:'Attractive, must visit', notes:'notes goes here', lunch:'true', dinner:'true', inclusions:'inclusions goes here', excluisons:'excluisons goes here', transportType:'Bus', category:'Private', status:'false'},
{id:5,  minitourName:'Mumbai Darshan', city:'New Delhi', activitiesInvolved:'rafting, road trip', description:'very adventurous', departureTime:'5am and 2pm', duration:'9', endTime:'2pm and 11pm', type:'Sightseeing', price: '2000', highlights:'Attractive, must visit', notes:'notes goes here', lunch:'true', dinner:'true', inclusions:'inclusions goes here', excluisons:'excluisons goes here', transportType:'Van', category:'SIC', status:'true'},
{id:6,  minitourName:'Mumbai Darshan', city:'New Delhi', activitiesInvolved:'rafting, road trip', description:'very adventurous', departureTime:'5am and 2pm', duration:'9', endTime:'2pm and 11pm', type:'Sightseeing', price: '2000', highlights:'Attractive, must visit', notes:'notes goes here', lunch:'true', dinner:'true', inclusions:'inclusions goes here', excluisons:'excluisons goes here', transportType:'Cab', category:'Private', status:'false'},
]; 

$scope.edit = true;
$scope.error = false;
$scope.incomplete = false; 
$scope.info= false;

/* To edit minitour */

$scope.editMinitour = function(id,edit) {
  if(edit ==='show')
    $scope.info=true;
  else
    $scope.info=false;

  if (id == 'new') {
    $scope.formTitle = 'Create New Mini Tour';
    $scope.act ='add';
    $scope.minitourController.minitourName = '';
    $scope.minitourController.city = '';
    $scope.minitourController.activitiesInvolved = '';
    $scope.minitourController.description = '';
    $scope.minitourController.departureTime = '';
    $scope.minitourController.duration = '';
    $scope.minitourController.endTime = '';
    $scope.minitourController.type = '';
    $scope.minitourController.price = '';
    $scope.minitourController.highlights = '';
    $scope.minitourController.notes = '';
    $scope.minitourController.lunch = 'Select'; 
    $scope.minitourController.dinner = 'Select';  
    $scope.minitourController.inclusions = '';
    $scope.minitourController.excluisons = '';
    $scope.minitourController.transportType = 'Select';
    $scope.minitourController.category = 'Select';
    } 
  else {
      if(edit ==='show')
          $scope.formTitle = 'Minitour Details';
        else
          $scope.formTitle = 'Edit Mini Tour';
    $scope.act ='update';
    $scope.minitourController.minitourName = $scope.minitours[id-1].minitourName; 
    $scope.minitourController.city = $scope.minitours[id-1].city; 
    $scope.minitourController.activitiesInvolved = $scope.minitours[id-1].activitiesInvolved; 
    $scope.minitourController.description = $scope.minitours[id-1].description; 
    $scope.minitourController.departureTime = $scope.minitours[id-1].departureTime; 
    $scope.minitourController.duration = $scope.minitours[id-1].duration; 
    $scope.minitourController.endTime  = $scope.minitours[id-1].endTime; 
    $scope.minitourController.type  = $scope.minitours[id-1].type; 
    $scope.minitourController.price = $scope.minitours[id-1].price; 
    $scope.minitourController.highlights = $scope.minitours[id-1].highlights; 
    $scope.minitourController.notes = $scope.minitours[id-1].notes; 
    $scope.minitourController.lunch = $scope.minitours[id-1].lunch === 'true'? 'Yes' : 'No'; 
    $scope.minitourController.dinner = $scope.minitours[id-1].dinner === 'true'? 'Yes' : 'No';
    $scope.minitourController.inclusions = $scope.minitours[id-1].inclusions; 
    $scope.minitourController.excluisons = $scope.minitours[id-1].excluisons; 
    $scope.minitourController.transportType = $scope.minitours[id-1].transportType; 
    $scope.minitourController.category = $scope.minitours[id-1].category; 
  }
};

$scope.showModal = false;
  $scope.toggleModal = function(){
      $scope.showModal = !$scope.showModal;
    };

/* saveMinitour function inserts activities information in the database*/
$scope.saveMinitour = function() {
  var connectivity = {
    busConnectivity: $scope.minitourController.busConnectivity === 'Yes'? 'true' : 'false', 
    metroConnectivity: $scope.minitourController.metroConnectivity === 'Yes'? 'true' : 'false', 
    taxiConnectivity: $scope.minitourController.taxiConnectivity === 'Yes'? 'true' : 'false'
  }
  var minitourDetails = {
    minitourName:$scope.minitourController.minitourName,
    city:$scope.minitourController.city,
    activitiesInvolved:$scope.minitourController.activitiesInvolved,
    description:$scope.minitourController.description,
    duration:$scope.minitourController.duration,
    endTime:$scope.minitourController.endTime,
    price: $scope.minitourController.price,
    notes: $scope.minitourController.notes, 
    lunch:$scope.minitourController.lunch === 'Yes'? 'true' : 'false',
    dinner:$scope.minitourController.dinner === 'Yes'? 'true' : 'false',
    inclusions: $scope.minitourController.inclusions,
    excluisons: $scope.minitourController.excluisons, 
    transportType:$scope.minitourController.transportType,
    category:$scope.minitourController.category,
    status: $scope.minitourController.status,
  };

  console.log(minitourDetails);
  if($scope.act === 'add')
    var responsePromise = UtilsFactory.doPostCall ('/minitour/add', minitourDetails);
  else if($scope.act === 'update')
    var responsePromise = UtilsFactory.doPostCall ('/minitour/update', minitourDetails);
      responsePromise.then (function (response){

        console.log (response);

      });
}; /* saveContinent ends here */

/* statusMinitour function activates or deactivates MiniTours information from database*/
$scope.statusMinitour = function(id) {
  $scope.minitours[id-1].status = !$scope.minitours[id-1].status ;
  var minitourDetails = {
    id:$scope.minitours[id-1].id,
    active:$scope.minitours[id-1].status
  };
  console.log(minitourDetails);
  var responsePromise = UtilsFactory.doPostCall ('/minitour/update', minitourDetails);
      responsePromise.then (function (response){

        console.log (response);

      });
}; /* statusContinent ends here */ 

$scope.toggleEnabled = function(){
  $scope.info = !$scope.info;
}

});