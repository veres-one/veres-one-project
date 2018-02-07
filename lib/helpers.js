/*
 * Copyright (c) 2016-2017 Digital Bazaar, Inc. All rights reserved.
 */

'use strict';

const bedrock = require('bedrock');
const config = bedrock.config;
const uuid = require('uuid').v4;

const api = {};
module.exports = api;

api.createIdentity = options => {
  const userName = options.userName || uuid();
  const password = options.password || 'password';
  const newIdentity = {
    id: config.server.baseUri + config['identity-http'].basePath +
      '/' + userName,
    type: 'Identity',
    sysSlug: userName,
    label: userName,
    email: `${userName}@digitalbazaar.com`,
    sysPassword: password,
    sysPublic: ['label', 'url', 'description'],
    sysStatus: 'active',
    url: config.server.baseUri,
    description: userName
  };
  return newIdentity;
};
