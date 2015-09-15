'use strict';

module.exports = function createCryptoKeyPair(publicKey, privateKey) {
  return {
    publicKey,
    privateKey
  };
};
