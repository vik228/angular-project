'use strict';

zopkyFrontendApp.controller('activitiesController', function($scope,$http, UtilsFactory) {
$scope.activitiesController = {};

$scope.activities = [
{id:1, activityName:'Gateway of India', continent: "Asia", country:"India", state:"Maharashtra", city:'Mumbai',   type:"Place", lat: '19.2302', long:'72.409202', openTime: '2 pm', closeTime: '5 pm', status:'0'  },
{id:2, activityName:'Act1', continent: "Asia", country:"Sangapore", state:"Dummy1",  city:'Dummy1', type:"Place", lat: '19.2302', long:'72.409202', openTime: '2 pm', closeTime: '5 pm', status:'1'  },
{id:3, activityName:'Act2', continent: "Asia", country:'Dummy2',    state:"Dummy2",  city:'Dummy2', type:"Place", lat: '19.2302', long:'72.409202', openTime: '2 pm', closeTime: '5 pm', status:'1'  },
{id:4, activityName:'Act3', continent: "Asia", country:'Dummy3',    state:"Dummy3",  city:'Dummy3', type:"Place", lat: '19.2302', long:'72.409202', openTime: '2 pm', closeTime: '5 pm', status:'0'  },
{id:5, activityName:'Act4', continent: "Asia", country:'Dummy4',    state:"Dummy4",  city:'Dummy4', type:"Place", lat: '19.2302', long:'72.409202', openTime: '2 pm', closeTime: '5 pm', status:'1'  },
{id:6, activityName:'Act5', continent: "Asia", country:'Dummy5',    state:"Dummy5",  city:'Dummy5', type:"Place", lat: '19.2302', long:'72.409202', openTime: '2 pm', closeTime: '5 pm', status:'0'  },
];

$scope.edit = true;
$scope.error = false;
$scope.incomplete = false; 

/* To edit activity */

$scope.editActivity = function(id) {
  if (id == 'new') {
    $scope.formTitle = 'Create New Activity';
  //  $scope.incomplete = true;
    $scope.act ='save';
    $scope.activitiesController.city = '';
    $scope.activitiesController.country = '';
    $scope.activitiesController.type = '';
    $scope.activitiesController.continent = '';
    $scope.activitiesController.state = '';
    $scope.activitiesController.lat = '';
    $scope.activitiesController.long = '';
    $scope.activitiesController.openTime = '';
    $scope.activitiesController.closeTime = '';
    } else {
    $scope.formTitle = 'Edit Activity';
    $scope.act ='update';
    $scope.activitiesController.city = $scope.activities[id-1].city; 
    $scope.activitiesController.country = $scope.activities[id-1].country; 
    $scope.activitiesController.type = $scope.activities[id-1].type; 
    $scope.activitiesController.continent = $scope.activities[id-1].continent;
    $scope.activitiesController.state = $scope.activities[id-1].state; 
    $scope.activitiesController.lat = $scope.activities[id-1].lat; 
    $scope.activitiesController.long  = $scope.activities[id-1].long; 
    $scope.activitiesController.openTime  = $scope.activities[id-1].openTime; 
    $scope.activitiesController.closeTime  = $scope.activities[id-1].closeTime; 
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
$scope.saveActivity = function() {
  var activitiesDetails = {
    action:$scope.act,
    continent:$scope.activitiesController.continent,
    country:$scope.activitiesController.country,
    city:$scope.activitiesController.city,
    state:$scope.activitiesController.state,
    type:$scope.activitiesController.type,
    lat: $scope.activitiesController.lat,
    long: $scope.activitiesController.long, 
    openTime: $scope.activitiesController.openTime, 
    closeTime: $scope.activitiesController.closeTime
  };

  console.log(activitiesDetails);

  var responsePromise = UtilsFactory.doPostCall ('/user/activities', activitiesDetails);
      responsePromise.then (function (response){

        console.log (response);

      });
}; /* saveContinent ends here */

/* statusContinent function activates or deactivates Continent information from database*/
$scope.statusActivity = function(id) {
  if($scope.activities[id-1].status === '0')
    $scope.stat='1';
  else
    $scope.stat='0';
  var activitiesDetails = {
    action:'status',
    id:$scope.activities[id-1].id,
    active:$scope.stat
  };
  console.log(activitiesDetails);
  var responsePromise = UtilsFactory.doPostCall ('/user/continent', activitiesDetails);
      responsePromise.then (function (response){

        console.log (response);

      });
}; /* statusContinent ends here */    
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

