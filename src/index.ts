import util from 'util'
import { ParseError } from './error'
import { isDelimiter, isExtended, isPrint, isTokenChar } from './ascii'

/**
 * Unescape a string.
 *
 * @param str The string to unescape.
 * @returns A new unescaped string.
 */
const decode = (str: string) => str.replace(/\\(.)/g, '$1')

/**
 * Build an error message when an unexpected character is found.
 *
 * @param header The header field value.
 * @param position The position of the unexpected character.
 * @returns The error message.
 */
function unexpectedCharacterMessage(header: string, position: number): string {
  return util.format("Unexpected character '%s' at index %d", header.charAt(position), position)
}

/**
 * Parse the `Forwarded` header field value into an array of objects.
 *
 * @param header The header field value.
 */

export function parse(header: string) {
  let mustUnescape = false
  let isEscaping = false
  let inQuotes = false
  let forwarded = {}
  let output = []
  let start = -1
  let end = -1
  let parameter
  let code: number

  for (let i = 0; i < header.length; i++) {
    code = header.charCodeAt(i)

    if (parameter === undefined) {
      if (start === -1 && (code === 0x20 /*' '*/ || code === 0x09) /*'\t'*/) {
        continue
      }

      if (isTokenChar(code)) {
        if (start === -1) start = i
      } else if (code === 0x3d /*'='*/ && start !== -1) {
        parameter = header.slice(start, i).toLowerCase()
        start = -1
      } else {
        throw new ParseError(unexpectedCharacterMessage(header, i), header)
      }
    } else {
      if (isEscaping && (code === 0x09 || isPrint(code) || isExtended(code))) {
        isEscaping = false
      } else if (isTokenChar(code)) {
        if (end !== -1) {
          throw new ParseError(unexpectedCharacterMessage(header, i), header)
        }

        if (start === -1) start = i
      } else if (isDelimiter(code) || isExtended(code)) {
        if (inQuotes) {
          if (code === 0x22 /*'"'*/) {
            inQuotes = false
            end = i
          } else if (code === 0x5c /*'\'*/) {
            if (start === -1) start = i
            isEscaping = mustUnescape = true
          } else if (start === -1) {
            start = i
          }
        } else if (code === 0x22 && header.charCodeAt(i - 1) === 0x3d) {
          inQuotes = true
        } else if ((code === 0x2c /*','*/ || code === 0x3b) /*';'*/ && (start !== -1 || end !== -1)) {
          if (start !== -1) {
            if (end === -1) end = i
            forwarded[parameter] = mustUnescape ? decode(header.slice(start, end)) : header.slice(start, end)
          } else {
            forwarded[parameter] = ''
          }

          if (code === 0x2c) {
            output.push(forwarded)
            forwarded = {}
          }

          parameter = undefined
          start = end = -1
        } else {
          throw new ParseError(unexpectedCharacterMessage(header, i), header)
        }
      } else if (code === 0x20 || code === 0x09) {
        if (end !== -1) continue

        if (inQuotes) {
          if (start === -1) start = i
        } else if (start !== -1) {
          end = i
        } else {
          throw new ParseError(unexpectedCharacterMessage(header, i), header)
        }
      } else {
        throw new ParseError(unexpectedCharacterMessage(header, i), header)
      }
    }
  }

  if (parameter === undefined || inQuotes || (start === -1 && end === -1)) {
    throw new ParseError('Unexpected end of input', header)
  }

  if (start !== -1) {
    // @ts-ignore
    if (end === -1) end = i
    forwarded[parameter] = mustUnescape ? decode(header.slice(start, end)) : header.slice(start, end)
  } else {
    forwarded[parameter] = ''
  }

  output.push(forwarded)
  return output
}
