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
    $scope.formTitle = 'Create New Agent Profile';
    $scope.edit = true;
    $scope.act ='add';
    $scope.agentProfileController.city = '';
    $scope.agentProfileController.agencyName = '';
    $scope.agentProfileController.address = '';
    $scope.agentProfileController.pincode = '';
    $scope.agentProfileController.locality = '';
    $scope.agentProfileController.fName = '';
    $scope.agentProfileController.lName = '';
    $scope.agentProfileController.contact = '';
    $scope.agentProfileController.countriesOffered = '';
    $scope.agentProfileController.staffSize = '';
    $scope.agentProfileController.businessSince = '';
    $scope.agentProfileController.openTime = '';
    $scope.agentProfileController.closeTime = '';
    $scope.agentProfileController.openDays = '';
    $scope.agentProfileController.web = '';
    $scope.agentProfileController.otherSite = '';
    } else {
    $scope.formTitle = 'Edit Agent Profile';
    $scope.edit = false;
    $scope.act ='update';
    $scope.agentProfileController.city = $scope.agentProfiles[id-1].city;
    $scope.agentProfileController.agencyName = $scope.agentProfiles[id-1].agencyName; 
    $scope.agentProfileController.address = $scope.agentProfiles[id-1].address; 
    $scope.agentProfileController.pincode = $scope.agentProfiles[id-1].pincode; 
    $scope.agentProfileController.locality = $scope.agentProfiles[id-1].locality;
    $scope.agentProfileController.fName = $scope.agentProfiles[id-1].fName;
    $scope.agentProfileController.lName = $scope.agentProfiles[id-1].lName;
    $scope.agentProfileController.contact = $scope.agentProfiles[id-1].contact; 
    $scope.agentProfileController.countriesOffered = $scope.agentProfiles[id-1].countriesOffered; 
    $scope.agentProfileController.staffSize = $scope.agentProfiles[id-1].staffSize; 
    $scope.agentProfileController.businessSince = $scope.agentProfiles[id-1].businessSince;
    $scope.agentProfileController.openTime = $scope.agentProfiles[id-1].openTime; 
    $scope.agentProfileController.closeTime = $scope.agentProfiles[id-1].closeTime;
    $scope.agentProfileController.openDays = $scope.agentProfiles[id-1].openDays; 
    $scope.agentProfileController.web = $scope.agentProfiles[id-1].web;
    $scope.agentProfileController.otherSite = $scope.agentProfiles[id-1].otherSite;
  }
};

/* saveagentProfile function inserts agentProfile information in the database*/
$scope.saveAgentProfile = function() {
  var agentProfileDetails = {
    city:$scope.agentProfileController.city, 
    agencyName:$scope.agentProfileController.agencyName,
    address:$scope.agentProfileController.address,
    pincode:$scope.agentProfileController.pincode,
    locality:$scope.agentProfileController.locality,
    fName:$scope.agentProfileController.fName,
    lName:$scope.agentProfileController.lName, 
    contact:$scope.agentProfileController.contact,
    countriesOffered:$scope.agentProfileController.countriesOffered,
    staffSize:$scope.agentProfileController.staffSize,
    businessSince:$scope.agentProfileController.businessSince, 
    openTime:$scope.agentProfileController.openTime,
    closeTime:$scope.agentProfileController.closeTime,
    openDays:$scope.agentProfileController.openDays,
    web:$scope.agentProfileController.web,
    otherSite:$scope.agentProfileController.otherSite
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
$scope.statusAgentProfile = function(id) {
  
  $scope.agentProfiles[id-1].status = !$scope.agentProfiles[id-1].status ;
  
  var agentProfileDetails = {
    id:$scope.agentProfiles[id-1].id,
    active:$scope.agentProfiles[id-1].status
  };
  console.log(agentProfileDetails);
  var responsePromise = UtilsFactory.doPostCall ('/agentProfile/update', agentProfileDetails);
      responsePromise.then (function (response){

        console.log (response);

      });
}; /* statusagentProfile ends here */


});