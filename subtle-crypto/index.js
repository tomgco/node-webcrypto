'use strict';

// const {NotSupportedError, InvalidAccessError} = require('../lib/errors');
const errors = require('../lib/errors');
const NotSupportedError = errors.NotSupportedError;
const InvalidAccessError = errors.InvalidAccessError;

const registered = require('../lib/registered');
const algs = registered.algs;
const normalise = require('../lib/normalise')(algs);

// let normaliseAlgorithm = (alg, op, cb) => {
//   if (!algs[alg]) {
//     return cb(new Error('Algorithm ' + alg + ' is not implemented'));
//   }

//   let algorithm = algs[alg];
//   if (algorithm.usages.indexOf(Symbol.for(op)) === -1) {
//     return cb(new Error('Operation ' + op + ' is not implemented'));
//   }

//   return cb(null, algorithm[op]);
// };

// let normaliseHashAlgorithm = (alg, op, cb) => {
//   if (!hashAlgs[alg]) {
//     return cb(new Error('Hash Algorithm ' + alg + ' is not implemented'));
//   }

//   let algorithm = algs[alg];
//   let op = Symbol.for('digest');

//   return cb(null, algorithm[op]);
// };


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
    normalise('encrypt', algorithm, (err, alg, op) => {
      if (err) return cb(err);
      if (alg.name !== algorithm) {
        return cb(new InvalidAccessError('Names do not match'));
      }
      if (alg.usages.indexOf(Symbol.for(op)) === -1) {
        return cb(new InvalidAccessError('Operation ' + op + ' is not implemented'));
      }
      alg[op](algorithm, key, data, cb);
    });
  }
  decrypt(algorithm, key, data, cb) {
  }
  sign(algorithm, key, data, cb) {
    normalise('sign', algorithm, (err, alg, op) => {
      if (err) return cb(err);
      // if (alg.name !== algorithm) {
      //   return cb(new InvalidAccessError('Names do not match'));
      // }
      if (alg.usages.indexOf(Symbol.for(op)) === -1) {
        return cb(new InvalidAccessError('Operation ' + op + ' is not implemented'));
      }
      alg[op](algorithm, key, data, cb);
    });
  }
  verify(algorithm, key, signature, data, cb) {
  }
  digest(algorithm, data, cb) {
  }
  generateKey(algorithm, extractable, keyUsages, cb) {
    normalise('generateKey', algorithm, (err, alg, op) => {
      if (err) return cb(err);
      // if (alg.name !== algorithm) {
      //   return cb(new InvalidAccessError('Names do not match'));
      // }
      if (alg.usages.indexOf(Symbol.for(op)) === -1) {
        return cb(new InvalidAccessError('Operation ' + op + ' is not implemented'));
      }
      alg[op](algorithm, extractable, keyUsages, cb);
    });
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

