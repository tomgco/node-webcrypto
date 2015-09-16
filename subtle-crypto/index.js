'use strict';

const ECDSA = require('./ecdsa');
const SHA = require('./sha');
// const {NotSupportedError, InvalidAccessError} = require('../lib/errors');
const errors = require('../lib/errors');
const NotSupportedError = errors.NotSupportedError;
const InvalidAccessError = errors.InvalidAccessError;

const algs = {
  ECDSA
};

const hashAlgs = {
  'SHA-1': SHA['SHA-1'],
  'SHA-256': SHA['SHA-256'],
  'SHA-384': SHA['SHA-384'],
  'SHA-512': SHA['SHA-512'],
};

/**
 * Implementation of:
 * http://www.w3.org/TR/WebCryptoAPI/#algorithm-normalization-normalize-an-algorithm
 */

let normalise = (op, alg, cb) => {
  if (typeof alg === 'string') {
    normalise(new KeyAlgorithm(alg, op), cb);
  } else if (typeof alg === 'object') {
    if (!alg || !alg.name) {
      return cb(new Error('Algorithm name must be provided.'));
    }
    let initalAlg = { name: alg.name };
    let algName = initalAlg.name;
    algName = algName.toUpperCase();

    let desiredType = algs[algName];

    if (!desiredType) {
      return cb(new NotSupportedError(
        'Algorithm ' + algName + ' is not implemented')
      );
    }

    let normalisedAlgorithm = desiredType;
    normalisedAlgorithm.name = algName;

    return cb(null, normalisedAlgorithm, op);
  }
};

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

