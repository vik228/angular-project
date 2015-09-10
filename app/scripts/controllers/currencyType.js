'use strict';

zopkyFrontendApp.controller('currencyController',
  ["$scope", "$http", "$window", "UtilsFactory", "CommonMethods", '$rootScope','$timeout','dialogs',
    function($scope,$http, $window, UtilsFactory, CommonMethods,$rootScope,$timeout, dialogs) {

      var _progress = 100;
      var _fakeWaitProgress = function(duration){
        $timeout(function(){
          $rootScope.$broadcast('dialogs.wait.complete');
        }, duration);
      };

      $scope.currencyController = {};

      $scope.currencyTypes =[];
      $scope.limit = 10;
      $scope.page=1;

      $scope.getcurrencytypes = function(){
        var criteria = "active=true";
        CommonMethods.getAllcurrencyTypes($scope.limit, $scope.page, criteria, $scope.currencyTypes.length, "cities", function(data){
          //$window.alert(data);
          if((data==null || data ==[] || data=='') && $scope.page>1){
            //$window.alert("No more currency type available");
            dialogs.wait("Get currencytypes","No more currency type available",0);
            _fakeWaitProgress(1000);
          }
          $scope.currencyTypes = $scope.currencyTypes.concat(data);
        });
      };

      $scope.getcurrencytypes();

      $scope.getMorecurrencytypes = function(){
        $scope.page++;
        $scope.getcurrencytypes();
      };


      $scope.edit = true;
      $scope.error = false;
      $scope.incomplete = false;
      $scope.info= false;

      $scope.editcurrency = function(id,edit) {
        if(edit ==='show')
          $scope.info=true;
        else
          $scope.info=false;

        if (id == 'new') {
          console.log(id);
          $scope.formTitle = 'Create New currency';
          //  $scope.incomplete = true;
          $scope.act ='add';
          $scope.currencyController.currencyType = '';
        }
        else {
          if(edit ==='show')
            $scope.formTitle = 'currency Details';
          else
            $scope.formTitle = 'Edit currency';
          $scope.act ='update';
          $scope.currencyController.currencyType = $scope.currencyTypes[id-1].name;
          $scope.oldType = $scope.currencyTypes[id-1].name;
        }
      };

      $scope.showModal = false;
      $scope.toggleModal = function(){
        $scope.showModal = !$scope.showModal;
      };

      /* savecurrency function inserts currency information in the database*/
      $scope.savecurrency = function() {

        if($scope.act === 'add'){
          var currencyDetails =[ {
            name:$scope.currencyController.currencyType
          }];

          console.log(currencyDetails);

          if($scope.currencyController.currencyType == ""){
            console.log("null values");
          }else {
            console.log(currencyDetails);
            var responsePromise = UtilsFactory.doPostCall ('/currencytype/add', currencyDetails);
            responsePromise.then (function (response){

              var data = response.data['response'];
              //console.log(data);
              if (response.status==200) {
                $scope.toggleModal();
                var message = data['message'];
                //window.alert(message);
                dialogs.wait("Add currencytypes",message,_progress);
                _fakeWaitProgress(2000);
              }

            }, function(error){
              $scope.toggleModal();
              var message = error.data.response.message.name[0].message;
              console.log(message);
              //window.alert(message);
              dialogs.wait("Add currencytypes",message,0);
              _fakeWaitProgress(2000);
            });
          }
        }else if($scope.act === 'update'){
          var currencyDetails ={
            findCriteria:{
              name:$scope.oldType
            },
            recordsToUpdate:{
              name:$scope.currencyController.currencyType
            }
          };
          console.log(currencyDetails);

          var responsePromise = UtilsFactory.doPostCall ('/currencytype/update', currencyDetails);
          responsePromise.then (function (response){
            var data = response.data['response'];
            //console.log(data);
            if (response.status==200) {
              $scope.toggleModal();
              var message = data['message'];
              //$window.alert(message);
              dialogs.wait("Update currencytypes",message,_progress);
              _fakeWaitProgress(2000);
            }

          }, function(error){
            $scope.toggleModal();
            var message = error.data.response.message.name[0].message;
            console.log(message);
            //$window.alert(message);
            dialogs.wait("Update currencytypes",message,0);
            _fakeWaitProgress(2000);
          });
        }
      };/* savecurrency ends here */

      /* statuscurrency function activates or deactivates currency information from database*/

      $scope.statuscurrency = function(id) {
        console.log(id);
        console.log($scope.currencyTypes);
        var currencyDetails ={
          findCriteria:{
            name:$scope.currencyTypes[id-1].name
          },
          recordsToUpdate:{
            name:$scope.currencyTypes[id-1].name,
            active:!$scope.currencyTypes[id-1].status
          }
        };

        console.log(currencyDetails);
        var responsePromise = UtilsFactory.doPostCall ('/currencytype/update', currencyDetails);
        responsePromise.then (function (response){
          var data = response.data['response'];
          //console.log(data);
          if (response.status==200) {
            $scope.currencyTypes[id-1].status = !$scope.currencyTypes[id-1].status ;
            var message = data['message'];
            //$window.alert(message);
            dialogs.wait("Change currencytype's status",message,_progress);
            _fakeWaitProgress(1000);
          }

        }, function(error){
          var message = error.data.response.message.name[0].message;
          console.log(message);
          //$window.alert(message);
          dialogs.wait("Change currencytype's status",message,0);
          _fakeWaitProgress(1000);
        });
      };/* statusContinent ends here */

    }]);
