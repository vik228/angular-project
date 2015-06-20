'use strict';

/**
 * @ngdoc function
 * @name zopkyFrontendApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the zopkyFrontendApp
 */
angular.module('zopkyFrontendApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
