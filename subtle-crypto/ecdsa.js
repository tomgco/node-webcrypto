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
  sign(key, data, cb) {

  },
  verify(key, sig, data, cb) {

  },
  generateKey(extractable, keyUsages, cb) {

  }
};
