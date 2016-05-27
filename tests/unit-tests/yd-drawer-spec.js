describe('app test setting', function () {
  it('should work', function () {
    // should pass
  })
});

describe('ydCardDisplayCtrl', function () {

  // initialize vars...
  var controller,
    scopeMock,
    stateMock,
    historyMock,
    ydCardServiceMock;

  //load module
  beforeEach(module('ydCardDisplayCtrl'));

  // instantiate the controller and mocks for every test
  beforeEach(inject(function ($controller, $q, $rootScope) {
    scopeMock = $rootScope.$new();
    stateMock = jasmine.createSpyObj('$state spy', ['go']);
    historyMock = jasmine.createSpyObj('$ionicHistory spy', ['nextViewOptions']);
    ydCardServiceMock = {
      loadAndParseCardFromPath: function () {
        return $q.when([1, 2, 3, 4]);
      }
    };

    spyOn(ydCardServiceMock, "loadAndParseCardFromPath").and.returnValue($q.when([1, 2, 3]));

    // instantiate the Controller under test.
    controller = $controller('ydCardDisplayCtrl', {
        '$scope': scopeMock,
        '$state': stateMock,
        '$ionicHistory': historyMock,
        'ydCardService': ydCardServiceMock
      });

    // make a $digest call for the then function to be called.
    // http://stackoverflow.com/questions/23705051/how-do-i-mock-a-service-that-returns-promise-in-angularjs-jasmine-unit-test
    $rootScope.$digest();
  }));

  it('passing means module is initialized properly.', function () {
    // should pass
  });

  it('should have correct settings loaded in $scope', function () {
    expect(scopeMock.row).toBe(2);
    expect(scopeMock.col).toBe(2);
    expect(scopeMock.isEditMode).toBe(false);
  });

  it('should call state.go to navigate to resource', function () {
    scopeMock.goToResource();
    expect(stateMock.go).toHaveBeenCalledWith('resource');
  });

  it('should set isEditMode to true', function () {
    scopeMock.enterEditMode();
    expect(scopeMock.isEditMode).toBe(true);
  });

  it('should call ydCardService to get cards', function () {
    expect(ydCardServiceMock.loadAndParseCardFromPath).toHaveBeenCalledWith("../card-assets/01-我需要帮助");
  });

  it('should sort card correctly!', function (done) {

    setTimeout(function () {
      expect(scopeMock.cards).toEqual(
        [ [ [1, 2], [3] ] ]
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
