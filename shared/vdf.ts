/**
 * Simple VDF/KeyValues implementation that Funky uses to parse addoninfo.txt and addonlist.txt files.
 * Those files contain incredibly simple VDF data, so there was no need for a full-fledged implementation.
 *
 * I plan on making chat wheel customization feature soon, so I need something to convert JSON to VDF.
 *
 * Ommited features:
 * - Comments
 * - Conditionals
 * - Lists / Objects with repeating keys
 * - #include/#base declarations
 */

/**
 * Simple tokenzier that respects quoted strings and square brackets while
 * getting rid of comments and conditionals.
 */
function tokenize(source: string): string[] {
  const list: string[] = []

  const target = source
    .replace(/\/\*[\s\S]*?\*\/|\/\/.*/g, '') // Get rid of comments
    .replace(/ *\[[^\]]*]/g, '') // Get rid of conditionals

    // Assure spacing between some reserved keywords or symbols
    .split('{')
    .join(' { ')
    .split('}')
    .join(' } ')

  // RegExp that tokenizes with quotes or square brackets in mind
  const reg2 = /(\[(.*?)\]|[^\s"]+|"([^"]*)")/g

  while (true) {
    //Each call to exec returns the next regex match as an array
    const match = reg2.exec(target)
    if (match != null) {
      // match[3] holds the tokenized value not surrounded in quotes

      if (!!match[3]) {
        // We have a quoted string
        list.push(match[3])
        continue
      }

      const str = match[0]

      // Prevent empty strings surrounded with quotes from being pushed
      if (str === '""') {
        list.push('')
        continue
      }

      list.push(match[0])
      continue
    }

    break
  }

  return list
}

/**
 * Parses a keyValues string into an object.
 */
function parse(source: string[]): Object {
  let i = 0

  function parseRecursively(parent: Object) {
    while (true) {
      if (i >= source.length) {
        break
      }

      const token = source[i]
      //console.log('token ' + token)

      // Object end
      if (token === '}') {
        i++
        break
      }

      // Key, with either a value or an object
      const key = token
      const nextToken = source[++i]

      // Include / Base
      if (nextToken === '#include' || nextToken === '#base') {
        i += 2
        continue
      }

      // Nested object
      if (nextToken === '{') {
        i++
        parent[key] = {}
        //console.log('parsing child object ' + key)

        parseRecursively(parent[key])
        continue
      }

      // Value
      parent[key] = nextToken
      //console.log('parsing value ' + key + ' = ' + nextToken)
      i++
    }
  }

  let root = {}

  try {
    parseRecursively(root)
  } catch (e) {
    console.error(e)
  }

  return root
}

interface vdfOptions {}

function stringify(obj: Object, options: vdfOptions | undefined | null, depth = 0): string {
  let str = ''
  const indent = '\t'.repeat(depth)

  function addLine(line: string) {
    str += `${indent}${line}\n`
  }

  for (const key in obj) {
    const value = obj[key]

    if (typeof value === 'object') {
      addLine(`"${key}"`)
      addLine('{')
      str += stringify(value, options, depth + 1)
      addLine('}')
    } else {
      addLine(`"${key}"\t\t"${value}"`)
    }
  }

  return str
}

const vdf = {
  tokenize,
  parse,
  stringify
}

export default vdf
