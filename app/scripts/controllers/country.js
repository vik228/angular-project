'use strict';

zopkyFrontendApp.controller('countryController', function($scope,$http, UtilsFactory) {
$scope.countryController = {};

$scope.limit=10;
$scope.skip=0;

$scope.countries = [];
$scope.continents = [];
$scope.numRows=0;
$scope.numContinents=0;

$scope.getCountries = function(){
  var countries = [];
    var getUrl = "/country/get/?limit="+$scope.limit+"&skip="+$scope.skip;
    var responsePromise = UtilsFactory.doGetCall (getUrl);
      responsePromise.then (function (response){              
            if (response.status==200) {
              var data = response.data.response.message;
              
              for(var i=0; i<data.length; i++){
                $scope.numRows++;
                var row = {};
                row['sequence']=$scope.numRows;
                row['continentId']=data[i].continentId;
                row['continent']=data[i].continent;
                row['id']=data[i].id;
                row['status']=data[i].status;
                row['country']=data[i].name;
                countries.push(row);

              }

              if(data.length==0){
                window.alert("No more continents available")
              }
              console.log(countries);
              $scope.countries = $scope.countries.concat(countries);
            }

      }, function(error){
                var message = error.data.response.message.name[0].message;
                console.log(message);
               // window.alert(message);
        });
  
};

$scope.getCountries();

$scope.getMoreCountries = function(){
    $scope.skip=$scope.countries.length;
    $scope.getCountries();
};

// $scope.countries = [

// {id:1, continent: "Asia", continentId: 1, country:"India", status:'false' },
// {id:2, continent: "Asia", continentId: 1, country:"Sangapore", status:'true' },
// {id:3, continent: "Asia", continentId: 1, country:'Dummy2',  status:'true' },
// {id:4, continent: "Asia", continentId: 1, country:'Dummy3',  status:'false' },
// {id:5, continent: "Asia", continentId: 1, country:'Dummy4',  status:'true' },
// {id:6, continent: "Asia", continentId: 1, country:'Dummy5',  status:'false' },

// ];

$scope.getActiveContinents = function(){
  var continents = [];
    var getUrl = "/continent/get/?limit="+$scope.limit+"&skip="+$scope.skip+"&active=true";
    var responsePromise = UtilsFactory.doGetCall (getUrl);
      responsePromise.then (function (response){
                
            if (response.status==200) {
              var data = response.data.response.message;
              
              for(var i=0; i<data.length; i++){
                $scope.numContinents++;
                var row = {};
                row['sequence']=$scope.numContinents;
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

$scope.getActiveContinents();
// $scope.continents = [

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

$scope.editActivity = function(id) {
  if (id == 'new') {
      $scope.formTitle = 'Create New Country';
      $scope.act ='add';
      $scope.countryController.country = '';
      $scope.countryController.continent = '';

    } else {
      $scope.formTitle = 'Edit Country';
      $scope.act ='update';
      $scope.oldCountryName = $scope.countries[id-1].country;
      $scope.oldContinentId = $scope.countries[id-1].continentId;
      $scope.countryController.country = $scope.countries[id-1].country; 
      $scope.countryController.continent = $scope.countries[id-1].continentId;
      console.log($scope.countries[id-1].continentId);
  }
};


$scope.showModal = false;
  $scope.toggleModal = function(){
      $scope.showModal = !$scope.showModal;
    };

/* saveCountry function inserts country information in the database*/
$scope.saveCountry = function() {
  
    if($scope.act === 'add'){
      var countryDetails =[ {
        continent:$scope.countryController.continent,
        name:$scope.countryController.country
      }];

      if($scope.countryController.continent == "" || $scope.countryController.country ==""){
        console.log("null values");
      }else {
        console.log(countryDetails);
        var responsePromise = UtilsFactory.doPostCall ('/country/add', countryDetails);
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
    var countryDetails ={
      findCriteria:{
        continent:$scope.oldContinentId,
        name:$scope.oldCountryName
      }, 
      recordsToUpdate:{
        continent:$scope.countryController.continent,
        name:$scope.countryController.country
      }
    };
    console.log(countryDetails);

    var responsePromise = UtilsFactory.doPostCall ('/country/update', countryDetails);
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
}; /* saveCountry ends here */

/* statusCountry function activates or deactivates country information from database*/
$scope.statusCountry = function(id) {

      console.log(id);

    var countryDetails ={
      findCriteria:{
        continent:$scope.countries[id-1].continentId,
        name:$scope.countries[id-1].country
      }, 
      recordsToUpdate:{
        continent:$scope.countries[id-1].continentId,
        name:$scope.countries[id-1].country,
        "active": !$scope.countries[id-1].status
      }
    };

$scope.countries[id-1].status = !$scope.countries[id-1].status ;
  console.log(countryDetails);
  var responsePromise = UtilsFactory.doPostCall ('/country/update', countryDetails);
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