const NODE_ENV = process.env.NODE_ENV
const IS_PROD = NODE_ENV === 'production'

export const isProd = () => IS_PROD
console.log(process.env.PUBLIC_URL)
export function spreadIfProd<T>(obj: T): T | {} {
  if (Array.isArray(obj)) {
    return IS_PROD ? obj : []
  }

  return IS_PROD ? obj : {}
}
