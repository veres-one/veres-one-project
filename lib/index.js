/*!
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
const _ = require('lodash');
const bedrock = require('bedrock');

// required bedrock modules
require('bedrock-docs');
require('bedrock-express');
require('bedrock-i18n');
require('bedrock-identity');
require('bedrock-key');
require('bedrock-key-http');
require('bedrock-identity-http');
// FIXME: bedrock-authn-password is being loaded after bedrock-identity-http
// to ensure that the `password` validation schema in bedrock-authn-password
// is utilized.
// see: https://github.com/digitalbazaar/bedrock-website-user-http/issues/4
require('bedrock-authn-password');
require('bedrock-jobs');
require('bedrock-mongodb');
require('bedrock-passport');
require('bedrock-permission');
require('bedrock-rest');
require('bedrock-server');
require('bedrock-session-http');
require('bedrock-session-mongodb');
require('bedrock-website-user-http');
require('bedrock-validation');
require('bedrock-views');
require('bedrock-webpack');

// add built-in identities
require('./identities');

// require default config
require('./config');

bedrock.events.on('bedrock-session-http.session.get', function(req, session) {
  if(req.isAuthenticated()) {
    // FIXME: temporary overwrite that exposes all server-side identity
    // information; restrict what is exposed
    session.identity = _.assign(session.identity, req.user.identity);
  }
});

const api = {};
module.exports = api;
