'use strict';

zopkyFrontendApp.controller('cityController', function($scope, $http, UtilsFactory) {
$scope.cityController = {};

$scope.states = [];
$scope.cities = [];

$scope.limit=10;
$scope.skip=0;
$scope.numRows=0;
$scope.numStates=0;

$scope.getCities = function(){
  var cities = [];
    var getUrl = "/city/get/?limit="+$scope.limit+"&skip="+$scope.skip;
    var responsePromise = UtilsFactory.doGetCall (getUrl);
      responsePromise.then (function (response){              
            if (response.status==200) {
              var data = response.data.response.message;
              
              for(var i=0; i<data.length; i++){
                $scope.numRows++;
                var row = {};
                row['sequence']=$scope.numRows;
                row['stateId']=data[i].stateId;
                row['state']=data[i].state;
                row['id']=data[i].id;
                row['status']=data[i].status;
                row['city']=data[i].name;
                cities.push(row);

              }

              if(data.length==0){
                window.alert("No more continents available")
              }
              console.log(cities);
              $scope.cities = $scope.cities.concat(cities);
            }

      }, function(error){
                var message = error.data.response.message.name[0].message;
                console.log(message);
               // window.alert(message);
        });
  
};

$scope.getCities();

$scope.getMoreCities = function(){
    $scope.skip=$scope.cities.length;
    $scope.getCities();
};

// $scope.cities = [
// {id:1, activityName:'Gateway of India', continent: "Asia", country:"India", state:"Maharashtra", city:'Mumbai',   type:"Place", lat: '19.2302', long:'72.409202', openTime: '2 pm', closeTime: '5 pm', status:'false' },
// {id:2, activityName:'Act1', continent: "Asia", country:"Sangapore", state:"Dummy1",  city:'Dummy1', type:"Place", lat: '19.2302', long:'72.409202', openTime: '2 pm', closeTime: '5 pm', status:'true' },
// {id:3, activityName:'Act2', continent: "Asia", country:'Dummy2',    state:"Dummy2",  city:'Dummy2', type:"Place", lat: '19.2302', long:'72.409202', openTime: '2 pm', closeTime: '5 pm', status:'true' },
// {id:4, activityName:'Act3', continent: "Asia", country:'Dummy3',    state:"Dummy3",  city:'Dummy3', type:"Place", lat: '19.2302', long:'72.409202', openTime: '2 pm', closeTime: '5 pm', status:'false' },
// {id:5, activityName:'Act4', continent: "Asia", country:'Dummy4',    state:"Dummy4",  city:'Dummy4', type:"Place", lat: '19.2302', long:'72.409202', openTime: '2 pm', closeTime: '5 pm', status:'true' },
// {id:6, activityName:'Act5', continent: "Asia", country:'Dummy5',    state:"Dummy5",  city:'Dummy5', type:"Place", lat: '19.2302', long:'72.409202', openTime: '2 pm', closeTime: '5 pm', status:'false' },
// ];

$scope.edit = true;
$scope.error = false;
$scope.incomplete = false; 

$scope.getActiveStates = function(){
  var states = [];
    var getUrl = "/state/get/?limit=100&skip=0&active=true";
    var responsePromise = UtilsFactory.doGetCall (getUrl);
      responsePromise.then (function (response){
                
            if (response.status==200) {
              var data = response.data.response.message;
              
              for(var i=0; i<data.length; i++){
                $scope.numStates++;
                var row = {};
                row['sequence']=$scope.numStates;
                row['id']=data[i].id;
                row['state']=data[i].name;
                states.push(row);
              }

              // if(data.length==0){
              //   window.alert("No more states available")
              // }
              console.log(states);
              $scope.states = $scope.states.concat(states);
            }

      }, function(error){
                var message = error.data.response.message.name[0].message;
                console.log(message);
               // window.alert(message);
        });
  
};

$scope.getActiveStates();

$scope.editCity = function(id) {
  if (id == 'new') {
    $scope.formTitle = 'Create New City';
    $scope.act ='add';
    $scope.cityController.city = '';
    $scope.cityController.state = '';
    } else {
    $scope.formTitle = 'Edit City';
    $scope.act ='update';
    $scope.oldCityName = $scope.cities[id-1].city;
    $scope.oldStateId = $scope.cities[id-1].stateId;
    $scope.cityController.city = $scope.cities[id-1].city; 
    $scope.cityController.state = $scope.cities[id-1].state;
  }
};

$scope.showModal = false;
  $scope.toggleModal = function(){
      $scope.showModal = !$scope.showModal;
    };

/* saveCity function inserts city information in the database*/
$scope.saveCity = function() {
  
    if($scope.act === 'add'){
      var cityDetails =[ {
        name:$scope.cityController.city,
        state:$scope.cityController.state
      }];

      if($scope.cityController.state == "" || $scope.cityController.city ==""){
        console.log("null values");
      }else {
        console.log(cityDetails);
        var responsePromise = UtilsFactory.doPostCall ('/city/add', cityDetails);
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
  }else if($scope.act === 'update'){
    var cityDetails ={
      findCriteria:{
        state:$scope.oldStateId,
        name:$scope.oldCityName
      }, 
      recordsToUpdate:{
        state:$scope.cityController.state,
        name:$scope.cityController.city
      }
    };
    console.log(cityDetails);

    var responsePromise = UtilsFactory.doPostCall ('/city/update', cityDetails);
      responsePromise.then (function (response){
            var data = response.data['response'];
                //console.log(data);
            if (response.status==200) {
              $scope.toggleModal();
              var message = data['message'];
              $window.alert(message);
            }

      }, function(error){
                $scope.toggleModal();
                var message = error.data.response.message.name[0].message;
                console.log(message);
                $window.alert(message);
        });
  }
};/* saveCity ends here */

/* statusCity function activates or deactivates city information from database*/ 

$scope.statusCity = function(id) {
    var cityDetails ={
      findCriteria:{
        state:$scope.cities[id-1].stateId,
        name:$scope.cities[id-1].city
      }, 
      recordsToUpdate:{
        state:$scope.cities[id-1].stateId,
        name:$scope.cities[id-1].city,
        "active": !$scope.cities[id-1].status
      }
    };

  console.log(cityDetails);
  var responsePromise = UtilsFactory.doPostCall ('/city/update', cityDetails);
      responsePromise.then (function (response){
                var data = response.data['response'];
                //console.log(data);
            if (response.status==200) {
              $scope.cities[id-1].status = !$scope.cities[id-1].status ;
              var message = data['message'];
              $window.alert(message);
            }

      }, function(error){
                var message = error.data.response.message.name[0].message;
                console.log(message);
                $window.alert(message);
        });
};/* statusCity ends here */
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