/* alanode example/ */
import dicer from '../src'

(async () => {
  const res = await dicer({
    text: 'example',
  })
  console.log(res)
})()