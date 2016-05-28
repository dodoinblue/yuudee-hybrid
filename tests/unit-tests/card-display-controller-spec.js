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
    ydCardServiceMock,
    elementMock,
    compileMock;

  //load module
  beforeEach(module('ydCardDisplayCtrl'));

  // instantiate the controller and mocks for every test
  beforeEach(inject(function ($controller, $q, $rootScope, $compile) {
    scopeMock = $rootScope.$new();
    stateMock = jasmine.createSpyObj('$state spy', ['go']);
    historyMock = jasmine.createSpyObj('$ionicHistory spy', ['nextViewOptions']);
    ydCardServiceMock = {
      loadAndParseCardFromPath: function () {
        return $q.when([1, 2, 3, 4]);
      }
    };

    elementMock = jasmine.createSpyObj('$element spy', ['append']);
    // compileMock = jasmine.createSpyObj('$compile spy', ['constructor']);

    spyOn(ydCardServiceMock, "loadAndParseCardFromPath").and.returnValue($q.when([1, 2, 3]));

    // instantiate the Controller under test.
    controller = $controller('ydCardDisplayCtrl', {
      '$scope': scopeMock,
      '$state': stateMock,
      '$ionicHistory': historyMock,
      'ydCardService': ydCardServiceMock,
      '$element': elementMock,
      '$compile': $compile
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



});
