import { HttpAdapter } from './http'
import { TequilaApi } from './tequila-api'
import { TEQUILAPI_URL, TequilapiClient, TequilapiClientFactory,  } from 'mysterium-vpn-js'

export const httpAdapter = new HttpAdapter({
  baseURL: TEQUILAPI_URL,
  headers: { 'Cache-Control': 'no-cache, no-store' }
})

export const tequilaApi = new TequilaApi(httpAdapter)

const factory = new TequilapiClientFactory(TEQUILAPI_URL)

export const tequilapiClient: TequilapiClient = factory.build(factory.buildAdapter())
