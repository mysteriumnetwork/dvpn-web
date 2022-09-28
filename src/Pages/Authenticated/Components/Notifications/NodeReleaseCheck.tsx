/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useAppSelector } from '../../../../commons/hooks'
import { useEffect } from 'react'
import { selectors } from '../../../../redux/selectors'
import { fetchLatestNodeVersion } from '../../../../api/node-version.management'
import semver from 'semver/preload'

interface Props {
  onNewNodeVersionAvailable: (currentVersion: string, latestVersion: string) => void
}

export const NodeReleaseCheck = ({ onNewNodeVersionAvailable }: Props) => {
  const healthCheck = useAppSelector(selectors.healthCheck)

  useEffect(() => {
    ;(async () => {
      const latest = await fetchLatestNodeVersion()
      const current = healthCheck.version

      if (!semver.valid(latest) || !semver.valid(current)) {
        return
      }

      if (semver.gt(latest, current)) {
        onNewNodeVersionAvailable(current, latest)
      }
    })()
  }, [])

  return <></>
}
