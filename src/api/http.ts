import axios, { AxiosError, AxiosInstance, AxiosResponse } from 'axios'
import { ApiError } from './api-error'

export const HTTP_API_URL = process.env.REACT_APP_HTTP_API_URL
export const HTTP_TIMEOUT_DEFAULT = Number(process.env.REACT_APP_HTTP_TIMEOUT_DEFAULT)
export const HTTP_REACT_APP_HTTP = Number(process.env.REACT_APP_HTTP_REACT_APP_HTTP)

export interface HttpParams {
  [s: string]: any
}

export interface HttpOptions {
  timeout?: number,
  headers?: any
}

export interface HttpAdapterInterface {
  get(path: string, query?: HttpParams, options?: HttpOptions): Promise<any>

  post(path: string, data?: HttpParams, options?: HttpOptions): Promise<any>

  delete(path: string, options?: HttpOptions): Promise<any>

  put(path: string, data: HttpParams, options?: HttpOptions): Promise<any>
}

export class HttpAdapter implements HttpAdapterInterface {

  private http: AxiosInstance

  constructor() {
    this.http = axios.create({
      baseURL: HTTP_API_URL,
      timeout: HTTP_TIMEOUT_DEFAULT,
      headers: { 'Cache-Control': 'no-cache, no-store' },
    })
  }

  private async decodeResponse<T>(promise: Promise<AxiosResponse>): Promise<T> {
    return promise
      .then((response: AxiosResponse) => response.data as T)
      .catch((error: AxiosError) => Promise.reject(new ApiError(error)))
  }

  delete<T = any>(path: string, options?: HttpOptions): Promise<T> {
    return this.decodeResponse<T>(this.http.delete(path, { ...options }))
  }

  get<T = any>(path: string, params?: HttpParams, options?: HttpOptions): Promise<T> {
    return this.decodeResponse<T>(this.http.get(path, { ...options, params }))
  }

  post<T = any>(path: string, data?: HttpParams, options?: HttpOptions): Promise<T> {
    return this.decodeResponse<T>(this.http.post(path, data, { ...options }))
  }

  put<T = any>(path: string, data: HttpParams, options?: HttpOptions): Promise<T> {
    return this.decodeResponse<T>(this.http.put(path, data, { ...options }))
  }

}
