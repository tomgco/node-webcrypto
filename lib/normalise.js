'use strict';

// const {NotSupportedError, InvalidAccessError} = require('../lib/errors');
const errors = require('./errors');
const NotSupportedError = errors.NotSupportedError;
const InvalidAccessError = errors.InvalidAccessError;

/**
 * Implementation of:
 * http://www.w3.org/
    TR/WebCryptoAPI/#algorithm-normalization-normalize-an-algorithm
 */

module.exports = algs => function normalise(op, alg, cb) {
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

    if (alg.hash) {
      return normalise('digest', alg.hash, (err, hashAlg) => {
        let hashName = hashAlg.name;
        hashName = hashName.toUpperCase();

        let desiredType = algs[hashName];

        if (!desiredType) {
          return cb(new NotSupportedError(
            'Hash ' + algName + ' is not implemented')
          );
        }

        normalisedAlgorithm.idlValue = desiredType;

        cb(null, normalisedAlgorithm, op);
      });
    }

    return cb(null, normalisedAlgorithm, op);
  }
  return cb(new Error('What the fuck?'));
};
