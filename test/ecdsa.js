'use strict';

let crypto = require('../');

let privateKey = '';
let data = '';

crypto.subtle.sign(
  {
    name: 'ECDSA',
    hash: {name: 'SHA-256'},
  },
  privateKey, //from generateKey or importKey above
  data, //ArrayBuffer of data you want to sign
  (err, signature) => {
    if (err) throw err;
    console.log(new Uint8Array(signature));
  }
);
