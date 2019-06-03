import { HTTP_TIMEOUT_DEFAULT, HttpAdapter } from './http'
import { TequilaApi } from './tequila-api'
import { getHttpApiUrl } from '../constants'
import { TequilapiClient, TequilapiClientFactory, } from 'mysterium-vpn-js'

export const httpAdapter = new HttpAdapter({
  baseURL: getHttpApiUrl(),
  timeout: HTTP_TIMEOUT_DEFAULT,
  headers: { 'Cache-Control': 'no-cache, no-store' }
})

export const tequilaApi = new TequilaApi(httpAdapter)

// using mysterium-vpn-js

const factory = new TequilapiClientFactory(getHttpApiUrl())

export const tequilapiClient: TequilapiClient = factory.build(factory.buildAdapter())
