/**
 * Created by Charles on 5/4/16.
 */
'use strict';

var ydCardResourceCtrl = angular.module('ydCardResourceCtrl', []);

ydCardResourceCtrl.controller('ydCardResourceCtrl', ['$scope', '$state', '$ionicHistory',
  function ($scope, $state, $ionicHistory) {

    $scope.back = function () {
      $ionicHistory.nextViewOptions({
        disableBack: true,
        disableAnimate: true
      });
      $ionicHistory.goBack();
    }
  }]);
