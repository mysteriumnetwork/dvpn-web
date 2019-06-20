declare module '*.scss' {
  const content: { [className: string]: string }
  export = content;
}

declare module '*.css' {
  const content: { [className: string]: string }
  export = content;
}

declare module '*.sass' {
  const content: { [className: string]: string }
  export = content;
}

declare module 'format-duration' {
  const formatDuration: (ms: number, options?: { leading: boolean }) => string
  export default formatDuration
}

declare module 'byte-size' {
  const byteSize: (bytes: number, options?: { precision: number, units: 'metric' | 'iec' | 'metric_octet' | 'iec_octet' }) => { value: string, unit: string }
  export default byteSize
}

declare interface StorageInterface {
  has(key: string): boolean

  get<T = any>(key: string): T

  set<T = any>(key: string, value: T): void

  remove(key: string): void

  clear(): void
}

declare interface SubscribedStorageInterface extends StorageInterface {
  subscribe<T = any>(key: string, cb: (value: T) => void): void

  unsubscribe<T = any>(key: string): void
}
