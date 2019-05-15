export interface AccessRule {
  type?: string
  value?: string
}

export interface AccessPolicy {
  allow?: AccessRule[]
  description?: string
  id?: string
  title?: string
  source?: string
}

export interface AccessPolicyResponse {
  entries?: AccessPolicy[]
}
