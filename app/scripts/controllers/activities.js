'use strict';

zopkyFrontendApp.controller('activitiesController', function($scope, $http, $timeout, $window, UtilsFactory, CommonMethods) {
      $scope.activitiesController = {};

      $scope.activitiesController.lat = '19.1100753';
      $scope.activitiesController.long = '72.8940055';
      $scope.activitiesController.markerLocation = '19.1100753, 72.8940055';

      $scope.limit = 10;
      $scope.page = 0;
      $scope.continents = [];
      $scope.countries = [];
      $scope.states = [];
      $scope.cities = [];
      $scope.activities = [];
      $scope.googleLocations = [];

      //TODO: implement flow, call this after selecting city
      $scope.getActivitiesByCriteria = function() {
        //TODO: define $scope.criteria
        CommonMethods.getActivitiesByCriteria($scope.limit, $scope.page, $scope.activities.length, $scope.activityCriteria, function(data) {
          $scope.activities = $scope.activities.concat(data);
        });
      };

      $scope.getMoreActivities = function() {
        $scope.page++;
        $scope.getActivitiesByCriteria();
      };

      $scope.getActiveContinents = function() {
        CommonMethods.getActiveContinents($scope.continents.length, "continents", function(data) {
          $scope.continents = data;
          $scope.activitiesController.country = "";
          $scope.activitiesController.state = "";
          $scope.activitiesController.city = "";
        });
      };

      $scope.getActiveCountriesByContinents = function() {

        //TODO: define countryCriteria

        CommonMethods.getActiveRecordeByCriteria("/country/searchbycriteria/", "100", "0", $scope.countryCriteria, $scope.countries.length, function(data) {
          $scope.countries = data;
          $scope.activitiesController.state = "";
          $scope.activitiesController.city = "";
        });
      };

      $scope.getActiveStatesByCountries = function() {
        CommonMethods.getActiveRecordeByCriteria("/state/searchbycriteria/", "100", "0", $scope.stateCriteria, $scope.states.length, function(data) {
          $scope.states = data;
          $scope.activitiesController.city = "";
        });
      };

      $scope.getActiveCitiesByStates = function() {
        CommonMethods.getActiveRecordeByCriteria("/city/searchbycriteria/", "100", "0", $scope.cityCriteria, $scope.cities.length, function(data) {
          $scope.cities = data;
        });
      };

      $scope.getActiveContinents();

      $scope.getGoogleLocation = function(address) {
        CommonMethods.getGoogleLocation(($scope.activitiesController.activityName + ", " + $scope.activitiesController.city).replace(" ", "%20"), function(data) {
            for (var i = 0; i < data.length; i++) {
              var response = {};
              response.name = data[i].formatted_address;
              response.location = data[i].geometry.location;
              $scope.googleLocations.push(response);
            }
          });
        };

        $scope.onLocationSelected = function() {
          var data = $scope.googleLocations[$scope.activitiesController.location];
          $scope.activitiesController.lat = data.location.lat;
          $scope.activitiesController.long = data.location.lng;
        };

        var marker, map;
        $scope.$on('mapInitialized', function(evt, evtMap) {
          map = evtMap;
          marker = map.markers[0];
        });

        $scope.centerChanged = function(event) {
          $timeout(function() {
            map.panTo(marker.getPosition());
            console.log(marker.getPosition());
            // $scope.activitiesController.lat = marker.getPosition().lat();
            // $scope.activitiesController.long = marker.getPosition().lng();
          }, 3000);
        }
        $scope.click = function(event) {
          map.setZoom(8);
          map.setCenter(marker.getPosition());
          window.alert(marker.getPosition());
        }

        $scope.activities = [{
          id: 1,
          activityName: 'Gateway of India',
          continent: "Asia",
          country: "India",
          state: "Maharashtra",
          city: 'Mumbai',
          type: "Place",
          lat: '19.2302',
          long: '72.409202',
          openTime: '2 pm',
          closeTime: '5 pm',
          status: '0'
        }, {
          id: 2,
          activityName: 'Act1',
          continent: "Asia",
          country: "Sangapore",
          state: "Dummy1",
          city: 'Dummy1',
          type: "Place",
          lat: '19.2302',
          long: '72.409202',
          openTime: '2 pm',
          closeTime: '5 pm',
          status: '1'
        }, {
          id: 3,
          activityName: 'Act2',
          continent: "Asia",
          country: 'Dummy2',
          state: "Dummy2",
          city: 'Dummy2',
          type: "Place",
          lat: '19.2302',
          long: '72.409202',
          openTime: '2 pm',
          closeTime: '5 pm',
          status: '1'
        }, {
          id: 4,
          activityName: 'Act3',
          continent: "Asia",
          country: 'Dummy3',
          state: "Dummy3",
          city: 'Dummy3',
          type: "Place",
          lat: '19.2302',
          long: '72.409202',
          openTime: '2 pm',
          closeTime: '5 pm',
          status: '0'
        }, {
          id: 5,
          activityName: 'Act4',
          continent: "Asia",
          country: 'Dummy4',
          state: "Dummy4",
          city: 'Dummy4',
          type: "Place",
          lat: '19.2302',
          long: '72.409202',
          openTime: '2 pm',
          closeTime: '5 pm',
          status: '1'
        }, {
          id: 6,
          activityName: 'Act5',
          continent: "Asia",
          country: 'Dummy5',
          state: "Dummy5",
          city: 'Dummy5',
          type: "Place",
          lat: '19.2302',
          long: '72.409202',
          openTime: '2 pm',
          closeTime: '5 pm',
          status: '0'
        }, ];

        $scope.edit = true;
        $scope.error = false;
        $scope.incomplete = false;

        /* To edit activity */

        $scope.editActivity = function(id) {
          if (id == 'new') {
            $scope.formTitle = 'Create New Activity';
             $scope.incomplete = true;
            $scope.act = 'save';
            $scope.activitiesController.city = '';
            $scope.activitiesController.country = '';
            $scope.activitiesController.type = '';
            $scope.activitiesController.continent = '';
            $scope.activitiesController.state = '';
            $scope.activitiesController.lat = '';
            $scope.activitiesController.long = '';
            $scope.activitiesController.openTime = '';
            $scope.activitiesController.closeTime = '';
          } else {
            $scope.formTitle = 'Edit Activity';
            $scope.act = 'update';
            // $scope.activitiesController.city = $scope.activities[id - 1].city;
            // $scope.activitiesController.country = $scope.activities[id - 1].country;
            // $scope.activitiesController.type = $scope.activities[id - 1].type;
            // $scope.activitiesController.continent = $scope.activities[id - 1].continent;
            // $scope.activitiesController.state = $scope.activities[id - 1].state;
            // $scope.activitiesController.lat = $scope.activities[id - 1].lat;
            // $scope.activitiesController.long = $scope.activities[id - 1].long;
            // $scope.activitiesController.openTime = $scope.activities[id - 1].openTime;
            // $scope.activitiesController.closeTime = $scope.activities[id - 1].closeTime;
          }
        };

        /* To get images from flicker */

        $scope.getImages = function(id) {
          alert('Will get flicker images');
        };

        $scope.downloadImages = function(imgs) {
          alert('Will download flicker images');
        };


        $scope.showModal = false;
        $scope.toggleModal = function() {
          $scope.showModal = !$scope.showModal;
        };

        /* saveActivities function inserts activities information in the database*/
        $scope.saveDetails = function() {
          //TODO: save form details in local storage or something similar
        };

        $scope.redirect = function() {
          $window.location.href = "#/slider";
        };

        $scope.saveActivity = function() {
          var activitiesDetails = {
            action: $scope.act,
            continent: $scope.activitiesController.continent,
            country: $scope.activitiesController.country,
            city: $scope.activitiesController.city,
            state: $scope.activitiesController.state,
            type: $scope.activitiesController.type,
            lat: $scope.activitiesController.lat,
            long: $scope.activitiesController.long,
            openTime: $scope.activitiesController.openTime,
            closeTime: $scope.activitiesController.closeTime
          };

          console.log(activitiesDetails);

          var responsePromise = UtilsFactory.doPostCall('/user/activities', activitiesDetails);
          responsePromise.then(function(response) {

            console.log(response);

          });
        }; /* saveContinent ends here */

        /* statusContinent function activates or deactivates Continent information from database*/
        $scope.statusActivity = function(id) {
          if ($scope.activities[id - 1].status === '0')
            $scope.stat = '1';
          else
            $scope.stat = '0';
          var activitiesDetails = {
            action: 'status',
            id: $scope.activities[id - 1].id,
            active: $scope.stat
          };
          console.log(activitiesDetails);
          var responsePromise = UtilsFactory.doPostCall('/user/continent', activitiesDetails);
          responsePromise.then(function(response) {
            console.log(response);
          });
        };
        $scope.statusActivity = function(id) {
          console.log(id);
          var activitiesDetails = {
            findCriteria: {
              city: $scope.activities[id - 1].cityId,
              name: $scope.activities[id - 1].activity
            },
            recordsToUpdate: {
              city: $scope.activities[id - 1].cityId,
              name: $scope.activities[id - 1].activity,
              "active": !$scope.activities[id - 1].status
            }
          };


          console.log(countryDetails);
          var responsePromise = UtilsFactory.doPostCall('/activity/update', activitiesDetails);
          responsePromise.then(function(response) {
            var data = response.data['response'];
            //console.log(data);
            if (response.status == 200) {
              $scope.activities[id - 1].status = !$scope.activities[id - 1].status;
              var message = data['message'];
              window.alert(message);
            }

          }, function(error) {
            var message = error.data.response.message.name[0].message;
            console.log(message);
            window.alert(message);
          });
        };
        /* statusContinent ends here */

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

        // $scope.selects = {
        //   'continent': ['Asia', 'America', 'Africa', 'Australia', 'Europe'],
        //   'country': ['India', 'CA', 'Poland', 'Sydney'],
        //   'city': ['Mumbai', 'Delhi', 'Bangalore']
        // };

        // $scope.selecteds = {};
        // angular.forEach($scope.selects, function(value, key) {
        //   $scope.selecteds[key] = value[0];
        // });



      });