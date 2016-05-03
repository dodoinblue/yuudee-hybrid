/**
 * Created by Charles on 5/2/16.
 */
'use strict';
/* Yuudee Card Directive */
var ydCardDirective = angular.module('ydCardDirective', []);

ydCardDirective.directive('ydCard', function () {
  return {
    restrict: 'AE',
    templateUrl: 'components/yd-card/yd-card.html',
    scope: {
      title: '@'
    },
    link: function (scope, el, attrs) {
      scope.title = attrs.title;
    }
  };
});
