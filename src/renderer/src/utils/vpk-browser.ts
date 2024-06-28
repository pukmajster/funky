export type PathTreeEntry = {
  name: string
  children?: PathTree[]
}

export type PathTree = PathTreeEntry[]

export function pathsToTree(paths: string[]): PathTreeEntry[] {
  let result: PathTreeEntry[] = []
  let level = { result }

  paths.forEach((path) => {
    path.split('/').reduce((r, name) => {
      if (!r[name]) {
        r[name] = { result: [] }
        r.result.push({ name, children: r[name].result })
      }

      return r[name]
    }, level)
  })

  console.log(result)

  return result
}
