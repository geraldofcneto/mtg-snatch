'use strict';

describe('Controller: SetsCtrl', function () {

  // load the controller's module
  beforeEach(module('mtgSnatchApp'));

  var SetsCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    SetsCtrl = $controller('SetsCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(SetsCtrl.awesomeThings.length).toBe(3);
  });
});
