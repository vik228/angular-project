'use strict';

zopkyFrontendApp.controller('itineraryhotelController', ["$scope", "$http", "UtilsFactory", function($scope,$http, UtilsFactory) {
$scope.itineraryhotelController = {};
$scope.itineraryhotelController.cities = [];

$scope.cities = [
{id:1, city:'Mumbai'},
{id:2, city:'Delhi'},
{id:3, city:'Bangalore' }
]; 
$scope.nights = [
{id:1, city:'Mumbai'},
{id:2, city:'Delhi'},
{id:3, city:'Bangalore' }
]; 

$scope.redirect = function(){
  window.location.href= "#/idescription";
} 

}]);