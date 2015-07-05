'use strict';

zopkyFrontendApp.controller('activitiesController', function($scope) {

$scope.activities = [
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

/* To edit activity */

$scope.editActivity = function(id) {
  if (id == 'new') {
    $scope.formTitle = 'Create New Activity';
    $scope.incomplete = false;
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
    $scope.activityName = $scope.activities[id-1].activityName;
    $scope.city = $scope.activities[id-1].city; 
    $scope.country = $scope.activities[id-1].country; 
    $scope.type = $scope.activities[id-1].type; 
    $scope.continent = $scope.activities[id-1].continent;
    $scope.state = $scope.activities[id-1].state; 
    $scope.lat = $scope.activities[id-1].lat; 
    $scope.long  = $scope.activities[id-1].long; 
    $scope.openTime  = $scope.activities[id-1].openTime; 
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

$scope.selects = {
        'continent': ['Asia', 'America', 'Africa', 'Australia', 'Europe'],
        'country': ['India', 'CA', 'Poland', 'Sydney'],
        'city': ['Mumbai', 'Delhi', 'Bangalore']
    };

    $scope.selecteds = {};
    angular.forEach($scope.selects, function (value, key) {
        $scope.selecteds[key] = value[0];
    });

    
});

