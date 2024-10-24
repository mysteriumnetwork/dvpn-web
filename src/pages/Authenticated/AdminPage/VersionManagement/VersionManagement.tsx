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
import styled from 'styled-components'
import { PanelCard } from '../PanelCard'
import Label from '../../../../components/Typography/Label'
import Button from '../../../../components/Buttons/Button'
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

const Data = styled.div`
  color: ${({ theme }) => theme.text.colorSecondary};
  font-weight: 400;
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
    <PanelCard title="Version management">
      <div className="flex justify-center w-full gap-5">
        <div className="flex gap-1.5">
          <Label value="Bundled:" />
          <Data>{state.ui.bundledVersion}</Data>
        </div>
        <div className="flex gap-1.5">
          <Label value="In use:" />
          <Data>{state.ui.usedVersion}</Data>
        </div>
      </div>
      <div className="flex w-full justify-center gap-2.5 my-2.5">
        <Button
          label="Flush Cache"
          variant="primary-outlined"
          size="sm"
          onClick={() => init(true)}
          loading={state.isLoading}
        />
        {state.ui.usedVersion !== 'bundled' && (
          <Button
            label="Switch Back"
            variant="secondary-outlined"
            size="sm"
            onClick={() => switchVersion('bundled')}
            loading={state.isLoading}
          />
        )}
      </div>
      <div className="mt-6 flex flex-col items-center justify-start gap-2 w-full h-[430px] overflow-y-scroll mr-2">
        {versionList}
      </div>
    </PanelCard>
  )
}
