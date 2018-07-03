import { get, post } from './http'

export const sayHi = () => {
  const url = '/hi'
  return get(url)
}
