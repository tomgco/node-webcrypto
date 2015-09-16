'use strict';

const crypto = require('crypto');

module.exports = {
  'SHA-1'  : undefined,
  'SHA-256': {
    name: 'SHA-256',
    usages: [
      Symbol.for('digest')
    ],
    digest(data, cb) {
      let hash = crypto.createHash('sha256');
      hash.update(data);
      return cb(null, hash.digest());
    }
  },
  'SHA-384': undefined,
  'SHA-512': undefined
};
