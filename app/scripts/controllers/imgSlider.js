'use strict';

zopkyFrontendApp.controller('imgSliderController', function($scope,  $localStorage, $window) {
        $scope.slides = [];
        $scope.selectedImages = [];
        $scope.imgSliderController = {};
        $scope.imgSliderController.caption = '';
        $scope.imgSliderController.isChecked = false;

        $scope.getFlickrImages = function() {
            //TODO: define $scope.criteria
            CommonMethods.getFlickrImages($scope.tags, $scope.latitude, $scope.longitude, function(data) {
                $scope.activities = $scope.activities.concat(data);

                $.each(data.photos.photo, function(index, photo) {
                    var baseUrl = 'http://farm' + photo.farm + '.static.flickr.com/' +
                        photo.server + '/' + photo.id + '_' + photo.secret;

                    var image = {};
                    image.url = baseUrl + '_b.jpg';
                    image.index = index;
                    image.ownerId = photo.owner;
                    image.photoId = photo.id;
                    image.flickrTitle = photo.title;

                    $scope.slides.push(image);

                    $('<img>')
                        .prop('src', baseUrl + '_s.jpg')
                        .prop('title', photo.title)
                        .attr('id', index)
                        .appendTo(linksContainer);
                });
            });
        };

//TODO: replace withabove get method
        var links = [];
        $.ajax({
            url: 'https://api.flickr.com/services/rest/',
            data: {
                format: 'json',
                method: 'flickr.photos.search',
                api_key: '7617adae70159d09ba78cfec73c13be3',
                tags: 'Taj Mahal',
                privacy_filter: 1
            },
            dataType: 'jsonp',
            jsonp: 'jsoncallback'
        }).done(function(result) {
            var linksContainer = $('#links'),
                baseUrl;
            // Add the demo images as links with thumbnails to the page:
            $.each(result.photos.photo, function(index, photo) {
                baseUrl = 'http://farm' + photo.farm + '.static.flickr.com/' +
                    photo.server + '/' + photo.id + '_' + photo.secret;

                var imageDes = 'Image';
                if (index < 10) {
                    imageDes = imageDes + ' 0' + index;
                } else {
                    imageDes = imageDes + ' ' + index;
                }

                var imgObject = {
                    image: baseUrl + '_b.jpg',
                    description: imageDes
                };
                links.push(imgObject);

                $('<img>')
                    .prop('src', baseUrl + '_s.jpg')
                    .prop('title', photo.title)
                    .attr('id', index)
                    .appendTo(linksContainer);
            });
        });
        $scope.slides = links;

        $('#links').bind('click', function(event) {
            if ($scope.imgSliderController.isChecked) {
                if ($scope.imgSliderController.caption != null && $scope.imgSliderController.caption.trim().length > 0) {
                    //TODO: change image
                    //$('*[id=' + $scope.currentIndex + ']').prop('src') = 'favicon.ico';

                    var data = $scope.slides[$scope.currentIndex];
                    data.caption = $scope.imgSliderController.caption;
                    $scope.selectedImages.push(data);
                    $scope.imgSliderController.isChecked = !$scope.imgSliderController.isChecked;

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

        $scope.onImageSelected = function() {
            $scope.selectedImage = "favicon.ico";

            if ($scope.imgSliderController.isChecked) {
                if ($scope.imgSliderController.caption != null && $scope.imgSliderController.caption.trim().length > 0) {
                    //TODO: change image
                    var data = $scope.slides[$scope.currentIndex];
                    data.caption = $scope.imgSliderController.caption;
                    $scope.selectedImages.push(data);
                    $scope.imgSliderController.caption = "";
                    $scope.imgSliderController.isChecked = false;
                } else {
                    $window.alert("please insert caption");
                }
            }

            //TODO: save in local storage, go to activity page
            $localStorage.selectedImages = $scope.selectedImages;
            console.log($scope.selectedImages);                     

            //TODO:  go to activity and continue
            $window.location.href = '#/navtab';
        };

        $scope.isCurrentSlideIndex = function(index) {
            return $scope.currentIndex === index;
        };

        $scope.prevSlide = function() {
            if ($scope.imgSliderController.isChecked) {
                if ($scope.imgSliderController.caption != null && $scope.imgSliderController.caption.trim().length > 0) {
                    //TODO: change image
                    console.log($scope.imgSliderController.caption);
                    var data = $scope.slides[$scope.currentIndex];
                    data.caption = $scope.imgSliderController.caption;
                    $scope.selectedImages.push(data);

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
                    //TODO: change image
                    console.log($scope.imgSliderController.caption);
                    var data = $scope.slides[$scope.currentIndex];
                    data.caption = $scope.imgSliderController.caption;
                    $scope.selectedImages.push(data);

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

    })
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