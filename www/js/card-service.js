/**
 * Created by Charles on 5/17/16.
 */
'use strict';

var ydCardService = angular.module('ydCardService', []);

ydCardService.service('ydCardService', ['$q', '$http',
  function ($q, $http) {
    // Preloaded cards directory.
    var preloaded_cards = null;


    if (!String.prototype.endsWith) {
      String.prototype.endsWith = function (suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
      };
    }

    if (!String.prototype.startsWith) {
      String.prototype.startsWith = function (searchString, position) {
        position = position || 0;
        return this.substr(position, searchString.length) === searchString;
      };
    }

    var getSubCardsList = function (wholeTree, subPath) {
      // Whole tree should be a object with 2 params: path & children
      // Children is an array.
      // If an element of children is a stack, then it is a object, containing its own path & children.
      // If an element of children is a card, then it is a string of the full path

      // First, if subPath equals to wholeTree's path, then we have found the subpath
      var result = null;
      if (wholeTree.path == subPath) {
        result = wholeTree.children;
      } else if (wholeTree.children) {
        // Then recursively search all children
        for (var i = 0;
             i < wholeTree.children.length && typeof wholeTree.children[i] === 'object';
             i++) {
          if (result) {
            return result;
          } else {
            result = getSubCardsList(wholeTree.children[i], subPath);
          }
        }
      }
      return result;
    };

    var getSubCardsListPromise = function (wholeTree, subPath) {
      return $q.when(getSubCardsList(wholeTree, subPath));
    };

    var loadAndParseCardFromPath = function (cardPath) {
      // Mapping the root directory to '.'
      if (cardPath === '../card-assets') {
        cardPath = '.';
      }
      return getSubCardsListPromise(preloaded_cards, cardPath).then(function (data) {
        return parseList(data);
      });
    };

    var get1stLevelStack = function () {
      var stacks = [];
      for (var i = 0; i < preloaded_cards.children.length; i++) {
        // Make sure only stack is added into the list
        if (preloaded_cards.children[i].children) {
          var stack = clone(preloaded_cards.children[i]);
          // Don't need children list for the 1st level list
          delete stack.children;
          stacks.push(stack);
        }
      }
      return stacks;
    };

    var get1stLevelStackPromise = function (path) {
      return $q.when(get1stLevelStack());
    };

    function clone(obj) {
      if (null == obj || "object" != typeof obj) return obj;
      var copy = obj.constructor();
      for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
      }
      return copy;
    }

    var parseList = function (list) {
      var cards = [];
      for (var i = 0; i < list.length; i++) {

        var card = clone(list[i]);
        if (card.children) {
          delete card.children;
          card.isStack = true;
        }
        cards.push({data: card});
      }
      return cards;
    };

    var promise = $http.get('card-assets/cards.json').success(function (data) {
      preloaded_cards = data;
    });

    // Exports:
    this.promise = promise;
    this.resRoot = "card-assets/";
    this.loadAndParseCardFromPath = loadAndParseCardFromPath;
    this.get1stLevelStackPromise = get1stLevelStackPromise;

  }]);
