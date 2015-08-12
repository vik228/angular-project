'use strict';

zopkyFrontendApp.controller('stateController', function($scope, $http, UtilsFactory) {
$scope.stateController = {};
$scope.states = [];
 $scope.countries = [];

$scope.limit=10;
$scope.skip=0;
$scope.numRows=0;
$scope.numCountries=0;

$scope.getStates = function(){
  var states = [];
    var getUrl = "/state/get/?limit="+$scope.limit+"&skip="+$scope.skip;
    var responsePromise = UtilsFactory.doGetCall (getUrl);
      responsePromise.then (function (response){              
            if (response.status==200) {
              var data = response.data.response.message;
              
              for(var i=0; i<data.length; i++){
                $scope.numRows++;
                var row = {};
                row['sequence']=$scope.numRows;
                row['countryId']=data[i].countryId;
                row['country']=data[i].country;
                row['id']=data[i].id;
                row['status']=data[i].status;
                row['state']=data[i].name;
                states.push(row);

              }

              if(data.length==0){
                window.alert("No more continents available")
              }
              console.log(states);
              $scope.states = $scope.states.concat(states);
            }

      }, function(error){
                var message = error.data.response.message.name[0].message;
                console.log(message);
               // window.alert(message);
        });
  
};

$scope.getStates();

$scope.getMoreStates = function(){
    $scope.skip=$scope.states.length;
    $scope.getStates();
};

// $scope.states = [
// {id:1, activityName:'Gateway of India', continent: "Asia", country:"India", state:"Maharashtra", city:'Mumbai',   type:"Place", lat: '19.2302', long:'72.409202', openTime: '2 pm', closeTime: '5 pm', status:'1' },
// {id:2, activityName:'Act1', continent: "Asia", country:"Sangapore", state:"Dummy1",  city:'Dummy1', type:"Place", lat: '19.2302', long:'72.409202', openTime: '2 pm', closeTime: '5 pm', status:'0' },
// {id:3, activityName:'Act2', continent: "Asia", country:'Dummy2',    state:"Dummy2",  city:'Dummy2', type:"Place", lat: '19.2302', long:'72.409202', openTime: '2 pm', closeTime: '5 pm', status:'1' },
// {id:4, activityName:'Act3', continent: "Asia", country:'Dummy3',    state:"Dummy3",  city:'Dummy3', type:"Place", lat: '19.2302', long:'72.409202', openTime: '2 pm', closeTime: '5 pm', status:'1' },
// {id:5, activityName:'Act4', continent: "Asia", country:'Dummy4',    state:"Dummy4",  city:'Dummy4', type:"Place", lat: '19.2302', long:'72.409202', openTime: '2 pm' , closeTime: '5 pm', status:'0' },
// {id:6, activityName:'Act5', continent: "Asia", country:'Dummy5',    state:"Dummy5",  city:'Dummy5', type:"Place", lat: '19.2302', long:'72.409202', openTime: '2 pm' , closeTime: '5 pm', status:'0' },
// ];

$scope.edit = true;
$scope.error = false;
$scope.incomplete = false; 

$scope.getActiveCountries = function(){
  var countries = [];
    var getUrl = "/country/get/?limit=100&skip=0&active=true";
    var responsePromise = UtilsFactory.doGetCall (getUrl);
      responsePromise.then (function (response){
                
            if (response.status==200) {
              var data = response.data.response.message;
              
              for(var i=0; i<data.length; i++){
                $scope.numCountries++;
                var row = {};
                row['sequence']=$scope.numCountries;
                row['id']=data[i].id;
                row['country']=data[i].name;
                countries.push(row);
              }

              // if(data.length==0){
              //   window.alert("No more countries available")
              // }
              console.log(countries);
              $scope.countries = $scope.countries.concat(countries);
            }

      }, function(error){
                var message = error.data.response.message.name[0].message;
                console.log(message);
               // window.alert(message);
        });
  
};

$scope.getActiveCountries();

$scope.editState = function(id) {
  if (id == 'new') {
      $scope.formTitle = 'Create New Country';
      $scope.act ='add';
      $scope.stateController.country = '';
      $scope.stateController.state = '';

    } else {
      $scope.formTitle = 'Edit Country';
      $scope.act ='update';
      // console.log($scope.states[id-1]);
      $scope.oldStateName = $scope.states[id-1].state;
      $scope.oldCountryId = $scope.states[id-1].countryId;
      $scope.stateController.country = $scope.states[id-1].country; 
      $scope.stateController.state = $scope.states[id-1].state; 
  }
};


$scope.showModal = false;
  $scope.toggleModal = function(){
      $scope.showModal = !$scope.showModal;
    };

/* saveState function inserts state information in the database*/
$scope.saveState = function() {
  
    if($scope.act === 'add'){
      var stateDetails =[ {
        country:$scope.stateController.country,
        name:$scope.stateController.state
      }];

      if($scope.stateController.state == "" || $scope.stateController.country ==""){
        console.log("null values");
      }else {
        console.log(stateDetails);
        var responsePromise = UtilsFactory.doPostCall ('/state/add', stateDetails);
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
    var stateDetails ={
      findCriteria:{
        country:$scope.oldCountryId,
        name:$scope.oldStateName
      }, 
      recordsToUpdate:{
        country:$scope.stateController.country,
        name:$scope.stateController.state
      }
    };
    console.log(stateDetails);

    var responsePromise = UtilsFactory.doPostCall ('/state/update', stateDetails);
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
};/* saveState ends here */

/* statusState function activates or deactivates state information from database*/

$scope.statusState = function(id) {
    var stateDetails ={
      findCriteria:{
        country:$scope.states[id-1].countryId,
        name:$scope.states[id-1].state
      }, 
      recordsToUpdate:{
        country:$scope.states[id-1].countryId,
        name:$scope.states[id-1].state,
        "active": !$scope.states[id-1].status
      }
    };

$scope.states[id-1].status = !$scope.states[id-1].status ;
  console.log(stateDetails);
  var responsePromise = UtilsFactory.doPostCall ('/state/update', stateDetails);
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
}; /* statusState ends here */
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