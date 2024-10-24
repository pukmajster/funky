/*************************************************
 *
 * UTILS
 *
 ************************************************/

type TokenType = 'unknown' | 'word' | 'special' | 'string' | 'comment'

function isWhitespace(char: string) {
  return /\s/.test(char)
}

function isSpecial(char: string) {
  return char === '{' || char === '}'
}

function assert(condition: boolean, message: string) {
  if (!condition) {
    throw new Error(message)
  }
}

type KeyValueNode = { [key: string]: KeyValueNode | string }

/*************************************************
 *
 * PARSER
 *
 ************************************************/

export function vdf2json(input: string): unknown {
  //performance.mark('fkv.parse.start')
  //console.log(`\n[FKV] parse start`)

  const root: KeyValueNode = {}
  const stack: KeyValueNode[] = []
  let currentObj: KeyValueNode = root
  let i = 0
  const len = input.length

  /************************************************************
   *
   * TOKENIZATION
   *
   * Reads a single token from the input string
   *
   ***********************************************************/

  function readToken() {
    let token = ''
    let tokenType: TokenType = 'unknown'

    // Eat whitespace
    while (i < len) {
      const char = input[i]
      if (isWhitespace(char)) {
        i++
      } else {
        break
      }
    }

    while (i < len) {
      const char = input.charAt(i)

      /************************************************************
       *
       * UKNNOWN
       *
       * We're still looking for the type of token we'll be reading
       *
       ***********************************************************/

      if (tokenType === 'unknown') {
        // Whitespace
        if (isWhitespace(char)) {
          i++
          continue
        }

        // Special
        if (isSpecial(char)) {
          tokenType = 'special'
          token += char
          i++
          break
        }

        // String
        if (char === '"') {
          tokenType = 'string'
          i++
          continue
        }

        // Comment
        if (char === '/') {
          // Check if next char is a "/"
          if (i + 1 < len && input[i + 1] === '/') {
            tokenType = 'comment'
            i += 2
            continue
          }
        }

        // Word
        tokenType = 'word'
        token += char
        i++
        continue
      }

      /************************************************************
       *
       * WORD
       *
       * We're looking for the end of the word
       * The end is marked by whitespace, a special character, string,  or a natural end of input
       *
       ***********************************************************/

      if (tokenType === 'word') {
        if (isWhitespace(char)) {
          i++
          break
        }

        if (isSpecial(char)) {
          break
        }

        if (char === '"') {
          break
        }

        token += char
        i++
        continue
      }

      /************************************************************
       *
       * STRING
       *
       * A string is a sequence of characters surrounded by double quotes
       * We must also account for escape sequences
       *
       ***********************************************************/

      if (tokenType === 'string') {
        if (char === '"') {
          i++
          break

          // TODO re-enable escape sequences?
          // // End of string as soon as we reach the end of a string
          // if (!opt.escapeSequences) {
          //   i++
          //   break
          // }

          // // If we're escaping sequences, we need to check if the previous character is a backslash
          // const previousChar = input[i - 1]
          // if (previousChar !== '\\') {
          //   break
          // }
        }

        token += char
        i++
        continue
      }

      /************************************************************
       *
       * COMMENT
       *
       * A comment is started with "//" and ends with the next line break
       * Once we've reached the end of the line, we can reset the token type to "unknown"
       * and continue reading the next token
       *
       ***********************************************************/

      if (tokenType === 'comment') {
        if (char === '\n') {
          i++
          //console.log(`(comment)\t\t ${token}`)
          tokenType = 'unknown'
          token = ''
          continue
        }

        token += char
        i++
        continue
      }
    }

    //console.log(`(${tokenType})\t "${token}"`)

    if (tokenType !== 'unknown') {
    }

    return [token, tokenType]
  }

  /************************************************************
   *
   * PARSING
   *
   ***********************************************************/

  while (i < len) {
    const [_key, keyType] = readToken()
    if (keyType === 'unknown') break

    // All keys are parsed to lower case for consistency
    const key = _key.toLowerCase()

    if (key === '}') {
      stack.pop()
      currentObj = stack[stack.length - 1]
      continue
    }

    const [value, valueType] = readToken()

    if (value === '{') {
      const newObj = {}
      currentObj[key] = newObj
      currentObj = newObj
      stack.push(newObj)

      continue
    } else {
      assert(value !== '}', 'Unexpected closing tag')
      currentObj[key] = value
    }
  }

  /*************************************************
   *
   * PERFORMANCE REPORT
   *
   ************************************************/

  //performance.mark('fkv.parse.end')
  //const measure = performance.measure('fkv.parse.measure', 'fkv.parse.start', 'fkv.parse.end')
  //console.log(`\n[FKV] parse measure`)
  //console.log(JSON.stringify(measure, null, 4))

  return root as unknown
}
