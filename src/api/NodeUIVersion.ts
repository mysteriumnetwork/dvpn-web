/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import axios from 'axios'
import camelcaseKeys from 'camelcase-keys'
import snakecaseKeys from 'snakecase-keys'

const http = axios.create({
  baseURL: `${window.location.protocol}//${window.location.hostname}:${window.location.port}/tequilapi`,
})

const convertOptions = {
  deep: true,
}

http.interceptors.response.use(
  (config) => {
    if (config?.data) {
      config.data = camelcaseKeys(config.data, convertOptions)
    }
    return config
  },
  (error: any) => {
    if (error?.response?.data) {
      error.response.data = camelcaseKeys(error.response.data, convertOptions)
    }
    return Promise.reject(error)
  },
)

http.interceptors.request.use((config) => {
  if (config?.params) {
    config.params = snakecaseKeys(config.params, convertOptions)
  }
  if (config?.data) {
    config.data = snakecaseKeys(config.data, convertOptions)
  }
  return config
})

const info = async (): Promise<UI> => {
  return await http.get<UI>('/ui/info').then((r) => r.data)
}

export interface ListRemoteRequest {
  flushCache: boolean
}

const localVersions = async (): Promise<LocalVersionsResponse<LocalVersion>> => {
  return await http.get<LocalVersionsResponse<LocalVersion>>('/ui/local-versions').then((r) => r.data)
}

const remoteVersions = async (r?: ListRemoteRequest): Promise<LocalVersionsResponse<RemoteVersion>> => {
  return await http
    .get<LocalVersionsResponse<RemoteVersion>>(`/ui/remote-versions`, { params: r })
    .then((r) => r.data)
}

const downloadStatus = async (): Promise<DownloadStatus> => {
  return await http.get<DownloadStatus>('/ui/download-status').then((r) => r.data)
}

const switchUi = async (version: string): Promise<void> => {
  return await http.post('/ui/switch-version', { version })
}

const downloadUi = async (version: string): Promise<void> => {
  return await http.post('/ui/download-version', { version })
}

export interface LocalVersionsResponse<T> {
  versions: T[]
}

export interface LocalVersion {
  name: string
}
export interface RemoteVersion {
  name: string
  releasedAt: string
  compatibilityUrl: string
  isPreRelease: boolean
}

export interface UI {
  bundledVersion: string
  usedVersion: string
}

export interface DownloadStatus {
  status: string
  progressPercent: number
  tag?: string
  error?: string
}

export const uiVersionManager = {
  info,
  localVersions,
  remoteVersions,
  downloadUi,
  downloadStatus,
  switchUi,
}
