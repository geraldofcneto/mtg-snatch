'use strict';

/**
 * @ngdoc function
 * @name mtgSnatchApp.controller:CardsCtrl
 * @description
 * # CardsCtrl
 * Controller of the mtgSnatchApp
 */
angular.module('mtgSnatchApp')
  .controller('CardsCtrl', function($scope, $http, envService) {
    var mtgio = envService.read('mtgio');
    var server = envService.read('apiUrl');

    function onQueryChange() {
      if ($scope.config.loadOnChange) {
        loadCards();
      }
    }

    function loadCards() {
      $http.get(mtgio + 'cards?' + query())
        .then(function(response) {
          $scope.loadedCards = response.data.cards
        })
    }

    function loadSets() {
      $http.get(mtgio + 'sets')
        .then(function(response) {
          $scope.sets = response.data.sets
        });
    }

    function loadTypes() {
      $http.get(mtgio + 'types')
        .then(function(response) {
          $scope.types = response.data.types
        });
    }

    function loadSubtypes() {
      $http.get(mtgio + 'subtypes')
        .then(function(response) {
          $scope.subtypes = response.data.subtypes
        });
    }

    function loadLegalities() {
      $http.get(mtgio + 'formats')
        .then(function(response) {
          $scope.legalities = response.data.formats
        });
    }

    function loadColors() {
      $http.get(server + 'color')
        .then(function(response) {
          $scope.colors = response.data;
        });
    }

    function loadRarities() {
      $http.get(server + 'rarity')
        .then(function(response) {
          $scope.rarities = response.data;
        });
    }

    function loadLanguages() {
      $http.get(server + 'languages')
        .then(function(response) {
          $scope.languages = response.data;
        });
    }

    function query() {
      return Object.keys($scope.query).map(function(key) {
          return !!$scope.query[key] && !!$scope.query[key].length ? key + '=' + $scope.query[key] : '';
        })
        .filter(function(element) {
          return element !== '';
        })
        .join('&');
    }

    function hasImage(card) {
      return card.imageUrl !== null && card.imageUrl !== undefined && card.imageUrl !== '';
    }

    function addToCollection(id) {
      var numberOfCards = ($scope.collection.get(id) || 0) + 1;
      $scope.collection.set(id, numberOfCards);
      $scope.mappedCards.get(id).have = numberOfCards;
    }

    function removeFromCollection(id) {
      var numberOfCards = $scope.collection.get(id) || 0;
      if (numberOfCards) {
        $scope.collection.set(id, numberOfCards - 1);
        $scope.mappedCards.get(id).have = numberOfCards - 1;
      }
    }

    function updateLoadedCards() {
      $scope.loadedCards.forEach(function(card) {
        if (card.have !== $scope.collection.get(card.id)) {
          card.have = $scope.collection.get(card.id);
        }
      });
    }

    function imageFromCard(card) {
      if (!$scope.query.language) {
        return card.imageUrl;
      }

      var image = imageInLanguage(card, $scope.query.language);

      return image ? image.imageUrl : card.imageUrl;
    }

    function imageInLanguage(card, language) {
      return card.foreignNames.find(function(foreignName) {
        return foreignName.language == language;
      });
    }

    $scope.onQueryChange = onQueryChange;
    $scope.loadCards = loadCards;
    $scope.hasImage = hasImage;
    $scope.addToCollection = addToCollection;
    $scope.removeFromCollection = removeFromCollection;
    $scope.imageFromCard = imageFromCard;

    $scope.query = {
      name: '',
      text: '',
      flavor: '',
      set: '',
      type: '',
      subtypes: '',
      legality: '',
      colors: '',
      rarity: '',
      cmc: ''
    };
    $scope.sets = [];
    $scope.types = [];
    $scope.subtypes = [];
    $scope.legalities = [];
    $scope.colors = [];
    $scope.rarities = [];
    $scope.languages = [];

    $scope.collection = new Map();

    $scope.config = {
      loadOnChange: true
    };
    loadSets();
    loadTypes();
    loadSubtypes();
    loadLegalities();
    loadColors();
    loadRarities();
    loadLanguages();
  });
