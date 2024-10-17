// VDF Tokenizer Function
export function tokenizeVdfString(input: string) {
  const lines = input.split(/\r?\n/).map((line) => line.trim()) // Split the VDF file into lines and trim whitespace
  let tokens: string[] = []

  // ------------------------------------------------
  // TOKENIZATION
  // ------------------------------------------------

  for (let line of lines) {
    let isInsideQuotedString = false
    let token = ''
    let str = line

    function pushToken(allowEmpty = false) {
      if (token || allowEmpty) {
        tokens.push(token.trim())
        token = ''
      }
    }

    for (let i = 0; i < str.length; i++) {
      let char = str[i]

      // -------------------------------------
      // Quoted string
      //-------------------------------------

      // quoted string start
      if (!isInsideQuotedString && char == '"') {
        pushToken(false)
        isInsideQuotedString = true
        continue
      }

      if (isInsideQuotedString) {
        // quoted string is ending

        if (char == '"') {
          let previousChar = str[i - 1]
          if (previousChar !== '\\') {
            pushToken(true)
            isInsideQuotedString = false
            continue
          }
        }

        token += char
        continue
      }

      // As soon as a comment starts, break
      if (char == '/') {
        pushToken()
        break
      }

      if (char == '{' || char == '}') {
        pushToken()
        tokens.push(char)
        continue
      }

      if (char == ' ' || char == '\t') {
        pushToken()
        continue
      }

      token += char

      if (i == str.length - 1) pushToken()
    }
  }

  return tokens
}

type VDFToken = string
type VDFObject = { [key: string]: any }

// Function to convert VDF tokens to a JSON object
export function tokensToJSON(tokens: VDFToken[]): VDFObject {
  const stack: VDFObject[] = [{}] // Stack to hold nested objects
  let currentKey: string | null = null // Track the current key

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i]

    if (token === '{') {
      // If token is '{', push a new object onto the stack
      const newObj: VDFObject = {}
      if (currentKey) {
        // Attach the new object to the current object using the current key
        stack[stack.length - 1][currentKey] = newObj
        currentKey = null
      }
      stack.push(newObj)
    } else if (token === '}') {
      // If token is '}', pop the current object from the stack
      stack.pop()
    } else if (currentKey === null) {
      // If we don't have a current key, treat this token as the key
      currentKey = token.toLowerCase()
    } else {
      // Otherwise, this token is the value for the current key
      stack[stack.length - 1][currentKey] = token
      currentKey = null // Reset current key after assigning value
    }
  }

  return stack[0] // The root object is at the bottom of the stack
}
