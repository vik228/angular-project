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
 // 	$scope.employeeurl = '/views/employee.html'; */
 //   $scope.activitiesurl = 'http://localhost:9000/#/activities';
  	/*$scope.continenturl = '/views/continent.html';
    $scope.countryurl = '/views/country.html';
    $scope.stateurl = '/views/state.html';
    $scope.cityurl = '/views/city.html';
    $scope.airporturl = '/views/airport.html'; */
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
