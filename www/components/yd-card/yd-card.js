/**
 * Created by Charles on 5/2/16.
 */
'use strict';
/* Yuudee Card Directive */
var ydCardDirective = angular.module('ydCardDirective', ['ngAudio']);

ydCardDirective.service('ydCardUtil', ['$window', 'ngAudio', '$timeout', '$interval',
  function ($window, ngAudio, $timeout, $interval) {

    var getWindowSize = function () {
      return {
        height: $window.innerHeight,
        width: $window.innerWidth
      }
    };

    var calcToCenterParams = function (win, rect) {
      var scale = win.width / rect.width;
      var winCenterLeft = win.width / 2;
      var winCenterTop = win.height / 2;
      var cardCenterLeft = rect.left + rect.width / 2;
      var cardCenterTop = rect.top + rect.height / 2;
      var xTrans = winCenterLeft - cardCenterLeft;
      var yTrans = winCenterTop - cardCenterTop;

      return {
        scaleX: scale,
        scaleY: scale,
        x: xTrans,
        y: yTrans
      }

    };

    var buildAnimation = function (toCenterParams, el, onCompleteHandler, onReverseCompleteHandler) {
      var animationParams = toCenterParams;
      animationParams.zIndex = 999;
      animationParams.paused = true;
      animationParams.onComplete = onCompleteHandler;
      animationParams.onReverseComplete = onReverseCompleteHandler;

      return TweenLite.to(el, 1, animationParams);
    };

    var isPlaying = false;
    var onCompleteHandler = function (scope) {
      var slideshow = imageSlideshow(scope);
      ngAudio.load(scope.audios[0]).play();

      $timeout(function () {
        animation.reverse();
        $interval.cancel(slideshow);
        scope.image = scope.images[0];
      }, 3000);
      // animation.reverse();
    };

    var imageSlideshow = function (scope) {
      var i = 1;
      return $interval(function () {
        scope.image = scope.images[i];
        i++;
        if (i === scope.images.length) {
          i = 0;
        }
      }, 500);
    };

    var onReverseCompleteHandler = function () {
      animation = null;
      isPlaying = false;
    };

    var animation;
    var playCard = function (el, scope) {
      if (!animation) {
        animation = buildAnimation(calcToCenterParams(getWindowSize(), el.getBoundingClientRect()), el,
          onCompleteHandler(scope), onReverseCompleteHandler)
      }
      if (!animation.isActive() && !isPlaying) {
        animation.play();
        isPlaying = true;
      }
    };

    var showDrawer = function (scope) {
      scope.$emit('SUB_DRAWER_SHOW', scope.path);
    };

    // Export methods
    this.getWindowSize = getWindowSize;
    this.calcToCenterParams = calcToCenterParams;
    // this.buildAnimation = buildAnimation;
    this.playCard = playCard;
    this.showDrawer = showDrawer;
  }]);

ydCardDirective.controller('ydCardCtrl', ['$scope', '$element', 'ydCardService', 'ydCardUtil',
  function ($scope, $element, ydCardService, ydCardUtil) {

    $scope.card_bg_image = "../img/card_bg.png";
    $scope.image = "../img/dummy_content.jpg";
    $scope.title = "Loading...";

    $scope.images = ["../img/dummy_content.jpg"];
    $scope.audios = ["../card-assets/dummy_audio.mp3"];
    $scope.isStack = false;

    $scope.$watch('fileName', function (newVal) {
      var fileName = newVal;

      if (fileName.indexOf('.xydcard', fileName.length - '.xydcard'.length) !== -1) {
        ydCardService.parseCard($scope.parentPath, fileName).then(function (card) {
          $scope.title = card.title;
          $scope.audios = card.audios;
          $scope.images = card.images;
          $scope.image = $scope.images[0];
          // $scope.sound = ngAudio.load(audios[0]);
        }).catch(function (error) {
          console.log('error.');
        });
      } else {
        ydCardService.parseStack($scope.parentPath + '/' + fileName).then(function (stack) {
          $scope.isStack = true;
          $scope.card_bg_image = "../img/cat_bg.png";
          $scope.image = stack.cover;
          $scope.title = stack.title;
          $scope.path = stack.path;

        }).catch(function (error) {
          console.log('error.');
        });
      }
    });

    $scope.onCardClick = function () {
      if ($scope.isStack) {
        ydCardUtil.showDrawer($scope);
      } else {
        ydCardUtil.playCard($element[0].parentElement, $scope);
      }
    };

    $scope.onEditClick = function () {
      console.log($scope.title + " Card Edit is clicked.")
    };
  }
]);

ydCardDirective.directive('ydCard', [

  function () {
    return {
      restrict: 'AE',
      scope: true,
      templateUrl: 'components/yd-card/yd-card.html',

      link: function (scope, el, attrs) {
        scope.fileName = attrs.name;
        scope.parentPath = attrs.parent;
      },
      controller: 'ydCardCtrl'
    };
  }]);
