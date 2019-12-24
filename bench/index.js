import Dicer from '../src'
import { inspect } from 'util'

const BOUNDARY = '-----------------------------168072824752491622650073'
const d = new Dicer({ boundary: BOUNDARY })
const MB = 100
const BUFFER = createMultipartBuffer(BOUNDARY, MB * 1024 * 1024)
const callbacks =
  { partBegin: -1,
    partEnd: -1,
    headerField: -1,
    headerValue: -1,
    partData: -1,
    end: -1,
  }


d.on('part', function(p) {
  callbacks.partBegin++
  p.on('header', function(header) {
    for (var h in header)
      console.log('Part header: k: ' + inspect(h) + ', v: ' + inspect(header[h]));
  })
  p.on('data', function(data) {
    callbacks.partData++
    //console.log('Part data: ' + inspect(data.toString()));
  })
  p.on('end', function() {
    //console.log('End of part\n');
    callbacks.partEnd++
  })
})
d.on('end', function() {
  // console.log('End of parts');
  callbacks.end++
})

var start = +new Date(),
  nparsed = d.write(BUFFER),
  duration = +new Date - start,
  mbPerSec = (MB / (duration / 1000)).toFixed(2)

console.log(mbPerSec+' mb/sec')

//assert.equal(nparsed, buffer.length);

function createMultipartBuffer(boundary, size) {
  const head =
        '--'+boundary+'\r\n'
      + 'content-disposition: form-data; name="field1"\r\n'
      + '\r\n'
  const tail = '\r\n--'+boundary+'--\r\n'
  const buffer = Buffer.allocUnsafe(size)

  const b = Buffer.concat([
    new Buffer(head, 'ascii'),
    buffer,
    new Buffer(tail, 'ascii'),
  ])
  return b
}