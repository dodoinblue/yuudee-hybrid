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

    // placeholder while loading contents
    $scope.card_bg_image = "img/card_bg.png";
    $scope.image = "img/dummy_content.jpg";
    $scope.title = "Loading...";

    $scope.images = ["img/dummy_content.jpg"];
    $scope.audios = ["card-assets/dummy_audio.mp3"];
    $scope.isStack = false;

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

ydCardDirective.directive('ydCard', ['ydCardService',

  function (ydCardService) {
    return {
      restrict: 'AE',
      scope: true,
      templateUrl: 'components/yd-card/yd-card.html',

      link: function (scope, el, attrs) {
        scope.fileName = attrs.name;
        scope.parentPath = attrs.parent;
        var data = JSON.parse(attrs.data);

        if (data.isStack) {
          // this is a stack
          scope.isStack = true;
          scope.card_bg_image = "img/cat_bg.png";
          scope.image = data.cover ? ydCardService.resRoot + data.cover : "img/dummy_content.jpg";
          scope.title = data.name;
          scope.path = data.path;
        } else {
          // this is a card
          scope.title = data.name;
          var audios = [];
          for (var i = 0; i < data.audios.length; i++) {
            audios.push(ydCardService.resRoot + data.path + '/audios/' + data.audios[i]);
          }
          var images = [];
          for (var i = 0; i < data.images.length; i++) {
            images.push(ydCardService.resRoot + data.path + '/images/' + data.images[i]);
          }
          scope.audios = audios;
          scope.images = images;
          scope.image = images[0];
        }
      },
      controller: 'ydCardCtrl'
    };
  }]);
