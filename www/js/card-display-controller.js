/**
 * Created by Charles on 5/4/16.
 */
'use strict';

var ydCardDisplayCtrl = angular.module('ydCardDisplayCtrl', []);

ydCardDisplayCtrl.controller('ydCardDisplayCtrl', ['$scope', '$state', 'ydCardService', '$element', '$compile',
  function ($scope, $state, ydCardService, $element, $compile) {

    $scope.isEditMode = false;
    $scope.enterEditMode = function () {
      if (!$scope.isEditMode) {
        $scope.isEditMode = true;
      }
    };

    $scope.exitEditMode = function () {
      $scope.isEditMode = false;
    };

    $scope.goToResource = function () {
      $state.go('resource');
    };

    $scope.row = 2;
    $scope.col = 2;

    // Test code here. To be removed.
    $scope.clicked = false;
    $scope.testClick = function () {
      $scope.clicked = !$scope.clicked;
      TweenLite.from(".drawer", 2, {x: '110%'});
    };

    $scope.$on('SUB_DRAWER_SHOW', function (event, extras) {
      var id = new Date().getTime();
      showDrawer(false, extras, id);
    });

    var showDrawer = function (isbase, path, id) {
      var template = '<yd-drawer isbase="' + isbase
        + '" path="' + path
        + '" drawerid="' + id
        + '"></yd-drawer>';

      var newElement = $compile(template)($scope);
      $element.append(newElement);
    };


  }]);


