# errmsg

A simple, generic tool for creating (error) messages

[![build status](https://secure.travis-ci.org/forivall/errmsg.svg)](http://travis-ci.org/forivall/errmsg)
[![dependency status](https://david-dm.org/forivall/errmsg.svg)](https://david-dm.org/forivall/errmsg)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Installation

```
npm install --save errmsg
```

## Usage

```
var errmsg = require('errmsg')
var partial = require('lodash.partial')
console.log(errmsg("$1 $2", "Hello", "World")) // "Hello" "World"

function id(v) {return v}
console.log(errmsg.customFormatter(id, "$1 $2", "Hello", "World")) // Hello World

var errmsgId = partial(errmsg.customFormatter, id);
console.log(errmsgId.customFormatter("$1 $2", "Hello", "World")) // Hello World

var MESSAGES = {
  lipsum: "$1 $2 dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
}
var errmsgs = partial(errmsg.lookup, MESSAGES);
console.log(errmsgs("lipsum", "Lorem", "Ipsum"));

var errmsgsId = partial(errmsg.customFormatterLookup, id, MESSAGES);
console.log(errmsgsId("lipsum", "Lorem", "Ipsum"));
```

## Credits
[Jordan Klassen](https://github.com/forivall/)
[Sebastian McKenzie](https://github.com/kittens/) - based on babel-messages

## License

ISC
