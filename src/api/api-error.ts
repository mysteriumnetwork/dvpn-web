import { AxiosError } from 'axios'
import _ from 'lodash'

export class ApiError extends Error {
  public name: string = 'ApiError'

  constructor(private original: AxiosError) {
    super(_.get(original, 'response.data.message', original.message))
  }

  public get status(): number | undefined {
    return parseInt(_.get(this.original, 'request.status'), 10)
  }

  public get code(): string | undefined {
    return this.original && this.original.code
  }

  public get data(): string | undefined {
    return _.get(this.original, 'response.data')
  }
}
