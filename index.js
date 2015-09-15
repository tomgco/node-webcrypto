'use strict';

let crypto = require('crypto');
const SubtleCrypto = require('./subtle-crypto');

module.exports = {
  subtle: new SubtleCrypto(),
  getRandomValues: (typedArray, cb) => {
    // if (typedArray !== Int8Array, Uint8Array, Int16Array, Uint16Array,
    // Int32Array, or Uint32Array) {
    //   return cb(new Error('TypeMismatchError'))
    // }
    // if length > 65536 {
    //  return cb(new Error('QuotaExceededError'))
    crypto.randomBytes(typedArray.byteLength, cb);
  }
};
