// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var yuudee = angular.module('yuudee', ['ionic',
  'ydCardDirective',
  'ydRoutes',
  'ydCardDisplayCtrl',
  'ydCardResourceCtrl',
  'ydCardService',
  'ydDrawer',
  'ngDropdowns']);

yuudee.run(function ($ionicPlatform, $ionicHistory, $ionicConfig) {
  $ionicPlatform.ready(function () {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }

    // Try disable page transition animation. For partial page loading in the furture.
    $ionicConfig.views.transition('none');

    // TODO: if iOS then this
    $ionicHistory.nextViewOptions({
      // To avoid black screen on iOS simulator. To be tested on real device.
      disableAnimate: true
    });
  });

});
