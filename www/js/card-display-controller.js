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
    // $scope.cards;

    ydCardService.loadAndParseCardFromPath("../card-assets/01-我需要帮助").then(function (data) {
      var unsortedCards = data;
      $scope.cards = sortCards(unsortedCards, $scope.row, $scope.col);
    }).catch(function (error) {
      console.log("error occurs: ", error);
    });

    // Test code here. To be removed.
    $scope.clicked = false;
    $scope.testClick = function () {
      $scope.clicked = !$scope.clicked;
      TweenLite.from(".drawer", 2, {x: '110%'});
    };

    // dump functions to vm (make it public) for test.
    var vm = this;
    vm.sortCards = sortCards;
  }]);


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
  // console.log("sorted cards: ", sortedCards);
  return sortedCards;
};
