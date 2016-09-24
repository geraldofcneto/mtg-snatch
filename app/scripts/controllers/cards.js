'use strict';

/**
 * @ngdoc function
 * @name mtgSnatchApp.controller:CardsCtrl
 * @description
 * # CardsCtrl
 * Controller of the mtgSnatchApp
 */
angular.module('mtgSnatchApp')
  .controller('CardsCtrl', function ($scope, $http) {
    function loadCardNames() {
      // if ($scope.query.name.length < 5) {
      //   return;
      // }
      
      $http.get('http://localhost:8888/card/' + query())
        .then(function (response) {
          console.log(response.data);
          var cards = response.data.slice(0, 100);
          $scope.loadedCards = cards;
        });
    }

    function loadSets() {
      $http.get('http://localhost:8888/set')
        .then(function (response) {
          console.log(response.data);
          $scope.sets = response.data;
        });
    }
    
    function loadTypes() {
      $http.get('http://localhost:8888/type')
        .then(function (response) {
          $scope.types = response.data;
        });
    }

    function loadSubtypes() {
      $http.get('http://localhost:8888/subtype')
        .then(function (response) {
          $scope.subtypes = response.data;
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

    $scope.query = { name: '', set: '', type: '', subtype: '' };
    $scope.sets = [];
    $scope.types = [];
    $scope.subtypes = [];
    
    loadSets();
    loadTypes();
    loadSubtypes();

  });
