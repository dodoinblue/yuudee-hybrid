/**
 * Created by Charles on 5/2/16.
 */
'use strict';
/* Yuudee Card Directive */
var ydCardDirective = angular.module('ydCardDirective', []);

ydCardDirective.directive('ydCard', [
  function ($rootScope) {
  return {
    restrict: 'AE',
    scope: true,
    templateUrl: 'components/yd-card/yd-card.html',

    link: function (scope, el, attrs) {
      scope.title = attrs.title;
      scope.onCardClick = function() {
        console.log(scope.title + " Card is clicked.")
      };
      scope.onEditClick = function() {
        console.log(scope.title + " Card Edit is clicked.")
      }
    }
  };
}]);
