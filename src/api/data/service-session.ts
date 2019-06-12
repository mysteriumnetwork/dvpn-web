export interface ServiceSession {
  consumerId?: string
  id?: string,
  createdAt?: string
}

export interface ServiceSessionResponse {
  sessions?: ServiceSession[]
}
