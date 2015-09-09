'use strict';

zopkyFrontendApp.controller('hotelController', ["$scope", "$http", "$window", "UtilsFactory", "CommonMethods", function($scope,$http, $window, UtilsFactory, CommonMethods) {
$scope.hotelController = {};

  $scope.hotels =[];
  $scope.roomTypes = [];
  $scope.limit = 10;
  $scope.page=1;
  $scope.hotelController.hideTA = true;

  $scope.countries = [];
  $scope.states = [];
  $scope.cities = [];
  $scope.scountries = [];
  $scope.sstates = [];
  $scope.scities = [];
  $scope.googleLocations = [];
  $scope.taLocations=[];

  $scope.getCityName = function( array, value) {
    for(var i=0; i<array.length; i++){
      if(array[i].id == value){
        console.log(array[i]);
        return array[i].city;
      }
    }
  };

  $scope.getHotels = function(type) {
    if(type==0){
      $scope.hotels=[];
    }
    var criteria = "active=true&city="+$scope.hotelController.scity;
    CommonMethods.searchHotels($scope.limit, $scope.page, criteria, $scope.hotels.length, "cities", function(data){
      if(data==[] && $scope.page>1){
        $window.alert("No more hotels available");
      }
      $scope.hotels = $scope.hotels.concat(data);
    });
  };

  $scope.getHotels();

  $scope.getMoreHotels = function(){
    $scope.page++;
    $scope.getHotels();
  };

  $scope.getActiveCountries = function(){
    var criteria ="active=true";
    CommonMethods.searchCountries(100, 1, criteria, 0, "countries", function(data){
      $scope.countries =data;
      $scope.hotelController.state = "";
      $scope.hotelController.city = "";
      $scope.hotelController.sstate = "";
      $scope.hotelController.scity = "";
    });
  };

  $scope.getActiveStatesByCountries = function(type){
    if(type==0) {
      var criteria = "active=true&country="+$scope.hotelController.scountry;
    }else{
      var criteria = "active=true&country="+$scope.hotelController.country;
    }
    CommonMethods.searchStates(100,1,criteria, 0, "cities", function(data){
      if(type==0) {
        $scope.sstates = data;
        $scope.hotels=[];
        $scope.hotelController.scity = "";
      }else{
        $scope.states=data;
        $scope.hotelController.city = "";
      }
    });
  };

  $scope.getActiveCitiesByStates = function(type){
    if(type==0) {
      var criteria = "active=true&state="+$scope.hotelController.sstate;
    }else{
      var criteria = "active=true&state="+$scope.hotelController.state;
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

  $scope.getAllRoomTypes = function(){
    var criteria = "active=true";
    CommonMethods.getAllRoomTypes(100, 0, criteria, $scope.roomTypes.length, "cities", function(data){
      if(data==[] && $scope.page>1){
        $window.alert("No more room type available");
      }
      $scope.roomTypes = $scope.roomTypes.concat(data);
    });
  };

  $scope.getAllRoomTypes();

  $scope.getGoogleLocation = function(address) {
    CommonMethods.getGoogleLocation(($scope.hotelController.hotelName + ", " +$scope.hotelController.address+", "
    + $scope.getCityName($scope.cities, $scope.hotelController.city)).replace(" ", "%20"), function(data) {

      $scope.googleLocations = [];
      for (var i = 0; i < data.length; i++) {
        var response = {};
        response.name = data[i].formatted_address;
        response.location = data[i].geometry.location;
        $scope.googleLocations.push(response);
      }

    });
  };

  $scope.onLocationSelected = function(data) {
    console.log(data);

    $scope.hotelController.lat = data.location.lat;
    $scope.hotelController.long = data.location.lng;

    $scope.getTALocation();

  };

  $scope.getTALocation = function(){
    var address = ($scope.hotelController.hotelName).replace(" ", "%20");
    CommonMethods.getTALocations(address, $scope.hotelController.lat, $scope.hotelController.long, function(data){
      $scope.taLocations=[];
      for(var i=0; i<data.length; i++){
        var taLocation={};
        taLocation.location_id=data[i].location_id;
        taLocation.name=data[i].name;
        $scope.taLocations.push(taLocation);
      }

      $scope.hotelController.hideTA=false;
    });
  };


$scope.edit = true;
$scope.error = false;
$scope.incomplete = false;
$scope.info= false;


/* To edit hotel */

$scope.editHotel = function(id,edit) {
  if(edit ==='show')
    $scope.info=true;
  else
    $scope.info=false;

  if (id == 'new') {
    $scope.formTitle = 'Create New Hotel';
  //  $scope.incomplete = true;
    $scope.act ='add';
    $scope.hotelController.hotelName = '';
    $scope.hotelController.city = '';
    $scope.hotelController.country = $scope.hotelController.scountry;
    $scope.hotelController.state = '';
    $scope.hotelController.address = '';
    $scope.hotelController.star = '';
    $scope.hotelController.lat = '';
    $scope.hotelController.long = '';
    $scope.hotelController.swimmingPool = 'Select';
    $scope.hotelController.freeWifi = 'Select';
    $scope.hotelController.gym = 'Select';
    $scope.hotelController.restaurant = 'Select';
    $scope.hotelController.talocation='';

    }
  else {
      if(edit ==='show')
          $scope.formTitle = 'Hotel Details';
        else
          $scope.formTitle = 'Edit Hotel';
    $scope.act ='update';

    $scope.oldname = $scope.hotels[id-1].name;
    $scope.oldcity = $scope.hotels[id-1].city;
    $scope.oldId = $scope.hotels[id-1].id;

    $scope.hotelController.hotelName = $scope.hotels[id-1].hotelName;
    $scope.hotelController.city = $scope.hotels[id-1].city;
    $scope.hotelController.address = $scope.hotels[id-1].address;
    $scope.hotelController.star = $scope.hotels[id-1].star;
    $scope.hotelController.lat = $scope.hotels[id-1].lat;
    $scope.hotelController.long  = $scope.hotels[id-1].long;
    $scope.hotelController.swimmingPool = $scope.hotels[id-1].swimmingPool ==='true'? 'Yes' : 'No';
    $scope.hotelController.freeWifi  = $scope.hotels[id-1].freeWifi ==='true'? 'Yes' : 'No';
    $scope.hotelController.gym  = $scope.hotels[id-1].gym ==='true'? 'Yes' : 'No';
    $scope.hotelController.restaurant  = $scope.hotels[id-1].restaurant ==='true'? 'Yes' : 'No';
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

  $scope.redirect = function() {
    $window.location.href = "#/slider";
  };

/* saveHotel function inserts hotel information in the database*/
  $scope.saveHotel = function() {
      var location = {};
      location.lat = $scope.hotelController.lat;
      location.long = $scope.hotelController.long;

      var amenities = {
        swimming: $scope.hotelController.swimmingPool === 'Yes' ? 'true' : 'false',
        wifi: $scope.hotelController.freeWifi === 'Yes' ? 'true' : 'false',
        gym: $scope.hotelController.gym === 'Yes' ? 'true' : 'false',
        restaurant: $scope.hotelController.restaurant === 'Yes' ? 'true' : 'false'
      };

      var prices = [];
      angular.forEach($scope.roomTypes, function (value, key) {
        var price = {type: value.type, price: value.price};
        prices.push(price);
      });

    if($scope.act === 'add') {
      var hotelDetails = [{
        //action: $scope.act,
        city: $scope.hotelController.city,
        location: location,
        name: $scope.hotelController.hotelName,
        price: prices,
        location_id: $scope.hotelController.talocation,
        checkin: $scope.hotelController.checkin,
        checkout: $scope.hotelController.checkout,
        pincode: $scope.hotelController.pincode,
        currency: $scope.hotelController.currency,
        rating: $scope.hotelController.star,
        address:$scope.hotelController.address,
        amenities:amenities
      }];

      console.log(JSON.stringify(hotelDetails));

      var responsePromise = UtilsFactory.doPostCall ('/hotel/add', hotelDetails);
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
      var hotelDetails ={
        findCriteria:{
          name:$scope.oldname,
          city:$scope.oldcity,
          id:$scope.oldId
        },
        recordsToUpdate:{
          city: $scope.hotelController.city,
          location: location,
          name: $scope.hotelController.hotelName,
          price: prices,
          location_id: $scope.hotelController.talocation,
          checkin: $scope.hotelController.checkin,
          checkout: $scope.hotelController.checkout,
          pincode: $scope.hotelController.pincode,
          currency: $scope.hotelController.currency,
          rating: $scope.hotelController.star,
          address:$scope.hotelController.address,
          amenities:amenities
        }
      };
      console.log(hotelDetails);

      var responsePromise = UtilsFactory.doPostCall ('/hotel/update', hotelDetails);
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

/* statusHotel function activates or deactivates Continent information from database*/
  $scope.statusHotel = function(id) {
    console.log(id);
    var hotelDetails = {
      findCriteria: {
        id: $scope.hotels[id - 1].id,
        city:$scope.hotels[id-1].city,
        name: $scope.hotels[id - 1].name
      },
      recordsToUpdate: {
        id: $scope.hotels[id - 1].id,
        city:$scope.hotels[id-1].city,
        name: $scope.hotels[id - 1].name,
        active: !$scope.hotels[id - 1].status
      }
    };

    var responsePromise = UtilsFactory.doPostCall('/hotel/update', hotelDetails);
    responsePromise.then(function(response) {
      var data = response.data['response'];
      //console.log(data);
      if (response.status == 200) {
        $scope.hotels[id - 1].status = !$scope.hotels[id - 1].status;
        var message = data['message'];
        window.alert(message);
      }

    }, function(error) {
      var message = error.data.response.message.name[0].message;
      console.log(message);
      window.alert(message);
    });
  };/* statusContinent ends here */

$scope.toggleEnabled = function(){
  $scope.info = !$scope.info;
}

}]);
