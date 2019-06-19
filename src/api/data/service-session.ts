export interface ServiceSession {
  consumerId?: string
  id?: string,
  createdAt?: string
  bytesIn?: number
  bytesOut?: number
}

export interface ServiceSessionResponse {
  sessions?: ServiceSession[]
}
