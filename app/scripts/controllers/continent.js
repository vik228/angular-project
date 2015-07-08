'use strict';

zopkyFrontendApp.controller('continentController', function($scope,$http, UtilsFactory) {
$scope.formTitle = '';
$scope.id = '';
$scope.activityName = '';
$scope.city = '';
$scope.country = '';
$scope.type = '';
$scope.continent = '';
$scope.state = '';
$scope.lat = '';
$scope.long = '';
$scope.openTime = '';
$scope.continents = [
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
    $scope.formTitle = 'Create New Activity';
  //  $scope.incomplete = true;
    $scope.act ='save';
    $scope.activityName = '';
    $scope.city = '';
    $scope.country = '';
    $scope.type = '';
    $scope.continent = '';
    $scope.state = '';
    $scope.lat = '';
    $scope.long = '';
    $scope.openTime = '';
    } else {
    $scope.formTitle = 'Edit Activity';
    $scope.act ='update';
    $scope.activityName = $scope.continents[id-1].activityName;
    $scope.city = $scope.continents[id-1].city; 
    $scope.country = $scope.continents[id-1].country; 
    $scope.type = $scope.continents[id-1].type; 
    $scope.continent = $scope.continents[id-1].continent;
    $scope.state = $scope.continents[id-1].state; 
    $scope.lat = $scope.continents[id-1].lat; 
    $scope.long  = $scope.continents[id-1].long; 
    $scope.openTime  = $scope.continents[id-1].openTime; 
    $scope.closeTime  = $scope.continents[id-1].closeTime; 
  }
};

$scope.showModal = false;
  $scope.toggleModal = function(){
      $scope.showModal = !$scope.showModal;
    };

$scope.saveContinent = function() {
  var continentDetails = {
    action:$scope.act,
    activityName:$scope.activityName, 
    continent:$scope.continent,
    country:$scope.country,
    city:$scope.city,
    state:$scope.state,
    type:$scope.type,
    lat: $scope.lat,
    long: $scope.long, 
    openTime: $scope.openTime, 
    closeTime: $scope.closeTime
  };
  console.log(continentDetails);
  var responsePromise = UtilsFactory.doPostCall ('/user/continent', continentDetails);
      responsePromise.then (function (response){

        console.log (response);

      });
};
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