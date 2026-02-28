export interface FuseResult<T> {
  item: T
  score?: number
}

export interface FuseOptions<T> {
  keys?: Array<keyof T | string>
  threshold?: number
  includeScore?: boolean
}

export default class Fuse<T> {
  constructor(list: readonly T[], options?: FuseOptions<T>)
  search(pattern: string): Array<FuseResult<T>>
}
