'use strict';

zopkyFrontendApp.controller('cityController', function($scope, $http, UtilsFactory) {
$scope.cityController = {};

$scope.cities = [
{id:1, activityName:'Gateway of India', continent: "Asia", country:"India", state:"Maharashtra", city:'Mumbai',   type:"Place", lat: '19.2302', long:'72.409202', openTime: '2 pm' },
{id:2, activityName:'Act1', continent: "Asia", country:"Sangapore", state:"Dummy1",  city:'Dummy1', type:"Place", lat: '19.2302', long:'72.409202', openTime: '2 pm' },
{id:3, activityName:'Act2', continent: "Asia", country:'Dummy2',    state:"Dummy2",  city:'Dummy2', type:"Place", lat: '19.2302', long:'72.409202', openTime: '2 pm' },
{id:4, activityName:'Act3', continent: "Asia", country:'Dummy3',    state:"Dummy3",  city:'Dummy3', type:"Place", lat: '19.2302', long:'72.409202', openTime: '2 pm' },
{id:5, activityName:'Act4', continent: "Asia", country:'Dummy4',    state:"Dummy4",  city:'Dummy4', type:"Place", lat: '19.2302', long:'72.409202', openTime: '2 pm' },
{id:6, activityName:'Act5', continent: "Asia", country:'Dummy5',    state:"Dummy5",  city:'Dummy5', type:"Place", lat: '19.2302', long:'72.409202', openTime: '2 pm' },
];

$scope.edit = true;
$scope.error = false;
$scope.incomplete = false; 

$scope.editActivity = function(id) {
  if (id == 'new') {
    $scope.formTitle = 'Create New State';
  //  $scope.incomplete = true;
    $scope.act ='save';
    $scope.cityController.city = '';
    $scope.cityController.country = '';
    $scope.cityController.type = '';
    $scope.cityController.continent = '';
    $scope.cityController.state = '';
    $scope.cityController.lat = '';
    $scope.cityController.long = '';
    $scope.cityController.openTime = '';
    $scope.cityController.closeTime = '';
    } else {
    $scope.formTitle = 'Edit State';
    $scope.act ='update';
    $scope.cityController.city = $scope.cities[id-1].city; 
    $scope.cityController.country = $scope.cities[id-1].country; 
    $scope.cityController.type = $scope.cities[id-1].type; 
    $scope.cityController.continent = $scope.cities[id-1].continent;
    $scope.cityController.state = $scope.cities[id-1].state; 
    $scope.cityController.lat = $scope.cities[id-1].lat; 
    $scope.cityController.long  = $scope.cities[id-1].long; 
    $scope.cityController.openTime  = $scope.cities[id-1].openTime; 
    $scope.cityController.closeTime  = $scope.cities[id-1].closeTime; 
  }
};


$scope.showModal = false;
  $scope.toggleModal = function(){
      $scope.showModal = !$scope.showModal;
    };

/* saveCity function inserts city information in the database*/
$scope.saveCity = function() {
  var cityDetails = {
    action:$scope.act,
    continent:$scope.cityController.continent,
    country:$scope.cityController.country,
    city:$scope.cityController.city,
    state:$scope.cityController.state,
    type:$scope.cityController.type,
    lat: $scope.cityController.lat,
    long: $scope.cityController.long, 
    openTime: $scope.cityController.openTime, 
    closeTime: $scope.cityController.closeTime
  };

  console.log(cityDetails);

  var responsePromise = UtilsFactory.doPostCall ('/user/state', cityDetails);
      responsePromise.then (function (response){

        console.log (response);

      });
}; /* saveCity ends here */
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