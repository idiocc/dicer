/* typal types/index.xml externs */
/** @const */
var _idio = {}
/**
 * Options for the program.
 * @typedef {{ boundary: (string|undefined), headerFirst: (boolean|undefined), partHwm: (boolean|undefined), maxHeaderPairs: (number|undefined) }}
 */
_idio.DicerConfig
/**
 * @typedef {{ setBoundary: function(string): void, _ignore: function(): void }}
 */
_idio.Dicer

/**
 * @type {!Object}
 */
stream.Writable.prototype._events