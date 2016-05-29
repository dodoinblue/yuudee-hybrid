/**
 * Created by Charles on 5/28/16.
 */
describe('yd-card exclude ctrl', function () {

  var scopeMock,
    compileMock,
    ctrlFn;

  beforeEach(module('templates'));

  beforeEach(function () {
    ctrlFn = jasmine.createSpyObj('control function', ['fn']);
    // module('ydCardDirective', function ($provide, $controllerProvider) {
    //   $controllerProvider.register('ydCardCtrl', function () {
    //     // Controller Mock
    //     console.log("mock ydCardCtrl called!");
    //   });
    // });
    module('ydCardDirective', function ($provide, $controllerProvider) {
      $controllerProvider.register('ydCardCtrl', ctrlFn.fn);
    });
  });

  beforeEach(module("ngAudio"));
  beforeEach(module("ydCardService"));
  beforeEach(module("ydCardDirective"));

  beforeEach(
    angular.mock.inject(
      function ($rootScope, $compile) {
        scopeMock = $rootScope.$new();
        compileMock = $compile;
      }
    )
  );

  it('should call ctrl', function () {
    var elem = compileMock('<yd-card parent="blabla/path" name="1234"></yd-card>')(scopeMock);
    scopeMock.$digest();
    // console.log(scopeMock);
    expect(ctrlFn.fn).toHaveBeenCalled();
  })

});

describe('ydCardCtrl', function () {

  var scopeMock,
    elementMock,
    windowMock,
    ydCardServiceMock,
    intervalMock,
    timeoutMock,
    ngAudioMock,
    controller;

  beforeEach(module('ydCardDirective'));
  beforeEach(inject(function ($controller, $q, $rootScope, $timeout, $interval) {
    scopeMock = $rootScope.$new();
    elementMock = jasmine.createSpyObj('$element spy', ['remove']);
    ydCardServiceMock = {
      parseCard: jasmine.createSpy('parseCard spy').and.returnValue($q.when({
        title: 'dummy card title',
        stack: false,
        images: ['path/to/card/1.jpg', 'path/to/card/2.jpg', 'path/tocard/3.jpg'],
        audios: ['path/to/card1.mp3'],
        seq: 1
      })),
      parseStack: jasmine.createSpy('parseStack spy').and.returnValue($q.when({
        path: 'path/to/stack',
        title: 'Test Title',
        cover: 'path/to/cover',
        isStack: true,
        seq: 2
      }))
    };
    timeoutMock = $timeout;
    intervalMock = $interval;
    ngAudioMock = jasmine.createSpyObj('ngAudioMock', ['load']);

    // $interval, $timeout, ngAudio
    controller = $controller('ydCardCtrl', {
      '$scope': scopeMock,
      '$element': elementMock,
      'ydCardService': ydCardServiceMock,
      '$window': windowMock,
      '$interval': intervalMock,
      '$timeout': timeoutMock,
      'ngAudio': ngAudioMock
    });

  }));


  it('should call parseCard', function () {
    scopeMock.parentPath = 'parent';
    scopeMock.fileName = 'path/abc.xydcard';
    scopeMock.$digest();
    // TODO: search for multiple input variable mock call
    // expect(ydCardServiceMock.parseCard).toHaveBeenCalledWith(['parent', 'path/abc.xydcard']);
    expect(ydCardServiceMock.parseCard).toHaveBeenCalled();
    expect(scopeMock.title).toBe('dummy card title');
    expect(scopeMock.path).toBeUndefined();
    expect(scopeMock.isStack).toBe(false);
    // TODO: how to test this?
    // expect(scopeMock.sound).toBeDefined();
  });


  it('should call parseStack', function () {
    scopeMock.parentPath = 'parent';
    scopeMock.fileName = 'path/abc';
    scopeMock.$digest();
    expect(ydCardServiceMock.parseStack).toHaveBeenCalledWith('parent/path/abc');
    expect(scopeMock.title).toBe('Test Title');
    expect(scopeMock.isStack).toBe(true);
    expect(scopeMock.path).toBe('path/to/stack');
    expect(scopeMock.image).toBe('path/to/cover')
  });

  // TODO: investigate a general question. How to test variables & functions in controller closure?
  // it('card should play', function (done) {
  //   scopeMock.parentPath = 'parent';
  //   scopeMock.fileName = 'path/abc.xydcard';
  //   scopeMock.$digest();
  //
  //   // expect(scopeMock.isPlaying).toBe(false);
  //   scopeMock.onCardClick();
  //   setTimeout(function(){
  //     expect(ngAudioMock.play).toHaveBeenCalled();
  //   }, 3000);
  //
  // });
  //
  // it('drawer should open', function () {
  //
  // });

  // it('should build animation correctly', function () {
  //   // buildAnimation = function (windowW, windowH, element, onCompleteHandler, onReverseCompleteHandler) {
  //   var animation = controller.buildAnimation();
  // });
});
