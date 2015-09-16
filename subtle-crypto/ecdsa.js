'use strict';

module.exports = {
  name: 'ECDSA',
  usages: [
    Symbol.for('sign'),
    Symbol.for('verify'),
    Symbol.for('generateKey'),
    Symbol.for('importKey'),
    Symbol.for('exportKey'),
  ],
  sign(algorithm, key, data, cb) {
    let hashAlgorithm = algorithm.hash;
    console.log(arguments);
    // normalise('digest', hashAlgorithm, () => {

    // });
    if (!hashAlgorithm) {
      return cb(new NotSupportedError());
    }

  },
  verify(key, sig, data, cb) {

  },
  generateKey(extractable, keyUsages, cb) {

  }
};
