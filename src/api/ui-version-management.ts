/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { http } from './axios'

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
  compatibilityUrl?: string
  isPreRelease: boolean
  releaseNotes?: string
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
