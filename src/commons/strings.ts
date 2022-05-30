/**
 * Copyright (c) 2021 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const truncateHash = (hash: string, n: number = 10): string => {
  const b = hash.substring(0, 10)
  const e = hash.substring(hash.length - n + 1, hash.length - 1)
  return `${b}...${e}`
}

export const strings = {
  truncateHash,
}
