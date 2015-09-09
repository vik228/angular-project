'use strict';

zopkyFrontendApp.controller('agentController', ["$scope", "$http", "UtilsFactory", function($scope,$http, UtilsFactory) {
$scope.agentController = {};

$scope.agents = [
{id:1, agentid:'AG001', fName:'Binay',  lName:"Verma", contact:'9988776655', email:'Binay@zopky.com',   address:'Andheri', agencyName:'ASAP', status:'false' },
{id:2, agentid:'AG001', fName:'Ajay',   lName:"Test",  contact:'9988776655', email:'Ajay@zopky.com',    address:'Andheri', agencyName:'ASAP', status:'true' },
{id:3, agentid:'AG001', fName:'Vikash', lName:"Test",  contact:'9988776655', email:'Vikash@zopky.com',  address:'Andheri', agencyName:'ASAP', status:'true' },
{id:4, agentid:'AG001', fName:'Shubham',lName:"Test",  contact:'9988772211', email:'Shubham@zopky.com', address:'Andheri', agencyName:'ASAP', status:'false' },
{id:5, agentid:'AG001', fName:'Dummy5', lName:"Test",  contact:'9988776644', email:'fname@zopky.com',   address:'Andheri', agencyName:'ASAP', status:'false' },
{id:6, agentid:'AG001', fName:'Dummy6', lName:"Test",  contact:'9988776633', email:'fname@zopky.com',   address:'Andheri', agencyName:'ASAP', status:'true' }
]; 

$scope.edit = true;
$scope.error = false;
$scope.incomplete = false; 

$scope.showModal = false;
  $scope.toggleModal = function(){
      $scope.showModal = !$scope.showModal;
    };

/* editagent function updates agent information in the database*/
$scope.editAgent = function(id) {
  if (id == 'new') {
    $scope.formTitle = 'Create New agent';
    $scope.edit = true;
    $scope.act ='add';
    $scope.agentController.fName = '';
    $scope.agentController.lName = '';
    $scope.agentController.email = '';
    $scope.agentController.contact = '';
    $scope.agentController.address = '';
    $scope.agentController.agencyName = '';
    } else {
    $scope.formTitle = 'Edit agent';
    $scope.edit = false;
    $scope.act ='update';
    $scope.agentController.fName = $scope.agents[id-1].fName;
    $scope.agentController.lName = $scope.agents[id-1].lName; 
    $scope.agentController.email = $scope.agents[id-1].email; 
    $scope.agentController.contact = $scope.agents[id-1].contact; 
    $scope.agentController.address = $scope.agents[id-1].address;
    $scope.agentController.agencyName = $scope.agents[id-1].agencyName;
  }
};

/* saveagent function inserts agent information in the database*/
$scope.saveAgent = function() {
  var agentDetails = {
    fname:$scope.agentController.fName, 
    lname:$scope.agentController.lName,
    email:$scope.agentController.email,
    contact:$scope.agentController.contact,
    address:$scope.agentController.address,
    agencyName:$scope.agentController.agencyName
  };
  console.log(agentDetails);
  if($scope.act === 'add')
    var responsePromise = UtilsFactory.doPostCall ('/agent/add', agentDetails);
  else if($scope.act === 'update')
    var responsePromise = UtilsFactory.doPostCall ('/agent/update', agentDetails);

    responsePromise.then (function (response){

      console.log (response);
      // response : responseCode, message
      var message = response['message'];
      console.log (message);

    });
};

/* statusagent function activates or deactivates agent information from database*/
$scope.statusAgent = function(id) {
  
  $scope.agents[id-1].status = !$scope.agents[id-1].status ;
  
  var agentDetails = {
    id:$scope.agents[id-1].id,
    active:$scope.agents[id-1].status
  };
  console.log(agentDetails);
  var responsePromise = UtilsFactory.doPostCall ('/user/update', agentDetails);
      responsePromise.then (function (response){

        console.log (response);

      });
}; /* statusagent ends here */


}]);