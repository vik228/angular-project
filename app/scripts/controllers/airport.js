'use strict';

zopkyFrontendApp.controller('airportController', function($scope,$http) {

$scope.airports = [
{id:1, airportId:'AIR001', airportCode:'IGI', airportName:'IGI Airport',               continent: "Asia", country:"India", state:"Delhi",  city:"New Delhi", contact:9988776655, email:'Binay@zopky.com',   roles:'Developer', reportingManager:'Aprit', lat: '19.2302', long:'72.409202'},
{id:2, airportId:'AIR002', airportCode:'RGIA', airportName:'Rajeev Gandhi',             continent: "Asia", country:"India", state:"Telangana",     city:"Hyderabad",  contact:9988776655, email:'Ajay@zopky.com',    roles:'Developer', reportingManager:'Anshul', lat: '19.2302', long:'72.409202'  },
{id:3, airportId:'AIR003', airportCode:'DDIA', airportName:'Dum Dum',                   continent: "Asia", country:"India", state:"West Bengal",   city:"Kolkata",  contact:9988776655, email:'Vikash@zopky.com',  roles:'Developer', reportingManager:'Anshul', lat: '19.2302', long:'72.409202' },
{id:4, airportId:'AIR004', airportCode:'HIA', airportName:'Hethrow',                   continent: "Europe", country:"United Kingdom", state:"London",  city:"London",  contact:9988772211, email:'Shubham@zopky.com', roles:'Developer', reportingManager:'Aprit', lat: '19.2302', long:'72.409202' },
{id:5, airportId:'AIR005', airportCode:'MIA', airportName:'Munich Internation Airport',continent: "Europe", country:"Germany", state:"Germany",   city:"Germany",  contact:9988776644, email:'fname@zopky.com',   roles:'Developer', reportingManager:'Aprit', lat: '19.2302', long:'72.409202' },
{id:6, airportId:'AIR006', airportCode:'HIA', airportName:'Hong Kong Airport',         continent: "Asia", country:"China", state:"China",   city:"China",  contact:9988776633, email:'fname@zopky.com',   roles:'Developer', reportingManager:'Aprit', lat: '19.2302', long:'72.409202' },
]; 
/*
$http.get("employee.txt")
    .success(function(response) {$scope.employees = response.records;});
    */
$scope.edit = true;
$scope.error = false;
$scope.incomplete = false; 

$scope.editAirport = function(id) {
  if (id == 'new') {
    $scope.formTitle = 'Create New Airport';
    $scope.edit = true;
  //  $scope.incomplete = true;
    $scope.fName = '';
    $scope.lName = '';
    $scope.email = '';
    $scope.contact = '';
    $scope.reportingManager = 'Select'; 
    } else {
    $scope.formTitle = 'Edit Airport';
    $scope.edit = false;
    $scope.fName = $scope.airports[id-1].fName;
    $scope.lName = $scope.airports[id-1].lName; 
    $scope.email = $scope.airports[id-1].email; 
    $scope.contact = $scope.airports[id-1].contact; 
    $scope.reportingManager = $scope.airports[id-1].reportingManager; 
  }
};

$scope.showModal = false;
  $scope.toggleModal = function(){
      $scope.showModal = !$scope.showModal;
    };

});