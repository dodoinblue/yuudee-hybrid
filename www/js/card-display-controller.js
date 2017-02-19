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

    /*** For classware selection dropdown list in parent mode. ***/
    // By default, use all classware option.
    $scope.ddSelectOptions = [{
      title: "全部",
      path: "../card-assets"
    }];

    var generateClasswareList = function () {
      ydCardService.getSubStackList('../card-assets').then(function (data) {
        // console.log(data);
        var classwares = [];
        classwares.push({
          title: "全部",
          path: "../card-assets"
        });
        for (var i = 0; i < data.length; i++) {
          var classware = {
            title: data[i].name.split('-')[1],
            path: data[i].parent + '/' + data[i].name
          };
          classwares.push(classware);
        }
        $scope.ddSelectOptions = classwares;
      });
    };

    generateClasswareList();

    $scope.onSelectionChange = function (selection) {
      $scope.drawers = [];
      $scope.drawers.push({
        drawerid: 0,
        path: selection.path,
        isbase: true
      });
    };

    $scope.ddSelectSelected = $scope.ddSelectOptions[0]; // Must be an object
    /*** End of classware selection. ***/

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


