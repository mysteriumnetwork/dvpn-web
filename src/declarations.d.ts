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
