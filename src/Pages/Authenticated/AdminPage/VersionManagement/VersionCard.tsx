/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { LocalVersion, RemoteVersion } from '../../../../api/ui-version-management'
import styles from './VersionManagement.module.scss'
import dates from '../../../../commons/dates'
import React from 'react'
import { Button } from '../../../../Components/Inputs/Button'

const { date2human } = dates

interface Props {
  remote: RemoteVersion
  local?: LocalVersion
  bundledVersion: string
  releaseNotes?: JSX.Element
  onDownload?: () => void
  onSwitchVersion: () => void
  isDownloadInProgress: boolean
  isInUse: boolean
  isLoading?: boolean
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
  isLoading,
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
          {/*{releaseNotes && <Tooltip title={releaseNotes} />}*/}
        </div>
      </div>
      <div>
        {!local && (
          <Button
            loading={isLoading}
            onClick={onDownload}
            disabled={isDownloadInProgress}
            variant="outlined"
            label="Download"
          />
        )}
        {canSwitchTo && (
          <Button
            loading={isLoading}
            onClick={onSwitchVersion}
            disabled={isDownloadInProgress}
            variant="blue"
            label="Switch"
          />
        )}
      </div>
    </div>
  )
}
