export class Cache {
  private storage
  constructor(local = true) {
    this.storage = local ? localStorage : sessionStorage
  }
  setItem(key: string, value: any) {
    this.storage.setItem(key, JSON.stringify(value))
  }
  getItem(key: string) {
    let value = this.storage.getItem(key)
    if (value) {
      return JSON.parse(value)
    }
  }
  removeItem(key: string) {
    this.storage.removeItem(key)
  }
  clear(key: string) {
    this.storage.clear()
  }

  key(index: number) {
    return this.storage.key(index)
  }

  length() {
    return this.storage.length
  }
}

const localCache = new Cache()
const sessionCache = new Cache()

export { localCache, sessionCache }
