'use strict';

zopkyFrontendApp.controller('employeeController', function($scope,$http) {

$scope.employees = [
{id:1, empid:'ZT001', fName:'Binay',  lName:"Verma", contact:9988776655, email:'Binay@zopky.com',   roles:'Developer', reportingManager:'Aprit' },
{id:2, empid:'ZT002', fName:'Ajay',   lName:"Test",  contact:9988776655, email:'Ajay@zopky.com',    roles:'Developer', reportingManager:'Anshul'  },
{id:3, empid:'ZT003', fName:'Vikash', lName:"Test",  contact:9988776655, email:'Vikash@zopky.com',  roles:'Developer', reportingManager:'Anshul' },
{id:4, empid:'ZT004', fName:'Shubham',lName:"Test",  contact:9988772211, email:'Shubham@zopky.com', roles:'Developer', reportingManager:'Aprit' },
{id:5, empid:'ZT005', fName:'Dummy5', lName:"Test",  contact:9988776644, email:'fname@zopky.com',   roles:'Developer', reportingManager:'Aprit' },
{id:6, empid:'ZT006', fName:'Dummy6', lName:"Test",  contact:9988776633, email:'fname@zopky.com',   roles:'Developer', reportingManager:'Aprit' },
]; 
/*
$http.get("employee.txt")
    .success(function(response) {$scope.employees = response.records;});
    */
$scope.edit = true;
$scope.error = false;
$scope.incomplete = false; 

$scope.editEmployee = function(id) {
  if (id == 'new') {
    $scope.formTitle = 'Create New Employee';
    $scope.edit = true;
  //  $scope.incomplete = true;
    $scope.fName = '';
    $scope.lName = '';
    $scope.email = '';
    $scope.contact = '';
    $scope.reportingManager = 'Select'; 
    } else {
    $scope.formTitle = 'Edit Employee';
    $scope.edit = false;
    $scope.fName = $scope.employees[id-1].fName;
    $scope.lName = $scope.employees[id-1].lName; 
    $scope.email = $scope.employees[id-1].email; 
    $scope.contact = $scope.employees[id-1].contact; 
    $scope.reportingManager = $scope.employees[id-1].reportingManager; 
  }
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
$scope.showModal = false;
  $scope.toggleModal = function(){
      $scope.showModal = !$scope.showModal;
    };

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