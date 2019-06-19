export default function isElectron() {
  // Renderer
  if ((typeof window !== 'undefined') && (typeof (window as any).process === 'object') && ((window as any).process.type === 'renderer')) {
    return true
  }

  // Main
  if ((typeof process !== 'undefined') && (typeof process.versions === 'object') && Boolean((process.versions as any).electron)) {
    return true
  }

  // When the `nodeIntegration === true`
  return (typeof navigator === 'object') && (typeof navigator.userAgent === 'string') && (navigator.userAgent.indexOf('Electron') >= 0)
}
