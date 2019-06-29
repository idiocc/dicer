import Dicer from '../src'
import { createServer } from 'http'
import { inspect } from 'util'

const RE_BOUNDARY = /^multipart\/.+?(?:; boundary=(?:(?:"(.+)")|(?:([^\s]+))))$/i,
  HTML = Buffer.from('<html><head></head><body>\
                        <form method="POST" enctype="multipart/form-data">\
                         <input type="text" name="textfield"><br />\
                         <input type="file" name="filefield"><br />\
                         <input type="submit">\
                        </form>\
                        </body></html>'),
  PORT = 8080

createServer(function(req, res) {
  var m
  if (req.method === 'POST'
      && req.headers['content-type']
      && (m = RE_BOUNDARY.exec(req.headers['content-type']))) {
    var d = new Dicer({ boundary: m[1] || m[2] })

    d.on('part', function(p) {
      console.log('New part!')
      p.on('header', function(header) {
        for (var h in header) {
          console.log('Part header: k: ' + inspect(h)
                      + ', v: ' + inspect(header[h]))
        }
      })
      p.on('data', function(data) {
        console.log('Part data: ' + inspect(data.toString()))
      })
      p.on('end', function() {
        console.log('End of part\n')
      })
    })
    d.on('finish', function() {
      console.log('End of parts')
      res.writeHead(200)
      res.end('Form submission successful!')
    })
    req.pipe(d)
  } else if (req.method === 'GET' && req.url === '/') {
    res.writeHead(200)
    res.end(HTML)
  } else {
    res.writeHead(404)
    res.end()
  }
}).listen(PORT, function() {
  console.log('Listening for requests on port ' + PORT)
  this.close()
})