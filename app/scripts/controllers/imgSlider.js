'use strict';

zopkyFrontendApp.controller('imgSliderController', function($scope) {
        $scope.slides = [];

        $scope.getFlickrImages = function() {
            //TODO: define $scope.criteria
            CommonMethods.getFlickrImages($scope.tags, $scope.latitude, $scope.longitude, function(data) {
                $scope.activities = $scope.activities.concat(data);
                // Add the demo images as links with thumbnails to the page:
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

                    // var imgObject = {
                    //     image: baseUrl + '_b.jpg',
                    //     description: imageDes
                    // };
                    // links.push(imgObject);

                    $('<img>')
                        .prop('src', baseUrl + '_s.jpg')
                        .prop('title', photo.title)
                        .attr('id', index)
                        .appendTo(linksContainer);
                });
            });
        };

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
            var index = event.target.id;
            console.log("index: " + index);
            $scope.currentIndex = index;
            $('.arrow').click();
        });

        // $scope.slides = [
        //     {image: 'http://farm1.static.flickr.com/260/18577849653_f310e0f6f7_b.jpg', description: 'Image 00'},
        //     {image: 'http://farm1.static.flickr.com/494/19453268090_cf9a87188a_b.jpg', description: 'Image 01'},
        //     {image: 'http://farm4.static.flickr.com/3765/19348071698_64b2311f9f_b.jpg', description: 'Image 02'},
        //     {image: 'http://farm1.static.flickr.com/272/19333133012_3235653356_b.jpg', description: 'Image 03'},
        //     {image: 'http://farm1.static.flickr.com/342/19058778119_40bc075676_b.jpg', description: 'Image 04'}
        // ];

        $scope.direction = 'left';
        $scope.currentIndex = 0;

        $scope.setCurrentSlideIndex = function(index) {
            $scope.direction = (index > $scope.currentIndex) ? 'left' : 'right';
            $scope.currentIndex = index;
        };

        $scope.isCurrentSlideIndex = function(index) {
            return $scope.currentIndex === index;
        };

        $scope.prevSlide = function() {
            $scope.direction = 'left';
            $scope.currentIndex = ($scope.currentIndex < $scope.slides.length - 1) ? ++$scope.currentIndex : 0;
        };

        $scope.nextSlide = function() {
            $scope.direction = 'right';
            $scope.currentIndex = ($scope.currentIndex > 0) ? --$scope.currentIndex : $scope.slides.length - 1;
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