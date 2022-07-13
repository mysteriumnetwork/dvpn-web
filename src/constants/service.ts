/**
 * Copyright (c) 2022 BlockDev AG
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
export interface ServiceDescriptor {
  key: string
  name: string
  description: string
}

export const AVAILABLE_SERVICES: ServiceDescriptor[] = [
  {
    name: 'Public',
    key: 'wireguard',
    description: 'Open to the whole network -dVPN app, independent builders etc.',
  },
]
