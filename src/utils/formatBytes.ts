import byteSize from 'byte-size'

export default function formatBytes(bytes: number) {
  const { value, unit } = byteSize(bytes)
  return `${value} ${unit}`
}
