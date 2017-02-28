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

      // this page is for display cards & rearrange cards (including changing effects)
      .state('display', {
        url: '/display',
        templateUrl: 'templates/card-display.html',
        resolve: {
          // This data is not needed in controller. Just a way of making sure
          // CardTree is loaded before any call request from controller.
          'CardsTreeData':function(ydCardService){
            return ydCardService.promise;
          }
        }
      })

      // This page handles the creation/edition of cards and card categories
      .state('resource', {
        url: '/resource',
        templateUrl: 'templates/card-resource.html'
      });

      // // Temporary
      // .state('drawer', {
      //   url: '/drawer',
      //   controller: 'ydCardDisplayCtrl',
      //   templateUrl: 'templates/card-drawer.html'
      // });
  }]);
