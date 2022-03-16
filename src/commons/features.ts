/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

export type Feature = {
  name: string
  description: string
}

const FEATURES: { [key: string]: Feature } = {
  RESTART: {
    name: 'restart',
    description: 'Ability to restart node from NodeUI',
  },
}

export default FEATURES
