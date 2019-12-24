/**
 * @fileoverview
 * @externs
 */
/* typal types/index.xml externs */
/** @const */
var _idio = {}
/**
 * Options for the program.
 * @typedef {{ boundary: (string|undefined), headerFirst: (boolean|undefined), partHwm: (boolean|undefined), maxHeaderPairs: (number|undefined) }}
 */
_idio.DicerConfig
/**
 * Creates a new instance.
 * @param {!_idio.DicerConfig=} [cfg] The configuration options.
 * @interface
 */
_idio.Dicer = function(cfg) {}
/**
 * Sets the boundary to use for parsing and performs some initialization needed for parsing. You should only need to use this if you set `headerFirst` to true in the constructor and are parsing the boundary from the preamble header.
 * @param {string} boundary The boundary.
 */
_idio.Dicer.prototype.setBoundary = function(boundary) {}
/**
 * Ignores current part.
 */
_idio.Dicer.prototype._ignore = function() {}

/**
 * @type {!Object}
 */
stream.Writable.prototype._events