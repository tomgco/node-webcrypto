'use strict';

const CryptoKey = require('./crypto-key');

module.exports = function createCryptoKeyPair(publicKey, privateKey) {
  if (!(publicKey instanceof CryptoKey) || !(privateKey instanceof CryptoKey)) {
    throw new Error('Both publicKey and privateKey' +
      ' must be an instance of CryptoKey');
  }
  return {
    publicKey,
    privateKey
  };
};
