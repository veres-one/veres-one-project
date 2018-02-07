/*!
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
const config = require('bedrock').config;
const os = require('os');
const path = require('path');

// common paths
config.paths.cache = path.join(__dirname, '..', '.cache');
config.paths.log = path.join(os.tmpdir(), 'veres-one-project.localhost');

// core
// 0 means use # of cpus
config.core.workers = 1;
config.core.master.title = 'bedrock-1d';
config.core.worker.title = 'bedrock-1d-worker';
config.core.worker.restart = false;

// server info
config.server.port = 54443;
config.server.httpPort = 54080;

// express info
config.express.session.secret = 'NOTASECRET';
config.express.session.key = 'vop.sid';
config.express.session.prefix = 'vop.';

// mongodb config
config.mongodb.name = 'vop_dev';

// views
// branding
config.views.brand.name = 'Dev Veres One Project';
// update view vars
config.views.vars.baseUri = config.server.baseUri;
config.views.vars.title = config.views.brand.name;
config.views.vars.siteTitle = config.views.brand.name;
config.views.vars.supportDomain = config.server.domain;
config.views.vars.debug = false;
config.views.vars.minify = false;

config.views.vars.demoWarningUrl = null;
// br-form vocabularies
config.views.vars.forms = {vocabs: []};
// contact info
config.views.vars.contact.address = {
  label: 'Dev Veres One Project',
  address:
    '123 FIXME\n' +
    'FIXME, XX 12345\n' +
    'United States of America',
  htmlAddress:
    '123 FIXME<br/>' +
    'FIXME, XX 12345<br/>' +
    'United States of America'
};
config.views.vars.contact.email = {
  label: 'Customer Support',
  url: 'mailto:support@' + config.server.domain,
  email: 'support@' + config.server.domain
};

// REST API documentation
config.docs.vars.brand = config.brand.name;
config.docs.vars.baseUri = config.server.baseUri;
