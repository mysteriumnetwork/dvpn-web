/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const fetchLatestNodeVersion = async () => {
  try {
    const latestReleaseResponse = await fetch('https://api.github.com/repos/mysteriumnetwork/node/releases/latest', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    })

    const latestRelease = await latestReleaseResponse.json()
    return latestRelease.tag_name
  } catch (err) {
    throw err
  }
}
