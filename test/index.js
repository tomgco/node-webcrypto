'use strict';

let crypto = require('..');

let key = '---- KEY ---- HAaaaA';
let data = new Buffer('Some data');

crypto.subtle.sign('ECDSA', key, data, () => {
  console.log(arguments);
});
