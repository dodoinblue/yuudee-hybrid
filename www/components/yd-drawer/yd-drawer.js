/**
 * Created by Charles on 5/4/16.
 */
'use strict';

var ydDrawer = angular.module('ydDrawer', []);

ydDrawer.directive('ydDrawer', ['ydCardService',
  function () {
    return {
      restrict: 'E',
      scope: true,
      templateUrl: 'components/yd-drawer/yd-drawer.html',

      link: function (scope, el, attrs) {
        scope.path = attrs.path;
        scope.isbase = eval(attrs.isbase);
        scope.drawerId = attrs.drawerid;
      },
      controller: function ($scope, $element, ydCardService) {

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

        var backClicked = function() {
          // $scope.$emit('SUB_DRAWER_CLOSE', $scope.drawerId);
          $element.remove();
        };

        $scope.backClicked = backClicked;

        $scope.isLoaded = false;

        $scope.$watch('path', function (newVal) {
          ydCardService.loadAndParseCardFromPath(newVal).then(function (data) {
            var unsortedCards = data;
            $scope.cards = sortCards(unsortedCards, $scope.row, $scope.col);
            $scope.isLoaded = true;
          }).catch(function (error) {
            console.log("error occurs: ", error);
          });
        });
      }
    }
  }]);
