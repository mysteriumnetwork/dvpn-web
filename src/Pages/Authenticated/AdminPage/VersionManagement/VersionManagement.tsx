/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React, { useEffect, useState } from 'react'
import {
  LocalVersion,
  LocalVersionsResponse,
  RemoteVersion,
  UI,
  uiVersionManager,
} from '../../../../api/ui-version-management'
import page from '../../../../commons/page'
import errors from '../../../../commons/errors'
import { VersionCard } from './VersionCard'
import { Button } from '../../../../Components/Inputs/Button'
import styled from 'styled-components'

const { parseToastError } = errors

interface State {
  isLoading: boolean
  isDownloadInProgress: boolean
  downloadError?: string
  downloadProgress: number
  ui: UI
  local: LocalVersionsResponse<LocalVersion>
  remote: LocalVersionsResponse<RemoteVersion>
}

const initialState: State = {
  isLoading: true,
  isDownloadInProgress: false,
  downloadProgress: 0,
  ui: {
    bundledVersion: 'N/A',
    usedVersion: 'N/A',
  },
  local: {
    versions: [],
  },
  remote: {
    versions: [],
  },
}

const Info = styled.div`
  display: flex;
  width: 100%;
  height: 6rem;
  justify-content: center;
  gap: 25px;
`
const Card = styled.div`
  display: flex;
  flex-direction: column;
  width: 300px;
  gap: 15px;
`
const Controls = styled.div`
  display: flex;
  flex-direction: column;

  gap: 10px;
  height: 100%;
  width: 10rem;
`
const Progress = styled.div`
  height: 20px;

  display: flex;
  align-items: center;
  justify-content: center;
`

const Bar = styled.progress`
  width: 60%;
`
const Versions = styled.div`
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 5px;

  height: 60vh;
  overflow-y: auto;
`
const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const ReleaseNotes = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const VersionManagement = () => {
  const { info, localVersions, remoteVersions, downloadUi, downloadStatus, switchUi } = uiVersionManager

  const [state, setState] = useState<State>(initialState)
  const setIsLoading = (b: boolean = true) => setState((d) => ({ ...d, isLoading: b }))

  useEffect(() => {
    init()
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      if (state.isDownloadInProgress) {
        downloadStatus().then((s) => {
          const inProgress = s.status === 'in_progress' || s.error !== undefined
          if (s.error) {
            parseToastError(s.error)
          }
          setState((d) => ({
            ...d,
            downloadProgress: s.progressPercent,
            downloadError: s.error,
            isDownloadInProgress: inProgress,
          }))

          if (s.status === 'done') {
            init()
          }
        })
      }
    }, 500)
    return () => clearInterval(interval)
  }, [state.isDownloadInProgress])

  const init = async (flushCache: boolean = false) => {
    try {
      setIsLoading()
      const [uiInfo, local, remote, dlStatus] = await Promise.all([
        info(),
        localVersions(),
        remoteVersions({ flushCache }),
        downloadStatus(),
      ])
      setState((d) => ({
        ...d,
        ui: uiInfo,
        isLoading: false,
        remote: remote,
        local: local,
        isDownloadInProgress: dlStatus.status === 'in_progress',
      }))
    } catch (err) {
      parseToastError(err)
    }
  }

  const findLocal = (name: string): LocalVersion | undefined => state.local.versions.find((it) => it.name === name)

  const isInUse = (lv?: LocalVersion): boolean => {
    if (!lv) {
      return false
    }

    return lv.name === state.ui.usedVersion
  }

  const download = async (name: string) => {
    try {
      await downloadUi(name)
      setState((d) => ({ ...d, isDownloadInProgress: true, downloadError: undefined, downloadProgress: 0 }))
    } catch (err) {
      parseToastError(err)
    }
  }

  const switchVersion = async (name: string) => {
    try {
      await switchUi(name)
      page.refreshPage()
    } catch (err: any) {
      parseToastError(err)
    }
  }

  const notes = (notes?: string): JSX.Element | undefined => {
    if (!notes) {
      return undefined
    }
    return (
      <ReleaseNotes>
        {notes.split('\r\n').map((it, index) => (
          <p key={index}>{it}</p>
        ))}
      </ReleaseNotes>
    )
  }

  const versionList = state.remote.versions
    .filter((remote) => remote.compatibilityUrl)
    .map((remote) => {
      const local = findLocal(remote.name)

      return (
        <VersionCard
          key={remote.name}
          remote={remote}
          local={local}
          bundledVersion={state.ui.bundledVersion}
          onDownload={() => download(remote.name)}
          onSwitchVersion={() => switchVersion(remote.name)}
          isDownloadInProgress={state.isDownloadInProgress}
          isInUse={isInUse(local)}
          releaseNotes={notes(remote.releaseNotes)}
        />
      )
    })

  const local = findLocal('local')
  if (local) {
    versionList.unshift(
      <VersionCard
        remote={{ name: 'local', releasedAt: new Date().toDateString(), isPreRelease: false }}
        local={local}
        bundledVersion={state.ui.bundledVersion}
        onSwitchVersion={() => switchVersion('local')}
        isDownloadInProgress={state.isDownloadInProgress}
        isInUse={isInUse(local)}
      />,
    )
  }
  return (
    <>
      <Info>
        <Card>
          {infoRow('Bundled:', state.ui.bundledVersion)}
          {infoRow('Used:', state.ui.usedVersion)}
        </Card>
        <Controls>
          <Button onClick={() => init(true)} loading={state.isLoading} variant="outlined" label="Flush Cache" />
          {state.ui.usedVersion !== 'bundled' && (
            <Button onClick={() => switchVersion('bundled')} loading={state.isLoading} label="Switch Back" />
          )}
        </Controls>
      </Info>
      <Progress>{state.isDownloadInProgress && <Bar value={state.downloadProgress / 100} />}</Progress>
      <Versions>{versionList}</Versions>
    </>
  )
}

const infoRow = (key: string, value: string): JSX.Element => (
  <InfoRow>
    <div>{key}</div>
    <div>{value}</div>
  </InfoRow>
)
