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

    var getCardListFromPath = function (path) {
      var children;
      var findChildrenOfPath = function (cards) {
        if (path.endsWith('/')) {
          path = path.substring(0, path.length - 1);
        }

        if (cards.path === path) {
          children = cards.children;
          return;
        } else if (typeof cards.children === 'object' && !cards.path.endsWith('.xydcard')) {
          for (var i = 0; i < cards.children.length; i++) {
            if (children) {
              break;
            }
            if (cards.children[i].path) {
              findChildrenOfPath(cards.children[i]);
            }
          }
        }
      };

      findChildrenOfPath(preloaded_cards);

      return $q.when(children);
    };

    var getSubCardsList = function (wholeTree, subPath) {
      // Whole tree should be a object with 2 params: path & children
      // Children is an array.
      // If an element of children is a stack, then it is a object, containing its own path & children.
      // If an element of children is a card, then it is a string of the full path

      // First, if subPath equals to wholeTree's path, then we have found the subpath
      if (wholeTree.path === subPath) {
        return wholeTree.children;
      } else {
        // Then recursively search all children
        var children = null;
        for (var i = 0;
             children == null && i < wholeTree.children.length && typeof wholeTree.children[i] === 'object';
             i++) {
          children = getSubCardsList(wholeTree.children[i], subPath);
        }
        return children;
      }
      // return null;
    };

    var getSubCardsListPromise = function (wholeTree, subPath) {
      return $q.when(getSubCardsList(wholeTree, subPath));
    };

    var loadAndParseCardFromPath = function (cardPath) {
      // return getCardListFromPath(cardPath).then(function (data) {
      //   return parseList(data);
      // });
      // return getWholeCardTree().then(function (wholeTree) {
      //   return getSubCardsListPromise(wholeTree, cardPath);
      // }).then(function(data) {
      //   return parseList(data);
      // });
      return getSubCardsListPromise(preloaded_cards, cardPath).then(function (data) {
        return parseList(data);
      });
    };

    var getSubStackList = function (path) {
      return getCardListFromPath(path).then(function (data) {
        var stacks = [];
        for (var i = 0; i < data.length; i++) {
          var child = data[i];
          if (child.path) {
            stacks.push(child);
          }
        }
        return parseList(stacks);
      });

    };

    var parseList = function (list) {
      var cards = [];
      for (var i = 0; i < list.length; i++) {
        if (typeof list[i] === 'object') {
          var current = list[i].path;
        } else {
          var current = list[i];
        }
        var temp = current.split('/');
        var parent = temp.slice(0, temp.length - 1).join('/');
        var fileName = temp[temp.length - 1];
        if (fileName === "cover.jpg") {// maybe also png?
          console.log("cover found");
        } else if (true/* is folder */) {
          var card = {
            parent: parent,
            name: fileName
          };
          cards.push(card);
        } else {
          console.log('illegal content');
        }
      }
      return cards;
    };

    var parseCard = function (parent, card) {
      // Dummy Card
      var parsedCard = {
        title: card,
        isStack: false,
        images: ['../img/dummy_content.jpg'],
        audios: ['../card-assets/dummy_audio.mp3'],
        seq: -1
      };
      if (card.indexOf('.xydcard', card.length - '.xydcard'.length) !== -1) { // is card
        var seq = +card.split('-')[0];
        var title = card.split('-')[1].split('.xydcard')[0];
        var imagesPath = parent + '/' + card + '/images/';
        var audiosPath = parent + '/' + card + '/audios/';
        parsedCard = {
          title: title || 'dummy card',
          stack: false,
          images: [imagesPath + '1.jpg', imagesPath + '2.jpg', imagesPath + '3.jpg'],
          audios: [audiosPath + '1.mp3'],
          seq: seq || -1
        };
      }
      return $q.when(parsedCard);
    };

    var parseStack = function (stackpath) {
      // var seq = +category.split('-')[0];
      // var catName = category.split('-')[1];
      // var stack = {
      //   title: catName || 'dummy category',
      //   isStack: true,
      //   cover: parent + '/' + category + '/cover.jpg',
      //   path: parent + '/' + category,
      //   seq: seq || -1
      // };
      var stack = {};
      var temp = stackpath.split('/');
      var dirname = temp[temp.length - 1];
      temp = dirname.split('-');
      var stackname = temp[1];
      var seq = +temp[0];

      stack.title = stackname;
      stack.isStack = true;
      stack.cover = stackpath + '/' + 'cover.jpg';
      stack.path = stackpath;
      stack.seq = seq || -1;

      return $q.when(stack);
    };

    /*
     * Generate dummy cards for test.
     */
    var generateCards = function (count) {
      var cards = [];
      for (var i = 0; i < count; i++) {
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

    var getFileListFromServer = function (key) {

    };

    /*
     * For qiniu backend.
     * Test:
     *     var AccessKey = "MY_ACCESS_KEY";
     *     var SecretKey = "MY_SECRET_KEY";
     *
     *     var signingStr = "/move/bmV3ZG9jczpmaW5kX21hbi50eHQ=/bmV3ZG9jczpmaW5kLm1hbi50eHQ=\n";
     *     sign = "157b18874c0a1d83c4b0802074f0fd39f8e47843"
     *     encodedSign = "FXsYh0wKHYPEsIAgdPD9OfjkeEM="
     *     accessToken = "MY_ACCESS_KEY:FXsYh0wKHYPEsIAgdPD9OfjkeEM="
     */
    var calcAccessToken = function (signingStr, ak, sk) {
      var sign = CryptoJS.HmacSHA1(signingStr, sk);
      var encodedSign = sign.toString(CryptoJS.enc.Base64);
      console.log('encoded sign: ', encodedSign);
      return ak + ':' + encodedSign;
    };

    // ### handles server contents   ###
    var server_url = 'http://sg.supersuperstar.com/yuudee/unzipped/';

    var getWholeCardTree = function () {
      return $http.get(server_url + 'cards.json').then(function (data) {
        return data.data
      }).catch(function (error) {
        console.log('Something wrong with server: ' + error);
      });
    };

    var promise = $http.get('../card-assets/card_list.json').success(function (data) {
      preloaded_cards = data;
    });


    // Exports:
    this.loadAndParseCardFromPath = loadAndParseCardFromPath;
    this.parseCard = parseCard;
    this.parseStack = parseStack;
    this.getSubStackList = getSubStackList;

    // Server related
    this.server_url = server_url;
    this.getWholeCardTree = getWholeCardTree;
    this.getCardListFromPath = getCardListFromPath;
    this.parseList = parseList;
    this.parseStack = parseStack;
    this.parseCard = parseCard;
    this.getSubCardsList = getSubCardsList;
    this.promise = promise;
  }]);
