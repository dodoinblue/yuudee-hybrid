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
    };

    $scope.row=2;
    $scope.col=2;

    $scope.cards = sortCards(generateCards(11), $scope.row, $scope.col);
  }]);

/*
 * Generate dummy cards for test.
 */
var generateCards = function (count) {
  var cards = [];
  for (var i=0; i < count; i++) {
    var card = {
      title: "Card " + (i + 1),
      stack: false,
      images: ["../img/dummy_content.jpg"],
      audios: []
    };
    cards.push(card);
  }
  return cards;
};

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
    for (var j = 0; j <= page.length / col; j ++) {
      var rowConent = page.slice(j * col, (j+1) * col);
      if (rowConent.length === 0) break; // avoid pushing blank row in.
      sortedPage.push(rowConent);
    }
    sortedCards.push(sortedPage);
  }
  console.log("sorted cards: ", sortedCards);
  return sortedCards;
};
