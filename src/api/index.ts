import { HttpAdapter } from './http'
import { TequilaApi } from './tequila-api'

export const httpAdapter = new HttpAdapter()

export const tequilaApi = new TequilaApi(httpAdapter)
