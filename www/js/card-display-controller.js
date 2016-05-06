/**
 * Created by Charles on 5/4/16.
 */
'use strict';

var ydCardDisplayCtrl = angular.module('ydCardDisplayCtrl', []);

ydCardDisplayCtrl.controller('ydCardDisplayCtrl', ['$scope',
  function ($scope) {
    $scope.isEditMode = false;
    $scope.enterEditMode = function () {
      if (!$scope.isEditMode) {
        $scope.isEditMode = true;
      }

    };

    $scope.exitEditMode = function () {
      $scope.isEditMode = false;
    }
  }]);
