export interface ServiceSession {
  consumerId?: string
  id?: string,
  createdAt?: string
  bytesIn?: string
  bytesOut?: string
}

export interface ServiceSessionResponse {
  sessions?: ServiceSession[]
}
