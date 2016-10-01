'use strict';

/**
 * @ngdoc function
 * @name mtgSnatchApp.controller:CardsCtrl
 * @description
 * # CardsCtrl
 * Controller of the mtgSnatchApp
 */
angular.module('mtgSnatchApp')
  .controller('CardsCtrl', function ($scope, $http, envService) {
    var server = envService.read('apiUrl');
    
    console.log(envService);
    function loadCardNames() {
      $http.get(server + 'card/' + query())
        .then(function (response) {
          var cards = response.data;
          $scope.loadedCards = cards;
        });
    }

    function loadSets() {
      $http.get(server + 'set')
        .then(function (response) {
          $scope.sets = response.data;
        });
    }

    function loadTypes() {
      $http.get(server + 'type')
        .then(function (response) {
          $scope.types = response.data;
        });
    }

    function loadSubtypes() {
      $http.get(server + 'subtype')
        .then(function (response) {
          $scope.subtypes = response.data;
        });
    }

    function loadLegalities() {
      $http.get(server + 'legality')
        .then(function (response) {
          $scope.legalities = response.data;
        });
    }

    function query() {
      var q = '?' + joinQuery();
      console.log(q);
      return q;
    }

    function joinQuery() {
      return Object.keys($scope.query).map(function (key) {
        return $scope.query[key] !== null && $scope.query[key] !== '' ? key + '=' + $scope.query[key] : '';
      })
        .filter(function (element) {
          return element !== '';
        })
        .join('&');
    }

    $scope.loadCardNames = loadCardNames;

    $scope.query = { name: '', set: '', type: '', subtype: '', legality: '' };
    $scope.sets = [];
    $scope.types = [];
    $scope.subtypes = [];

    loadSets();
    loadTypes();
    loadSubtypes();
    loadLegalities();

  });
