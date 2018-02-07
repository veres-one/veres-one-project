/*!
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
export default {
  controller: Ctrl,
  templateUrl: 'veres-one-project/navbar-tools-component.html'
};

/* @ngInject */
function Ctrl(
  $location, $q, $scope, brAlertService, brAuthnService, brNavbarService,
  brPasswordService, brRefreshService, brSessionService, config) {
  const self = this;
  self.display = {
    hovercard: false
  };
  self.loggedIn = false;
  self.session = null;
  self.identity = null;
  self.identityBaseUrl = null;
  self.authentication = {
    displayOrder: brAuthnService.displayOrder,
    methods: brAuthnService.methods
  };

  self.showModal = {
    resetPassword: false
  };

  $scope.$watch(function() {
    return brSessionService.session;
  }, function(newValue) {
    if(newValue) {
      init();
    }
  }, true);

  self.collapseNavbar = () => brNavbarService.collapse();

  self.broadcast = e => $scope.$broadcast(e);

  self.help = () => $location.url('/help');

  self.join = () => $location.url('/join');

  self.login = method => $location.url('/signin/' + method);

  // $q.resolve required here in order for location to change in the view
  self.onLogin = () => $q.resolve(brSessionService.get())
    .then(() => $location.url('/dashboard'));

  self.onRefresh = () => brRefreshService.refresh();

  self.logout = () => $q.resolve(brSessionService.logout())
    .then(() => $location.url('/'))
    .catch(err => brAlertService.add('error', err, {scope: $scope}));

  self.sendPasscode = options => brPasswordService.sendPasscode({
    sysIdentifier: options.sysIdentifier
  });

  function init() {
    if(!brSessionService.session.identity) {
      self.loggedIn = false;
      return;
    }
    self.loggedIn = true;
    self.session = brSessionService.session;
    self.identityBaseUrl = config.data['identity-http'].baseUri + '/' +
      self.session.identity.sysSlug;
    self.identity = self.session.identity;
  }
}
