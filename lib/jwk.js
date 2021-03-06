dictionary RsaOtherPrimesInfo {
  // The following fields are defined in Section 6.3.2.7 of JSON Web Algorithms
  DOMString r;
  DOMString d;
  DOMString t;
};

dictionary JsonWebKey {
  // The following fields are defined in Section 3.1 of JSON Web Key
  DOMString kty;
  DOMString use;
  sequence<DOMString> key_ops;
  DOMString alg;

  // The following fields are defined in JSON Web Key Parameters Registration
  boolean ext;

  // The following fields are defined in Section 6 of JSON Web Algorithms
  DOMString crv;
  DOMString x;
  DOMString y;
  DOMString d;
  DOMString n;
  DOMString e;
  DOMString p;
  DOMString q;
  DOMString dp;
  DOMString dq;
  DOMString qi;
  sequence<RsaOtherPrimesInfo> oth;
  DOMString k;
};
