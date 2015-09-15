'use strict';

const ECDSA = require('./ecdsa');

const algs = {
  ECDSA
};

let normaliseAlgorithm = (alg, op, cb) => {
  if (!algs[alg]) {
    return cb(new Error('Algorithm ' + alg + ' is not implemented'));
  }

  let algorithm = algs[alg];
  if (algorithm.usages.indexOf(Symbol.for(op)) === -1) {
    return cb(new Error('Operation ' + op + ' is not implemented'));
  }

  return cb(null, algorithm[op]);
};

const KEY_FORMAT_RAW = Symbol.for('raw');
const KEY_FORMAT_SPKI = Symbol.for('spki');
const KEY_FORMAT_PKCS8 = Symbol.for('pkcs8');
const KEY_FORMAT_JWK = Symbol.for('jwk');

let SubtleCrypto = module.exports = class SubtleCrypto {
  constructor() {
    if (!(this instanceof SubtleCrypto)) {
      return new SubtleCrypto();
    }
  }

  encrypt(algorithm, key, data, cb) {
    // clone data.
    normaliseAlgorithm(algorithm, 'encrypt', (err, operation) => {
      if (err) return cb(err);
      operation();
    });
  }
  decrypt(algorithm, key, data, cb) {
  }
  sign(algorithm, key, data, cb) {
  }
  verify(algorithm, key, signature, data, cb) {
  }
  digest(algorithm, data, cb) {
  }
  generateKey(algorithm, extractable, keyUsages, cb) {
  }
  deriveKey(algorithm, baseKey, derivedKeyType, extractable, keyUsages, cb) {
  }
  deriveBits(algorithm, baseKey, length, cb) {
  }
  importKey(format, keyData, algorithm, extractable, keyUsages, cb) {
  }
  exportKey(format, key, cb) {
   }
  wrapKey(format, key, wrappingKey, wrapAlgorithm, cb) {
  }
  unwrapKey(format, wrappedKey, unwrappingKey, unwrapAlgorithm,
            unwrappedKeyAlgorithm, extractable, keyUsages, cb) {
  }
};

