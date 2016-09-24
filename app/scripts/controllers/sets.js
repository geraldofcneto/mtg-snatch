'use strict';

/**
 * @ngdoc function
 * @name mtgSnatchApp.controller:SetsCtrl
 * @description
 * # SetsCtrl
 * Controller of the mtgSnatchApp
 */
angular.module('mtgSnatchApp')
  .controller('SetsCtrl', function ($scope, $http) {
    
    $http({ method: 'GET', url: 'https://api.magicthegathering.io/v1/sets' })
      .then(function (response) {
        console.log(response);
        $scope.loadedSets = response.data.sets;
      });

  });
