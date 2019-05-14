export interface NatStatus {
  status?: string
  error?: string
}

export enum NatStatuses {
  NOT_FINISHED = 'not_finished',
  FAILED = 'failure',
  SUCCESSFUL = 'successful',
}
