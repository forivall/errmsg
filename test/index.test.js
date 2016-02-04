import test from 'ava'
import errmsg from '../index'
import partial from 'lodash.partial'

test('it works', t => {
  t.is(errmsg('$1 $2 $3 $4', 'Hello', 'World', null, undefined), '"Hello" "World" null undefined')
})

test('circular', t => {
  const o = {}
  o.o = o

  t.is(errmsg.stringifyDammit(o), '{ o: [Circular] }')
})

test('customFormatter', t => {
  function id(v) {return v}
  t.is(errmsg.customFormatter(id, '$1 $2', 'Hello', 'World'), 'Hello World')
})

test('customFormatter bind', t => {
  function id(v) {return v}
  const errmsgId = partial(errmsg.customFormatter, id)
  t.is(errmsgId('$1 $2', 'Hello', 'World'), 'Hello World')
})

test('lookup', t => {
  const MESSAGES = {
    lipsum: '$1 $2 dolor sit amet.'
  }
  const errmsgs = partial(errmsg.lookup, MESSAGES)
  t.is(errmsgs('lipsum', 'Lorem', 'Ipsum'), '"Lorem" "Ipsum" dolor sit amet.')
})

test('customFormatterLookup', t => {
  function id(v) {return v}
  const MESSAGES = {
    lipsum: '$1 $2 dolor sit amet.'
  }
  const errmsgsId = partial(errmsg.customFormatterLookup, id, MESSAGES)
  t.is(errmsgsId('lipsum', 'Lorem', 'Ipsum'), 'Lorem Ipsum dolor sit amet.')
})
