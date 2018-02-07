/*!
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
import angular from 'angular';
import * as bedrock from 'bedrock-angular';
import DashboardComponent from './dashboard-component.js';
import NavbarToolsComponent from './navbar-tools-component.js';

const module = angular.module('veres-one-project.main', [
  'bedrock.authn', 'bedrock.authn-password', 'bedrock.demo-warning',
  'bedrock.identity', 'bedrock.header', 'bedrock.footer',
  'bedrock.modal', 'bedrock.navbar', 'bedrock.resolver',
  'bedrock.session', 'ngMaterial', 'ngMessages'
]);

bedrock.setRootModule(module);

module.component('veresOneProjectDashboard', DashboardComponent);
module.component('veresOneProjectNavbarTools', NavbarToolsComponent);

/* @ngInject */
module.config(function($mdThemingProvider, $routeProvider) {
  $routeProvider
    .when('/', {
      title: 'Home',
      templateUrl: 'veres-one-project/index.html',
      session: 'optional',
      resolve: {
        redirect: function($location, $route) {
          if('session' in $route.current.locals &&
            'identity' in $route.current.locals.session) {
            $location.url('/dashboard');
          }
        }
      }
    })
    .when('/login', {
      title: 'Login',
      templateUrl: 'veres-one-project/login/login.html'
    })
    .when('/dashboard', {
      title: 'Dashboard',
      session: {require: 'identity'},
      template: '<veres-one-project-dashboard>' +
        '</veres-one-project-dashboard>'
    });

  // setup default theme
  /* $mdThemingProvider
    .theme('default')
    .primaryPalette('blue')
    .accentPalette('teal')
    .warnPalette('red')
    .backgroundPalette('grey');*/

  // themes that can be used with cards (e.g. for info alerts)
  $mdThemingProvider.theme('dark-grey').backgroundPalette('grey').dark();
  $mdThemingProvider.theme('dark-orange').backgroundPalette('orange').dark();
  $mdThemingProvider.theme('dark-blue').backgroundPalette('blue').dark();
  // $mdThemingProvider.definePalette(
  //   'lighter-blue', $mdThemingProvider.extendPalette('light-blue', {
  //     'contrastDefaultColor': 'light'
  //   }));
  // $mdThemingProvider.theme('light-blue')
  //   .primaryPalette('lighter-blue')
  //   .backgroundPalette('blue')
  //   // same foreground as md-button.md-primary
  //   .foregroundPalette['1'] = 'rgba(255,255,255,0.87)';
});

/* @ngInject */
module.run((config, brNavbarService, brSessionService) => {

  // register the template for the navbar
  brNavbarService.registerTemplate('veres-one-project/navbar-tools-template.html');
  brNavbarService.displayDefault = ['brand', 'toolbar'];

  // setup the dashboard menu item
  brNavbarService.displayOrder = [
    'veresOneProjectDashboard'
  ];
  brNavbarService.registerMenu('veresOneProjectDashboard', {
    slug: '/dashboard',
    icon: 'fa fa-dashboard',
    label: 'Dashboard',
    pageTitle: 'Dashboard',
    visible: true,
    init: function(scope) {
      const menu = this;
      scope.$watch(function() {
        return brSessionService.session;
      }, function(session) {
        if(session && session.identity) {
          menu.visible = true;
        } else {
          menu.visible = false;
        }
      }, true);
      // TODO: should be done elsewhere once get latest session information
      brSessionService.get();
    }
  });
});
