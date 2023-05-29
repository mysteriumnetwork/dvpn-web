/**
 * Copyright (c) 2023 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
const current = (path?: string): string => `${new URL(window.location.href).origin}${path ? `/#${path}` : ''}`

export const urls = {
  currentOrigin: current,
}
