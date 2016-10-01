'use strict';

/**
 * @ngdoc overview
 * @name mtgSnatchApp
 * @description
 * # mtgSnatchApp
 *
 * Main module of the application.
 */
angular
  .module('mtgSnatchApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.select',
    'afkl.lazyImage'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/sets', {
        templateUrl: 'views/sets.html',
        controller: 'SetsCtrl',
        controllerAs: 'sets'
      })
      .when('/cards', {
        templateUrl: 'views/cards.html',
        controller: 'CardsCtrl',
        controllerAs: 'cards'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
