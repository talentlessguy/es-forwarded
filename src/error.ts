/**
 * An error thrown by the parser on unexpected input.
 *
 * @constructor
 * @param message The error message.
 * @param input The unexpected input.
 */

export class ParseError extends Error {
  input: unknown
  constructor(message: string, input: unknown) {
    super()

    this.stack = new Error().stack

    this.name = this.constructor.name
    this.message = message
    this.input = input
  }
}
