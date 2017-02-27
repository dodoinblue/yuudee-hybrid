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
        controller: 'ydCardDisplayCtrl',
        resolve: {
          'treeLoaded':function(ydCardService, $q){
            // MyServiceData will also be injectable in your controller, if you don't want this you could create a new promise with the $q service
            ydCardService.getWholeCardTree('../card-assets/test.json').then(function(wholeTree){
              console.log(wholeTree);
              return $q.when(true);
            });
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
