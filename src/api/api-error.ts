import { AxiosError } from 'axios'

export class ApiError extends Error {
  public name: string = 'ApiError'

  constructor(private original: AxiosError) {
    super(original.message)
  }

  public get code(): string | undefined {
    return this.original && this.original.code
  }

}
