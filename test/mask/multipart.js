import { deepEqual, assert, equal } from '@zoroaster/assert'
import makeTestSuite from '@zoroaster/mask'
import Dicer from '../../src'
import { existsSync, readFileSync, createReadStream } from 'fs'

const MAXED_BUFFER = Buffer.allocUnsafe(128 * 1024)
MAXED_BUFFER.fill(0x41) // 'A'

const FIXTURES_ROOT = 'test/fixture'

export default makeTestSuite('test/result/multipart', {
  async getResults() {
    const fixtureBase = FIXTURES_ROOT + '/' + this.input
    const state = {
      parts: [], partErrors: 0, error: undefined,
    }

    const dicer = new Dicer(this.opts)

    dicer.on('preamble', (p) => {
      const preamble = {
        body: undefined,
        bodylen: 0,
        error: undefined,
        header: undefined,
      }

      p.on('header', (h) => {
        preamble.header = h
        if (this.setBoundary) dicer.setBoundary(this.setBoundary)
      }).on('data', (data) => {
      // make a copy because we are using readSync which re-uses a buffer ...
        const copy = Buffer.allocUnsafe(data.length)
        data.copy(copy)
        data = copy
        if (!preamble.body)
          preamble.body = [ data ]
        else
          preamble.body.push(data)
        preamble.bodylen += data.length
      }).on('error', function(err) {
        preamble.error = err
      }).on('end', function() {
        if (preamble.body)
          preamble.body = Buffer.concat(preamble.body, preamble.bodylen)
        if (preamble.body || preamble.header)
          state.preamble = preamble
      })
    })
    dicer.on('part', (p) => {
      var part = {
        body: undefined,
        bodylen: 0,
        error: undefined,
        header: undefined,
      }

      p.on('header', function(h) {
        part.header = h
      }).on('data', function(data) {
        if (!part.body)
          part.body = [ data ]
        else
          part.body.push(data)
        part.bodylen += data.length
      }).on('error', (err) => {
        part.error = err
        ++state.partErrors
      }).on('end', () => {
        if (part.body)
          part.body = Buffer.concat(part.body, part.bodylen)
        state.parts.push(part)
      })
    }).on('error', (err) => {
      state.error = err
    })

    createReadStream(fixtureBase + '/original').pipe(dicer)

    return await new Promise((r) => {
      dicer.on('finish', () => {
        r(state)
      })
    })
  },
  assertResults({
    preamble: actualPreamble,
    parts, partErrors, error,
  }, { nparts, npartErrors = 0, dicerError }) {
    if (dicerError) equal(error.message, dicerError)
    else assert(error === undefined)

    const fixtureBase = FIXTURES_ROOT + '/' + this.input
    let preamble
    if (existsSync(fixtureBase + '/preamble')) {
      const prebody = readFileSync(fixtureBase + '/preamble')
      if (prebody.length) {
        preamble = {
          body: prebody,
          bodylen: prebody.length,
          error: undefined,
          header: undefined,
        }
      }
    }
    if (existsSync(fixtureBase + '/preamble.header')) {
      const prehead = JSON.parse(readFileSync(fixtureBase
                                              + '/preamble.header', 'binary'))
      if (!preamble) {
        preamble = {
          body: undefined,
          bodylen: 0,
          error: undefined,
          header: prehead,
        }
      } else
        preamble.header = prehead
    }
    if (existsSync(fixtureBase + '/preamble.error')) {
      const err = new Error(readFileSync(fixtureBase
                                          + '/preamble.error', 'binary'))
      if (!preamble) {
        preamble = {
          body: undefined,
          bodylen: 0,
          error: err,
          header: undefined,
        }
      } else
        preamble.error = err
    }

    deepEqual(actualPreamble, preamble)
    equal(parts.length, nparts)
    equal(partErrors, npartErrors)

    for (let i = 0, header, body; i < nparts; ++i) {
      if (existsSync(fixtureBase + '/part' + (i+1))) {
        body = readFileSync(fixtureBase + '/part' + (i+1))
        if (body.length === 0)
          body = undefined
      } else
        body = undefined
      deepEqual(parts[i].body, body)
      if (existsSync(fixtureBase + '/part' + (i+1) + '.header')) {
        header = readFileSync(fixtureBase
                                + '/part' + (i+1) + '.header', 'binary')
        header = JSON.parse(header)
      } else
        header = undefined
      deepEqual(parts[i].header, header)
    }
  },
  jsProps: ['expected', 'opts'],
})