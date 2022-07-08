/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const kbps = (mbps: number) => {
  return (mbps * 1_000) / 8
}

const mbps = (kbps: number) => {
  return (kbps / 1_000) * 8
}

const conversions = {
  kbps,
  mbps,
}

export default conversions
