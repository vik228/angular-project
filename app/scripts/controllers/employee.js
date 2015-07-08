'use strict';

zopkyFrontendApp.controller('employeeController', function($scope,$http, UtilsFactory) {
$scope.employeeController = {};

$scope.employees = [
{id:1, empid:'ZT001', fName:'Binay',  lName:"Verma", contact:9988776655, email:'Binay@zopky.com',   roles:'Developer', reportingManager:'Aprit', status:'0' },
{id:2, empid:'ZT002', fName:'Ajay',   lName:"Test",  contact:9988776655, email:'Ajay@zopky.com',    roles:'Developer', reportingManager:'Anshul', status:'1' },
{id:3, empid:'ZT003', fName:'Vikash', lName:"Test",  contact:9988776655, email:'Vikash@zopky.com',  roles:'Developer', reportingManager:'Anshul', status:'1' },
{id:4, empid:'ZT004', fName:'Shubham',lName:"Test",  contact:9988772211, email:'Shubham@zopky.com', roles:'Developer', reportingManager:'Aprit', status:'false' },
{id:5, empid:'ZT005', fName:'Dummy5', lName:"Test",  contact:9988776644, email:'fname@zopky.com',   roles:'Developer', reportingManager:'Aprit', status:'false' },
{id:6, empid:'ZT006', fName:'Dummy6', lName:"Test",  contact:9988776633, email:'fname@zopky.com',   roles:'Developer', reportingManager:'Aprit', status:'1' },
]; 
/*
$http.get("employee.txt")
    .success(function(response) {$scope.employees = response.records;});
    */
$scope.edit = true;
$scope.error = false;
$scope.incomplete = false; 

$scope.showModal = false;
  $scope.toggleModal = function(){
      $scope.showModal = !$scope.showModal;
    };

/* editEmployee function updates employee information in the database*/
$scope.editEmployee = function(id) {
  if (id == 'new') {
    $scope.formTitle = 'Create New Employee';
    $scope.edit = true;
    $scope.act ='save';
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
    $scope.act ='update';
    $scope.employeeController.fName = $scope.employees[id-1].fName;
    $scope.employeeController.lName = $scope.employees[id-1].lName; 
    $scope.employeeController.email = $scope.employees[id-1].email; 
    $scope.employeeController.contact = $scope.employees[id-1].contact; 
    $scope.employeeController.roles = $scope.employees[id-1].roles; 
    $scope.employeeController.reportingManager = $scope.employees[id-1].reportingManager; 
  }
};

/* saveEmployee function inserts employee information in the database*/
$scope.saveEmployee = function() {
  var employeeDetails = {
    action:$scope.act,
    fname:$scope.employeeController.fName, 
    lname:$scope.employeeController.lName,
    email:$scope.employeeController.email,
    contact:$scope.employeeController.contact,
    roles:$scope.employeeController.roles,
    reportingManager:$scope.employeeController.reportingManager
  };
  console.log(employeeDetails);
  var responsePromise = UtilsFactory.doPostCall ('/user/employees', employeeDetails);
      responsePromise.then (function (response){

        console.log (response);

      });
};

/* deleteEmployee function deletes employee information from database*/
$scope.statusEmployee = function(id) {
  if($scope.employees[id-1].status === '0')
    $scope.stat='1';
  else
    $scope.stat='0';
  var employeeDetails = {
    action:'status',
    empid:$scope.employees[id-1].empid,
    status:$scope.stat
  };
  console.log(employeeDetails);
  var responsePromise = UtilsFactory.doPostCall ('/user/employees', employeeDetails);
      responsePromise.then (function (response){

        console.log (response);

      });
};

/*
$scope.$watch('email',function() {$scope.test();});
$scope.$watch('contact',function() {$scope.test();});
$scope.$watch('lName', function() {$scope.test();});

$scope.test = function() {
 
  $scope.incomplete = false;
  if ($scope.edit && (!$scope.fName.length ||
  !$scope.lName.length ||
  !$scope.reportingManager==null ||
  !$scope.email.length || 
  !$scope.contact.length)) {
       $scope.incomplete = true;
  }
};
*/

});

zopkyFrontendApp.directive('modal', function () {
    return {
      template: '<div class="modal fade">' + 
          '<div class="modal-dialog">' + 
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