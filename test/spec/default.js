import { equal } from '@zoroaster/assert'
import Context from '../context'
import dicer from '../../src'

/** @type {Object.<string, (c: Context)>} */
const T = {
  context: Context,
  'is a function'() {
    equal(typeof dicer, 'function')
  },
  // async 'calls package without error'() {
  //   await dicer()
  // },
  // async 'gets a link to the fixture'({ fixture }) {
  //   const text = fixture`text.txt`
  //   const res = await dicer({
  //     text,
  //   })
  //   ok(res, text)
  // },
}

export default T