/**
 * Created by Charles on 5/4/16.
 */
'use strict';

var ydCardDisplayCtrl = angular.module('ydCardDisplayCtrl', []);

ydCardDisplayCtrl.controller('ydCardDisplayCtrl', ['$scope', '$state', 'ydCardService',
  function ($scope, $state, ydCardService) {

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

    $scope.$on('SUB_DRAWER_CLOSE', function (event, extras) {
      closeDrawer();
    });

    var showDrawer = function (isbase, path, id) {
      $scope.drawers.push({
        drawerid: id,
        path: path,
        isbase: false
      })
    };

    var closeDrawer = function () {
      var drawer = $scope.drawers.pop();
    };

    $scope.drawers = [];
    $scope.drawers.push({
      drawerid: 0,
      path: '../card-assets',
      isbase: true
    });
  }]);


