'use strict';

const KeyType = {
  public: Symbol('public'),
  private: Symbol('private'),
  secret: Symbol('secret')
};

const KeyUsage = {
  encrypt: Symbol('encrypt'),
  decrypt: Symbol('decrypt'),
  sign:    Symbol('sign'),
  verify: Symbol('verify'),
  deriveKey: Symbol('deriveKey'),
  deriveBits: Symbol('deriveBits'),
  wrapKey: Symbol('wrapKey'),
  unwrapKey: Symbol('unwrapKey')
};

const _type = new WeakMap();
const _extractable = new WeakMap();
const _algorithm = new WeakMap();
const _usages = new WeakMap();

const CryptoKey = module.exports = class CryptoKey {
  constructor(type, extractable, algorithm, usages) {
    type = KeyType[type];
    if (!type) {
      throw new Error('Type must be one of: ' + Object.keys(KeyType));
    }
    _type.set(this, type);
    _extractable.set(this, !!extractable);
    _algorithm.set(this, algorithm);
    _usages.set(this, usages);
  }
  /**
   *  Read only members =D
   **/
  get type() {
    return _type.get(this);
  }
  get extractable() {
    return _extractable.get(this);
  }
  get algorithm() {
    return _algorithm.get(this);
  }
  get usages() {
    return _usages.get(this);
  }
};

var a = new CryptoKey('public');
console.log(a.type);

var b = new CryptoKey('secret');
console.log(b.type, b);
console.log(a.type);
