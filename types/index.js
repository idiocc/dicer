export {}

/* typal types/index.xml closure noSuppress */
/**
 * @typedef {_idio.DicerConfig} DicerConfig Options for the program.
 */
/**
 * @typedef {stream.WritableOptions & _idio.$DicerConfig} _idio.DicerConfig Options for the program.
 */
/**
 * @typedef {Object} _idio.$DicerConfig Options for the program.
 * @prop {string} [boundary] This is the boundary used to detect the beginning of a new part.
 * @prop {boolean} [headerFirst=false] If true, preamble header parsing will be performed first. Default `false`.
 * @prop {boolean} [partHwm] High watermark for parsing parts.
 * @prop {number} [maxHeaderPairs=2000] The maximum number of header key=>value pairs to parse. Default `2000`.
 */
/**
 * @typedef {import('stream').WritableOptions} stream.WritableOptions
 */
