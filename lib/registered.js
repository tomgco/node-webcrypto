'use strict';

const ECDSA = require('../subtle-crypto/ecdsa');
const SHA = require('../subtle-crypto/sha');

const algs = module.exports.algs = {
  ECDSA,
  'SHA-1': SHA['SHA-1'],
  'SHA-256': SHA['SHA-256'],
  'SHA-384': SHA['SHA-384'],
  'SHA-512': SHA['SHA-512'],
};
