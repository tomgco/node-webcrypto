'use strict';
const errors = require('../lib/errors');
const NotSupportedError = errors.NotSupportedError;
const InvalidAccessError = errors.InvalidAccessError;

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
    let hashAlgorithm = algorithm.idlValue;
    if (!hashAlgorithm) {
      return cb(new NotSupportedError());
    }
    let digest = hashAlgorithm.digest;
    if (!digest) {
      return cb(new NotSupportedError());
    }
    digest(data, (err, buff) => {
      let m = buff;
      let d = key;
      let params = algorithm;
      return cb(null, buff);
    });
  },
  verify(key, sig, data, cb) {

  },
  generateKey(algorithm, extractable, usages, cb) {
    console.log(usages);
    if (usages && Array.isArray(usages)) {
      if (usages.indexOf('verify') != -1 || usages.indexOf('sign') != -1) {
        return
      }
    }
    return cb(new Error('Usages must be an array containing sign or verify'));
  }
};
