'use strict';

zopkyFrontendApp.controller('imgSliderController',
  ["$scope", "$localStorage", "$window", "CommonMethods", '$timeout', '$rootScope','dialogs',
  function($scope,  $localStorage, $window, CommonMethods, $timeout, $rootScope, dialogs) {

    var _progress = 100;
    var _fakeWaitProgress = function(duration){
      $timeout(function(){
        $rootScope.$broadcast('dialogs.wait.complete');
      }, duration);
    };

        $scope.slides = [];
        $scope.selectedImages = [];
        $scope.imgSliderController = {};
        $scope.imgSliderController.caption = '';
        $scope.imgSliderController.isChecked = false;
        $scope.limit = 50;
        $scope.page=1;

  //get the details from local storage
  //$scope.tags='Taj Mahal';
  //$scope.latitude='27.1750151';
  //$scope.longitude='78.0421552';

        if($localStorage.activityAdded != null){
            $scope.tags = $localStorage.activityAdded[0].name;
            $scope.latitude=$localStorage.activityAdded[0].location.lat;
            $scope.longitude=$localStorage.activityAdded[0].location.long;

        var links = [];

        $scope.getFlickrImages = function() {
            //TODO: define $scope.criteria
            CommonMethods.getAllFlickrImages($scope.limit, $scope.page, $scope.tags, $scope.latitude, $scope.longitude, function(data) {
                //$scope.slides = $scope.slides.concat(data);
              $('#links').empty();
                $.each(data.photos.photo, function(index, photo) {
                    var baseUrl = 'http://farm' + photo.farm + '.static.flickr.com/' +
                        photo.server + '/' + photo.id + '_' + photo.secret;

                    var image = {};
                    image.image = baseUrl + '_b.jpg';
                    image.index = index;
                    image.ownerId = photo.owner;
                    image.photoId = photo.id;
                    image.flickrTitle = photo.title;

                    links.push(image);
                  //console.log(image);

                    $('<img>')
                        .prop('src', baseUrl + '_s.jpg')
                        .prop('title', photo.title)
                        .attr('id', index)
                        .appendTo($('#links'));
                });
              //console.log(links);
              $scope.slides=links;
            });
        };

      $scope.getFlickrImages();

        $('#links').bind('click', function(event) {
            if ($scope.imgSliderController.isChecked) {
                if ($scope.imgSliderController.caption != null && $scope.imgSliderController.caption.trim().length > 0) {

                    var data = $scope.slides[$scope.currentIndex];
                    data.caption = $scope.imgSliderController.caption;
                    $scope.selectedImages.push(data);
                    $scope.imgSliderController.isChecked = false;

                    var index = event.target.id;
                    $scope.imgSliderController.caption = event.target.title;
                    $scope.currentIndex = index;
                    $('.arrow').click();
                } else {
                    $window.alert("please insert caption");
                }
            } else {
                var index = event.target.id;
                $scope.imgSliderController.caption = event.target.title;
                $scope.currentIndex = index;
                $('.arrow').click();
            }
        });

        $scope.direction = 'left';
        $scope.currentIndex = 0;

        $scope.onImageSubmitted = function() {

            if ($scope.imgSliderController.isChecked) {
                if ($scope.imgSliderController.caption != null && $scope.imgSliderController.caption.trim().length > 0) {
                    //TODO: change image
                    var data = $scope.slides[$scope.currentIndex];
                    data.caption = $scope.imgSliderController.caption;
                    $scope.selectedImages.push(data);
                    $scope.imgSliderController.isChecked = false;
                    $scope.imgSliderController.caption = "";

                } else {
                    $window.alert("please insert caption");
                }
            }

            //TODO: save in local storage, go to activity page
            $localStorage.selectedImages = $scope.selectedImages;
            console.log($scope.selectedImages);

            //TODO:  go to activity and continue/ post activity to db
            $window.location.href = '#/navtab';
        };

        $scope.isCurrentSlideIndex = function(index) {
            return $scope.currentIndex === index;
        };

        $scope.prevSlide = function() {
            if ($scope.imgSliderController.isChecked) {
                if ($scope.imgSliderController.caption != null && $scope.imgSliderController.caption.trim().length > 0) {

                  var id = $scope.currentIndex+1;
                  console.log(id);
                  $('#links img:nth-child('+id+')').replaceWith( $('<img>')
                    .prop('src','favicon.ico'));

                    console.log($scope.imgSliderController.caption);
                    var data = $scope.slides[$scope.currentIndex];
                    data.caption = $scope.imgSliderController.caption;
                    $scope.selectedImages.push(data);

                    $scope.imgSliderController.isChecked=false;
                    $scope.imgSliderController.caption = "";
                    $scope.direction = 'right';
                    $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : 0;
                } else {
                    $window.alert("please insert caption");
                }
            } else {
                $scope.imgSliderController.caption = "";
                $scope.direction = 'right';
                $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : 0;
            }
        };

        $scope.nextSlide = function() {
            if ($scope.imgSliderController.isChecked) {
                if ($scope.imgSliderController.caption != null && $scope.imgSliderController.caption.trim().length > 0) {

                  var id = $scope.currentIndex+1;
                  console.log(id);
                  $('#links img:nth-child('+id+')').replaceWith( $('<img>')
                    .prop('src','favicon.ico'));

                    var data = $scope.slides[$scope.currentIndex];
                    data.caption = $scope.imgSliderController.caption;
                    $scope.selectedImages.push(data);

                    $scope.imgSliderController.isChecked=false;
                    $scope.imgSliderController.caption = "";
                    $scope.direction = 'left';
                    $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : $scope.slides.length - 1;
                } else {
                    $window.alert("please insert caption");
                }
            } else {
                $scope.imgSliderController.caption = "";
                $scope.direction = 'left';
                $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : $scope.slides.length - 1;
            }
        };

        }else{
          dialogs.wait("Data not found","Please add details first",0);
          _fakeWaitProgress(2000);
        }
  }])
    .animation('.slide-animation', function() {
        return {
            beforeAddClass: function(element, className, done) {
                var scope = element.scope();

                if (className == 'ng-hide') {
                    var finishPoint = element.parent().width();
                    if (scope.direction !== 'right') {
                        finishPoint = -finishPoint;
                    }
                    TweenMax.to(element, 0.5, {
                        left: finishPoint,
                        onComplete: done
                    });
                } else {
                    done();
                }
            },
            removeClass: function(element, className, done) {
                var scope = element.scope();

                if (className == 'ng-hide') {
                    element.removeClass('ng-hide');

                    var startPoint = element.parent().width();
                    if (scope.direction === 'right') {
                        startPoint = -startPoint;
                    }

                    TweenMax.fromTo(element, 0.5, {
                        left: startPoint
                    }, {
                        left: 0,
                        onComplete: done
                    });
                } else {
                    done();
                }
            }
        };
    });
