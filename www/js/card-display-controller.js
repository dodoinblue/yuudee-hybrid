/**
 * Created by Charles on 5/4/16.
 */
'use strict';

var ydCardDisplayCtrl = angular.module('ydCardDisplayCtrl', []);

ydCardDisplayCtrl.controller('ydCardDisplayCtrl', ['$scope', '$state', '$ionicHistory',
  function ($scope, $state, $ionicHistory) {
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
      $ionicHistory.nextViewOptions({
        // To avoid black screen on iOS simulator. To be tested on real device.
        disableAnimate: true
      });
      $state.go('resource');
    }
  }]);
