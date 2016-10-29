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
    
    function onQueryChange(){
      if ($scope.config.loadOnChange){
        loadCards();
      }
    }
    
    function loadCards() {
      if (!query().length) { return; }
      $http.get(server + 'card/?' + query())
        .then(function (response) {
          $scope.loadedCards = response.data.slice(0, 1000);
          $scope.mappedCards = new Map();
          $scope.loadedCards.forEach(function (card){
            $scope.mappedCards.set(card.id, card);
          });
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
    
    function loadRarities() {
      $http.get(server + 'rarity')
        .then(function (response) {
          console.log(response, response.data);
          $scope.rarities = response.data;
        });
    }

    function query() {
      return Object.keys($scope.query).map(function (key) {
        return !!$scope.query[key] && !!$scope.query[key].length ? key + '=' + $scope.query[key] : '';
      })
        .filter(function (element) {
          return element !== '';
        })
        .join('&');
    }

    function hasImage(card){
      return card.imageUrl !== null && card.imageUrl !== undefined && card.imageUrl !== '';
    }
    
    function addToCollection(id){
      var numberOfCards = ($scope.collection.get(id) || 0) + 1;
      $scope.collection.set(id, numberOfCards);
      $scope.mappedCards.get(id).have = numberOfCards;
    }
    
    function removeFromCollection(id){
      var numberOfCards = $scope.collection.get(id) || 0;
      if (numberOfCards) {
        $scope.collection.set(id, numberOfCards - 1);
        $scope.mappedCards.get(id).have = numberOfCards - 1 ;
      }
    }
    
    function updateLoadedCards() {
      $scope.loadedCards.forEach(function (card){
        if (card.have !== $scope.collection.get(card.id)){
          card.have = $scope.collection.get(card.id);
        }
      });
    }

    $scope.onQueryChange = onQueryChange;
    $scope.loadCards = loadCards;
    $scope.hasImage = hasImage;
    $scope.addToCollection = addToCollection;
    $scope.removeFromCollection =removeFromCollection;
    
    $scope.query = { name: '', text: '', flavor: '', set: '', type: '', subtype: '', legality: '', color: '', rarity: ''};
    $scope.sets = [];
    $scope.types = [];
    $scope.subtypes = [];
    $scope.legalities = [];
    $scope.colors = [];
    $scope.rarities = [];
    
    $scope.collection = new Map();

    $scope.config = { loadOnChange: true };
    loadSets();
    loadTypes();
    loadSubtypes();
    loadLegalities();
    loadColors();
    loadRarities();
    
  });
