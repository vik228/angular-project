'use strict';

zopkyFrontendApp.controller('activitiesController', ['$scope', '$http', '$timeout', '$window', 'UtilsFactory', 'CommonMethods', function ($scope, $http, $timeout, $window, UtilsFactory, CommonMethods) {
  $scope.activitiesController = {};

  $scope.activitiesController.lat = '19.1100753';
  $scope.activitiesController.long = '72.8940055';
  $scope.activitiesController.markerLocation = '19.1100753, 72.8940055';
  $scope.activitiesController.hideTA = true;

  $scope.limit = 10;
  $scope.page = 1;
  $scope.continents = [];
  $scope.countries = [];
  $scope.states = [];
  $scope.cities = [];
  $scope.scountries = [];
  $scope.sstates = [];
  $scope.scities = [];
  $scope.activities = [];
  $scope.googleLocations = [];
  $scope.taLocations = [];

  $scope.themes = [
    {id: 1, name: "Cultural"},
    {id: 2, name: "Adventurous"},
    {id: 3, name: "Romantic"},
    {id: 4, name: "Nature"},
    {id: 5, name: "Chilled Out"}
  ]

  $scope.getCityName = function (array, value) {
    for (var i = 0; i < array.length; i++) {
      if (array[i].id == value) {
        console.log(array[i]);
        return array[i].city;
      }
    }
  };

  $scope.searchActivities = function (type) {
    if (type == 0) {
      $scope.activities = [];
    }
    var criteria = "active=true&city=" + $scope.activitiesController.scity;
    CommonMethods.searchActivities($scope.limit, $scope.page, criteria, $scope.activities.length, function (data) {
      $scope.activities = $scope.activities.concat(data);
    });
  };

  $scope.getMoreActivities = function () {
    $scope.page++;
    $scope.searchActivities(1);
  };

  //$scope.getActiveContinents = function() {
  //  var criteria = "active=true";
  //  CommonMethods.searchContinents(100, 0,criteria, 0, "continents", function(data) {
  //  CommonMethods.searchContinents(100, 0,criteria, 0, "continents", function(data) {
  //    $scope.continents = data;
  //    $scope.activitiesController.country = "";
  //    $scope.activitiesController.state = "";
  //    $scope.activitiesController.city = "";
  //  });
  //};

  $scope.getActiveCountries = function () {
    var criteria = "active=true";
    CommonMethods.searchCountries(100, 1, criteria, 0, "countries", function (data) {
      $scope.countries = data;
      $scope.activitiesController.state = "";
      $scope.activitiesController.city = "";
      $scope.activitiesController.sstate = "";
      $scope.activitiesController.scity = "";
    });
  };

  $scope.getActiveStatesByCountries = function (type) {
    if (type == 0) {
      var criteria = "active=true&country=" + $scope.activitiesController.scountry;
    } else {
      var criteria = "active=true&country=" + $scope.activitiesController.country;
    }
    CommonMethods.searchStates(100, 1, criteria, 0, "cities", function (data) {
      if (type == 0) {
        $scope.sstates = data;
        $scope.activities = [];
        $scope.activitiesController.scity = "";
      } else {
        $scope.states = data;
        $scope.activitiesController.city = "";
      }
    });
  };

  $scope.getActiveCitiesByStates = function (type) {
    if (type == 0) {
      var criteria = "active=true&state=" + $scope.activitiesController.sstate;
    } else {
      var criteria = "active=true&state=" + $scope.activitiesController.state;
    }
    CommonMethods.searchCities(100, 1, criteria, $scope.cities.length, "cities", function (data) {
      if (type == 0) {
        $scope.scities = data;
        $scope.activities = [];
      } else {
        $scope.cities = data;
      }
    });
  };

  $scope.getActiveCountries();

  $scope.getGoogleLocation = function (address) {
    CommonMethods.getGoogleLocation(($scope.activitiesController.activityName + ", " + $scope.getCityName($scope.cities, $scope.activitiesController.city)).replace(" ", "%20"), function (data) {
      $scope.googleLocations = [];
      for (var i = 0; i < data.length; i++) {
        var response = {};
        response.name = data[i].formatted_address;
        response.location = data[i].geometry.location;
        $scope.googleLocations.push(response);
      }

    });
  };

  $scope.onLocationSelected = function (data) {
    console.log(data);

    $scope.activitiesController.lat = data.location.lat;
    $scope.activitiesController.long = data.location.lng;

    $scope.getTALocation();

  };

  $scope.getTALocation = function () {
    var address = ($scope.activitiesController.activityName).replace(" ", "%20");
    CommonMethods.getTALocations(address, $scope.activitiesController.lat, $scope.activitiesController.long, function (data) {
      $scope.taLocations = [];
      for (var i = 0; i < data.length; i++) {
        var taLocation = {};
        taLocation.location_id = data[i].location_id;
        taLocation.name = data[i].name;
        $scope.taLocations.push(taLocation);
      }

      $scope.activitiesController.hideTA = false;
    });
  };

  /*  var marker, map;
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
   } */

  $scope.edit = true;
  $scope.error = false;
  $scope.incomplete = false;

  /* To edit activity */

  $scope.editActivity = function (id) {
    if (id == 'new') {
      $scope.formTitle = 'Create New Activity';
      $scope.incomplete = true;
      $scope.act = 'add';
      $scope.activitiesController.city = '';
      $scope.activitiesController.country = $scope.activitiesController.scountry;
      $scope.activitiesController.theme = '';
      $scope.activitiesController.state = '';
      $scope.activitiesController.lat = '';
      $scope.activitiesController.long = '';
      $scope.activitiesController.openTime = '';
      $scope.activitiesController.closeTime = '';
      $scope.activitiesController.activityName = '';
      $scope.activitiesController.price = '';
      $scope.activitiesController.currency = '';
      $scope.activitiesController.duration = '';
      $scope.activitiesController.talocation = '';
    } else {
      $scope.formTitle = 'Edit Activity';
      $scope.act = 'update';

      $scope.oldname = $scope.activities[id - 1].name;
      $scope.oldcity = $scope.activities[id - 1].cityId;
      $scope.oldId = $scope.activities[id - 1].id;

      $scope.activitiesController.city = $scope.activitiesController.scity;
      $scope.activitiesController.country = $scope.activitiesController.scountry;
      $scope.activitiesController.theme = $scope.activities[id - 1].theme;
      $scope.activitiesController.state = $scope.activitiesController.sstate;
      $scope.activitiesController.lat = $scope.activities[id - 1].lat;
      $scope.activitiesController.long = $scope.activities[id - 1].lon;
      $scope.activitiesController.openTime = $scope.activities[id - 1].openTime;
      $scope.activitiesController.closeTime = $scope.activities[id - 1].closeTime;
      $scope.activitiesController.activityName = $scope.activities[id - 1].name;
      $scope.activitiesController.price = $scope.activities[id - 1].price;
      $scope.activitiesController.currency = $scope.activities[id - 1].currency;
      $scope.activitiesController.duration = $scope.activities[id - 1].duration;
    }
  };

  /* To get images from flicker */

  $scope.getImages = function (id) {
    alert('Will get flicker images');
  };

  $scope.downloadImages = function (imgs) {
    alert('Will download flicker images');
  };


  $scope.showModal = true;
  $scope.toggleModal = function () {
    $scope.showModal = !$scope.showModal;
    alert("hello");
  };

  /* saveActivities function inserts activities information in the database*/
  $scope.saveDetails = function () {
    //TODO: save form details in local storage or something similar
  };

  $scope.redirect = function () {
    $window.location.href = "#/slider";
  };

  $scope.saveActivity = function () {
    var priceObject = {}, location = {}, theme = [], themeObject = {};

    priceObject.price = $scope.activitiesController.price;
    priceObject.currency = $scope.activitiesController.currency;

    location.lat = $scope.activitiesController.lat;
    location.long = $scope.activitiesController.long;

    for (var i = 0; i < $scope.activitiesController.theme.length; i++) {
      themeObject.id = $scope.activitiesController.theme[i];
      theme.push(themeObject);
    }

    if ($scope.act === 'add') {
      var activitiesDetails = [{
        //action: $scope.act,
        city: $scope.activitiesController.city,
        theme: theme,
        location: location,
        duration: $scope.activitiesController.duration,
        openTime: $scope.activitiesController.openTime,
        closeTime: $scope.activitiesController.closeTime,
        name: $scope.activitiesController.activityName,
        price: priceObject,
        location_id: $scope.activitiesController.talocation
      }];

      console.log(activitiesDetails);

      var responsePromise = UtilsFactory.doPostCall('/activity/add', activitiesDetails);
      responsePromise.then(function (response) {

        var data = response.data['response'];
        if (response.status == 200) {
          $scope.toggleModal();
          var message = data['message'];
          window.alert(message);
        }

      }, function (error) {
        $scope.toggleModal();
        var message = error.data.response.message.name[0].message;
        console.log(message);
        window.alert(message);
      });
    } else if ($scope.act === 'update') {
      var hotelDetails = {
        findCriteria: {
          name: $scope.oldname,
          city: $scope.oldcity,
          id: $scope.oldId
        },
        recordsToUpdate: {
          city: $scope.activitiesController.city,
          theme: theme,
          location: location,
          duration: $scope.activitiesController.duration,
          openTime: $scope.activitiesController.openTime,
          closeTime: $scope.activitiesController.closeTime,
          name: $scope.activitiesController.activityName,
          price: priceObject,
          location_id: $scope.activitiesController.talocation
        }
      };
      console.log(hotelDetails);

      var responsePromise = UtilsFactory.doPostCall('/hotel/update', hotelDetails);
      responsePromise.then(function (response) {
        var data = response.data['response'];
        //console.log(data);
        if (response.status == 200) {
          $scope.toggleModal();
          var message = data['message'];
          $window.alert(message);
        }

      }, function (error) {
        $scope.toggleModal();
        var message = error.data.response.message.name[0].message;
        console.log(message);
        $window.alert(message);
      });
    }
  };
  /* saveActivity ends here */

  /* statusContinent function activates or deactivates Continent information from database*/

  $scope.statusActivity = function (id) {
    console.log(id);
    var activitiesDetails = {
      findCriteria: {
        id: $scope.activities[id - 1].id,
        city: $scope.activities[id - 1].cityId,
        name: $scope.activities[id - 1].name
      },
      recordsToUpdate: {
        id: $scope.activities[id - 1].id,
        city: $scope.activities[id - 1].cityId,
        name: $scope.activities[id - 1].name,
        active: !$scope.activities[id - 1].status
      }
    };

    var responsePromise = UtilsFactory.doPostCall('/activity/update', activitiesDetails);
    responsePromise.then(function (response) {
      var data = response.data['response'];
      //console.log(data);
      if (response.status == 200) {
        $scope.activities[id - 1].status = !$scope.activities[id - 1].status;
        var message = data['message'];
        window.alert(message);
      }

    }, function (error) {
      var message = error.data.response.message.name[0].message;
      console.log(message);
      window.alert(message);
    });
  };
  /* statusContinent ends here */

  $scope.loadMap = function () {
    $scope.maplat = $scope.activitiesController.lat;
    $scope.maplong = $scope.activitiesController.long;

    $scope.activitiesController.markerLocation = $scope.maplat + ", " + $scope.maplong;
    console.log($scope.activitiesController.markerLocation);

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
      function () {
        document.getElementById('lat').value = marker.position.lat();
        document.getElementById('lng').value = marker.position.lng();
      }
    );
  };


}]);
