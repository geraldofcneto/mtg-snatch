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
    
    function loadCardNames() {
      $http.get(server + 'card/' + query())
        .then(function (response) {
          var cards = response.data;
          console.log(cards);
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
    
    function loadColors() {
      $http.get(server + 'color')
        .then(function (response) {
          $scope.colors = response.data;
        });
    }

    function query() {
      var q = '?' + joinQuery();
      console.log(q);
      return q;
    }

    function joinQuery() {
      return Object.keys($scope.query).map(function (key) {
        return !!$scope.query[key]
          && !!$scope.query[key].length
          ? key + '=' + $scope.query[key] : '';
      })
        .filter(function (element) {
          return element !== '';
        })
        .join('&');
    }

    function hasImage(card){
      return card.imageUrl !== null 
        && card.imageUrl !== undefined
        && card.imageUrl !== '';
    }
    
    $scope.loadCardNames = loadCardNames;
    $scope.hasImage = hasImage;

    $scope.query = { name: '', set: '', type: '', subtype: '', legality: '', color: ''};
    $scope.sets = [];
    $scope.types = [];
    $scope.subtypes = [];
    $scope.legalities = [];
    $scope.colors = [];
    

    loadSets();
    loadTypes();
    loadSubtypes();
    loadLegalities();
    loadColors();

  });
