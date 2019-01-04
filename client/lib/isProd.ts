const NODE_ENV = process.env.NODE_ENV
const IS_PROD = NODE_ENV === 'production'

export const isProd = () => IS_PROD

export function spreadIfProd<T>(obj: T): T | {} {
  return IS_PROD ? obj : {}
}