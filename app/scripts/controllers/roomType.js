'use strict';

zopkyFrontendApp.controller('roomController',
  ["$scope", "$http", "$window", "UtilsFactory", "CommonMethods", '$rootScope','$timeout','dialogs',
    function($scope,$http, $window, UtilsFactory, CommonMethods,$rootScope,$timeout, dialogs) {

      var _progress = 100;
      var _fakeWaitProgress = function(duration){
        $timeout(function(){
          $rootScope.$broadcast('dialogs.wait.complete');
        }, duration);
      };

  $scope.roomController = {};

  $scope.roomTypes =[];
  $scope.limit = 10;
  $scope.page=1;

  $scope.getRoomtypes = function(){
    var criteria = "active=true";
    CommonMethods.getAllRoomTypes($scope.limit, $scope.page, criteria, $scope.roomTypes.length, "cities", function(data){
      //$window.alert(data);
      if((data==null || data ==[] || data=='') && $scope.page>1){
        //$window.alert("No more room type available");
        dialogs.wait("Get roomtypes","No more room type available",0);
        _fakeWaitProgress(1000);
      }
      $scope.roomTypes = $scope.roomTypes.concat(data);
    });
  };

  $scope.getRoomtypes();

  $scope.getMoreRoomtypes = function(){
    $scope.page++;
    $scope.getRoomtypes();
  };


$scope.edit = true;
$scope.error = false;
$scope.incomplete = false;
$scope.info= false;

$scope.editRoom = function(id,edit) {
  if(edit ==='show')
    $scope.info=true;
  else
    $scope.info=false;

  if (id == 'new') {
    console.log(id);
    $scope.formTitle = 'Create New Room';
  //  $scope.incomplete = true;
    $scope.act ='add';
    $scope.roomController.roomType = '';
    $scope.roomController.capacity = '';
    }
  else {
      if(edit ==='show')
          $scope.formTitle = 'Room Details';
        else
          $scope.formTitle = 'Edit Room';
    $scope.act ='update';
    $scope.roomController.roomType = $scope.roomTypes[id-1].name;
    $scope.roomController.capacity = $scope.roomTypes[id-1].capacity;
    $scope.oldType = $scope.roomTypes[id-1].name;
    $scope.oldCapacity = $scope.roomTypes[id-1].capacity;
  }
};

$scope.showModal = false;
  $scope.toggleModal = function(){
      $scope.showModal = !$scope.showModal;
    };

/* saveRoom function inserts room information in the database*/
  $scope.saveRoom = function() {

    if($scope.act === 'add'){
      var roomDetails =[ {
        name:$scope.roomController.roomType,
        nop:$scope.roomController.capacity
      }];

      console.log(roomDetails);

      if($scope.roomController.roomType == "" || $scope.roomController.capacity ==""){
        console.log("null values");
      }else {
        console.log(roomDetails);
        var responsePromise = UtilsFactory.doPostCall ('/roomtype/add', roomDetails);
        responsePromise.then (function (response){

          var data = response.data['response'];
          //console.log(data);
          if (response.status==200) {
            $scope.toggleModal();
            var message = data['message'];
            //window.alert(message);
            dialogs.wait("Add roomtypes",message,_progress);
            _fakeWaitProgress(2000);
          }

        }, function(error){
          $scope.toggleModal();
          var message = error.data.response.message.name[0].message;
          console.log(message);
          //window.alert(message);
          dialogs.wait("Add roomtypes",message,0);
          _fakeWaitProgress(2000);
        });
      }
    }else if($scope.act === 'update'){
      var roomDetails ={
        findCriteria:{
          name:$scope.oldType,
          nop:$scope.oldCapacity
        },
        recordsToUpdate:{
          name:$scope.roomController.roomType,
          nop:$scope.roomController.capacity
        }
      };
      console.log(roomDetails);

      var responsePromise = UtilsFactory.doPostCall ('/roomtype/update', roomDetails);
      responsePromise.then (function (response){
        var data = response.data['response'];
        //console.log(data);
        if (response.status==200) {
          $scope.toggleModal();
          var message = data['message'];
          //$window.alert(message);
          dialogs.wait("Update roomtypes",message,_progress);
          _fakeWaitProgress(2000);
        }

      }, function(error){
        $scope.toggleModal();
        var message = error.data.response.message.name[0].message;
        console.log(message);
        //$window.alert(message);
        dialogs.wait("Update roomtypes",message,0);
        _fakeWaitProgress(2000);
      });
    }
  };/* saveRoom ends here */

/* statusRoom function activates or deactivates room information from database*/

  $scope.statusRoom = function(id) {
    console.log(id);
    console.log($scope.roomTypes);
    var roomDetails ={
      findCriteria:{
        name:$scope.roomTypes[id-1].name,
        nop:$scope.roomTypes[id-1].capacity
      },
      recordsToUpdate:{
        name:$scope.roomTypes[id-1].name,
        nop:$scope.roomTypes[id-1].capacity,
        active:!$scope.roomTypes[id-1].status
      }
    };

    console.log(roomDetails);
    var responsePromise = UtilsFactory.doPostCall ('/roomtype/update', roomDetails);
    responsePromise.then (function (response){
      var data = response.data['response'];
      //console.log(data);
      if (response.status==200) {
        $scope.roomTypes[id-1].status = !$scope.roomTypes[id-1].status ;
        var message = data['message'];
        //$window.alert(message);
        dialogs.wait("Change roomtype's status",message,_progress);
        _fakeWaitProgress(1000);
      }

    }, function(error){
      var message = error.data.response.message.name[0].message;
      console.log(message);
      //$window.alert(message);
      dialogs.wait("Change roomtype's status",message,0);
      _fakeWaitProgress(1000);
    });
  };/* statusContinent ends here */

$scope.toggleEnabled = function(){
  $scope.info = !$scope.info;
}

}]);
