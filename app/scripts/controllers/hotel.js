'use strict';

zopkyFrontendApp.controller('hotelController', function($scope,$http,UtilsFactory) {
$scope.hotelController = {};

$scope.hotels = [
{id:1,  hotelName:'Taj Hotel', city:'New Delhi', address:'address 1', star:'5', swimmingPool:'true', freeWifi:'true', gym:'false', restaurant:'true', lat: '19.2302', long:'72.409202', status:'0', pincode:'110001', price:'2200', currency:'INR', checkin_time:'1200',checkout_time:'1100'},
{id:2,  hotelName:'Marriott', city:'Hyderabad',  address:'address 1',star:'4', swimmingPool:'true', freeWifi:'false', gym:'true', restaurant:'true',lat: '19.2302', long:'72.409202', status:'1', pincode:'110001', price:'2200', currency:'INR', checkin_time:'1200',checkout_time:'1100'},
{id:3,  hotelName:'Giner', city:'Kolkata',  address:'address 1', star:'5', swimmingPool:'false', freeWifi:'true', gym:'false',restaurant:'false', lat: '19.2302', long:'72.409202', status:'0', pincode:'110001', price:'2200', currency:'INR', checkin_time:'1200',checkout_time:'1100'},
{id:4,  hotelName:'Hayatt', city:'London', address:'address 1', star:'5', swimmingPool:'false', freeWifi:'false', gym:'true', restaurant:'true', lat: '19.2302', long:'72.409202', status:'0', pincode:'110001', price:'2200', currency:'INR', checkin_time:'1200',checkout_time:'1100'},
{id:5,  hotelName:'Sai Palace', city:'Germany', address:'address 1', star:'3', swimmingPool:'true', freeWifi:'true', gym:'true', restaurant:'false', lat: '19.2302', long:'72.409202', status:'1', pincode:'110001', price:'2200', currency:'INR', checkin_time:'1200',checkout_time:'1100'},
{id:6,  hotelName:'Oberoi hotel', city:'China', address:'address 1', star:'4', swimmingPool:'true', freeWifi:'true', gym:'true', restaurant:'false', lat: '19.2302', long:'72.409202', status:'0', pincode:'110001', price:'2200', currency:'INR', checkin_time:'1200',checkout_time:'1100'},
]; 

$scope.rooms = [
{id:1, type:'Deluxe AC', capacity: '2', status:'false', price:'2000'},
{id:2, type:'Luxary AC', capacity: '3', status:'true', price:'2000'},
{id:3, type:'Single AC', capacity: '1', status:'false', price:'2000'},
{id:4, type:'Deluxe Non-AC', capacity: '2', status:'true', price:'2000'},
{id:5, type:'Regular AC', capacity: '1', status:'true', price:'2000'},
{id:6, type:'Regular Non-AC', capacity: '2', status:'false', price:'2000'}
]; 

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
    $scope.hotelController.address = '';
    $scope.hotelController.star = '';
    $scope.hotelController.lat = '';
    $scope.hotelController.long = '';
    $scope.hotelController.swimmingPool = 'Select';
    $scope.hotelController.freeWifi = 'Select';
    $scope.hotelController.gym = 'Select';
    $scope.hotelController.restaurant = 'Select';

    } 
  else {
      if(edit ==='show')
          $scope.formTitle = 'Hotel Details';
        else
          $scope.formTitle = 'Edit Hotel';
    $scope.act ='update';
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

/* saveHotel function inserts hotel information in the database*/
$scope.saveHotel = function() {
  var location = {
    lat: $scope.hotelController.lat,
    lon: $scope.hotelController.long
  }
  var amenities = {
    swimmingPool:$scope.hotelController.swimmingPool === 'Yes'? 'true' : 'false', 
    freeWifi: $scope.hotelController.freeWifi === 'Yes'? 'true' : 'false', 
    gym: $scope.hotelController.gym === 'Yes'? 'true' : 'false', 
    restaurant: $scope.hotelController.restaurant === 'Yes'? 'true' : 'false'
  }

  var prices =[];
  angular.forEach($scope.rooms, function(value, key){
    var price={type: value.type, price:value.price};
    prices.push(price);
  });
  var hotelDetails = {
    name:$scope.hotelController.hotelName,
    city:$scope.hotelController.city,
    //pincode
    address:$scope.hotelController.address,
    star:$scope.hotelController.star,
    location: JSON.stringify(location), 
    //price
    //checkin_time
    //checkout_time
    //amenities will have swimmingPool,freeWifi,gym, restaurant
    amenities: JSON.stringify(amenities),
    prices: JSON.stringify(prices)
  };

  console.log(hotelDetails);
  if($scope.act === 'add')
    var responsePromise = UtilsFactory.doPostCall ('/hotel/add', hotelDetails);
  else if($scope.act === 'update')
    var responsePromise = UtilsFactory.doPostCall ('/hotel/update', hotelDetails);
      responsePromise.then (function (response){

        console.log (response);

      });
}; /* saveHotel ends here */

/* statusHotel function activates or deactivates Continent information from database*/
$scope.statusHotel = function(id) {
  $scope.hotels[id-1].status = !$scope.hotels[id-1].status ;
  var hotelDetails = {
    id:$scope.hotels[id-1].id,
    active:$scope.hotels[id-1].status
  };
  console.log(hotelDetails);
  var responsePromise = UtilsFactory.doPostCall ('/hotel/update', hotelDetails);
      responsePromise.then (function (response){

        console.log (response);

      });
}; /* statusContinent ends here */ 

$scope.toggleEnabled = function(){
  $scope.info = !$scope.info;
}

});