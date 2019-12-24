# @idio/dicer

[![npm version](https://badge.fury.io/js/%40idio%2Fdicer.svg)](https://www.npmjs.com/package/@idio/dicer)

`@idio/dicer` is a [fork](https://github.com/mscdex/dicer) of A Very Fast Streaming Multipart Parser For Node.JS Written In ES6 And Optimised With [JavaScript Compiler](https://compiler.page).

```sh
yarn add @idio/dicer
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
- [`class Dicer`](#class-dicer)
  * [`_idio.DicerConfig`](#type-_idiodicerconfig)
  * [`_idio.Dicer`](#type-_idiodicer)
- [Copyright](#copyright)

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/0.svg?sanitize=true">
</a></p>

## API

The package is available by importing its default function:

```js
import Dicer from '@idio/dicer'
```

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/1.svg?sanitize=true">
</a></p>

## `class Dicer`

Dicer is a _Writable_ stream.

`import('stream').WritableOptions` __<a name="type-streamwritableoptions">`stream.WritableOptions`</a>__

<strong><a name="type-_idiodicerconfig">`_idio.DicerConfig`</a> extends [`stream.WritableOptions`](#type-streamwritableoptions)</strong>: Options for the program.

|      Name      |       Type       |                           Description                            | Default |
| -------------- | ---------------- | ---------------------------------------------------------------- | ------- |
| boundary       | <em>string</em>  | This is the boundary used to detect the beginning of a new part. | -       |
| headerFirst    | <em>boolean</em> | If true, preamble header parsing will be performed first.        | `false` |
| partHwm        | <em>boolean</em> | High watermark for parsing parts.                                | -       |
| maxHeaderPairs | <em>number</em>  | The maximum number of header key=&gt;value pairs to parse.       | `2000`  |

<strong><a name="type-_idiodicer">`_idio.Dicer`</a></strong>

|      Name       |                                                                       Type                                                                       |                                                                                                              Description                                                                                                              |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| __constructor__ | <em>new (cfg?: <a href="#type-_idiodicerconfig" title="Options for the program.">!_idio.DicerConfig</a>) => [_idio.Dicer](#type-_idiodicer)</em> | Creates a new instance.                                                                                                                                                                                                               |
| __setBoundary__ | <em>(boundary: string) => void</em>                                                                                                              | Sets the boundary to use for parsing and performs some initialization needed for parsing. You should only need to use this if you set `headerFirst` to true in the constructor and are parsing the boundary from the preamble header. |
| ___ignore__     | <em>() => void</em>                                                                                                                              | Ignores current part.                                                                                                                                                                                                                 |

```js
import Dicer from '@idio/dicer'
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
```
```
Listening for requests on port 8080
```

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/2.svg?sanitize=true">
</a></p>

## Copyright

Original Work by [Brian White aka mscdex](https://github.com/mscdex/dicer).

---

<table>
  <tr>
    <th>
      <a href="https://artd.eco">
        <img width="100" src="https://raw.githubusercontent.com/wrote/wrote/master/images/artdeco.png"
          alt="Art Deco">
      </a>
    </th>
    <th>© <a href="https://artd.eco">Art Deco</a> for <a href="https://idio.cc">Idio</a> 2019</th>
    <th>
      <a href="https://idio.cc">
        <img src="https://avatars3.githubusercontent.com/u/40834161?s=100" width="100" alt="Idio">
      </a>
    </th>
    <th>
      <a href="https://www.technation.sucks" title="Tech Nation Visa">
        <img width="100" src="https://raw.githubusercontent.com/idiocc/cookies/master/wiki/arch4.jpg"
          alt="Tech Nation Visa">
      </a>
    </th>
    <th><a href="https://www.technation.sucks">Tech Nation Visa Sucks</a></th>
  </tr>
</table>

<p align="center"><a href="#table-of-contents">
  <img src="/.documentary/section-breaks/-1.svg?sanitize=true">
</a></p>