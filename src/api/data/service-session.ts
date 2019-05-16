export interface ServiceSession {
  consumerId?: string
  id?: string
}

export interface ServiceSessionResponse {
  sessions?: ServiceSession[]
}
