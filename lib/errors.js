'use strict';

function InvalidAccessError(message) {
  Error.call(this);
  this.name = 'InvalidAccessError';
  this.message = message;
  this.stack = (new Error()).stack;
  Error.captureStackTrace(this, InvalidAccessError);
};
InvalidAccessError.prototype = new Error();

function NotSupportedError(message) {
  Error.call(this);
  this.name = 'NotSupportedError';
  this.message = message;
  this.stack = (new Error()).stack;
  Error.captureStackTrace(this, NotSupportedError);
};
NotSupportedError.prototype = new Error();

module.exports.InvalidAccessError = InvalidAccessError;
module.exports.NotSupportedError = NotSupportedError;
