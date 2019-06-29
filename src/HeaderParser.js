import { EventEmitter } from 'events'
import StreamSearch from './streamsearch'

const B_DCRLF = Buffer.from('\r\n\r\n')
const RE_CRLF = /\r\n/g
const RE_HDR = /^([^:]+):[ \t]?([\x00-\xFF]+)?$/ // eslint-disable-line
const MAX_HEADER_PAIRS = 2000 // from node's http.js
const MAX_HEADER_SIZE = 80 * 1024 // from node's http_parser

export default class HeaderParser extends EventEmitter {
  /**
   * @param {_idio.DicerConfig} [cfg] Options for the program.
   * @param {string} [cfg.boundary] This is the boundary used to detect the beginning of a new part.
   * @param {boolean} [cfg.headerFirst=false] If true, preamble header parsing will be performed first. Default `false`.
   * @param {boolean} [cfg.partHwm] High watermark for parsing parts.
   * @param {number} [cfg.maxHeaderPairs=2000] The maximum number of header key=>value pairs to parse. Default `2000`.
   */
  constructor(cfg = {}) {
    super()
    const { maxHeaderPairs = MAX_HEADER_PAIRS } = cfg

    // var self = this
    this.nread = 0
    this.maxed = false
    this.npairs = 0
    this.maxHeaderPairs = maxHeaderPairs
    this.buffer = ''
    this.header = {}
    this.finished = false
    this.ss = new StreamSearch(B_DCRLF)
    this.ss.on('info', (isMatch, data, start, end) => {
      if (data && !this.maxed) {
        if (this.nread + (end - start) > MAX_HEADER_SIZE) {
          end = (MAX_HEADER_SIZE - this.nread)
          this.nread = MAX_HEADER_SIZE
        } else
          this.nread += (end - start)

        if (this.nread === MAX_HEADER_SIZE)
          this.maxed = true

        this.buffer += data.toString('binary', start, end)
      }
      if (isMatch)
        this._finish()
    })
  }
  push(data) {
    var r = this.ss.push(data)
    if (this.finished)
      return r
  }
  reset() {
    this.finished = false
    this.buffer = ''
    this.header = {}
    this.ss.reset()
  }
  _finish() {
    if (this.buffer)
      this._parseHeader()
    this.ss.matches = this.ss.maxMatches
    var header = this.header
    this.header = {}
    this.buffer = ''
    this.finished = true
    this.nread = this.npairs = 0
    this.maxed = false
    this.emit('header', header)
  }
  _parseHeader() {
    if (this.npairs === this.maxHeaderPairs)
      return

    var lines = this.buffer.split(RE_CRLF), len = lines.length, m, h,
      modded = false

    for (let i = 0; i < len; ++i) {
      if (lines[i].length === 0)
        continue
      if (lines[i][0] == '\t' || lines[i][0] == ' ') {
        // folded header content
        // RFC2822 says to just remove the CRLF and not the whitespace following
        // it, so we follow the RFC and include the leading whitespace ...
        this.header[h][this.header[h].length - 1] += lines[i]
      } else {
        m = RE_HDR.exec(lines[i])
        if (m) {
          h = m[1].toLowerCase()
          if (m[2]) {
            if (this.header[h] === undefined)
              this.header[h] = [m[2]]
            else
              this.header[h].push(m[2])
          } else
            this.header[h] = ['']
          if (++this.npairs === this.maxHeaderPairs)
            break
        } else {
          this.buffer = lines[i]
          modded = true
          break
        }
      }
    }
    if (!modded)
      this.buffer = ''
  }
}

/**
 * @suppress {nonStandardJsDocs}
 * @typedef {import('../types').DicerConfig} _idio.DicerConfig
 */