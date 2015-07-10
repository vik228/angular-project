'use strict';

zopkyFrontendApp.controller('continentController', function($scope,$http, UtilsFactory) {
$scope.continentController = {};

$scope.continents = [
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

$scope.editActivity = function(id) {
  if (id == 'new') {
    $scope.formTitle = 'Create New Continent';
  //  $scope.incomplete = true;
    $scope.act ='save';
    $scope.continentController.city = '';
    $scope.continentController.country = '';
    $scope.continentController.type = '';
    $scope.continentController.continent = '';
    $scope.continentController.state = '';
    $scope.continentController.lat = '';
    $scope.continentController.long = '';
    $scope.continentController.openTime = '';
    $scope.continentController.closeTime = '';
    } else {
    $scope.formTitle = 'Edit Continent';
    $scope.act ='update';
    $scope.continentController.city = $scope.continents[id-1].city; 
    $scope.continentController.country = $scope.continents[id-1].country; 
    $scope.continentController.type = $scope.continents[id-1].type; 
    $scope.continentController.continent = $scope.continents[id-1].continent;
    $scope.continentController.state = $scope.continents[id-1].state; 
    $scope.continentController.lat = $scope.continents[id-1].lat; 
    $scope.continentController.long  = $scope.continents[id-1].long; 
    $scope.continentController.openTime  = $scope.continents[id-1].openTime; 
    $scope.continentController.closeTime  = $scope.continents[id-1].closeTime; 
  }
};

$scope.showModal = false;
  $scope.toggleModal = function(){
      $scope.showModal = !$scope.showModal;
    };

/* saveContinent function inserts continent information in the database*/
$scope.saveContinent = function() {
  var continentDetails = {
    action:$scope.act,
    continent:$scope.continentController.continent,
    country:$scope.continentController.country,
    city:$scope.continentController.city,
    state:$scope.continentController.state,
    type:$scope.continentController.type,
    lat: $scope.continentController.lat,
    long: $scope.continentController.long, 
    openTime: $scope.continentController.openTime, 
    closeTime: $scope.continentController.closeTime
  };

  console.log(continentDetails);

  var responsePromise = UtilsFactory.doPostCall ('/user/continent', continentDetails);
      responsePromise.then (function (response){

        console.log (response);

      });
}; /* saveContinent ends here */

/* statusContinent function activates or deactivates Continent information from database*/
$scope.statusContinent = function(id) {
  if($scope.continents[id-1].status === '0')
    $scope.stat='1';
  else
    $scope.stat='0';
  var employeeDetails = {
    action:'status',
    id:$scope.continents[id-1].id,
    active:$scope.stat
  };
  console.log(employeeDetails);
  var responsePromise = UtilsFactory.doPostCall ('/user/continent', employeeDetails);
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

});