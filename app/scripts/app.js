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
        c9: ['mtg-snatch-geraldofcneto.c9users.io'],
        production: ['geraldofcneto.github.io/mtg-snatch', 'mtg-snatch2.s3-website-us-east-1.amazonaws.com', 'acme.org']
      },
      vars: {
        development: {
          apiUrl: '//localhost:8888/',
          staticUrl: '//localhost/static'
          // antoherCustomVar: 'lorem', 
          // antoherCustomVar: 'ipsum' 
          },
        production: {
          apiUrl: '//ec2-54-218-155-189.us-west-2.compute.amazonaws.com/',
          staticUrl: '//static.acme.com'
          // antoherCustomVar: 'lorem', 
          // antoherCustomVar: 'ipsum' 
        },
        c9: {
          apiUrl: '//mtg-collection-geraldofcneto.c9users.io/'
        }
      }
    });

    // run the environment check, so the comprobation is made 
    // before controllers and services are built 
    envServiceProvider.check();
  });