import { Readable } from 'stream'

export default class PartStream extends Readable {
  constructor(opts) {
    super(opts)
  }
  _read() {}
}