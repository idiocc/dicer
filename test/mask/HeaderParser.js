import makeTestSuite from '@zoroaster/mask'
import HeaderParser from '../../src/HeaderParser'

const DCRLF = '\r\n\r\n'
const MAXED_BUFFER = Buffer.allocUnsafe(128 * 1024)
MAXED_BUFFER.fill(0x41) // 'A'

export default makeTestSuite('test/result/header-parser', {
  async getResults() {
    const parser = new HeaderParser()
    let data = []
    parser.on('header', (header) => {
      data.push(header)
    })
    const source = [
      this.input.replace(/\n/g, '\r\n')
        .replace(/MAXED_BUFFER/g, MAXED_BUFFER.toString('ascii')),
      DCRLF,
    ]
    source.forEach((d) => {
      parser.push(d)
    })
    if (data.length > 1) throw new Error('Header event fired more than once')
    return data[0]
  },
  jsProps: ['expected'],
  // context: Context,
})