'use strict';

const tools = require('edulib-tools');
const bcn = require('./bcn.json');
const TYPES = Object.keys(bcn);
const logger = {
  debug: console.log,
  error: console.error
};

const codes = {};
for (var type in bcn) {
  if (bcn.hasOwnProperty(type)) {
    var names = bcn[type];
    for (var name in names) {
      if (names.hasOwnProperty(name)) {
        names[name].forEach((code)=> {
          var data = codes[code] = codes[code] || [];
          data.push(name);
        });
      }
    }
  }
}

class Bcn {

  constructor(options) {
    this.logger = (options && options.logger) || logger;
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

  getValues(code) {
    var values = codes[code];
    if (!values) {
      this.logger.error(`unknown code "${code}"`);
    }
    return values || [];
  }

}

module.exports = Bcn;
