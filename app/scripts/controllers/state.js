'use strict';

zopkyFrontendApp.controller('stateController',
  ["$scope", "$http", "UtilsFactory", "CommonMethods", '$rootScope','$timeout','dialogs',
    function($scope, $http, UtilsFactory, CommonMethods,$rootScope,$timeout, dialogs) {

      var _progress = 100;
      var _fakeWaitProgress = function(duration){
        $timeout(function(){
          $rootScope.$broadcast('dialogs.wait.complete');
        }, duration);
      };

$scope.stateController = {};
$scope.states = [];
 $scope.countries = [];

$scope.limit=10;
$scope.skip=0;
$scope.numRows=0;
$scope.numCountries=0;

$scope.getStates = function(){
  CommonMethods.getAllStates($scope.limit, $scope.skip, $scope.states.length, "states", function(data){
    $scope.states = $scope.states.concat(data);
  });
};

$scope.getStates();

$scope.getMoreStates = function(){
    $scope.skip=$scope.states.length;
    $scope.getStates();
};

$scope.edit = true;
$scope.error = false;
$scope.incomplete = false;

$scope.getActiveCountries = function(){
  var criteria ="active=true";
  CommonMethods.searchCountries(100, 0, criteria, $scope.countries.length, "countries", function(data){
    $scope.countries = $scope.countries.concat(data);
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
                //window.alert(message);
                dialogs.wait("Add state",message,_progress);
                _fakeWaitProgress(2000);
              }

        }, function(error){
          $scope.toggleModal();
                  var message = error.data.response.message.name[0].message;
                  //console.log(message);
                  //window.alert(message);
          dialogs.wait("Add state",message,0);
          _fakeWaitProgress(2000);
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
              //window.alert(message);
              dialogs.wait("Update state",message,_progress);
              _fakeWaitProgress(2000);
            }

      }, function(error){
        $scope.toggleModal();
                var message = error.data.response.message.name[0].message;
                //console.log(message);
                //window.alert(message);
        dialogs.wait("Update state",message,0);
        _fakeWaitProgress(2000);
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
              //window.alert(message);
              dialogs.wait("Change state's status",message,_progress);
              _fakeWaitProgress(1000);
            }

      }, function(error){
                var message = error.data.response.message.name[0].message;
                console.log(message);
                //window.alert(message);
        dialogs.wait("Change state's status",message,0);
        _fakeWaitProgress(1000);
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
}]);
