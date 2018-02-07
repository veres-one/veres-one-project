/*!
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
const bedrock = require('bedrock');
const config = bedrock.config;
const path = require('path');

// common paths
config.paths.cache = path.join(__dirname, '..', '.cache');
config.paths.log = path.join('/var', 'log', 'project.test.veres.one');

// core
// 0 means use # of cpus
config.core.workers = 0;
config.core.master.title = 'bedrock-1d';
config.core.worker.title = 'bedrock-1d-worker';
config.core.worker.restart = false;

// only run application on HTTP port
bedrock.events.on('bedrock-express.ready', app => {
  // attach express to regular http
  require('bedrock-server').servers.http.on('request', app);
  // cancel default behavior of attaching to HTTPS
  return false;
});

// server info
config.server.port = 20081;
config.server.httpPort = 20080;
config.server.bindAddr = ['0.0.0.0'];
config.server.domain = 'project.test.veres.one';
config.server.host = config.server.domain;

// express info
config.express.session.secret = 'NOTASECRET';
config.express.session.key = 'vop.sid';
config.express.session.prefix = 'vop.';

// mongodb config
config.mongodb.name = 'vop';

// views
// branding
config.views.brand.name = 'Veres One Project';
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
  label: 'Veres One Project',
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
config.views.vars.debug = false;
config.views.vars.minify = true;

// REST API documentation
config.docs.vars.brand = config.brand.name;
config.docs.vars.baseUri = config.server.baseUri;
