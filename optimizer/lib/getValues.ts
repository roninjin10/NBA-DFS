type Value<T extends Object> = T extends { [key in keyof T]: infer A } ? A : any

export function getValues<T extends Object>(obj: T): Value<T>[] {
  return Object.keys(obj).map(key => (obj as any)[key])
}
