/*!
 * Copyright (c) 2017 Digital Bazaar, Inc. All rights reserved.
 */
const config = require('bedrock').config;

require('./permissions');

const permissions = config.permission.permissions;
const roles = config.permission.roles;

roles['identity.manager'] = {
  id: 'identity.manager',
  label: 'Identity Manager',
  comment: 'Role for identity managers.',
  sysPermission: [
    permissions.IDENTITY_ADMIN.id,
    permissions.IDENTITY_ACCESS.id,
    permissions.IDENTITY_INSERT.id,
    permissions.IDENTITY_EDIT.id,
    permissions.IDENTITY_UPDATE_MEMBERSHIP.id,
    permissions.IDENTITY_CAPABILITY_DELEGATE.id,
    permissions.PUBLIC_KEY_CREATE.id,
    permissions.PUBLIC_KEY_ACCESS.id,
    permissions.PUBLIC_KEY_EDIT.id,
    permissions.PUBLIC_KEY_REMOVE.id
  ]
};

roles['identity.registered'] = {
  id: 'identity.registered',
  label: 'Registered Identity',
  comment: 'Role for registered identities.',
  sysPermission: [].concat(
    roles['identity.manager'].sysPermission,
    [
      // permissions.LEDGER_ACCESS.id,
      // permissions.LEDGER_CREATE.id,
      // permissions.LEDGER_REMOVE.id,
      // permissions.LEDGER_AGENT_ACCESS.id,
      // permissions.LEDGER_AGENT_CREATE.id,
      // permissions.LEDGER_AGENT_REMOVE.id
    ]
  )
};
