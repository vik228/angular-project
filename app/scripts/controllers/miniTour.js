'use strict';

zopkyFrontendApp.controller('minitourController', ["$scope", "$http", "UtilsFactory", "CommonMethods", function($scope,$http,UtilsFactory, CommonMethods) {
  $scope.minitourController = {};
  $scope.searchString="";
  $scope.minitours =[];
  $scope.limit = 10;
  $scope.page=1;
  $scope.activities=[];

  $scope.countries = [];
  $scope.states = [];
  $scope.cities = [];
  $scope.scountries = [];
  $scope.sstates = [];
  $scope.scities = [];

  $scope.getMinitours = function(type) {
    if(type==0){
      $scope.minitours=[];
    }
    var criteria = "active=true&city="+$scope.minitourController.scity;
    CommonMethods.searchMinitours($scope.limit, $scope.page, criteria, $scope.minitours.length, "cities", function(data){
      if(data==[] && $scope.page>1){
        $window.alert("No more minitours available");
      }
      $scope.minitours = $scope.minitours.concat(data);
    });
  };

  $scope.getMinitours();

  $scope.getMoreMinitours = function(){
    $scope.page++;
    $scope.getMinitours();
  };
//
//$scope.minitours = [
//{id:1,  minitourName:'Mumbai Darshan', city:'New Delhi', activitiesInvolved:'rafting, road trip', description:'very adventurous', departureTime:'5am and 2pm', duration:'9', endTime:'2pm and 11pm', type:'Sightseeing', currency:'INR', price: '2000', highlights:'Attractive, must visit', notes:'notes goes here', lunch:'true', dinner:'true', inclusions:'inclusions goes here', excluisons:'excluisons goes here', transportType:'Cab', category:'Private', status:'true'},
//{id:2,  minitourName:'Mumbai Darshan', city:'New Delhi', activitiesInvolved:'rafting, road trip', description:'very adventurous', departureTime:'5am and 2pm', duration:'9', endTime:'2pm and 11pm', type:'Sightseeing', currency:'INR', price: '2000', highlights:'Attractive, must visit', notes:'notes goes here', lunch:'true', dinner:'true', inclusions:'inclusions goes here', excluisons:'excluisons goes here', transportType:'Cab', category:'SIC', status:'true'},
//{id:3,  minitourName:'Mumbai Darshan', city:'New Delhi', activitiesInvolved:'rafting, road trip', description:'very adventurous', departureTime:'5am and 2pm', duration:'9', endTime:'2pm and 11pm', type:'Sightseeing', currency:'INR', price: '2000', highlights:'Attractive, must visit', notes:'notes goes here', lunch:'true', dinner:'true', inclusions:'inclusions goes here', excluisons:'excluisons goes here', transportType:'Bus', category:'Private', status:'false'},
//{id:4,  minitourName:'Mumbai Darshan', city:'New Delhi', activitiesInvolved:'rafting, road trip', description:'very adventurous', departureTime:'5am and 2pm', duration:'9', endTime:'2pm and 11pm', type:'Sightseeing', currency:'INR', price: '2000', highlights:'Attractive, must visit', notes:'notes goes here', lunch:'true', dinner:'true', inclusions:'inclusions goes here', excluisons:'excluisons goes here', transportType:'Bus', category:'Private', status:'false'},
//{id:5,  minitourName:'Mumbai Darshan', city:'New Delhi', activitiesInvolved:'rafting, road trip', description:'very adventurous', departureTime:'5am and 2pm', duration:'9', endTime:'2pm and 11pm', type:'Sightseeing', currency:'INR', price: '2000', highlights:'Attractive, must visit', notes:'notes goes here', lunch:'true', dinner:'true', inclusions:'inclusions goes here', excluisons:'excluisons goes here', transportType:'Van', category:'SIC', status:'true'},
//{id:6,  minitourName:'Mumbai Darshan', city:'New Delhi', activitiesInvolved:'rafting, road trip', description:'very adventurous', departureTime:'5am and 2pm', duration:'9', endTime:'2pm and 11pm', type:'Sightseeing', currency:'INR', price: '2000', highlights:'Attractive, must visit', notes:'notes goes here', lunch:'true', dinner:'true', inclusions:'inclusions goes here', excluisons:'excluisons goes here', transportType:'Cab', category:'Private', status:'false'},
//];

  $scope.getActiveCountries = function(){
    var criteria ="active=true";
    CommonMethods.searchCountries(100, 1, criteria, 0, "countries", function(data){
      $scope.countries =data;
      $scope.minitourController.state = "";
      $scope.minitourController.city = "";
      $scope.minitourController.sstate = "";
      $scope.minitourController.scity = "";
    });
  };

  $scope.getActiveStatesByCountries = function(type){
    if(type==0) {
      var criteria = "active=true&country="+$scope.minitourController.scountry;
    }else{
      var criteria = "active=true&country="+$scope.minitourController.country;
    }
    CommonMethods.searchStates(100,1,criteria, 0, "cities", function(data){
      if(type==0) {
        $scope.sstates = data;
        $scope.hotels=[];
        $scope.minitourController.scity = "";
      }else{
        $scope.states=data;
        $scope.minitourController.city = "";
      }
    });
  };

  $scope.getActiveCitiesByStates = function(type){
    if(type==0) {
      var criteria = "active=true&state="+$scope.minitourController.sstate;
    }else{
      var criteria = "active=true&state="+$scope.minitourController.state;
    }
    CommonMethods.searchCities(100,1,criteria, $scope.cities.length, "cities", function(data){
      if(type==0) {
        $scope.scities = data;
        $scope.hotels=[];
      }else{
        $scope.cities=data;
      }
    });
  };

  $scope.getActiveCountries();

  $scope.getActivitiesByCity = function() {
    $scope.activities=[];
    var criteria= "active=true&city="+$scope.minitourController.city;
    CommonMethods.searchActivities($scope.limit, $scope.page, criteria, $scope.activities.length, function(data) {
      $scope.activities = $scope.activities.concat(data);
    });
  };

  $scope.edit = true;
  $scope.error = false;
  $scope.incomplete = false;
  $scope.info= false;

  $scope.searchByName = function(){
    //Todo: search and display
  }

  $scope.getMoreTours = function(){
    //TODO: get more tours
  }
/* To edit minitour */

$scope.editMinitour = function(id,edit) {
  if(edit ==='show')
    $scope.info=true;
  else
    $scope.info=false;

  if (edit == 'new') {
    $scope.formTitle = 'Create New Mini Tour';
    $scope.act ='add';
    $scope.minitourController.minitourName = '';
    $scope.minitourController.city = '';
    $scope.minitourController.activitiesInvolved = '';
    $scope.minitourController.description = '';
    $scope.minitourController.departureTime = '';
    $scope.minitourController.duration = '';
    $scope.minitourController.endTime = '';
    $scope.minitourController.type = '';
    $scope.minitourController.price = '';
    $scope.minitourController.currency = '';
    $scope.minitourController.highlights = '';
    $scope.minitourController.notes = '';
    $scope.minitourController.lunch = 'Select';
    $scope.minitourController.dinner = 'Select';
    $scope.minitourController.inclusions = '';
    $scope.minitourController.excluisons = '';
    $scope.minitourController.transportType = 'Select';
    $scope.minitourController.category = 'Select';
    }
  else {
      if(edit ==='show')
          $scope.formTitle = 'Minitour Details';
        else
          $scope.formTitle = 'Edit Mini Tour';
    $scope.act ='update';

    $scope.oldname = $scope.minitours[id-1].name;
    $scope.oldcity = $scope.minitours[id-1].city;
    $scope.oldId = $scope.minitours[id-1].id;

    $scope.minitourController.minitourName = $scope.minitours[id-1].name;
    $scope.minitourController.city = $scope.minitours[id-1].city;
    $scope.minitourController.activitiesInvolved = $scope.minitours[id-1].activities;
    $scope.minitourController.description = $scope.minitours[id-1].description;
    $scope.minitourController.departureTime = $scope.minitours[id-1].pickuptime;
    $scope.minitourController.duration = $scope.minitours[id-1].duration;
    $scope.minitourController.endTime  = $scope.minitours[id-1].droptime;
    $scope.minitourController.type  = $scope.minitours[id-1].type;
    $scope.minitourController.price = $scope.minitours[id-1].price;
    $scope.minitourController.highlights = $scope.minitours[id-1].highlights;
    $scope.minitourController.notes = $scope.minitours[id-1].notes;
    $scope.minitourController.lunch = $scope.minitours[id-1].lunch === 'true'? 'Yes' : 'No';
    $scope.minitourController.dinner = $scope.minitours[id-1].dinner === 'true'? 'Yes' : 'No';
    $scope.minitourController.inclusions = $scope.minitours[id-1].inclusions;
    $scope.minitourController.exclusions = $scope.minitours[id-1].exclusions;
    //$scope.minitourController.transportType = $scope.minitours[id-1].transportType;
    //$scope.minitourController.category = $scope.minitours[id-1].category;
  }
};

$scope.showModal = false;
  $scope.toggleModal = function(){
      $scope.showModal = !$scope.showModal;
    };

/* saveMinitour function inserts activities information in the database*/
//$scope.saveMinitour = function() {
//  //var connectivity = {
//  //  busConnectivity: $scope.minitourController.busConnectivity === 'Yes'? 'true' : 'false',
//  //  metroConnectivity: $scope.minitourController.metroConnectivity === 'Yes'? 'true' : 'false',
//  //  taxiConnectivity: $scope.minitourController.taxiConnectivity === 'Yes'? 'true' : 'false'
//  //}
//  var minitourDetails = {
//    minitourName:$scope.minitourController.minitourName,
//    city:$scope.minitourController.city,
//    activitiesInvolved:$scope.minitourController.activitiesInvolved,
//    description:$scope.minitourController.description,
//    duration:$scope.minitourController.duration,
//    endTime:$scope.minitourController.endTime,
//    price: $scope.minitourController.price,
//    notes: $scope.minitourController.notes,
//    lunch:$scope.minitourController.lunch === 'Yes'? 'true' : 'false',
//    dinner:$scope.minitourController.dinner === 'Yes'? 'true' : 'false',
//    inclusions: $scope.minitourController.inclusions,
//    excluisons: $scope.minitourController.excluisons,
//    transportType:$scope.minitourController.transportType,
//    category:$scope.minitourController.category,
//    status: $scope.minitourController.status,
//  };
//
//  console.log(minitourDetails);
//  if($scope.act === 'add')
//    var responsePromise = UtilsFactory.doPostCall ('/minitour/add', minitourDetails);
//  else if($scope.act === 'update')
//    var responsePromise = UtilsFactory.doPostCall ('/minitour/update', minitourDetails);
//      responsePromise.then (function (response){
//
//        console.log (response);
//
//      });
//};

  $scope.saveMinitour = function() {

    var selectedActivities = [], activityObject = {};

    for (var i = 0; i < $scope.minitourController.activitiesInvolved.length; i++) {
      activityObject.id = $scope.minitourController.theme[i];
      selectedActivities.push(activityObject);
    }

    if($scope.act === 'add') {
      var minitourDetails = [{
        name:$scope.minitourController.minitourName,
        city:$scope.minitourController.city,
        activities:selectedActivities,
        description:$scope.minitourController.description,
        duration:$scope.minitourController.duration,
        pickuptime:$scope.minitourController.departureTime,
        price: $scope.minitourController.price,
        highlight: $scope.minitourController.highlight,
        lunch:$scope.minitourController.lunch === 'Yes'? 'true' : 'false',
        dinner:$scope.minitourController.dinner === 'Yes'? 'true' : 'false',
        inclusions: $scope.minitourController.inclusions,
        exclusions: $scope.minitourController.exclusions,
        //transportType:$scope.minitourController.transportType,
        type:$scope.minitourController.type,
        active: $scope.minitourController.status
      }];

      console.log(JSON.stringify(minitourDetails));

      var responsePromise = UtilsFactory.doPostCall ('/tour/add', minitourDetails);
      responsePromise.then (function (response){

        var data = response.data['response'];
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
      var minitourDetails ={
        findCriteria:{
          name:$scope.oldname,
          city:$scope.oldcity,
          id:$scope.oldId
        },
        recordsToUpdate:{
          name:$scope.minitourController.minitourName,
          city:$scope.minitourController.city,
          activities:selectedActivities,
          description:$scope.minitourController.description,
          duration:$scope.minitourController.duration,
          pickuptime:$scope.minitourController.departureTime,
          price: $scope.minitourController.price,
          highlight: $scope.minitourController.highlight,
          lunch:$scope.minitourController.lunch === 'Yes'? 'true' : 'false',
          dinner:$scope.minitourController.dinner === 'Yes'? 'true' : 'false',
          inclusions: $scope.minitourController.inclusions,
          exclusions: $scope.minitourController.exclusions,
          //transportType:$scope.minitourController.transportType,
          type:$scope.minitourController.type,
          active: $scope.minitourController.status
        }
      };
      console.log(minitourDetails);

      var responsePromise = UtilsFactory.doPostCall ('/tour/update', minitourDetails);
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
  };
/* saveContinent ends here */

/* statusMinitour function activates or deactivates MiniTours information from database*/

  $scope.statusMinitour = function(id) {
    console.log(id);
    var minitourDetails = {
      findCriteria: {
        id: $scope.minitours[id - 1].id,
        city:$scope.minitours[id-1].city,
        name: $scope.minitours[id - 1].name
      },
      recordsToUpdate: {
        id: $scope.minitours[id - 1].id,
        city:$scope.minitours[id-1].city,
        name: $scope.minitours[id - 1].name,
        active: !$scope.minitours[id - 1].status
      }
    };

    var responsePromise = UtilsFactory.doPostCall('/tour/update', minitourDetails);
    responsePromise.then(function(response) {
      var data = response.data['response'];
      //console.log(data);
      if (response.status == 200) {
        $scope.minitours[id - 1].status = !$scope.minitours[id - 1].status;
        var message = data['message'];
        window.alert(message);
      }

    }, function(error) {
      var message = error.data.response.message.name[0].message;
      console.log(message);
      window.alert(message);
    });
  };

$scope.toggleEnabled = function(){
  $scope.info = !$scope.info;
}

}]);
