'use strict';

zopkyFrontendApp.controller('itineraryhomeController', function($scope,$http, UtilsFactory) {
$scope.itineraryhomeController = {};

$scope.cities = [
{id:1, city:'Mumbai'},
{id:2, city:'Delhi'},
{id:3, city:'Bangalore' }
]; 

$scope.redirect = function(){
  window.location.href= "#/itinerary";
} 
});