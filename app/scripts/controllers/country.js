'use strict';

zopkyFrontendApp.controller('countryController', function($scope,$http, UtilsFactory) {
$scope.countryController = {};

$scope.countries = [
{id:1, continent: "Asia", country:"India", status:'false' },
{id:2, continent: "Europe", country:"Sangapore", status:'true' },
{id:3, continent: "Asia", country:'Dummy2',  status:'true' },
{id:4, continent: "Australia", country:'Dummy3',  status:'false' },
{id:5, continent: "Russia", country:'Dummy4',  status:'true' },
{id:6, continent: "Asia", country:'Dummy5',  status:'false' },
];

$scope.edit = true;
$scope.error = false;
$scope.incomplete = false; 

$scope.editActivity = function(id) {
  if (id == 'new') {
    $scope.formTitle = 'Create New Country';
    $scope.act ='add';
    $scope.countryController.country = '';
    $scope.countryController.continent = '';
    } else {
    $scope.formTitle = 'Edit Country';
    $scope.act ='update';
    $scope.countryController.country = $scope.countries[id-1].country; 
    $scope.countryController.continent = $scope.countries[id-1].continent
  }
};


$scope.showModal = false;
  $scope.toggleModal = function(){
      $scope.showModal = !$scope.showModal;
    };

/* saveCountry function inserts country information in the database*/
$scope.saveCountry = function() {
  var countryDetails = {
    continent:$scope.countryController.continent,
    name:$scope.countryController.country
  };

  console.log(countryDetails);
  if($scope.act === 'add')
    var responsePromise = UtilsFactory.doPostCall ('/country/add', countryDetails);
  else if($scope.act === 'update')
    var responsePromise = UtilsFactory.doPostCall ('/country/update', countryDetails);

      responsePromise.then (function (response){

        console.log (response);

      });
}; /* saveCountry ends here */

/* statusCountry function activates or deactivates country information from database*/
$scope.statusCountry = function(id) {

  $scope.countries[id-1].status = !$scope.countries[id-1].status ;
  var countryDetails = {
    id:$scope.countries[id-1].id,
    active:$scope.countries[id-1].status
  };
  console.log(countryDetails);
  var responsePromise = UtilsFactory.doPostCall ('/country/update', countryDetails);
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