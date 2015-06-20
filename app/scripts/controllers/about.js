'use strict';

/**
 * @ngdoc function
 * @name zopkyFrontendApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the zopkyFrontendApp
 */
angular.module('zopkyFrontendApp')
  .controller('AboutCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
