/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { Layout } from '../Layout'
import React, { useEffect } from 'react'
import { useImmer } from 'use-immer'
import { parseToastError, toastError } from '../../../commons/toast.utils'
import { LocalVersion, LocalVersionsResponse, RemoteVersion, UI, uiVersionManager } from '../../../api/NodeUIVersion'
import styles from './VersionManagementPage.module.scss'
import { date2human } from '../../../commons/date.utils'
import Button from '../../../Components/Buttons/Button'
import classNames from 'classnames'

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

export const VersionManagementPage = () => {
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

  const init = async () => {
    try {
      setIsLoading()
      const [uiInfo, local, remote, dlStatus] = await Promise.all([
        info(),
        localVersions(),
        remoteVersions(),
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
      window.location.reload(true)
    } catch (err) {
      toastError(err.response.data.message)
    }
  }

  const mmm = () => {
    return state.remote.versions
      .filter((rv) => rv.compatibilityUrl)
      .map((rv) => {
        const local = findLocal(rv.name)

        return (
          <div key={rv.name} className={styles.row}>
            <div>
              <div className={styles.versionBlock}>
                <div className={styles.name}>{rv.name}</div>
                {rv.name === state.ui.bundledVersion && <div className={styles.preRelease}>(bundled)</div>}
                {rv.isPreRelease && <div className={styles.preRelease}>(pre-release)</div>}
              </div>
              <div className={styles.released}>({date2human(rv.releasedAt)})</div>
            </div>
            <div>
              {!local && (
                <Button
                  className={styles.control}
                  onClick={() => download(rv.name)}
                  disabled={state.isDownloadInProgress}
                  extraStyle="outline"
                >
                  Download
                </Button>
              )}
              {local && !isInUse(local) && (
                <Button
                  className={styles.control}
                  onClick={() => switchVersion(rv.name)}
                  disabled={state.isDownloadInProgress}
                  extraStyle="outline-primary"
                >
                  Switch
                </Button>
              )}
            </div>
          </div>
        )
      })
  }

  return (
    <Layout
      title="Version Management"
      isLoading={state.isLoading}
      main={
        <div className={styles.page}>
          <div className={styles.info}>
            <div className={styles.infoCard}>
              {infoRow('Bundled:', state.ui.bundledVersion)}
              {infoRow('Used:', state.ui.usedVersion)}
              {state.ui.usedVersion !== 'bundled' && (
                <div className={styles.switchBack}>
                  <Button onClick={() => switchVersion('bundled')}>Switch Back</Button>
                </div>
              )}
            </div>
          </div>
          <div className={styles.progress}>
            <progress
              className={classNames(styles.bar, state.isDownloadInProgress ? '' : styles.invisible)}
              value={state.downloadProgress / 100}
            />
          </div>
          <div className={styles.versions}>{mmm()}</div>
        </div>
      }
    />
  )
}

const infoRow = (key: string, value: string): JSX.Element => (
  <div className={styles.row}>
    <div className={styles.key}>{key}</div>
    <div className={styles.value}>{value}</div>
  </div>
)

const parseErrorResponse = (err: any): string => {
  const data = err.response.data
  return `${data.message} (${data.originalError})`
}
