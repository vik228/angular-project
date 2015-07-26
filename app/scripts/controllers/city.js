'use strict';

zopkyFrontendApp.controller('cityController', function($scope, $http, UtilsFactory) {
$scope.cityController = {};

$scope.cities = [
{id:1, activityName:'Gateway of India', continent: "Asia", country:"India", state:"Maharashtra", city:'Mumbai',   type:"Place", lat: '19.2302', long:'72.409202', openTime: '2 pm', closeTime: '5 pm', status:'false' },
{id:2, activityName:'Act1', continent: "Asia", country:"Sangapore", state:"Dummy1",  city:'Dummy1', type:"Place", lat: '19.2302', long:'72.409202', openTime: '2 pm', closeTime: '5 pm', status:'true' },
{id:3, activityName:'Act2', continent: "Asia", country:'Dummy2',    state:"Dummy2",  city:'Dummy2', type:"Place", lat: '19.2302', long:'72.409202', openTime: '2 pm', closeTime: '5 pm', status:'true' },
{id:4, activityName:'Act3', continent: "Asia", country:'Dummy3',    state:"Dummy3",  city:'Dummy3', type:"Place", lat: '19.2302', long:'72.409202', openTime: '2 pm', closeTime: '5 pm', status:'false' },
{id:5, activityName:'Act4', continent: "Asia", country:'Dummy4',    state:"Dummy4",  city:'Dummy4', type:"Place", lat: '19.2302', long:'72.409202', openTime: '2 pm', closeTime: '5 pm', status:'true' },
{id:6, activityName:'Act5', continent: "Asia", country:'Dummy5',    state:"Dummy5",  city:'Dummy5', type:"Place", lat: '19.2302', long:'72.409202', openTime: '2 pm', closeTime: '5 pm', status:'false' },
];

$scope.edit = true;
$scope.error = false;
$scope.incomplete = false; 

$scope.editCity = function(id) {
  if (id == 'new') {
    $scope.formTitle = 'Create New City';
    $scope.act ='add';
    $scope.cityController.city = '';
    $scope.cityController.state = '';
    $scope.cityController.lat = '';
    $scope.cityController.long = '';
    } else {
    $scope.formTitle = 'Edit City';
    $scope.act ='update';
    $scope.cityController.city = $scope.cities[id-1].city; 
    $scope.cityController.state = $scope.cities[id-1].state; 
    $scope.cityController.lat = $scope.cities[id-1].lat; 
    $scope.cityController.long  = $scope.cities[id-1].long; 
  }
};


$scope.showModal = false;
  $scope.toggleModal = function(){
      $scope.showModal = !$scope.showModal;
    };

/* saveCity function inserts city information in the database*/
$scope.saveCity = function() {
  var cityDetails = {
    name:$scope.cityController.city,
    state:$scope.cityController.state,
    lat: $scope.cityController.lat,
    lon: $scope.cityController.long
  };

  console.log(cityDetails);

  if($scope.act === 'add')
    var responsePromise = UtilsFactory.doPostCall ('/city/add', cityDetails);
  else if($scope.act === 'update')
    var responsePromise = UtilsFactory.doPostCall ('/city/update', cityDetails);
      responsePromise.then (function (response){

        console.log (response);

      });
}; /* saveCity ends here */

/* statusCity function activates or deactivates city information from database*/
$scope.statusCity = function(id) {
  $scope.cities[id-1].status = !$scope.cities[id-1].status ;
  var cityDetails = {
    id:$scope.cities[id-1].id,
    active:$scope.cities[id-1].status
  };
  console.log(cityDetails);
  var responsePromise = UtilsFactory.doPostCall ('/city/update', cityDetails);
      responsePromise.then (function (response){

        console.log (response);
        // response : responseCode, message
        var message = response['message'];
        console.log (message);

      });
}; /* statusCity ends here */
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