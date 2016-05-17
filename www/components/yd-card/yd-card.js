/**
 * Created by Charles on 5/2/16.
 */
'use strict';
/* Yuudee Card Directive */
var ydCardDirective = angular.module('ydCardDirective', []);

ydCardDirective.directive('ydCard', ['$window',
  function ($window) {
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
      scope.title = attrs.title;
      scope.image = attrs.image;
    },
    controller: function($scope, $element, $attrs) {
      var isPlaying = false;
      var onCompleteHandler = function () {
        console.log("complete");
        animation.reverse();
      };

      var onReverseCompleteHandler = function () {
        console.log("reverse complete");
        animation == null;
        isPlaying = false;
      };
      var animation;
      $scope.onCardClick = function () {
        console.log($scope.title + " Card is clicked.");
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
