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
    'afkl.lazyImage',
    'environment',
    'angular-toArrayFilter'
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
  })
  .config(function(envServiceProvider) {
    // set the domains and variables for each environment 
    envServiceProvider.config({
      domains: {
        development: ['localhost', 'dev.local'],
        c9: ['mtg-snatch-io-geraldofcneto.c9users.io'],
        production: ['geraldofcneto.github.io/mtg-snatch', 'mtg-snatch2.s3-website-us-east-1.amazonaws.com', 'mtg-snatch.herokuapp.com']
      },
      vars: {
        development: {
          apiUrl: '//localhost:8888/',
          staticUrl: '//localhost/static',
          mtgio: 'https://api.magicthegathering.io/v1/'
          },
        production: {
          apiUrl: '//mtg-collection-api.herokuapp.com/',
          mtgio: 'https://api.magicthegathering.io/v1/'
        },
        c9: {
          apiUrl: '//mtg-collection-api.herokuapp.com/',
          mtgio: 'https://api.magicthegathering.io/v1/'
        }
      }
    });

    // run the environment check, so the comprobation is made 
    // before controllers and services are built 
    envServiceProvider.check();
  });