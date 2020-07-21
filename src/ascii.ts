/**
 * Check if a character is a delimiter as defined in section 3.2.6 of RFC 7230.
 *
 *
 * @param code The code of the character to check.
 * @returns `true` if the character is a delimiter, else `false`.
 */
export function isDelimiter(code: number) {
  return (
    code === 0x22 || // '"'
    code === 0x28 || // '('
    code === 0x29 || // ')'
    code === 0x2c || // ','
    code === 0x2f || // '/'
    (code >= 0x3a && code <= 0x40) || // ':', ';', '<', '=', '>', '?' '@'
    (code >= 0x5b && code <= 0x5d) || // '[', '\', ']'
    code === 0x7b || // '{'
    code === 0x7d // '}'
  )
}

/**
 * Check if a character is allowed in a token as defined in section 3.2.6
 * of RFC 7230.
 *
 * @param code The code of the character to check.
 * @returns `true` if the character is allowed, else `false`.
 */
export function isTokenChar(code: number) {
  return (
    code === 0x21 || // '!'
    (code >= 0x23 && code <= 0x27) || // '#', '$', '%', '&', '''
    code === 0x2a || // '*'
    code === 0x2b || // '+'
    code === 0x2d || // '-'
    code === 0x2e || // '.'
    (code >= 0x30 && code <= 0x39) || // 0-9
    (code >= 0x41 && code <= 0x5a) || // A-Z
    (code >= 0x5e && code <= 0x7a) || // '^', '_', '`', a-z
    code === 0x7c || // '|'
    code === 0x7e
  ) // '~'
}

/**
 * Check if a character is a printable ASCII character.
 *
 * @param code The code of the character to check.
 * @returns `true` if `code` is in the %x20-7E range, else `false`.
 */

export const isPrint = (code: number) => code >= 0x20 && code <= 0x7e

/**
 * Check if a character is an extended ASCII character.
 *
 * @param code The code of the character to check.
 * @returns `true` if `code` is in the %x80-FF range, else `false`.
 */
export function isExtended(code: number) {
  return code >= 0x80 && code <= 0xff
}
