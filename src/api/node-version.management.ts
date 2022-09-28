/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
import { tequila } from './tequila'

interface LatestReleaseResponse {
  version: string
}

export const fetchLatestNodeVersion = async () => {
  try {
    const latestReleaseResponse = await tequila.http
      .get<LatestReleaseResponse>('/node/latest-release')
      .then((r) => r.data)
    return latestReleaseResponse.version
  } catch (ignored: any) {
    return 'N/A'
  }
}
