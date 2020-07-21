# es-forwarded

[![Subscribe to twitter][twitter-image]][twitter-url]
![Top language][top-lang-image]
![Vulnerabilities][snyk-image]
[![Version][npm-v-image]][npm-url]
[![Node Version][node-version-image]][node-version-url]
![Last commit][last-commit-image]

> This is a copy of [forwarded-parse](https://github.com/lpinca/forwarded-parse) package but with ESM and CommonJS targets.

Parse the Forwarded header ([RFC 7239](http://tools.ietf.org/html/rfc7239)) into an array of objects.

## Install

```sh
pnpm i es-forwarded
```

## API

```ts
import { parse } from 'es-forwarded'
```

### `parse(text)`

Parse the `Forwarded` header value into an array of objects.

## Example

```ts
import { parse } from 'es-forwarded'

console.log(parse('for=198.51.100.17;by=203.0.113.60;proto=http;host=example.com'))

/*
[{
  for: '198.51.100.17',
  by: '203.0.113.60',
  proto: 'http',
  host: 'example.com'
}]
*/
```

## License

MIT © [v1rtl](https://v1rtl.site)

[twitter-image]: https://img.shields.io/twitter/follow/v1rtl.svg?label=follow%20on%20twitter&style=flat-square
[twitter-url]: https://twitter.com/v1rtl
[node-version-image]: https://img.shields.io/node/v/es-forwarded.svg?style=flat-square
[node-version-url]: https://nodejs.org
[top-lang-image]: https://img.shields.io/github/languages/top/talentlessguy/es-forwarded.svg?style=flat-square
[snyk-image]: https://img.shields.io/snyk/vulnerabilities/npm/es-forwarded.svg?style=flat-square
[npm-v-image]: https://img.shields.io/npm/v/es-forwarded.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/es-forwarded
[last-commit-image]: https://img.shields.io/github/last-commit/talentlessguy/es-forwarded.svg?style=flat-square
