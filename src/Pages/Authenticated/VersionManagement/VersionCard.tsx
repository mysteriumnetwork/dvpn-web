/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { LocalVersion, RemoteVersion } from '../../../api/ui-version-management'
import styles from './VersionManagementPage.module.scss'
import { date2human } from '../../../commons/date.utils'
import Tooltip from '../../../Components/Tooltip/Tooltip'
import Button from '../../../Components/Buttons/Button'
import React from 'react'

interface Props {
  remote: RemoteVersion
  local?: LocalVersion
  bundledVersion: string
  releaseNotes?: JSX.Element
  onDownload?: () => void
  onSwitchVersion: () => void
  isDownloadInProgress: boolean
  isInUse: boolean
}

export const VersionCard = ({
  remote,
  local,
  bundledVersion,
  releaseNotes,
  onDownload,
  onSwitchVersion,
  isDownloadInProgress,
  isInUse,
}: Props) => {
  const canSwitchTo = local && !isInUse
  return (
    <div key={remote.name} className={styles.row}>
      <div>
        <div className={styles.versionBlock}>
          <div className={styles.name}>{remote.name}</div>
          {remote.name === bundledVersion && <div className={styles.preRelease}>(bundled)</div>}
          {remote.isPreRelease && <div className={styles.preRelease}>(pre-release)</div>}
        </div>
        <div className={styles.releaseBlock}>
          <div className={styles.released}>({date2human(remote.releasedAt)})</div>
          {releaseNotes && <Tooltip title={releaseNotes} />}
        </div>
      </div>
      <div>
        {!local && (
          <Button className={styles.control} onClick={onDownload} disabled={isDownloadInProgress} extraStyle="outline">
            Download
          </Button>
        )}
        {canSwitchTo && (
          <Button
            className={styles.control}
            onClick={onSwitchVersion}
            disabled={isDownloadInProgress}
            extraStyle="outline-primary"
          >
            Switch
          </Button>
        )}
      </div>
    </div>
  )
}
