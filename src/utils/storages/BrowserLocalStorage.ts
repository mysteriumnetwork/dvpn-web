export default class BrowserLocalStorage implements StorageInterface {
  clear(): void {
    window && window.localStorage.clear()
  }

  get<T = any>(key: string): T {
    const value: any = window && window.localStorage.getItem(key)

    try {
      return JSON.parse(value)
    } catch (e) {}

    return value
  }

  has(key: string): boolean {
    return Boolean(window && window.localStorage.getItem(key))
  }

  remove(key: string): void {
    window && window.localStorage.removeItem(key)
  }

  set<T = any>(key: string, value: T): void {
  }

}
