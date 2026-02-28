function normalize(value) {
  return String(value ?? '').toLowerCase().trim()
}

function levenshtein(a, b) {
  if (a === b) {
    return 0
  }

  const aLength = a.length
  const bLength = b.length

  if (aLength === 0) {
    return bLength
  }

  if (bLength === 0) {
    return aLength
  }

  const matrix = Array.from({ length: aLength + 1 }, () => new Array(bLength + 1).fill(0))

  for (let i = 0; i <= aLength; i += 1) {
    matrix[i][0] = i
  }

  for (let j = 0; j <= bLength; j += 1) {
    matrix[0][j] = j
  }

  for (let i = 1; i <= aLength; i += 1) {
    for (let j = 1; j <= bLength; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost,
      )
    }
  }

  return matrix[aLength][bLength]
}

function isSubsequence(query, target) {
  let targetIndex = 0

  for (let queryIndex = 0; queryIndex < query.length; queryIndex += 1) {
    const nextIndex = target.indexOf(query[queryIndex], targetIndex)
    if (nextIndex === -1) {
      return false
    }

    targetIndex = nextIndex + 1
  }

  return true
}

function scoreCandidate(query, rawCandidate) {
  const candidate = normalize(rawCandidate)
  if (!candidate) {
    return 1
  }

  if (candidate === query) {
    return 0
  }

  if (candidate.includes(query)) {
    const tightness = Math.max(candidate.length - query.length, 0) / Math.max(candidate.length, 1)
    return 0.02 + tightness * 0.08
  }

  if (isSubsequence(query, candidate)) {
    return 0.22
  }

  let bestScore = levenshtein(query, candidate) / Math.max(query.length, candidate.length, 1)
  const tokens = candidate.split(/[^a-z0-9]+/).filter(Boolean)

  for (const token of tokens) {
    const tokenScore = levenshtein(query, token) / Math.max(query.length, token.length, 1)
    if (tokenScore < bestScore) {
      bestScore = tokenScore
    }
  }

  return bestScore
}

function resolveValue(item, key) {
  const segments = String(key).split('.')
  let current = item

  for (const segment of segments) {
    if (current == null) {
      return ''
    }

    current = current[segment]
  }

  return current
}

export default class Fuse {
  constructor(list, options = {}) {
    this.list = Array.isArray(list) ? list : []
    this.options = {
      keys: options.keys ?? [],
      threshold: options.threshold ?? 0.6,
      includeScore: options.includeScore ?? false,
    }
  }

  search(pattern) {
    const query = normalize(pattern)
    if (!query) {
      return []
    }

    const threshold = this.options.threshold ?? 0.6
    const results = []

    for (const item of this.list) {
      let bestScore = Number.POSITIVE_INFINITY
      const keys = this.options.keys.length > 0 ? this.options.keys : Object.keys(item ?? {})

      for (const key of keys) {
        const value = resolveValue(item, key)
        const score = scoreCandidate(query, value)
        if (score < bestScore) {
          bestScore = score
        }
      }

      if (bestScore <= threshold) {
        const result = { item }
        if (this.options.includeScore) {
          result.score = bestScore
        }

        results.push(result)
      }
    }

    return results.sort((a, b) => (a.score ?? 0) - (b.score ?? 0))
  }
}
