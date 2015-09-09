'use strict';

zopkyFrontendApp.controller('itinerarydescController', ["$scope", "$http", "UtilsFactory", function($scope,$http, UtilsFactory) {
$scope.itinerarydescController = {};

$scope.redirect = function(){
  window.location.href= "#/itinerary";
} 
}]);