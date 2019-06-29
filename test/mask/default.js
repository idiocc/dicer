import makeTestSuite from '@zoroaster/mask'
import Context from '../context'
import dicer from '../../src'

// export default
makeTestSuite('test/result', {
  async getResults() {
    const res = await dicer({
      text: this.input,
    })
    return res
  },
  context: Context,
})