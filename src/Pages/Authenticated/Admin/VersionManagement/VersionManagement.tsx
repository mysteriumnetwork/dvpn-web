/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import classNames from 'classnames'
import React, { useEffect } from 'react'
import { useImmer } from 'use-immer'
import {
  LocalVersion,
  LocalVersionsResponse,
  RemoteVersion,
  UI,
  uiVersionManager,
} from '../../../../api/ui-version-management'
import page from '../../../../commons/page'
import { parseToastError, toastError } from '../../../../commons/toast.utils'
import Button from '../../../../Components/Buttons/Button'
import styles from './VersionManagement.module.scss'
import { VersionCard } from './VersionCard'

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

export const VersionManagement = () => {
  const { info, localVersions, remoteVersions, downloadUi, downloadStatus, switchUi } = uiVersionManager

  const [state, setState] = useImmer<State>(initialState)
  const setIsLoading = (b: boolean = true) => {
    setState((d) => {
      d.isLoading = b
    })
  }

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
          setState((d) => {
            d.downloadProgress = s.progressPercent
            d.downloadError = s.error
            d.isDownloadInProgress = inProgress
          })

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
      setState((d) => {
        d.ui = uiInfo
        d.isLoading = false
        d.remote = remote
        d.local = local
        d.isDownloadInProgress = dlStatus.status === 'in_progress'
      })
    } catch (err) {
      parseToastError(err)
    }
  }

  const findLocal = (name: string): LocalVersion | undefined => {
    return state.local.versions.find((it) => it.name === name)
  }

  const isInUse = (lv?: LocalVersion): boolean => {
    if (!lv) {
      return false
    }

    return lv.name === state.ui.usedVersion
  }

  const download = async (name: string) => {
    try {
      await downloadUi(name)
      setState((d) => {
        d.isDownloadInProgress = true
        d.downloadError = undefined
        d.downloadProgress = 0
      })
    } catch (err) {
      toastError(parseErrorResponse(err))
    }
  }

  const switchVersion = async (name: string) => {
    try {
      await switchUi(name)
      page.refreshPage()
    } catch (err: any) {
      toastError(err.response.data.message)
    }
  }

  const notes = (notes?: string): JSX.Element | undefined => {
    if (!notes) {
      return undefined
    }
    return (
      <div className={styles.releaseNotes}>
        {notes.split('\r\n').map((it, index) => (
          <p key={index}>{it}</p>
        ))}
      </div>
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
      <div className={styles.info}>
        <div className={styles.infoCard}>
          {infoRow('Bundled:', state.ui.bundledVersion)}
          {infoRow('Used:', state.ui.usedVersion)}
        </div>
        <div className={styles.controls}>
          <Button onClick={() => init(true)} isLoading={state.isLoading} extraStyle="outline">
            Flush Cache
          </Button>
          {state.ui.usedVersion !== 'bundled' && (
            <Button onClick={() => switchVersion('bundled')} isLoading={state.isLoading}>
              Switch Back
            </Button>
          )}
        </div>
      </div>
      <div className={styles.progress}>
        <progress
          className={classNames(styles.bar, state.isDownloadInProgress ? '' : styles.invisible)}
          value={state.downloadProgress / 100}
        />
      </div>
      <div className={styles.versions}>{versionList}</div>
    </>
  )
}

const parseErrorResponse = (err: any): string => {
  const data = err.response.data
  return `${data.message} (${data.originalError})`
}

const infoRow = (key: string, value: string): JSX.Element => (
  <div className={styles.row}>
    <div className={styles.key}>{key}</div>
    <div className={styles.value}>{value}</div>
  </div>
)
