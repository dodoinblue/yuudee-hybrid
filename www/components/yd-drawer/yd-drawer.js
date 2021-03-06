/**
 * Created by Charles on 5/4/16.
 */
'use strict';

var ydDrawer = angular.module('ydDrawer', []);

/* Arrange cards to pages, and row x col grid on each page
 *
 * E.g. cards = [1,2,3,4,5,6,7,8,9] to 2x2 grid. result should be:
 * [ [ [1, 2], [3, 4] ],
 *   [ [5, 6], [7, 8] ],
 *   [ [9] ]
 * ]
 */
var sortCards = function (cards, row, col) {
  var pages = cards.length / (row * col) + 1;
  var sortedCards = [];
  for (var i = 0; i < pages; i++) {
    var page = cards.slice(i * row * col, (i + 1) * row * col);
    if (page.length === 0) break; // avoid pushing blank page in.
    var sortedPage = [];
    for (var j = 0; j <= page.length / col; j++) {
      var rowConent = page.slice(j * col, (j + 1) * col);
      if (rowConent.length === 0) break; // avoid pushing blank row in.
      sortedPage.push(rowConent);
    }
    sortedCards.push(sortedPage);
  }
  return sortedCards;
};

ydDrawer.controller('ydDrawerCtrl', ['$scope',
  function ($scope) {
    var backClicked = function () {
      $scope.$emit('SUB_DRAWER_CLOSE', $scope.path);
    };

    $scope.backClicked = backClicked;
    $scope.isLoaded = false;

    // export sortcard for testing
    this.sortCards = sortCards;
  }]);

ydDrawer.directive('ydDrawer', ['ydCardService',
  function (ydCardService) {
    return {
      restrict: 'E',
      scope: true,
      templateUrl: 'components/yd-drawer/yd-drawer.html',

      link: function (scope, el, attrs) {
        scope.path = attrs.path;
        scope.isbase = eval(attrs.isbase);
        scope.drawerId = attrs.drawerid;

        ydCardService.loadAndParseCardFromPath(attrs.path).then(function (data) {
          var unsortedCards = data;
          scope.cards = sortCards(unsortedCards, scope.row, scope.col);
          scope.isLoaded = true;
        }).catch(function (error) {
          console.log("error occurs: ", error);
        });
      },
      controller: 'ydDrawerCtrl'
    }
  }]);
