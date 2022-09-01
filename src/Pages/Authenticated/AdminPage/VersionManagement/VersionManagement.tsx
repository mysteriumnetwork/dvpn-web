/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useEffect, useState } from 'react'
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

const Label = styled.div`
  color: ${({ theme }) => theme.text.colorMain};
  font-weight: 600;
`
const Data = styled.div`
  color: ${({ theme }) => theme.text.colorSecondary};
  font-weight: 400;
`
const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  padding: 20px;
  border-radius: 20px;
  background: ${({ theme }) => theme.bgSettingsCard};
`
const List = styled.div`
  margin-top: 25px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  width: 100%;
  height: 500px;
  overflow-y: scroll;
  margin-right: 10px;
`
const Row = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
`

const ReleaseNotes = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  color: ${({ theme }) => theme.text.colorSecondary};
  font-size: ${({ theme }) => theme.common.fontSizeSmall};
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
          downloadInProgress={state.isDownloadInProgress}
          inUse={isInUse(local)}
          preRelease={remote.isPreRelease}
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
        downloadInProgress={state.isDownloadInProgress}
        inUse={isInUse(local)}
      />,
    )
  }
  return (
    <Card>
      <Row>
        <Label>Bundled:</Label>
        <Data>{state.ui.bundledVersion}</Data>
        <Label>In use:</Label>
        <Data>{state.ui.usedVersion}</Data>
      </Row>
      <Row>
        <Button onClick={() => init(true)} loading={state.isLoading} variant="outlined" label="Flush Cache" />
        {state.ui.usedVersion !== 'bundled' && (
          <Button onClick={() => switchVersion('bundled')} loading={state.isLoading} label="Switch Back" />
        )}
      </Row>
      <List>{versionList}</List>
    </Card>
  )
}
