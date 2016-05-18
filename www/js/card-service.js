/**
 * Created by Charles on 5/17/16.
 */
'use strict';

var ydCardService = angular.module('ydCardService', []);

ydCardService.service('ydCardService', ['$q',
  function($q) {
    var getCardListFromPath = function (cardPath) {
      if (cardPath.indexOf('01-我需要帮助') !== -1 ) {
        return $q.when([
          '01-帮我擦脸.xydcard',
          '02-帮我擦手.xydcard',
          '03-帮我擦眼镜.xydcard',
          '04-帮我冲马桶.xydcard',
          '05-帮我打开.xydcard',
          '06-帮我关上.xydcard',
          '07-帮我给妈妈打电话.xydcard',
          '08-帮我拿过来.xydcard',
          '09-帮我梳头.xydcard',
          '10-帮我修理好.xydcard',
          '11-带我回家.xydcard',
          '12-帮我剪指甲.xydcard',
          'cover.jpg'])
      }
    };

    var loadAndParseCardFromPath = function (cardPath) {
      return getCardListFromPath(cardPath).then(function(data) {
        return parseList(cardPath, data);
      });
    };

    var parseList = function(parent, list) {
      var cards = [];
      for (var i = 0; i < list.length; i++) {
        var fileName = list[i];
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
        audio: ['../card-assets/dummy_audio.mp3'],
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
          audio: [audiosPath + '1.mp3'],
          seq: seq || -1
        };
      }
      return $q.when(parsedCard);
    };

    var parseStack = function (parent, category) {
      var seq = +category.split('-')[0];
      var catName = category.split('-')[1];
      var stack = {
        title: catName || 'dummy category',
        isStack: true,
        cover: parent + '/' + category + '/cover.jpg',
        path: parent + '/' + category,
        seq: seq || -1
      };
      return $q.when(stack);
    };

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

    // Exports:
    this.loadAndParseCardFromPath = loadAndParseCardFromPath;
    this.parseCard = parseCard;
    this.parseStack = parseStack;
  }]);
