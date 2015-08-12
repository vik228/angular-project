'use strict';

zopkyFrontendApp.controller('continentController', function($scope,$http, UtilsFactory) {
$scope.continentController = {};
$scope.continents = [];

$scope.limit=2;
$scope.skip=0;


// //TODO: get list from api
// {id:1, continent: "Asia", status:'false'},
// {id:2, continent: "Europe", status:'true'},
// {id:3, continent: "America", status:'true'},
// {id:4, continent: "Australia", status:'false'},
// {id:5, continent: "Russia", status:'false'},
// {id:6, continent: "Africa", status:'true'},
// ];

$scope.edit = true;
$scope.error = false;
$scope.incomplete = false;

$scope.numRows=0; 

$scope.getContinents = function(){
  var continents = [];
    var getUrl = "/continent/get/?limit="+$scope.limit+"&skip="+$scope.skip;
    var responsePromise = UtilsFactory.doGetCall (getUrl);
      responsePromise.then (function (response){
                
            if (response.status==200) {
              var data = response.data.response.message;
              
              for(var i=0; i<data.length; i++){
                $scope.numRows++;
                var row = {};
                row['sequence']=$scope.numRows;
                row['continent']=data[i].continent;
                row['id']=data[i].id;
                row['status']=data[i].status;
                continents.push(row);

              }

              if(data.length==0){
                window.alert("No more continents available")
              }
              console.log(continents);
              $scope.continents = $scope.continents.concat(continents);
            }

      }, function(error){
                var message = error.data.response.message.name[0].message;
                console.log(message);
               // window.alert(message);
        });
  
};

$scope.getContinents();

$scope.getMoreContinents = function(){
    $scope.skip=$scope.continents.length;
    $scope.getContinents();
};

$scope.editActivity = function(id) {
  if (id == 'new') {
    $scope.formTitle = 'Create New Continent';
  //  $scope.incomplete = true;
    $scope.act ='add';
    $scope.continentController.continent = '';

    } else {

    $scope.formTitle = 'Edit Continent';
    $scope.act ='update';
    $scope.oldName = $scope.continents[id-1].continent;
    $scope.continentController.continent = $scope.continents[id-1].continent;
  }
};

$scope.showModal = false;
  $scope.toggleModal = function(){
      $scope.showModal = !$scope.showModal;
    };

/* saveContinent function inserts continent information in the database*/
$scope.saveContinent = function() {
  
  if($scope.act === 'add'){
    var continentDetails =[ {
      name:$scope.continentController.continent
    }];
    var responsePromise = UtilsFactory.doPostCall ('/continent/add', continentDetails);
    responsePromise.then (function (response){

                var data = response.data['response'];
                //console.log(data);
            if (response.status==200) {
              $scope.toggleModal();
              var message = data['message'];
              window.alert(message);
            }

      }, function(error){
        $scope.toggleModal();
                var message = error.data.response.message.name[0].message;
                console.log(message);
                window.alert(message);
        });
  }else if($scope.act === 'update'){
    var continentDetails ={
      findCriteria:{"name":$scope.oldName}, 
      recordsToUpdate:{"name":$scope.continentController.continent}
    };
    console.log(continentDetails);

    var responsePromise = UtilsFactory.doPostCall ('/continent/update', continentDetails);
      responsePromise.then (function (response){
                var data = response.data['response'];
                //console.log(data);
            if (response.status==200) {
              $scope.toggleModal();
              var message = data['message'];
              window.alert(message);
            }

      }, function(error){
        $scope.toggleModal();
                var message = error.data.response.message.name[0].message;
                console.log(message);
                window.alert(message);
        });
  }
}; /* saveContinent ends here */

/* statusContinent function activates or deactivates Continent information from database*/
$scope.statusContinent = function(id) {

console.log(id);
  var oldName = $scope.continents[id-1].continent;
  console.log(oldName);
  var continentDetails = {
    id:$scope.continents[id-1].id,
    active:$scope.continents[id-1].status 
  };

  var continentDetails ={
      findCriteria:{"name":$scope.continents[id-1].continent}, 
      recordsToUpdate:{"name":$scope.continents[id-1].continent, "active": !$scope.continents[id-1].status}
    };

$scope.continents[id-1].status = !$scope.continents[id-1].status ;
  console.log(continentDetails);
  var responsePromise = UtilsFactory.doPostCall ('/continent/update', continentDetails);
      responsePromise.then (function (response){
                var data = response.data['response'];
                //console.log(data);
            if (response.status==200) {
              var message = data['message'];
              window.alert(message);
            }

      }, function(error){
                var message = error.data.response.message.name[0].message;
                console.log(message);
                window.alert(message);
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