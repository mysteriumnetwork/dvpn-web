/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { useAppSelector } from '../../../../commons/hooks'
import remoteStorage from '../../../../commons/remoteStorage'
import { useEffect, useMemo } from 'react'
import { selectors } from '../../../../redux/selectors'
import { fetchLatestNodeVersion } from '../../../../api/node-version.management'
import errors from '../../../../commons/errors'

const ONE_HOUR_MS = 2 * 60 * 60 * 1000
export const KEY_NODE_VERSION_CHECK = `NODE_VERSION_CHECK`

interface NodeVersionCheck {
  latestVersion: string
  checkedAt: number
  versionAtCheck: string
}

interface Props {
  onNewNodeVersionAvailable: (currentVersion: string, latestVersion: string) => void
}

export const NodeReleaseCheck = ({ onNewNodeVersionAvailable }: Props) => {
  const healthCheck = useAppSelector(selectors.healthCheck)
  const check = useAppSelector(remoteStorage.selector<NodeVersionCheck>(KEY_NODE_VERSION_CHECK))

  useEffect(() => {
    ;(async () => {
      if (check?.latestVersion && healthCheck.version.toString() !== check.latestVersion) {
        onNewNodeVersionAvailable(healthCheck.version, check.latestVersion)
      }
    })()
  }, [check?.latestVersion, healthCheck.version])

  const now = useMemo(() => {
    return Date.now()
  }, [])

  const fetchLatestVersionOrDefault = async () => {
    if (!check || now > check.checkedAt + ONE_HOUR_MS || check.versionAtCheck !== healthCheck.version) {
      return await fetchLatestNodeVersion()
    }

    return check.latestVersion
  }

  useEffect(() => {
    ;(async () => {
      try {
        await remoteStorage.put<NodeVersionCheck>(KEY_NODE_VERSION_CHECK, {
          latestVersion: await fetchLatestVersionOrDefault(),
          checkedAt: now,
          versionAtCheck: healthCheck.version,
        })
      } catch (err: any) {
        errors.parseToastError(err)
      }
    })()
  }, [])

  return <></>
}
