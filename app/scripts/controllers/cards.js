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
          $scope.loadedCards = cards.slice(0, 1000);
          updateLoadedCards();
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
    
    function addToCollection(id){
      var numberOfCards = $scope.collection.get(id) || 0;
      $scope.collection.set(id, numberOfCards+1);
      updateLoadedCards();
    }
    
    function removeFromCollection(id){
      var numberOfCards = $scope.collection.get(id) || 0;
      if (numberOfCards) {
        $scope.collection.set(id, numberOfCards-1);
        updateLoadedCards();
      }
    }
    
    function updateLoadedCards() {
      $scope.loadedCards.forEach(function (card){
        if (card.have != $scope.collection.get(card.id)){
          card.have = $scope.collection.get(card.id);
        }
      });
    }
    
    $scope.loadCardNames = loadCardNames;
    $scope.hasImage = hasImage;
    $scope.addToCollection = addToCollection;
    $scope.removeFromCollection =removeFromCollection;
    
    $scope.query = { name: '', set: '', type: '', subtype: '', legality: '', color: ''};
    $scope.sets = [];
    $scope.types = [];
    $scope.subtypes = [];
    $scope.legalities = [];
    $scope.colors = [];
    
    $scope.collection = new Map();

    loadSets();
    loadTypes();
    loadSubtypes();
    loadLegalities();
    loadColors();

  });
