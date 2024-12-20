/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useEffect } from 'react'
import semver from 'semver/preload'
import { selectors } from '../../../redux/selectors'
import { useAppSelector } from '../../../commons/hooks'
import { configs } from '../../../commons/config'
import FEATURES from '../../../commons/features'
import { fetchLatestNodeVersion } from '../../../api/node-version.management'

interface Props {
  onNewNodeVersionAvailable: (currentVersion: string, latestVersion: string) => void
}

export const NodeReleaseCheck = ({ onNewNodeVersionAvailable }: Props) => {
  const healthCheck = useAppSelector(selectors.healthCheck)
  const config = useAppSelector(selectors.currentConfig)
  const updateNotificationsDisabled = configs.isFeatureEnabled(config, FEATURES.UPDATE_NOTIFICATIONS.name)
  useEffect(() => {
    ;(async () => {
      const latest = await fetchLatestNodeVersion()
      const current = healthCheck.version

      if (!semver.valid(latest) || !semver.valid(current) || updateNotificationsDisabled) {
        return
      }

      if (semver.gt(latest, current)) {
        onNewNodeVersionAvailable(current, latest)
      }
    })()
  }, [])

  return <></>
}
