'use strict';

let crypto = require('../');

crypto.subtle.generateKey({ name: 'ECDSA', namedCurve: 'P-256'}, false, ['sign'], (err, key) => {
  if (err) throw err;

  let data = new Buffer('Hello, world.');
  let privateKey = key.privateKey;

  crypto.subtle.sign(
    {
      name: 'ECDSA',
      namedCurve: 'P-256',
      hash: {name: 'SHA-256'},
    },
    privateKey, //from generateKey or importKey above
    data, //ArrayBuffer of data you want to sign
    (err, signature) => {
      if (err) throw err;
      console.log(new Uint8Array(signature));
    }
  );

});
