/**
 * Created by Charles on 5/3/16.
 */
'use strict';

var ydRoutes = angular.module('ydRoutes', []);

ydRoutes.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    // url routes/states
    $urlRouterProvider.otherwise('/display');

    $stateProvider
    // app states
      .state('display', {
        url: '/display',
        templateUrl: 'templates/card-display.html'
      })
      .state('edit',{
        url: '/display',
        templateUrl: 'templates/card-edit.html'
      });
  }]);
