const _Dicer = require('./dicer')

class Dicer extends _Dicer {
  /**
   * Creates a new instance.
   * @param {!_idio.DicerConfig} [cfg] Options for the program.
   * @param {string} [cfg.boundary] This is the boundary used to detect the beginning of a new part.
   * @param {boolean} [cfg.headerFirst=false] If true, preamble header parsing will be performed first. Default `false`.
   * @param {boolean} [cfg.partHwm] High watermark for parsing parts.
   * @param {number} [cfg.maxHeaderPairs=2000] The maximum number of header key=>value pairs to parse. Default `2000`.
   */
  constructor(cfg) {
    super(cfg)
  }
  /**
   * Sets the boundary to use for parsing and performs some initialization needed for parsing. You should only need to use this if you set `headerFirst` to true in the constructor and are parsing the boundary from the preamble header.
   * @param {string} boundary The boundary.
   */
  setBoundary(boundary) {
    return super.setBoundary(boundary)
  }
  /**
   * Ignores current part.
   */
  _ignore() {
    return super._ignore()
  }
}

module.exports = Dicer

/* typal types/index.xml namespace */
/**
 * @typedef {import('stream').WritableOptions} stream.WritableOptions
 * @typedef {_idio.DicerConfig} DicerConfig Options for the program.
 * @typedef {stream.WritableOptions & _idio.$DicerConfig} _idio.DicerConfig Options for the program.
 * @typedef {Object} _idio.$DicerConfig Options for the program.
 * @prop {string} [boundary] This is the boundary used to detect the beginning of a new part.
 * @prop {boolean} [headerFirst=false] If true, preamble header parsing will be performed first. Default `false`.
 * @prop {boolean} [partHwm] High watermark for parsing parts.
 * @prop {number} [maxHeaderPairs=2000] The maximum number of header key=>value pairs to parse. Default `2000`.
 * @typedef {_idio.Dicer} Dicer `＠interface`
 * @typedef {Object} _idio.Dicer `＠interface`
 * @prop {(boundary: string) => void} setBoundary Sets the boundary to use for parsing and performs some initialization needed for parsing. You should only need to use this if you set `headerFirst` to true in the constructor and are parsing the boundary from the preamble header.
 * @prop {() => void} _ignore Ignores current part.
 */
