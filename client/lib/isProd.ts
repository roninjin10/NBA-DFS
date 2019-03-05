const NODE_ENV = process.env.NODE_ENV

export const IS_PROD = NODE_ENV === 'production'

export function spreadIfProd<T>(obj: T): T | {} {
  if (Array.isArray(obj)) {
    return IS_PROD ? obj : []
  }

  return IS_PROD ? obj : {}
}
