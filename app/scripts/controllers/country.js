'use strict';

zopkyFrontendApp.controller('countryController', function($scope,$http, UtilsFactory) {
$scope.countryController = {};

$scope.countries = [
{id:1, activityName:'Gateway of India', continent: "Asia", country:"India", state:"Maharashtra", city:'Mumbai',   type:"Place", lat: '19.2302', long:'72.409202', openTime: '2 pm', closeTime: '5 pm' },
{id:2, activityName:'Act1', continent: "Asia", country:"Sangapore", state:"Dummy1",  city:'Dummy1', type:"Place", lat: '19.2302', long:'72.409202', openTime: '2 pm', closeTime: '5 pm' },
{id:3, activityName:'Act2', continent: "Asia", country:'Dummy2',    state:"Dummy2",  city:'Dummy2', type:"Place", lat: '19.2302', long:'72.409202', openTime: '2 pm', closeTime: '5 pm' },
{id:4, activityName:'Act3', continent: "Asia", country:'Dummy3',    state:"Dummy3",  city:'Dummy3', type:"Place", lat: '19.2302', long:'72.409202', openTime: '2 pm', closeTime: '5 pm' },
{id:5, activityName:'Act4', continent: "Asia", country:'Dummy4',    state:"Dummy4",  city:'Dummy4', type:"Place", lat: '19.2302', long:'72.409202', openTime: '2 pm', closeTime: '5 pm' },
{id:6, activityName:'Act5', continent: "Asia", country:'Dummy5',    state:"Dummy5",  city:'Dummy5', type:"Place", lat: '19.2302', long:'72.409202', openTime: '2 pm', closeTime: '5 pm' },
];

$scope.edit = true;
$scope.error = false;
$scope.incomplete = false; 

$scope.editActivity = function(id) {
  if (id == 'new') {
    $scope.formTitle = 'Create New City';
  //  $scope.incomplete = true;
    $scope.act ='save';
    $scope.countryController.city = '';
    $scope.countryController.country = '';
    $scope.countryController.type = '';
    $scope.countryController.continent = '';
    $scope.countryController.state = '';
    $scope.countryController.lat = '';
    $scope.countryController.long = '';
    $scope.countryController.openTime = '';
    $scope.countryController.closeTime = '';
    } else {
    $scope.formTitle = 'Edit City';
    $scope.act ='update';
    $scope.countryController.city = $scope.countries[id-1].city; 
    $scope.countryController.country = $scope.countries[id-1].country; 
    $scope.countryController.type = $scope.countries[id-1].type; 
    $scope.countryController.continent = $scope.countries[id-1].continent;
    $scope.countryController.state = $scope.countries[id-1].state; 
    $scope.countryController.lat = $scope.countries[id-1].lat; 
    $scope.countryController.long  = $scope.countries[id-1].long; 
    $scope.countryController.openTime  = $scope.countries[id-1].openTime; 
    $scope.countryController.closeTime  = $scope.countries[id-1].closeTime; 
  }
};


$scope.showModal = false;
  $scope.toggleModal = function(){
      $scope.showModal = !$scope.showModal;
    };

/* saveCountry function inserts country information in the database*/
$scope.saveCountry = function() {
  var countryDetails = {
    action:$scope.act,
    continent:$scope.countryController.continent,
    country:$scope.countryController.country,
    city:$scope.countryController.city,
    state:$scope.countryController.state,
    type:$scope.countryController.type,
    lat: $scope.countryController.lat,
    long: $scope.countryController.long, 
    openTime: $scope.countryController.openTime, 
    closeTime: $scope.countryController.closeTime
  };

  console.log(countryDetails);

  var responsePromise = UtilsFactory.doPostCall ('/user/country', countryDetails);
      responsePromise.then (function (response){

        console.log (response);

      });
}; /* saveCountry ends here */

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