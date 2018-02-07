/*
 * Copyright (c) 2015-2017 Digital Bazaar, Inc. All rights reserved.
 */

'use strict';
const bedrock = require('bedrock');
const config = bedrock.config;
const helpers = require('./helpers');

let userName = '';
let password = '';
const identities = {};

userName = 'admin';
password = 'password';
identities[userName] = {};
identities[userName].identity = helpers.createIdentity({userName, password});
identities[userName].identity.sysResourceRole = [{
  sysRole: 'identity.registered',
  generateResource: 'id'
}];

Object.keys(identities).forEach(key => {
  const i = identities[key];
  config['identity-http'].identities.push(i.identity);
  if(i.keys) {
    Array.prototype.push.apply(config.key.keys, [].concat(i.keys));
  }
});
