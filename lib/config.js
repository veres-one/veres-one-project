/*!
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
const bedrock = require('bedrock');
const config = bedrock.config;
const path = require('path');

// pseudo package
config.views.system.packages.push({
  path: path.join(__dirname, '..', 'components'),
  manifest: path.join(__dirname, '..', 'package.json')
});

// images directory
config.express.static.push({
  route: '/images',
  path: path.join(__dirname, '..', 'components', 'images'),
  cors: true
});

// roles
require('../configs/roles');
