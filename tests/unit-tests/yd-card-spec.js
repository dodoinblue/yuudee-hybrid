/**
 * Created by Charles on 5/28/16.
 */
describe('yd-card directive', function () {

  var scopeMock,
    compileMock,
    ctrlFn;

  beforeEach(module('templates'));

  beforeEach(function () {
    ctrlFn = jasmine.createSpy('control function');
    // module('ydCardDirective', function ($provide, $controllerProvider) {
    //   $controllerProvider.register('ydCardCtrl', function () {
    //     // Controller Mock
    //     console.log("mock ydCardCtrl called!");
    //   });
    // });
    module('ydCardDirective', function ($provide, $controllerProvider) {
      $controllerProvider.register('ydCardCtrl', ctrlFn);
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

    expect(ctrlFn).toHaveBeenCalled();
    // Should have one of each {card-frame, card-content, card-text, card-edit-button}
    expect((elem.html().match(/card-frame/g) || []).length).toBe(1);
    expect((elem.html().match(/card-content/g) || []).length).toBe(1);
    expect((elem.html().match(/card-text/g) || []).length).toBe(1);
    expect((elem.html().match(/card-edit-button/g) || []).length).toBe(1);

    // Try again with multiple cards
    elem = compileMock('<yd-card parent="blabla/path/1" name="1234"></yd-card><yd-card parent="blabla/path/2" name="5678"></yd-card>')(scopeMock);
    scopeMock.$digest();
    expect(elem.length).toBe(2);
  })

});

describe('ydCardCtrl', function () {

  var scopeMock,
    elementMock,
    ydCardServiceMock,
    ngAudioMock,
    ydCardUtilMock,
    controller;

  beforeEach(module('ydCardDirective'));
  beforeEach(inject(function ($controller, $q, $rootScope, $timeout, $interval) {
    scopeMock = $rootScope.$new();
    elementMock = [{parentElement: '<parent />'}];
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

    ydCardUtilMock = {
      getWindowSize: jasmine.createSpy('getWindowSize').and.returnValue({height: 200, width: 200}),
      calcToCenterParams: jasmine.createSpy('calcToCenterParam'),
      buildAnimation: jasmine.createSpy('buildAnimation'),
      playCard: jasmine.createSpy('playCard'),
      showDrawer: jasmine.createSpy('showDrawer')
    };

    ngAudioMock = jasmine.createSpyObj('ngAudioMock', ['load']);

    // $interval, $timeout, ngAudio
    controller = $controller('ydCardCtrl', {
      '$scope': scopeMock,
      '$element': elementMock,
      'ydCardService': ydCardServiceMock,
      'ydCardUtil': ydCardUtilMock
    });

  }));


  it('should call parseCard', function () {
    scopeMock.parentPath = 'parent';
    scopeMock.fileName = 'path/abc.xydcard';
    scopeMock.$digest();
    expect(ydCardServiceMock.parseCard).toHaveBeenCalledWith('parent', 'path/abc.xydcard');
    expect(scopeMock.title).toBe('dummy card title');
    expect(scopeMock.path).toBeUndefined();
    expect(scopeMock.isStack).toBe(false);
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


  it('should call showDrawer', function(){
    scopeMock.parentPath = 'parent';
    scopeMock.fileName = 'path/abc';
    scopeMock.$digest();
    expect(scopeMock.onCardClick).toBeDefined();
    scopeMock.onCardClick();
    expect(ydCardUtilMock.showDrawer).toHaveBeenCalledWith(scopeMock);
  });

  it('should play card', function () {
    scopeMock.parentPath = 'parent';
    scopeMock.fileName = 'path/abc.xydcard';
    scopeMock.$digest();
    expect(scopeMock.onCardClick).toBeDefined();
    scopeMock.onCardClick();
    expect(ydCardUtilMock.playCard).toHaveBeenCalledWith('<parent />', scopeMock);
  });
});

describe('ydCardUtil', function () {
  var windowMock,
    ngAudioMock,
    tiemoutMock,
    intervalMock;

  beforeEach(module('ydCardDirective'));
  beforeEach(inject(function ($controller, $q, $rootScope, $timeout, $interval) {
    ngAudioMock = jasmine.createSpyObj('ngAudioMock', ['load']);
  }));
});
