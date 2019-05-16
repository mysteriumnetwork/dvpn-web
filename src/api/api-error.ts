import { AxiosError } from 'axios'
import _ from 'lodash'
import { HTTP_NOT_FOUND } from '../constants'

export class ApiError extends Error {
  public name: string = 'ApiError'

  constructor(private original: AxiosError) {
    super(_.get(original, 'response.data.message', original.message))
  }

  public get status(): number | undefined {
    return parseInt(_.get(this.original, 'request.status'), 10)
  }

  public get isNotFound(): boolean {
    return this.status === HTTP_NOT_FOUND
  }

  public get data(): string | undefined {
    return _.get(this.original, 'response.data')
  }
}
