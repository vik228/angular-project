'use strict';

zopkyFrontendApp.controller('itinerarydescController', function($scope,$http, UtilsFactory) {
$scope.itinerarydescController = {};

$scope.redirect = function(){
  window.location.href= "#/itinerary";
} 
});