# @idio/dicer

[![npm version](https://badge.fury.io/js/@idio/dicer.svg)](https://npmjs.org/package/@idio/dicer)

`@idio/dicer` is [fork] A Very Fast Streaming Multipart Parser For Node.JS Written In ES6 And Optimised With JavaScript Compiler.

```sh
yarn add @idio/dicer
```

## Table Of Contents

- [Table Of Contents](#table-of-contents)
- [API](#api)
- [`dicer(arg1: string, arg2?: boolean)`](#mynewpackagearg1-stringarg2-boolean-void)
  * [`_@idio/dicer.Config`](#type-_@idio/dicerconfig)
- [Copyright](#copyright)

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/0.svg?sanitize=true"></a></p>

## API

The package is available by importing its default function:

```js
import dicer from '@idio/dicer'
```

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/1.svg?sanitize=true"></a></p>

## `dicer(`<br/>&nbsp;&nbsp;`arg1: string,`<br/>&nbsp;&nbsp;`arg2?: boolean,`<br/>`): void`

Call this function to get the result you want.

__<a name="type-_@idio/dicerconfig">`_@idio/dicer.Config`</a>__: Options for the program.

|   Name    |       Type       |    Description    | Default |
| --------- | ---------------- | ----------------- | ------- |
| shouldRun | <em>boolean</em> | A boolean option. | `true`  |
| __text*__ | <em>string</em>  | A text to return. | -       |

```js
/* alanode example/ */
import dicer from '@idio/dicer'

(async () => {
  const res = await dicer({
    text: 'example',
  })
  console.log(res)
})()
```
```
example
```

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/2.svg?sanitize=true"></a></p>

## Copyright

(c) [Idio][1] 2019

[1]: https://idio.cc

<p align="center"><a href="#table-of-contents"><img src="/.documentary/section-breaks/-1.svg?sanitize=true"></a></p>