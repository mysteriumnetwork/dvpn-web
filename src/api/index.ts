import { HTTP_API_URL, HTTP_APP_PORT, HTTP_TIMEOUT_DEFAULT, HttpAdapter } from './http'
import { TequilaApi } from './tequila-api'

export const httpAdapter = new HttpAdapter({
  baseURL: Boolean(process.env.REACT_APP_HTTP_API_USE_LOCATION)
    ? `${window.location.protocol}//${window.location.hostname}:${HTTP_APP_PORT}`
    : HTTP_API_URL,
  timeout: HTTP_TIMEOUT_DEFAULT,
  headers: { 'Cache-Control': 'no-cache, no-store' }
})

export const tequilaApi = new TequilaApi(httpAdapter)
