'use strict';

zopkyFrontendApp.controller('employeeController', function($scope, $http, UtilsFactory) {
  $scope.employeeController = {};

  $scope.employees = [{
    id: 1,
    empid: 'ZT001',
    fName: 'Binay',
    lName: "Verma",
    contact: '9988776655',
    email: 'Binay@zopky.com',
    roles: 'Developer',
    reportingManager: 'Aprit',
    status: 'false'
  }, {
    id: 2,
    empid: 'ZT002',
    fName: 'Ajay',
    lName: "Test",
    contact: '9988776655',
    email: 'Ajay@zopky.com',
    roles: 'Developer',
    reportingManager: 'Anshul',
    status: 'true'
  }, {
    id: 3,
    empid: 'ZT003',
    fName: 'Vikash',
    lName: "Test",
    contact: '9988776655',
    email: 'Vikash@zopky.com',
    roles: 'Developer',
    reportingManager: 'Anshul',
    status: 'true'
  }, {
    id: 4,
    empid: 'ZT004',
    fName: 'Shubham',
    lName: "Test",
    contact: '9988772211',
    email: 'Shubham@zopky.com',
    roles: 'Developer',
    reportingManager: 'Aprit',
    status: 'false'
  }, {
    id: 5,
    empid: 'ZT005',
    fName: 'Dummy5',
    lName: "Test",
    contact: '9988776644',
    email: 'fname@zopky.com',
    roles: 'Developer',
    reportingManager: 'Aprit',
    status: 'false'
  }, {
    id: 6,
    empid: 'ZT006',
    fName: 'Dummy6',
    lName: "Test",
    contact: '9988776633',
    email: 'fname@zopky.com',
    roles: 'Developer',
    reportingManager: 'Aprit',
    status: 'true'
  }];
  /*
  $http.get("employee.txt")
      .success(function(response) {$scope.employees = response.records;});
      */
  $scope.edit = true;
  $scope.error = false;
  $scope.incomplete = false;

  $scope.showModal = false;
  $scope.toggleModal = function() {
    $scope.showModal = !$scope.showModal;
  };

  /* editEmployee function updates employee information in the database*/
  $scope.editEmployee = function(id) {
    if (id == 'new') {
      $scope.formTitle = 'Create New Employee';
      $scope.edit = true;
      $scope.act = 'add';
      //  $scope.incomplete = true;
      $scope.employeeController.fName = '';
      $scope.employeeController.lName = '';
      $scope.employeeController.email = '';
      $scope.employeeController.contact = '';
      $scope.employeeController.roles = '';
      $scope.employeeController.reportingManager = 'Select';
    } else {
      $scope.formTitle = 'Edit Employee';
      $scope.edit = false;
      $scope.act = 'update';
      $scope.employeeController.fName = $scope.employees[id - 1].fName;
      $scope.employeeController.lName = $scope.employees[id - 1].lName;
      $scope.employeeController.email = $scope.employees[id - 1].email;
      $scope.employeeController.contact = $scope.employees[id - 1].contact;
      $scope.employeeController.roles = $scope.employees[id - 1].roles;
      $scope.employeeController.reportingManager = $scope.employees[id - 1].reportingManager;
    }
    //  loadMap();
  };

  /* saveEmployee function inserts employee information in the database*/
  $scope.saveEmployee = function() {
    var employeeDetails = {
      fname: $scope.employeeController.fName,
      lname: $scope.employeeController.lName,
      email: $scope.employeeController.email,
      contact: $scope.employeeController.contact,
      roles: $scope.employeeController.roles,
      reporting_manager: $scope.employeeController.reportingManager
    };
    console.log(employeeDetails);
    if ($scope.act === 'add')
      var responsePromise = UtilsFactory.doPostCall('/user/add', employeeDetails);
    else if ($scope.act === 'update')
      var responsePromise = UtilsFactory.doPostCall('/user/update', employeeDetails);

    responsePromise.then(function(response) {

      console.log(response);
      // response : responseCode, message
      var message = response['message'];
      console.log(message);

    });
  };

  /* statusEmployee function activates or deactivates employee information from database*/
  $scope.statusEmployee = function(id) {

    $scope.employees[id - 1].status = !$scope.employees[id - 1].status;

    var employeeDetails = {
      id: $scope.employees[id - 1].id,
      active: $scope.employees[id - 1].status
    };
    console.log(employeeDetails);
    var responsePromise = UtilsFactory.doPostCall('/user/update', employeeDetails);
    responsePromise.then(function(response) {

      console.log(response);

    });
  }; /* statusEmployee ends here */

  $scope.loadMap = function() {
    $scope.maplat = '27.175';
    $scope.maplong = '78.042';
    var myLatlng = new google.maps.LatLng($scope.maplat, $scope.maplong);
    var myOptions = {
      zoom: 11,
      center: myLatlng,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    var map = new google.maps.Map(document.getElementById("map_canvas"), myOptions);
    // var map1 = new google.maps.Map(document.getElementById("map_canvas1"), myOptions);

    var marker = new google.maps.Marker({
      position: myLatlng,
      map: map,
      draggable: true
    });
    google.maps.event.addListener(
      marker,
      'drag',
      function() {
        document.getElementById('lat').value = marker.position.lat();
        document.getElementById('lng').value = marker.position.lng();
      }
    );
  };

});