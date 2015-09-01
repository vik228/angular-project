'use strict';

/**
 * @ngdoc overview
 * @name zopkyFrontendApp
 * @description
 * # zopkyFrontendApp
 *
 * Main module of the application.
 */


var baseUrl = "http://localhost:1337/api/v0";
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
      .when('/hotel', {
        templateUrl: 'views/hotel.html',
        controller: 'hotelController',
     //   requireLogin: true
      })
      .when('/roomType', {
        templateUrl: 'views/roomType.html',
        controller: 'roomController',
     //   requireLogin: true
      })
      .when('/slider', {
        templateUrl: 'views/imgSlider.html',
        controller: 'imgSliderController',
     //   requireLogin: true
      })
      .when('/minitour', {
        templateUrl: 'views/miniTour.html',
        controller: 'minitourController',
     //   requireLogin: true
      })
      .when('/airportTransfer', {
        templateUrl: 'views/airportTransfer.html',
        controller: 'airportTransferController',
     //   requireLogin: true
      })
      .when('/agent', {
        templateUrl: 'views/agent.html',
        controller: 'agentController',
     //   requireLogin: true
      })
      .when('/agentprofile', {
        templateUrl: 'views/agentProfile.html',
        controller: 'agentProfileController',
     //   requireLogin: true
      })
      .when('/itinerary', {
        templateUrl: 'views/itinerary.html',
        controller: 'itineraryController',
     //   requireLogin: true
      })
      .when('/itineraryhome', {
        templateUrl: 'views/itineraryhome.html',
        controller: 'itineraryhomeController',
     //   requireLogin: true
      })
      .when('/ihotel', {
        templateUrl: 'views/ihotel.html',
        controller: 'itineraryhotelController',
     //   requireLogin: true
      })
      .otherwise({
        redirectTo: '/'
      });
  });

zopkyFrontendApp.directive('modal', function () {
    return {
      template: '<div class="modal fade">' + 
          '<div class="modal-dialog" style="width:80%;">' + 
            '<div class="modal-content">' + 
              '<div class="modal-header">' + 
                '<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>' + 
                '<h4 class="modal-title">{{ formTitle }}</h4>' + 
              '</div>' + 
              '<div class="modal-body" ng-transclude></div>' + 
            '</div>' + 
          '</div>' + 
        '</div>',
      restrict: 'E',
      transclude: true,
      replace:true,
      scope:true,
      link: function postLink(scope, element, attrs) {
        scope.title = attrs.title;

        scope.$watch(attrs.visible, function(value){
          if(value == true)
            $(element).modal('show');
          else
            $(element).modal('hide');
        });

        $(element).on('shown.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = true;
          });
        });

        $(element).on('hidden.bs.modal', function(){
          scope.$apply(function(){
            scope.$parent[attrs.visible] = false;
          });
        });
      }
    };
  });
