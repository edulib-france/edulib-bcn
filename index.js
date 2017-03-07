'use strict';

const tools = require('edulib-tools');
const bcn = require('./bcn.json');
const TYPES = Object.keys(bcn);
const logger = {
  debug: console.log,
  error: console.error
};

class Bcn {

  constructor(options) {
    this.logger = options.logger || logger
  }

  getCodes(type, name) {
    if (!type || TYPES.indexOf(type) === -1) {
      this.logger.error(`unknown type "${type}"`);
    } else {
      var codes = bcn[type][tools.slug(name)];
      this.logger.debug(`bcn codes for ${type} - ${name}: ${codes}`);
      if (codes && codes.length > 0) {
        return codes;
      }
    }
    return [];
  }
}

module.exports = Bcn;
