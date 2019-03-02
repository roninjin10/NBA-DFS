export function removeFromSet<T>(set: Set<T>, item: T): Set<T> {
  return new Set([...set].filter(x => x !== item))
}

export function addToSet<T>(set: Set<T>, item: T): Set<T> {
  return new Set([...set, item])
}

export function toggleItem<T>(set: Set<T>, item: T): Set<T> {
  return set.has(item)
    ? removeFromSet(set, item)
    : addToSet(set, item)
}