'use strict';

zopkyFrontendApp.controller('stateController', function($scope, $http, UtilsFactory) {
$scope.stateController = {};

$scope.states = [
{id:1, activityName:'Gateway of India', continent: "Asia", country:"India", state:"Maharashtra", city:'Mumbai',   type:"Place", lat: '19.2302', long:'72.409202', openTime: '2 pm', closeTime: '5 pm', status:'1' },
{id:2, activityName:'Act1', continent: "Asia", country:"Sangapore", state:"Dummy1",  city:'Dummy1', type:"Place", lat: '19.2302', long:'72.409202', openTime: '2 pm', closeTime: '5 pm', status:'0' },
{id:3, activityName:'Act2', continent: "Asia", country:'Dummy2',    state:"Dummy2",  city:'Dummy2', type:"Place", lat: '19.2302', long:'72.409202', openTime: '2 pm', closeTime: '5 pm', status:'1' },
{id:4, activityName:'Act3', continent: "Asia", country:'Dummy3',    state:"Dummy3",  city:'Dummy3', type:"Place", lat: '19.2302', long:'72.409202', openTime: '2 pm', closeTime: '5 pm', status:'1' },
{id:5, activityName:'Act4', continent: "Asia", country:'Dummy4',    state:"Dummy4",  city:'Dummy4', type:"Place", lat: '19.2302', long:'72.409202', openTime: '2 pm' , closeTime: '5 pm', status:'0' },
{id:6, activityName:'Act5', continent: "Asia", country:'Dummy5',    state:"Dummy5",  city:'Dummy5', type:"Place", lat: '19.2302', long:'72.409202', openTime: '2 pm' , closeTime: '5 pm', status:'0' },
];

$scope.edit = true;
$scope.error = false;
$scope.incomplete = false; 

$scope.editState = function(id) {
  if (id == 'new') {
    $scope.formTitle = 'Create New State';
  //  $scope.incomplete = true;
    $scope.act ='add';
    $scope.stateController.country = '';
    $scope.stateController.state = '';
    } else {
    $scope.formTitle = 'Edit State';
    $scope.act ='update';
    $scope.stateController.country = $scope.states[id-1].country; 
    $scope.stateController.state = $scope.states[id-1].state; 
  }
};


$scope.showModal = false;
  $scope.toggleModal = function(){
      $scope.showModal = !$scope.showModal;
    };

/* saveState function inserts state information in the database*/
$scope.saveState = function() {
  var stateDetails = {
    country:$scope.stateController.country,
    name:$scope.stateController.state
  };

  console.log(stateDetails);
  if($scope.act === 'add')
    var responsePromise = UtilsFactory.doPostCall ('/state/add', stateDetails);
  else if($scope.act === 'update')
    var responsePromise = UtilsFactory.doPostCall ('/state/update', stateDetails);

      responsePromise.then (function (response){

        console.log (response);
        // response : responseCode, message
        var message = response['message'];
        console.log (message);

      });
}; /* saveState ends here */

/* statusState function activates or deactivates state information from database*/
$scope.statusState = function(id) {

  $scope.states[id-1].status = !$scope.states[id-1].status ;
  var stateDetails = {
    id:$scope.states[id-1].id,
    active:$scope.states[id-1].status
  };
  console.log(stateDetails);
  var responsePromise = UtilsFactory.doPostCall ('/state/update', stateDetails);
      responsePromise.then (function (response){

        console.log (response);

      });
}; /* statusState ends here */
/*
 var cities = [{city : 'Mumbai', desc : 'This is the best city in the world!', lat : 18.9750,long : 72.8258}];
 var mapOptions = {
        zoom: 7,
        center: new google.maps.LatLng(18.9750, 72.8258),
        mapTypeId: google.maps.MapTypeId.ROADMAP
    }

    $scope.map = new google.maps.Map(document.getElementById('map'), mapOptions);

    $scope.markers = [];
    
    var infoWindow = new google.maps.InfoWindow();
    
    var createMarker = function (info){
        
        var marker = new google.maps.Marker({
            map: $scope.map,
            position: new google.maps.LatLng(info.lat, info.long),
            title: info.city
        });
        marker.content = '<div class="infoWindowContent">' + info.desc + '</div>';
        
        google.maps.event.addListener(marker, 'click', function(){
            infoWindow.setContent('<h2>' + marker.title + '</h2>' + marker.content);
            infoWindow.open($scope.map, marker);
        });
        
        $scope.markers.push(marker);
        
    }  
    
    for (i = 0; i < cities.length; i++){
        createMarker(cities[i]);
    }

    $scope.openInfoWindow = function(e, selectedMarker){
        e.preventDefault();
        google.maps.event.trigger(selectedMarker, 'click');
    }

*/
});