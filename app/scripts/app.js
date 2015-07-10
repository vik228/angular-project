'use strict';

/**
 * @ngdoc overview
 * @name zopkyFrontendApp
 * @description
 * # zopkyFrontendApp
 *
 * Main module of the application.
 */

var baseUrl = "http://192.168.0.110:1337/api/v0";
var zopkyFrontendApp = angular
  .module('zopkyFrontendApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ]);
  zopkyFrontendApp.config(function ($routeProvider, $httpProvider) {

    $httpProvider.defaults.withCredentials = true;
    
    $routeProvider
      /*.when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        equireLogin: false
      })*/
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        requireLogin: false
      })
      .when('/', {
        templateUrl: 'views/login.html',
        controller: 'loginController',
        requireLogin: false
      })
      .when('/employee', {
        templateUrl: 'views/employee.html',
        controller: 'employeeController',
   //     requireLogin: true
      })
      .when('/navtab', {
        templateUrl: 'views/navtab.html',
        controller: 'navtabController',
     //   requireLogin: true
      })
      .when('/activities', {
        templateUrl: 'views/activities.html',
        controller: 'activitiesController',
     //   requireLogin: true
      })
      .when('/continent', {
        templateUrl: 'views/continent.html',
        controller: 'continentController',
     //   requireLogin: true
      })
      .when('/country', {
        templateUrl: 'views/country.html',
        controller: 'countryController',
     //   requireLogin: true
      })
      .when('/state', {
        templateUrl: 'views/state.html',
        controller: 'stateController',
     //   requireLogin: true
      })
      .when('/city', {
        templateUrl: 'views/city.html',
        controller: 'cityController',
     //   requireLogin: true
      })
      .when('/airport', {
        templateUrl: 'views/airport.html',
        controller: 'airportController',
     //   requireLogin: true
      })
      .otherwise({
        redirectTo: '/'
      });
  });
