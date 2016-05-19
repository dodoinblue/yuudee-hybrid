describe('ydCardDisplayCtrl', function(){

  // initialize vars...
  var contoller,
    scopeMock,
    stateMock,
    historyMock,
    ydCardServiceMock;

  //load module
  beforeEach(module('ydCardDisplayCtrl'));

  // instantiate the controller and mocks for every test
  beforeEach(inject(function($controller, $q) {


    // instantiate the Controller under test.
    controller = $controller('ydCardDisplayCtrl', {
        '$scope': scopeMock,
        '$state': stateMock,
        '$ionicHistory': historyMock,
        'ydCardService': ydCardServiceMock
      }
    );
  }));

  describe('#tobetested', function(){
    // call function
    // beforeEach(inject(function() {
    //   controller.tobetested();
    // }));

    it('should print a line of log', function() {
      var a = contoller.tobetested();
      // expect(dinnerServiceMock.login).toHaveBeenCalledWith('test1', 'password1');

      expect(a).toBe(1);
    });
  });
});
