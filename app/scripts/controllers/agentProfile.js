'use strict';

zopkyFrontendApp.controller('agentProfileController', function($scope,$http, UtilsFactory) {
$scope.agentProfileController = {};

$scope.agentProfiles = [
{id:1, agentid:'AG001', city:'Mumbai', fName:'Binay',  lName:"Verma", contact:'9988776655', email:'Binay@zopky.com',   address:'Andheri', agencyName:'ASAP', pincode:'400093', locality:'Andheri', countriesOffered:'Thailand', staffSize:'30', businessSince:'2005', openTime:'10am', closeTime:'9pm', openDays:'M', web:'www.makemytrip.com', otherSite:'Trip Factory', status:'false' },
{id:2, agentid:'AG001', city:'Mumbai', fName:'Ajay',   lName:"Test",  contact:'9988776655', email:'Ajay@zopky.com',    address:'Andheri', agencyName:'ASAP', pincode:'400093', locality:'Andheri', countriesOffered:'Thailand', staffSize:'30', businessSince:'2005', openTime:'10am', closeTime:'9pm', openDays:'M', web:'www.makemytrip.com', otherSite:'Trip Factory', status:'true' },
{id:3, agentid:'AG001', city:'Mumbai', fName:'Vikash', lName:"Test",  contact:'9988776655', email:'Vikash@zopky.com',  address:'Andheri', agencyName:'ASAP', pincode:'400093', locality:'Andheri', countriesOffered:'Thailand', staffSize:'30', businessSince:'2005', openTime:'10am', closeTime:'9pm', openDays:'M', web:'www.makemytrip.com', otherSite:'Trip Factory', status:'true' },
{id:4, agentid:'AG001', city:'Mumbai', fName:'Shubham',lName:"Test",  contact:'9988772211', email:'Shubham@zopky.com', address:'Andheri', agencyName:'ASAP', pincode:'400093', locality:'Andheri', countriesOffered:'Thailand', staffSize:'30', businessSince:'2005', openTime:'10am', closeTime:'9pm', openDays:'M', web:'www.makemytrip.com', otherSite:'Trip Factory', status:'false' },
{id:5, agentid:'AG001', city:'Mumbai', fName:'Dummy5', lName:"Test",  contact:'9988776644', email:'fname@zopky.com',   address:'Andheri', agencyName:'ASAP', pincode:'400093', locality:'Andheri', countriesOffered:'Thailand', staffSize:'30', businessSince:'2005', openTime:'10am', closeTime:'9pm', openDays:'M', web:'www.makemytrip.com', otherSite:'Trip Factory', status:'false' },
{id:6, agentid:'AG001', city:'Mumbai', fName:'Dummy6', lName:"Test",  contact:'9988776633', email:'fname@zopky.com',   address:'Andheri', agencyName:'ASAP', pincode:'400093', locality:'Andheri', countriesOffered:'Thailand', staffSize:'30', businessSince:'2005', openTime:'10am', closeTime:'9pm', openDays:'M', web:'www.makemytrip.com', otherSite:'Trip Factory', status:'true' }
]; 

$scope.edit = true;
$scope.error = false;
$scope.incomplete = false; 

$scope.showModal = false;
  $scope.toggleModal = function(){
      $scope.showModal = !$scope.showModal;
    };

/* editagentProfile function updates agentProfile information in the database*/
$scope.editAgentProfile = function(id) {
  if (id == 'new') {
    $scope.formTitle = 'Create New agentProfile';
    $scope.edit = true;
    $scope.act ='add';
    $scope.agentProfileController.fName = '';
    $scope.agentProfileController.lName = '';
    $scope.agentProfileController.email = '';
    $scope.agentProfileController.contact = '';
    $scope.agentProfileController.address = '';
    $scope.agentProfileController.agencyName = '';
    } else {
    $scope.formTitle = 'Edit agentProfile';
    $scope.edit = false;
    $scope.act ='update';
    $scope.agentProfileController.fName = $scope.agentProfiles[id-1].fName;
    $scope.agentProfileController.lName = $scope.agentProfiles[id-1].lName; 
    $scope.agentProfileController.email = $scope.agentProfiles[id-1].email; 
    $scope.agentProfileController.contact = $scope.agentProfiles[id-1].contact; 
    $scope.agentProfileController.address = $scope.agentProfiles[id-1].address;
    $scope.agentProfileController.agencyName = $scope.agentProfiles[id-1].agencyName;
  }
};

/* saveagentProfile function inserts agentProfile information in the database*/
$scope.saveAgentProfile = function() {
  var agentProfileDetails = {
    fname:$scope.agentProfileController.fName, 
    lname:$scope.agentProfileController.lName,
    email:$scope.agentProfileController.email,
    contact:$scope.agentProfileController.contact,
    address:$scope.agentProfileController.address,
    agencyName:$scope.agentProfileController.agencyName
  };
  console.log(agentProfileDetails);
  if($scope.act === 'add')
    var responsePromise = UtilsFactory.doPostCall ('/agentProfile/add', agentProfileDetails);
  else if($scope.act === 'update')
    var responsePromise = UtilsFactory.doPostCall ('/agentProfile/update', agentProfileDetails);

    responsePromise.then (function (response){

      console.log (response);
      // response : responseCode, message
      var message = response['message'];
      console.log (message);

    });
};

/* statusagentProfile function activates or deactivates agentProfile information from database*/
$scope.statusagentProfile = function(id) {
  
  $scope.agentProfiles[id-1].status = !$scope.agentProfiles[id-1].status ;
  
  var agentProfileDetails = {
    id:$scope.agentProfiles[id-1].id,
    active:$scope.agentProfiles[id-1].status
  };
  console.log(agentProfileDetails);
  var responsePromise = UtilsFactory.doPostCall ('/user/update', agentProfileDetails);
      responsePromise.then (function (response){

        console.log (response);

      });
}; /* statusagentProfile ends here */


});