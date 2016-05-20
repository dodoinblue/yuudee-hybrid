/**
 * Created by Charles on 5/2/16.
 */
'use strict';
/* Yuudee Card Directive */
var ydCardDirective = angular.module('ydCardDirective', ['ngAudio']);

ydCardDirective.directive('ydCard', ['$window', 'ydCardService', '$interval', '$timeout', 'ngAudio',

  function ($window, ydCardService, $interval, $timeout, ngAudio) {
    var w = angular.element($window)[0];
    // console.log('window size: ', w.innerWidth, ' x ', w.innerHeight);

    // This animation enlarge the card to the center of the card display area.
    var buildAnimation = function (windowW, windowH, element, onCompleteHandler, onReverseCompleteHandler) {
      var rect = element.getBoundingClientRect();
      var scale = windowW / rect.width;
      var winCenterLeft = windowW / 2;
      var winCenterTop = windowH / 2;
      var cardCenterLeft = rect.left + rect.width / 2;
      var cardCenterTop = rect.top + rect.height / 2;
      var xTrans = winCenterLeft - cardCenterLeft;
      var yTrans = winCenterTop - cardCenterTop;

      var params = {
        scaleX:scale,
        scaleY:scale,
        x:xTrans,
        y:yTrans,
        zIndex: 9999,
        paused: true,
        onComplete: onCompleteHandler,
        onReverseComplete: onReverseCompleteHandler
      };

      return TweenLite.to(element, 1, params);
    };

  return {
    restrict: 'AE',
    scope: true,
    templateUrl: 'components/yd-card/yd-card.html',

    link: function (scope, el, attrs) {
      scope.fileName = attrs.name;
      scope.parentPath = attrs.parent;
    },
    controller: function($scope, $element, $attrs) {
      $scope.card_bg_image = "../img/card_bg.png";
      $scope.image = "../img/dummy_content.jpg";
      $scope.title = "Loading...";
      var images = ["../img/dummy_content.jpg"];
      var audios = ["../card-assets/dummy_audio.mp3"];
      var isStack = false;

      $scope.$watch('fileName', function(newVal){
        var fileName = newVal;

        if (fileName.indexOf('.xydcard', fileName.length - '.xydcard'.length) !== -1) {
          ydCardService.parseCard($scope.parentPath, fileName).then(function (card) {
            $scope.isStack = card.isStack;
            if (card.isStack === true) {
              $scope.card_bg_image = "../img/cat_bg.png";
            }
            $scope.title = card.title;
            audios = card.audios;
            images = card.images;
            $scope.image = images[0];
            $scope.sound = ngAudio.load(audios[0]);
          }).catch(function (error) {
            console.log('error.');
          });
        } else {
          ydCardService.parseStack($scope.parentPath, fileName).then(function(stack) {
            $scope.isStack = true;
            $scope.card_bg_image = "../img/cat_bg.png";
            $scope.image=stack.cover;
          }).catch(function(error) {
            console.log('error.');
          });
        }
      });

      var isPlaying = false;
      var onCompleteHandler = function () {
        console.log("complete");
        var slideshow = imageSlideshow();
        $scope.sound.play();

        $timeout(function(){
          animation.reverse();
          $interval.cancel(slideshow);
          $scope.image = images[0];
        }, 3000);
        // animation.reverse();
      };

      var imageSlideshow = function () {
        var i = 1;
        return $interval(function(){
          $scope.image = images[i];
          i ++;
          if (i === images.length) {
            i = 0;
          }
        }, 500);
      };

      var onReverseCompleteHandler = function () {
        console.log("reverse complete");
        animation == null;
        isPlaying = false;
      };
      var animation;
      $scope.onCardClick = function () {
        console.log($scope);
        if (!animation) {
          animation = buildAnimation(w.innerWidth, w.innerHeight, $element[0].parentElement,
            onCompleteHandler, onReverseCompleteHandler);
        }
        if (!animation.isActive() && !isPlaying) {
          animation.play();
          isPlaying = true;
        }
      };

      $scope.onEditClick = function() {
        console.log($scope.title + " Card Edit is clicked.")
      }
    }
  };
}]);
