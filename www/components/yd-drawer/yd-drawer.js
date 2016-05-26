/**
 * Created by Charles on 5/4/16.
 */
'use strict';

var ydDrawer = angular.module('ydDrawer', []);

ydDrawer.directive('ydDrawer', [
  function () {
    return {
      restrict: 'E',
      scope: true,
      templateUrl: 'components/yd-drawer/yd-drawer.html',

      link: function (scope, el, attrs) {
        scope.path = attrs.path;
        scope.isbase = eval(attrs.isbase);
      },
      controller: function ($scope) {

      }
    }
  }]);
