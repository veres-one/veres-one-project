/*
 * Copyright (c) 2016-2018 Digital Bazaar, Inc. All rights reserved.
 */
'use strict';

const bedrock = require('bedrock');
const config = bedrock.config;
const didv1 = require('did-veres-one');
const didcv1 = require('did-client-veres-one');
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

api.registerAccelerator = async (
  {invoker, hostname, env, creator, privateKeyPem}) => {
  // FIXME: ensure a capability revocation list exists first

  let capability = api.createAcceleratorCapability({invoker});

  // attach grant proof to capability DID Document
  capability = await didv1.attachGrantProof({
    didDocument: capability,
    creator,
    privateKeyPem
  });

  // attach self-invocation proof for new capability doc
  let operation = didv1.wrap({didDocument: capability});
  operation = await didv1.attachInvocationProof({
    operation,
    capability,
    capabilityAction: operation.type,
    creator,
    privateKeyPem
  });

  // TODO: add an accelerator capability (just once) for the Veres One Project
  //   that uses a PoW -- and then all other additions by the Veres One Project
  //   can invoke this capability instead of doing a PoW here? Or... find an
  //   alternative solution to avoiding PoW when registering accelerators?

  // attach proof of work
  operation = await didv1.attachEquihashProof({operation, env});

  // send operation to Veres One ledger node
  return didcv1.send({operation, hostname, env});
};

// TODO: perhaps get `ledgerId` from config to make less error prone
function _createAcceleratorCapability({ledgerId, invoker}) {
  return {
    '@context': 'https://w3id.org/veres-one/v1',
    // UUID-based DID ok for a capability doc, it has no keys of its own
    id: 'did:v1:uuid:' + uuid(),
    // capability is for updating the ledger, and because an `invocationTarget`
    // is specified that is not self-referencing, it means this capability
    // must have a `grantCapability` proof to be accepted (this is to be
    // attached in a separate function call)
    invocationTarget: ledgerId,
    // the ID of an "accelerator"
    invoker: invoker,
    caveat: [{
      // can only use to create and update DID documents
      type: 'ActionWhitelist',
      action: ['AcceleratedDidCreate', 'AcceleratedDidUpdate']
    }, {
      // require revocation check on a revocation list
      type: 'RevocationCheck',
      capabilityStatusList: 'did:v1:uuid:FIXME'
    }]
  };
}

// TODO: perhaps get `veresOneProjectId` from config to make less error prone
function _createCapabilityStatusList({veresOneProjectId}) {
  return {
    '@context': 'https://w3id.org/veres-one/v1',
    // UUID-based DID ok for a capability doc, it has no keys of its own
    id: 'did:v1:uuid:' + uuid(),
    capability: [
      // list of capabilities that have been revoked/status change
    ],
    // Veres One Project may grant capabilities to update this list
    // (e.g. revoke it)
    grantCapability: [{
      type: 'RsaSignatureCapabilityAuthorization2018',
      publicKey: {
        // any public key owned by this DID (the Veres One Project DID)
        owner: veresOneProjectId
      }
    }],
    // Veres One Project may invoke capabilities to update this list
    invokeCapability: [{
      type: 'RsaSignatureCapabilityAuthorization2018',
      publicKey: {
        // any public key owned by this DID (the Veres One Project DID)
        owner: veresOneProjectId
      }
    }]
  };
}
