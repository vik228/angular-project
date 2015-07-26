'use strict';

zopkyFrontendApp.controller('airportController', function($scope,$http,UtilsFactory) {
$scope.airportController = {};

$scope.airports = [
{id:1,  airportCode:'IGI', airportName:'IGI Airport', city:'New Delhi', international:'true', address:'address 1', GMToffset:'+5.30', busConnectivity:'true', metroConnectivity:'true', taxiConnectivity:'false', lat: '19.2302', long:'72.409202', status:'0'},
{id:2,  airportCode:'RGIA',airportName:'Rajeev Gandhi', city:'Hyderabad', international:'false',  address:'address 1',GMToffset:'+5.30', busConnectivity:'true', metroConnectivity:'false', taxiConnectivity:'true', lat: '19.2302', long:'72.409202', status:'1'},
{id:3,  airportCode:'DDIA',airportName:'Dum Dum', city:'Kolkata', international:'true',  address:'address 1', GMToffset:'+5.30', busConnectivity:'false', metroConnectivity:'true', taxiConnectivity:'false', lat: '19.2302', long:'72.409202', status:'0'},
{id:4,  airportCode:'HIA', airportName:'Hethrow', city:'London', international:'false', address:'address 1', GMToffset:'+5.30', busConnectivity:'false', metroConnectivity:'false', taxiConnectivity:'true', lat: '19.2302', long:'72.409202', status:'0'},
{id:5,  airportCode:'MIA', airportName:'Munich Internation Airport',city:'Germany', international:'true',  address:'address 1', GMToffset:'+5.30', busConnectivity:'true', metroConnectivity:'true', taxiConnectivity:'true', lat: '19.2302', long:'72.409202', status:'1'},
{id:6,  airportCode:'HIA', airportName:'Hong Kong Airport', city:'China', international:'false',  address:'address 1', GMToffset:'+5.30', busConnectivity:'true', metroConnectivity:'true', taxiConnectivity:'true', lat: '19.2302', long:'72.409202', status:'0'},
]; 

$scope.edit = true;
$scope.error = false;
$scope.incomplete = false; 
$scope.info= false;

/* To edit airport */

$scope.editAirport = function(id,edit) {
  if(edit ==='show')
    $scope.info=true;
  else
    $scope.info=false;

  if (id == 'new') {
    $scope.formTitle = 'Create New Airport';
  //  $scope.incomplete = true;
    $scope.act ='add';
    $scope.airportController.city = '';
    $scope.airportController.airportCode = '';
    $scope.airportController.airportName = '';
    $scope.airportController.international = 'Select';
    $scope.airportController.address = '';
    $scope.airportController.lat = '';
    $scope.airportController.long = '';
    $scope.airportController.GMToffset = '';
    $scope.airportController.busConnectivity = 'Select';
    $scope.airportController.metroConnectivity = 'Select';
    $scope.airportController.taxiConnectivity = 'Select';
    } 
  else {
      if(edit ==='show')
          $scope.formTitle = 'Airport Details';
        else
          $scope.formTitle = 'Edit Airport';
    $scope.act ='update';
    $scope.airportController.city = $scope.airports[id-1].city; 
    $scope.airportController.airportCode = $scope.airports[id-1].airportCode; 
    $scope.airportController.airportName = $scope.airports[id-1].airportName; 
    $scope.airportController.international = $scope.airports[id-1].international ==='true'? 'Yes' : 'No'; 
    $scope.airportController.address = $scope.airports[id-1].address; 
    $scope.airportController.lat = $scope.airports[id-1].lat; 
    $scope.airportController.long  = $scope.airports[id-1].long; 
    $scope.airportController.GMToffset  = $scope.airports[id-1].GMToffset; 
    $scope.airportController.busConnectivity  = $scope.airports[id-1].busConnectivity ==='true'? 'Yes' : 'No'; 
    $scope.airportController.metroConnectivity  = $scope.airports[id-1].metroConnectivity ==='true'? 'Yes' : 'No'; 
    $scope.airportController.taxiConnectivity  = $scope.airports[id-1].taxiConnectivity ==='true'? 'Yes' : 'No'; 
  }
};

/* To get images from flicker */

$scope.getImages = function(id){

  alert('Will get flicker images');

};

$scope.downloadImages = function(imgs){

  alert('Will download flicker images');

};


$scope.showModal = false;
  $scope.toggleModal = function(){
      $scope.showModal = !$scope.showModal;
    };

/* saveActivities function inserts activities information in the database*/
$scope.saveAirport = function() {
  var connectivity = {
    busConnectivity: $scope.airportController.busConnectivity === 'Yes'? 'true' : 'false', 
    metroConnectivity: $scope.airportController.metroConnectivity === 'Yes'? 'true' : 'false', 
    taxiConnectivity: $scope.airportController.taxiConnectivity === 'Yes'? 'true' : 'false'
  }
  var airportDetails = {
    city:$scope.airportController.city,
    airportName:$scope.airportController.airportName,
    airportCode:$scope.airportController.airportCode,
    international:$scope.airportController.international === 'Yes'? 'true' : 'false', 
    GMToffset:$scope.airportController.GMToffset,
    address:$scope.airportController.address,
    lat: $scope.airportController.lat,
    long: $scope.airportController.long, 
    connectivity: connectivity
  };

  console.log(airportDetails);
  if($scope.act === 'add')
    var responsePromise = UtilsFactory.doPostCall ('/airport/add', airportDetails);
  else if($scope.act === 'update')
    var responsePromise = UtilsFactory.doPostCall ('/airport/update', airportDetails);
      responsePromise.then (function (response){

        console.log (response);

      });
}; /* saveContinent ends here */

/* statusActivity function activates or deactivates Continent information from database*/
$scope.statusAirport = function(id) {
  $scope.airports[id-1].status = !$scope.airports[id-1].status ;
  var airportDetails = {
    id:$scope.airports[id-1].id,
    active:$scope.airports[id-1].status
  };
  console.log(airportDetails);
  var responsePromise = UtilsFactory.doPostCall ('/airport/update', airportDetails);
      responsePromise.then (function (response){

        console.log (response);

      });
}; /* statusContinent ends here */ 

$scope.toggleEnabled = function(){
  $scope.info = !$scope.info;
}

});