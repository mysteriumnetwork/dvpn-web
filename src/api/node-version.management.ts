/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export const checkNodeVersion = async () => {
  try {
    const currentReleaseResponse = await fetch('https://api.github.com/repos/mysteriumnetwork/node/releases/latest', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
      },
    })

    const currentRelease = await currentReleaseResponse.json()
    return currentRelease.tag_name
  } catch (err) {
    return err
  }
}
