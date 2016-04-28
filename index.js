'use strict';

var util = require('util');

var partial = require('lodash.partial');

var placeholderRe = /\$(\d+)/g;

function stringifyDammit(val) {
  try {
    return JSON.stringify(val) || String(val);
  } catch (e) {
    return util.inspect(val);
  }
}

function errmsgCustomFormatter(formatter, message) {
  var alen = arguments.length;
  var args = [];
  for (var i = 2; i < alen; i++) args.push(arguments[i]);

  // stringify args
  args = args.map(formatter);

  // replace $0 placeholders with args
  return message.replace(placeholderRe, function (str, i) {
    return args[i - 1];
  });
}

function errmsgCustomLookup(formatter, map, key) {
  var msg = map[key];
  if (!msg) throw new ReferenceError('Unknown message key ' + JSON.stringify(key));

  var alen = arguments.length;
  var args = [formatter, msg];
  for (var i = 3; i < alen; i++) args.push(arguments[i]);

  return errmsgCustomFormatter.apply(null, args);
}

module.exports = partial(errmsgCustomFormatter, stringifyDammit);
module.exports.customFormatter = errmsgCustomFormatter;
module.exports.stringifyDammit = stringifyDammit;
module.exports.customFormatterLookup = errmsgCustomLookup;
module.exports.lookup = partial(errmsgCustomLookup, stringifyDammit);
