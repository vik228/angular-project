'use strict';

/**
 * @ngdoc function
 * @name zopkyFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the zopkyFrontendApp
 */

  zopkyFrontendApp.controller('MainCtrl', function ($scope) {
    $scope.topnavbarurl = '/views/topnavbar.html';
  	$scope.loginurl = '/views/login.html';
    $scope.navtaburl = '/views/navtab.html';
  	$scope.employeeurl = '/views/employee.html';
    $scope.activitiesurl = '/views/activities.html';
  	$scope.continenturl = '/views/continent.html';
    $scope.countryurl = '/views/country.html';
    $scope.stateurl = '/views/state.html';
    $scope.cityurl = '/views/city.html';
    $scope.airporturl = '/views/airport.html';
    $scope.hotelurl = '/views/hotel.html';
    $scope.sliderurl = '/views/imgSlider.html';
    $scope.roomtypeurl = '/views/roomType.html';
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
