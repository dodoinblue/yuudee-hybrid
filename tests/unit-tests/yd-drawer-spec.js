describe('yd-drawer directive', function () {
  var scopeMock,
    compileMock,
    ydCardServiceMock;


  beforeEach(module("templates"));
  // beforeEach(module('../www/components/yd-drawer/yd-drawer.html'));

  // http://stackoverflow.com/questions/23029502/mocking-controller-instantiation-in-angular-directive-unit-test
  beforeEach(function () {
    module('ydDrawer', function ($provide, $controllerProvider) {
      $controllerProvider.register('ydDrawerCtrl', function ($scope) {
        // Controller Mock
        console.log("mock ydDrawer controller called");
        // $scope.$watch('path', function(newVal){
        //   console.log('path changed. ', newVal);
        // })
      });
    });
  });


  beforeEach(angular.mock.module("ydDrawer"));
  beforeEach(angular.mock.module("ydCardService"));


  beforeEach(angular.mock.inject(function ($rootScope, $compile, $q) {
    scopeMock = $rootScope.$new();
    compileMock = $compile;

    // ydCardServiceMock = {
    //   loadAndParseCardFromPath: function () {
    //     return $q.when([1, 2, 3, 4]);
    //   }
    // };
    // spyOn(ydCardServiceMock, "loadAndParseCardFromPath").and.returnValue($q.when([1, 2, 3]));
  }));

  it('should call generate html', function () {
    var elem = compileMock('<yd-drawer isbase="false" path="blabla/path" drawerid="1234"></yd-drawer>')(scopeMock);

    scopeMock.row = 2;
    scopeMock.col = 2;
    scopeMock.cards = [[[{parent: 'parentdir', name: 'round-1-1-1'}, {parent: 'parentdir', name: 'round-1-1-2'}],
      [{parent: 'parentdir', name: 'round-1-1-3'}, {parent: 'parentdir', name: 'round-1-1-4'}]],
      [[{parent: 'parentdir', name: 'round-1-2-1'}]
      ]];
    scopeMock.$digest();
    var elementOfInterest = angular.element(elem.html());
    // var ydCardEl = elementOfInterest.find('yd-card');
    // console.log('yd cards', ydCardEl);
    expect(elementOfInterest.find('yd-card').length).toBe(5);
    expect(elementOfInterest.find('ion-slide').length).toBe(2);
    // console.log(elementOfInterest);
    expect((elem.html().match(/parentdir/g) || []).length).toBe(5);
    expect((elem.html().match(/round-1-1/g) || []).length).toBe(4);
    expect((elem.html().match(/round-1-2/g) || []).length).toBe(1);

    // Again. should update.
    scopeMock.cards = [[[{parent: 'parentdir', name: 'round-2-1-1'}, {parent: 'parentdir', name: 'round-2-1-2'}],
      [{parent: 'parentdir', name: 'round-2-1-3'}]],
      [[{parent: 'parentdir', name: 'round-2-2-1'}]
      ]];
    scopeMock.$digest();
    var elementOfInterest = angular.element(elem.html());
    // var ydCardEl = elementOfInterest.find('yd-card');
    // console.log('yd cards', ydCardEl);
    expect(elementOfInterest.find('yd-card').length).toBe(4);
    expect(elementOfInterest.find('ion-slide').length).toBe(2);
    expect((elem.html().match(/parentdir/g) || []).length).toBe(4);
    expect((elem.html().match(/round-2-1/g) || []).length).toBe(3);
    expect((elem.html().match(/round-2-2/g) || []).length).toBe(1);
    expect((elem.html().match(/round-1-1/g) || []).length).toBe(0);
  })
});


describe('ydDrawerCtrl', function () {
  var scopeMock,
    elementMock,
    ydCardServiceMock,
    controller;

  beforeEach(module('ydDrawer'));
  beforeEach(inject(function ($controller, $q, $rootScope) {
    scopeMock = $rootScope.$new();
    elementMock = jasmine.createSpyObj('$element spy', ['remove']);
    ydCardServiceMock = {
      loadAndParseCardFromPath: jasmine.createSpy('loadAndParseCardFromPath spy').and.returnValue($q.when(['a', 'b']))
    };

    controller = $controller('ydDrawerCtrl', {
      '$scope': scopeMock,
      '$element': elementMock,
      'ydCardService': ydCardServiceMock
    });
  }));

  it('should call ydCardService to get cards', function () {
    scopeMock.path = 'abcdefg';
    scopeMock.$digest();
    expect(ydCardServiceMock.loadAndParseCardFromPath).toHaveBeenCalledWith("abcdefg");
  });

  it('should sort card correctly!', function (done) {
    scopeMock.row = 2;
    scopeMock.col = 2;
    scopeMock.$digest();

    setTimeout(function () {
      expect(scopeMock.cards).toEqual(
        [[['a', 'b']]]
      );
      done();
    }, 500);
  });

  describe('sortCards', function () {
    it('should return empty array', function () {
      var result = controller.sortCards([], 3, 3);
      expect(result).toEqual([]);
    });

    it('should return a 2 x 3 x 3 3-d array', function () {
      var result = controller.sortCards([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3, 3);
      expect(result).toEqual(
        [[[1, 2, 3], [4, 5, 6], [7, 8, 9]], [[10]]]
      );
    });

    it('should return a 3 x 2 x 2 3-d array', function () {
      var result = controller.sortCards([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 2, 2);
      expect(result).toEqual(
        [[[1, 2], [3, 4]], [[5, 6], [7, 8]], [[9, 10]]]
      );
    });

    it('should return a 4 x 1 x 1 3-d array', function () {
      var result = controller.sortCards([1, 2, 3, 4], 1, 1);
      expect(result).toEqual(
        [[[1]], [[2]], [[3]], [[4]]]
      );
    });
  });
});

