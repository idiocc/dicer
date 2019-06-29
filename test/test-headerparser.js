var assert = require('assert'),
  path = require('path')

var HeaderParser = require('../lib/HeaderParser')

var DCRLF = '\r\n\r\n',
  MAXED_BUFFER = Buffer.allocUnsafe(128 * 1024)
MAXED_BUFFER.fill(0x41) // 'A'

var group = path.basename(__filename, '.js') + '/';

[
  { source: MAXED_BUFFER.toString('ascii') + DCRLF,
    expected: {},
    what: 'Max header size (single chunk)',
  },
  { source: ['ABCDEFGHIJ', MAXED_BUFFER.toString('ascii'), DCRLF],
    expected: {},
    what: 'Max header size (multiple chunks #1)',
  },
  { source: [MAXED_BUFFER.toString('ascii'), MAXED_BUFFER.toString('ascii'), DCRLF],
    expected: {},
    what: 'Max header size (multiple chunk #2)',
  },
].forEach(function(v) {
  var parser = new HeaderParser(),
    fired = false

  parser.on('header', function(header) {
    assert(!fired, makeMsg(v.what, 'Header event fired more than once'))
    fired = true
    assert.deepEqual(header,
      v.expected,
      makeMsg(v.what, 'Parsed result mismatch'))
  })
  if (!Array.isArray(v.source))
    v.source = [v.source]
  v.source.forEach(function(s) {
    parser.push(s)
  })
  assert(fired, makeMsg(v.what, 'Did not receive header from parser'))
})

function makeMsg(what, msg) {
  return '[' + group + what + ']: ' + msg
}
